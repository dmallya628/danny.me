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
          <button
            onClick={() => switchLocale(code)}
            className={clsx(
              "ml-auto w-10 h-10 rounded-xs border-2 border-[var(--near-black)] shadow-[2px_2px_0px_0px_black] cursor-pointer transition-colors duration-125 ease-in-out",
              locale === code ? "bg-[var(--standard-action)]" : "bg-[var(--disabled)]"
            )}
          />
        </div>
      ))}
    </div>
  );
}
