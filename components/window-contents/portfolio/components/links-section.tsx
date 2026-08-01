import Image from "next/image";
import Link from "next/link";
import { Link2 } from "lucide-react";
import SectionCard from "@/components/ui/section-card";
import { ProjectLink } from "../types";

/**
 * The project window's Links section: external links out (Figma, GitHub, a
 * live site, ...). Many projects — closed-source client work especially —
 * have no public links at all, so this returns null entirely rather than an
 * empty card in that case.
 */
export default function LinksSection({ links }: { links?: ProjectLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <SectionCard title="Links">
      <div className="flex flex-col gap-4 w-full">
        {links.map((link) => (
          <Link key={link.label} href={link.url} className="flex items-center gap-3">
            {/* Not every linkable service has a bundled icon asset — fall back to a generic link glyph. */}
            {link.icon ? (
              <Image src={link.icon} alt="" width={28} height={28} />
            ) : (
              <Link2 className="w-7 h-7" />
            )}
            <span className="font-bold font-[family-name:var(--font-space-grotesk)]">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
