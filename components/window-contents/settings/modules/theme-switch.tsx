"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const THEME_LABELS: Record<string, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/**
 * Settings > Appearance > Theme dropdown. Wraps next-themes' `useTheme`;
 * mirrors the design file's "Light ▾" pill trigger.
 */
const ThemeSwitch = ({ animate = true }: { animate?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // next-themes can't know the real theme until after hydration (it reads
  // localStorage/media-query client-side), so render nothing until then to
  // avoid a light/dark flash or a server/client markup mismatch.
  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button animate={animate} className="bg-[var(--surface-hover)] px-3 py-2 text-sm">
          {THEME_LABELS[theme ?? "system"]}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(THEME_LABELS).map(([value, label]) => (
          <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
            {label}
            {theme === value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch
