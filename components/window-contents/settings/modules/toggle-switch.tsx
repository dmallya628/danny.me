"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "@/styles/toggle.module.css";

/**
 * The on/off switch used throughout Settings (Animations, Automatic Time
 * Zone, 24-Hour Time). The handle's slide is a framer-motion `layout`
 * animation; on/off track color and shadow come from
 * styles/toggle.module.css (a hard shadow only appears in the "on" state,
 * matching the Figma design).
 */
export default function ToggleSwitch({
  checked,
  onChange,
  /** Site-wide Animations setting — when false, the handle snaps instantly instead of springing. */
  animate = true,
}: {
  checked: boolean;
  onChange: () => void;
  animate?: boolean;
}) {
  return (
    <button
      className={clsx(styles.toggleContainer, {
        [styles.on]: checked,
        [styles.off]: !checked,
      })}
      onClick={onChange}
    >
      <motion.div
        className={styles.toggleHandle}
        layout
        transition={
          animate ? { type: "spring", visualDuration: 0.2, bounce: 0.2 } : { duration: 0 }
        }
      />
    </button>
  );
}
