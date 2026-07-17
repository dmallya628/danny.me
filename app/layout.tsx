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
        <NextIntlClientProvider>
          {/* change default theme to "system" after dark mode update */}
          <ThemeProvider
            enableSystem={true}
            enableColorScheme={true}
            defaultTheme="light"
            themes={["light", "dark", "mono"]}
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
