"use client";

import { motion } from "framer-motion";
import { RefObject } from "react";
import styles from "@/styles/window.module.css";
import Image from "next/image";
import ThemedIcon from "./icons/themed-icon";

export default function Window({
  favIcon,
  title,
  onClose,
  children,
  dragContainerRef,
  zIndex = 1000,
  focus,
}: {
  favIcon: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  dragContainerRef: RefObject<HTMLElement | null>;
  zIndex?: number;
  focus?: () => void;
}) {
  return (
    <motion.div
      className="fixed bg-[var(--surface-frame)] items-center w-[90vw] max-w-[500px] h-[80vh] max-h-[400px] md:max-h-[500px] rounded-sm shadow-xl"
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
      {/* title bar */}
      <div
        className="h-14 bg-[var(--title-bar)] text-[var(--near-black] flex flex-row justify-between items-center rounded-t-sm px-4 py-3 cursor-grab active:cursor-grabbing border-[2.5]"
        onPointerDown={focus}
      >
        <div className="flex items-center">
          <Image src={favIcon} alt={title} height={35} width={35} />
        </div>
        <span className="flex-1 mx-3 text-medium font-mono font-semibold">{title}</span>
        <div className="px-3 py-2 cursor-default -mr-4">
          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 bg-[var(--system-close)] border-2 border-[var(--near-black)] rounded-[3px] flex items-center justify-center focus:outline-none transition-colors"
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
        className={`${styles.windowContent} overflow-auto scrollbar-thin text-[var(--near-black)] rounded-b-sm border-[2.5] border-t-0 border-[var(--near-black)]`}
        onPointerDown={(e) => {
          e.stopPropagation();
          focus?.();
        }}
      >
        <div className="p-2">{children}</div>
      </div>
    </motion.div>
  );
}
