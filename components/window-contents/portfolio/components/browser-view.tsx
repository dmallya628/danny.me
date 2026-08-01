"use client";

import { useMemo, useState } from "react";
import Sidebar from "./sidebar";
import ProjectGrid from "./project-grid";
import ProjectList from "./project-list";
import { ViewMode } from "./toolbar";
import { PROJECTS } from "../data";
import { Project } from "../types";

/**
 * The Portfolio browser's root screen: tool-filter sidebar + the project
 * grid/list. view/search are owned by portfolio.tsx (its Toolbar needs
 * them); the tool filter is local since nothing outside this screen needs
 * to know about it.
 */
export default function BrowserView({
  view,
  search,
  onOpenProject,
  animate = true,
}: {
  view: ViewMode;
  search: string;
  onOpenProject: (project: Project) => void;
  animate?: boolean;
}) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesTool = !selectedTool || project.primaryTool.name === selectedTool;
      const matchesSearch = !query || project.name.toLowerCase().includes(query);
      return matchesTool && matchesSearch;
    });
  }, [selectedTool, search]);

  return (
    // No shared padding/gap on this row — Sidebar carries its own inset (see
    // sidebar.tsx) so its divider border starts flush against the Toolbar's
    // bottom border above it, with no gap between the two lines.
    <div className="flex">
      <Sidebar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="min-w-0 flex-1 p-4">
        {view === "grid" ? (
          <ProjectGrid projects={filtered} onOpenProject={onOpenProject} animate={animate} />
        ) : (
          <ProjectList projects={filtered} onOpenProject={onOpenProject} />
        )}
      </div>
    </div>
  );
}
