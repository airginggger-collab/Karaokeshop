export const siteConfig = {
  name: "karaokeshop",
  url: "https://www.karaokeshop.kz",
  city: "Алматы",
  defaultTitle: "Караоке под ключ в Казахстане — для дома и заведений",
  defaultDescription:
    "Караоке-системы AST и Studio Evolution. Продажа, монтаж, рассрочка Kaspi. Оснащение баров и клубов под ключ. Алматы, с 2012.",
} as const;

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  cluster?: string;
};

// Источник истины для мета-данных лендингов (из docs/strategy/url-map.md).
export const routeMeta = {
  "/karaoke/dlya-doma": {
    path: "/karaoke/dlya-doma",
    title: "Караоке для дома — купить домашнюю систему, Алматы",
    description:
      "Домашние караоке-системы от 415 000 ₸. Рассрочка Kaspi 0-0-12, доставка, гарантия. Подбор по бюджету.",
    cluster: "A",
  },
  "/karaoke/dlya-bara": {
    path: "/karaoke/dlya-bara",
    title: "Караоке для бара — оборудование под ключ, Алматы",
    description:
      "Профессиональные караоке-системы для бара. Проект звука, монтаж, обучение. Расчёт по площади зала.",
    cluster: "B",
  },
  "/pod-klyuch": {
    path: "/pod-klyuch",
    title: "Оснащение караоке под ключ — проект, монтаж, обучение",
    description:
      "Спроектируем звук под помещение, смонтируем, обучим персонал. Один договор. Расчёт по площади.",
    cluster: "C",
  },
  "/catalog": {
    path: "/catalog",
    title: "Каталог караоке-систем и оборудования",
    description:
      "Караоке-системы, акустика, микрофоны, свет. Фильтр по сценарию, бренду и площади. Рассрочка Kaspi.",
  },
} satisfies Record<string, RouteMeta>;
