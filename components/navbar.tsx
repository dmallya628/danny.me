"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/nav.module.css";

export default function Navbar({ is24Hour }: { is24Hour: boolean }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (is24Hour: boolean) => {
    const dateSection = Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    const timeSection = Intl.DateTimeFormat([], {
      hour: "numeric",
      minute: "2-digit",
      second: undefined,
      hour12: !is24Hour,
    }).format(date);

    return `${dateSection} · ${timeSection}`;
  };

  return (
    <div
      className={`${styles.navContent} fixed top-0 left-0 right-0 md:h-20 flex justify-between items-center px-3 md:px-6 text-xs md:text-sm shadow-sm border border-[var(--bg-border)] z-60`}
    >
      <span className="font-black md:text-base">D.ME</span>
      <div className="flex items-center gap-4">
        <span className="font-medium md:text-base" suppressHydrationWarning>
          {formatDateTime(is24Hour)}
        </span>
        <button className="font-bold cursor-pointer rounded-xs px-3 py-1.5 mx-5 outline-[3] outline-black shadow-md hover:scale-[1.08] transition-transform duration-200 ease-in-out bg-[var(--title-bar)]">
          ENG {/* isEng ? "ENG" : "{INSERT LANGUAGE}" */}
        </button>
      </div>
    </div>
  );
}
