import SectionCard from "@/components/ui/section-card";
import ProjectHeader from "./project-header";
import GallerySection from "./gallery-section";
import LinksSection from "./links-section";
import { Project } from "../types";

/**
 * Content of an opened project: header card, then About/Gallery/Links
 * sections. Gallery and Links are both optional on Project and simply don't
 * render when absent — see gallery-section.tsx / links-section.tsx.
 */
export default function ProjectWindow({ project }: { project: Project }) {
  return (
    <div className="p-4 space-y-10 antialiased">
      <ProjectHeader project={project} />

      <SectionCard title="About">
        <div className="flex flex-col gap-4 w-full font-[family-name:var(--font-ibm-plex-mono)] text-sm">
          {project.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SectionCard>

      <GallerySection gallery={project.gallery} />
      <LinksSection links={project.links} />

      {/* TODO: Inspirations / References section — separate from Links,
          for projects that were built off of / responding to other
          existing work (moodboards, prior art, etc.). Not in the Figma
          file yet; add here, after Links, once designed. */}
    </div>
  );
}
