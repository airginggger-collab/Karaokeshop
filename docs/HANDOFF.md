# HANDOFF — снимок состояния (для новой сессии)

> Краткий контекст проекта karaokeshop.kz, чтобы быстро войти в курс. Полная карта — [docs/README.md](README.md) · правила для AI — [/CLAUDE.md](../CLAUDE.md).
>
> **Обновлено: 2026-06-22.** Ветка `feat/v2-homepage` — v2-хоумпейдж. Ветка `main` — стабильная v1.

## Что это
Полный ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST + Studio Evolution + проф-оборудование). Цели: B2C-продажи + B2B-лиды (оснащение под ключ) + бренд + **SEO-приоритет**.

## Где живёт (важно)
- 🟢 **Live:** https://karaokeshop.airg-inggger.workers.dev/
- **Repo:** github.com/airginggger-collab/Karaokeshop · ветка `main`
- **Локально:** `~/Desktop/karaokeshop` — **ОТДЕЛЬНЫЙ проект, не medlog** (сессии часто стартуют из каталога medlog).
- **Коммит/пуш:** только `git -C ~/Desktop/karaokeshop`. Bash сбрасывает cwd на medlog между вызовами. Push по **SSH** (ключ `~/.ssh/id_ed25519` работает). Identity репо: `airginggger-collab <airg.inggger@gmail.com>` (в local git config). `gh` CLI не авторизован (токен в Keychain, фону недоступен).
- **Деплой:** Cloudflare assets-only Worker (`wrangler.toml` → `apps/web/out`), **авто на каждый push в main**. Превью-MCP привязан к medlog — проверять надо `build` + `curl` живого URL.

## Стек
Next.js 15 (App Router, `output: "export"` — статика) · Turborepo (npm workspaces) · Tailwind на дизайн-токенах (Style Dictionary) · Storybook · lucide-react · шрифты Manrope + Unbounded. **47 статических страниц** в `apps/web/out` (из них 18 карточек товаров). Тесты Vitest: web 10 (calculator 7 + seo 3) + ui 2.

## Сборка / проверка
```
npm run build -w web      # сборка (→ apps/web/out)
npm test -w web           # тесты
```
После пуша — `curl` живого URL (превью-MCP не для этого проекта).

## Где контент/данные (для правок)
- `apps/web/src/lib/site.ts` — товары (18 шт), бренды, блог, кейсы, песни, `siteConfig` (телефон/адрес), мета-страниц.
- `apps/web/src/lib/components.ts` — цены оборудования в калькуляторе сметы.
- `apps/web/public/products/` — фото товаров (поле `image` у товара).
- Инструкция для владельца (новичок, через браузер): [docs/redaktirovanie-sajta.md](redaktirovanie-sajta.md) (+ .docx).

## Последняя сессия (2026-06-22) — feat/v2-homepage
- **v2-хоумпейдж:** новый H1 «Караоке без ошибки в выборе», обновлены hero CTA (Выбрать домой / Для заведения).
- **Навигация v2:** Для дома / Для бизнеса / Studio Evolution / AST / Готовые решения / Монтаж / Контакты.
- **Новые страницы:** `/dlya-doma`, `/dlya-biznesa`, `/gotovye-resheniya` (собственные файлы в `app/`).
- **Ценовые тьеры** на главной: от 749k (дом) / 1.4M (кафе) / 2.5M (клуб).
- **Блок разделов** обновлён под новую навигацию.
- **HeroWave** (`src/components/HeroWave.tsx`): ambient CSS-эквалайзер в hero, зацикленная анимация 28 баров, toggle «Анимация вкл/выкл», уважает `prefers-reduced-motion`.
- **Большие карточки оборудования** на главной: секция «Популярное оборудование», 3 карточки (AST-250 / AST Mini / Evobox) с фото на весь фон, hover-zoom, warm/night градиенты. Источник: `products.filter(p => p.featured && p.type === "sistema")`.
- **Бенто-сетка выровнена:** Для бизнеса col-span-2 (под Для дома), Калькулятор col-span-2, убрана карточка «Хит» (дублировала блок с большими фото). Нижняя строка: Калькулятор / Песни / Доверие — 3 × col-span-2.
- Ветка `main` — стабильная v1 (откат через `git checkout main`).

## Последняя сессия (2026-06-20)
- **Уборка репо:** случайно закоммиченный в корень скриншот снят с трекинга. `.gitignore` дополнен блокировкой stray-бинарников. Коммит `b59d283`.
- Документация (README/CLAUDE/docs) приведена к текущей реальности.

## Что готово (live)
Бенто-главная (2 настроения: тёплое «для дома» / деловое ночное «для заведений») · e-commerce с корзиной · B2B-воронка «под ключ» · **онлайн-калькулятор сметы** (2 режима, реальные модели поставщика) · каталог 18 товаров (системы + акустика/микрофоны/сабвуфер/микшер) с фильтрами по типу/бренду · **сравнение оборудования** (`/sravnit`) и **сравнение брендов** (`/sravnenie`) · блог с FAQ-разметкой · кейсы · о компании · контакты с картой · песни · тёмная тема · мобильное меню · SEO (JSON-LD, sitemap, hreflang-структура).

## Что дальше / открытые хвосты
1. **Цены — оценочные.** Поставщик (show-service) **скрывает цены** в каталоге. Числа в `components.ts`/товарах привязаны к подтверждённым «готовым решениям» (551 800 / 611 800 ₸). Заменить по счёту поставщика.
2. **Фото товаров — демо (Unsplash).** Заменить на реальные: `public/products/<slug>.jpg` + поле `image` в `site.ts`.
3. **CMS** (Sanity vs Strapi) — ждёт ответ заказчика про резидентность данных (ADR-0001). Сейчас контент захардкожен в `site.ts`.
4. **Бриф заказчика** — частоты Wordstat (семантическое ядро), аналитика, доступы. См. [docs/client/client-brief.md](client/client-brief.md).
5. **Кастомный домен** `new.karaokeshop.kz` — ждёт доступ владельца к DNS (потом 2 клика в Cloudflare).
6. **`/sravnit` не в sitemap** — страница сравнения оборудования есть как роут (`apps/web/src/app/sravnit/page.tsx`), но не добавлена в `allPaths()` в `site.ts` → Google её не видит. Фикс: добавить `"/sravnit"` в `allPaths()`.

## Подводные камни
- ⚠️ Это **не medlog** — коммить через `git -C ~/Desktop/karaokeshop` (был случай ошибочного коммита в medlog).
- **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры).
- Цены — оценочные; демо-фото — временные.
- **`_local-assets/` — gitignored локальная свалка**, не ре-трекать. Корневые `*.png/*.jpg/*.jpeg/*.pdf` тоже игнорятся — не клади бинарники в корень.
- **`deploy.md` исторически описывал Cloudflare Pages (Connect-to-Git)**, но реальный продакшен — assets-only **Worker** (`wrangler.toml`, URL `*.workers.dev`). Источник истины по деплою — `wrangler.toml`.

## Документация
[docs/README.md](README.md) (индекс) · [/CLAUDE.md](../CLAUDE.md) (правила для AI) · [strategy/](strategy/) (стратегия, ядро, бюджет, URL-карта) · [plans/](plans/) · [deploy.md](deploy.md) · [adr/](adr/) · [redaktirovanie-sajta.md](redaktirovanie-sajta.md) (правка владельцем).
