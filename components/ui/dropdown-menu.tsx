"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ComponentProps } from "react";
import clsx from "clsx";

// Thin, app-styled wrapper around @radix-ui/react-dropdown-menu, adapted
// from neobrutalism.dev's dropdown-menu component but trimmed to only the
// pieces this app actually uses (Root/Trigger/Content/Item) — no
// checkbox/radio/sub-menu variants, since nothing here needs them yet.

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={clsx(
          // z-[9999]: Radix portals this content to the end of <body>, escaping
          // any local stacking context (e.g. a window's zIndex or the navbar's
          // z-60). It needs a z-index high enough to sit above every window,
          // not just its immediate DOM position.
          "z-[9999] min-w-[10rem] rounded-sm border-2 border-[var(--near-black)] bg-[var(--surface-frame-card)] p-1 shadow-[3px_3px_0px_0px_black] font-[family-name:var(--font-ibm-plex-mono)]",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={clsx(
        // data-[highlighted] is Radix's built-in hover/keyboard-focus state
        // for menu items — a plain background swap, no transition, so it's
        // already "instant" in the retro sense without needing an animate prop.
        "flex cursor-pointer select-none items-center justify-between gap-3 rounded-xs px-3 py-2 text-sm text-[var(--near-black)] outline-none data-[highlighted]:bg-[var(--surface-hover)]",
        className
      )}
      {...props}
    />
  );
}
