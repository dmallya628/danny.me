"use server";

import { cookies } from "next/headers";

export async function setTimeZone(timezone: string) {
    const store = await cookies();
    store.set("timezone", timezone, {path: "/", maxAge: 60 * 60 * 24 * 30}); // set the cookie to expire in 30 days
}

export async function setIsAutoTimezone(isAuto: boolean) {
  const store = await cookies();
  store.set("isAutoTimezone", String(isAuto), { path: "/", maxAge: 60 * 60 * 24 * 365 });
}