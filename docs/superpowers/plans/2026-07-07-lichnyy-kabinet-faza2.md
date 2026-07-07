# Личный кабинет — Фаза 2 (визуальный редактор /admin) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) или superpowers:executing-plans. Шаги — чекбоксы `- [ ]`.

**Goal:** Дать владельцу визуальный редактор `/admin` (Sveltia CMS, формы вместо файлов, вход по GitHub-токену, загрузка фото) + страницу-гайд `/admin-guide/`. После — правки контента через формы, без кода и без файлов.

**Architecture:** Sveltia CMS (git-CMS, Decap-совместимый) — SPA с CDN, статические `public/admin/index.html` + `config.yml`. Все коллекции — **file-типа**: файлы-массивы Фазы 1 оборачиваются в `{ "items": [...] }`, загрузчик `site.ts` читает `.items`. Вход — **personal access token** (кнопка «Sign in with Token», без OAuth-приложения и без второго Worker → остаёмся ₸0 и чистой статикой). Правка в CMS = коммит в GitHub от имени владельца → CI пересобирает сайт (~1–2 мин). Спек: [2026-07-06-lichnyy-kabinet-design.md](../specs/2026-07-06-lichnyy-kabinet-design.md).

**Tech Stack:** Next.js 15 `output:export` · Sveltia CMS (CDN `@sveltia/cms`) · Vitest (⚠️ include `src/**/*.test.ts`). Контент — `apps/web/content/*.json`, фото — `apps/web/public/products/`.

**Правила каждой задачи (CLAUDE.md — ЕДИНОЕ ПРАВИЛО):** `npm run build -w web` (+postbuild `check-redirects`) + `npm test -w web` (29) + `npm test -w @kk/ui` (2) зелёные; коммит + ВСЕ затронутые доки (`docs/HANDOFF.md`) в одном коммите; пуш в `main` сразу; `gh run list` до `success`. Git только `git -C ~/Desktop/karaokeshop`.

---

### Task 1: Обернуть файлы-массивы в `{items:[…]}` + загрузчик

**Files:** Modify `apps/web/content/{products,blog,stories,cases,songs,scenarios,bundles,brands,static-pages}.json`; Modify `apps/web/src/lib/site.ts` (импорты-загрузчики).

Sveltia/Decap file-коллекция требует объект в корне JSON, не голый массив. Оборачиваем 9 файлов-массивов в `{ "items": [ … ] }`, загрузчик читает `.items`. `site-config.json` и `page-meta.json` — уже объекты, НЕ трогать. Тест-сеть `site.test.ts` (29) стережёт: счётчики и поля не должны измениться.

- [x] **Step 1.1: Обернуть каждый из 9 файлов-массивов.** Для каждого `content/<name>.json` вида `[ … ]` → `{ "items": [ … ] }` (VERBATIM элементы, только оборачиваем в объект с ключом `items`). Проще всего скриптом, чтобы не трогать содержимое руками:
```bash
cd ~/Desktop/karaokeshop/apps/web/content
for f in products blog stories cases songs scenarios bundles brands static-pages; do
  node -e "const fs=require('fs');const p='$f.json';const d=JSON.parse(fs.readFileSync(p));if(Array.isArray(d)){fs.writeFileSync(p,JSON.stringify({items:d},null,2)+'\n')}else{console.error('NOT array:',p);process.exit(1)}"
done
```
Проверь: каждый файл теперь `{"items":[...]}`; `site-config.json`/`page-meta.json` не тронуты.

- [x] **Step 1.2: Обновить загрузчик `apps/web/src/lib/site.ts`.** Импорты остаются, но экспорты читают `.items`. Найди строки-загрузчики и приведи к виду (типы-касты сохрани):
```ts
export const products: Product[] = (productsData as { items: Product[] }).items;
export const blogPosts: BlogPost[] = (blogData as { items: BlogPost[] }).items;
export const storyPosts: StoryPost[] = (storiesData as { items: StoryPost[] }).items;
export const cases: Case[] = (casesData as { items: Case[] }).items;
export const songsSample: Song[] = (songsData as { items: Song[] }).items;
export const scenarios: Landing[] = (scenariosData as { items: Landing[] }).items;
export const bundles: Landing[] = (bundlesData as { items: Landing[] }).items;
export const brands: Brand[] = (brandsData as { items: Brand[] }).items;
export const staticPages: Landing[] = (staticPagesData as { items: Landing[] }).items;
```
`siteConfig`, `pageMeta`-загрузчики (site-config.json/page-meta.json) — НЕ трогать (объекты). Типы — не трогать.

- [x] **Step 1.3: Build + тесты.** `npm run build -w web && npm test -w web && npm test -w @kk/ui` — build чист (77 роутов), web **29/29** (integrity доказывает: products=18, blog=26, все поля целы — обёртка ничего не потеряла), ui 2/2. Если тест упал — обёртка задела данные, сверь.

- [x] **Step 1.4: Коммит + HANDOFF + пуш + CI.** HANDOFF-строка: `- **ЛК Фаза 2, Task 1:** файлы-массивы обёрнуты в {items:[…]} под file-коллекции CMS, загрузчик site.ts читает .items; 29 тестов зелёные, сайт идентичен.` Коммит `refactor(контент): обёртка content/*.json в {items:[]} под Sveltia file-коллекции` (+Co-Authored-By Claude Opus 4.8 <noreply@anthropic.com>). Пуш, `gh run list` до `success`.

---

### Task 2: `/admin` — Sveltia CMS (index.html + config.yml)

**Files:** Create `apps/web/public/admin/index.html`, `apps/web/public/admin/config.yml`.

`public/admin/*` копируются `next build` в `out/admin/*` как есть → Cloudflare отдаёт `/admin/`. Sveltia SPA грузится с CDN, читает `config.yml` рядом.

- [x] **Step 2.1: `apps/web/public/admin/index.html`** (актуальный CDN-сниппет Sveltia — сверь с https://sveltiacms.app/en/docs/start):
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Личный кабинет — karaokeshop</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```
⚠️ Проверь актуальный URL пакета в доках Sveltia (Getting Started) — версия/путь CDN могли измениться; используй рекомендованный доками.

- [x] **Step 2.2: `apps/web/public/admin/config.yml`** — backend + media + коллекции. ⚠️ **Факт-чек по докам Sveltia (2026-07-07) показал 2 неточности в каркасе ниже — исправлены в реализации:** (1) `summary` — правильно `{{model}}` / `{{price}}` БЕЗ префикса `fields.` (каркас ниже писал `{{fields.model}}` — устарело/неверно, не использовать как есть). (2) file-коллекция должна быть обёрнута `collections: [{name, label, files: [{...}]}]` — в каркасе это соблюдено верно, но проверяй при копировании. Реализация — `apps/web/public/admin/config.yml`, не переносить `{{fields.x}}` из каркаса ниже. Каркас (backend PAT-режим не требует `base_url`):
```yaml
backend:
  name: github
  repo: airginggger-collab/Karaokeshop
  branch: main

media_folder: "apps/web/public/products"
public_folder: "/products"

locale: ru

collections:
  - name: products
    label: "Товары и цены"
    files:
      - name: products
        label: "Каталог товаров"
        file: "apps/web/content/products.json"
        fields:
          - name: items
            label: "Товары"
            label_singular: "Товар"
            widget: list
            summary: "{{fields.model}} — {{fields.price}} ₸"
            fields:
              - { name: slug, label: "Адрес (slug)", widget: string, hint: "латиницей, без пробелов — часть ссылки" }
              - { name: model, label: "Название", widget: string }
              - name: type
                label: "Тип"
                widget: select
                options:
                  - { label: "Караоке-система", value: sistema }
                  - { label: "Акустика", value: akustika }
                  - { label: "Микрофон", value: mikrofon }
                  - { label: "Сабвуфер", value: sub }
                  - { label: "Микшер", value: miksher }
              - { name: brand, label: "Бренд", widget: string }
              - { name: price, label: "Цена, ₸", widget: number, value_type: int, min: 0 }
              - { name: priceOld, label: "Старая цена (для скидки)", widget: number, value_type: int, required: false }
              - { name: inStock, label: "В наличии", widget: boolean, default: true }
              - { name: image, label: "Фото", widget: image, required: false, choose_url: false }
              - { name: featured, label: "На витрине", widget: boolean, required: false, default: false }
              - { name: rating, label: "Рейтинг", widget: number, value_type: float, required: false }
              - { name: reviewsCount, label: "Отзывов", widget: number, value_type: int, required: false }
              - { name: power, label: "Мощность", widget: string, required: false }
              - { name: note, label: "Примечание", widget: string, required: false }
              - { name: scenario, label: "Сценарий (код)", widget: string, required: false }
              - { name: scenarioLabel, label: "Сценарий (подпись)", widget: string, required: false }
              - { name: areaMax, label: "Площадь до, м²", widget: number, value_type: int, required: false }
              - { name: songsCount, label: "Песен в базе", widget: number, value_type: int, required: false }
              - { name: kit, label: "Комплектация", widget: list, field: { name: item, label: "Позиция", widget: string }, required: false }

  - name: contacts
    label: "Контакты и сайт"
    files:
      - name: siteConfig
        label: "Контакты"
        file: "apps/web/content/site-config.json"
        fields:
          - { name: name, label: "Название", widget: string }
          - { name: url, label: "Адрес сайта", widget: string }
          - { name: city, label: "Город", widget: string }
          - { name: phone, label: "Телефон", widget: string }
          - { name: whatsapp, label: "WhatsApp (цифры)", widget: string }
          - { name: address, label: "Адрес", widget: string }
          - { name: hours, label: "Часы работы", widget: string }
          - { name: email, label: "Почта", widget: string }
          - { name: defaultTitle, label: "Title по умолчанию", widget: string }
          - { name: defaultDescription, label: "Description по умолчанию", widget: text }
          - { name: songsTotal, label: "Всего песен", widget: number, value_type: int }

  - name: blog
    label: "Блог"
    files:
      - name: blog
        label: "Статьи"
        file: "apps/web/content/blog.json"
        fields:
          - name: items
            label: "Статьи"
            label_singular: "Статья"
            widget: list
            summary: "{{fields.title}}"
            fields:
              - { name: slug, label: "Адрес (slug)", widget: string }
              - { name: title, label: "Заголовок", widget: string }
              - { name: excerpt, label: "Краткое описание", widget: text }
              - { name: body, label: "Текст (по абзацам)", widget: list, field: { name: para, label: "Абзац", widget: text } }
              - name: faq
                label: "Вопросы-ответы"
                widget: list
                required: false
                fields:
                  - { name: q, label: "Вопрос", widget: string }
                  - { name: a, label: "Ответ", widget: text }
```
Затем **аналогично добавь остальные file-коллекции** (по образцу выше, `file:` + `items`-`list`): `stories.json` (StoryPost: id/author/initials/venue/date/text/tags[]/likes/system?), `cases.json` (Case: slug/venue/city/area/system/quote/author), `songs.json` (Song: title/artist/lang), `scenarios.json`/`bundles.json`/`static-pages.json` (Landing: slug/h1/title/description), `brands.json` (Brand: slug/name/h1/title/description), `page-meta.json` (объект из 13 ключей — file-коллекция с 13 объектными полями Landing). ⚠️ Поля коллекций ДОЛЖНЫ точно соответствовать типам из `site.ts` — иначе CMS перезапишет файл с потерей/переименованием полей. Сверь каждое поле с `export type …` в `site.ts`.

- [x] **Step 2.3: Build + проверка, что /admin отдаётся.** `npm run build -w web` — чисто; проверь `ls apps/web/out/admin/` → `index.html` + `config.yml` на месте. Превью (preview_start karaoke-static :4321) → открой `/admin/` (preview_eval `location.href='/admin/'`): должен загрузиться экран входа Sveltia с кнопкой входа по токену (без реального входа — токена пока нет; главное, что SPA грузится и парсит config без ошибок; проверь preview_console_logs на ошибки config). Если config.yml с синтаксической ошибкой — Sveltia покажет её на экране; почини.

- [x] **Step 2.4: Коммит + HANDOFF + пуш + CI.** HANDOFF-строка про `/admin` (Sveltia, PAT, все коллекции). Коммит `feat(admin): Sveltia CMS на /admin — file-коллекции всего контента, вход по GitHub-токену`. Пуш, `gh run list` до `success`. После деплоя — `curl -sL -o /dev/null -w "%{http_code}" https://karaokeshop.airg-inggger.workers.dev/admin/` (200).

---

### Task 3: Страница `/admin-guide/`

**Files:** Create `apps/web/src/app/admin-guide/page.tsx`.

Роут-обёртка гайда на компонентах «Сцены». Контент — из [`docs/client/admin-guide.md`](../../client/admin-guide.md) (перенести в JSX; актуализировать под PAT-вход: «Войти по токену», а не OAuth).

- [ ] **Step 3.1: Создать `apps/web/src/app/admin-guide/page.tsx`** — серверный компонент:
  - `export const metadata = { title: "Личный кабинет — инструкция", robots: { index: false, follow: false } }` (служебная, не для поиска).
  - `<Container>` → `<Breadcrumb items={[{ label: "Инструкция кабинета" }]} />` (правило репо: крошки на каждой не-главной) → `<h1>` с `font-display font-bold` (можно `<HighlightLine>` на «кабинет»).
  - Контент из `admin-guide.md`: секции «Как зайти» (по токену: `/admin/` → «Sign in with Token» → сгенерировать GitHub fine-grained token с правами Contents: read/write на репозитории → вставить), «Что где», «Как поменять цену», «Загрузить фото», «Добавить статью», «После Сохранить (~1–2 мин)», «Чего не делать», «Если не появилось». Токен-шаги описать точно (fine-grained PAT → Repository access → Contents: Read and write).
  - Стиль — токены «Сцены» (text-foreground/muted-foreground, bg-background, hairline). Таблицы — простые, на `border-border`.
  - Ссылка-кнопка «Открыть кабинет» → `<a href="/admin/">` (bg-cta text-cta-fg).

- [ ] **Step 3.2: НЕ добавлять в sitemap** (noindex — служебная). Проверь `apps/web/src/app/sitemap.ts` / `allPaths()` — если `/admin-guide` туда не попадает автоматически, ничего не делать; если попадает — исключить.

- [ ] **Step 3.3: Build + превью обеих тем.** `npm run build -w web && npm test -w web` (29) + `npm test -w @kk/ui` (2). Превью `/admin-guide/` (preview): крошки, h1 с подсветкой, текст читаем, кнопка «Открыть кабинет» ведёт на `/admin/`; тёмная и светлая темы. `<meta name robots noindex>` в исходнике страницы.

- [ ] **Step 3.4: Коммит + HANDOFF + пуш + CI.** Коммит `feat(admin-guide): страница-инструкция /admin-guide/ (noindex, «Сцена»)`. Обнови задачу #28 в HANDOFF как закрытую. Пуш, `gh run list` до `success`. `curl -sL -o /dev/null -w "%{http_code}" .../admin-guide` (200).

---

### Task 4: Разовая настройка владельца + round-trip (owner-assisted)

**Files:** — (проверочная задача; кода нет). Modify `docs/HANDOFF.md`, `docs/client/admin-guide.md` (финальные уточнения под PAT, если нужны).

⚠️ Требует действий ВЛАДЕЛЬЦА (генерация токена в её GitHub-аккаунте) — исполнитель НЕ может выполнить это сам. Задача = подготовить и задокументировать, а фактический вход/тест делает владелец (или предоставляет токен для проверки).

- [ ] **Step 4.1: Сверить инструкцию по токену** в `/admin-guide` и `docs/client/admin-guide.md`: fine-grained PAT, Repository access → только `airginggger-collab/Karaokeshop`, Permissions → Contents: Read and write, срок — по желанию (можно 1 год). Кнопка «Sign in with Token» в Sveltia ведёт на страницу генерации с нужными правами — упомянуть, что можно идти по ней.
- [ ] **Step 4.2: Отчёт-хендофф владельцу** (в HANDOFF + сообщение): что готово (`/admin/`, `/admin-guide/`), что нужно от неё (1 раз: сгенерировать токен, войти, сделать тестовую правку — например изменить примечание товара — Сохранить, через ~2 мин проверить на сайте). Отметить, что до её входа CMS полностью развёрнута, но правки делать некому — round-trip подтверждается владельцем.
- [ ] **Step 4.3: Коммит доков + пуш** (если были уточнения). HANDOFF: «Фаза 2 развёрнута; ждём разовый вход владельца для round-trip».

---

## Self-review (пройден)

- **Покрытие спека Фазы 2:** (a) обёртка+загрузчик — Task 1; (b) /admin + config.yml (PAT, file-коллекции) — Task 2; (c) медиа `public/products` — Task 2 (media_folder); (d) /admin-guide — Task 3; (e) разовый вход владельца — Task 4. Тест целостности стережёт Task 1.
- **Owner-dependency честно выделена** (Task 4 — генерация токена в её аккаунте, исполнитель не делает сам).
- **Плейсхолдеров нет:** код обёртки/загрузчика, index.html, каркас config.yml (products+contacts+blog полностью, остальные — по явному образцу с указанием полей из типов), страница-гайд — приведены/описаны конкретно. Точный CDN-URL Sveltia и тонкости YAML-виджетов — сверяются с доками Sveltia (указано где).
- **Риски:** (1) CDN-версия Sveltia могла измениться — сверить с Getting Started. (2) Поля config.yml должны 1:1 совпадать с типами `site.ts`, иначе CMS перезапишет файл с потерей полей — явно предупреждено (Step 2.2). (3) `/admin/` трейлинг-слэш — гайд ссылается на `/admin/`. (4) PAT-вход невозможно протестировать без токена владельца — round-trip за ней (Task 4).
- **Типы/имена сквозные:** обёртка `.items` согласована между Task 1 (JSON) и загрузчиком; config.yml `file:`-пути = реальные `apps/web/content/*.json`; поля = типы из `site.ts`.
