import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={theme}
      className="border border-black bg-[var(--bg-saturated)] px-2 py-3 rounded-md shadow-md text-sm"
      onChange={(e) => setTheme(e.target.value)}
    >
      <button className="font-black cursor-pointer rounded-xs px-3 py-1.5 mx-5 outline-[3] outline-black shadow-md hover:scale-[1.08] transition-transform duration-200 ease-in-out bg-[var(--title-bar)] font-[family-name:var(--font-space-grotesk)]">
        
      </button>
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="mono">Monochrome</option>
    </select>
  );
};

export default ThemeSwitch
