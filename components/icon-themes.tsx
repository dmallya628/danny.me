import Image from "next/image";
import { useTheme } from "next-themes";

export default function ThemedIcon({
  light,
  dark,
  monochrome,
}: {
  light: string;
  dark: string;
  monochrome?: string;
}) {
  const { resolvedTheme, theme } = useTheme();
  let source;

  switch (resolvedTheme) {
    case "light":
      source = light;
      break;
    case "dark":
      source = dark;
      break;
    default:
      source = (theme === "light" ? dark : light);
      break;
  }

  return <Image src={source} alt="icon" width={500} height={500} suppressHydrationWarning />;
}
