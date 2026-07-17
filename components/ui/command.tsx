"use client";

import { Command as CommandPrimitive } from "cmdk";
import { ComponentProps } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

export function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={clsx(
        "flex flex-col overflow-hidden text-[var(--near-black)] font-[family-name:var(--font-ibm-plex-mono)]",
        className
      )}
      {...props}
    />
  );
}

export function CommandInput({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-2 border-b-2 border-[var(--near-black)] px-3">
      <Search className="h-4 w-4 shrink-0 opacity-60" />
      <CommandPrimitive.Input
        className={clsx(
          "flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:opacity-60",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={clsx("max-h-64 overflow-y-auto overflow-x-hidden p-1", className)}
      {...props}
    />
  );
}

export function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty className="py-4 text-center text-sm opacity-60" {...props} />
  );
}

export function CommandGroup({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group className={clsx("overflow-hidden p-1", className)} {...props} />
  );
}

export function CommandItem({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={clsx(
        "flex cursor-pointer select-none items-center gap-2 rounded-xs px-3 py-2 text-sm outline-none data-[selected=true]:bg-[var(--surface-hover)]",
        className
      )}
      {...props}
    />
  );
}
