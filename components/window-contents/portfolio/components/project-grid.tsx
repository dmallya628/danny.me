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
    <div className="grid grid-cols-3 gap-6">
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
