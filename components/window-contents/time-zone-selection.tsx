"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/styles/window.module.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAvailableTimeZones } from "@/utils/timeUtils";

function getTimeZoneDisplayName(timeZone: string, date: Date) {
  const namePart = (style: "long" | "short") =>
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: style })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value;

  const long = namePart("long") ?? timeZone;
  const short = namePart("short");
  return short ? `${long} (${short})` : long;
}

export default function TimeZoneSelection({
  manualTimeZone,
  onSelectTimeZone,
}: {
  manualTimeZone: string;
  onSelectTimeZone: (timeZone: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const cityOptions = useMemo(
    () =>
      getAvailableTimeZones.flatMap((zone) =>
        zone.mainCities.map((city) => ({
          value: zone.name,
          label: `${city}, ${zone.countryName}`,
        }))
      ),
    []
  );

  const selectedCity =
    cityOptions.find((city) => city.value === manualTimeZone)?.label ?? manualTimeZone;

  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-6 antialiased">
      <div
        className={`${styles.windowCard} rounded-sm border border-[var(--near-black)] shadow-lg px-5 py-5 flex items-center justify-between gap-4`}
      >
        <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          Time Zone
        </h4>
        <p className="text-sm font-[family-name:var(--font-ibm-plex-mono)] tracking-wide">
          {getTimeZoneDisplayName(manualTimeZone, new Date())}
        </p>
      </div>

      <div
        className={`${styles.windowCard} rounded-sm border border-[var(--near-black)] shadow-lg px-5 py-5 flex items-center justify-between gap-4`}
      >
        <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          Nearest City
        </h4>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="flex cursor-pointer items-center gap-2 rounded-sm border-2 border-[var(--near-black)] bg-[var(--standard-action)] px-4 py-2 text-sm shadow-[2px_2px_0px_0px_black] font-[family-name:var(--font-ibm-plex-mono)]">
            {selectedCity}
            <ChevronDown className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No matching city.</CommandEmpty>
                <CommandGroup>
                  {cityOptions.map((city) => (
                    <CommandItem
                      key={`${city.value}-${city.label}`}
                      value={city.label}
                      onSelect={() => {
                        onSelectTimeZone(city.value);
                        setOpen(false);
                      }}
                    >
                      {city.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
