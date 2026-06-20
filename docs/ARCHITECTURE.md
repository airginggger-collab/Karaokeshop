# Architecture — karaokeshop.kz

> Единый обзор для разработчика. Факты из кода, не из планов.
> Детали — в [`docs/`](README.md): ADR, стратегия, контракты, dev-howto.

---

## В одном абзаце

Статический SPA-сайт (Next.js `output: "export"`) с 45 страницами, захостенный как assets-only Cloudflare Worker. Контент захардкожен в TypeScript (`site.ts`). Нет бэкенда, нет API, нет базы данных — всё собирается в HTML/JS/CSS при деплое и отдаётся с CDN.

---

## Монорепо (Turborepo + npm workspaces)

```
karaokeshop/
├── apps/
│   └── web/               Next.js 15 сайт (App Router, output: export)
├── packages/
│   ├── tokens/  @kk/tokens   дизайн-токены → css/tokens.css
│   └── ui/      @kk/ui       Button, Badge + Storybook + Vitest
├── docs/                  вся документация и контекст
├── wrangler.toml          Cloudflare Worker (деплой)
├── turbo.json             pipeline сборки
└── package.json           workspace root
```

---

## Слои приложения

```
┌─────────────────────────────────────────────┐
│              Cloudflare CDN                  │  ← отдаёт статику
├─────────────────────────────────────────────┤
│           apps/web/out/  (артефакт)          │  ← HTML + JS + CSS
├─────────────────────────────────────────────┤
│         Next.js App Router (SSG)             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │  app/        │  │  components/         │ │
│  │  (роуты)     │  │  (React-компоненты)  │ │
│  └──────┬───────┘  └──────────────────────┘ │
│         │                                    │
│  ┌──────▼───────────────────────────────┐   │
│  │           lib/                        │   │
│  │  site.ts       — контент (данные)    │   │
│  │  components.ts — калькулятор         │   │
│  │  seo.ts        — JSON-LD утилиты     │   │
│  │  calculator.ts — логика подбора      │   │
│  │  cart.tsx      — корзина (Zustand)   │   │
│  │  compare.tsx   — сравнение (Zustand) │   │
│  └───────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  packages/tokens   packages/ui               │
└─────────────────────────────────────────────┘
```

---

## Роутинг (45 статических страниц)

| Паттерн | Пример | Кол-во |
|---|---|---|
| `/` | главная | 1 |
| `/karaoke/[scenario]` | `/karaoke/dlya-bara` | 5 |
| `/komplekty`, `/komplekty/[area]` | `/komplekty/do-80` | 5 |
| `/brand/[slug]` | `/brand/ast` | 2 |
| `/product/[slug]` | `/product/ast-250` | 18 |
| `/blog`, `/blog/[slug]` | `/blog/kak-vybrat...` | 4 |
| Статика | `/catalog`, `/pod-klyuch`, `/kalkulyator`, `/sravnit`, `/sravnenie`, `/pesni`, `/keysy`, `/o-nas`, `/kontakty`, `/servis` | 10 |

Все URL — в `allPaths()` (`site.ts`) → `sitemap.xml`. Роуты — в `apps/web/src/app/`.

---

## Данные и контент

**Единый источник:** `apps/web/src/lib/site.ts`

- 18 товаров (`products[]`), 5 сценарных лендингов, 4 комплекта по площади
- 2 бренда, 3 кейса, 3 поста блога, ~20 песен
- `siteConfig` — телефон, WhatsApp, адрес, email

Калькулятор смет — `apps/web/src/lib/components.ts` (отдельно, цены оценочные).

**Нет CMS.** Контент правится через GitHub в браузере (инструкция: [`docs/redaktirovanie-sajta.md`](redaktirovanie-sajta.md)). Планируется Sanity (ADR-0001, Фаза 2).

---

## Состояние на клиенте

| Что | Где | Хранение |
|---|---|---|
| Корзина | `lib/cart.tsx` | Zustand + localStorage |
| Сравнение товаров | `lib/compare.tsx` | Zustand + localStorage |

Серверного состояния нет. Нет авторизации. Нет БД.

---

## Лиды (заявки клиентов)

Сейчас — WhatsApp deep link (`wa.me/77075799995?text=...`). Текстовая строка формируется на клиенте в `CalculatorClient` и `AreaCalculator`.

Нет формы с серверной обработкой. Детали и план → [`docs/context/api-contracts/leads.md`](context/api-contracts/leads.md).

---

## Деплой

```
git push origin main
       │
       ▼
Cloudflare (авто, ~1–2 мин)
       │
npm run build -w @kk/tokens
npm run build -w web
       │
       ▼
apps/web/out/  →  Worker (wrangler.toml)
       │
       ▼
https://karaokeshop.airg-inggger.workers.dev/
```

Конфиг: `wrangler.toml`. Не Cloudflare Pages — Worker с `[assets]`. Детали → [ADR-0002](adr/0002-hosting.md).

---

## SEO

- `generateMetadata()` на каждой странице (title, description, OG)
- JSON-LD: `Product`, `Organization`, `FAQPage`, `BlogPosting` — через `lib/seo.ts`
- `sitemap.xml` и `robots.txt` — Next.js генерирует при сборке
- hreflang структура заложена (KZ-контент — Фаза 3)
- Тесты: `src/lib/seo.test.ts` (3 теста)

---

## Дизайн-система

Токены: `packages/tokens/tokens.json` → Style Dictionary → `packages/tokens/css/tokens.css`.
UI-кит: `packages/ui` (`@kk/ui`) — Button, Badge + Storybook.
Шрифты: Manrope (текст) + Unbounded (заголовки) через `next/font/google`.
Тёмная тема: CSS-переменные, переключатель `ThemeToggle`.

---

## Что дальше (дорожная карта)

| Фаза | Что | Блокер |
|---|---|---|
| Сейчас | Кастомный домен `new.karaokeshop.kz` | DNS-доступ заказчика |
| Сейчас | Реальные цены и фото товаров | Прайс и фото от заказчика |
| Фаза 2 | Sanity CMS (ADR-0001 принят) | — |
| Фаза 2 | Аналитика (GA4, Яндекс.Метрика) | Аккаунты заказчика |
| Фаза 3 | Серверная обработка лидов (форма → email/CRM) | Переход на SSR |
| Фаза 3 | i18n KZ-версия | Контент от заказчика |
