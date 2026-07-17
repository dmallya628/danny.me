"use client";

import SettingCard from "./setting-card";
import ThemeSwitch from "./modules/theme-switch";
import LangSwitch from "./modules/lang-switch";
import ToggleSwitch from "./modules/toggle-switch";
import { useState } from "react";

export default function Settings({
  is24Hour,
  onToggle24Hour,
  isAutomaticTimeZone,
  onToggleAutomaticTimeZone,
}: {
  is24Hour: boolean;
  onToggle24Hour: () => void;
  isAutomaticTimeZone: boolean;
  onToggleAutomaticTimeZone: () => void;
}) {
  const [animationOn, setAnimationOn] = useState(true);
  const toggleAnimation = () => setAnimationOn(!animationOn);

  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-12 antialiased">
      {/* Appearance */}
      <SettingCard key="Appearance" title="Appearance">
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">Theme</h4>
          <div className="ml-auto">
            <ThemeSwitch />
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">Animations</h4>
          <div className="ml-auto">
            <ToggleSwitch checked={animationOn} onChange={toggleAnimation} />
          </div>
        </div>
      </SettingCard>

      {/* Date & Time */}
      <SettingCard key="Date & Time" title="Date & Time">
        {/* Automatic Time Zone Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold max-w-[150px]">
            Automatic Time Zone Detection
          </h4>
          <div className="ml-auto">
            <ToggleSwitch
              checked={isAutomaticTimeZone}
              onChange={onToggleAutomaticTimeZone}
            />
          </div>
        </div>
        {/* 24 Hour Time Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold">24-Hour Time</h4>
          <div className="ml-auto">
            <ToggleSwitch checked={is24Hour} onChange={onToggle24Hour} />
          </div>
        </div>
      </SettingCard>

      {/* Language Settings */}
      <SettingCard key="Language" title="Language">
          <LangSwitch />
      </SettingCard>
    </div>
  );
}
