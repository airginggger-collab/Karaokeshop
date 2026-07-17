import siteConfigData from "../../content/site-config.json";
import scenariosData from "../../content/scenarios.json";
import bundlesData from "../../content/bundles.json";
import brandsData from "../../content/brands.json";
import staticPagesData from "../../content/static-pages.json";
import pageMeta from "../../content/page-meta.json";
import productsData from "../../content/products.json";
import blogData from "../../content/blog.json";
import storiesData from "../../content/stories.json";
import casesData from "../../content/cases.json";
import songsData from "../../content/songs.json";

export type SiteConfig = {
  name: string; url: string; city: string; phone: string; whatsapp: string;
  address: string; hours: string; email: string;
  defaultTitle: string; defaultDescription: string; songsTotal: number;
};
export const siteConfig: SiteConfig = siteConfigData;

export type Landing = { slug: string; h1: string; title: string; description: string };

// Сценарные лендинги (кластеры A/B из docs/strategy/url-map.md)
export const scenarios: Landing[] = (scenariosData as { items: Landing[] }).items;

// Комплекты по площади (кластер H)
/** Комплект по площади (/komplekty/[area]). `area` + `scenario` нужны, чтобы
 * страница считала цену и состав через bundleFor() из lib/calculator, а не
 * держала их своим текстом: цифры обязаны совпадать с калькулятором. */
export type Bundle = Landing & { area: number; scenario: string };
export const bundles: Bundle[] = (bundlesData as { items: Bundle[] }).items;

export type Brand = { slug: string; name: string; h1: string; title: string; description: string };
export const brands: Brand[] = (brandsData as { items: Brand[] }).items;

export type ProductType = "sistema" | "akustika" | "mikrofon" | "sub" | "miksher";

export const typeLabels: Record<ProductType, string> = {
  sistema: "Караоке-система",
  akustika: "Акустика",
  mikrofon: "Микрофон",
  sub: "Сабвуфер",
  miksher: "Микшер",
};

export type Product = {
  slug: string;
  type: ProductType;
  model: string;
  brand: string;
  price: number;
  priceOld?: number;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
  power?: string;
  note?: string;
  image?: string; // путь /products/<slug>.jpg или внешний URL; нет — иконка-заглушка
  // только караоке-системы:
  scenario?: string;
  scenarioLabel?: string;
  areaMax?: number;
  songsCount?: number;
  kit?: string[];
};

export const products: Product[] = (productsData as { items: Product[] }).items;

// Одиночные generic-страницы (рендерятся через (pages)/[page])
export const staticPages: Landing[] = (staticPagesData as { items: Landing[] }).items;

export const oNasMeta: Landing = pageMeta.oNas;
export const kontaktyMeta: Landing = pageMeta.kontakty;
export const sravnenieMeta: Landing = pageMeta.sravnenie;
export const catalogMeta: Landing = pageMeta.catalog;
export const podKlyuchMeta: Landing = pageMeta.podKlyuch;
export const komplektyIndexMeta: Landing = pageMeta.komplektyIndex;

export function priceFmt(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₸";
}

export function discountPct(price: number, priceOld?: number): number | null {
  if (!priceOld || priceOld <= price) return null;
  return Math.round((1 - price / priceOld) * 100);
}

/** Минимальная цена бренда — единый источник для всех «от N ₸».
 * ⚠️ Не хардкодить эту цифру на страницах: разошлась (/brand говорил
 * «от 950 000 ₸» при живом Evobox за 749 000, /sravnenie считал 749 000).
 * null — если у бренда нет товаров: показывать «от» тогда нечего. */
export function priceFromBrand(brand: string): number | null {
  const prices = products.filter((p) => p.brand === brand).map((p) => p.price);
  return prices.length ? Math.min(...prices) : null;
}

// Главная навигация (Header + мобильное меню).
// «Калькулятор» стоит здесь намеренно: до 2026-07-16 входа в него не было ни в
// шапке, ни в подвале, ни на главной — сильнейший инструмент подбора держался
// только на CTA лендингов.
export const mainNav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/dlya-doma", label: "Для дома" },
  { href: "/dlya-biznesa", label: "Для бизнеса" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/pod-klyuch", label: "Монтаж" },
  { href: "/kontakty", label: "Контакты" },
];

export const kalkulyatorMeta: Landing = pageMeta.kalkulyator;
export const pesniMeta: Landing = pageMeta.pesni;

export const songsTotal = siteConfig.songsTotal;

export type Song = { title: string; artist: string; lang: string };
export const songsSample: Song[] = (songsData as { items: Song[] }).items;

// Кейсы оснащённых заведений (B2B-доверие)
export type Case = {
  slug: string;
  venue: string;
  city: string;
  area: string;
  system: string;
  quote: string;
  author: string;
};
export const cases: Case[] = (casesData as { items: Case[] }).items;

export const keysyMeta: Landing = pageMeta.keysy;

// Блог (E-E-A-T, SEO-кластеры F/I)
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  faq: { q: string; a: string }[];
};
export const blogPosts: BlogPost[] = (blogData as { items: BlogPost[] }).items;

export const blogMeta: Landing = pageMeta.blog;

// Лента историй — реальный опыт клиентов с установкой
export type StoryPost = {
  id: string;
  author: string;
  initials: string;
  venue: string; // «Кафе в Алматы», «Гостиная, Астана», etc.
  date: string;
  text: string;
  tags: string[];
  likes: number;
  system?: string; // модель системы
};

export const storyPosts: StoryPost[] = (storiesData as { items: StoryPost[] }).items;

export const dlyaDomaMetaV2: Landing = pageMeta.dlyaDomaV2;
export const dlyaBiznesaMeta: Landing = pageMeta.dlyaBiznesa;
export const gotovyeResheniyaMeta: Landing = pageMeta.gotovyeResheniya;

export function allPaths(): string[] {
  return [
    "/",
    "/" + catalogMeta.slug,
    "/" + podKlyuchMeta.slug,
    "/" + komplektyIndexMeta.slug,
    "/pesni",
    "/keysy",
    "/blog",
    "/kalkulyator",
    "/sravnenie",
    "/o-nas",
    "/kontakty",
    "/dlya-doma",
    "/dlya-biznesa",
    "/gotovye-resheniya",
    // dlya-doma — редирект на /dlya-doma (не страница), в sitemap не включаем
    ...scenarios.filter((s) => s.slug !== "dlya-doma").map((s) => `/karaoke/${s.slug}`),
    ...bundles.map((b) => `/komplekty/${b.slug}`),
    ...brands.map((b) => `/brand/${b.slug}`),
    ...products.map((p) => `/product/${p.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...staticPages.map((p) => `/${p.slug}`),
  ];
}
