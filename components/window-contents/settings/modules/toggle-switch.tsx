"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "@/styles/toggle.module.css";

export default function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
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
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}
