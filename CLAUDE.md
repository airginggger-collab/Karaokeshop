# CLAUDE.md — гайд для AI-агентов в репо Karaokeshop

> Каноничные правила для Claude / Cursor / Copilot. Прочитай целиком, потом загляни в [`docs/HANDOFF.md`](docs/HANDOFF.md) (снимок состояния) и [`docs/README.md`](docs/README.md) (индекс).

## TL;DR

Karaokeshop.kz — ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST + Studio Evolution). **Монорепо Turborepo + npm workspaces.** Сайт — Next.js 15 (App Router, `output: "export"` — чистая статика), захостен на Cloudflare как assets-only Worker. Контент пока захардкожен в `apps/web/src/lib/site.ts` (CMS не подключена). SEO — главный приоритет проекта.

- Стек: Next.js ^15.1.2 · React ^19 · TypeScript ^5.6.3 strict · Turborepo ^2.3.3 · Tailwind ^3.4.17 на токенах · Style Dictionary ^4.3.0 · Storybook ^8.4.7 · Vitest ^2.1.8 · lucide-react. Шрифты Manrope + Unbounded (`next/font/google`).
- Структура: `apps/web` (сайт), `packages/tokens` (`@kk/tokens`), `packages/ui` (`@kk/ui`), `docs/` (контекст-пак).

## ⚠️ Это ОТДЕЛЬНЫЙ проект

- Локально: `~/Desktop/karaokeshop`. Сессии часто стартуют из каталога **medlog** — **не перепутай**. Был случай ошибочного коммита в medlog.
- Bash сбрасывает cwd между вызовами → работай с git через `git -C ~/Desktop/karaokeshop …`.

## Структура монорепо и правила импортов

```
apps/web/             — Next.js сайт (App Router)
  src/app/            — роуты по URL-карте (docs/strategy/url-map.md)
  src/components/     — React-компоненты сайта
  src/lib/            — site.ts (контент), components.ts (калькулятор), seo.ts, calculator.ts, cart/compare
packages/tokens/      — @kk/tokens: tokens.json → css/tokens.css (Style Dictionary)
packages/ui/          — @kk/ui: Button, Badge + Storybook + Vitest
```

1. **Пакеты не лезут во внутренности друг друга.** Импорт переиспользуемого UI — только через barrel `@kk/ui` (его `exports` → `src/index.ts`), токенов — через `@kk/tokens/tokens.css`. Не импортируй из `@kk/ui/src/Button` напрямую.
2. **Сайт host-agnostic.** Никакого Vercel-only лок-ина: переезд на Vercel Pro должен быть сменой таргета деплоя, а не рефакторингом (см. [ADR-0002](docs/adr/0002-hosting.md)).
3. **No backend / статика.** `next.config.mjs` → `output: "export"`. Серверных рантаймов, API-роутов, ISR, Image Optimization нет (`images.unoptimized = true`). Если задача требует SSR/CMS — это переход на «вариант B» (адаптер `@opennextjs/cloudflare`), поднимай флаг, не вводи молча.
4. **Дизайн — через токены.** Цвета/радиусы — из `@kk/tokens` (Tailwind настроен на них). Не хардкодь HEX в компонентах. Единый источник токенов — `packages/tokens/tokens.json`; Figma синхронизируется от него, а не наоборот.
5. **SEO — позвоночник.** URL и мета проектируются от семантического ядра ([url-map.md](docs/strategy/url-map.md)). JSON-LD/sitemap/robots — в `apps/web/src/lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`. Не ломай canonical-дисциплину и hreflang-структуру.

## Где контент и данные (для правок)

- `apps/web/src/lib/site.ts` — товары (18 шт), бренды, блог, кейсы, песни, лендинги, `siteConfig` (телефон/адрес/почта/`url`).
- `apps/web/src/lib/components.ts` — цены оборудования в калькуляторе сметы.
- `apps/web/public/products/` — фото товаров (поле `image` у товара).
- Инструкция для владельца (правка через браузер, без кода): [docs/redaktirovanie-sajta.md](docs/redaktirovanie-sajta.md).

## Команды

```bash
npm install                  # установить монорепо
npm run dev                  # turbo run dev
npm run build                # turbo run build (web → apps/web/out)
npm run lint                 # turbo run lint
npm run test                 # turbo run test
npm run tokens               # пересобрать @kk/tokens

npm run build -w web         # сборка сайта → apps/web/out (статика)
npm test -w web              # тесты web (Vitest): 10
npm test -w @kk/ui           # тесты UI-кита: 2
npm run storybook -w @kk/ui  # Storybook на :6006
```

Проверка изменений: `npm run build -w web` + `npm test -w web`. После пуша — `curl` живого URL (превью-MCP привязан к medlog, не к этому проекту).

## Git и деплой

- **Repo:** github.com/airginggger-collab/Karaokeshop (заглавная **K**) · ветка `main` · push по **SSH** (ключ `~/.ssh/id_ed25519`).
- **Автор коммитов:** `airginggger-collab <airg.inggger@gmail.com>` — задан в local git config репо, отдельный `-c` обычно не нужен. `gh` CLI в фоне может быть не авторизован.
- Формат коммитов: `<type>(scope?): <subject>` — `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- **Деплой:** Cloudflare assets-only Worker через `wrangler.toml`. `out/` в `.gitignore`. CI (`.github/workflows/ci.yml`) автоматически деплоит после успешного `push` в `main` — шаг `npx wrangler deploy` с секретом `CLOUDFLARE_API_TOKEN`. PR-ветки деплой не триггерят. Подробно — [docs/deploy.md](docs/deploy.md).
- **Live:** https://karaokeshop.airg-inggger.workers.dev/ · продакшен-canonical в `siteConfig.url` — `https://www.karaokeshop.kz` (кастомный домен ещё не привязан).

## CI / Lighthouse

`.github/workflows/ci.yml` (push в `main`/`master` + PR): сборка токенов → тесты `@kk/ui` → тесты web → сборка web → сборка Storybook; отдельным джобом **Lighthouse CI** с бюджетом Core Web Vitals (`lighthouserc.json`: performance ≥ 0.9, SEO ≥ 0.95, LCP ≤ 2.5s, CLS ≤ 0.1). Деградация скорости валит CI — это привязано к SEO-цели. Регрессией скорости PR не мерджим.

## Ловушки

1. **`next start` не работает с `output: export`.** Для локального просмотра — `npx serve apps/web/out`, не `next start`.
2. **HEX-палитра PDF / токены.** Цвета — только через токены `@kk/tokens`; не хардкодь.
3. **`docs/deploy.md` исторически писался под Cloudflare Pages (Connect-to-Git).** Реальный продакшен — assets-only **Worker** через `wrangler.toml`, URL `*.workers.dev`. Опирайся на `wrangler.toml`, не на «вариант Pages-дашборда».
4. **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры). Цены оценочные (поставщик их скрывает); фото товаров — демо (Unsplash), временные. Заменить по счёту/реальным фото.
5. **`_local-assets/` — gitignored локальная свалка** (скриншоты и т.п.). Не ре-трекай. `.gitignore` также блокирует stray-бинарники в корне (`/*.png`, `/*.jpg`, `/*.jpeg`, `/*.pdf`).
6. **`packages/ui/storybook-static/` — gitignored** (`packages/ui/.gitignore`). В git не попадает; пересобирается `npm run build-storybook -w @kk/ui`.

## UI-конвенции (обязательные)

### Хлебные крошки (Breadcrumb)

**Каждая страница кроме главной (`/`) обязана иметь хлебные крошки.**

Компонент: `src/components/Breadcrumb.tsx`, пропс `items: { label: string; href?: string }[]`.
Всегда начинается с «Главная» (захардкожено внутри компонента) — в `items` её не передавай.

```tsx
import { Breadcrumb } from "@/components/Breadcrumb";
// Одноуровневая:
<Breadcrumb items={[{ label: "Контакты" }]} />
// Двухуровневая (каталог → товар):
<Breadcrumb items={[{ label: "Каталог", href: "/catalog" }, { label: p.model }]} />
```

Размещай **первым элементом** внутри `<Container>`, до `<h1>`. Не заменяй самодельным `flex gap-2`.

### Рассрочка / Kaspi

Рассрочка Kaspi **удалена полностью** — не упоминать в UI, metadata, CTA. Заказ → WhatsApp (`siteConfig.whatsapp`).

## Правило: КОММИТ + ПУШ + ДОКИ — всегда в одном коммите

**Никогда не коммитить код без обновления `docs/HANDOFF.md` в том же коммите.** Никогда не коммитить без немедленного `git push origin main`.

Три шага всегда идут вместе — нельзя пропустить ни один:
1. **Коммит** (`git -C ~/Desktop/karaokeshop commit`) — с обновлённым `docs/HANDOFF.md`
2. **Пуш** (`git push origin main`) — сразу после коммита, не позже
3. **Доки** (`docs/HANDOFF.md`) — в том же коммите что и код, не follow-up'ом

| Что изменилось | Что обновить |
|---|---|
| Любой код / компонент | `docs/HANDOFF.md` — раздел «Последняя сессия» |
| Новый роут / страница | `docs/HANDOFF.md` + `apps/web/src/app/sitemap.ts` |
| Дизайн / токены / тема | `docs/HANDOFF.md` |
| Стек / зависимости / конфиг | `CLAUDE.md` + `docs/HANDOFF.md` |

## Чеклист перед коммитом

- [ ] `npm run build -w web` — собирается чисто (статика в `apps/web/out`)
- [ ] `npm test -w web` и `npm test -w @kk/ui` — зелёные
- [ ] **`docs/HANDOFF.md` обновлён** в этом же коммите
- [ ] Если новый роут — добавлен по [url-map.md](docs/strategy/url-map.md) с `generateMetadata` (title/description), есть в sitemap, **есть `<Breadcrumb>`**
- [ ] Если изменена модель данных — [docs/context/data-model.md](docs/context/data-model.md) обновлён
- [ ] Если изменён контент для владельца — сверено с [docs/redaktirovanie-sajta.md](docs/redaktirovanie-sajta.md)
- [ ] Коммит-автор — `airginggger-collab <airg.inggger@gmail.com>`, push по SSH в `main` **сразу**

## Ссылки

- Прод: https://karaokeshop.airg-inggger.workers.dev/
- Repo: https://github.com/airginggger-collab/Karaokeshop
- Индекс docs: [docs/README.md](docs/README.md) · Снимок состояния: [docs/HANDOFF.md](docs/HANDOFF.md)
