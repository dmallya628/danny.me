"use client";

import SettingCard from "./setting-card";
import ThemeSwitch from "../../theme-switch";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "@/styles/toggle.module.css";
import clsx from "clsx";

export default function Settings({
  is24Hour,
  set24Hour,
  automaticTimeZone,
  setAutomaticTimeZone,
}: {
  is24Hour: boolean;
  set24Hour: (value: boolean) => void;
  automaticTimeZone: boolean;
  setAutomaticTimeZone: (value: boolean) => void;
}) {
  const [animationOn, setAnimationOn] = useState(true);
  const toggleAnimation = () => setAnimationOn(!animationOn);

  const toggleAutomaticTimeZone = () =>
    setAutomaticTimeZone(!automaticTimeZone);

  const toggle24hour = () => set24Hour(!is24Hour);

  const [eng, setEng] = useState(true);
  const toggleEng = () => setEng(!eng);

  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-12 antialiased">
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
                [styles.on]: automaticTimeZone,
                [styles.off]: !automaticTimeZone,
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
      <SettingCard key="Language" title="Language">
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">English</h4>
          <div className="ml-auto border-2 rounded-full w-6 h-6">
            <button
              className={clsx(
                "w-full h-full rounded-full cursor-pointer transition-colors duration-125 ease-in-out",
                { "bg-[var(--primary)]": eng },
              )}
              onClick={toggleEng}
            >
              <div
                className={clsx(
                  "w-1/2 h-1/2 justify-self-center self-center rounded-full transition-colors duration-125 ease-in-out",
                  { "bg-white": eng },
                )}
              />
            </button>
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <h4 className="font-semibold text-lg">한국어</h4>
          <div className="ml-auto border-2 rounded-full w-6 h-6">
            <button
              className={clsx(
                "w-full h-full rounded-full cursor-pointer transition-colors duration-125 ease-in-out",
                { "bg-[var(--primary)]": !eng },
              )}
              onClick={toggleEng}
            >
              <div
                className={clsx(
                  "w-1/2 h-1/2 justify-self-center self-center rounded-full transition-colors duration-125 ease-in-out",
                  { "bg-white": !eng },
                )}
              />
            </button>
          </div>
        </div>
      </SettingCard>
    </div>
  );
}
