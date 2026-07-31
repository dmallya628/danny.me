"use client";

import { motion } from "framer-motion";
import ThemedIcon from "./themed-icon";
import IconHardShadow from "./icon-hard-shadow";

/**
 * A clickable desktop icon (opens a window on click) styled after classic
 * desktop OSes: a hard-edged drop shadow by default, and on press the icon
 * shifts onto its own shadow (hiding it) to read as "pressed in," then
 * springs back — the neobrutalist analogue of the old inverted-icon click
 * feedback, see the retro-desktop research discussed with the user.
 *
 * Deliberately has NO hover color/outline treatment on the surrounding
 * square — only the icon graphic itself reacts (scale on hover, shift on
 * press), matching how real retro desktops gave no hover feedback at all
 * and reserved all feedback for the click state.
 */
export default function DesktopIcon({
  title,
  light,
  dark,
  onClick,
  animate = true,
  priority = false,
}: {
  title: string;
  light: string;
  dark: string;
  onClick: () => void;
  /** When false, drops the hover effect entirely and makes the press-shift instant (no easing) — used by the site-wide Animations setting. */
  animate?: boolean;
  /** All desktop icons are above the fold, so this is passed through to the visible icon layer to avoid Next.js's lazy-loading heuristics flagging whichever one happens to be the Largest Contentful Paint. */
  priority?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-3 rounded-md text-center flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <IconHardShadow light={light} dark={dark} priority={priority} />
        {/* Real icon: hover scale (only when animate is on) + press-into-shadow
            bounce. On tap it moves to the exact same (4px, 4px) offset as the
            silhouette above, visually covering it — that's what reads as
            "the shadow disappeared" rather than an actual shadow toggle. */}
        <motion.div
          className="absolute inset-0"
          whileHover={animate ? { scale: 1.08 } : undefined}
          whileTap={{ x: 4, y: 4, scale: 1 }}
          transition={{ type: "tween", duration: animate ? 0.15 : 0, ease: "easeInOut" }}
        >
          <ThemedIcon light={light} dark={dark} priority={priority} />
        </motion.div>
      </div>
      <p className="p-0.5 text-bold anti-aliased">{title}</p>
    </div>
  );
}

