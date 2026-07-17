"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ComponentProps } from "react";
import clsx from "clsx";

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
        "flex cursor-pointer select-none items-center justify-between gap-3 rounded-xs px-3 py-2 text-sm text-[var(--near-black)] outline-none data-[highlighted]:bg-[var(--surface-hover)]",
        className
      )}
      {...props}
    />
  );
}
