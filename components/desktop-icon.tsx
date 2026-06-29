export default function DesktopIcon({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-3 rounded-md text-center flex flex-col items-center active:outline"
    >
      <div className="w-24 h-24 rounded hover:scale-[1.1] transition-all duration-200 ease-in-out">{icon}</div> {/* add hover icon changes [needs new icon designs]*/}
      <p className="p-0.5 text-bold anti-aliased">{title}</p>
    </div>
  );
}
