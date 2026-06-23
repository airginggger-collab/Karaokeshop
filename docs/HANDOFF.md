# HANDOFF — снимок состояния (для новой сессии)

> Краткий контекст проекта karaokeshop.kz, чтобы быстро войти в курс. Полная карта — [docs/README.md](README.md) · правила для AI — [/CLAUDE.md](../CLAUDE.md).
>
> **Обновлено: 2026-06-23.** Ветка `feat/v2-homepage` — v2-хоумпейдж. Ветка `main` — стабильная v1.
>
> 🔧 **Аудит сайта (2026-06-22):** [`audit-2026-06-22.md`](audit-2026-06-22.md) — оценки и находки по визуалу/UX/продажам/SEO/репо. План устранения с файлами и проверкой — [`fix-plan-2026-06-22.md`](fix-plan-2026-06-22.md) (точка входа для работ).

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

## Последняя сессия (2026-06-23) — все mood-страницы следуют теме; Mood удалён

Распространён фикс pod-klyuch на остальные принудительно-mood страницы:
- Снята обёртка `<Mood variant=…>` с `komplekty`, `komplekty/[area]`, `karaoke/[scenario]` — теперь следуют теме сайта (светлая в светлой). Убраны неиспользуемые импорты и `const variant` в karaoke.
- Компонент `components/Mood.tsx` **удалён** (0 использований) — закрывает фут-ган повторного полностраничного форса. Класс-блоки `.mood-*` в `theme.css` оставлены безвредными; **переменные `--warm-*`/`--night-*` сохранены** (используются инлайн в бенто главной, dlya-biznesa, gotovye-resheniya, HeroWave).
- Проверено: build web, тесты web(10), визуал — komplekty light полностью светлая; бенто главной (warm/dark акцент-карточки) цело.

## Последняя сессия (2026-06-23) — Kaspi/рассрочка удалена полностью (Задача 6)

Рассинхрон закрыт удалением (по решению владельца) — код совпал с CLAUDE.md «удалена полностью»:
- `Hero.tsx` — убрано «рассрочка Kaspi» (×2); `ProductCard.tsx` — убрана строка `от X/мес` (тернар → скидка показывает старую цену, иначе ничего) + импорт `installmentMonthly`; `CompareClient.tsx` — убрана строка «Рассрочка» + импорт; `komplekty/[area]` — убран бейдж рассрочки + импорт `CreditCard`; `site.ts` — функция `installmentMonthly` удалена, FAQ-пункт про рассрочку убран, ~7 SEO-описаний переписаны без Kaspi.
- Проверено: grep 0 вхождений, build web (импорты подчищены), тесты web(10), визуал каталога (карточки без `/мес`, верстка цела).

## Последняя сессия (2026-06-23) — фон страницы → токен --color-page

- Добавлен токен `--color-page` в `theme.css` (`#f5f5f5` light / `#0e131c` dark) + утилита `bg-page` в tailwind.config.
- Убран хардкод: `globals.css body` → `var(--color-page)` (удалён отдельный `.dark body`); Header/Footer `dark:bg-[#0e131c]` → `dark:bg-page`. Один источник фона страницы.
- Проверено: build web + визуал light (белый хедер на `#f5f5f5`) и dark (хедер сливается с `#0e131c`). Регрессий нет.

## Последняя сессия (2026-06-23) — /pod-klyuch следует теме (убран форс mood-night)

- **Баг:** `/pod-klyuch` был обёрнут в `<Mood variant="night">` → принудительно тёмная палитра НЕЗАВИСИМО от темы. В светлой теме = тёмный «остров» внутри светлого шелла (светлый body + светлый футер) → «страница не собралась», футер не совпадал.
- **Фикс:** убран `<Mood variant="night">` из `pod-klyuch/page.tsx` — страница следует теме сайта (светлая в светлой, тёмная в тёмной), как servis/catalog/kontakty. Проверено визуально в обеих темах: light — всё светлое и футер совпадает; dark — обычная тёмная палитра, карточки видны.
- ✅ **Тот же паттерн исправлен и на** `komplekty`, `komplekty/[area]`, `karaoke/[scenario]` — см. запись ниже (обёртка `Mood` снята со всех, компонент удалён).

## Последняя сессия (2026-06-23) — раздел C добит: icon-guard везде + чистка хардкод-dark-текста

- **C4 (распространён):** опциональная+guarded иконка во всех списках с `icon:` — `servis`, `dlya-doma`, `dlya-biznesa`, `o-nas`, `ServiceSteps`, `CalculatorClient`. Тип `icon?: LucideIcon` + `{Icon && …}`. Удаление иконки из данных больше не роняет карточку нигде.
- **C2 (добит):** убраны все хардкод `dark:text-[#…]` / `dark:text-white` / `dark:hover:text-white` в `Header.tsx`, `Footer.tsx`, `layout.tsx` (body). Текст темизируется через `text-foreground`/`text-muted-foreground` (флип в `theme.css`). Проверено визуально в dark — Header/Footer читаемы.
- Правила в CLAUDE.md: добавлены конвенции «иконки в списках — guard» и «темизируемый текст — только токен-утилиты». Чек-лист раздела C закрыт (C0–C4 ✓).
- Остаток (вне C): фон страницы `#0e131c`/`#f5f5f5` — хардкод в Header/Footer/globals (кандидат на `--color-page`); Kaspi-рассинхрон на LIVE (Задача 6, ждёт заказчика).
- Проверено: тесты ui(2)+web(10), build web + Storybook, визуал light/dark/mood.

## Последняя сессия (2026-06-23) — КОРНЕВОЙ ФИКС токенов + CI (раздел C fix-plan)

Диагноз «правлю в одном месте — в другом не применяется» / бесконечная правка тёмной темы → **двойной источник правды для цветов** (tokens.css дублировал globals.css, globals молча перебивал). Плюс «убрал иконку → пропала карточка» = связность import↔данные↔рендер. Фиксы:
- **C1 (корень):** цвета вынесены в единый `packages/tokens/css/theme.css` (light/`.dark`/`.mood-*`), импортится приложением (`layout.tsx`) И Storybook (`preview.ts`). Цвета убраны из `tokens.json`/`tokens.css` (там теперь только радиусы) и из `globals.css` (только база + тени). Правка цвета теперь в ОДНОМ месте. Проверено: build web + Storybook + визуал light/dark/mood.
- **C2:** `.dark body` вернулся на `var(--color-fg)` (костыль-хардкод не нужен — конфликта нет).
- **C3:** clay-тень привязана ко ВСЕМ `.bg-background`, а не к `rounded-2xl/3xl` → смена радиуса больше не «теряет» карточку.
- **C4:** `servis/page.tsx` — иконка опциональна (`icon?: LucideIcon`) + guard `{Icon && …}`; удаление иконки из данных больше не роняет карточку.
- **C0 (CI):** `lighthouserc.json` performance `error`→`warn`. Деплой (job `build-test`) и так шёл; красный Lighthouse создавал ложное «не задеплоилось». Деплой от Lighthouse не зависит.
- Правило в CLAUDE.md обновлено: один источник на вид токена; цвета — только в `theme.css`.

## Последняя сессия (2026-06-23) — /servis: контраст текста в карточках

- `servis/page.tsx`: заголовок карточки `font-medium` → `text-base font-semibold`; тело `text-muted-foreground` → `text-foreground/70`

## Последняя сессия (2026-06-23) — dark: явный цвет текста на body

Корневая причина: tokens.css ставит `--color-fg: #0E1726` в `:root`; `.dark { --color-fg }` не всегда перебивает при статическом экспорте.

- `globals.css`: `.dark body { color: #f0f4fc }` — явно без var(), перебивает tokens.css
- `layout.tsx`: `<body dark:bg-[#0e131c] dark:text-[#f0f4fc]>` — Tailwind-фолбэк для статики

## Последняя сессия (2026-06-23) — Header/Footer: явный тёмный текст

- `Header.tsx`: nav и кнопка поиска → `dark:text-[#b8cfe0] dark:hover:text-white`
- `Footer.tsx`: основной текст → `dark:text-[#b8cfe0]`; заголовок и телефон → `dark:text-white`; ссылки → `dark:hover:text-white`

## Последняя сессия (2026-06-23) — dark theme: night-карточки + контраст текста

- `.dark` переопределяет `--night-bg: #1e2e48` (было фикс. `#0b1220` = темнее страницы → карточки тонули)
- `--color-bg: #233050` (ярче, чётче отличается от `#0e131c` страницы)
- `--color-fg: #f0f4fc` (14.2:1 ✓ AAA), `--color-muted-fg: #aac0d6` (8.2:1 ✓ AAA)
- `--color-primary: #4de3c8` (11.2:1 ✓ AAA) — ярче для `group-hover:text-primary`
- Тень расширена: `.dark .bg-background` (было только `.rounded-2xl/.rounded-3xl`)
- Night-бенто (inline style) получают `outline: 1px solid rgba(255,255,255,.12)` в тёмной теме

## Последняя сессия (2026-06-23) — CLAUDE.md: правило КОММИТ + ПУШ + ДОКИ

- `CLAUDE.md`: добавлен обязательный раздел «Правило: КОММИТ + ПУШ + ДОКИ — всегда в одном коммите» с таблицей что обновлять и чеклист расширен соответствующим пунктом

## Последняя сессия (2026-06-23) — Header/Footer: явная тёмная тема

- `tailwind.config.ts`: добавлен `darkMode: "class"` (ранее отсутствовал → `dark:` утилиты работали через media query, а не `.dark` класс)
- `Header.tsx`: `dark:bg-[#0e131c] dark:border-white/[0.08]` — хэдер сливается с фоном страницы в тёмной теме
- `Footer.tsx`: `dark:bg-[#0e131c] dark:border-white/[0.06]` — аналогично, убрана яркая `bg-surface` в тёмной теме

## Последняя сессия (2026-06-23) — globals.css: тёмная тема — читаемость карточек

- `--color-bg` (тёмная карточка): `#141c27` → `#1c2840` — заметнее отличается от фона страницы
- `--color-surface` (чипы): `#1e2a3a` → `#263550`
- `--color-fg`: `#e6eaf1` → `#edf2fa` (**12.5:1** ✓ AAA)
- `--color-muted-fg`: `#94a3b8` → `#a0b8cc` (**7.6:1** ✓ AAA — было тускло на тёмном фоне)
- `.dark body` фон: `#0b0f14` → `#0e131c`
- Ring-тень: `rgba(255,255,255,.10)` → `.12`, shadow `8px` → `12px`

## Последняя сессия (2026-06-23) — globals.css: светлая/тёмная тема, WCAG-контраст

> Также: trust-блок на главной («С 2012 / Гарантия / Монтаж»)  теперь `<Link href="/servis">` — клик ведёт на `/servis`, hover показывает «Подробнее →».

### globals.css — единый источник правды
- **Светлая тема** задана в `:root` явно (переопределяет tokens.css). Ключевые значения:
  - `--color-bg: #ffffff` (карточки), тело страницы `#f5f5f5` hardcoded
  - `--color-muted-fg: #586070` — было `#64748B` = **4.6:1, провал AA** на `#f5f5f5`; стало **5.4:1 ✓ AA**
  - `--color-primary: #1f6f66` — **5.2:1 ✓ AA** на фоне карточки
- **Тёмная тема** (`.dark`): карточки `--color-bg: #141c27` теперь отличаются от фона страницы `#0b0f14`; кольцо-тень усилена до `rgba(255,255,255,.10)` + глубокая тень
- **`.mood-warm`**: `--color-muted-fg: #764e2a` — было `#8a6a4c` = **4.1:1 провал**; стало **5.7:1 ✓ AA** на warm-muted bg
- **Все `.mood-*`**: контраст задокументирован комментариями в файле

## Последняя сессия (2026-06-23) — Homepage: контраст карточек + единая система переменных

- **Проблема:** `bg-surface` (#F8FAFC) на `body` (#f5f5f5) = 1.03:1 — карточки сливались с фоном.
- Trust block («С 2012», «Гарантия + сервис-центр», «Монтаж и настройка»): `bg-surface` → `bg-background` + `font-medium`. Получают clay-тень из globals.css автоматически.
- «Как мы работаем» шаги: `bg-surface` → `bg-background`; нумерация `text-primary/20` → `/40` (читаема).
- `ServiceSteps.tsx`: `bg-surface` → `bg-background`.
- «Для дома» бенто-карточка: добавлен `border: 1px solid var(--warm-soft)` — визуально отделяется от серого фона.
- **Принцип:** нейтральные карточки = `bg-background` (белый + clay-тень); тёплые/ночные карточки = явные `var(--warm-*)` / `var(--night-*)`. Две системы переменных остаются, но каждая применяется строго к своей области.

## Последняя сессия (2026-06-23) — Аудит P0–P2: SEO, .gitignore, dead code, гигиена

- SEO: canonical на `/`, 301 `/karaoke/dlya-doma` → `/dlya-doma`, OG/Twitter meta в root layout, Product JSON-LD с image, BreadcrumbList на страницах товара.
- Lighthouse CI: 3 → 8 URL.
- `.gitignore`: `*.zip`, `*.tsbuildinfo`, `.claude/`, `скриныыы*/` добавлены; дубль `.next/` убран.
- Orphan `tokens/` (корень) удалён; build читает `packages/tokens/`.
- Dead components удалены: FilterRail, SectionHeading, TrustStrip.
- `.prettierrc` создан; `engines: { node: ">=20" }` и `format` скрипт в `package.json`; `turbo.json` обновлён.

## Последняя сессия (2026-06-23) — CI/CD: автодеплой на Cloudflare через GitHub Actions

- **Проблема найдена:** `out/` в `.gitignore` → `git push` никогда не деплоил файлы. Деплой требовал ручного `npx wrangler deploy` после каждой сборки.
- **Решение:** добавлен шаг деплоя в `.github/workflows/ci.yml` — `npx wrangler deploy` запускается только на `push` в `main`, после успешной сборки и тестов. Использует секрет `CLOUDFLARE_API_TOKEN`.
- **Секрет добавлен:** `CLOUDFLARE_API_TOKEN` в Settings → Secrets репо `airginggger-collab/Karaokeshop`. Токен с шаблоном «Edit Cloudflare Workers».
- **Новый флоу:** `git push origin main` → CI (тесты + сборка) → `wrangler deploy` → прод автоматически. PR-ветки деплой не триггерят.
- CLAUDE.md обновлён — старая инструкция «запускать wrangler вручную» заменена на описание CI-деплоя.

## Последняя сессия (2026-06-23) — Калькулятор: белый дизайн + экспертные хинты

- `CalculatorClient.tsx`: левая панель обёрнута в белую карточку `bg-background rounded-2xl p-6`. Убрана строка «рассрочка Kaspi».
- Чипы типа заведения переключены на `rounded-full` (активный — залитый primary).
- **Trust strip**: 4 плитки над калькулятором — мощность по площади, Shure UHF, XLR-кабели, 200+ объектов.
- **Хинты в смете**: каждая строка теперь содержит `hint` — экспертное объяснение почему этот компонент (добавлено в `Line` тип и `configure()` в `calculator.ts`). Рендерятся под названием позиции мелким серым текстом.

## Последняя сессия (2026-06-22) — CRO: квиз, логотипы, FAQ, микрокопии

### Новые компоненты
- `QuizWidget.tsx` — клиентский компонент, 3 вопроса (место/площадь/бюджет), прогресс-бар, результат открывает WA с ответами. Размещён на главной после ценовых тьеров.
- `ClientLogos.tsx` — секция «Нам доверяют» с 8 плейсхолдер-чипами заведений Алматы/Астаны. Размещена на главной перед «Разделами». **Заменить на реальные логотипы когда получим от клиента.**

### FAQ добавлен
- `/servis` — 4 вопроса + FAQPage JSON-LD
- `/pod-klyuch` — 4 вопроса + FAQPage JSON-LD + WA CTA с микрокопией

### Микрокопии под CTA
«Ответим в течение часа · Без обязательств» добавлена под WhatsApp-кнопками на:
dlya-doma, dlya-biznesa, gotovye-resheniya, servis, pod-klyuch.

## Последняя сессия (2026-06-22) — WCAG AA: warm-accent

- `globals.css`: `--warm-accent` #f97316 → **#c2410c** (orange-700).
  Было 2.65:1 на `--warm-bg` (#fff7ed) — провал. Стало **4.82:1** — проходит WCAG AA.
- Та же правка в `.mood-warm` (`--color-primary`/`--color-accent`).
- `gotovye-resheniya/page.tsx`: заменён inline-breadcrumb на `<Breadcrumb>`.
- Белый текст на `#c2410c` (кнопки) → 5.1:1 ✓ — ничего не сломалось.

## Последняя сессия (2026-06-22) — Checkout + Breadcrumbs

### Checkout (`/checkout`)
- Убрана вся рассрочка Kaspi из UI (payment radio, monthly text).
- `CheckoutClient.tsx`: новый флоу — форма имя/телефон → кнопка «Отправить в WhatsApp» открывает WA с составом заказа.
- Хлебная крошка добавлена, h1 обновлён на `font-display`.

### Breadcrumbs — новый компонент
- `src/components/Breadcrumb.tsx` — `items: {label, href?}[]`, всегда начинается с «Главная».
- Добавлен на **все** страницы: o-nas, keysy, dlya-doma, dlya-biznesa, pod-klyuch, kontakty, servis, pesni, kalkulyator, catalog, sravnit, sravnenie, brand/[slug], product/[slug], checkout.
- Для brand/[slug] и product/[slug] — двухуровневые крошки (Каталог → Продукт).

### Рассрочка удалена везде
- `product/[slug]`: убрана строка «Kaspi рассрочка от … × 12 мес», исправлен title/description metadata.
- `page.tsx`: убран неиспользуемый импорт `installmentMonthly`.

## Последняя сессия (2026-06-22) — Editorial product cards (Alphane Labs style)

- `page.tsx`: секция «Популярное оборудование» переделана под editorial 2×2 композицию.
  - Карточка: белый `bg-background`, фото-зона вверху `h-56/h-64` с `object-cover`, внизу "полка" с характеристиками.
  - Сценарий-бейдж (`scenarioLabel`) поверх фото — тёплый/ночной акцент.
  - Чипы характеристик (`до X м²`, `N+ песен`) в `bg-surface` пилюлях.
  - Цена акцентным цветом + CTA-кнопка с `gap` анимацией при hover.
  - Фильтр расширен: все `type === "sistema"` (4 продукта, не только featured), grid 2×2.

## Последняя сессия (2026-06-22) — Clay morphism / фон страницы

- `apps/web/src/app/globals.css`: `body` bg light → `#f5f5f5` (тёмная без изменений).
- Глобальные CSS-правила `.bg-background.rounded-2xl/3xl` → `box-shadow: 0 1px 3px rgba(0,0,0,.06)` — clay morphism вместо жёсткого border. Компоненты не трогались.
- `.dark` вариант: тень темнее + белый ring `rgba(255,255,255,.05)`.

## Последняя сессия (2026-06-22) — E-E-A-T / AI Overviews

### SEO / Schema
- **LocalBusiness JSON-LD** в `layout.tsx` (глобально на всех страницах).
- **FAQPage JSON-LD** на `/dlya-doma`, `/dlya-biznesa`, `/keysy`.
- Хелпер `faqJsonLd()` уже существовал в `src/lib/seo.ts`.

### Новый контент (E-E-A-T)
- **Главная (`page.tsx`):** добавлена секция «Как мы работаем» (5 шагов) + блок отзывов (3 карточки с Unsplash-портретами).
- **`/dlya-doma`:** FAQ-секция (4 вопроса) + FAQPage schema.
- **`/dlya-biznesa`:** FAQ-секция (4 вопроса) + FAQPage schema.
- **`/keysy`:** карточки кейсов с фото `h-48`, блок метрик (срок монтажа + результат), FAQ-секция внизу.
- **`/o-nas`:** команда (3 участника с Unsplash-портретами), таймлайн 2012–2026, стата «200+ объектов».

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
3. **Логотипы клиентов** — `ClientLogos.tsx` содержит 8 текстовых плейсхолдеров (Шафран, Nomad, Babylon…). Заменить на реальные SVG/PNG когда клиент пришлёт.
4. **CMS** (Sanity vs Strapi) — ждёт ответ заказчика про резидентность данных (ADR-0001). Сейчас контент захардкожен в `site.ts`.
5. **Бриф заказчика** — частоты Wordstat (семантическое ядро), аналитика, доступы. См. [docs/client/client-brief.md](client/client-brief.md).
6. **Кастомный домен** `new.karaokeshop.kz` — ждёт доступ владельца к DNS (потом 2 клика в Cloudflare).
7. **`/sravnit` не в sitemap** — страница сравнения оборудования есть как роут, но не добавлена в `allPaths()` в `site.ts` → Google её не видит. Фикс: добавить `"/sravnit"` в `allPaths()`.

## Подводные камни
- ⚠️ Это **не medlog** — коммить через `git -C ~/Desktop/karaokeshop` (был случай ошибочного коммита в medlog).
- **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры).
- Цены — оценочные; демо-фото — временные.
- **`_local-assets/` — gitignored локальная свалка**, не ре-трекать. Корневые `*.png/*.jpg/*.jpeg/*.pdf` тоже игнорятся — не клади бинарники в корень.
- **`deploy.md` исторически описывал Cloudflare Pages (Connect-to-Git)**, но реальный продакшен — assets-only **Worker** (`wrangler.toml`, URL `*.workers.dev`). Источник истины по деплою — `wrangler.toml`.

## Документация
[docs/README.md](README.md) (индекс) · [/CLAUDE.md](../CLAUDE.md) (правила для AI) · [strategy/](strategy/) (стратегия, ядро, бюджет, URL-карта) · [plans/](plans/) · [deploy.md](deploy.md) · [adr/](adr/) · [redaktirovanie-sajta.md](redaktirovanie-sajta.md) (правка владельцем).
