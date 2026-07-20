"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/styles/window.module.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAvailableTimeZones } from "@/utils/timeUtils";

/**
 * Formats a time zone name the way the design calls for, e.g.
 * "Eastern Daylight Time (EDT)". Computed live via Intl rather than trusted
 * to any pre-baked string, so it stays correct across DST transitions.
 */
function getTimeZoneDisplayName(timeZone: string, date: Date) {
  const namePart = (style: "long" | "short") =>
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: style })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value;

  const long = namePart("long") ?? timeZone;
  const short = namePart("short");
  return short ? `${long} (${short})` : long;
}

/**
 * Content of the popup window that appears whenever Settings > "Automatic
 * Time Zone Detection" is turned off (see app/page.tsx). Shows the
 * currently-selected zone's full name, plus a searchable "Nearest City"
 * picker built from every city in the tzdb dataset.
 *
 * `manualTimeZone` and the selection callback are both owned by the parent
 * (app/page.tsx) rather than local state, since the navbar clock also needs
 * to react live to whatever the user picks here.
 */
export default function TimeZoneSelection({
  manualTimeZone,
  onSelectTimeZone,
  animate = true,
}: {
  manualTimeZone: string;
  onSelectTimeZone: (timeZone: string) => void;
  animate?: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Flatten tzdb's {zone -> [cities]} shape into one flat list of
  // {value: IANA zone, label: "City, Country"} options, one per city, so
  // the search matches on city name rather than forcing the user to know
  // the IANA zone identifier.
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
        className={`${styles.windowCard} rounded-sm border border-[var(--near-black)] shadow-[3px_3px_0px_0px_black] px-5 py-5 flex items-center justify-between gap-4`}
      >
        <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          Time Zone
        </h4>
        <p className="text-sm font-[family-name:var(--font-ibm-plex-mono)] tracking-wide">
          {getTimeZoneDisplayName(manualTimeZone, new Date())}
        </p>
      </div>

      <div
        className={`${styles.windowCard} rounded-sm border border-[var(--near-black)] shadow-[3px_3px_0px_0px_black] px-5 py-5 flex items-center justify-between gap-4`}
      >
        <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          Nearest City
        </h4>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              animate={animate}
              className="bg-[var(--standard-action)] px-4 py-2 text-sm font-[family-name:var(--font-ibm-plex-mono)]"
            >
              {selectedCity}
              <ChevronDown className="h-4 w-4" />
            </Button>
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
