"use client";

import clsx from "clsx";
import { useLocaleSwitch } from "./locale-switch";

export default function LangSwitch() {
  const { locale, switchLocale, labels } = useLocaleSwitch();

  return (
    <div className="h-full w-full flex flex-col gap-4">
      {Object.entries(labels).map(([code, label]) => (
        <div key={code} className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">{label}</h4>
          <div className="ml-auto border-2 rounded-xs w-6 h-6 flex items-center justify-center">
            <button
              onClick={() => switchLocale(code)}
              className={clsx(
                "w-full h-full rounded-xs cursor-pointer transition-colors duration-125 ease-in-out",
                { "bg-[var(--primary)]": locale === code }
              )}
            >
              <div
                className={clsx(
                  "w-9/10 h-9/10 justify-self-center self-center rounded-xs border-2 border-[var(--near-black)] transition-colors duration-125 ease-in-out",
                  { "bg-white": locale === code }
                )}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}