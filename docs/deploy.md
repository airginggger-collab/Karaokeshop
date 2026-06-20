# Деплой — Cloudflare (₸0)

> **🟢 Live:** https://karaokeshop.airg-inggger.workers.dev/ — авто-деплой на каждый push в `main`.
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

## Кастомный домен (позже)
Cloudflare → Workers & Pages → проект `karaokeshop` → **Custom domains/Routes** → добавить `karaokeshop.kz` → перенести NS/DNS на Cloudflare (или CNAME). Бесплатный SSL автоматически. (В `siteConfig.url` продакшен-canonical уже задан как `https://www.karaokeshop.kz` — привязать домен и сверить.)

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
