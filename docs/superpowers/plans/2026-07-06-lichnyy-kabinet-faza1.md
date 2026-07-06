# Личный кабинет — Фаза 1 (контент в файлы) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Вынести весь контент из `apps/web/src/lib/site.ts` (TypeScript, ~880 строк) в файлы-коллекции `apps/web/content/*.json`; `site.ts` превращается в тонкий типизированный загрузчик. Поведение сайта идентично — чистый рефактор данных, фундамент под CMS (Фаза 2).

**Architecture:** Данные → JSON-файлы в `apps/web/content/`. `site.ts` импортирует JSON и ре-экспортирует под теми же именами/типами → ни одна из ~70 страниц-потребителей не меняется (контракт `site.ts` сохранён). Типы, `typeLabels`, `mainNav`, `allPaths()` остаются кодом в `site.ts` (это не контент). Тест контент-целостности (`site.test.ts`) фиксирует инварианты и счётчики — остаётся зелёным через все извлечения, ловя потерю/порчу данных.

**Tech Stack:** Next.js 15 `output:export` · TypeScript strict (`resolveJsonModule`) · Vitest (⚠️ include только `src/**/*.test.ts`).

**Решение по формату (уточнение спека):** в Фазе 1 ВСЕ коллекции — JSON (включая блог: `blog.json`). Формат `BlogPost` сохраняется как есть: `body: string[]` (массив абзацев), `faq: {q,a}[]` — переносятся VERBATIM, без конверсии в Markdown. Конверсия блога в `*.md`-файлы отложена в Фазу 2/3 (снижает риск Фазы 1: без новой зависимости-парсера и churn «файл-на-пост»; CMS-виджеты Фазы 2 работают и поверх JSON — `list` для абзацев/FAQ).

**Правила каждой задачи (CLAUDE.md):**
- `npm run build -w web` (+postbuild `check-redirects`) + `npm test -w web` + `npm test -w @kk/ui` (2) — зелёные. После Task 1 число web-тестов = 24 + 1 (integrity) = **25**.
- Git только `git -C ~/Desktop/karaokeshop …`. Коммит + `docs/HANDOFF.md` (строка в раздел сессии) в одном коммите, пуш в `main` сразу, затем `gh run list --repo airginggger-collab/Karaokeshop --limit 1` до `completed success`.
- **Извлечение данных — механический перенос VERBATIM:** значения из TS-массива копируются в JSON без изменений (только синтаксис: ключи в кавычки, убрать `as const`/комментарии/трейлинг-запятые, `undefined`-поля опустить). Никаких правок контента (цены, тексты, slug — как есть).
- Проверка после каждого извлечения: `git -C ~/Desktop/karaokeshop diff` по собранному HTML не нужен, но `npm run build` + integrity-тест обязаны быть зелёными — это и есть гарантия идентичности.

---

### Task 1: Сеть безопасности — тест контент-целостности

**Files:**
- Create: `apps/web/src/lib/site.test.ts`

Тест фиксирует публичный контракт `site.ts` ДО рефактора (зелёный против текущего кода). Он остаётся зелёным через все извлечения Task 2–5 — если извлечение потеряет элемент или испортит поле, тест падает.

- [ ] **Step 1.1: Написать тест**

```ts
import { describe, it, expect } from "vitest";
import {
  siteConfig, scenarios, bundles, brands, products, staticPages,
  songsSample, cases, blogPosts, storyPosts, songsTotal,
  oNasMeta, kontaktyMeta, sravnenieMeta, catalogMeta, podKlyuchMeta,
  komplektyIndexMeta, kalkulyatorMeta, pesniMeta, keysyMeta, blogMeta,
  dlyaDomaMetaV2, dlyaBiznesaMeta, gotovyeResheniyaMeta,
  type Landing,
} from "./site";

const uniq = (xs: string[]) => new Set(xs).size === xs.length;
const isLanding = (m: Landing) =>
  typeof m.slug === "string" && !!m.h1 && !!m.title && !!m.description;

describe("контент-целостность site.ts (контракт для Фазы 1)", () => {
  it("счётчики коллекций не меняются", () => {
    expect(products).toHaveLength(18);
    expect(scenarios).toHaveLength(5);
    expect(bundles).toHaveLength(4);
    expect(brands).toHaveLength(2);
    expect(staticPages).toHaveLength(1);
    expect(blogPosts).toHaveLength(26);
    expect(storyPosts).toHaveLength(8);
    expect(cases).toHaveLength(3);
    expect(songsSample).toHaveLength(8);
  });

  it("siteConfig — обязательные контакты на месте", () => {
    for (const k of ["name", "url", "phone", "whatsapp", "address", "email"] as const) {
      expect(typeof siteConfig[k]).toBe("string");
      expect((siteConfig[k] as string).length).toBeGreaterThan(0);
    }
    expect(songsTotal).toBe(60000);
  });

  it("товары: уникальные slug, цена — конечное число > 0, тип валиден", () => {
    expect(uniq(products.map((p) => p.slug))).toBe(true);
    const types = new Set(["sistema", "akustika", "mikrofon", "sub", "miksher"]);
    for (const p of products) {
      expect(Number.isFinite(p.price)).toBe(true);
      expect(p.price).toBeGreaterThan(0);
      expect(types.has(p.type)).toBe(true);
      expect(typeof p.model).toBe("string");
      expect(p.model.length).toBeGreaterThan(0);
      expect(typeof p.inStock).toBe("boolean");
    }
  });

  it("лендинги/бренды/мета — валидная форма Landing, уникальные slug", () => {
    for (const l of [...scenarios, ...bundles, ...staticPages]) expect(isLanding(l)).toBe(true);
    expect(uniq(scenarios.map((s) => s.slug))).toBe(true);
    expect(uniq(bundles.map((b) => b.slug))).toBe(true);
    expect(uniq(brands.map((b) => b.slug))).toBe(true);
    for (const m of [oNasMeta, kontaktyMeta, sravnenieMeta, catalogMeta, podKlyuchMeta,
      komplektyIndexMeta, kalkulyatorMeta, pesniMeta, keysyMeta, blogMeta,
      dlyaDomaMetaV2, dlyaBiznesaMeta, gotovyeResheniyaMeta]) {
      expect(isLanding(m)).toBe(true);
    }
  });

  it("блог: уникальные slug, есть заголовок и тело", () => {
    expect(uniq(blogPosts.map((p) => p.slug))).toBe(true);
    for (const p of blogPosts) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.body.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 1.2: Запустить — тест зелёный против текущего site.ts**

Run: `npm test -w web`
Expected: PASS, web-тестов стало 25 (было 24 + этот файл). Если счётчик не совпал (напр. blogPosts ≠ 26) — СТОП, свериться с реальным массивом, поправить ожидание под факт (данные — источник истины, не выдумывать).

- [ ] **Step 1.3: Коммит**

```bash
git -C ~/Desktop/karaokeshop add apps/web/src/lib/site.test.ts docs/HANDOFF.md
git -C ~/Desktop/karaokeshop commit -m "test(контент): сеть безопасности site.ts — инварианты и счётчики коллекций (Фаза 1 ЛК)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git -C ~/Desktop/karaokeshop push origin main
```
HANDOFF-строка: `- **ЛК Фаза 1, Task 1:** тест контент-целостности site.test.ts (счётчики+инварианты, web-тестов 24→25) — сеть безопасности под вынос контента.` После пуша — `gh run list` до success.

---

### Task 2: Конфиг + `siteConfig` + `songsTotal` (проверка паттерна загрузчика)

**Files:**
- Create: `apps/web/content/site-config.json`
- Modify: `apps/web/tsconfig.json` (если нет `resolveJsonModule`)
- Modify: `apps/web/src/lib/site.ts:1-13` (+ `205`)

Малый первый перенос — проверяет паттерн «JSON → загрузчик» на конфиге.

- [ ] **Step 2.1: Убедиться в `resolveJsonModule`**

Run: `grep -n resolveJsonModule apps/web/tsconfig.json`
Если пусто — добавить в `compilerOptions` `apps/web/tsconfig.json`: `"resolveJsonModule": true`. (Next обычно ставит сам; проверить.)

- [ ] **Step 2.2: Создать `apps/web/content/site-config.json`** — VERBATIM значения из `site.ts:1-13` + `songsTotal`:

```json
{
  "name": "karaokeshop",
  "url": "https://www.karaokeshop.kz",
  "city": "Алматы",
  "phone": "+7 707 579-99-95",
  "whatsapp": "77075799995",
  "address": "Алматы, ул. Муканова, офис 8",
  "hours": "Пн–Сб · 10:00–19:00",
  "email": "karaokeshop2015@gmail.com",
  "defaultTitle": "Караоке без ошибки в выборе — для дома и заведений | Алматы",
  "defaultDescription": "Официальный дилер AST и Studio Evolution в Казахстане. Подбор, монтаж и настройка под ключ. Шоурум в Алматы, с 2012.",
  "songsTotal": 60000
}
```

- [ ] **Step 2.3: Заменить в `site.ts`** блок `siteConfig` (строки 1-13) и `songsTotal` (205) на загрузчик. В начало файла:

```ts
import siteConfigData from "../../content/site-config.json";

export type SiteConfig = {
  name: string; url: string; city: string; phone: string; whatsapp: string;
  address: string; hours: string; email: string;
  defaultTitle: string; defaultDescription: string; songsTotal: number;
};
export const siteConfig: SiteConfig = siteConfigData;
export const songsTotal = siteConfig.songsTotal;
```
Удалить старое объявление `siteConfig … as const` и `export const songsTotal = 60000;`.

- [ ] **Step 2.4: Build + тесты**

Run: `npm run build -w web && npm test -w web && npm test -w @kk/ui`
Expected: build чист, web 25/25 (integrity зелёный — `siteConfig` поля и `songsTotal===60000` на месте), ui 2/2.

- [ ] **Step 2.5: Коммит** (`feat(контент): siteConfig+songsTotal → content/site-config.json + загрузчик`) + HANDOFF-строка + пуш + `gh run` success.

---

### Task 3: Лендинг-семья → JSON (scenarios, bundles, brands, staticPages, page-meta)

**Files:**
- Create: `apps/web/content/scenarios.json`, `bundles.json`, `brands.json`, `static-pages.json`, `page-meta.json`
- Modify: `apps/web/src/lib/site.ts` (блоки scenarios 18-24, bundles 27-32, brands 35-38, staticPages 127-129, и 13 `*Meta`)

- [ ] **Step 3.1: Создать JSON-файлы** — VERBATIM перенос соответствующих TS-массивов/объектов в валидный JSON (ключи в кавычки, убрать комментарии/трейлинг-запятые):
  - `scenarios.json` ← массив `scenarios` (site.ts:18-24), форма `Landing[]`.
  - `bundles.json` ← `bundles` (27-32), `Landing[]`.
  - `brands.json` ← `brands` (35-38), `Brand[]`.
  - `static-pages.json` ← `staticPages` (127-129), `Landing[]`.
  - `page-meta.json` ← объект из 13 `*Meta` под ключами: `{ "oNas": {...oNasMeta...}, "kontakty": {...}, "sravnenie": {...}, "catalog": {...}, "podKlyuch": {...}, "komplektyIndex": {...}, "kalkulyator": {...}, "pesni": {...}, "keysy": {...}, "blog": {...}, "dlyaDomaV2": {...}, "dlyaBiznesa": {...}, "gotovyeResheniya": {...} }` — значения VERBATIM из соответствующих `*Meta` (строки 131-203, 235-241, 729-735, 840-859).

- [ ] **Step 3.2: Заменить в `site.ts`** объявления на загрузчик (типы `Landing`/`Brand` остаются в файле):

```ts
import scenariosData from "../../content/scenarios.json";
import bundlesData from "../../content/bundles.json";
import brandsData from "../../content/brands.json";
import staticPagesData from "../../content/static-pages.json";
import pageMeta from "../../content/page-meta.json";

export const scenarios: Landing[] = scenariosData;
export const bundles: Landing[] = bundlesData;
export const brands: Brand[] = brandsData;
export const staticPages: Landing[] = staticPagesData;

export const oNasMeta: Landing = pageMeta.oNas;
export const kontaktyMeta: Landing = pageMeta.kontakty;
export const sravnenieMeta: Landing = pageMeta.sravnenie;
export const catalogMeta: Landing = pageMeta.catalog;
export const podKlyuchMeta: Landing = pageMeta.podKlyuch;
export const komplektyIndexMeta: Landing = pageMeta.komplektyIndex;
export const kalkulyatorMeta: Landing = pageMeta.kalkulyator;
export const pesniMeta: Landing = pageMeta.pesni;
export const keysyMeta: Landing = pageMeta.keysy;
export const blogMeta: Landing = pageMeta.blog;
export const dlyaDomaMetaV2: Landing = pageMeta.dlyaDomaV2;
export const dlyaBiznesaMeta: Landing = pageMeta.dlyaBiznesa;
export const gotovyeResheniyaMeta: Landing = pageMeta.gotovyeResheniya;
```
Удалить старые инлайн-объявления этих массивов/объектов. `type Landing`, `type Brand`, `mainNav`, `typeLabels` — НЕ трогать.

- [ ] **Step 3.3: Build + тесты**

Run: `npm run build -w web && npm test -w web`
Expected: build чист, 25/25 (integrity: формы Landing валидны, счётчики scenarios=5/bundles=4/brands=2/staticPages=1). Если TS ругается, что `pageMeta.oNas` не `Landing` (JSON-инференс) — привести JSON-объекты к точным полям (slug/h1/title/description), лишних полей быть не должно.

- [ ] **Step 3.4: Коммит** (`feat(контент): лендинги/бренды/мета-страниц → content/*.json + загрузчик`) + HANDOFF + пуш + `gh run` success.

---

### Task 4: Товары → JSON (union-тип через каст загрузчика)

**Files:**
- Create: `apps/web/content/products.json`
- Modify: `apps/web/src/lib/site.ts:72-124`

- [ ] **Step 4.1: Создать `apps/web/content/products.json`** — VERBATIM перенос массива `products` (site.ts:72-124), 18 объектов. Правила: ключи в кавычки; `undefined`/отсутствующие опциональные поля просто не включать; массивы `kit` — как есть; комментарии-секции (`// Караоке-системы` и т.д.) убрать. Значения (цены, slug, image, rating) — БЕЗ изменений.

- [ ] **Step 4.2: Заменить в `site.ts`** массив `products` на загрузчик (тип `Product` и `ProductType` остаются в файле; каст снимает union-narrowing, значения валидирует integrity-тест):

```ts
import productsData from "../../content/products.json";
export const products: Product[] = productsData as Product[];
```
Удалить старый инлайн-массив `products` (72-124). `type Product`, `type ProductType`, `typeLabels` — НЕ трогать.

- [ ] **Step 4.3: Build + тесты**

Run: `npm run build -w web && npm test -w web`
Expected: build чист, 25/25 (integrity: products=18, уникальные slug, price>0 число, type в union). Проверить визуально позже (Task 6) — здесь достаточно зелёных тестов.

- [ ] **Step 4.4: Коммит** (`feat(контент): товары (18) → content/products.json + загрузчик`) + HANDOFF + пуш + `gh run` success.

---

### Task 5: Блог + истории + кейсы + песни → JSON

**Files:**
- Create: `apps/web/content/blog.json`, `stories.json`, `cases.json`, `songs.json`
- Modify: `apps/web/src/lib/site.ts` (блоки songsSample 208-218, cases 229-233, blogPosts 250-728, storyPosts 749-838)

- [ ] **Step 5.1: Создать JSON-файлы** — VERBATIM перенос:
  - `blog.json` ← `blogPosts` (site.ts:250-728), 26 объектов формы `BlogPost` (`slug`, `title`, `excerpt`, `body: string[]` — массив абзацев, `faq: {q,a}[]`). Внимание: `body` и `faq` — массивы, переносить структуру как есть; точный перенос длинных строк без потери спецсимволов/кавычек.
  - `stories.json` ← `storyPosts` (749-838), 8 объектов.
  - `cases.json` ← `cases` (229-233), 3 объекта.
  - `songs.json` ← `songsSample` (208-218), 8 объектов.

- [ ] **Step 5.2: Заменить в `site.ts`** на загрузчик (типы `BlogPost`, `StoryPost`, `Case`, `Song` остаются):

```ts
import blogData from "../../content/blog.json";
import storiesData from "../../content/stories.json";
import casesData from "../../content/cases.json";
import songsData from "../../content/songs.json";

export const blogPosts: BlogPost[] = blogData as BlogPost[];
export const storyPosts: StoryPost[] = storiesData as StoryPost[];
export const cases: Case[] = casesData as Case[];
export const songsSample: Song[] = songsData as Song[];
```
Удалить старые инлайн-массивы. Типы — НЕ трогать.

- [ ] **Step 5.3: Build + тесты**

Run: `npm run build -w web && npm test -w web`
Expected: build чист (77 роутов, блог-страницы генерятся из JSON), 25/25 (integrity: blog=26 уникальные slug + title/body непусты, stories=8, cases=3, songs=8).

- [ ] **Step 5.4: Коммит** (`feat(контент): блог(26)/истории/кейсы/песни → content/*.json + загрузчик`) + HANDOFF + пуш + `gh run` success.

---

### Task 6: Финал — верификация «нуля данных» + визуал + доки

**Files:**
- Modify: `docs/HANDOFF.md`, `docs/redaktirovanie-sajta.md` (пометка о переезде контента)

- [ ] **Step 6.1: Убедиться, что в `site.ts` не осталось инлайн-данных.** `site.ts` содержит только: `import`-ы JSON, `export type …`, `typeLabels`, `mainNav`, `allPaths()`, ре-экспорт-загрузчики. Проверка: `grep -nE "price:|slug: \"|h1: \"" apps/web/src/lib/site.ts` — должно быть 0 (данные ушли; определения типов вроде `slug: string` — ок, это не данные). Размер `site.ts` — с ~880 до ~120 строк.

- [ ] **Step 6.2: Полная проверка сборки/тестов.**

Run: `npm run build -w web && npm test -w web && npm test -w @kk/ui`
Expected: build чист (77 роутов), web 25/25, ui 2/2.

- [ ] **Step 6.3: Визуальная проверка идентичности (превью, обе темы).** `preview_start karaoke-static` (:4321, отдаёт out/ после build) → скриншоты: главная, /catalog (18 товаров, цены), /blog (26 карточек), /product/ast-250 (цена 1 500 000, kit), /kontakty (телефон/адрес из site-config). Всё как до рефактора — контент на месте. Проверить обе темы (`localStorage kk-theme`).

- [ ] **Step 6.4: Обновить доки для владельца.** В `docs/redaktirovanie-sajta.md` добавить в начало пометку: контент переехал из `site.ts` в папку `apps/web/content/` (JSON-файлы: `products.json`, `blog.json`, `site-config.json` и т.д.) — временно правится там же на GitHub (безопаснее: без кода), а Фаза 2 добавит визуальный редактор `/admin`. Обновить таблицу «где что лежит».

- [ ] **Step 6.5: Коммит** (`refactor(контент): site.ts — тонкий загрузчик, данные в content/*.json (Фаза 1 ЛК завершена)`) + HANDOFF-строка «Фаза 1 завершена: весь контент в content/*.json, site.ts ~120 строк, 25 тестов, фундамент под CMS Фазы 2» + пуш + `gh run` success + `curl` прода (главная 200, цена товара на месте).

---

## Self-review (пройден)

- **Покрытие спека Фазы 1:** вынос всех коллекций (Task 2–5 по таблице спека: site-config, products, brands, scenarios, bundles, static-pages/page-meta, blog, stories, cases, songs), тонкий загрузчик (все Task), тест контент-целостности (Task 1), критерии приёмки (Task 6: ноль данных в site.ts, build+25+2 зелёные, визуальная идентичность). Контент-валидация на билде = integrity-тест в CI. Auth/CMS/media — Фаза 2, вне этого плана.
- **Отступление от спека зафиксировано:** блог как JSON (не `*.md`) в Фазе 1 — обосновано выше (снижение риска; CMS-markdown-виджет поверх JSON-поля работает).
- **Типы/имена сквозные:** загрузчик ре-экспортирует ТЕ ЖЕ имена (`siteConfig`, `products`, `blogPosts`, все `*Meta`, `songsTotal`) и типы (`Landing`/`Brand`/`Product`/`ProductType`/`BlogPost`/`StoryPost`/`Case`/`Song`) — контракт для ~70 потребителей неизменен. Пути импортов `../../content/*.json` (из `src/lib/`). Каст `as X[]` для union-полей, значения валидирует Task 1.
- **Плейсхолдеров нет:** данные переносятся VERBATIM из указанных строк site.ts (не переписываются в плане — это существующий контент, источник истины); новый код (загрузчик, тест, конфиг) приведён полностью.
