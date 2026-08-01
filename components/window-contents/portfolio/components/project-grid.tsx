import ProjectTile from "./project-tile";
import { Project } from "../types";

export default function ProjectGrid({
  projects,
  onOpenProject,
  animate = true,
}: {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  animate?: boolean;
}) {
  if (projects.length === 0) {
    return <p className="py-10 text-center text-sm opacity-70">No projects found.</p>;
  }

  return (
    // grid-template-columns: repeat(auto-fill, minmax(120px, 160px)) instead
    // of a fixed grid-cols-3: the browser computes as many 120–160px columns
    // as currently fit the row, so widening the window (most dramatically on
    // maximize) adds *more columns*, not wider whitespace around the same
    // three. auto-fill (rather than auto-fit) keeps unused trailing column
    // tracks empty instead of stretching the last real column to fill them,
    // which matters here since ProjectTile's icon+label is centered — an
    // auto-fit track stretched wide would just center the tile in a lot of
    // dead space either side, not actually make it bigger.
    //
    // The 120–160px range itself is deliberately narrow: 120px is enough for
    // ProjectTile's 64px icon plus the "Project BEE VR"-length label to sit
    // comfortably without wrapping oddly, and 160px caps how much any single
    // tile can grow so a maximized window reads as "more items, same size"
    // rather than "same items, blown up" — matching the ask for tiles to
    // take *some* extra space on a bigger window, not a lot.
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,160px))]">
      {projects.map((project) => (
        <ProjectTile
          key={project.id}
          project={project}
          onOpen={() => onOpenProject(project)}
          animate={animate}
        />
      ))}
    </div>
  );
}
