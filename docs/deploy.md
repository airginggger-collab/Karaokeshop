# Деплой — Cloudflare (₸0)

> **🟢 Live (боевой прод):** https://www.karaokeshop.kz/ — авто-деплой на каждый push в `main`. Совпадает с HEAD `main`. Технический хост https://karaokeshop.airg-inggger.workers.dev/ отдаёт то же самое.
>
> ✅ **Бренд-домен привязан 2026-07-21:** зона `karaokeshop.kz` на Cloudflare (аккаунт `airg.inggger@gmail.com`, Free), оба хоста — custom domains воркера, apex 301-ит на www (Redirect Rule), «Always Use HTTPS» включён. canonical/og от `siteConfig.url` теперь указывают на сам сайт — SEO-долг закрыт. Детали переезда — раздел «Бренд-домен» ниже и `docs/strategy/domain-launch.md`.
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

## ✅ Бренд-домен `karaokeshop.kz` привязан (2026-07-21)

Как устроено (переезд с Wix выполнен по чек-листу `docs/strategy/domain-launch.md`):

- **NS у регистратора ps.kz:** `logan.ns.cloudflare.com`, `veda.ns.cloudflare.com` (были `ns1/ns2.wix.com`). Зона `karaokeshop.kz` — в Cloudflare-аккаунте `airg.inggger@gmail.com`, тариф Free.
- **Оба хоста — custom domains воркера `karaokeshop`** (Workers & Pages → karaokeshop → Domains), продублированы `routes` в `wrangler.toml`. Импортированные при создании зоны Wix-записи (3×A apex, CNAME `www`/`m`) удалены.
- **Канон www:** Redirect Rule `apex-to-www-301` (зона → Rules → Redirect Rules): wildcard `https://karaokeshop.kz/*` → `https://www.karaokeshop.kz/${1}`, 301, query сохраняется. В `_redirects` этого правила НЕТ и быть не может (ловушка 0: только относительные URL).
- **Always Use HTTPS** включён (SSL/TLS → Edge Certificates): `http://…` → 301 на `https://…`.
- **robots.txt:** Cloudflare подмешивает сверху managed-блок (запрет AI-training ботам, тумблер «Block AI training in robots.txt» из онбординга зоны). Наши директивы и `Sitemap:` — в конце файла, поиск Google не затронут. Не пугаться «чужого» преамбула.
- **Откат (на крайний случай):** вернуть у ps.kz NS `ns1/ns2.wix.com` — через час-два вернётся Wix (пока жива подписка Wix).

## Проверка после деплоя

После каждого push в `main` (CI авто-деплоит) пройди чек-лист — прод проверяем на **https://www.karaokeshop.kz/**:

```bash
# 1. Локальный HEAD == origin/main (то, что должно быть задеплоено)
git -C ~/Desktop/karaokeshop rev-parse HEAD
git -C ~/Desktop/karaokeshop rev-parse origin/main   # должны совпасть

# 2. Последний CI-run деплоя — success и задеплоил этот SHA
gh run list --repo airginggger-collab/Karaokeshop --branch main --limit 5
# сверь headSha успешного run с HEAD выше

# 3. Прод совпадает с локальной сборкой
npm run build -w web                                  # → apps/web/out
curl -s https://www.karaokeshop.kz/ | head
# спот-сверка с apps/web/out/index.html (структура/контент совпадают)

# 4. Хост-канонизация жива (после правок в Cloudflare-дашборде)
curl -sI https://karaokeshop.kz/ | grep -i location     # → https://www.karaokeshop.kz/
curl -sI http://www.karaokeshop.kz/ | grep -i location  # → https://…
```

- [ ] `git rev-parse HEAD` == `git rev-parse origin/main`
- [ ] Последний деплой-CI-run — **success** и его SHA == HEAD (`gh run list`)
- [ ] Прод на `https://www.karaokeshop.kz/` совпадает с локальной сборкой `apps/web/out`
- [ ] apex и http 301-ят на `https://www.…` (см. п.4)

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
