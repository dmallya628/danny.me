"use client";

import { useState } from "react";
import Toolbar, { ViewMode } from "./components/toolbar";
import BrowserView from "./components/browser-view";
import { Project } from "./types";

/**
 * The "portfolio" window: a Finder-style browser (grid/list, tool sidebar,
 * search). Opening a project spawns it as its own separate Window (see
 * app/page.tsx's openProject state) rather than swapping this window's own
 * content — matching the Figma mockup, where an opened project is its own
 * floating frame, not a view inside the browser.
 *
 * Back/forward stay permanently disabled: there's no nested-folder
 * navigation within the browser (it's a single flat list), so there's never
 * anywhere for them to go yet. They're kept visible rather than removed
 * since the Figma mockups always show them present (just grayed out).
 */
export default function Portfolio({
  animate = true,
  onOpenProject,
}: {
  animate?: boolean;
  onOpenProject: (project: Project) => void;
}) {
  const [view, setView] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");

  return (
    // -m-2 cancels Window's own p-2 content padding (see components/window.tsx)
    // just for this window, so the Toolbar's bottom border and Sidebar's
    // divider (inside BrowserView) actually reach the window's true edges
    // instead of stopping 8px short of them.
    //
    // h-full continues that same "reach the true edges" idea vertically:
    // Window's content wrapper only has a real (non-auto) height while the
    // window is maximized (see the comment on that div in window.tsx), so
    // this only kicks in then. When it does, it hands a real height down to
    // BrowserView's row (flex-1 min-h-0 there), which is what lets
    // Sidebar's divider border reach the bottom of a maximized window
    // instead of stopping wherever the shortest column of content ends.
    <div className="-m-2 flex h-full flex-col">
      <Toolbar
        canGoBack={false}
        canGoForward={false}
        onBack={() => {}}
        onForward={() => {}}
        view={view}
        onViewChange={setView}
        search={search}
        onSearchChange={setSearch}
        animate={animate}
      />
      <BrowserView view={view} search={search} onOpenProject={onOpenProject} animate={animate} />
    </div>
  );
}
