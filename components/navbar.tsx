"use client";

import styles from "@/styles/nav.module.css";
import TimeSwitch from "./window-contents/settings/modules/date-time";
import {useLocaleSwitch} from "./window-contents/settings/modules/locale-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({
  is24Hour,
  isAutoTimeZone,
  manualTimeZone,
}: {
  is24Hour: boolean;
  isAutoTimeZone: boolean;
  manualTimeZone: string;
}) {
  const { locale, switchLocale, labels } = useLocaleSwitch();

  return (
    <div
      className={`${styles.navContent} fixed top-0 left-0 right-0 md:h-20 flex justify-between items-center px-3 md:px-6 text-xs md:text-sm shadow-sm border border-[var(--near-black)] z-60`}
    >
      <span className="text-xl font-[family-name:var(--font-gasoek-one)]">D.ME</span>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-base font-[family-name:var(--font-ibm-plex-mono)]" suppressHydrationWarning>
          <TimeSwitch is24Hour={is24Hour} isAutoTimeZone={isAutoTimeZone} manualTimeZone={manualTimeZone} />
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-black cursor-pointer rounded-xs px-3 py-1.5 mx-5 outline-[3] outline-black shadow-md hover:scale-[1.08] transition-transform duration-200 ease-in-out bg-[var(--title-bar)] font-[family-name:var(--font-space-grotesk)]">
            {labels[locale]}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(labels).map(([code, label]) => (
              <DropdownMenuItem key={code} onSelect={() => switchLocale(code)}>
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
