"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  AboutIcon,
  PortfolioIcon,
  SettingsIcon,
  StudioIcon,
  TicTacIcon,
} from "@/components/icons/icon-library";

import Navbar from "@/components/navbar";
import Window from "@/components/window";

import About from "@/components/window-contents/about/about";
import Portfolio from "@/components/window-contents/portfolio";
import Settings from "@/components/window-contents/settings/settings";
import Studio from "@/components/window-contents/studio";
import TicTacToe from "@/components/window-contents/tictactoe";

export default function HomePage() {
  const desktopRef = useRef<HTMLDivElement>(null);

  // system settings functions
  const [is24Hour, set24Hour] = useState(false);
  const [isAutoTimeZone, setAutoTimeZone] = useState(true);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isTicTacToeOpen, setIsTicTacToeOpen] = useState(false);

  //z-index management for window stacking
  const [windowZIndex, setWindowZIndex] = useState({
    about: 1000,
    portfolio: 1001,
    studio: 1002,
    settings: 1003,
    tictactoe: 1004,
  });
  const [highestZIndex, setHighestZIndex] = useState(1004); //add a state variable to track the highest z-index value

  const bringWindowToFront = (windowKey: keyof typeof windowZIndex) => {
    const newZIndex = highestZIndex + 1;
    setWindowZIndex((prev) => ({
      ...prev,
      [windowKey]: newZIndex,
    }));
    setHighestZIndex(newZIndex);
  };

  
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-mono)]">
      <Navbar is24Hour={is24Hour} isAutoTimeZone={isAutoTimeZone} />
      <div
        ref={desktopRef}
        className="fixed w-full top-10 desktop-content"
        style={{ zIndex: 1 }}
      >
        {/* main content */}
        <main className="flex justify-start items-start gap-x-15 gap-y-10 mt-5 px-5">
          {/* left column */}
          <div className="flex flex-col gap-[2rem] font-semibold">
            <AboutIcon
              onClick={() => {
                setIsAboutOpen(true);
                bringWindowToFront("about");
              }}
            />
            <PortfolioIcon
              onClick={() => {
                setIsPortfolioOpen(true);
                bringWindowToFront("portfolio");
              }}
            />
            <StudioIcon
              onClick={() => {
                setIsStudioOpen(true);
                bringWindowToFront("studio");
              }}
            />
          </div>
          {/* middle-left column */}
          <div className="flex flex-col gap-[2rem] font-mono font-semibold">
            <SettingsIcon
              onClick={() => {
                setIsSettingsOpen(true);
                bringWindowToFront("settings");
              }}
            />
          </div>
          <div className="flex flex-col gap-[2rem] font-mono font-semibold ml-auto">
            {/* right desktop icons */}
            <TicTacIcon
              onClick={() => {
                setIsTicTacToeOpen(true);
                bringWindowToFront("tictactoe");
              }}
            />
          </div>
        </main>
        {/* left window functions */}
        <AnimatePresence>
          {isAboutOpen && (
            <Window
              favIcon ="/window/title-bar-icons/file.svg"
              key="about"
              title="about.pdf"
              onClose={() => setIsAboutOpen(false)}
              dragContainerRef={desktopRef}
              zIndex={windowZIndex.about}
              focus={() => bringWindowToFront("about")}
            >
              <About />
            </Window>
          )}
          {isPortfolioOpen && (
            <Window
              favIcon="/window/title-bar-icons/folder.svg"
              key="portfolio"
              title="portfolio"
              onClose={() => setIsPortfolioOpen(false)}
              dragContainerRef={desktopRef}
              zIndex={windowZIndex.portfolio}
              focus={() => bringWindowToFront("portfolio")}
            >
              <Portfolio />
            </Window>
          )}
          {isStudioOpen && (
            <Window
              favIcon="/window/title-bar-icons/disc-temp.svg"
              key="studio"
              title="studio"
              onClose={() => setIsStudioOpen(false)}
              dragContainerRef={desktopRef}
              zIndex={windowZIndex.studio}
              focus={() => bringWindowToFront("studio")}
            >
              <Studio />
            </Window>
          )}
          {isSettingsOpen && (
            <Window
              favIcon="/window/title-bar-icons/settings.svg"
              key="site preferences"
              title="site preferences"
              onClose={() => setIsSettingsOpen(false)}
              dragContainerRef={desktopRef}
              zIndex={windowZIndex.settings}
              focus={() => bringWindowToFront("settings")}
            >
              <Settings
                is24Hour={is24Hour}
                set24Hour={set24Hour}
                isAutomaticTimeZone={isAutoTimeZone}
                setAutomaticTimeZone={setAutoTimeZone}
              />
            </Window>
          )}
          {isTicTacToeOpen && (
            <Window
              favIcon="/window/title-bar-icons/grid.svg"
              key="tictactoe"
              title="tictactoe"
              onClose={() => setIsTicTacToeOpen(false)}
              dragContainerRef={desktopRef}
              zIndex={windowZIndex.tictactoe}
              focus={() => bringWindowToFront("tictactoe")}
            >
              <TicTacToe />
            </Window>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
