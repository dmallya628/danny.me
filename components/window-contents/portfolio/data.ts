import { Project } from "./types";

// TODO: everything below except Soundscape is placeholder content (project
// type, tool tag, and About copy) standing in until the real details for
// each project are supplied — only the name, ordering, and (where obvious)
// icon are taken from the Figma browser mockup.

const STUDIO: Project = {
  id: "studio",
  name: "studio",
  projectType: "Website",
  primaryTool: { name: "Sites", icon: "/light/about/icons/sites.svg" },
  lastModified: "2026-05-02T09:00:00",
  about: ["A playlist site, coming soon..."],
  // Reuses the same disc icon as the "studio_" desktop app (see app/page.tsx
  // and studio.tsx) instead of a generic folder — it's the same project.
  icon: { light: "/light/desktop/icons/disc.svg", dark: "/dark/desktop/icons/disc.svg" },
};

const DANNY_ME: Project = {
  id: "danny-me",
  name: "danny.me",
  projectType: "Website",
  primaryTool: { name: "Sites", icon: "/light/about/icons/sites.svg" },
  lastModified: "2026-07-20T14:15:00",
  about: ["This site — a neobrutalist, OS-desktop-styled personal site and portfolio."],
};

const WEATHER_FIT: Project = {
  id: "weather-fit",
  name: "Weather FIT",
  projectType: "Application",
  primaryTool: { name: "Figma", icon: "/light/about/icons/figma.svg" },
  lastModified: "2026-03-11T16:40:00",
  about: ["Placeholder description — Weather FIT details coming soon."],
};

const TOKKARI: Project = {
  id: "tokkari",
  name: "TOKKARI",
  projectType: "Application",
  primaryTool: { name: "Blender", icon: "/light/about/icons/blender.svg" },
  lastModified: "2026-02-18T10:20:00",
  about: ["Placeholder description — TOKKARI details coming soon."],
};

const PROJECT_BEE_VR: Project = {
  id: "project-bee-vr",
  name: "Project BEE VR",
  projectType: "Game",
  primaryTool: { name: "Unity Engine", icon: "/light/about/icons/unity.svg" },
  lastModified: "2026-01-09T13:05:00",
  about: ["Placeholder description — Project BEE VR details coming soon."],
};

// Gallery here is a placeholder (/cool.jpeg, reused from the About window)
// just to prove the Gallery grid renders; swap in real screenshots/video/
// audio once the project has them.
const SOUNDSCAPE: Project = {
  id: "soundscape",
  name: "Soundscape",
  projectType: "Application",
  primaryTool: { name: "Unity Engine", icon: "/light/about/icons/unity.svg" },
  lastModified: "2026-06-09T11:37:00",
  about: [
    "Soundscape is an interactive audio-focused application that aims to adapt to users’ emotional states.",
    "The application guides users through a series of reflective questions about their current feelings and mental state, then generates a personalized auditory & visual soundscape based on their responses and EEG brain wave signals.",
  ],
  gallery: [
    { type: "image", src: "/cool.jpeg", alt: "Soundscape screenshot placeholder" },
    { type: "image", src: "/cool.jpeg", alt: "Soundscape screenshot placeholder" },
  ],
  links: [
    { label: "Figma", url: "#", icon: "/light/about/icons/figma.svg" },
    { label: "GitHub", url: "#", icon: "/light/about/icons/github.svg" },
  ],
};

// Order matches the Figma browser mockup's grid layout.
export const PROJECTS: Project[] = [
  STUDIO,
  DANNY_ME,
  WEATHER_FIT,
  TOKKARI,
  PROJECT_BEE_VR,
  SOUNDSCAPE,
];

/** Every tool tag that appears on at least one project, in the sidebar's fixed display order. */
export const TOOL_FILTERS = [
  { name: "Unity Engine", icon: "/light/about/icons/unity.svg" },
  { name: "TouchDesigner", icon: "/light/about/icons/touchdesigner.svg" },
  { name: "Blender", icon: "/light/about/icons/blender.svg" },
  { name: "Figma", icon: "/light/about/icons/figma.svg" },
  { name: "Sites", icon: "/light/about/icons/sites.svg" },
];
