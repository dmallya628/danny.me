"use client";

import SettingCard from "./setting-card";
import ThemeSwitch from "./theme-switch";
import LangSwitch from "./lang-switch";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "@/styles/toggle.module.css";
import clsx from "clsx";

export default function Settings({
  is24Hour,
  set24Hour,
  isAutomaticTimeZone,
  setAutomaticTimeZone,
}: {
  is24Hour: boolean;
  set24Hour: (value: boolean) => void;
  isAutomaticTimeZone: boolean;
  setAutomaticTimeZone: (value: boolean) => void;
}) {
  const [animationOn, setAnimationOn] = useState(true);
  const toggleAnimation = () => setAnimationOn(!animationOn);

  const toggleAutomaticTimeZone = () =>
    setAutomaticTimeZone(!isAutomaticTimeZone);

  const toggle24hour = () => set24Hour(!is24Hour);

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
            <button
              className={clsx(styles.toggleContainer, {
                [styles.on]: animationOn,
                [styles.off]: !animationOn,
              })}
              onClick={toggleAnimation}
            >
              <motion.div
                className={styles.toggleHandle}
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </button>
          </div>
        </div>
      </SettingCard>

      {/* Date & Time */}
      <SettingCard key="Date & Time" title="Date & Time">
        {/* Automatic Time Zone Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold whitespace-pre-line">
            Automatic <br></br> Time Zone
          </h4>
          <div className="ml-auto">
            <button
              className={clsx(styles.toggleContainer, {
                [styles.on]: isAutomaticTimeZone,
                [styles.off]: !isAutomaticTimeZone,
              })}
              onClick={toggleAutomaticTimeZone}
            >
              <motion.div
                className={styles.toggleHandle}
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </button>
          </div>
        </div>
        {/* 24 Hour Time Toggle */}
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold">24-Hour Time</h4>
          <div className="ml-auto">
            <button
              className={clsx(styles.toggleContainer, {
                [styles.on]: is24Hour,
                [styles.off]: !is24Hour,
              })}
              onClick={toggle24hour}
            >
              <motion.div
                className={styles.toggleHandle}
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </button>
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
