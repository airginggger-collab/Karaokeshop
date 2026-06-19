export const siteConfig = {
  name: "karaokeshop",
  url: "https://www.karaokeshop.kz",
  city: "Алматы",
  phone: "+7 707 579-99-95",
  whatsapp: "77075799995",
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

// Главная навигация (Header + мобильное меню)
export const mainNav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/komplekty", label: "Готовые комплекты" },
  { href: "/pod-klyuch", label: "Под ключ" },
  { href: "/pesni", label: "Песни" },
  { href: "/servis", label: "Сервис" },
];

export const pesniMeta: Landing = {
  slug: "pesni",
  h1: "Каталог песен",
  title: "Каталог песен и обновление репертуара",
  description: "База из 60 000+ песен на разных языках. Регулярное обновление репертуара по договору.",
};

export const songsTotal = 60000;

export type Song = { title: string; artist: string; lang: string };
export const songsSample: Song[] = [
  { title: "Көзімнің қарасы", artist: "Абай", lang: "KZ" },
  { title: "Атамекен", artist: "Қайрат Нұртас", lang: "KZ" },
  { title: "Любимая моя", artist: "Юрий Антонов", lang: "RU" },
  { title: "Зурбаган", artist: "Forum", lang: "RU" },
  { title: "Hello", artist: "Adele", lang: "EN" },
  { title: "Despacito", artist: "Luis Fonsi", lang: "ES" },
  { title: "Кукушка", artist: "Кино", lang: "RU" },
  { title: "Su Asqan", artist: "Ninety One", lang: "KZ" },
];

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
export const cases: Case[] = [
  { slug: "bar-almaty", venue: "Караоке-бар", city: "Алматы", area: "70 м²", system: "AST-250", quote: "Поставили под ключ за 2 дня, настроили звук под зал, обучили бармена. Гости в восторге, окупается.", author: "Данияр К." },
  { slug: "restoran-astana", venue: "Ресторан", city: "Астана", area: "120 м²", system: "Evobox Plus", quote: "Звук ровный по всему залу, репертуар обновляют каждый месяц. Без нареканий.", author: "Аружан С." },
  { slug: "otel-shymkent", venue: "Отель, банкетный зал", city: "Шымкент", area: "150 м²", system: "AST-350", quote: "Сделали проект под акустику зала — всё работает идеально на банкетах.", author: "Тимур А." },
];

export const keysyMeta: Landing = {
  slug: "keysy",
  h1: "Кейсы: оснащённые заведения",
  title: "Кейсы: оснащённые бары, рестораны и клубы",
  description: "Примеры оснащения караоке под ключ в Казахстане: бары, рестораны, отели. Системы AST и Studio Evolution.",
};

// Блог (E-E-A-T, SEO-кластеры F/I)
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  faq: { q: string; a: string }[];
};
export const blogPosts: BlogPost[] = [
  {
    slug: "kak-vybrat-karaoke-dlya-bara",
    title: "Как выбрать караоке для бара",
    excerpt: "Площадь зала, мощность акустики, число микрофонов и база песен — на что смотреть при выборе.",
    body: [
      "Караоке в баре — источник выручки и удержания гостей. Выбор системы зависит от площади зала, уровня шума и того, кто управляет музыкой — бармен или гости.",
      "Ключевые параметры: мощность акустики под площадь, количество беспроводных микрофонов, удобство пульта и размер базы песен. Для зала до 80 м² обычно достаточно комплекта на базе AST-350.",
      "Не экономьте на проекте звука и монтаже: ровное звучание по всему залу важнее максимальной громкости. Профессиональная настройка под помещение убирает гул и заводки микрофонов.",
    ],
    faq: [
      { q: "Сколько микрофонов нужно для бара?", a: "Обычно 2–4 беспроводных микрофона — чтобы пел стол, а не очередь по одному." },
      { q: "На какую площадь рассчитан AST-350?", a: "Комплект на базе AST-350 обычно покрывает до 80–100 м²." },
    ],
  },
  {
    slug: "skolko-stoit-osnastit-karaoke-klub",
    title: "Сколько стоит оснастить караоке-клуб под ключ",
    excerpt: "Ориентиры по бюджету по площади и что входит в оснащение под ключ в Казахстане.",
    body: [
      "Стоимость зависит от площади, выбранной системы и состава оборудования (акустика, свет, микшер). Под ключ — это не только техника, но и проект, монтаж, настройка и обучение.",
      "Ориентир по Казахстану: до 50 м² — от 1,2 млн ₸, до 80 м² — от 2,1 млн ₸, от 100 м² — от 2,8 млн ₸. Точная смета считается по помещению.",
      "Окупаемость клуба достигается за счёт почасовой аренды залов и среднего чека; качественный звук напрямую влияет на возвраты гостей.",
    ],
    faq: [
      { q: "Что входит в оснащение под ключ?", a: "Проект звука под помещение, монтаж, настройка, обучение персонала, гарантия и обновление песен." },
      { q: "Можно ли в рассрочку?", a: "Да, через Kaspi 0-0-12 для систем, доступных в рассрочку." },
    ],
  },
  {
    slug: "ast-ili-evolution",
    title: "AST или Studio Evolution — что лучше для заведения",
    excerpt: "Сравниваем два ведущих бренда караоке по моделям, сценариям и сервису.",
    body: [
      "Оба бренда — лидеры рынка караоке в Казахстане. AST силён модельной линейкой под разные площади (Mini, AST-50/250/350) и сервисом под ключ. Studio Evolution (Evobox) — современный медиаплеер с удобным интерфейсом.",
      "Для дома и небольших кафе подойдёт AST Mini или Evobox. Для баров и клубов — AST-250/350 или Evobox Plus / Pro2.",
      "Выбор чаще решает не бренд, а правильный подбор под площадь и качество монтажа. Мы работаем с обоими брендами и подбираем под задачу.",
    ],
    faq: [
      { q: "Какой бренд надёжнее?", a: "Оба надёжны при официальной поставке и правильной настройке; ключевое — сервис и гарантия." },
    ],
  },
];

export const blogMeta: Landing = {
  slug: "blog",
  h1: "Блог о караоке-оборудовании",
  title: "Блог о караоке-оборудовании",
  description: "Гайды по выбору и оснащению караоке: для дома, бара, клуба. Сравнения брендов и расчёты.",
};

export function allPaths(): string[] {
  return [
    "/",
    "/" + catalogMeta.slug,
    "/" + podKlyuchMeta.slug,
    "/" + komplektyIndexMeta.slug,
    "/pesni",
    "/keysy",
    "/blog",
    ...scenarios.map((s) => `/karaoke/${s.slug}`),
    ...bundles.map((b) => `/komplekty/${b.slug}`),
    ...brands.map((b) => `/brand/${b.slug}`),
    ...products.map((p) => `/product/${p.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...staticPages.map((p) => `/${p.slug}`),
  ];
}
