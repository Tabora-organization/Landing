import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://manager.tabora.uz";

export const metadata: Metadata = {
  title: "Tabora — Qarz va nasiya nazorati",
  description:
    "O'zbekistonning birinchi P2P qarz tracking platformasi. Qarz bering, oling, kuzating — hammasi bir joyda. Bepul boshlang.",
  keywords: ["qarz", "nasiya", "tabora", "qarz nazorat", "kredit", "uz"],
  metadataBase: new URL("https://tabora.uz"),
  openGraph: {
    title: "Tabora — Qarz va nasiya nazorati",
    description: "Qarz bering, oling, kuzating — hammasi bir joyda. Bepul boshlang.",
    siteName: "Tabora",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabora — Qarz va nasiya nazorati",
    description: "Qarz bering, oling, kuzating — hammasi bir joyda.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1d4ed8" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content for theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('landing_theme') || 'dark';
                var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (d) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}>{children}</body>
    </html>
  );
}
