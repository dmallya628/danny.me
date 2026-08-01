"use client";

import Image from "next/image";
import clsx from "clsx";
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
 * content instead of clipping past a hardcoded width.
 */
export default function Sidebar({
  selectedTool,
  onSelectTool,
}: {
  selectedTool: string | null;
  onSelectTool: (tool: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-2 shrink-0 pl-3 pt-3 pb-3 pr-3 border-r-[3px] border-[var(--near-black)]">
      {TOOL_FILTERS.map((tool) => {
        const active = selectedTool === tool.name;
        return (
          <button
            key={tool.name}
            onClick={() => onSelectTool(active ? null : tool.name)}
            className={clsx(
              "flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-left text-sm font-bold whitespace-nowrap font-[family-name:var(--font-space-grotesk)] cursor-pointer border-2 transition-all duration-150 ease-in-out hover:scale-105 active:scale-100",
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
            <span>{tool.name}</span>
          </button>
        );
      })}
    </div>
  );
}
