# Dev How-To — фронтенд karaokeshop

> Для разработчика, который входит в проект. Команды, паттерны, частые задачи.
> Правила для AI-агентов — в [`CLAUDE.md`](../CLAUDE.md).

---

## Быстрый старт

```bash
cd ~/Desktop/karaokeshop
npm install          # установить зависимости всего монорепо
npm run dev -w web   # Next.js dev server → http://localhost:3000
```

Storybook (UI-кит):
```bash
npm run storybook -w @kk/ui   # → http://localhost:6006
```

---

## Сборка и проверка

```bash
npm run build -w web     # статическая сборка → apps/web/out/
npm test -w web          # Vitest (10 тестов: calculator + seo)
npm test -w @kk/ui       # Vitest (2 теста: Button)
```

Локальный просмотр собранной статики (≠ `next start`):
```bash
npx serve apps/web/out
```

> ⚠️ `next start` не работает с `output: "export"`. Только `npx serve`.

---

## Структура проекта

```
apps/web/src/
├── app/                   — роуты (Next.js App Router)
│   ├── page.tsx           — главная /
│   ├── catalog/page.tsx   — /catalog
│   ├── product/[slug]/    — /product/<slug>
│   ├── karaoke/[scenario] — /karaoke/dlya-doma и т.д.
│   ├── komplekty/[area]   — /komplekty/do-80 и т.д.
│   ├── brand/[slug]/      — /brand/ast и т.д.
│   ├── blog/[slug]/       — /blog/<slug>
│   ├── (pages)/[page]/    — catch-all для staticPages (servis и т.д.)
│   ├── sitemap.ts         — генерируется из allPaths()
│   └── robots.ts
├── components/            — React-компоненты сайта
├── lib/
│   ├── site.ts            — ВСЕ данные (товары, бренды, блог, кейсы, …)
│   ├── components.ts      — цены для калькулятора сметы
│   ├── seo.ts             — JSON-LD утилиты
│   ├── calculator.ts      — логика подбора оборудования
│   ├── cart.tsx           — Zustand-корзина (localStorage)
│   └── compare.tsx        — Zustand-сравнение
packages/
├── tokens/                — @kk/tokens: дизайн-токены → css/tokens.css
└── ui/                    — @kk/ui: Button, Badge + Storybook
```

---

## Добавить новый роут

1. Создать `apps/web/src/app/<path>/page.tsx`.
2. Добавить `export async function generateMetadata()` с title/description (из [url-map.md](strategy/url-map.md)).
3. Если страница динамическая (`[slug]`) — добавить `export function generateStaticParams()`.
4. Добавить путь в `allPaths()` в `site.ts` → попадёт в sitemap.
5. Проверить: `npm run build -w web` чисто.

---

## Добавить/изменить товар

Файл: `apps/web/src/lib/site.ts`, массив `products`.

```ts
{
  slug: "новый-слаг",          // уникальный, URL-safe
  type: "sistema",              // ProductType
  model: "Модель X",
  brand: "AST",
  price: 500000,
  inStock: true,
  image: "https://...",         // временно Unsplash; потом /products/<slug>.jpg
  scenario: "bar",
  areaMax: 80,
  songsCount: 60000,
  kit: ["Система", "ПО", "Пульт"],
  rating: 4.8, reviewsCount: 5,
}
```

После добавления: `generateStaticParams` в `product/[slug]/page.tsx` подберёт новый slug автоматически.

---

## Добавить пост в блог

Файл: `apps/web/src/lib/site.ts`, массив `blogPosts`.

Обязательные поля: `slug`, `title`, `description`, `date`, `readingTime`, `cluster`, `body` (HTML-строка).
Опционально: `faq: [{q, a}]` — для FAQPage JSON-LD.

---

## Изменить цены в калькуляторе

Файл: `apps/web/src/lib/components.ts`.
Массивы `baseSystems`, `acoustics`, `comps`. Цены оценочные (поставщик прайс не публикует).

---

## Токены и стили

Токены: `packages/tokens/tokens.json` → `packages/tokens/css/tokens.css`.
Пересборка: `npm run build -w @kk/tokens`.

В Tailwind и компонентах использовать CSS-переменные через токены. Не хардкодить цвета напрямую.

---

## SEO-паттерны

Каждая страница — `generateMetadata()`:
```ts
export async function generateMetadata({ params }) {
  return {
    title: "...",
    description: "...",
    openGraph: { ... },
  };
}
```

JSON-LD — через утилиты из `src/lib/seo.ts` (`productJsonLd`, `organizationJsonLd` и т.д.).
Проверить тестами: `npm test -w web`.

---

## Git и деплой

```bash
# коммит (только karaokeshop):
git -C ~/Desktop/karaokeshop add <файлы>
git -C ~/Desktop/karaokeshop commit -m "feat: ..."

# пуш → авто-деплой на Cloudflare (~1–2 мин):
git -C ~/Desktop/karaokeshop push origin main
```

Автор коммита: `airginggger-collab <airg.inggger@gmail.com>` (уже в local git config репо).
Live: https://karaokeshop.airg-inggger.workers.dev/

---

## Известные ловушки

1. `next start` не работает с `output: export` → `npx serve apps/web/out`.
2. Bash между вызовами сбрасывает cwd на medlog → всегда `git -C ~/Desktop/karaokeshop`.
3. `/sravnit` есть как роут, но не в `allPaths()` → не в sitemap (хвост).
4. Цены в `components.ts` и `site.ts` — оценочные, не из прайса поставщика.
5. Фото товаров — Unsplash-заглушки, заменить на `/products/<slug>.jpg`.
6. `storybook-static/` gitignored, не коммить. Пересборка: `npm run build-storybook -w @kk/ui`.
