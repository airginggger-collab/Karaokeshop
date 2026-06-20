# HANDOFF — снимок состояния (для новой сессии)

> Краткий контекст проекта karaokeshop.kz, чтобы быстро войти в курс. Полная карта — [docs/README.md](README.md).

## Что это
Полный ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST + Studio Evolution + проф-оборудование). Цели: B2C-продажи + B2B-лиды (оснащение под ключ) + бренд + **SEO-приоритет**.

## Где живёт (важно)
- 🟢 **Live:** https://karaokeshop.airg-inggger.workers.dev/
- **Repo:** github.com/airginggger-collab/Karaokeshop · ветка `main`
- **Локально:** `~/Desktop/karaokeshop` — **ОТДЕЛЬНЫЙ проект, не medlog** (сессии часто стартуют из каталога medlog).
- **Коммит/пуш:** только `git -C ~/Desktop/karaokeshop`. Bash сбрасывает cwd на medlog между вызовами. Push по **SSH** (ключ `~/.ssh/id_ed25519` работает). Identity репо: `airginggger-collab <airg.inggger@gmail.com>` (в local git config). `gh` CLI не авторизован (токен в Keychain, фону недоступен).
- **Деплой:** Cloudflare assets-only Worker (`wrangler.toml` → `apps/web/out`), **авто на каждый push в main**. Превью-MCP привязан к medlog — проверять надо `build` + `curl` живого URL.

## Стек
Next.js 15 (App Router, `output: "export"` — статика) · Turborepo (npm workspaces) · Tailwind на дизайн-токенах (Style Dictionary) · Storybook · lucide-react · шрифты Manrope + Unbounded. ~51 статическая страница. Тесты Vitest (web 10 + ui 2).

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

## Что готово (live)
Бенто-главная (2 настроения: тёплое «для дома» / деловое ночное «для заведений») · e-commerce с корзиной · B2B-воронка «под ключ» · **онлайн-калькулятор сметы** (2 режима, реальные модели поставщика) · каталог 18 товаров (системы + акустика/микрофоны/сабвуфер/микшер) с фильтрами по типу/бренду · **сравнение оборудования** (`/sravnit`) и **сравнение брендов** (`/sravnenie`) · блог с FAQ-разметкой · кейсы · о компании · контакты с картой · песни · тёмная тема · мобильное меню · SEO (JSON-LD, sitemap, hreflang-структура).

## Что дальше / открытые хвосты
1. **Цены — оценочные.** Поставщик (show-service) **скрывает цены** в каталоге. Числа в `components.ts`/товарах привязаны к подтверждённым «готовым решениям» (551 800 / 611 800 ₸). Заменить по счёту поставщика.
2. **Фото товаров — демо (Unsplash).** Заменить на реальные: `public/products/<slug>.jpg` + поле `image`.
3. **CMS** (Sanity vs Strapi) — ждёт ответ заказчика про резидентность данных (ADR-0001). Сейчас контент захардкожен в `site.ts`.
4. **Бриф заказчика** — частоты Wordstat (семантическое ядро), аналитика, доступы. См. [docs/client/client-brief.md](client/client-brief.md).
5. **Кастомный домен** `new.karaokeshop.kz` — ждёт доступ владельца к DNS (потом 2 клика в Cloudflare).

## Подводные камни
- ⚠️ Это **не medlog** — коммить через `git -C ~/Desktop/karaokeshop` (был случай ошибочного коммита в medlog).
- **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры).
- Цены — оценочные; демо-фото — временные.

## Документация
[docs/README.md](README.md) (индекс) · [strategy/](strategy/) (стратегия, ядро, бюджет, URL-карта) · [plans/](plans/) · [deploy.md](deploy.md) · [adr/](adr/) · [redaktirovanie-sajta.md](redaktirovanie-sajta.md) (правка владельцем).
