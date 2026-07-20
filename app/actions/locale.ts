"use server";

import { cookies } from "next/headers";

/**
 * Persists the user's chosen language as a cookie so the server can pick the
 * right locale (and next-intl message bundle) on the next request. Read back
 * in src/i18n/request.ts.
 */
export async function setLocale(locale: string) {
    const store = await cookies();
    store.set("locale", locale, {path: "/", maxAge: 60 * 60 * 24 * 30}); // set the cookie to expire in 30 days
}
