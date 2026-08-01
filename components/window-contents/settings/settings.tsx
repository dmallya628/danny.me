"use client";

import SectionCard from "@/components/ui/section-card";
import ThemeSwitch from "./modules/theme-switch";
import LangSwitch from "./modules/lang-switch";
import ToggleSwitch from "./modules/toggle-switch";

/**
 * Content of the "site preferences" window. All actual state (theme is the
 * exception — that lives in next-themes) is owned by app/page.tsx and
 * passed down as props/callbacks, so this component is purely presentational.
 */
export default function Settings({
  is24Hour,
  onToggle24Hour,
  isAutomaticTimeZone,
  onToggleAutomaticTimeZone,
  animationsEnabled,
  onToggleAnimations,
}: {
  is24Hour: boolean;
  onToggle24Hour: () => void;
  /** Turning this off pops open the Time Zone Selection window (see app/page.tsx); turning it back on re-syncs to the browser's real zone. */
  isAutomaticTimeZone: boolean;
  onToggleAutomaticTimeZone: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: () => void;
}) {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-12 antialiased">
      {/* Appearance */}
      <SectionCard key="Appearance" title="Appearance">
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">Theme</h4>
          <div className="ml-auto">
            <ThemeSwitch animate={animationsEnabled} />
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">Animations</h4>
          <div className="ml-auto">
            {/* This toggle controls its own animation, too — flipping it off
                should make its own handle snap instantly rather than
                springing, since the setting takes effect immediately. */}
            <ToggleSwitch
              checked={animationsEnabled}
              onChange={onToggleAnimations}
              animate={animationsEnabled}
            />
          </div>
        </div>
      </SectionCard>

      {/* Date & Time */}
      <SectionCard key="Date & Time" title="Date & Time">
        {/* Automatic Time Zone Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold max-w-[150px]">
            Automatic Time Zone Detection
          </h4>
          <div className="ml-auto">
            <ToggleSwitch
              checked={isAutomaticTimeZone}
              onChange={onToggleAutomaticTimeZone}
              animate={animationsEnabled}
            />
          </div>
        </div>
        {/* 24 Hour Time Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold">24-Hour Time</h4>
          <div className="ml-auto">
            <ToggleSwitch
              checked={is24Hour}
              onChange={onToggle24Hour}
              animate={animationsEnabled}
            />
          </div>
        </div>
      </SectionCard>

      {/* Language Settings */}
      <SectionCard key="Language" title="Language">
          <LangSwitch animate={animationsEnabled} />
      </SectionCard>
    </div>
  );
}
