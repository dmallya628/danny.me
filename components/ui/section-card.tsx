import styles from "@/styles/window.module.css";

/**
 * A section card with a small floating title tab overlapping its top-left
 * corner — used in Settings (Appearance, Date & Time, Language) and the
 * Portfolio project window (About, Media, Links). Distinct from AboutCard,
 * which uses a full-width color band header instead — About intentionally
 * uses a different header convention per the design file.
 */
export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative px-2 mt-3">
      {/* floating title tab, positioned absolutely so it overlaps the card below */}
      <div className={`${styles.windowCard} absolute -top-4 left-10 flex rounded-xl shadow-[2px_2px_0px_0px_black] border border-[var(--near-black)] items-center px-8 py-3`}>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div className={`${styles.windowCard} static flex flex-col rounded-xl bg-[var(--surface-frame-card)] shadow-[3px_3px_0px_0px_black] border border-[var(--near-black)] items-center md:items-start gap-5 px-3 py-5`}>
        <div className="w-full px-5">
          <div className="flex flex-col justify-between items-center px-5 py-5 rounded-lg gap-y-6 mt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
