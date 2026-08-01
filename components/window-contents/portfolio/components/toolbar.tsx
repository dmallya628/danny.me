"use client";

import { ArrowLeft, ArrowRight, LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export type ViewMode = "grid" | "list";

/**
 * Portfolio browser's toolbar: back/forward through the browse/project
 * navigation history, a grid/list view toggle, and a name search. Back/
 * forward render as disabled (grayed out) rather than hidden when there's
 * nowhere to go, matching the Figma mockup's own default (no-history) state.
 */
export default function Toolbar({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  view,
  onViewChange,
  search,
  onSearchChange,
  animate = true,
}: {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  /** Grid/list toggle is only shown when both are provided — hidden while a single project is open. */
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  animate?: boolean;
}) {
  return (
    <div className="flex items-center gap-8 px-4 py-3 border-b-[3px] border-[var(--near-black)]">
      <div className="flex items-center gap-2">
        <Button
          onClick={onBack}
          disabled={!canGoBack}
          animate={animate}
          className={clsx("w-10 h-10", canGoBack ? "bg-[var(--standard-action)]" : "bg-[var(--disabled)]")}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
        </Button>
        <Button
          onClick={onForward}
          disabled={!canGoForward}
          animate={animate}
          className={clsx("w-10 h-10", canGoForward ? "bg-[var(--standard-action)]" : "bg-[var(--disabled)]")}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </Button>
      </div>

      {view && onViewChange && (
        <div className="flex">
          <Button
            onClick={() => onViewChange("grid")}
            animate={animate}
            className={clsx(
              "w-10 h-10 rounded-r-none border-r-0",
              view === "grid" ? "bg-[var(--standard-action)]" : "bg-[var(--disabled)]"
            )}
          >
            <LayoutGrid className="w-5 h-5" strokeWidth={3} />
          </Button>
          <Button
            onClick={() => onViewChange("list")}
            animate={animate}
            className={clsx(
              "w-10 h-10 rounded-l-none",
              view === "list" ? "bg-[var(--standard-action)]" : "bg-[var(--disabled)]"
            )}
          >
            <List className="w-5 h-5" strokeWidth={3} />
          </Button>
        </div>
      )}

      {search !== undefined && onSearchChange && (
        <div className="flex flex-1 max-w-xs shadow-[3px_3px_0px_0px_black]">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-l-sm border-2 border-r-0 border-[var(--near-black)] bg-[var(--title-bar)]">
            <Search className="w-4 h-4" strokeWidth={3} />
          </div>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="flex-1 min-w-0 rounded-r-sm border-2 border-[var(--near-black)] bg-[var(--surface-card)] px-3 text-sm font-[family-name:var(--font-space-grotesk)] outline-none"
          />
        </div>
      )}
    </div>
  );
}
