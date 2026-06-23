import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "@kk/tokens/tokens.css";
import "@kk/tokens/theme.css";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { ScrollToTop } from "@/components/ScrollToTop";
import Script from "next/script";

const YM_ID = "XXXXXXXX"; // TODO: заменить на реальный ID счётчика Яндекс.Метрики

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
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_KZ",
    type: "website",
    images: [{ url: `${siteConfig.url}/og.jpg`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: "karaokeshop",
  description: "Официальный дилер AST и Studio Evolution в Казахстане. Продажа, монтаж и настройка под ключ. Шоурум в Алматы, с 2012.",
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Муканова, офис 8",
    addressLocality: "Алматы",
    addressRegion: "Алматы",
    addressCountry: "KZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.2567,
    longitude: 76.9286,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "₸₸₸",
  foundingDate: "2012",
  sameAs: [
    "https://2gis.kz/almaty/search/karaokeshop",
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
        <Providers>
          <Header />
          {children}
          <Footer />
          <WhatsAppFAB />
          <ScrollToTop />
        </Providers>
        <Script id="ym-init" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
          ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `}</Script>
        <noscript>
          <div><img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{position:"absolute",left:"-9999px"}} alt="" /></div>
        </noscript>
      </body>
    </html>
  );
}
