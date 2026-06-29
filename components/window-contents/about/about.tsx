import Image from "next/image";
import EducationCard from "./edu-card";
import ConnectCard from "./connect-card";
import styles from "@/styles/window.module.css"

export default function About() {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-7 antialiased">
      {/* image + bio */}
      <div className={`${styles.windowCard} flex flex-col md:flex-row rounded-sm shadow-lg border border-[var(--window-border)] items-center md:items-start gap-5 px-3 py-6`}>
        {/* avatar */}
        <div className="w-32 h-32 shrink-0 ml-2">
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
        <div className="flex flex-col space-y-2 text-center md:text-left px-1 py-3">
          <h3 className="text-2xl font-extrabold pb-1">Danny Mallya</h3>
          <p className="max-w-sm text-sm font-normal">
            Immersive Media Design & Info Sci Student @ University of Maryland -
            College Park
          </p>
        </div>
      </div>
      {/* education section */}
      <div className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}>
        <h3 className="font-bold text-2xl px-2 py-2">Education</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-6" />
        {/* content */}
        <div className="flex flex-col">
          <EducationCard
            heading="Soundscape"
            year="2025"
            subtext="C#, Unity 3D, Python, EEG Data"
            link="https://github.com/ph4nT0m-d4n1/IMDM290_Soundscape"
          />
          <EducationCard
            heading="WeatherFIT"
            year="2025"
            subtext="Python, Weather API Data"
            link="https://github.com/ph4nT0m-d4n1/INST326_WeatherFIT"
          />
        </div>
      </div>
      {/* tools section */}
      <div className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}>
        <h3 className="font-bold text-2xl px-2 py-2">Tools</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-4" />
        {/* content */}
        <div className="flex flex-col gap-y-4">
          <ConnectCard
            title="LinkedIn"
            icon={
              <Image
                src={"/light/about/linkedin.svg"}
                alt="linkedin icon"
                fill
                className="object-contain"
              />
            }
            link="https://www.linkedin.com/in/daniel-mallya-71b928235/"
          />
          <ConnectCard
            title="GitHub"
            icon={
              <Image
                src={"/light/about/github.svg"}
                alt="github icon"
                fill
                className="object-contain"
              />
            }
            link="https://github.com/ph4nT0m-d4n1"
          />
        </div>
      </div>
      {/* connection section*/}
      <div className={`${styles.windowCard} flex flex-col rounded-xl shadow-lg border border-[var(--window-border)] text-center md:text-left px-4 py-5`}>
        <h3 className="font-bold text-2xl px-2 py-2">Connect</h3>
        <hr className="-mx-4 my-3 w-auto border-t border-[var(--window-border)] mb-4"/>
        <div className="flex flex-col font-medium text-lg px-3 py-2 gap-y-3">
          <p>This is my portfolio site.</p>
          <p>I wanted to make something a bit more unique, so I went for a desktop-styled website.</p>
        </div>
      </div>
    </div>
  );
}
