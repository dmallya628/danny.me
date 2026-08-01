"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import IconHardShadow from "@/components/icons/icon-hard-shadow";
import { TOOL_FILTERS } from "../data";

/**
 * Left-hand tool filter list in the Portfolio browser (Unity Engine,
 * TouchDesigner, Blender, Figma, Sites). Clicking a tool filters the visible
 * projects to that tool; clicking the already-active tool again clears the
 * filter — there's no separate "All" entry, the cleared state is implicit.
 *
 * No fixed width here — TouchDesigner (one long word, can't line-wrap like
 * "Unity Engine" or "Project BEE VR" can) needs the row to size to its own
 * content instead of clipping past a hardcoded width. Collapsed state drops
 * the text labels and shrinks down to an icon-only rail — filters stay
 * clickable either way, since nothing about *which* tool is selected should
 * depend on whether the sidebar happens to be expanded.
 *
 * The collapse toggle deliberately skips the app's usual bordered/
 * hard-shadow Button treatment — that chrome reads as a title-bar control,
 * and floating one alone in the sidebar body looked out of place. A plain,
 * low-contrast icon (opacity fades in on hover) sits closer to how the tool
 * filters themselves render when idle.
 */
export default function Sidebar({
  selectedTool,
  onSelectTool,
  animate = true,
}: {
  selectedTool: string | null;
  onSelectTool: (tool: string | null) => void;
  animate?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        "flex flex-col shrink-0 gap-3 pt-3 pb-3 border-r-[3px] border-[var(--near-black)]",
        collapsed ? "px-2 items-center" : "pl-3 pr-3"
      )}
    >
      {/* Collapse/expand toggle. Deliberately plain — no border, no
          hard-shadow, no filled background — unlike every other clickable
          chrome in this app (see Button in components/ui/button.tsx). Using
          that shared Button here made the toggle read as a stray title-bar
          control that had wandered into the sidebar body. Instead it starts
          at 50% opacity and only reaches full contrast on hover, so at rest
          it recedes into the sidebar the way the *inactive* tool filter
          buttons below it already do (border-transparent, no shadow) rather
          than competing with them for attention. `animate` still gates the
          hover-scale/transition per the site-wide Animations setting, same
          as everywhere else — it's just applied by hand here instead of via
          Button's own `animate` prop, since we're not using Button. */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className={clsx(
          "flex items-center justify-center w-7 h-7 shrink-0 rounded-sm cursor-pointer text-[var(--near-black)] opacity-50 hover:opacity-100 hover:bg-[var(--surface-hover)]",
          animate && "transition-all duration-150 ease-in-out hover:scale-105 active:scale-100",
          // Expanded: tucked into the top-right corner, right against the
          // divider border, like a corner fold — self-end aligns it to the
          // far edge of the column's own (content-sized) width. Collapsed:
          // the column is centered as a whole (see the outer div's
          // `items-center` below), so this just falls in line with everything
          // else instead of needing its own alignment override.
          !collapsed && "self-end"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen className="w-4 h-4" strokeWidth={3} />
        ) : (
          <PanelLeftClose className="w-4 h-4" strokeWidth={3} />
        )}
      </button>

      {/* Tool filter list. Renders identically whether collapsed or not —
          same buttons, same onClick, same active/selected styling — the
          *only* thing collapsed toggles is whether the <span> text label
          renders and how tight the button's own padding is (p-1 vs
          px-1.5 py-1). This is intentional: filtering by tool is a piece of
          real state (selectedTool, owned by browser-view.tsx) that has
          nothing to do with how much horizontal chrome the user currently
          wants on screen, so collapsing must never clear or disable it. */}
      <div className={clsx("flex flex-col gap-3", collapsed && "items-center")}>
        {TOOL_FILTERS.map((tool) => {
          const active = selectedTool === tool.name;
          return (
            <button
              key={tool.name}
              onClick={() => onSelectTool(active ? null : tool.name)}
              // Collapsed hides the visible text label, so the browser's
              // native title-attribute tooltip becomes the only way to see
              // which tool an icon represents without expanding again —
              // left undefined (not "") while expanded so it doesn't show a
              // redundant tooltip duplicating the already-visible <span>.
              title={collapsed ? tool.name : undefined}
              className={clsx(
                "flex items-center gap-1.5 rounded-sm text-left text-sm font-bold whitespace-nowrap font-[family-name:var(--font-space-grotesk)] cursor-pointer border-2 transition-all duration-150 ease-in-out hover:scale-105 active:scale-100",
                collapsed ? "p-1" : "px-1.5 py-1",
                active
                  ? "border-[var(--near-black)] bg-[var(--surface-hover)]"
                  : "border-transparent"
              )}
            >
              <div className="relative w-[22px] h-[22px] shrink-0">
                <IconHardShadow
                  light={tool.icon}
                  dark={tool.icon}
                  offsetClassName="translate-x-[2px] translate-y-[2px]"
                />
                <Image src={tool.icon} alt="" width={22} height={22} className="relative" />
              </div>
              {/* Text label is the only piece that actually disappears when
                  collapsed — the icon (and its click handler/active state)
                  stays mounted so the row keeps working as a filter, just
                  without the word next to it. */}
              {!collapsed && <span>{tool.name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
