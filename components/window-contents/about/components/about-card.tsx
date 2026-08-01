/**
 * A section card used inside the About window (Education, Tools, Connect):
 * a solid amber header band above a cream body, matching the Figma design's
 * "full-width color band" header style. Distinct from SectionCard, which
 * uses a small floating tab instead — About intentionally uses a different
 * header convention per the design file.
 */
export default function AboutCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border-3 border-[var(--near-black)] shadow-[3px_3px_0px_0px_black]">
      <div className="rounded-t-xs border-b-3 border-[var(--near-blackl)] bg-[var(--title-bar)] px-6 py-4">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
          {title}
        </h3>
      </div>
      <div className="rounded-b-xs bg-[var(--surface-frame-card)] px-6 py-6 flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}
