import Image from "next/image";

export default function EducationCard({
  heading,
  subtext,
  badgeSrc,
  badgeYear,
}: {
  heading: string;
  subtext: string[];
  badgeSrc: string;
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
