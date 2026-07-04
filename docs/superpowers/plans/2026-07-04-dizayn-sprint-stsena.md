# Дизайн-спринт «Сцена» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать арт-директуру «Сцена» по спеку [2026-07-04-dizayn-sprint-stsena-design.md](../specs/2026-07-04-dizayn-sprint-stsena-design.md) на всём сайте: фиолетовая палитра от марки лого, приём «подсветка строки», анти-AI правила.

**Architecture:** Цвета меняются в одном месте (`packages/tokens/css/theme.css` — правило репо), радиусы в `tokens.json`, весь сайт перекрашивается токенами; затем шелл и UI-кит, затем по-страничная композиция. Каждая задача — самостоятельный зелёный коммит.

**Tech Stack:** Next.js 15 (output: export) · Tailwind на токенах · Style Dictionary · Vitest (⚠️ include только `src/**/*.test.ts`, НЕ `.tsx`).

**Правила каждой задачи (из CLAUDE.md, не пропускать):**
- `npm run build -w web` (postbuild-гард `check-redirects` должен пройти) и `npm test -w web` (24) + `npm test -w @kk/ui` (2) — зелёные.
- Превью: сервер `karaoke-static` (:4321, отдаёт `apps/web/out` — после build нужен reload), проверить ОБЕ темы (`localStorage kk-theme` = отсутствует→dark / `'light'`).
- Коммит вместе с обновлением `docs/HANDOFF.md` (раздел «Сессия 2026-07-04 …» пополняется строкой), пуш в `main` сразу, затем `gh run list` — деплой зелёный.
- Git только `git -C ~/Desktop/karaokeshop …`. Никаких новых `dark:text-[#…]` / хардкодов цвета (кроме `#25D366` WhatsApp и `#7c5cff` марки лого).

---

### Task 1: Токены «Сцены» (палитра + радиусы + чистка globals)

**Files:**
- Modify: `packages/tokens/css/theme.css` (полная замена содержимого)
- Modify: `packages/tokens/tokens.json`
- Modify: `apps/web/tailwind.config.ts:11-27`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1.1: Заменить `packages/tokens/css/theme.css` целиком на:**

```css
/* ═══════════════════════════════════════════════════
   ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ: цветовые токены (light / dark)
   Арт-директура «Сцена» (спек 2026-07-04): палитра от марки лого #7c5cff.
   Импортируется И приложением (apps/web), И Storybook (@kk/ui) —
   НЕ дублировать в globals.css. Контраст: AA минимум (4.5:1 текст).
   Радиусы — в сгенерированном tokens.css (из tokens.json).
   --color-hot — дозированный акцент (скидки/горячие бейджи), НЕ для кнопок.
   ═══════════════════════════════════════════════════ */

:root {
  color-scheme: light;

  /* ─── Переходные mood-токены (используются инлайн на главной,
     dlya-biznesa, gotovye-resheniya; удаляются в Task 5-6) ─── */
  --warm-bg:     #fff7ed;
  --warm-fg:     #2a1606;
  --warm-muted:  #7c5b3f;
  --warm-accent: #9a3412;
  --warm-soft:   #ffe7ce;
  --night-bg:    #171226;
  --night-fg:    #f2effc;
  --night-muted: #a89fd0;
  --night-accent:#9d8bf0;
  --night-soft:  #221a38;

  /* ─── Светлая тема: «дневная сцена» ─── */
  --color-page:         #f4f2fa;   /* лавандовая бумага */
  --color-bg:           #ffffff;   /* карточка */
  --color-surface:      #eceaf5;   /* чипы, подложки */
  --color-fg:           #1a1430;   /* 16.7:1 на bg ✓ AAA */
  --color-muted:        #e5e0f2;   /* тонкий фон */
  --color-muted-fg:     #5d5578;   /* 6.1:1 на bg ✓ AA+ */
  --color-border:       #d9d3ea;   /* hairline */
  --color-primary:      #4c30b8;   /* ссылки/акцент-текст: 8.0:1 на bg ✓ AAA */
  --color-primary-fg:   #ffffff;
  --color-primary-soft: #e9e4fb;
  --color-accent:       #4c30b8;
  --color-accent-fg:    #35208c;
  --color-accent-soft:  #e9e4fb;
  --color-cta:          #6742e8;   /* кнопки: белый текст 5.0:1 ✓ AA */
  --color-cta-fg:       #ffffff;
  --color-hot:          #d6296b;   /* 5.2:1 на bg ✓ AA */
  --color-scene:        #f0eef8;   /* сцена-подложка фото товара */
}

/* ─── Тёмная тема (по умолчанию): «ночь концерта» ─── */
.dark {
  color-scheme: dark;

  --night-bg:    #171226;
  --night-soft:  #221a38;

  --color-page:         #0b0913;   /* фиолетово-чёрная сцена */
  --color-bg:           #171226;   /* карточка */
  --color-surface:      #221a38;   /* чипы, подложки */
  --color-fg:           #f2effc;   /* 17.4:1 на bg ✓ AAA */
  --color-muted:        #141021;   /* тонкий фон */
  --color-muted-fg:     #a89fd0;   /* 7.6:1 на bg ✓ AAA */
  --color-border:       #2c2347;   /* hairline */
  --color-primary:      #9d8bf0;   /* ссылки/акцент-текст: 6.6:1 на bg ✓ AA+ */
  --color-primary-fg:   #170f38;
  --color-primary-soft: #251c44;
  --color-accent:       #9d8bf0;
  --color-accent-fg:    #c9c2e8;
  --color-accent-soft:  #251c44;
  --color-cta:          #7c5cff;   /* марка лого; белый текст 4.9:1 ✓ AA */
  --color-cta-fg:       #ffffff;
  --color-hot:          #ff5c8a;   /* 6.4:1 на bg ✓ AA+ */
  --color-scene:        #1f1832;   /* сцена-подложка фото товара */
}
```

Примечания: блоки `.mood-warm`/`.mood-night` УДАЛЯЮТСЯ (использований `<Mood>` нет с 2026-06-23; `grep -rn "mood-" apps/web/src` для контроля — допустимы только упоминания в комментариях). `--warm-*`/`--night-*` оставлены переходно и переведены на фиолетовые значения night — бенто главной сразу попадает в директуру.

- [ ] **Step 1.2: `packages/tokens/tokens.json` — радиусы по спеку** (кнопки/поля 10px, карточки 12px):

```json
{
  "_comment": "Цвета НЕ здесь — единый источник цвета в css/theme.css (light/dark, импортируется и приложением, и Storybook). В tokens.json — только не-цветовые токены (радиусы).",
  "radius": {
    "sm": { "value": "6px" },
    "md": { "value": "8px" },
    "lg": { "value": "10px" },
    "xl": { "value": "12px" }
  }
}
```

Затем: `npm run tokens` (пересборка `css/tokens.css`).

- [ ] **Step 1.3: `apps/web/tailwind.config.ts` — добавить в `colors`:**

```ts
        hot: "var(--color-hot)",
        scene: "var(--color-scene)",
```

(после строки `surface: "var(--color-surface)",`; остальной маппинг не трогать).

- [ ] **Step 1.4: `apps/web/src/app/globals.css` — убрать тени-«клей» и градиенты карточек, добавить приём подсветки.** Заменить блоки `.bg-background` / `.dark .bg-background` / `.dark [style*="--night-bg"]` на:

```css
/* «Сцена»: поверхности разделяются цветом + hairline, без теней и градиентов */
.bg-background {
  border: 1px solid var(--color-border);
}

/* ─── Фирменный приём: «подсветка строки» (karaoke line) ───
   SSR/без JS: заливка видна сразу (background-size 100%).
   С JS: HighlightLine добавляет .hl-armed (0%) при монтировании,
   затем .hl-on в вьюпорте — заливка едет слева направо. */
.hl {
  background-image: linear-gradient(var(--color-cta), var(--color-cta));
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: var(--color-cta-fg);
  padding: 0.02em 0.18em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.hl.hl-armed { background-size: 0% 100%; color: var(--color-fg); }
.hl.hl-armed.hl-on {
  background-size: 100% 100%;
  color: var(--color-cta-fg);
  transition: background-size 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s 0.25s;
}
@media (prefers-reduced-motion: reduce) {
  .hl.hl-armed { background-size: 100% 100%; color: var(--color-cta-fg); }
  .hl.hl-armed.hl-on { transition: none; }
}

/* Строка-тикер фактов (вместо pill-чипов) */
.ticker {
  letter-spacing: 0.12em;
  text-transform: none;
  font-size: 0.75rem;
  color: var(--color-muted-fg);
  border-top: 1px solid var(--color-border);
  padding-top: 0.625rem;
}
```

`body`, `h1-h3`, `kkFadeUp` — не трогать.

- [ ] **Step 1.5: Сборка и тесты**

```bash
npm run tokens && npm run build -w web && npm test -w web && npm test -w @kk/ui
```

Expected: build чистый, 24+2 зелёные.

- [ ] **Step 1.6: Превью обеих тем.** Reload :4321. Dark: страница `#0b0913`, карточки `#171226` c hairline, кнопки фиолетовые. Light: бумага `#f4f2fa`, кнопки `#6742e8`. Проверить главную, каталог, товар, checkout. Известные остатки (уйдут в Task 3–6): чипы, счётчики, сток, белые фото-плашки.

- [ ] **Step 1.7: Контраст-чек** (ручной, по парам из theme.css): `#9d8bf0/#171226`, `#a89fd0/#171226`, `#fff/#7c5cff`, `#4c30b8/#fff`, `#fff/#6742e8`, `#d6296b/#fff` — все ≥ 4.5 (значения в комментариях файла).

- [ ] **Step 1.8: Коммит + HANDOFF + пуш + CI**

```bash
git -C ~/Desktop/karaokeshop add packages/tokens apps/web/tailwind.config.ts apps/web/src/app/globals.css docs/HANDOFF.md
git -C ~/Desktop/karaokeshop commit -m "feat(tokens): палитра «Сцена» — фиолет от марки лого, hot/scene токены, радиусы 10/12, без теней-клея"
git -C ~/Desktop/karaokeshop push origin main && gh run list --repo airginggger-collab/Karaokeshop --limit 1
```

---

### Task 2: Шелл и UI-кит (HighlightLine, Header, Footer, Button)

**Files:**
- Create: `apps/web/src/components/HighlightLine.tsx`
- Modify: `packages/ui/src/Button.tsx:14-17`
- Modify: `apps/web/src/components/Header.tsx` (лого-строка не трогать; активный пункт nav)
- Modify: `apps/web/src/components/Footer.tsx` (тикер)
- Modify: `apps/web/src/components/MobileNav.tsx` (активный пункт)

- [ ] **Step 2.1: `HighlightLine.tsx`** (паттерн CountUp: SSR отдаёт финал, JS анимирует):

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

/** «Подсветка строки» как в караоке: заливка слева направо при появлении.
    SSR/без JS — сразу залито (класс .hl). Уважает prefers-reduced-motion (CSS). */
export function HighlightLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["hl", armed && "hl-armed", on && "hl-on", className].filter(Boolean).join(" ");
  return (
    <span ref={ref} className={cls}>
      {children}
    </span>
  );
}
```

- [ ] **Step 2.2: `Button.tsx`** — variants без теней, радиус токенный:

```tsx
const byVariant: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-cta text-cta-fg hover:brightness-110 active:brightness-95 active:scale-[.98]",
  ghost: "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary active:scale-[.98]",
};
```

и в базовых классах `rounded-lg` остаётся (теперь = 10px из tokens.json). `npm test -w @kk/ui` — 2 зелёных (снапшотов нет, тесты поведенческие).

- [ ] **Step 2.3: Header** — активный пункт nav: заменить `border-b-2 border-primary` на подсветку `.hl` (статичную):

```tsx
className={isActive ? "hl rounded-[4px] text-sm font-medium" : "text-sm text-muted-foreground transition hover:text-foreground"}
```

(точную текущую разметку прочитать в файле; марку лого `#7c5cff` НЕ трогать). В MobileNav активный пункт аналогично: `hl rounded-[4px]` вместо `bg-primary/10 text-primary`.

- [ ] **Step 2.4: Footer** — над колонками добавить тикер:

```tsx
<p className="ticker">
  официальный дилер AST · Studio Evolution · Алматы · монтаж под ключ · 2 года гарантии
</p>
```

и удалить бейджи-пилюли брендов (если остались от 2026-06-23).

- [ ] **Step 2.5: build + тесты + превью обеих тем** (активная навигация подсвечена заливкой; футер с тикером; кнопки без теней).

- [ ] **Step 2.6: Коммит + HANDOFF + пуш + CI** — `feat(shell): HighlightLine, активный пункт nav подсветкой, тикер в футере, Button без теней`.

---

### Task 3: Главная — пересборка по спеку

**Files:**
- Modify: `apps/web/src/app/page.tsx` (крупная правка)
- Modify: `apps/web/src/components/QuizWidget.tsx` (только обёртка/классы, механика не меняется)
- Delete: использования `CountUp`, чипов, стока на главной

Перед правкой прочитать `page.tsx` целиком. Порядок секций сохраняется (спек): hero-квиз → 01 Как работаем → 02 На чём собираем → 03 Доверие → 04 Разделы → финальный CTA.

- [ ] **Step 3.1: Hero.** Удалить: бейдж со sparkle-иконкой, ряд из 4 pill-чипов, `<img src="/scenariy/poyushchie.jpg">`. Новый hero (асимметрия: заголовок на 7/12, квиз перекрывает фото-колонку):

```tsx
<section className="pt-10 lg:pt-16">
  <p className="ticker max-w-md">официальный дилер AST · Studio Evolution · Алматы</p>
  <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
    Караоке-вечер <HighlightLine>у тебя дома</HighlightLine>
  </h1>
  <p className="mt-5 max-w-xl text-lg text-muted-foreground">
    Бесплатный подбор под площадь и бюджет — за минуту. Дальше смета, монтаж, настройка и гарантия под ключ.
  </p>
  <div className="mt-10 grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7"><QuizWidget /></div>
    <div className="hidden lg:flex lg:col-span-5 items-center justify-center rounded-xl bg-scene">
      <span className="font-display text-2xl font-medium text-primary/40">AST · EVOBOX</span>
    </div>
  </div>
</section>
```

(типографический плейсхолдер вместо стока — до реальных фото заказчика).

- [ ] **Step 3.2: Заголовки секций** — единый паттерн с нумерацией (иконки-кружки удалить):

```tsx
<div className="flex items-baseline gap-4">
  <span className="font-display text-sm font-bold text-primary/40">01</span>
  <h2 className="font-display text-2xl font-bold sm:text-3xl">Как мы <HighlightLine>работаем</HighlightLine></h2>
</div>
```

Подсветку в h2 — только у 1–2 секций (не у каждой).

- [ ] **Step 3.3: Убрать CountUp и trust-счётчики** (блок «14+ лет · 200+ · 60 000+» с анимацией): импорт `CountUp` с главной удалить, цифры перенести строкой в тикер финального CTA. Секция «Клиенты о нас» (3 выдуманных отзыва) и `ClientLogos` — закомментировать не надо: обернуть флагом и скрыть:

```tsx
const SHOW_UNVERIFIED_SOCIAL_PROOF = false; // включить после реальных отзывов/лого от заказчика
{SHOW_UNVERIFIED_SOCIAL_PROOF && ( /* существующие секции отзывов и логотипов */ )}
```

- [ ] **Step 3.4: Секция «Дом и бизнес»** (фото dom.jpg/biznes.jpg) — заменить фото на `bg-scene`-плашки с подписью сценария; инлайн `--warm-*`/`--night-*` стили в бенто заменить на токен-классы (`bg-background`, `text-primary` и т.д.).

- [ ] **Step 3.5: Финальный CTA** — тёмная сцена в ОБЕИХ темах не нужна: обычный `bg-background` блок с h2-подсветкой, зелёной WhatsApp-кнопкой и ghost «Каталог». Один WhatsApp-CTA на вьюпорт (WhatsAppFAB учитывается — в hero зелёной кнопки нет).

- [ ] **Step 3.6: build + 24 теста + превью обеих тем + мобильный вьюпорт** (preview_resize mobile: hero читается, квиз работает, тач-зоны ≥44px).

- [ ] **Step 3.7: Коммит + HANDOFF + пуш + CI** — `feat(главная): hero «Сцена» с подсветкой строки, секции 01–04, без чипов/счётчиков/стока; соцдоказательство скрыто до реальных данных`.

---

### Task 4: Каталог и страница товара

**Files:**
- Modify: `apps/web/src/components/CatalogClient.tsx` (чипы→табы)
- Modify: `apps/web/src/components/ProductCard.tsx`
- Modify: `apps/web/src/components/ProductImage.tsx`
- Modify: `apps/web/src/app/product/[slug]/page.tsx`
- Modify: `apps/web/src/components/ProductStickyBar.tsx` (только классы)

- [ ] **Step 4.1: ProductImage** — фото-зона: `bg-scene` подложка с паддингом (`p-6`), `object-contain`; плейсхолдер без фото — имя модели в `font-display text-primary/40` на `bg-scene` (вместо серого градиента).

- [ ] **Step 4.2: ProductCard** — hairline-карточка: `rounded-xl border border-border bg-background` (класс `bg-background` уже даёт бордер из globals — не дублировать), цена `text-primary font-semibold`, бейдж скидки `bg-hot text-white`, сценарий-лейбл `text-xs text-muted-foreground` (не пилюля). Ховер: `hover:[&_h3]:text-primary` вместо подъёма/тени.

- [ ] **Step 4.3: CatalogClient** — фильтры-чипы заменить на табы:

```tsx
<button
  onClick={() => setType(t.value)}
  className={
    type === t.value
      ? "hl rounded-[4px] px-3 py-1.5 text-sm font-medium"
      : "px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
  }
>
  {t.label}
</button>
```

Поиск-инпут: `rounded-lg border border-border bg-background`.

- [ ] **Step 4.4: product/[slug]** — иерархия CTA сверху вниз: WhatsApp (зелёная, как есть) → AddToCart (`bg-cta text-cta-fg`) → консультация (ghost). Строку рейтинга обернуть тем же флагом:

```tsx
const SHOW_UNVERIFIED_RATINGS = false; // включить после реальных отзывов
{SHOW_UNVERIFIED_RATINGS && p.rating && ( /* строка 4.9 · N отзывов */ )}
```

`productJsonLd`: НЕ передавать `rating`/`reviewsCount`, пока флаг false (фейковые агрегаты в разметке — риск санкций Google; данные в `site.ts` не удалять).

- [ ] **Step 4.5: build + тесты + превью** (каталог: табы, карточки, dark/light; товар: подложка фото, порядок CTA, рейтинга нет; sticky-бар на мобиле не перекрывает контент).

- [ ] **Step 4.6: Коммит + HANDOFF + пуш + CI** — `feat(каталог,товар): hairline-карточки, сцена-подложка фото, табы фильтров, иерархия CTA; фейковый рейтинг скрыт (и из JSON-LD)`.

---

### Task 5: Лендинги ×6 — миграция mood-инлайнов и стока

**Files:**
- Modify: `apps/web/src/app/dlya-doma/page.tsx`, `dlya-biznesa/page.tsx`, `pod-klyuch/page.tsx`, `gotovye-resheniya/page.tsx`, `komplekty/page.tsx`, `komplekty/[area]/page.tsx`, `karaoke/[scenario]/page.tsx`, `sravnenie/page.tsx`, `brand/[slug]/page.tsx`
- Modify: `apps/web/src/components/LandingPage.tsx`, `AreaCalculator.tsx`, `BundleTiers.tsx` (классы)
- Delete: `apps/web/public/scenariy/` (3 jpg)

- [ ] **Step 5.1: Механическая миграция инлайн-стилей.** В каждом файле из списка: `style={{ background: "var(--night-bg)" }}` и аналоги → токен-классы (`bg-background` / `bg-surface`); `var(--night-accent)`/`var(--warm-accent)` в тексте → `text-primary`; градиенты hero (`linear-gradient(180deg,#1b2438,#0e131c)` и `from-white to-[#eeeeec]` и т.п.) → сплошной `bg-page` + hairline-карточка. `text-[#5b6675]` в dlya-doma → `text-muted-foreground`.

- [ ] **Step 5.2: Сток.** `git rm apps/web/public/scenariy/*.jpg`; ссылки на них (dlya-doma, dlya-biznesa hero, секция главной — если не убрана в Task 3) → `bg-scene` плейсхолдер-плашки как в Step 3.1. Счётчик CountUp на dlya-doma («60 000+») и dlya-biznesa («200+») — статичный текст в тикере страницы.

- [ ] **Step 5.3: h1 каждого лендинга** — одна `<HighlightLine>` на ключевом слове; pill-чипы под hero (если есть) → тикер.

- [ ] **Step 5.4: build + тесты + превью выборочно** (dlya-doma, pod-klyuch, komplekty/do-30, sravnenie — обе темы): нет островов старых цветов, нет 404 на удалённые jpg (`grep -rn "scenariy" apps/web/src` = 0).

- [ ] **Step 5.5: Коммит + HANDOFF + пуш + CI** — `feat(лендинги): миграция на токены «Сцены», сток удалён, подсветка в hero, тикеры вместо чипов`.

---

### Task 6: Финал — блог/служебные, удаление переходных токенов, правила

**Files:**
- Modify: `apps/web/src/app/blog/page.tsx`, `blog/[slug]/page.tsx`, `kontakty`, `servis`, `o-nas`, `pesni`, `kalkulyator`, `checkout`, `keysy`, `not-found.tsx` (точечные классы)
- Modify: `apps/web/src/components/HeroWave.tsx` → Delete (орбы-градиенты запрещены спеком)
- Modify: `packages/tokens/css/theme.css` (удалить `--warm-*`/`--night-*`)
- Modify: `/CLAUDE.md` (анти-AI правила), `docs/HANDOFF.md` (блок «Текущий облик»)

- [ ] **Step 6.1:** `grep -rn "HeroWave" apps/web/src` — удалить компонент и использования (если остались после Task 3).
- [ ] **Step 6.2:** `grep -rn -- "--warm-\|--night-" apps/web/src packages` — мигрировать остатки, затем удалить блок переходных токенов из `theme.css`.
- [ ] **Step 6.3:** Финальный grep хардкодов: `grep -rn "text-\[#\|bg-\[#\|from-\[#\|to-\[#" apps/web/src packages/ui/src` — допустимы ТОЛЬКО `#25D366`/`#1ebe5d` (WhatsApp) и `#7c5cff` (марка в Header). Остальное — мигрировать.
- [ ] **Step 6.4:** Блог и служебные: выборочный превью-проход (blog, статья, kontakty, checkout, 404) в обеих темах, поправить выпадающие места токен-классами.
- [ ] **Step 6.5:** `/CLAUDE.md`: в «UI-конвенции» добавить раздел «Анти-AI правила («Сцена»)» — 9 правил из спека (чипы, CountUp, сетки с иконками, тени, сток, белые плашки, асимметрия, один WhatsApp-CTA, motion). `docs/HANDOFF.md`: переписать блок «Текущий облик» под «Сцену».
- [ ] **Step 6.6:** Полная проверка: `npm run build -w web && npm test -w web && npm test -w @kk/ui`, превью-обход всех типов страниц (главная/каталог/товар/лендинг/блог/checkout/404) в обеих темах + мобильный вьюпорт. Критерии приёмки из спека — по чек-листу.
- [ ] **Step 6.7: Коммит + пуш + CI** — `feat(design): финал «Сцены» — служебные страницы, удалены warm/night и HeroWave, анти-AI правила в CLAUDE.md`. Затем `curl -s https://karaokeshop.airg-inggger.workers.dev/ | grep -o '#0b0913' | head -1` — прод в новой палитре.

---

## Self-review (пройден)

- Покрытие спека: токены (T1), подсветка/шелл (T2), главная (T3), каталог/товар (T4), лендинги+сток (T5), блог/служебные+чистка+правила (T6). JSON-LD-рейтинг — T4.4. Критерии приёмки — T6.6.
- Против спека: «финальный CTA — тёмная сцена» смягчён до токен-блока (T3.5) — форс тёмного в светлой теме повторил бы баг Mood-обёрток (HANDOFF 2026-06-23); отступление зафиксировано здесь.
- Типы/имена сквозные: `HighlightLine`, классы `.hl/.hl-armed/.hl-on`, токены `hot`/`scene`, флаги `SHOW_UNVERIFIED_*`.
