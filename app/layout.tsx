import type { Metadata } from "next";
import {
  Space_Grotesk,
  IBM_Plex_Mono,
  Inter,
  Gasoek_One,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";

// Each font is loaded once and exposed as a CSS variable so individual
// components can opt into a specific typeface via a Tailwind arbitrary-value
// font utility instead of a global font-family.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

const gasoekOne = Gasoek_One({
  weight: "400",
  variable: "--font-gasoek-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D.ME",
  description: "my portfolio website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexMono.className} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} ${gasoekOne.variable} antialiased max-h-screen`}
      >
        {/* Shared filter for DesktopIcon's hard-shadow silhouette (see
            components/icons/desktop-icon.tsx). Thresholds the alpha channel
            to fully opaque/transparent before flattening to black, so
            partially-transparent icon fills (e.g. the disc icon's
            background-tinted center hole) are dropped instead of
            rendering as a muddy tinted smudge. */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="hard-shadow-silhouette" colorInterpolationFilters="sRGB">
            <feComponentTransfer in="SourceAlpha" result="thresholded">
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feFlood floodColor="black" result="flood" />
            <feComposite in="flood" in2="thresholded" operator="in" />
          </filter>
        </svg>
        <NextIntlClientProvider>
          {/* change default theme to "system" after dark mode update */}
          <ThemeProvider
            enableSystem={true}
            enableColorScheme={true}
            defaultTheme="system"
            themes={["light", "dark"]}
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
