export default function SettingCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative px-2 mt-3">
      <div className="absolute -top-4 left-10 flex rounded-xl bg-[var(--window-card)] shadow-md border border-[var(--window-border)] items-center px-3 py-3">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div className="static flex flex-col rounded-xl bg-[var(--window-card)] shadow-lg border border-[var(--window-border)] items-center md:items-start gap-5 px-3 py-5">
        <div className="w-full px-5">
          <div className="flex flex-col justify-between items-center px-5 py-5 rounded-lg gap-y-6 mt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
