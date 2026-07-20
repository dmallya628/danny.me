"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ComponentProps } from "react";
import clsx from "clsx";

// Same shell as dropdown-menu.tsx but built on @radix-ui/react-popover —
// used specifically for the searchable "Nearest City" combobox in
// time-zone-selection.tsx (Command needs a Popover to anchor its list,
// whereas the simple option lists elsewhere use DropdownMenu instead).

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({
  className,
  align = "start",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={clsx(
          // See the matching comment in dropdown-menu.tsx: this is portaled
          // out of local stacking contexts, so it needs a very high z-index
          // to reliably render above every open window.
          "z-[9999] rounded-sm border-2 border-[var(--near-black)] bg-[var(--surface-frame-card)] p-0 shadow-[3px_3px_0px_0px_black] font-[family-name:var(--font-ibm-plex-mono)]",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
