"use client";

import { motion, useMotionValue } from "framer-motion";
import { RefObject, useState, forwardRef } from "react";
import styles from "@/styles/window.module.css";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Centers a window over `anchorRef`'s current on-screen rect, clamped the same way the window's own size is. Returns null (falls back to the default top/left) until the anchor is actually mounted. */
function useAnchoredPosition(
  anchorRef: RefObject<HTMLElement | null> | undefined,
  width: number,
  height: number
) {
  if (typeof window === "undefined" || !anchorRef?.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();
  const w = Math.min(window.innerWidth * 0.9, width);
  const h = Math.min(window.innerHeight * 0.8, height);
  return {
    top: rect.top + rect.height / 2 - h / 2,
    left: rect.left + rect.width / 2 - w / 2,
  };
}

/**
 * A draggable, closable, maximizable "OS window" chrome. Every window in the
 * app (About, Settings, Studio, the Time Zone popup, etc.) is one of these
 * wrapping arbitrary `children` content.
 */
const Window = forwardRef<
  HTMLDivElement,
  {
    favIcon: string;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    /** The desktop area the window is allowed to be dragged within. */
    dragContainerRef: RefObject<HTMLElement | null>;
    zIndex?: number;
    /** Called on drag-start / any click inside the window, so the parent can bring it to the front of the stack. */
    focus?: () => void;
    /** Site-wide Animations setting — when false, open/close/press motion becomes instant instead of eased. */
    animate?: boolean;
    /** Design-intended (unmaximized) window size in px, per the Figma frame for this window. Acts as a cap — w-[90vw]/h-[80vh] below still shrink the window on small viewports. */
    width?: number;
    height?: number;
    /** When set, this window opens centered over the referenced element instead of the default top-left-ish default position — used for popovers (e.g. Time Zone Selection) that should spawn over the window that triggered them. */
    anchorRef?: RefObject<HTMLElement | null>;
    /** Blurs and disables interaction/dragging — used on a window while a popover it spawned (anchored to it) is open, so the popover reads as modal to that window. */
    blurred?: boolean;
    /** Some windows (Time Zone Selection, Studio, Tictactoe) aren't meant to be maximized per the design — when false, the maximize button is omitted entirely rather than rendered disabled. */
    maximizable?: boolean;
  }
>(function Window(
  {
    favIcon,
    title,
    onClose,
    children,
    dragContainerRef,
    zIndex = 1000,
    focus,
    animate = true,
    width = 500,
    height = 500,
    anchorRef,
    blurred = false,
    maximizable = true,
  },
  ref
) {
  const [isMaximized, setIsMaximized] = useState(false);

  // framer-motion's `drag` writes the window's dragged offset into these
  // motion values as plain transforms, independent of the `top`/`left`
  // style below. We bind them explicitly (rather than letting framer-motion
  // manage them internally) so we can reset them to 0 when maximizing —
  // otherwise a window dragged around before being maximized would render
  // shifted by its stale drag offset instead of filling the screen cleanly.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const anchoredPos = useAnchoredPosition(anchorRef, width, height);

  const toggleMaximize = () => {
    setIsMaximized((prev) => {
      const next = !prev;
      if (next) {
        x.set(0);
        y.set(0);
      }
      return next;
    });
  };

  return (
    <motion.div
      ref={ref}
      className="fixed flex flex-col bg-[var(--surface-frame)] rounded-sm shadow-[4px_4px_0px_0px_black]"
      style={
        isMaximized
          ? {
              zIndex,
              x,
              y,
              // 5rem matches the navbar's actual rendered height (see
              // navbar.tsx). Getting this wrong makes the maximized window
              // start underneath the navbar instead of right below it.
              top: "5rem",
              left: 0,
              width: "100vw",
              height: "calc(100vh - 5rem)",
              maxWidth: "100vw",
              maxHeight: "calc(100vh - 5rem)",
            }
          : {
              zIndex,
              x,
              y,
              // Popovers (anchorRef set) spawn centered over their anchor;
              // everything else keeps the default fixed placement.
              ...(anchoredPos ?? { top: "20%", left: "25%" }),
              // Design-intended size from Figma, clamped so the window still
              // fits small viewports. Height is deliberately NOT forced here
              // (unlike width) — the window should shrink-wrap short content
              // (e.g. tictactoe's board) instead of always stretching to
              // fill the cap, and scroll past it for long content (About).
              width: `min(90vw, ${width}px)`,
              maxHeight: `min(80vh, ${height}px)`,
            }
      }
      initial={{ opacity: 0.25, scale: 0.85 }}
      transition={{ type: "tween", duration: animate ? 0.2 : 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      drag={!isMaximized && !blurred}
      dragConstraints={dragContainerRef}
      dragElastic={false}
      dragMomentum={false}
      onDragStart={focus}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* title bar */}
      <div
        className="h-14 shrink-0 bg-[var(--title-bar)] text-[var(--near-black] flex flex-row justify-between items-center rounded-t-sm px-4 py-3 cursor-grab active:cursor-grabbing border-[2.5]"
        onPointerDown={focus}
      >
        <div className="flex items-center">
          <Image src={favIcon} alt={title} height={35} width={35} />
        </div>
        <span className="flex-1 mx-3 text-medium font-mono font-semibold">{title}</span>
        <div className="flex items-center gap-2 px-3 py-2 cursor-default -mr-4">
          {/* pressSize="sm" gives these small title-bar buttons a lighter
              shadow/press-shift than the app's default Button size, which
              would look oversized at 32px. */}
          {maximizable && (
            <Button
              onClick={toggleMaximize}
              pressSize="sm"
              animate={animate}
              className="w-8 h-8 bg-[var(--disabled)]"
            >
              {isMaximized ? (
                <Minimize2 className="w-4 h-4 text-[var(--near-black)]" strokeWidth={3} />
              ) : (
                <Maximize2 className="w-4 h-4 text-[var(--near-black)]" strokeWidth={3} />
              )}
            </Button>
          )}
          <Button
            onClick={onClose}
            pressSize="sm"
            animate={animate}
            className="w-8 h-8 bg-[var(--system-close)]"
          >
            <Image
              src={"/window/system-elements/exit.svg"}
              alt="exit"
              height={100}
              width={100}
            />
          </Button>
        </div>
      </div>
      {/* window content — blur (and the interaction lock that comes with it)
          is scoped to just this area, not the title bar above, so a
          blurred window's title stays legible and its own chrome untouched
          while a popover it spawned is open. */}
      <div
        className={`${styles.windowContent} flex-1 min-h-0 overflow-auto scrollbar-thin text-[var(--near-black)] rounded-b-sm border-[2.5] border-t-0 border-[var(--near-black)] transition-[filter] duration-200 ${
          blurred ? "blur-[1.5px] pointer-events-none" : ""
        }`}
        onPointerDown={(e) => {
          // Bubble-phase (not capture-phase) stopPropagation: this lets any
          // interactive descendant (buttons, dropdowns, popovers) receive
          // and handle the pointerdown normally first, then stops it from
          // continuing up to the outer motion.div, which would otherwise
          // interpret the click as the start of a window drag.
          e.stopPropagation();
          focus?.();
        }}
      >
        <div className="p-2">{children}</div>
      </div>
    </motion.div>
  );
});

export default Window;
