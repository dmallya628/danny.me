"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import DesktopIcon from "@/components/icons/desktop-icon";
import ThemedIcon from "@/components/icons/themed-icon";

import Navbar from "@/components/navbar";
import Window from "@/components/window";

import About from "@/components/window-contents/about/about";
import Portfolio from "@/components/window-contents/portfolio";
import Settings from "@/components/window-contents/settings/settings";
import Studio from "@/components/window-contents/studio";
import TicTacToe from "@/components/window-contents/tictactoe";
import TimeZoneSelection from "@/components/window-contents/time-zone-selection";
import { setIsAutoTimezone, setTimeZone } from "@/app/actions/time-zone";

type WindowId = "about" | "portfolio" | "studio" | "settings" | "tictactoe";
type AnyWindowId = WindowId | "timeZoneSelection";

const WINDOWS: {
  id: WindowId;
  column: "left" | "middle" | "right";
  desktopLabel: string;
  desktopIcon: { light: string; dark: string };
  windowTitle: string;
  favIcon: string;
}[] = [
  {
    id: "about",
    column: "left",
    desktopLabel: "about.pdf",
    desktopIcon: {
      light: "/light/desktop/no-shadow/file.svg",
      dark: "/dark/desktop/file.svg",
    },
    windowTitle: "about.pdf",
    favIcon: "/window/title-bar-icons/file.svg",
  },
  {
    id: "portfolio",
    column: "left",
    desktopLabel: "portfolio",
    desktopIcon: {
      light: "/light/desktop/no-shadow/folder.svg",
      dark: "/dark/desktop/folder.svg",
    },
    windowTitle: "portfolio",
    favIcon: "/window/title-bar-icons/folder.svg",
  },
  {
    id: "studio",
    column: "left",
    // replace the studio_loading icon with the studio icon when studio site is published
    desktopLabel: "studio_",
    desktopIcon: {
      light: "/light/desktop/no-shadow/disc-temp.svg",
      dark: "/dark/desktop/studio_loading.svg", // TODO: asset missing from public/dark/desktop
    },
    windowTitle: "studio",
    favIcon: "/window/title-bar-icons/disc-temp.svg",
  },
  {
    id: "settings",
    column: "middle",
    desktopLabel: "settings",
    desktopIcon: {
      light: "/light/desktop/no-shadow/settings.svg",
      dark: "/dark/desktop/settings.svg",
    },
    windowTitle: "site preferences",
    favIcon: "/window/title-bar-icons/settings.svg",
  },
  {
    id: "tictactoe",
    column: "right",
    desktopLabel: "tictactoe",
    desktopIcon: {
      light: "/light/desktop/no-shadow/grid.svg",
      dark: "/dark/desktop/tictactoe.svg", // TODO: asset missing from public/dark/desktop
    },
    windowTitle: "tictactoe",
    favIcon: "/window/title-bar-icons/grid.svg",
  },
];

const initialZIndices = WINDOWS.reduce((acc, w, i) => {
  acc[w.id] = 1000 + i;
  return acc;
}, {} as Record<AnyWindowId, number>);
initialZIndices.timeZoneSelection = 1000 + WINDOWS.length;

export default function HomePage() {
  const desktopRef = useRef<HTMLDivElement>(null);

  // system settings functions
  const [is24Hour, set24Hour] = useState(false);
  const [isAutoTimeZone, setAutoTimeZone] = useState(true);
  const [manualTimeZone, setManualTimeZoneState] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const isAutoMatch = document.cookie.match(/(?:^|; )isAutoTimezone=([^;]+)/);
    if (isAutoMatch) setAutoTimeZone(isAutoMatch[1] === "true");

    const tzMatch = document.cookie.match(/(?:^|; )timezone=([^;]+)/);
    if (tzMatch) setManualTimeZoneState(decodeURIComponent(tzMatch[1]));
  }, []);

  const toggleAutoTimeZone = () => {
    const next = !isAutoTimeZone;
    setAutoTimeZone(next);
    setIsAutoTimezone(next);
    if (!next) bringWindowToFront("timeZoneSelection");
  };

  const selectManualTimeZone = (timeZone: string) => {
    setManualTimeZoneState(timeZone);
    setTimeZone(timeZone);
  };

  const [openWindows, setOpenWindows] = useState<Record<WindowId, boolean>>({
    about: false,
    portfolio: false,
    studio: false,
    settings: false,
    tictactoe: false,
  });

  //z-index management for window stacking
  const [zIndices, setZIndices] = useState<Record<AnyWindowId, number>>(
    initialZIndices
  );
  const [highestZIndex, setHighestZIndex] = useState(
    Math.max(...Object.values(initialZIndices))
  );

  const bringWindowToFront = (id: AnyWindowId) => {
    const newZIndex = highestZIndex + 1;
    setZIndices((prev) => ({ ...prev, [id]: newZIndex }));
    setHighestZIndex(newZIndex);
  };

  const openWindow = (id: WindowId) => {
    setOpenWindows((prev) => ({ ...prev, [id]: true }));
    bringWindowToFront(id);
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const windowContent: Record<WindowId, React.ReactNode> = {
    about: <About />,
    portfolio: <Portfolio />,
    studio: <Studio />,
    settings: (
      <Settings
        is24Hour={is24Hour}
        onToggle24Hour={() => set24Hour(!is24Hour)}
        isAutomaticTimeZone={isAutoTimeZone}
        onToggleAutomaticTimeZone={toggleAutoTimeZone}
      />
    ),
    tictactoe: <TicTacToe />,
  };

  const renderDesktopIcon = (w: (typeof WINDOWS)[number]) => (
    <DesktopIcon
      key={w.id}
      title={w.desktopLabel}
      icon={
        <ThemedIcon light={w.desktopIcon.light} dark={w.desktopIcon.dark} />
      }
      onClick={() => openWindow(w.id)}
    />
  );

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-mono)]">
      <Navbar
        is24Hour={is24Hour}
        isAutoTimeZone={isAutoTimeZone}
        manualTimeZone={manualTimeZone}
      />
      <div
        ref={desktopRef}
        className="fixed w-full top-10 desktop-content"
        style={{ zIndex: 1 }}
      >
        {/* main content */}
        <main className="flex justify-start items-start gap-x-15 gap-y-10 mt-5 px-5">
          {/* left column */}
          <div className="flex flex-col gap-[2rem] font-semibold">
            {WINDOWS.filter((w) => w.column === "left").map(renderDesktopIcon)}
          </div>
          {/* middle-left column */}
          <div className="flex flex-col gap-[2rem] font-mono font-semibold">
            {WINDOWS.filter((w) => w.column === "middle").map(
              renderDesktopIcon
            )}
          </div>
          <div className="flex flex-col gap-[2rem] font-mono font-semibold ml-auto">
            {/* right desktop icons */}
            {WINDOWS.filter((w) => w.column === "right").map(
              renderDesktopIcon
            )}
          </div>
        </main>
        {/* desktop window functions */}
        <AnimatePresence>
          {WINDOWS.filter((w) => openWindows[w.id]).map((w) => (
            <Window
              key={w.id}
              favIcon={w.favIcon}
              title={w.windowTitle}
              onClose={() => closeWindow(w.id)}
              dragContainerRef={desktopRef}
              zIndex={zIndices[w.id]}
              focus={() => bringWindowToFront(w.id)}
            >
              {windowContent[w.id]}
            </Window>
          ))}
          {/* time zone selection pops up only while automatic detection is off */}
          {!isAutoTimeZone && (
            <Window
              key="timeZoneSelection"
              favIcon="/window/title-bar-icons/settings.svg"
              title="settings"
              onClose={toggleAutoTimeZone}
              dragContainerRef={desktopRef}
              zIndex={zIndices.timeZoneSelection}
              focus={() => bringWindowToFront("timeZoneSelection")}
            >
              <TimeZoneSelection
                manualTimeZone={manualTimeZone}
                onSelectTimeZone={selectManualTimeZone}
              />
            </Window>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
