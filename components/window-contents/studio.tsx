import styles from "@/styles/window.module.css";
import ThemedIcon from "@/components/icons/themed-icon";

export default function Studio() {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] antialiased">
      <div
        className={`${styles.windowCard} flex items-center gap-5 rounded-sm shadow-lg border border-[var(--near-black)] px-5 py-6`}
      >
        <div className="w-24 h-24 shrink-0">
          <ThemedIcon
            light="/light/desktop/no-shadow/disc-temp.svg"
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
