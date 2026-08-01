import Image from "next/image";
import SectionCard from "@/components/ui/section-card";
import { MediaItem } from "../types";

/**
 * The project window's Gallery section. Renders MediaItem[] (see types.ts
 * for the full image/video/audio shape) split into two visually different
 * groups rather than one uniform list, because the three media types don't
 * share a layout that makes sense for all of them:
 *
 * - image and video are both grouped into `tiles` and share one 2-column
 *   grid, each cropped to a fixed aspect-video (16:9) box via
 *   `object-cover` — they're the two types that have an actual visual
 *   frame to show, so a thumbnail-grid reads naturally for both.
 * - audio has no visual frame at all (there's nothing to put in a tile), so
 *   it's pulled into its own `audioItems` group and rendered *below* the
 *   tile grid as a full-width row per clip instead — a native <audio>
 *   player is a horizontal bar, and squeezing that into a square grid cell
 *   would either clip it or waste most of the tile's height on empty space.
 *
 * Returns null entirely (rather than an empty card) when a project has no
 * gallery media yet, so About/Links keep their normal spacing instead of
 * leaving a visible gap for a section with nothing in it.
 */
export default function GallerySection({ gallery }: { gallery?: MediaItem[] }) {
  if (!gallery || gallery.length === 0) return null;

  // Split by type rather than rendering the array in original order: image
  // and video need to land in the same CSS grid to lay out as tiles
  // together, while audio needs to fall outside that grid entirely — doing
  // this as two filters up front keeps the JSX below from having to
  // interleave grid and non-grid markup based on each item's type in place.
  const tiles = gallery.filter((item) => item.type !== "audio");
  const audioItems = gallery.filter((item) => item.type === "audio");

  return (
    <SectionCard title="Gallery">
      {tiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 w-full">
          {tiles.map((item, i) =>
            item.type === "image" ? (
              // next/image with `fill` needs a sized, `position: relative`
              // ancestor to fill — that's what this wrapper div's
              // `relative aspect-video` is for; the image itself has no
              // intrinsic box of its own here.
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
              // A plain <video> (not next/image) since Next has no built-in
              // video optimization component — `controls` exposes the
              // browser's native play/pause/seek/volume UI (no custom
              // player built for this yet), and `poster` (optional on the
              // MediaItem type — see types.ts) shows a still frame before
              // playback starts if one was provided, otherwise the browser
              // falls back to its own default (typically the first frame).
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
          {/* `label` (required on the "audio" MediaItem variant — see
              types.ts) is the only identifying text for this clip, since an
              <audio> element renders as just a bare playback bar with
              nothing to indicate what it is. */}
          <p className="mb-1 text-sm font-semibold">{item.label}</p>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- background audio, no dialogue to caption */}
          <audio src={item.src} controls className="w-full" />
        </div>
      ))}
    </SectionCard>
  );
}
