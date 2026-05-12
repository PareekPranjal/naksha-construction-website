import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { pageMetadata } from "@/lib/seo";
import { getSiteShell } from "@/lib/cms-server";
import { SiteShellProvider } from "@/lib/site-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const shell = await getSiteShell();
  const s = shell.siteSettings;
  const meta = pageMetadata({
    title: s.name,
    description:
      s.tagline ??
      "Naksha Construction — Jaipur-based construction services for residential and commercial projects across Rajasthan.",
    path: "/",
    defaults: s.seo,
  });
  if (s.favicon) {
    meta.icons = { icon: s.favicon, apple: s.favicon, shortcut: s.favicon };
  }
  return meta;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const shell = await getSiteShell();
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SiteShellProvider value={shell}>
          <LenisProvider>{children}</LenisProvider>
        </SiteShellProvider>
      </body>
    </html>
  );
}
