# Визуальный апдейт: янтарный ре-колор + фото — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сменить фирменный акцент тил/зелёный → янтарь (обе темы), сделать светлую тему с «золотыми кнопками», добавить атмосферные фото (поющие люди + дом/бизнес).

**Architecture:** Цвета — только в `packages/tokens/css/theme.css` (единственный источник). Для «золотых кнопок» вводим отдельный токен `--color-cta` (яркий янтарь + тёмный текст), т.к. `text-primary` (ссылки) в светлой теме должен быть тёмным для AA, а кнопки — яркими. Primary-кнопки (Button + инлайн) переключаются на `bg-cta text-cta-fg`. Фото — Unsplash, скачиваются в `public/scenariy/` после подтверждения.

**Tech Stack:** Next.js 15 (static export), Tailwind на CSS-переменных, `@kk/ui` (Button), Vitest, `sips` (webp).

**Спек:** [docs/superpowers/specs/2026-07-01-vizualnyy-apdeyt-amber-design.md](../specs/2026-07-01-vizualnyy-apdeyt-amber-design.md)

**Ветка:** работать на фиче `redesign-amber` (не пушить в main до готовности — как договорились ранее для больших правок). После — превью и решение о мердже.

**Проверка после задач:** `npm run build -w web` + `npm test -w web` + `npm test -w @kk/ui` зелёные. Автор — `airginggger-collab`.

---

## Фаза A — Ре-колор и золотые кнопки

### Task 1: Ре-колор акцентных токенов тил → янтарь (`theme.css`)

**Files:**
- Modify: `packages/tokens/css/theme.css`

- [ ] **Step 1: Светлая тема (`:root`) — заменить значения**

Заменить строки (точные old→new):
- `--night-accent:#2dd4bf;` → `--night-accent:#f59e0b;`
- `  --color-primary:      #1f6f66;   /* фирменный тил:    5.2:1 на bg  ✓ AA  */` → `  --color-primary:      #b45309;   /* янтарь-текст:     ~5:1 на bg   ✓ AA  */`
- `  --color-primary-fg:   #ffffff;   /* текст на primary: 5.7:1         ✓ AA  */` → `  --color-primary-fg:   #fff7ed;   /* текст на primary: AA           ✓ AA  */`
- `  --color-primary-soft: #e0f0ee;   /* тил-тинт фон */` → `  --color-primary-soft: #fef3c7;   /* золотой тинт фон */`
- `  --color-accent:       #1f6f66;` → `  --color-accent:       #b45309;`
- `  --color-accent-fg:    #0a3530;` → `  --color-accent-fg:    #7c2d12;`
- `  --color-accent-soft:  #e0f0ee;` → `  --color-accent-soft:  #ffedd5;`

- [ ] **Step 2: Тёмная тема (`.dark`) — заменить значения**

- `  --color-primary:      #4de3c8;   /* тил яркий:       11.2:1 на bg  ✓ AAA */` → `  --color-primary:      #f59e0b;   /* янтарь яркий:    ~9:1 на bg    ✓ AAA */`
- `  --color-primary-fg:   #021a15;   /* текст на primary:11.0:1         ✓ AAA */` → `  --color-primary-fg:   #1a1204;   /* тёмный на янтаре ✓ AAA */`
- `  --color-primary-soft: #143028;` → `  --color-primary-soft: #2a1c08;`
- `  --color-accent:       #4de3a8;   /* зелёный акцент:  10.5:1 на bg  ✓ AAA */` → `  --color-accent:       #f59e0b;   /* янтарь:          ~9:1 на bg    ✓ AAA */`
- `  --color-accent-fg:    #d0fcea;   /*                  15.1:1 на soft ✓ AAA */` → `  --color-accent-fg:    #ffe9c2;   /*                  на soft ✓ AAA */`
- `  --color-accent-soft:  #112b20;` → `  --color-accent-soft:  #2a1c08;`

- [ ] **Step 3: Проверить, что `.dark` не переопределяет `--night-accent`**

Run: `grep -n "night-accent" packages/tokens/css/theme.css`
Expected: одно определение (в `:root`). Если есть второе в `.dark` — заменить его значение тоже на `#f59e0b`. Mood-темы (`.mood-warm`/`.mood-night`) НЕ трогаем (YAGNI).

- [ ] **Step 4: Собрать и проверить обе темы в превью**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка успешна.

Поднять превью (`preview_start` / `npx serve apps/web/out -l 4321`), открыть `/`. Проверить: акцент стал янтарным; тёмные секции — яркий `#f59e0b`; светлая — ссылки/цены глубокий янтарь. Кнопки пока могут быть тускло-коричневыми на светлой (починим в Task 3). WhatsApp-кнопки — зелёные (не изменились).

- [ ] **Step 5: Коммит**

```bash
git -C ~/Desktop/karaokeshop add packages/tokens/css/theme.css
git -C ~/Desktop/karaokeshop commit -m "style(tokens): акцент тил → янтарь (обе темы)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Токен `--color-cta` + Tailwind-маппинг

**Files:**
- Modify: `packages/tokens/css/theme.css`
- Modify: `apps/web/tailwind.config.ts`

- [ ] **Step 1: Добавить cta-токены в `:root` (светлая)**

В блоке `:root` после строки `--color-accent-soft:  #ffedd5;` (из Task 1) добавить:
```css
  --color-cta:          #f59e0b;   /* яркий янтарь — фон primary-кнопок */
  --color-cta-fg:       #3a2a06;   /* тёмный текст на золоте ✓ AA */
```

- [ ] **Step 2: Добавить cta-токены в `.dark`**

В блоке `.dark` после строки `--color-accent-soft:  #2a1c08;` (из Task 1) добавить:
```css
  --color-cta:          #f59e0b;
  --color-cta-fg:       #1a1204;
```

- [ ] **Step 3: Добавить cta в Tailwind-маппинг**

В `apps/web/tailwind.config.ts`, в объект `colors` (после `"primary-fg": "var(--color-primary-fg)",`) добавить:
```ts
        cta: "var(--color-cta)",
        "cta-fg": "var(--color-cta-fg)",
```

- [ ] **Step 4: Сборка (проверка, что классы `bg-cta`/`text-cta-fg` доступны)**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка успешна (визуально пока ничего не изменилось — токен ещё не используется).

- [ ] **Step 5: Коммит**

```bash
git -C ~/Desktop/karaokeshop add packages/tokens/css/theme.css apps/web/tailwind.config.ts
git -C ~/Desktop/karaokeshop commit -m "feat(tokens): токен --color-cta (золотые кнопки) + Tailwind-маппинг

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Primary-кнопки → золотые (`bg-cta text-cta-fg`)

**Files:**
- Modify: `packages/ui/src/Button.tsx:15`
- Modify: `apps/web/src/components/CalculatorClient.tsx` (строки ~45, ~155)
- Modify: `apps/web/src/components/CatalogClient.tsx:18`
- Modify: `apps/web/src/components/BrandProductFilter.tsx:30`

Правило: заполненные акцентом кнопки/активные пилюли (`bg-primary` + светлый текст) → `bg-cta text-cta-fg`. Ссылки/бордеры (`text-primary`, `border-primary`) и полупрозрачные тинты (`bg-primary/5`) — НЕ трогаем.

- [ ] **Step 1: `@kk/ui` Button — primary-вариант**

В `packages/ui/src/Button.tsx` заменить строку:
```ts
  primary: "bg-primary text-primary-fg shadow-sm hover:opacity-90 active:scale-[.98]",
```
на:
```ts
  primary: "bg-cta text-cta-fg shadow-sm hover:opacity-90 active:scale-[.98]",
```

- [ ] **Step 2: Прогнать тесты Button**

Run: `cd ~/Desktop/karaokeshop && npm test -w @kk/ui`
Expected: PASS (2 теста; если тест проверял класс `bg-primary` — обновить его на `bg-cta`).

- [ ] **Step 3: CalculatorClient — активные пилюли шага и площади**

В `apps/web/src/components/CalculatorClient.tsx`:
- Заменить `? "bg-primary text-white"` (индикатор шага, ~строка 45) на `? "bg-cta text-cta-fg"`.
- Заменить `area === v ? "border-primary bg-primary text-white" : "border-border hover:border-primary",` (~строка 155) на `area === v ? "border-cta bg-cta text-cta-fg" : "border-border hover:border-primary",`.

(`border-cta` требует, чтобы Tailwind знал `cta` — добавлено в Task 2, borderColor берёт из colors.)

- [ ] **Step 4: CatalogClient — активный тип-фильтр**

В `apps/web/src/components/CatalogClient.tsx:18` заменить:
```
          ? "border-primary bg-primary text-white"
```
на:
```
          ? "border-cta bg-cta text-cta-fg"
```

- [ ] **Step 5: BrandProductFilter — активная кнопка**

В `apps/web/src/components/BrandProductFilter.tsx:30` заменить:
```
                  ? "bg-primary text-primary-fg"
```
на:
```
                  ? "bg-cta text-cta-fg"
```

- [ ] **Step 6: Инлайн hero-кнопки в page.tsx — проверить фон**

Открыть `apps/web/src/app/page.tsx`. Hero-квиз использует `<QuizWidget/>` (его кнопки — `border`, не заполненный акцент, менять не надо). Финальный CTA использует WhatsApp-зелёный (`bg-[#25D366]`) и ghost-ссылку — не трогать. Убедиться grep-ом, что в `page.tsx` нет `bg-primary text-white`:

Run: `grep -n "bg-primary text-white\|bg-primary text-primary-fg" apps/web/src/app/page.tsx`
Expected: пусто (нет заполненных primary-кнопок в page.tsx).

- [ ] **Step 7: Сборка + превью обеих тем**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web && npm test -w web`
Expected: сборка ок, тесты 19 зелёные.

Превью `/kalkulyator` и `/catalog` в **светлой** теме: активные пилюли и кнопки — золотые `#f59e0b` с тёмным текстом (читаемо). В тёмной — те же яркие янтарные. Ссылки (`text-primary`) — глубокий янтарь на белом.

- [ ] **Step 8: Коммит**

```bash
git -C ~/Desktop/karaokeshop add packages/ui/src/Button.tsx apps/web/src/components/CalculatorClient.tsx apps/web/src/components/CatalogClient.tsx apps/web/src/components/BrandProductFilter.tsx
git -C ~/Desktop/karaokeshop commit -m "style(ui): золотые primary-кнопки (bg-cta) в светлой теме

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Фаза B — Фото

### Task 4: Выбор и загрузка фото (гейт подтверждения)

**Files:**
- Create: `apps/web/public/scenariy/dom.webp`, `biznes.webp`, `poyushchie.webp`

- [ ] **Step 1: Подобрать кандидатов Unsplash**

Найти 3 тематических фото (поющие люди в караоке; уютная гостиная/дом; заведение/бар вечером). Для каждого — прямой URL загрузки и примерный размер.

- [ ] **Step 2: Показать кандидатов пользователю и получить «ок»**

Вывести список (миниатюра-описание + URL + размер). **Дождаться явного подтверждения** перед скачиванием (правило: загрузка файлов — с разрешения). Если пользователь предложит свои — использовать их.

- [ ] **Step 3: Скачать и конвертировать в webp**

После «ок» — скачать в `/tmp`, конвертировать `sips -s format webp <in> --out apps/web/public/scenariy/<name>.webp` (ресайз до ~1400px по ширине: `sips -Z 1400 ...`). Проверить размеры и что файлы < ~300 КБ.

- [ ] **Step 4: Коммит ассетов**

```bash
git -C ~/Desktop/karaokeshop add apps/web/public/scenariy/
git -C ~/Desktop/karaokeshop commit -m "assets(scenariy): фото поющие/дом/бизнес (Unsplash, webp)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Фото поющих в hero + секция дом/бизнес на главной

**Files:**
- Modify: `apps/web/src/app/page.tsx`

- [ ] **Step 1: Добавить фото поющих в hero-зону**

В `apps/web/src/app/page.tsx`, в hero-`<section className="animate-fade-up">`, обернуть контент в двухколоночную сетку на десктопе и добавить фото справа. Заменить открытие секции и вставить фото-колонку. Конкретно — обернуть существующий контент (слоган…QuizWidget) в `<div>` и рядом добавить:
```tsx
        <div className="mt-6 hidden overflow-hidden rounded-3xl lg:block">
          <img
            src="/scenariy/poyushchie.webp"
            alt="Люди поют караоке"
            loading="eager"
            className="h-full w-full object-cover"
          />
        </div>
```
Обёртка hero: `<div className="grid gap-6 lg:grid-cols-[1fr_360px]">` — слева текст+квиз, справа фото (скрыто на мобиле, чтобы не тянуть высоту). Фото не вытесняет квиз.

- [ ] **Step 2: Добавить секцию «Дом и бизнес» после «Как мы работаем»**

В `page.tsx` после закрывающего `</section>` блока `{/* Как мы работаем ... */}` вставить:
```tsx
      {/* Дом и бизнес — сценарные входы с фото */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { href: "/dlya-doma", img: "/scenariy/dom.webp", title: "Караоке для дома", sub: "Гостиная, баня, гостевой дом. Тёплые вечера с песнями.", cta: "Выбрать домой" },
          { href: "/dlya-biznesa", img: "/scenariy/biznes.webp", title: "Караоке для бизнеса", sub: "Кафе, бар, ресторан, клуб. Проект звука и монтаж под ключ.", cta: "Оснастить заведение" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="group flex flex-col overflow-hidden rounded-3xl bg-background">
            <div className="relative h-48 overflow-hidden sm:h-56">
              <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {c.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>
```
(`ArrowRight` и `Link` уже импортированы в `page.tsx`.)

- [ ] **Step 3: Сборка + превью**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка ок; `/scenariy/*.webp` скопированы в `apps/web/out/scenariy/`.

Превью `/`: фото поющих в hero (desktop), секция дом/бизнес с фото после «Как работаем». Mobile: фото поющих скрыто, карточки дом/бизнес стопкой, нет горизонт. скролла.

- [ ] **Step 4: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/app/page.tsx
git -C ~/Desktop/karaokeshop commit -m "feat(home): фото поющих в hero + секция дом/бизнес с фото

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Hero-фото на лендингах дом/бизнес

**Files:**
- Modify: `apps/web/src/app/dlya-doma/page.tsx`
- Modify: `apps/web/src/app/dlya-biznesa/page.tsx`

- [ ] **Step 1: `/dlya-doma` — фото в hero**

Открыть `apps/web/src/app/dlya-doma/page.tsx`. В hero-`<section className="mt-4 rounded-3xl bg-gradient-to-br from-surface to-muted p-8 sm:p-10" ...>` сделать двухколоночную раскладку и добавить фото. Обернуть текстовый контент hero в левую колонку, добавить правую:
```tsx
          <div className="mt-6 hidden overflow-hidden rounded-2xl md:block">
            <img src="/scenariy/dom.webp" alt="Домашнее караоке" loading="eager" className="h-full w-full object-cover" />
          </div>
```
Секцию обернуть контентом в `<div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">` (текст слева, фото справа).

- [ ] **Step 2: `/dlya-biznesa` — фото в hero**

Аналогично в `apps/web/src/app/dlya-biznesa/page.tsx`: найти hero-`<section>` (первый после `<Container>`/`<Breadcrumb>`), обернуть в 2 колонки, справа:
```tsx
          <div className="mt-6 hidden overflow-hidden rounded-2xl md:block">
            <img src="/scenariy/biznes.webp" alt="Караоке в заведении" loading="eager" className="h-full w-full object-cover" />
          </div>
```

- [ ] **Step 3: Сборка + превью**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка ок. Превью `/dlya-doma` и `/dlya-biznesa`: фото в hero (desktop), скрыто на mobile, нет горизонт. скролла.

- [ ] **Step 4: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/app/dlya-doma/page.tsx apps/web/src/app/dlya-biznesa/page.tsx
git -C ~/Desktop/karaokeshop commit -m "feat(landing): hero-фото на дом/бизнес

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Финализация — проверка, HANDOFF, мердж

**Files:**
- Modify: `docs/HANDOFF.md`

- [ ] **Step 1: Полная проверка обеих тем**

`npm run build -w web` + `npm test -w web` + `npm test -w @kk/ui` — зелёные. Превью главной, `/kalkulyator`, `/catalog`, `/dlya-doma`, `/dlya-biznesa` в **светлой и тёмной** темах (переключатель): акцент янтарный; кнопки золотые с тёмным текстом (читаемо); ссылки/цены глубокий янтарь (AA); WhatsApp-кнопки зелёные; фото не битые (200); mobile — без горизонт. скролла; консоль без ошибок.

- [ ] **Step 2: Контраст-чек ключевых пар**

Через preview_inspect проверить вычисленные цвета: primary-кнопка (фон `#f59e0b`, текст тёмный), ссылка `text-primary` на белом (`#b45309`). Убедиться, что читаемо в обеих темах.

- [ ] **Step 3: Обновить HANDOFF**

В `docs/HANDOFF.md` добавить секцию «Сессия <дата> — янтарный ре-колор + фото»: акцент тил→янтарь (`theme.css`), токен `--color-cta` (золотые кнопки, светлая тема), фото поющие/дом/бизнес в `public/scenariy/`, секция дом/бизнес на главной, hero-фото лендингов. Обновить дату.

- [ ] **Step 4: Коммит доков**

```bash
git -C ~/Desktop/karaokeshop add docs/HANDOFF.md
git -C ~/Desktop/karaokeshop commit -m "docs: янтарный апдейт — синк HANDOFF

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

- [ ] **Step 5: Завершение ветки**

Использовать superpowers:finishing-a-development-branch: тесты → опции (мердж в main → авто-деплой / PR / оставить). Предложить пользователю выбор.

---

## Self-review (проверка плана против спека)

- **Ре-колор тил→янтарь (обе темы)** → Task 1. ✅
- **Светлая L2 (золотые кнопки)** → Task 2 (cta-токен) + Task 3 (Button + инлайн). ✅
- **Светлую тему подстроить** → L2 и есть доработка (Task 1 значения + Task 3 кнопки). ✅
- **Фото поющих на главной** → Task 4 (загрузка) + Task 5 Step 1 (hero). ✅
- **Секция дом/бизнес + hero-фото лендингов** → Task 5 Step 2 + Task 6. ✅
- **WhatsApp-зелёный не трогаем** → Task 3 Step 6 явно исключает `bg-[#25D366]`. ✅
- **Гейт подтверждения загрузки фото** → Task 4 Step 2. ✅
- Плейсхолдеров нет; токены/классы консистентны (`--color-cta`/`bg-cta`/`text-cta-fg`); пути точные.
- **Примечание:** значения контраста в комментариях токенов — ориентировочные; фактический AA проверяется в Task 7 Step 2 (preview_inspect), значения при необходимости чуть подправить.
