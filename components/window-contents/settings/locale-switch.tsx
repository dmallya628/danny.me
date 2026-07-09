"use client";

import { useRouter } from "next/navigation";
import { useLocale as useNextIntlLocale } from "next-intl";
import { setLocale } from "@/app/actions/locale";

export const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  ko: "한국어",
  zh: "中文",
};

export function useLocaleSwitch() {
  const locale = useNextIntlLocale(); // current locale, read from next-intl context
  const router = useRouter();

  const switchLocale = async (next: string) => {
    await setLocale(next);
    router.refresh(); // re-renders server components with new messages
  };

  return { locale, switchLocale, labels: LANGUAGE_LABELS };
}