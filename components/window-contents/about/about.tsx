import Image from "next/image";
import EducationCard from "./edu-card";
import ConnectCard from "./connect-card";
import AboutCard from "./about-card";
import styles from "@/styles/window.module.css";

const TOOLS = [
  { name: "Unity Engine", icon: "/light/about/with-shadow/unity icon.svg" },
  { name: "Figma", icon: "/light/about/with-shadow/figma icon.svg" },
  { name: "TouchDesigner", icon: "/light/about/with-shadow/touch designer icon.svg" },
  { name: "Blender", icon: "/light/about/with-shadow/blender icon.svg" },
];

export default function About() {
  return (
    <div className="p-4 font-[family-name:var(--font-inter)] space-y-7 antialiased">
      {/* image + bio */}
      <div
        className={`${styles.windowCard} flex flex-col md:flex-row rounded-sm shadow-lg border border-[var(--near-black)] items-center md:items-start gap-5 px-3 py-6`}
      >
        {/* avatar */}
        <div className="w-32 h-32 shrink-0 ml-2 rounded-full border-3 border-[var(--near-black)] overflow-hidden">
          <Image
            className="rounded-full object-cover w-full h-full"
            src={"/cool.jpeg"}
            alt="profile pic"
            height={500}
            width={500}
          />
        </div>
        {/* name + short desc */}
        <div className="flex flex-col space-y-2 text-center md:text-left px-3 py-3">
          <h3 className="text-2xl font-black font-[family-name:var(--font-inter)]">Danny Mallya</h3>
          <p className="px-[0.15rem] max-w-sm text-sm font-medium font-[family-name:var(--font-ibm-plex-mono)]">
            Immersive Media Design + Info Sci @ University of Maryland
          </p>
        </div>
      </div>

      {/* education section */}
      <AboutCard title="Education">
        <EducationCard
          heading="University of Maryland"
          badgeSrc="/light/about/with-shadow/UMD-grad-date.svg"
          badgeYear="2027"
          subtext={["B.S. Information Science", "B.A. Immersive Media Design"]}
        />
        <hr className="border-t border-[var(--near-black)]" />
        <EducationCard
          heading="Academy of Health Sciences @ PGCC"
          badgeSrc="/light/about/with-shadow/AHS-grad-date.svg"
          badgeYear="2023"
          subtext={["A.A. General Studies", "High School Diploma"]}
        />
      </AboutCard>

      {/* tools section */}
      <AboutCard title="Tools">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="flex items-center gap-3">
              <Image src={tool.icon} alt="" width={45} height={45} />
              <span className="font-bold font-[family-name:var(--font-space-grotesk)]">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </AboutCard>

      {/* connection section*/}
      <AboutCard title="Connect">
        <div className="flex gap-10 justify-center">
          <ConnectCard
            icon={
              <Image
                src="/light/about/with-shadow/linkedin.svg"
                alt="LinkedIn"
                width={60}
                height={60}
              />
            }
            title="LinkedIn"
            link="#"
          />
          <ConnectCard
            icon={
              <Image
                src="/light/about/with-shadow/github.svg"
                alt="GitHub"
                width={60}
                height={60}
              />
            }
            title="GitHub"
            link="#"
          />
        </div>
        <a
          href="#"
          className="self-center cursor-pointer bg-[var(--standard-action)] text-[var(--near-black)] py-2 px-4 rounded-sm border-2 border-[var(--near-black)] hover:scale-105 duration-150 ease-in-out font-bold text-center"
        >
          Contact Form
        </a>
      </AboutCard>
    </div>
  );
}
