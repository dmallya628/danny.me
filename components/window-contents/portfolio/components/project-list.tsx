"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ThemedIcon from "@/components/icons/themed-icon";
import IconHardShadow from "@/components/icons/icon-hard-shadow";
import { DEFAULT_PROJECT_ICON, Project } from "../types";

type SortKey = "name" | "lastModified";

function formatDate(iso: string) {
  return Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(iso)
  );
}

/** Portfolio list view: a sortable Name column (defaults to A–Z) and a Date Modified column, each row opening its project on click. */
export default function ProjectList({
  projects,
  onOpenProject,
}: {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((asc) => !asc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...projects].sort((a, b) => {
    const cmp =
      sortKey === "name"
        ? a.name.localeCompare(b.name)
        : new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
    return sortAsc ? cmp : -cmp;
  });

  if (projects.length === 0) {
    return <p className="py-10 text-center text-sm opacity-70">No projects found.</p>;
  }

  const SortIcon = ({ active }: { active: boolean }) => {
    if (!active) return null;
    return sortAsc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div>
      <div className="flex border-b-2 border-[var(--near-black)] px-3 py-2 text-sm font-bold font-[family-name:var(--font-space-grotesk)]">
        <button
          onClick={() => toggleSort("name")}
          className="flex flex-1 cursor-pointer items-center gap-1 text-left"
        >
          Name <SortIcon active={sortKey === "name"} />
        </button>
        <button
          onClick={() => toggleSort("lastModified")}
          className="flex w-36 shrink-0 cursor-pointer items-center gap-1 text-left"
        >
          Date Modified <SortIcon active={sortKey === "lastModified"} />
        </button>
      </div>
      {sorted.map((project) => {
        const icon = project.icon ?? DEFAULT_PROJECT_ICON;
        return (
          <button
            key={project.id}
            onClick={() => onOpenProject(project)}
            className="flex w-full cursor-pointer items-center px-3 py-2 text-left transition-colors duration-100 hover:bg-[var(--surface-hover)]"
          >
            <span className="flex flex-1 items-center gap-2">
              <span className="relative h-6 w-6 shrink-0">
                <IconHardShadow light={icon.light} dark={icon.dark} offsetClassName="translate-x-[1.5px] translate-y-[1.5px]" />
                <span className="absolute inset-0">
                  <ThemedIcon light={icon.light} dark={icon.dark} />
                </span>
              </span>
              <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)]">{project.name}</span>
            </span>
            <span className="w-36 shrink-0 text-sm opacity-70 font-[family-name:var(--font-ibm-plex-mono)]">
              {formatDate(project.lastModified)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
