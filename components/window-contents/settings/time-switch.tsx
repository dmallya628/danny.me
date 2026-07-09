import { useState, useEffect } from "react";

export default function TimeSwitch({
  is24Hour,
  isAutoTimeZone,
}: {
  is24Hour: boolean;
  isAutoTimeZone: boolean;
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const autoTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const manualTimeZone = "Asia/Tokyo"; // store.get("timezone")?.value;
  const isAuto = isAutoTimeZone; // temporarily hardcoded, will be replaced with user-selected setting from settings

  const timeZone = isAuto ? autoTimeZone : manualTimeZone;

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
