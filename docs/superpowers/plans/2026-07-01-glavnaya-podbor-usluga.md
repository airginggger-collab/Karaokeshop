# Главная как «подбор-как-услуга» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать главную (`apps/web/src/app/page.tsx`) так, чтобы первый экран продавал экспертный подбор под ключ через квиз, а квиз выдавал мгновенный результат с ориентиром цены.

**Architecture:** Мэппинг ответов квиза → вход калькулятора (новый чистый модуль `lib/quiz.ts`, покрыт тестами). `QuizWidget` расширяется инлайн-результатом на базе существующей `configureWithinBudget` (без дублирования логики). `page.tsx` переупорядочивается: hero=квиз → услуга → доверие → оборудование → разделы → финальный CTA. `Hero.tsx` не трогаем (он не используется на главной — hero встроен в `page.tsx`).

**Tech Stack:** Next.js 15 (App Router, static export), React 19, TypeScript strict, Tailwind на токенах, Vitest.

**Спек:** [docs/superpowers/specs/2026-07-01-glavnaya-podbor-usluga-design.md](../specs/2026-07-01-glavnaya-podbor-usluga-design.md)

**Проверка после каждой задачи:** `npm run build -w web` (чистая статика) + `npm test -w web` (зелёные). Автор коммитов — `airginggger-collab`, push по SSH в `main` сразу после коммита (правило репо), в том же коммите — обновление `docs/HANDOFF.md`.

---

## Справка по переиспользуемой логике (не менять)

`apps/web/src/lib/calculator.ts`:
- `type CalcInput = { area: number; venueType: string; mics: number; light: boolean; sub: boolean }`
- `configureWithinBudget(input: CalcInput, budget: number): { calc: Calc; fits: boolean; trimmed: string[] }`
- `Calc = { base: string; area: number; lines: Line[]; total: number }`; `calc.lines[0]` — базовая система (`{ name, qty, price, subtotal, hint? }`).

`apps/web/src/lib/site.ts`: `priceFmt(n: number): string`, `siteConfig.whatsapp`.

Опции квиза (в `QuizWidget.tsx`, не менять тексты):
- Q1: `"Дом / квартира"`, `"Баня или гостевой дом"`, `"Кафе или ресторан"`, `"Бар или клуб"`
- Q2: `"до 30 м²"`, `"30–80 м²"`, `"80–150 м²"`, `"150 м² и больше"`
- Q3: `"до 800 000 ₸"`, `"800 000 – 1 500 000 ₸"`, `"1 500 000 – 3 000 000 ₸"`, `"Обсуждаем"`

---

## Task 1: Мэппинг ответов квиза → вход калькулятора (`lib/quiz.ts`)

**Files:**
- Create: `apps/web/src/lib/quiz.ts`
- Test: `apps/web/src/lib/quiz.test.ts`

- [ ] **Step 1: Написать падающий тест**

`apps/web/src/lib/quiz.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { quizToInput, quizBudget } from "./quiz";

describe("quizToInput", () => {
  it("маппит площадь в представительное значение и включает саб от 50 м²", () => {
    expect(quizToInput(["Дом / квартира", "до 30 м²", "до 800 000 ₸"]).area).toBe(25);
    const bar = quizToInput(["Бар или клуб", "80–150 м²", "Обсуждаем"]);
    expect(bar.area).toBe(110);
    expect(bar.sub).toBe(true);   // area >= 50
    expect(bar.mics).toBe(4);
    expect(bar.light).toBe(true);
  });

  it("дом маленькой площади — без саба", () => {
    expect(quizToInput(["Дом / квартира", "до 30 м²", "до 800 000 ₸"]).sub).toBe(false);
  });

  it("неизвестный ответ — безопасный дефолт (55 м²)", () => {
    expect(quizToInput(["?", "?", "?"]).area).toBe(55);
  });
});

describe("quizBudget", () => {
  it("маппит бюджет; «Обсуждаем» — без ограничения", () => {
    expect(quizBudget(["Дом / квартира", "до 30 м²", "до 800 000 ₸"])).toBe(800000);
    expect(quizBudget(["Бар или клуб", "80–150 м²", "Обсуждаем"])).toBe(Infinity);
  });
});
```

- [ ] **Step 2: Запустить тест — убедиться, что падает**

Run: `cd ~/Desktop/karaokeshop && npx vitest run apps/web/src/lib/quiz.test.ts`
Expected: FAIL — `Cannot find module './quiz'`.

- [ ] **Step 3: Реализовать `lib/quiz.ts`**

`apps/web/src/lib/quiz.ts`:
```ts
import type { CalcInput } from "./calculator";

const AREA_BY_ANSWER: Record<string, number> = {
  "до 30 м²": 25,
  "30–80 м²": 55,
  "80–150 м²": 110,
  "150 м² и больше": 170,
};

const BUDGET_BY_ANSWER: Record<string, number> = {
  "до 800 000 ₸": 800000,
  "800 000 – 1 500 000 ₸": 1500000,
  "1 500 000 – 3 000 000 ₸": 3000000,
  "Обсуждаем": Infinity,
};

const VENUE_BY_ANSWER: Record<string, string> = {
  "Дом / квартира": "Дом",
  "Баня или гостевой дом": "Дом",
  "Кафе или ресторан": "Кафе",
  "Бар или клуб": "Бар / клуб",
};

/** answers = [место, площадь, бюджет] из QuizWidget. */
export function quizToInput(answers: string[]): CalcInput {
  const area = AREA_BY_ANSWER[answers[1]] ?? 55;
  return {
    area,
    venueType: VENUE_BY_ANSWER[answers[0]] ?? "Заведение",
    mics: 4,
    light: true,
    sub: area >= 50,
  };
}

export function quizBudget(answers: string[]): number {
  return BUDGET_BY_ANSWER[answers[2]] ?? Infinity;
}
```

- [ ] **Step 4: Запустить тест — убедиться, что проходит**

Run: `npx vitest run apps/web/src/lib/quiz.test.ts`
Expected: PASS (5 assertions в 3 тестах).

- [ ] **Step 5: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/lib/quiz.ts apps/web/src/lib/quiz.test.ts
git -C ~/Desktop/karaokeshop commit -m "feat(quiz): маппинг ответов квиза → вход калькулятора (lib/quiz)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```

---

## Task 2: `QuizWidget` — инлайн-результат вместо мгновенного WhatsApp

**Files:**
- Modify: `apps/web/src/components/QuizWidget.tsx`

Цель: после 3-го ответа не открывать сразу WhatsApp, а показать карточку результата (рекомендованная система + ориентир цены + заметка о тримминге/превышении), с кнопками «Заявка в WhatsApp», «Открыть полную смету» (`/kalkulyator`) и «Пройти заново».

- [ ] **Step 1: Обновить импорты и убрать авто-открытие WhatsApp в `choose`**

В `apps/web/src/components/QuizWidget.tsx` заменить блок импортов (строки 1–5) на:
```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, MessageCircle, Check } from "lucide-react";
import { siteConfig, priceFmt } from "@/lib/site";
import { configureWithinBudget } from "@/lib/calculator";
import { quizToInput, quizBudget } from "@/lib/quiz";
```

Заменить функцию `choose` (текущие строки 29–45) на:
```tsx
  function choose(option: string) {
    const next = [...answers, option];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true); // результат покажем инлайн, WhatsApp — по кнопке
    }
  }
```

- [ ] **Step 2: Добавить вычисление результата и WhatsApp-текст перед `return`**

Сразу после строки `const current = steps[step];` добавить:
```tsx
  const result = done && answers.length === steps.length
    ? configureWithinBudget(quizToInput(answers), quizBudget(answers))
    : null;

  const waText = result
    ? [
        "Здравствуйте! Подбираю систему по результатам квиза:",
        `— ${steps[0].question} ${answers[0]}`,
        `— ${steps[1].question} ${answers[1]}`,
        `— ${steps[2].question} ${answers[2]}`,
        `Рекомендация: ${result.calc.lines[0].name}, ориентир ${priceFmt(result.calc.total)}.`,
        "Уточните, пожалуйста, смету.",
      ].join("\n")
    : "";
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waText)}`;
```

- [ ] **Step 3: Заменить ветку `done` на карточку результата**

Заменить текущий JSX-блок `done ? ( … ) : (` (строки 68–75, до `<>` ветки с вопросами) — то есть содержимое между `{done ? (` и `) : (` — на:
```tsx
      {done && result ? (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-fg">
              <Check className="h-4 w-4" />
            </span>
            <p className="font-display text-lg font-semibold">Готово — вот ориентир</p>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Рекомендуемая база
            </p>
            <p className="mt-1 font-medium">{result.calc.lines[0].name}</p>
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm text-muted-foreground">Ориентир под ключ</span>
              <span className="font-display text-2xl font-bold text-primary">{priceFmt(result.calc.total)}</span>
            </div>
            {result.trimmed.length > 0 && result.fits && (
              <p className="mt-2 text-xs text-muted-foreground">
                Под ваш бюджет: без {result.trimmed.join(", ")}.
              </p>
            )}
            {!result.fits && (
              <p className="mt-2 text-xs text-muted-foreground">
                Минимальный комплект под {result.calc.area} м² дороже выбранного бюджета — это ориентир, точную смету подберём по проекту.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" /> Заявка в WhatsApp
            </a>
            <Link
              href="/kalkulyator"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-border py-3 text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              Открыть полную смету
            </Link>
          </div>

          <button onClick={reset} className="mt-3 text-sm text-primary hover:underline">
            Пройти заново
          </button>
        </div>
      ) : (
```

(Ветка вопросов `<> … </>` и закрывающие теги остаются без изменений.)

- [ ] **Step 4: Проверить типы и сборку**

Run: `cd ~/Desktop/karaokeshop && cd apps/web && npx tsc --noEmit`
Expected: exit 0 (нет ошибок типов).

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка успешна, статика в `apps/web/out`.

- [ ] **Step 5: Ручная проверка результата в превью**

Run (если превью не запущено): `npx serve apps/web/out -l 4321` (или через preview_start), открыть `/` со старой главной (квиз внизу) либо временно проверить компонент. Пройти 3 шага квиза → должна появиться карточка с названием системы, ценой-ориентиром и кнопками. Кнопка WhatsApp формирует текст с рекомендацией; «Открыть полную смету» ведёт на `/kalkulyator`.

- [ ] **Step 6: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/components/QuizWidget.tsx
git -C ~/Desktop/karaokeshop commit -m "feat(quiz): инлайн-результат с ориентиром цены (configureWithinBudget)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```

---

## Task 3: Новый hero главной — квиз в первом экране

**Files:**
- Modify: `apps/web/src/app/page.tsx` (bento-грид 31–164 → новый hero; удалить отдельную квиз-секцию 411–418 и «С чего начать» 228–281)

- [ ] **Step 1: Заменить bento-грид на hero-квиз**

Заменить весь блок `<div className="grid animate-fade-up …"> … </div>` с hero и 6 плитками (текущие строки 31–164, от `{/* Hero — ночное настроение, эмоция */}` внутри grid до закрывающего `</div>` грида на строке 164) на:
```tsx
      {/* Hero — квиз-подбор (услуга во главе) */}
      <section className="animate-fade-up">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Официальный дилер AST и Studio Evolution · 14 лет
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
          Караоке без ошибки в выборе
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Бесплатный подбор под вашу площадь и бюджет — за минуту. Дальше смета, монтаж, настройка и гарантия под ключ.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Официальный дилер", "14+ лет", "200+ проектов", "Монтаж под ключ"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <QuizWidget />
        </div>
      </section>
```

- [ ] **Step 2: Удалить отдельную квиз-секцию (квиз теперь в hero)**

Удалить блок `{/* Квиз-подборщик */}` целиком — `<section className="mt-12"> … <QuizWidget /> … </section>` (текущие строки 411–418).

- [ ] **Step 3: Удалить «Ценовые уровни» (растворяется в результате квиза)**

Удалить блок `{/* Ценовые уровни */}` целиком — `<section className="mt-12"> … «С чего начать» … </section>` (текущие строки 228–281).

- [ ] **Step 4: Собрать — починить неиспользуемые импорты**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка может упасть на неиспользуемых импортах. Удалить из `page.tsx` (строки 7–20) те, что больше не используются после Шагов 1–3: `HeroWave`, `LottieHero` (были только в bento-hero), и любые иконки из `lucide-react`, на которые ESLint/TS ругается как unused (`Home`, `Building2`, `CalendarClock`, `ShieldCheck`, `Wrench` использовались в удалённых плитках). Оставить те, что ещё используются ниже (`ArrowRight`, `Sparkles`, `MapPin`). После правки импортов — пересобрать до чистого прохода.

Expected после правки: сборка успешна.

- [ ] **Step 5: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/app/page.tsx
git -C ~/Desktop/karaokeshop commit -m "feat(home): hero = квиз-подбор; убрать bento-hero, отдельный квиз и ценовые уровни

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```

---

## Task 4: Переупорядочить секции под целевую структуру

**Files:**
- Modify: `apps/web/src/app/page.tsx`

Целевой порядок секций после hero (Task 3):
1. Hero = Квиз (готово)
2. **Как мы работаем** (услуга) — `{/* Как мы работаем */}`
3. **Доверие/экспертиза**: `{/* Дилерская полоса */}` → `{/* Trust-блок: 4 цифры */}` → `<ClientLogos />` → `{/* Отзывы */}` → `Почему karaokeshop`
4. **Оборудование** (компактно) — `{/* Оборудование — editorial 2×2 */}`
5. **Разделы** — `{/* Nav sections */}`
6. **Финальный CTA** (новый)

- [ ] **Step 1: Переместить блоки в целевой порядок**

Переставить существующие JSX-блоки (не меняя их внутренности) так, чтобы порядок внутри `<Container>` был: hero-квиз → `{/* Как мы работаем */}` → `{/* Дилерская полоса */}` → `{/* Trust-блок: 4 цифры */}` → `<ClientLogos />` → `{/* Отзывы */}` → `Почему karaokeshop` (`<section>` со строк 480–495) → `{/* Оборудование — editorial 2×2 */}` → `{/* Nav sections */}`. Блоки идентифицируются по комментам-маркерам.

- [ ] **Step 2: Ужать заголовок блока оборудования (доказательство, не витрина)**

В блоке `{/* Оборудование — editorial 2×2 */}` заменить `<h2>Популярное оборудование</h2>` на:
```tsx
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">На чём собираем</h2>
```
и подзаголовок-строку добавить сразу под `<div className="flex items-end justify-between">…</div>` не требуется — оставить как есть (ссылка «Весь каталог» сохраняется).

- [ ] **Step 3: Добавить финальный CTA в самый низ (перед закрытием `</Container>`)**

Перед закрывающим `</Container>` (текущая строка 496) добавить:
```tsx
      {/* Финальный CTA */}
      <section className="mt-12 rounded-3xl bg-primary-soft p-8 text-center">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Подберём за минуту — бесплатно</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Пройдите квиз выше или напишите нам — ответим и предложим то, что реально подходит под вашу задачу и бюджет.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
          >
            Написать в WhatsApp
          </a>
          <Link href="/kalkulyator" className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-medium transition hover:border-primary hover:text-primary">
            Открыть калькулятор
          </Link>
        </div>
      </section>
```

- [ ] **Step 4: Добавить импорт `siteConfig` в `page.tsx`**

В строке импорта из `@/lib/site` (текущая: `import { products, priceFmt } from "@/lib/site";`) добавить `siteConfig`:
```tsx
import { products, priceFmt, siteConfig } from "@/lib/site";
```

- [ ] **Step 5: Собрать и проверить**

Run: `cd ~/Desktop/karaokeshop && npm run build -w web`
Expected: сборка успешна, нет unused-импортов.

Run: `npm test -w web`
Expected: PASS (calculator 12 + seo 3 + quiz 3 = 18).

- [ ] **Step 6: Ручная проверка главной в превью**

Открыть `/` в превью (preview_start / `npx serve apps/web/out -l 4321`). Проверить порядок: hero-квиз первым; квиз проходится и даёт результат; ниже «Как мы работаем», доверие, оборудование, разделы, финальный CTA. Мобильный вьюпорт (375px): hero-квиз в один столбец, тач-зоны ≥44px, нет горизонтального скролла. Консоль без ошибок.

- [ ] **Step 7: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/app/page.tsx
git -C ~/Desktop/karaokeshop commit -m "feat(home): порядок секций под услугу + финальный CTA

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```

---

## Task 5: Финализация — HANDOFF + прод-проверка

**Files:**
- Modify: `docs/HANDOFF.md`

- [ ] **Step 1: Обновить HANDOFF**

В `docs/HANDOFF.md` добавить секцию «Сессия <дата> — главная под услугу»: что hero теперь квиз-подбор с инлайн-результатом (`configureWithinBudget`), новый `lib/quiz.ts` (маппинг + тесты), порядок секций, счётчик тестов web 15→18. Обновить дату «Обновлено».

- [ ] **Step 2: Обновить счётчик тестов в CLAUDE.md**

В `CLAUDE.md` строку `# тесты web (Vitest): 15 (calculator 12 + seo 3)` заменить на `18 (calculator 12 + seo 3 + quiz 3)`.

- [ ] **Step 3: Коммит доков**

```bash
git -C ~/Desktop/karaokeshop add docs/HANDOFF.md CLAUDE.md
git -C ~/Desktop/karaokeshop commit -m "docs: главная под услугу — синк HANDOFF + счётчик тестов

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```

- [ ] **Step 4: Проверить прод после авто-деплоя**

Подождать CI (~4 мин), затем: `curl -s -o /dev/null -w "%{http_code}\n" https://karaokeshop.airg-inggger.workers.dev/` → 200. Открыть в браузере, пройти квиз, проверить результат и порядок секций на LIVE.

---

## Self-review (проверка плана против спека)

- **Позиционирование/структура** → Tasks 3–4 (hero=квиз, порядок секций). ✅
- **Hero A1 (квиз в первом экране, без тяжёлого визуала)** → Task 3 Step 1 (+ удаление `LottieHero`/`HeroWave`). ✅
- **Квиз Вариант 2 (инлайн-результат + ориентир + CTA)** → Task 2. ✅
- **Переиспользование `configureWithinBudget`** → Task 1 (маппинг) + Task 2. ✅
- **«Как мы работаем» выше, оборудование вниз как доказательство** → Task 4 Steps 1–2. ✅
- **Финальный CTA** → Task 4 Step 3. ✅
- **Фаза 2 (отдельная страница)** — вне скоупа плана, как в спеке. ✅
- Плейсхолдеров нет; имена функций консистентны (`quizToInput`/`quizBudget`, `configureWithinBudget`); все пути точные.
