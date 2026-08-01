/**
 * A single item in a project's Gallery section (rendered by
 * gallery-section.tsx) — pictures, video, or audio about the project. This
 * is a discriminated union on `type` rather than one shape with a bunch of
 * optional fields: each media type needs genuinely different metadata to
 * render well, and the union lets TypeScript enforce that per-variant
 * instead of every gallery entry carrying fields that only apply to some
 * types:
 *
 * - "image": `alt` is required, not optional — every <Image> needs real alt
 *   text for accessibility, and there's no sensible generic fallback the
 *   way there might be for, say, a decorative icon.
 * - "video": `poster` is optional — a still frame shown before playback
 *   starts. Without one, the <video> element just shows its first frame (or
 *   nothing, in some browsers) until the user hits play, which is fine but
 *   less polished; add one per-project once real footage exists.
 * - "audio": `label` is required in place of `alt`/`poster` — an <audio>
 *   element has no visual surface at all (see gallery-section.tsx, which
 *   renders it as a plain full-width player), so the label is the *only*
 *   way a viewer knows what they're about to listen to.
 *
 * Adding a new media type (e.g. a PDF or a 3D embed) means adding a new
 * variant here, then handling it explicitly in gallery-section.tsx's
 * tiles/audioItems split (and its render branch) — there's no default case,
 * so TypeScript will flag the switch as non-exhaustive until it's handled.
 */
export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "audio"; src: string; label: string };

/** A single item in a project's Links section — e.g. Figma, GitHub, a live site. */
export type ProjectLink = {
  label: string;
  url: string;
  /** Icon asset path. Optional — falls back to a generic link icon for services without a bundled icon. */
  icon?: string;
};

export type Project = {
  id: string;
  name: string;
  /** Free-text project category shown as the first header badge, e.g. "Application", "Game", "Installation". */
  projectType: string;
  /** Primary tool/engine, shown as the second header badge and used by the Portfolio sidebar's tool filter — reuses the same icon set as About's Tools section. */
  primaryTool: { name: string; icon: string };
  /** ISO 8601 timestamp. */
  lastModified: string;
  /** Each string is its own paragraph. */
  about: string[];
  /** Omitted (not just an empty array) when the project has no gallery media of any format yet. */
  gallery?: MediaItem[];
  /** Omitted for closed-source or otherwise unlinkable projects. */
  links?: ProjectLink[];
  /** Overrides the default folder icon (DEFAULT_PROJECT_ICON) in the Portfolio grid/list/header — e.g. Studio reuses its own desktop disc icon instead of a generic folder. */
  icon?: { light: string; dark: string };
};

export const DEFAULT_PROJECT_ICON = {
  light: "/light/desktop/icons/folder.svg",
  dark: "/dark/desktop/icons/folder.svg",
};
