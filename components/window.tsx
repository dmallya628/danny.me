"use client";

import { motion, useMotionValue } from "framer-motion";
import { RefObject, useState } from "react";
import styles from "@/styles/window.module.css";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A draggable, closable, maximizable "OS window" chrome. Every window in the
 * app (About, Settings, Studio, the Time Zone popup, etc.) is one of these
 * wrapping arbitrary `children` content.
 */
export default function Window({
  favIcon,
  title,
  onClose,
  children,
  dragContainerRef,
  zIndex = 1000,
  focus,
  animate = true,
}: {
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
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  // framer-motion's `drag` writes the window's dragged offset into these
  // motion values as plain transforms, independent of the `top`/`left`
  // style below. We bind them explicitly (rather than letting framer-motion
  // manage them internally) so we can reset them to 0 when maximizing —
  // otherwise a window dragged around before being maximized would render
  // shifted by its stale drag offset instead of filling the screen cleanly.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
      className="fixed bg-[var(--surface-frame)] items-center w-[90vw] max-w-[500px] h-[80vh] max-h-[400px] md:max-h-[500px] rounded-sm shadow-[4px_4px_0px_0px_black]"
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
          : { zIndex, x, y, top: "20%", left: "25%" }
      }
      initial={{ opacity: 0.25, scale: 0.85 }}
      transition={{ type: "tween", duration: animate ? 0.2 : 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      drag={!isMaximized}
      dragConstraints={dragContainerRef}
      dragElastic={false}
      dragMomentum={false}
      onDragStart={focus}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* title bar */}
      <div
        className="h-14 bg-[var(--title-bar)] text-[var(--near-black] flex flex-row justify-between items-center rounded-t-sm px-4 py-3 cursor-grab active:cursor-grabbing border-[2.5]"
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
          <Button
            onClick={toggleMaximize}
            pressSize="sm"
            animate={animate}
            className="w-8 h-8 bg-[var(--disabled)]"
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-[var(--near-black)]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[var(--near-black)]" />
            )}
          </Button>
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
      {/* window content */}
      <div
        className={`${styles.windowContent} overflow-auto scrollbar-thin text-[var(--near-black)] rounded-b-sm border-[2.5] border-t-0 border-[var(--near-black)]`}
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
}
