"use client";

import { useRouter } from "next/navigation";
import { useLocale as useNextIntlLocale } from "next-intl";
import { setLocale } from "@/app/actions/locale";

/** Labels shown in every locale picker (navbar dropdown, Settings > Language). */
export const LANGUAGE_LABELS: Record<string, string> = {
  en: "ENG",
  ko: "한국어",
  zh: "中文",
};

/**
 * Shared locale-switching logic used by both the navbar dropdown and the
 * Settings > Language list, so the two stay in sync without duplicating the
 * persistence/refresh logic.
 */
export function useLocaleSwitch() {
  const locale = useNextIntlLocale(); // current locale, read from next-intl context
  const router = useRouter();

  const switchLocale = async (next: string) => {
    await setLocale(next); // persists the "locale" cookie server-side
    router.refresh(); // re-renders server components with new messages
  };

  return { locale, switchLocale, labels: LANGUAGE_LABELS };
}
