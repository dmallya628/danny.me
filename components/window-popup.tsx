"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import { RefObject } from "react";

/**
 * A small, non-resizable popover — visually a miniature window (icon-only
 * title strip, no maximize/close controls) rather than a full OS window.
 * Used for transient results like tictactoe's win/loss/draw screens, which
 * in the Figma design are separate, much smaller frames from the game
 * window itself rather than content swapped into it.
 *
 * Portaled to document.body so it escapes the transformed/overflow-clipped
 * window it's triggered from and can float freely over the whole desktop.
 */
export default function WindowPopup({
  favIcon,
  children,
  animate = true,
  width = 225,
  height = 360,
  anchorRef,
}: {
  favIcon: string;
  children: React.ReactNode;
  animate?: boolean;
  width?: number;
  height?: number;
  /** Element this popover should open centered over — the window it spawned from. Falls back to viewport-center if the anchor isn't mounted. */
  anchorRef?: RefObject<HTMLElement | null>;
}) {
  const w = Math.min(typeof window !== "undefined" ? window.innerWidth * 0.9 : width, width);
  const h = Math.min(typeof window !== "undefined" ? window.innerHeight * 0.8 : height, height);
  const anchorRect = anchorRef?.current?.getBoundingClientRect();
  const position = anchorRect
    ? {
        top: anchorRect.top + anchorRect.height / 2 - h / 2,
        left: anchorRect.left + anchorRect.width / 2 - w / 2,
      }
    : { top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" };

  return createPortal(
    <motion.div
      className="fixed flex flex-col bg-[var(--surface-frame)] rounded-sm shadow-[4px_4px_0px_0px_black] border-[2.5] border-[var(--near-black)]"
      style={{
        zIndex: 9999,
        ...position,
        width: `min(90vw, ${width}px)`,
        maxHeight: `min(80vh, ${height}px)`,
      }}
      initial={{ opacity: 0.25, scale: 0.85 }}
      transition={{ type: "tween", duration: animate ? 0.2 : 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div className="h-10 shrink-0 bg-[var(--title-bar)] flex items-center px-3 rounded-t-sm border-b-[2.5] border-[var(--near-black)]">
        <Image src={favIcon} alt="" height={22} width={22} />
      </div>
      {/* Deliberately not scrollable — this popover's content (star + two
          buttons) is meant to always fit in the small card, per design;
          anything that doesn't fit should shrink rather than scroll. */}
      <div className="flex-1 min-h-0 overflow-hidden text-[var(--near-black)] rounded-b-sm">
        {children}
      </div>
    </motion.div>,
    document.body
  );
}
