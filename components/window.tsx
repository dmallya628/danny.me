"use client";

import { motion } from "framer-motion";
import { RefObject } from "react";
import styles from "@/styles/window.module.css";
import Image from "next/image";
import ThemedIcon from "./icon-themes";

export default function Window({
  favIcon,
  title,
  onClose,
  children,
  dragContainerRef,
  zIndex = 1000,
  focus,
}: {
  favIcon: React.ReactNode;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  dragContainerRef: RefObject<HTMLElement | null>;
  zIndex?: number;
  focus?: () => void;
}) {
  return (
    <motion.div
      className="fixed bg-[var(--window-accent)] items-center w-[90vw] max-w-[500px] h-[80vh] max-h-[400px] md:max-h-[500px] rounded-xs shadow-xl"
      style={{
        zIndex,
        top: "20%",
        left: "25%",
      }}
      initial={{ opacity: 0.25, scale: 0.85 }}
      transition={{ type: "tween", duration: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      drag
      dragConstraints={dragContainerRef}
      dragElastic={false}
      dragMomentum={false}
      onDragStart={focus}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* title bar FFEEDB */}
      <div
        className="h-12 bg-[var(--title-bar)] text-[var(--near-black] flex flex-row justify-between items-center rounded-t-sm px-4 py-3 cursor-grab active:cursor-grabbing border-[2.5]"
        onPointerDown={focus}
      >
        {/* <ThemedIcon light="" dark="" /> */}
        <span className="flex text-sm font-mono font-semibold">{title}</span>
        <div className="px-3 py-2 cursor-default -mr-4">
          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 bg-[var(--system-close)] border border-[var(--near-black)] text-sm font-light text-black rounded-sm font-bold flex items-center justify-center focus:outline-none transition-colors"
          >
            <Image
              src={"/window/system-elements/exit.svg"}
              alt="exit"
              height={100}
              width={100}
            />
          </button>
        </div>
      </div>
      {/* window content */}
      <div
        className={`${styles.windowContent} overflow-auto scrollbar-thin text-[var(--foreground)] rounded-b-sm border-[2.5] border-t-0 border-[var(--window-border)]`}
        onPointerDownCapture={(e) => {
          e.stopPropagation();
          focus?.();
        }}
      >
        <div className="p-2">{children}</div>
      </div>
    </motion.div>
  );
}
