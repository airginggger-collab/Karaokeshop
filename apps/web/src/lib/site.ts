export const siteConfig = {
  name: "karaokeshop",
  url: "https://www.karaokeshop.kz",
  city: "Алматы",
  defaultTitle: "Караоке под ключ в Казахстане — для дома и заведений",
  defaultDescription:
    "Караоке-системы AST и Studio Evolution. Продажа, монтаж, рассрочка Kaspi. Оснащение баров и клубов под ключ. Алматы, с 2012.",
} as const;

export type Landing = { slug: string; h1: string; title: string; description: string };

// Сценарные лендинги (кластеры A/B из docs/strategy/url-map.md)
export const scenarios: Landing[] = [
  { slug: "dlya-doma", h1: "Караоке для дома", title: "Караоке для дома — купить домашнюю систему, Алматы", description: "Домашние караоке-системы от 415 000 ₸. Рассрочка Kaspi 0-0-12, доставка, гарантия. Подбор по бюджету." },
  { slug: "dlya-kafe", h1: "Караоке для кафе", title: "Караоке для кафе — система под ключ, Алматы", description: "Караоке для кафе: компактные системы, монтаж и настройка. Рассрочка Kaspi." },
  { slug: "dlya-bara", h1: "Караоке для бара", title: "Караоке для бара — оборудование под ключ, Алматы", description: "Профессиональные караоке-системы для бара. Проект звука, монтаж, обучение. Расчёт по площади зала." },
  { slug: "dlya-restorana", h1: "Караоке для ресторана", title: "Караоке для ресторана — оснащение под ключ", description: "Караоке-комплекты для ресторана: звук, свет, монтаж, обновление песен. Расчёт по площади." },
  { slug: "dlya-kluba", h1: "Караоке для клуба", title: "Караоке для клуба — профессиональное оборудование", description: "Оснащение караоке-клуба под ключ: AST-250/350, акустика RCF, свет. Проект и монтаж." },
];

// Комплекты по площади (кластер H)
export const bundles: Landing[] = [
  { slug: "do-30", h1: "Караоке для зала до 30 м²", title: "Караоке для зала до 30 м² — готовый комплект", description: "Готовый комплект караоке для кафе до 30 м². Под ключ: монтаж, настройка, обучение." },
  { slug: "do-50", h1: "Караоке для зала до 50 м²", title: "Караоке для зала до 50 м² — готовый комплект", description: "Готовый комплект караоке для зала до 50 м². Под ключ с рассрочкой Kaspi." },
  { slug: "do-80", h1: "Караоке для бара до 80 м²", title: "Караоке для бара до 80 м² — комплект AST-350", description: "Готовое решение на базе AST-350 для бара до 80 м². Проект, монтаж, обучение." },
  { slug: "do-100", h1: "Караоке для клуба до 100+ м²", title: "Караоке для клуба до 100+ м² — премиум-комплект", description: "Премиум-комплект для клуба от 100 м²: AST-350 + RCF, свет, монтаж под ключ." },
];

export type Brand = { slug: string; name: string; h1: string; title: string; description: string };
export const brands: Brand[] = [
  { slug: "ast", name: "AST", h1: "Караоке AST (Art System)", title: "Караоке AST (Art System) — модели и цены", description: "Караоке-системы AST: HOME, Mini, AST-50/250/350. Для дома и заведений. Рассрочка Kaspi." },
  { slug: "studio-evolution", name: "Studio Evolution", h1: "Караоке Studio Evolution", title: "Караоке Studio Evolution / Evobox — купить", description: "Системы Studio Evolution: Evobox, Evobox Plus, Pro2. Для дома, баров и клубов." },
];

export type Product = {
  slug: string;
  model: string;
  brand: string;
  scenario: string;
  scenarioLabel: string;
  areaMax: number;
  price: number;
  priceOld?: number;
  songsCount: number;
  kit: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "ast-250", model: "AST-250", brand: "AST", scenario: "bar", scenarioLabel: "бар / клуб",
    areaMax: 80, price: 1500000, priceOld: 2664000, songsCount: 60000,
    kit: ["Сенсорный пульт-моноблок", "2 беспроводных микрофона", "Усилитель", "Акустика (пара)", "Сабвуфер", "Микшер", "ИБП", "Кабельная обвязка"],
    rating: 4.9, reviewsCount: 23, inStock: true, featured: true,
  },
  {
    slug: "ast-mini", model: "AST Mini", brand: "AST", scenario: "dom", scenarioLabel: "дом / кафе",
    areaMax: 30, price: 720000, songsCount: 60000,
    kit: ["Пульт-моноблок", "2 микрофона", "Активная акустика", "Кабели"],
    rating: 4.8, reviewsCount: 14, inStock: true, featured: true,
  },
  {
    slug: "evobox", model: "Evolution Evobox", brand: "Studio Evolution", scenario: "dom", scenarioLabel: "для дома",
    areaMax: 30, price: 749000, songsCount: 50000,
    kit: ["Медиаплеер Evobox", "2 микрофона", "Пульт управления"],
    rating: 4.7, reviewsCount: 31, inStock: true, featured: true,
  },
  {
    slug: "evobox-plus", model: "Evobox Plus", brand: "Studio Evolution", scenario: "klub", scenarioLabel: "бар / клуб",
    areaMax: 100, price: 1390000, songsCount: 60000,
    kit: ["Evobox Plus", "4 радиомикрофона", "Акустика + сабвуфер", "Микшер", "Свет"],
    rating: 4.8, reviewsCount: 9, inStock: true,
  },
];

// Одиночные страницы доверия/сервиса
export const staticPages: Landing[] = [
  { slug: "o-nas", h1: "О компании", title: "О компании — эксперты по караоке с 2012", description: "Поставка, монтаж и обслуживание караоке-оборудования в Алматы с 2012 года." },
  { slug: "kontakty", h1: "Контакты", title: "Контакты — Алматы, шоурум и сервис-центр", description: "Адрес, телефоны и режим работы. Шоурум и сервис-центр в Алматы." },
  { slug: "servis", h1: "Сервис и гарантия", title: "Сервис, настройка и ремонт караоке", description: "Подключение, настройка под помещение, гарантия и ремонт караоке-систем." },
  { slug: "pesni", h1: "Каталог песен", title: "Каталог песен и обновление репертуара", description: "База из 60 000+ песен и регулярное обновление репертуара." },
];

export const catalogMeta: Landing = {
  slug: "catalog",
  h1: "Каталог",
  title: "Каталог караоке-систем и оборудования",
  description: "Караоке-системы, акустика, микрофоны, свет. Фильтр по сценарию, бренду и площади. Рассрочка Kaspi.",
};

export const podKlyuchMeta: Landing = {
  slug: "pod-klyuch",
  h1: "Оснащение караоке под ключ",
  title: "Оснащение караоке под ключ — проект, монтаж, обучение",
  description: "Спроектируем звук под помещение, смонтируем, обучим персонал. Один договор. Расчёт по площади.",
};

export const komplektyIndexMeta: Landing = {
  slug: "komplekty",
  h1: "Готовые комплекты по площади",
  title: "Готовые комплекты караоке — по площади заведения",
  description: "Готовые решения под площадь зала: до 30, 50, 80 и 100+ м². Под ключ с рассрочкой Kaspi.",
};

export function priceFmt(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₸";
}

export function installmentMonthly(price: number): number {
  return Math.round(price / 12);
}

export function discountPct(price: number, priceOld?: number): number | null {
  if (!priceOld || priceOld <= price) return null;
  return Math.round((1 - price / priceOld) * 100);
}

export function allPaths(): string[] {
  return [
    "/",
    "/" + catalogMeta.slug,
    "/" + podKlyuchMeta.slug,
    "/" + komplektyIndexMeta.slug,
    ...scenarios.map((s) => `/karaoke/${s.slug}`),
    ...bundles.map((b) => `/komplekty/${b.slug}`),
    ...brands.map((b) => `/brand/${b.slug}`),
    ...products.map((p) => `/product/${p.slug}`),
    ...staticPages.map((p) => `/${p.slug}`),
  ];
}
