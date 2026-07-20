"use server";

import { cookies } from "next/headers";

/**
 * Persists the manually-selected IANA time zone (e.g. "Asia/Tokyo") so it
 * survives page reloads. Only meaningful while automatic detection is off —
 * see setIsAutoTimezone below and the toggle logic in app/page.tsx.
 */
export async function setTimeZone(timezone: string) {
    const store = await cookies();
    store.set("timezone", timezone, {path: "/", maxAge: 60 * 60 * 24 * 30}); // set the cookie to expire in 30 days
}

/**
 * Persists whether the site should auto-detect the visitor's time zone
 * (via the browser's Intl API) instead of using the manually chosen one.
 */
export async function setIsAutoTimezone(isAuto: boolean) {
  const store = await cookies();
  store.set("isAutoTimezone", String(isAuto), { path: "/", maxAge: 60 * 60 * 24 * 365 });
}
