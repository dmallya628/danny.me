'use client'

import { useState, useEffect } from "react";

/**
 * Live clock shown in the navbar. Ticks every second and formats the
 * current time in either the auto-detected browser time zone or a
 * manually-selected one, depending on `isAutoTimeZone`.
 *
 * State (which zone is "manual", whether auto-detect is on) is owned by
 * app/page.tsx and passed down as props — this component is a pure
 * formatter, it doesn't read cookies or manage its own time-zone state.
 */
export default function DateTime({
  is24Hour,
  isAutoTimeZone,
  /** IANA zone name (e.g. "Asia/Tokyo") used when isAutoTimeZone is false. */
  manualTimeZone,
}: {
  is24Hour: boolean;
  isAutoTimeZone: boolean;
  manualTimeZone: string;
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const autoTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZone = isAutoTimeZone ? autoTimeZone : manualTimeZone;

  const formatDateTime = (is24Hour: boolean) => {
    const dateSection = Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timeZone,
    }).format(date);

    const timeSection = Intl.DateTimeFormat([], {
      hour: "numeric",
      minute: "2-digit",
      second: undefined,
      hour12: !is24Hour,
      timeZone: timeZone,
    }).format(date);

    return `${dateSection} · ${timeSection}`;
  };

  return (formatDateTime(is24Hour));
}
