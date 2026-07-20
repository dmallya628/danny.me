"use client";

import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";
import clsx from "clsx";

/**
 * Neobrutalist press mechanic, hand-adapted from neobrutalism.dev's Button
 * (https://neobrutalism.dev): a hard, un-blurred offset shadow by default;
 * on hover/press the element shifts by exactly the shadow's offset and the
 * shadow disappears, reading as "pressed into" the shadow rather than a
 * separate depressed state. We don't use their cva/Tailwind-theme setup —
 * just plain arbitrary-value utilities — since this app doesn't extend
 * Tailwind's theme with their custom shadow tokens.
 *
 * `pressSize` picks how large that shadow/shift is (small title-bar icon
 * buttons use "sm" so the effect doesn't look oversized against a 32px
 * button). `animate` is the site-wide Animations toggle: when false, the
 * hover state and eased transition are dropped entirely and only an
 * instant (non-eased) press-shift remains — see the retro-desktop research
 * in conversation: classic OSes had no hover feedback at all, only instant
 * click feedback.
 */
const VARIANTS = {
  default: {
    shadow: "shadow-[3px_3px_0px_0px_black]",
    animated:
      "transition-all duration-150 ease-in-out hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none",
    instant: "active:translate-x-1 active:translate-y-1 active:shadow-none",
  },
  sm: {
    shadow: "shadow-[1.5px_1.5px_0px_0px_black]",
    animated:
      "transition-all duration-150 ease-in-out hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-none active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none",
    instant: "active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none",
  },
} as const;

export function Button({
  className,
  /** Render as the child element instead of a <button> (Radix Slot pattern) — used to make an <a> or a DropdownMenuTrigger look and behave like this Button. */
  asChild = false,
  pressSize = "default",
  animate = true,
  ...props
}: ComponentProps<"button"> & {
  asChild?: boolean;
  pressSize?: keyof typeof VARIANTS;
  animate?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  const variant = VARIANTS[pressSize];

  return (
    <Comp
      className={clsx(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border-2 border-[var(--near-black)] font-semibold disabled:pointer-events-none disabled:opacity-50",
        variant.shadow,
        animate ? variant.animated : variant.instant,
        className
      )}
      {...props}
    />
  );
}
