# Деплой — Cloudflare Pages (₸0)

> Вариант A — статический экспорт ([ADR-0002](adr/0002-hosting.md)). Сайт полностью SSG → `output: "export"` собирает чистую статику в `apps/web/out`. Cloudflare Pages раздаёт её бесплатно (коммерция разрешена, безлимит-трафик) и авто-деплоит на каждый push.

## Подключение (один раз, через дашборд Cloudflare)

1. Зарегистрируйся на [dash.cloudflare.com](https://dash.cloudflare.com) (бесплатно).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Авторизуй GitHub, выбери репозиторий **`airginggger-collab/Karaokeshop`**.
4. Настройки сборки:

| Параметр | Значение |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build -w @kk/tokens && npm run build -w web` |
| Build output directory | `apps/web/out` |
| Root directory | `/` (корень репо) |

5. **Environment variables** → добавь `NODE_VERSION` = `20`.
6. **Save and Deploy**.

Через ~1–2 минуты получишь ссылку вида `https://karaokeshop.pages.dev`. Дальше каждый push в `main` авто-деплоится; PR'ы получают preview-ссылки.

## Локальная проверка экспорта
```bash
npm run build -w web        # → apps/web/out (24 статических страницы + sitemap.xml/robots.txt/404.html)
npx serve apps/web/out      # посмотреть локально
```

## Кастомный домен (позже)
Cloudflare Pages → проект → **Custom domains** → добавить `karaokeshop.kz` → перенести NS/DNS на Cloudflare (или CNAME). Бесплатный SSL автоматически.

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
