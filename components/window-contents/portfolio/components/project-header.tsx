import ThemedIcon from "@/components/icons/themed-icon";
import IconHardShadow from "@/components/icons/icon-hard-shadow";
import styles from "@/styles/window.module.css";
import { DEFAULT_PROJECT_ICON, Project } from "../types";

/** "June 9, 2026 @ 11:37 AM" — weekday dropped to keep this on one line. */
function formatLastModified(iso: string) {
  const date = new Date(iso);
  const datePart = Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const timePart = Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${datePart} @ ${timePart}`;
}

/**
 * Header card at the top of a project window: folder icon, name, last
 * modified timestamp, and a couple of tag pills (project type + primary
 * tool/engine) — everything above the About/Media/Links sections.
 */
export default function ProjectHeader({ project }: { project: Project }) {
  const icon = {
    light: project.icon?.light ?? DEFAULT_PROJECT_ICON.light,
    dark: project.icon?.dark ?? DEFAULT_PROJECT_ICON.dark,
  };

  return (
    <div
      className={`${styles.windowCard} flex flex-col items-center gap-5 rounded-sm shadow-[3px_3px_0px_0px_black] border border-[var(--near-black)] px-6 py-8`}
    >
      {/* Icon lines up with just the title/date — not the tags below, which
          span the full card width instead of sitting beside the icon. */}
      <div className="flex items-center gap-6">
        <div className="relative w-16 h-16 shrink-0">
          <IconHardShadow light={icon.light} dark={icon.dark} offsetClassName="translate-x-[3px] translate-y-[3px]" />
          <div className="absolute inset-0">
            <ThemedIcon light={icon.light} dark={icon.dark} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            {project.name}
          </h3>
          <p className="text-xs tracking-wide text-[#3e3e3e] font-[family-name:var(--font-ibm-plex-mono)]">
            Last Modified: {formatLastModified(project.lastModified)}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <span className="rounded-sm border-2 border-[var(--near-black)] bg-[var(--surface-hover)] shadow-[3px_3px_0px_0px_black] px-8 py-2.5 text-base font-bold font-[family-name:var(--font-space-grotesk)]">
          {project.projectType}
        </span>
        <span className="rounded-sm border-2 border-[var(--near-black)] bg-[var(--accent-core)] shadow-[3px_3px_0px_0px_black] px-8 py-2.5 text-base font-bold font-[family-name:var(--font-space-grotesk)]">
          {project.primaryTool.name}
        </span>
      </div>
    </div>
  );
}
