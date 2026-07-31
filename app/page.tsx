"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import DesktopIcon from "@/components/icons/desktop-icon";

import Navbar from "@/components/navbar";
import Window from "@/components/window";

import About from "@/components/window-contents/about/about";
import Portfolio from "@/components/window-contents/portfolio";
import Settings from "@/components/window-contents/settings/settings";
import Studio from "@/components/window-contents/studio";
import TicTacToe from "@/components/window-contents/tictactoe";
import TimeZoneSelection from "@/components/window-contents/time-zone-selection";
import { setIsAutoTimezone, setTimeZone } from "@/app/actions/time-zone";

// The 5 "real" desktop apps, each with its own icon. The Time Zone
// Selection window is deliberately NOT one of these — it has no desktop
// icon and only appears contextually (see the isAutoTimeZone-driven render
// below), so it's tracked separately via AnyWindowId instead.
type WindowId = "about" | "portfolio" | "studio" | "settings" | "tictactoe";
type AnyWindowId = WindowId | "timeZoneSelection";

// Single source of truth for every desktop icon + its window: which desktop
// column it sits in, its light/dark icon assets, and the window chrome
// (title, title-bar favicon) it opens. Rendering both the icon grid and the
// window list from this one array keeps them from drifting out of sync.
const WINDOWS: {
  id: WindowId;
  column: "left" | "middle" | "right";
  desktopLabel: string;
  desktopIcon: { light: string; dark: string };
  windowTitle: string;
  favIcon: string;
  /** Design-intended window size in px, read off each window's Figma frame — see Window's width/height props. */
  size: { width: number; height: number };
}[] = [
  {
    id: "about",
    column: "left",
    desktopLabel: "about.pdf",
    desktopIcon: {
      light: "/light/desktop/icons/file.svg",
      dark: "/dark/desktop/icons/file.svg",
    },
    windowTitle: "about.pdf",
    favIcon: "/window/title-bar-icons/file.svg",
    size: { width: 540, height: 470 },
  },
  {
    id: "portfolio",
    column: "left",
    desktopLabel: "portfolio",
    desktopIcon: {
      light: "/light/desktop/icons/folder.svg",
      dark: "/dark/desktop/icons/folder.svg",
    },
    windowTitle: "portfolio",
    favIcon: "/window/title-bar-icons/folder.svg",
    size: { width: 650, height: 445 },
  },
  {
    id: "studio",
    column: "left",
    // replace the studio_loading icon with the studio icon when studio site is published
    desktopLabel: "studio_",
    desktopIcon: {
      light: "/light/desktop/icons/disc.svg",
      dark: "/dark/desktop/icons/disc.svg",
    },
    windowTitle: "studio",
    favIcon: "/window/title-bar-icons/disc.svg",
    size: { width: 532, height: 242 },
  },
  {
    id: "settings",
    column: "middle",
    desktopLabel: "settings",
    desktopIcon: {
      light: "/light/desktop/icons/gear.svg",
      dark: "/dark/desktop/icons/gear.svg",
    },
    windowTitle: "site preferences",
    favIcon: "/window/title-bar-icons/settings.svg",
    size: { width: 540, height: 470 },
  },
  {
    id: "tictactoe",
    column: "right",
    desktopLabel: "tictactoe",
    desktopIcon: {
      light: "/light/desktop/icons/grid.svg",
      dark: "/dark/desktop/icons/grid.svg",
    },
    windowTitle: "tictactoe",
    favIcon: "/window/title-bar-icons/grid.svg",
    size: { width: 500, height: 650 },
  },
];

// Derive each window's starting stacking order from WINDOWS, then append
// the Time Zone Selection window's own initial z-index on top — avoids
// hand-maintaining a second parallel object that could drift out of sync
// with WINDOWS.
const initialZIndices = WINDOWS.reduce((acc, w, i) => {
  acc[w.id] = 1000 + i;
  return acc;
}, {} as Record<AnyWindowId, number>);
initialZIndices.timeZoneSelection = 1000 + WINDOWS.length;

export default function HomePage() {
  const desktopRef = useRef<HTMLDivElement>(null);
  // Anchor for the Time Zone Selection popup, which spawns centered over —
  // and blurs — the Settings window that triggers it.
  const settingsWindowRef = useRef<HTMLDivElement>(null);

  // system settings functions
  const [is24Hour, set24Hour] = useState(false);
  const [isAutoTimeZone, setAutoTimeZone] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  // Seeded from the browser's real zone so there's a sane default before the
  // cookie-read effect below has a chance to run (SSR has no access to it).
  const [manualTimeZone, setManualTimeZoneState] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // One-time hydration from cookies on mount (can't read cookies during SSR
  // for a "use client" component, so this has to happen client-side after
  // the initial render rather than as the useState initializer above).
  useEffect(() => {
    const isAutoMatch = document.cookie.match(/(?:^|; )isAutoTimezone=([^;]+)/);
    if (isAutoMatch) setAutoTimeZone(isAutoMatch[1] === "true");

    const tzMatch = document.cookie.match(/(?:^|; )timezone=([^;]+)/);
    if (tzMatch) setManualTimeZoneState(decodeURIComponent(tzMatch[1]));
  }, []);

  // Tracks whether the user has explicitly closed the Time Zone Selection
  // popup via its own X button. Kept separate from isAutoTimeZone (rather
  // than reusing it to also mean "popup closed") so that closing the popup
  // doesn't silently flip automatic detection back on — see
  // toggleAutoTimeZone/dismissTimeZonePopup below.
  const [isTimeZonePopupDismissed, setTimeZonePopupDismissed] = useState(false);

  const toggleAutoTimeZone = () => {
    const next = !isAutoTimeZone;
    setAutoTimeZone(next);
    setIsAutoTimezone(next);
    if (next) {
      // Re-sync the "manual" pick to the browser's real zone whenever automatic
      // detection is turned back on, so a stale manual choice (e.g. Tokyo from a
      // previous manual session) never resurfaces as the default the next time
      // the user switches automatic detection off again.
      const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setManualTimeZoneState(detectedTimeZone);
      setTimeZone(detectedTimeZone);
    } else {
      // Reset the dismissed flag so turning automatic detection off always
      // re-shows the popup, even if the user had previously closed it.
      setTimeZonePopupDismissed(false);
      bringWindowToFront("timeZoneSelection");
    }
  };

  // The popup's own close (X) button: hides the popup WITHOUT touching
  // isAutoTimeZone, so a manually-picked city stays in effect after closing
  // instead of being discarded by an implicit "turn automatic back on".
  const dismissTimeZonePopup = () => setTimeZonePopupDismissed(true);

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

  // Click-to-front: bump the target window's z-index one above whatever the
  // current highest is, and remember the new highest for next time.
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

  // What each window actually renders inside its chrome. Kept as a lookup
  // object (rather than a switch inside the render loop below) so adding a
  // new window only means adding one WINDOWS entry + one entry here.
  const windowContent: Record<WindowId, React.ReactNode> = {
    about: <About animate={animationsEnabled} />,
    portfolio: <Portfolio />,
    studio: <Studio />,
    settings: (
      <Settings
        is24Hour={is24Hour}
        onToggle24Hour={() => set24Hour(!is24Hour)}
        isAutomaticTimeZone={isAutoTimeZone}
        onToggleAutomaticTimeZone={toggleAutoTimeZone}
        animationsEnabled={animationsEnabled}
        onToggleAnimations={() => setAnimationsEnabled((a) => !a)}
      />
    ),
    tictactoe: <TicTacToe />,
  };

  const renderDesktopIcon = (w: (typeof WINDOWS)[number]) => (
    <DesktopIcon
      key={w.id}
      title={w.desktopLabel}
      light={w.desktopIcon.light}
      dark={w.desktopIcon.dark}
      onClick={() => openWindow(w.id)}
      animate={animationsEnabled}
      // Every desktop icon is above the fold and visible on first paint, so
      // all of them are legitimate LCP candidates — mark them all priority
      // rather than guessing which one the browser will actually pick.
      priority
    />
  );

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-mono)]">
      <Navbar
        is24Hour={is24Hour}
        isAutoTimeZone={isAutoTimeZone}
        manualTimeZone={manualTimeZone}
        animate={animationsEnabled}
      />
      <div
        ref={desktopRef}
        className="fixed w-full top-10 desktop-content"
        // Raised above the navbar's own z-60 (see nav.module.css) so that
        // this whole subtree — and every window inside it, regardless of
        // its own z-index — forms a stacking context that renders above the
        // navbar. Without this, windows would be capped below the navbar in
        // the global stacking order (their z-index of 1000+ only matters
        // *within* this container, not against siblings outside it), which
        // previously caused maximized windows to render underneath the navbar.
        style={{ zIndex: 70 }}
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
              ref={w.id === "settings" ? settingsWindowRef : undefined}
              favIcon={w.favIcon}
              title={w.windowTitle}
              onClose={() => closeWindow(w.id)}
              dragContainerRef={desktopRef}
              zIndex={zIndices[w.id]}
              focus={() => bringWindowToFront(w.id)}
              animate={animationsEnabled}
              width={w.size.width}
              height={w.size.height}
              blurred={
                w.id === "settings"
                  ? !isAutoTimeZone && !isTimeZonePopupDismissed
                  : false
              }
            >
              {windowContent[w.id]}
            </Window>
          ))}
          {/* Time Zone Selection has no desktop icon of its own — its
              visibility is entirely derived from the automatic-detection
              toggle (and whether the user has since dismissed it), rather
              than being opened/closed like the windows above. It spawns
              centered over — and blurs — the Settings window (see above)
              since that's what triggers it. */}
          {!isAutoTimeZone && !isTimeZonePopupDismissed && (
            <Window
              key="timeZoneSelection"
              favIcon="/window/title-bar-icons/settings.svg"
              title="settings"
              onClose={dismissTimeZonePopup}
              dragContainerRef={desktopRef}
              zIndex={zIndices.timeZoneSelection}
              focus={() => bringWindowToFront("timeZoneSelection")}
              animate={animationsEnabled}
              width={532}
              height={325}
              anchorRef={settingsWindowRef}
            >
              <TimeZoneSelection
                manualTimeZone={manualTimeZone}
                onSelectTimeZone={selectManualTimeZone}
                animate={animationsEnabled}
              />
            </Window>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

