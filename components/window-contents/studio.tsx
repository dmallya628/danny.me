import styles from "@/styles/window.module.css";
import ThemedIcon from "@/components/icons/themed-icon";

/**
 * Content of the "studio" window — a "coming soon" placeholder for a future
 * playlist site. Reuses the same icon asset as the studio desktop icon.
 */
export default function Studio() {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] antialiased">
      <div
        className={`${styles.windowCard} flex items-center gap-5 rounded-sm shadow-[3px_3px_0px_0px_black] border border-[var(--near-black)] px-5 py-6`}
      >
        <div className="w-24 h-24 shrink-0">
          <ThemedIcon
            light="/light/desktop/no-shadow/disc-temp.svg"
            // TODO: no dark-mode asset exists yet for this icon (see the
            // matching TODO in app/page.tsx's WINDOWS config) — shows a
            // broken image in dark/mono themes until one is added.
            dark="/dark/desktop/studio_loading.svg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            studio_
          </h3>
          <p className="text-xs tracking-wide text-[#3e3e3e] font-[family-name:var(--font-ibm-plex-mono)]">
            a playlist site, coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
