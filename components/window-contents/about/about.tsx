import Image from "next/image";
import EducationCard from "./edu-card";
import ConnectCard from "./connect-card";
import styles from "@/styles/window.module.css";

export default function About() {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-7 antialiased">
      {/* image + bio */}
      <div
        className={`${styles.windowCard} flex flex-col md:flex-row rounded-sm shadow-lg border border-[var(--window-border)] items-center md:items-start gap-5 px-3 py-6`}
      >
        {/* avatar */}
        <div className="w-32 h-32 shrink-0 ml-2 rounded-full border-3 border-[var(--near-black)] overflow-hidden">
          {
            <Image
              className="rounded-full object-cover w-full h-full"
              src={"/cool.jpeg"}
              alt="profile pic"
              height={500}
              width={500}
            />
          }
        </div>
        {/* name + short desc */}
        <div className="flex flex-col space-y-2 text-center md:text-left px-3 py-3">
          <h3 className="text-2xl font-black font-[family-name:var(--font-inter)]">Danny Mallya</h3>
          <p className="px-[0.15rem] max-w-sm text-sm font-medium font-[family-name:var(--font-ibm-plex-mono)]">
            Immersive Media Design + Info Sci  @ UMCP
          </p>
        </div>
      </div>
      {/* education section */}
      <div
        className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}
      >
        <h3 className="font-bold text-2xl px-2 py-2">Education</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-6" />
        {/* content */}
        <div className="flex flex-col">
          <p>EDU CARDS GO HERE</p>
        </div>
      </div>
      {/* tools section */}
      <div
        className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}
      >
        <h3 className="font-bold text-2xl px-2 py-2">Tools</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-4" />
        {/* content */}
        <div className="flex flex-col gap-y-4">
          <p>TOOL CARDS GO HERE</p>
        </div>
      </div>
      {/* connection section*/}
      <div
        className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}
      >
        <h3 className="font-bold text-2xl px-2 py-2">Connect</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-4" />
        <div className="flex flex-col font-medium text-lg px-3 py-2 gap-y-3">
          <p>CONNECT CARDS GO HERE</p>
          <button className="cursor-pointer bg-[var(--standard-action)] text-[var(--near-black)] py-2 px-4 rounded-sm border-2 border-[var(--near-black)] hover:scale-105 duration-150 ease-in-out">
            Floptact Form
          </button>
        </div>
      </div>
    </div>
  );
}
