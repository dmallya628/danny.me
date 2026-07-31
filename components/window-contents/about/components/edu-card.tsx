import Image from "next/image";

/**
 * A single education entry in the About window's Education card: a
 * pre-rendered "star badge" image showing the graduation year (badgeSrc —
 * the year is baked into the SVG art itself, not overlaid as text) next to
 * the school name and a short multi-line description.
 */
export default function EducationCard({
  heading,
  subtext,
  badgeSrc,
  badgeYear,
}: {
  heading: string;
  /** Each string renders as its own line (joined with <br/>), e.g. degree + honors. */
  subtext: string[];
  badgeSrc: string;
  /** Used only as the badge image's alt text — the visible year comes from the image itself. */
  badgeYear: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Image src={badgeSrc} alt={badgeYear} width={60} height={50} />
      <div>
        <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
          {heading}
        </h4>
        <p className="text-xs text-[#3f3f3f] font-[family-name:var(--font-ibm-plex-mono)]">
          {subtext.map((line, i) => (
            <span key={line}>
              {line}
              {i < subtext.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
