"use client";

import styles from "@/styles/nav.module.css";
import TimeSwitch from "./window-contents/settings/time-switch";

export default function Navbar({ is24Hour }: { is24Hour: boolean }) {

  return (
    <div
      className={`${styles.navContent} fixed top-0 left-0 right-0 md:h-20 flex justify-between items-center px-3 md:px-6 text-xs md:text-sm shadow-sm border border-[var(--bg-border)] z-60`}
    >
      <span className="text-xl font-[family-name:var(--font-gasoek-one)]">D.ME</span>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-base font-[family-name:var(--font-ibm-plex-mono)]" suppressHydrationWarning>
          <TimeSwitch is24Hour={is24Hour} />
        </span>
        <button className="font-black cursor-pointer rounded-xs px-3 py-1.5 mx-5 outline-[3] outline-black shadow-md hover:scale-[1.08] transition-transform duration-200 ease-in-out bg-[var(--title-bar)] font-[family-name:var(--font-space-grotesk)]">
          ENG {/* isEng ? "ENG" : "{INSERT LANGUAGE}" */}
        </button>
      </div>
    </div>
  );
}
