import Image from "next/image";
import { useTheme } from "next-themes";

/**
 * Swaps between a light- and dark-mode icon asset based on the active theme.
 * Purely a light/dark image switcher — it has no opinion on drop shadows,
 * hover, or press behavior; see DesktopIcon for that interactive layer.
 */
export default function ThemedIcon({
  light,
  dark,
  // Reserved for a dedicated monochrome-theme icon variant; not wired up
  // yet, so "mono" theme currently falls through to the light/dark switch
  // above via the `theme === "dark"` check.
  monochrome,
  priority = false,
}: {
  light: string;
  dark: string;
  monochrome?: string;
  /** Marks this as an above-the-fold image so Next.js eager-loads and preloads it instead of lazy-loading — silences the "detected as LCP" console warning for icons that are always visible on load. */
  priority?: boolean;
}) {
  const { resolvedTheme, theme } = useTheme();
  let source = light;

  switch (resolvedTheme) {
    case "light":
      source = light;
      break;
    case "dark":
      source = dark;
      break;
    default:
      // resolvedTheme can be undefined mid-hydration (or for themes
      // next-themes doesn't resolve, like our custom "mono"); fall back to
      // reading the raw `theme` value directly so the icon still picks a
      // sensible source instead of defaulting to light unconditionally.
      source = theme === "dark" ? dark : light;
      break;
  }

  return (
    <Image
      src={source}
      alt="icon"
      width={64}
      height={64}
      className="h-full w-full object-contain"
      suppressHydrationWarning
      priority={priority}
    />
  );
}

