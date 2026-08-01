"use client";

import ThemedIcon from "@/components/icons/themed-icon";
import IconHardShadow from "@/components/icons/icon-hard-shadow";
import { DEFAULT_PROJECT_ICON, Project } from "../types";

/**
 * A single project tile in the Portfolio grid view: icon + label, clickable
 * to open the project. Gets the same small hover-bounce + click-press
 * mechanic as the shared Button component (see components/ui/button.tsx) —
 * NOT the larger DesktopIcon treatment, since that's reserved for the
 * desktop itself per the user's request to keep desktop icons distinct.
 */
export default function ProjectTile({
  project,
  onOpen,
  animate = true,
}: {
  project: Project;
  onOpen: () => void;
  animate?: boolean;
}) {
  const icon = project.icon ?? DEFAULT_PROJECT_ICON;

  return (
    <button
      onClick={onOpen}
      className={`flex flex-col items-center gap-2 p-2 rounded-md cursor-pointer text-center ${
        animate ? "transition-transform duration-150 ease-in-out hover:scale-105 active:scale-100" : ""
      }`}
    >
      <div className="relative w-16 h-16">
        <IconHardShadow light={icon.light} dark={icon.dark} offsetClassName="translate-x-[3px] translate-y-[3px]" />
        {/* Needs its own `absolute` layer (matching DesktopIcon/Studio's
            pattern) — otherwise, as a plain in-flow element, it would
            paint *underneath* the absolutely-positioned shadow above. */}
        <div className="absolute inset-0">
          <ThemedIcon light={icon.light} dark={icon.dark} />
        </div>
      </div>
      <span className="text-sm font-bold font-[family-name:var(--font-space-grotesk)]">
        {project.name}
      </span>
    </button>
  );
}
