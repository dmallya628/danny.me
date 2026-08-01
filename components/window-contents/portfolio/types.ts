/** A single item in a project's Gallery section — pictures, video, or audio about the project. */
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
