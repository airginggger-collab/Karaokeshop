import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "@kk/tokens/tokens.css";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareBar } from "@/components/CompareBar";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap",
});

const themeScript = `try{var t=localStorage.getItem('kk-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>
          <Header />
          {children}
          <Footer />
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}
