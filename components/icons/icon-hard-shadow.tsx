import ThemedIcon from "./themed-icon";

/**
 * Hard shadow silhouette layer: renders the icon flattened to solid black
 * via the shared #hard-shadow-silhouette filter (see app/layout.tsx) and
 * offset 4px down-right. Meant to sit behind a normally-rendered ThemedIcon
 * inside a `relative` parent — see DesktopIcon for the interactive version
 * and Studio's window content for a static one.
 *
 * A plain brightness(0) filter isn't used here because it preserves alpha —
 * any partially-transparent fill in the source art (e.g. the disc icon's
 * background-tinted center hole) would flatten to a translucent black
 * smudge instead of dropping out cleanly.
 */
export default function IconHardShadow({
  light,
  dark,
  priority = false,
  offsetClassName = "translate-x-1 translate-y-1",
}: {
  light: string;
  dark: string;
  priority?: boolean;
  /** Shadow offset — the default 4px suits desktop-icon-sized (64-96px) art; smaller badges (e.g. Portfolio's sidebar tool icons) should pass a smaller offset so the shadow doesn't overpower them. */
  offsetClassName?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 ${offsetClassName} pointer-events-none`}
      style={{ filter: "url(#hard-shadow-silhouette)" }}
    >
      <ThemedIcon light={light} dark={dark} priority={priority} />
    </div>
  );
}
