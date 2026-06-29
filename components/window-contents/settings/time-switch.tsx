import { useState, useEffect } from "react";

// add automatic timezone detection and switching based on user location

export default function TimeSwitch({
  is24Hour,
}: {
  is24Hour: boolean;
}) {
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

  return (formatDateTime(is24Hour));
}
