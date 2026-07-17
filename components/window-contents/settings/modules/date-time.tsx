'use client'

import { useState, useEffect } from "react";

export default function DateTime({
  is24Hour,
  isAutoTimeZone,
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
