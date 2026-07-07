# CLAUDE.md — гайд для AI-агентов в репо Karaokeshop

> Каноничные правила для Claude / Cursor / Copilot. Прочитай целиком, потом загляни в [`docs/HANDOFF.md`](docs/HANDOFF.md) (снимок состояния) и [`docs/README.md`](docs/README.md) (индекс).

## TL;DR

Karaokeshop.kz — ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST + Studio Evolution). **Монорепо Turborepo + npm workspaces.** Сайт — Next.js 15 (App Router, `output: "export"` — чистая статика), захостен на Cloudflare как assets-only Worker. Контент пока захардкожен в `apps/web/src/lib/site.ts` (CMS не подключена). SEO — главный приоритет проекта.

- Стек: Next.js ^15.1.2 · React ^19 · TypeScript ^5.6.3 strict · Turborepo ^2.3.3 · Tailwind ^3.4.17 на токенах · Style Dictionary ^4.3.0 · Storybook ^8.4.7 · Vitest ^2.1.8 · lucide-react. Шрифты Manrope + Onest (`next/font/google`; Onest — заголовки, заменил Unbounded 2026-07-07).
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
packages/tokens/      — @kk/tokens: css/theme.css (ЦВЕТА: light/.dark/.mood-*) + tokens.json → css/tokens.css (радиусы, Style Dictionary)
packages/ui/          — @kk/ui: Button, Badge + Storybook + Vitest
```

1. **Пакеты не лезут во внутренности друг друга.** Импорт переиспользуемого UI — только через barrel `@kk/ui` (его `exports` → `src/index.ts`), токенов — через `@kk/tokens/tokens.css` (радиусы) и `@kk/tokens/theme.css` (цвета). Не импортируй из `@kk/ui/src/Button` напрямую.
2. **Сайт host-agnostic.** Никакого Vercel-only лок-ина: переезд на Vercel Pro должен быть сменой таргета деплоя, а не рефакторингом (см. [ADR-0002](docs/adr/0002-hosting.md)).
3. **No backend / статика.** `next.config.mjs` → `output: "export"`. Серверных рантаймов, API-роутов, ISR, Image Optimization нет (`images.unoptimized = true`). Если задача требует SSR/CMS — это переход на «вариант B» (адаптер `@opennextjs/cloudflare`), поднимай флаг, не вводи молча.
4. **Дизайн — через токены. Один источник на каждый вид токена (не дублировать!).**
   - **Цвета** (`--color-*`, `--warm-*`, `--night-*`, light/`.dark`/`.mood-*`) — ТОЛЬКО `packages/tokens/css/theme.css`. Импортится и приложением, и Storybook. НЕ дублировать в `globals.css` и НЕ класть в `tokens.json` — иначе вернётся баг «правлю цвет, ничего не меняется» (был дубль tokens.css↔globals.css, globals молча перебивал).
   - **Радиусы** — `tokens.json` → `css/tokens.css` (Style Dictionary).
   - Tailwind-утилиты замаплены на `var(--color-*)`. Темизируемый текст — `text-foreground`/`text-muted-foreground`, НЕ хардкод `text-[#…]`. `globals.css` — только Tailwind-слои, база страницы и тени карточек.
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
npm test -w web              # тесты web (Vitest): 19 (calculator 12 + seo 3 + quiz 4)
npm test -w @kk/ui           # тесты UI-кита: 2
npm run storybook -w @kk/ui  # Storybook на :6006
```

Проверка изменений: `npm run build -w web` + `npm test -w web`. После пуша — `curl` живого URL (превью-MCP привязан к medlog, не к этому проекту).

## Git и деплой

- **Repo:** github.com/airginggger-collab/Karaokeshop (заглавная **K**) · ветка `main` · push по **SSH** (ключ `~/.ssh/id_ed25519`).
- **Автор коммитов:** `airginggger-collab <airg.inggger@gmail.com>` — задан в local git config репо, отдельный `-c` обычно не нужен. `gh` CLI в фоне может быть не авторизован.
- Формат коммитов: `<type>(scope?): <subject>` — `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- **Деплой:** Cloudflare assets-only Worker через `wrangler.toml`. `out/` в `.gitignore`. CI (`.github/workflows/ci.yml`) автоматически деплоит после успешного `push` в `main` — шаг `npx wrangler deploy` с секретом `CLOUDFLARE_API_TOKEN`. PR-ветки деплой не триггерят. Подробно — [docs/deploy.md](docs/deploy.md).
- **Live (боевой прод):** https://karaokeshop.airg-inggger.workers.dev/ — = HEAD `main`, проверять надо ИМЕННО его. ⚠️ Бренд-домен `karaokeshop.kz` ещё **НЕ привязан** и отдаёт **старый сайт на Wix** (DNS не переведён на Cloudflare). При этом `siteConfig.url` = `https://www.karaokeshop.kz` → canonical/`og:url`/`og:image` ведут на чужой Wix = **SEO-риск до привязки домена** (см. ловушку 7 и [docs/deploy.md](docs/deploy.md)).

## CI / Lighthouse

`.github/workflows/ci.yml` (push в `main`/`master` + PR): сборка токенов → тесты `@kk/ui` → тесты web → сборка web → сборка Storybook → **деплой** (`wrangler deploy`, только push в `main`); отдельным джобом **Lighthouse CI** (`lighthouserc.json`). Деплой в джобе `build-test` и **не зависит** от Lighthouse — красный Lighthouse НЕ блокирует деплой. Бюджет: performance `warn` (≥0.9, не валит CI — иначе каждый пуш горел красным и казалось «не задеплоилось»), SEO `error` ≥0.95, LCP/CLS/TBT `warn`. Перф чинить (next/image, JS) — отдельная задача, не блокером.

## Ловушки

0. **`apps/web/public/_redirects` — ТОЛЬКО относительные URL, и всегда проверяй CI-деплой после пуша.** Cloudflare Workers Static Assets валидирует `_redirects` на шаге `wrangler deploy` (не при `next build`): абсолютный URL (с хостом) → `Only relative URLs are allowed` → **деплой падает, а прод молча застревает на прошлой версии**. Так и случилось 2026-07-02 (правило www-канонизации). Защита: `postbuild`-хук `scripts/check-redirects.mjs` роняет **локальную сборку** на абсолютных URL. Хост-канонизацию (www) делать через **Cloudflare Redirect Rules** (дашборд), не в `_redirects`. **Правило: после каждого push в `main` проверяй `gh run list` — деплой мог упасть, локальный build это не покажет.**
1. **`next start` не работает с `output: export`.** Для локального просмотра — `npx serve apps/web/out`, не `next start`.
2. **HEX-палитра PDF / токены.** Цвета — только через токены `@kk/tokens`; не хардкодь.
3. **`docs/deploy.md` исторически писался под Cloudflare Pages (Connect-to-Git).** Реальный продакшен — assets-only **Worker** через `wrangler.toml`, URL `*.workers.dev`. Опирайся на `wrangler.toml`, не на «вариант Pages-дашборда».
4. **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры). Цены оценочные (поставщик их скрывает); фото товаров — демо (Unsplash), временные. Заменить по счёту/реальным фото.
5. **`_local-assets/` — gitignored локальная свалка** (скриншоты и т.п.). Не ре-трекай. `.gitignore` также блокирует stray-бинарники в корне (`/*.png`, `/*.jpg`, `/*.jpeg`, `/*.pdf`).
6. **`packages/ui/storybook-static/` — gitignored** (`packages/ui/.gitignore`). В git не попадает; пересобирается `npm run build-storybook -w @kk/ui`.
7. **Бренд-домен `karaokeshop.kz` ещё НЕ привязан — отдаёт старый Wix; `siteConfig.url` ведёт canonical/og на чужой сайт (SEO-риск).** Боевой прод — только `*.workers.dev`; `.kz` сейчас старый сайт на Wix (DNS не на Cloudflare). А `siteConfig.url = "https://www.karaokeshop.kz"` → `seo.ts` строит от него `canonical`, `og:url`, `og:image` → они указывают на Wix. Пока домен не привязан: **проверять прод только на `*.workers.dev`** (не на `.kz`), `siteConfig.url` по этому поводу **не менять** без отдельного решения — долг закроется в момент привязки домена. Чек-лист «Проверка после деплоя» — в [docs/deploy.md](docs/deploy.md).

## UI-конвенции (обязательные)

### Анти-AI правила («Сцена», дизайн-директура 2026-07-04)

Арт-директура — [specs/2026-07-04-dizayn-sprint-stsena-design.md](docs/superpowers/specs/2026-07-04-dizayn-sprint-stsena-design.md). Обязательно:
1. **Никаких рядов pill-чипов.** Факты доверия — строкой-тикером (`.ticker`) вдоль тонкой линии.
2. **CountUp-счётчики не на витринах.** Компонент и тесты в репо остаются; в UI цифры — статикой (тикер), без анимации роста.
3. **Сетка «иконка+заголовок+текст» — максимум одна на страницу**; заголовки секций — просто текст, без нумерации 01/02 и без lucide-кружков (нумерация убрана по решению владельца 2026-07-07).
4. **Тени-«клей» запрещены.** Разделение поверхностей — цвет (`bg-background` на `bg-page`) + hairline `border border-border`. Тень только у плавающих элементов (FAB, оверлеи, sticky, drawer). Крупные карточки-контейнеры — единый фон `bg-background` (не `bg-surface`/градиент) во всех темах.
5. **Сток-фото запрещён.** До реальных фото — типографический плейсхолдер на `bg-scene` (имя модели/сцены в `font-display text-primary/40`).
6. **Фото товаров** — на подложке `bg-scene` с паддингом; белые плашки в тёмной теме запрещены.
7. **Фирменный приём «подсветка строки»** — `<HighlightLine>` / класс `.hl` на ключевом слове заголовка (≤ половины h1), активном пункте nav. С 2026-07-07 — акцентный текст (`color: var(--color-cta)` + тонкое подчёркивание), НЕ заливка-блок; `HighlightLine` — чистый SSR-компонент без анимации.
8. **Один WhatsApp-CTA на вьюпорт.** Иерархия: зелёный WhatsApp → акцентный CTA (`bg-cta`, неон-жёлтый в тёмной теме / чернильно-синий в светлой) → ghost.
9. **Радиусы только из шкалы** (`rounded-sm/md/lg/xl` = 6/8/10/12px). `rounded-2xl`/`rounded-3xl` запрещены. On-primary текст — `text-primary-fg`, НЕ `text-white` (в тёмной primary светлый).

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

Страницы на компоненте `LandingPage` крошку получают через опциональный проп `breadcrumb` (`<LandingPage breadcrumb={<Breadcrumb …/>} …>`), а не внутри `<Container>`. Покрыты все динамические роуты: `blog/[slug]`, `komplekty` (индекс), `komplekty/[area]`, `karaoke/[scenario]` (добавлено 2026-06-25 — раньше нарушали правило).

### Иконки в списках карточек (guard — обязательно)

Поле `icon` в data-массивах — **опциональное в типе и защищённое в рендере**, чтобы удаление иконки не роняло карточку (история бага: «убрал иконку → пропала карточка» = `<undefined/>` → краш рендера / ошибка сборки).

```tsx
import { Wrench, type LucideIcon } from "lucide-react";
const items: { icon?: LucideIcon; title: string }[] = [{ icon: Wrench, title: "…" }];
// в рендере — guard:
{Icon && <Icon className="h-5 w-5" />}
// для доступа s.icon: const Icon = s.icon; {Icon && <Icon .../>}
```

«Убрать иконки с карточек» = убрать поле `icon` из ДАННЫХ. Рендер не трогать — guard уже держит. Применено в: servis, dlya-doma, dlya-biznesa, o-nas, ServiceSteps, CalculatorClient.

### Темизируемый текст — только токен-утилиты

Цвет текста, который меняется по теме, — **только** `text-foreground` / `text-muted-foreground` (флипаются через `.dark` в `theme.css`). **Никаких** `dark:text-[#…]` / `dark:text-white` в компонентах — это возвращает whack-a-mole тёмной темы. `dark:hover:text-white` → не нужен: `hover:text-foreground` в тёмной даёт светлый. Фон страницы — токен `--color-page` (утилита `bg-page`; `#f5f5f5` light / `#0e131c` dark); `body` и `dark:bg-page` в Header/Footer идут от него — не хардкодь `#0e131c`/`#f5f5f5`.

### Рассрочка / Kaspi

Рассрочка Kaspi **удалена полностью** — не упоминать в UI, metadata, CTA. Заказ → WhatsApp (`siteConfig.whatsapp`). Рассинхрон, найденный аудитом 2026-06-22 (≈21 вхождение на LIVE), **устранён 2026-06-23**: убраны hero, `/мес` на карточках (`ProductCard`), строка в сравнении, бейдж komplekty, FAQ и упоминания в ~7 SEO-описаниях; функция `installmentMonthly` удалена. Не возвращать без явного решения.

## ЕДИНОЕ ПРАВИЛО: сразу обнови ВСЕ доки → коммит → пуш (атомарно)

> Подтверждено владельцем 2026-07-06 как **главное операционное правило репо**. Действует на ЛЮБОЕ изменение (код, контент, дизайн, конфиг, доки) — без исключений.

**После каждого завершённого изменения — сразу, не откладывая:**
1. **Обнови ВСЕ затронутые доки в том же коммите** — минимум `docs/HANDOFF.md`, а также любой релевантный `spec`/`plan`/`CLAUDE.md`, если правка их касается. Не follow-up'ом, не «потом».
2. **Коммит** (`git -C ~/Desktop/karaokeshop commit`) — код + доки вместе, одним коммитом.
3. **Пуш сразу** (`git push origin main`) — не позже, не пачкой; затем проверить CI (`gh run list`) до `success`.

Никогда не оставлять незакоммиченные правки «на потом», не коммитить без обновления доков, не коммитить без немедленного пуша. Три шага неразделимы.

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
