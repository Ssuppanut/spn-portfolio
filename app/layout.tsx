import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rubik_Glitch } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { ScrollStage } from "@/components/scroll-stage";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${rubikGlitch.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <SmoothScroll>
            <Nav />
            <ScrollStage>
              <main>{children}</main>
            </ScrollStage>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
