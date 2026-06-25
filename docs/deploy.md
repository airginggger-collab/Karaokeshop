# Деплой — Cloudflare (₸0)

> **🟢 Live (боевой прод):** https://karaokeshop.airg-inggger.workers.dev/ — авто-деплой на каждый push в `main`. Совпадает с HEAD `main`.
>
> ⚠️ **Бренд-домен `karaokeshop.kz` ещё НЕ привязан** — отдаёт старый сайт на Wix. Проверять прод надо на `*.workers.dev`, не на `.kz`. `siteConfig.url` указывает на `karaokeshop.kz` → canonical/og ведут на Wix (SEO-риск). Подробно — раздел «Бренд-домен» и «Проверка после деплоя» ниже.
>
> Вариант A — статический экспорт ([ADR-0002](adr/0002-hosting.md)). Сайт полностью SSG → `output: "export"` собирает чистую статику в `apps/web/out`. Cloudflare отдаёт её как **assets-only Worker** (`wrangler.toml`) — бесплатно, коммерция разрешена, безлимит-трафик, авто-деплой на каждый push в `main`. Чистые URL (без `.html`); неизвестные пути → `404.html` (`not_found_handling = "404-page"`).

## Что реально настроено (assets-only Worker)

Конфиг — `wrangler.toml` в корне:

```toml
name = "karaokeshop"
compatibility_date = "2025-06-01"

[assets]
directory = "./apps/web/out"
not_found_handling = "404-page"
```

- **Live:** `https://karaokeshop.airg-inggger.workers.dev/` (домен `*.workers.dev`, не `*.pages.dev`).
- Билд для деплоя: `npm run build -w @kk/tokens && npm run build -w web` → артефакт в `apps/web/out`.
- Деплой авто на каждый push в `main` (Cloudflare-интеграция с GitHub), ~1–2 мин.

> Историческая заметка: раньше этот файл описывал **Cloudflare Pages** (Connect-to-Git). Фактически проект захостен как **Worker** через `wrangler.toml`. Источник истины по деплою — `wrangler.toml`, не дашборд Pages.

## Альтернатива: Cloudflare Pages (Connect-to-Git)

Если переходить на Pages вместо Worker — те же настройки сборки в дашборде:

| Параметр | Значение |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build -w @kk/tokens && npm run build -w web` |
| Build output directory | `apps/web/out` |
| Root directory | `/` (корень репо) |
| Env var | `NODE_VERSION = 20` |

## Локальная проверка экспорта
```bash
npm run build -w web        # → apps/web/out (47 статических страниц + sitemap.xml/robots.txt/404.html)
npx serve apps/web/out      # посмотреть локально
```

## ⚠️ Бренд-домен `karaokeshop.kz` ещё НЕ привязан — отдаёт старый Wix (SEO-риск)

> Подтверждено аудитом деплоя 2026-06-26.

- **Боевой прод — только `*.workers.dev`:** https://karaokeshop.airg-inggger.workers.dev/ (= HEAD `main`, всё ок). **Проверять надо именно его, не `.kz`.**
- **Бренд-домен `www.karaokeshop.kz` сейчас отдаёт СТАРЫЙ сайт на Wix** — DNS ещё не переведён на Cloudflare, домен к Worker не привязан.
- **SEO-риск (до привязки домена):** в `apps/web/src/lib/site.ts` → `siteConfig.url = "https://www.karaokeshop.kz"`. От него строятся `canonical`, `og:url`, `og:image` (см. `apps/web/src/lib/seo.ts`). Значит **canonical и соц-превью нового сайта ведут на чужой Wix.** Пока домен не привязан, поисковики/соцсети получают ссылку на старый сайт — каноникал указывает не на тот хост, превью тянутся с Wix. Это известный долг, **`siteConfig.url` не трогаем по этому таску** (только доки); устранится автоматически в момент привязки домена.

### Кастомный домен (когда привязываем)
Cloudflare → Workers & Pages → проект `karaokeshop` → **Custom domains/Routes** → добавить `karaokeshop.kz` (+`www`) → перенести NS/DNS на Cloudflare (или CNAME). Бесплатный SSL автоматически. После привязки: открыть `https://www.karaokeshop.kz` и убедиться, что отдаётся новый сайт (не Wix), а `siteConfig.url` совпадает с реальным хостом — тогда canonical/og перестанут указывать на чужой ресурс.

## Проверка после деплоя

После каждого push в `main` (CI авто-деплоит) пройди чек-лист — **проверяй `*.workers.dev`, а НЕ `.kz`** (бренд-домен ещё на Wix):

```bash
# 1. Локальный HEAD == origin/main (то, что должно быть задеплоено)
git -C ~/Desktop/karaokeshop rev-parse HEAD
git -C ~/Desktop/karaokeshop rev-parse origin/main   # должны совпасть

# 2. Последний CI-run деплоя — success и задеплоил этот SHA
gh run list --repo airginggger-collab/Karaokeshop --branch main --limit 5
# сверь headSha успешного run с HEAD выше

# 3. Прод-ассеты на *.workers.dev совпадают с локальной сборкой
npm run build -w web                                  # → apps/web/out
curl -s https://karaokeshop.airg-inggger.workers.dev/ | head
# спот-сверка с apps/web/out/index.html (структура/контент совпадают)
```

- [ ] `git rev-parse HEAD` == `git rev-parse origin/main`
- [ ] Последний деплой-CI-run — **success** и его SHA == HEAD (`gh run list`)
- [ ] Прод на `*.workers.dev` совпадает с локальной сборкой `apps/web/out`
- [ ] Проверял именно `*.workers.dev` (не `.kz` — там пока Wix)

## Когда переключаться на вариант B
Как только добавим **CMS / SSR / ISR** (серверный рендеринг), статического экспорта не хватит. Тогда:
- убрать `output: "export"` из `next.config.mjs`;
- подключить адаптер `@opennextjs/cloudflare`;
- сменить build output на формат адаптера.
Подробнее — [ADR-0002](adr/0002-hosting.md).

## Заметки
- `node_modules`, `.next`, `out`, `storybook-static` — в `.gitignore`, в репо не попадают.
- `next start` НЕ работает с `output: export` — для проверки используем статический сервер (`npx serve`) или сам Cloudflare.
- Lighthouse CI настроен на `staticDistDir: apps/web/out` (см. `lighthouserc.json`).
