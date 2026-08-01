import Image from "next/image";
import SectionCard from "@/components/ui/section-card";
import { MediaItem } from "../types";

/**
 * The project window's Gallery section: pictures and video render as a grid
 * of tiles, audio renders as a full-width row (a thumbnail doesn't make
 * sense for it). Returns null entirely (rather than an empty card) when a
 * project has no gallery media yet, so About/Links keep their normal spacing.
 */
export default function GallerySection({ gallery }: { gallery?: MediaItem[] }) {
  if (!gallery || gallery.length === 0) return null;

  const tiles = gallery.filter((item) => item.type !== "audio");
  const audioItems = gallery.filter((item) => item.type === "audio");

  return (
    <SectionCard title="Gallery">
      {tiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 w-full">
          {tiles.map((item, i) =>
            item.type === "image" ? (
              <div
                key={i}
                className="relative aspect-video rounded-sm border-2 border-[var(--near-black)] overflow-hidden"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 300px"
                  className="object-cover"
                />
              </div>
            ) : (
              <video
                key={i}
                src={item.src}
                poster={item.poster}
                controls
                className="aspect-video w-full rounded-sm border-2 border-[var(--near-black)] object-cover"
              />
            )
          )}
        </div>
      )}
      {audioItems.map((item, i) => (
        <div key={i} className="w-full">
          <p className="mb-1 text-sm font-semibold">{item.label}</p>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- background audio, no dialogue to caption */}
          <audio src={item.src} controls className="w-full" />
        </div>
      ))}
    </SectionCard>
  );
}
