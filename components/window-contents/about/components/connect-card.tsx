import Link from "next/link";

/**
 * A single "Connect" row in the About window (LinkedIn, GitHub, ...): an
 * icon + label wrapped in a Link. `link` currently defaults to "#"
 * placeholders in about.tsx until real profile URLs are supplied.
 *
 * Uses the same flex items-center + gap layout as the Tools row in
 * about.tsx so both rows line up consistently (this previously used a
 * separate hand-tuned margin/offset layout that didn't match).
 */
export default function ConnectCard({
  icon,
  title,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
}) {
  return (
    <Link href={link} className="flex items-center gap-3">
      {icon}
      <h4 className="text-lg font-semibold">{title}</h4>
    </Link>
  );
}
