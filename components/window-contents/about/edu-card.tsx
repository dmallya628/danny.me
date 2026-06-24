import Image from "next/image";
import Link from "next/link";

export default function EducationCard({
  heading,
  year,
  subtext,
  link,
}: {
  heading: string;
  year: string;
  subtext: string;
  link: string;
}) {
  return (
    <div className="mb-12">
      {/* top row section */}
      <div className="flex flex-row items-center gap-5 px-1 py-2">
        {/* icon */}
        <Link href={link}>
          <div className="relative w-7 h-7 ml-3">
            <Image
              src="/light/about/ext-link.svg"
              alt="link"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* heading + line + year group */}
        <div className="flex flex-row items-center gap-2 flex-grow h-6">
          <h4 className="text-lg font-normal whitespace-nowrap">{heading}</h4>

          <div className="relative flex-grow h-[1rem]">
            <Image
              src="/light/about/line.svg"
              alt="line"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-lg font-normal whitespace-nowrap mr-9">{year}</p>
        </div>
      </div>

      {/* subtext */}
      <div>
        <p className="text-sm font-normal indent-16">{subtext}</p>
      </div>
    </div>
  );
}
