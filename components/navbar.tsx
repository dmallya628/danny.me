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
import { Button } from "@/components/ui/button";

/**
 * Fixed top bar: site title, live clock, and a language dropdown. Rendered
 * once by app/page.tsx, outside the desktop/window stacking context.
 *
 * Note: this bar renders at z-60 (see styles/nav.module.css's z-60 utility)
 * while the desktop content area below it is deliberately raised to z-70 in
 * page.tsx so that maximized/dragged windows can render above the navbar
 * instead of sliding underneath it.
 */
export default function Navbar({
  is24Hour,
  isAutoTimeZone,
  manualTimeZone,
  animate = true,
}: {
  is24Hour: boolean;
  isAutoTimeZone: boolean;
  manualTimeZone: string;
  /** Forwarded to the language Button so it respects the site-wide Animations setting. */
  animate?: boolean;
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
        {/* Language switcher: shows the current locale's label; opening it
            lists every supported locale as an explicit choice (previously
            this just cycled to the next locale on click). */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              animate={animate}
              className="mx-5 px-3 py-1.5 font-black bg-[var(--title-bar)] font-[family-name:var(--font-space-grotesk)]"
            >
              {labels[locale]}
            </Button>
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
