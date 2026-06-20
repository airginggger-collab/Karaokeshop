# karaokeshop.kz — ребилд интернет-магазина

> **🟢 Live:** https://karaokeshop.airg-inggger.workers.dev/ · авто-деплой на каждый push в `main`.

Полный ребилд интернет-магазина караоке-оборудования (Алматы; бренды **AST** и **Studio Evolution**). Цели: B2C-продажи + B2B-лиды (оснащение под ключ) + бренд + **SEO-приоритет**. Архитектура — единая витрина с сегментацией по намерению + выделенная B2B-воронка «под ключ» (модель B).

Сейчас сайт собран статикой (Next.js `output: "export"`) и захостен на Cloudflare. Контент захардкожен в `apps/web/src/lib/site.ts`; CMS пока не подключена (см. [ADR-0001](docs/adr/0001-cms.md)).

> 📚 **Вся стратегия, контекст и решения — в [`docs/`](docs/README.md).** Это единый источник правды. Начинай оттуда.
> 🤖 Правила для AI-ассистентов — в [`CLAUDE.md`](CLAUDE.md).

## Структура (монорепо Turborepo + npm workspaces)

```
apps/
└── web/              — сайт (Next.js 15, App Router, output: "export")
packages/
├── tokens/  @kk/tokens — дизайн-токены (Style Dictionary → css/tokens.css)
└── ui/      @kk/ui     — UI-кит (Button, Badge) + Storybook + Vitest
docs/                 — стратегия, ADR, контекст, планы, исследования
```

Workspaces объявлены в корневом `package.json` (`apps/*`, `packages/*`). `apps/web` зависит от `@kk/tokens` и `@kk/ui` (workspace-пакеты `*`).

## Стек (реальные версии из package.json)

- **Next.js** ^15.1.2 (App Router, `output: "export"` — чистая статика) · **React** ^19.0.0
- **TypeScript** ^5.6.3 (strict, `tsconfig.base.json`) · **Turborepo** ^2.3.3 · npm 10.9.2
- **Tailwind** ^3.4.17 на дизайн-токенах · **Style Dictionary** ^4.3.0 (`@kk/tokens`)
- **Storybook** ^8.4.7 + **Vitest** ^2.1.8 (`@kk/ui`, web) · **lucide-react** ^0.468.0
- Шрифты: **Manrope** (sans) + **Unbounded** (display) через `next/font/google`
- CI: GitHub Actions + **Lighthouse CI** (бюджет Core Web Vitals, `lighthouserc.json`)

## Установка и команды

```bash
npm install                     # установить весь монорепо

# из корня (turbo прогоняет по всем workspace):
npm run dev                     # turbo run dev   — dev-серверы
npm run build                   # turbo run build — сборка (web → apps/web/out)
npm run lint                    # turbo run lint
npm run test                    # turbo run test
npm run tokens                  # пересобрать дизайн-токены (@kk/tokens)

# точечно по одному workspace:
npm run build -w web            # сборка сайта → apps/web/out (статика)
npm test -w web                 # тесты web (Vitest): 10
npm test -w @kk/ui              # тесты UI-кита: 2
npm run storybook -w @kk/ui     # Storybook на :6006
npm run build -w @kk/tokens     # токены → packages/tokens/css/tokens.css
```

> `next start` НЕ работает с `output: "export"`. Для локального просмотра статики — `npx serve apps/web/out`.

## Деплой — Cloudflare (₸0)

Сайт полностью SSG → `output: "export"` собирает статику в `apps/web/out`. Cloudflare отдаёт её как **assets-only Worker** (`wrangler.toml` → `directory = "./apps/web/out"`, `not_found_handling = "404-page"`). Авто-деплой на каждый push в `main` (~1–2 мин). Бесплатно, коммерция разрешена, безлимит-трафик.

Подробно (включая подключение и кастомный домен) — [docs/deploy.md](docs/deploy.md) · обоснование — [ADR-0002](docs/adr/0002-hosting.md).

## Документация

| Раздел | Что внутри |
|---|---|
| [docs/README.md](docs/README.md) | Индекс-карта всей документации |
| [docs/HANDOFF.md](docs/HANDOFF.md) | Снимок состояния — быстрый вход в проект |
| [docs/strategy/](docs/strategy/) | Стратегия редизайна, семантическое ядро, карта URL, бюджет |
| [docs/adr/](docs/adr/) | Architecture Decision Records (CMS, хостинг) |
| [docs/context/](docs/context/) | Модель данных, контракты для разработчиков |
| [docs/plans/](docs/plans/) | План Фазы 0–1 |
| [docs/research/](docs/research/) | Конкурентный SEO-аудит, рыночные данные |
| [docs/design/](docs/design/) | Прототипы, дизайн-система |
| [docs/client/](docs/client/) | Бриф заказчику |
| [docs/redaktirovanie-sajta.md](docs/redaktirovanie-sajta.md) | Как править сайт вручную (для владельца, через браузер) |

## Git

- **Repo:** github.com/airginggger-collab/Karaokeshop · ветка `main` · push по **SSH**.
- **Автор коммитов:** `airginggger-collab <airg.inggger@gmail.com>` (задан в local git config репо).
- Работай через `git -C ~/Desktop/karaokeshop …` — это **отдельный проект**, не путать с другими репозиториями на машине.
