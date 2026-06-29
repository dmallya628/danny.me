import { useState } from "react";
import clsx from "clsx";

export default function LangSwitch() {
  const [isENG, setIsENG] = useState(true);
  const [isKOR, setIsKOR] = useState(false);
  const [isCHN, setIsCHN] = useState(false);

  const toggleLanguage = (language: string) => {
    setIsENG(language === "ENG");
    setIsKOR(language === "KOR");
    setIsCHN(language === "CHN");
  };

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="relative flex w-full items-center">
        <h4 className="font-semibold text-lg">English</h4>
        <div className="ml-auto border-2 rounded-xs w-6 h-6">
          <button
            onClick={() => toggleLanguage("ENG")}
            className={clsx(
              "w-full h-full rounded-xs cursor-pointer transition-colors duration-125 ease-in-out",
              { "bg-[var(--primary)]": isENG },
            )}
          >
            <div
              className={clsx(
                "w-9/10 h-9/10 justify-self-center self-center rounded-xs border-2 border-[var(--near-black)] transition-colors duration-125 ease-in-out",
                { "bg-white": isENG },
              )}
            />
          </button>
        </div>
      </div>

      {/* Korean */}
      <div className="relative flex w-full items-center">
        <h4 className="font-semibold text-lg">한국어</h4>
        <div className="ml-auto border-2 rounded-xs w-6 h-6 flex items-center justify-center">
          <button
            onClick={() => toggleLanguage("KOR")}
            className={clsx(
              "w-full h-full rounded-xs cursor-pointer transition-colors duration-125 ease-in-out",
              { "bg-[var(--primary)]": isKOR },
            )}
          >
            <div
              className={clsx(
                "w-9/10 h-9/10 justify-self-center self-center rounded-xs border-2 border-[var(--near-black)] transition-colors duration-125 ease-in-out",
                { "bg-white": isKOR },
              )}
            />
          </button>
        </div>
      </div>
      {/* Chinese */}
      <div className="relative flex w-full items-center">
        <h4 className="font-semibold text-lg">中文</h4>
        <div className="ml-auto border-2 rounded-xs w-6 h-6 flex items-center justify-center">
          <button
            onClick={() => toggleLanguage("CHN")}
            className={clsx(
              "w-full h-full rounded-xs cursor-pointer transition-colors duration-125 ease-in-out",
              { "bg-[var(--primary)]": isCHN },
            )}
          >
            <div
              className={clsx(
                "w-9/10 h-9/10 justify-self-center self-center rounded-xs border-2 border-[var(--near-black)] transition-colors duration-125 ease-in-out",
                { "bg-white": isCHN },
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
