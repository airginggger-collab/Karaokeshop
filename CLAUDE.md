# CLAUDE.md — гайд для AI-агентов в репо Karaokeshop

> Каноничные правила для Claude / Cursor / Copilot. Прочитай целиком, потом загляни в [`docs/HANDOFF.md`](docs/HANDOFF.md) (снимок состояния) и [`docs/README.md`](docs/README.md) (индекс).

## TL;DR

Karaokeshop.kz — ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST + Studio Evolution). **Монорепо Turborepo + npm workspaces.** Сайт — Next.js 15 (App Router, `output: "export"` — чистая статика), захостен на Cloudflare как assets-only Worker. Контент пока захардкожен в `apps/web/src/lib/site.ts` (CMS не подключена). SEO — главный приоритет проекта.

- Стек: Next.js ^15.1.2 · React ^19 · TypeScript ^5.6.3 strict · Turborepo ^2.3.3 · Tailwind ^3.4.17 на токенах · Style Dictionary ^4.3.0 · Storybook ^8.4.7 · Vitest ^4.1.10 (vite прижат к ^6.4.3, см. ловушку 10) · lucide-react. Шрифты Manrope + Onest (`next/font/google`; Onest — заголовки, заменил Unbounded 2026-07-07).
- Структура: `apps/web` (сайт), `packages/tokens` (`@kk/tokens`), `packages/ui` (`@kk/ui`), `docs/` (контекст-пак).

## ⚠️ Это ОТДЕЛЬНЫЙ проект

- Локально: `~/Desktop/karaokeshop`. Сессии часто стартуют из каталога **medlog** — **не перепутай**. Был случай ошибочного коммита в medlog.
- Bash сбрасывает cwd между вызовами → работай с git через `git -C ~/Desktop/karaokeshop …`.

## Структура монорепо и правила импортов

```
apps/web/             — Next.js сайт (App Router)
  src/app/            — роуты по URL-карте (docs/strategy/url-map.md)
  src/components/     — React-компоненты сайта
  src/lib/            — site.ts (контент), components.ts (калькулятор), seo.ts, calculator.ts, cart/compare
packages/tokens/      — @kk/tokens: css/theme.css (ЦВЕТА: light/.dark/.mood-*) + tokens.json → css/tokens.css (радиусы, Style Dictionary)
packages/ui/          — @kk/ui: Button, Badge + Storybook + Vitest
```

1. **Пакеты не лезут во внутренности друг друга.** Импорт переиспользуемого UI — только через barrel `@kk/ui` (его `exports` → `src/index.ts`), токенов — через `@kk/tokens/tokens.css` (радиусы) и `@kk/tokens/theme.css` (цвета). Не импортируй из `@kk/ui/src/Button` напрямую.
2. **Сайт host-agnostic.** Никакого Vercel-only лок-ина: переезд на Vercel Pro должен быть сменой таргета деплоя, а не рефакторингом (см. [ADR-0002](docs/adr/0002-hosting.md)).
3. **No backend / статика.** `next.config.mjs` → `output: "export"`. Серверных рантаймов, API-роутов, ISR, Image Optimization нет (`images.unoptimized = true`). Если задача требует SSR/CMS — это переход на «вариант B» (адаптер `@opennextjs/cloudflare`), поднимай флаг, не вводи молча.
4. **Дизайн — через токены. Один источник на каждый вид токена (не дублировать!).**
   - **Цвета** (`--color-*`, `--warm-*`, `--night-*`, light/`.dark`/`.mood-*`) — ТОЛЬКО `packages/tokens/css/theme.css`. Импортится и приложением, и Storybook. НЕ дублировать в `globals.css` и НЕ класть в `tokens.json` — иначе вернётся баг «правлю цвет, ничего не меняется» (был дубль tokens.css↔globals.css, globals молча перебивал).
   - **Радиусы** — `tokens.json` → `css/tokens.css` (Style Dictionary).
   - Tailwind-утилиты замаплены на `var(--color-*)`. Темизируемый текст — `text-foreground`/`text-muted-foreground`, НЕ хардкод `text-[#…]`. `globals.css` — только Tailwind-слои, база страницы и тени карточек.
5. **SEO — позвоночник.** URL и мета проектируются от семантического ядра ([url-map.md](docs/strategy/url-map.md)). JSON-LD/sitemap/robots — в `apps/web/src/lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`. Не ломай canonical-дисциплину и hreflang-структуру.

## Где контент и данные (для правок)

- `apps/web/src/lib/site.ts` — товары (18 шт), бренды, блог, кейсы, песни, лендинги, `siteConfig` (телефон/адрес/почта/`url`).
- `apps/web/src/lib/components.ts` — цены оборудования в калькуляторе сметы.
- `apps/web/public/products/` — фото товаров (поле `image` у товара).
- Инструкция для владельца (правка через браузер, без кода): [docs/redaktirovanie-sajta.md](docs/redaktirovanie-sajta.md).

## Команды

```bash
npm install                  # установить монорепо
npm run dev                  # turbo run dev
npm run build                # turbo run build (web → apps/web/out)
npm run lint                 # turbo run lint
npm run test                 # turbo run test
npm run tokens               # пересобрать @kk/tokens

npm run build -w web         # сборка сайта → apps/web/out (статика)
npm test -w web              # тесты web (Vitest): 29 (calculator + seo + quiz + site + CountUp)
npm test -w @kk/ui           # тесты UI-кита: 2
npm run storybook -w @kk/ui  # Storybook на :6006
```

Проверка изменений: `npm run build -w web` + `npm test -w web`. После пуша — `curl` живого URL (превью-MCP привязан к medlog, не к этому проекту).

## Git и деплой

- **Repo:** github.com/airginggger-collab/Karaokeshop (заглавная **K**) · ветка `main` · push по **SSH** (ключ `~/.ssh/id_ed25519`).
- **Автор коммитов:** `airginggger-collab <airg.inggger@gmail.com>` — задан в local git config репо, отдельный `-c` обычно не нужен. `gh` CLI в фоне может быть не авторизован.
- Формат коммитов: `<type>(scope?): <subject>` — `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- **Деплой:** Cloudflare assets-only Worker через `wrangler.toml`. `out/` в `.gitignore`. CI (`.github/workflows/ci.yml`) автоматически деплоит после успешного `push` в `main` — шаг `npx wrangler deploy` с секретом `CLOUDFLARE_API_TOKEN`. PR-ветки деплой не триггерят. Подробно — [docs/deploy.md](docs/deploy.md).
- **Live (боевой прод):** https://karaokeshop.airg-inggger.workers.dev/ — = HEAD `main`, проверять надо ИМЕННО его. ⚠️ Бренд-домен `karaokeshop.kz` ещё **НЕ привязан** и отдаёт **старый сайт на Wix** (DNS не переведён на Cloudflare). При этом `siteConfig.url` = `https://www.karaokeshop.kz` → canonical/`og:url`/`og:image` ведут на чужой Wix = **SEO-риск до привязки домена** (см. ловушку 7 и [docs/deploy.md](docs/deploy.md)).

## CI / Lighthouse

`.github/workflows/ci.yml` (push в `main`/`master` + PR): сборка токенов → тесты `@kk/ui` → тесты web → сборка web → сборка Storybook → **деплой** (`wrangler deploy`, только push в `main`); отдельным джобом **Lighthouse CI** (`lighthouserc.json`). Деплой в джобе `build-test` и **не зависит** от Lighthouse — красный Lighthouse НЕ блокирует деплой. Бюджет: performance `warn` (≥0.9, не валит CI — иначе каждый пуш горел красным и казалось «не задеплоилось»), SEO `error` ≥0.95, LCP/CLS/TBT `warn`. Перф чинить (next/image, JS) — отдельная задача, не блокером.

## Ловушки

> **ПРАВИЛО (владелец, 2026-07-10): что и почему ломается — ОБЯЗАТЕЛЬНО записывать сюда, чтобы не повторять.** Поймал баг/регресс/упавший деплой или наткнулся на пре-existing дефект при правке → разберись в **корневой причине** (что именно и почему, а не симптом) и добавь пункт-ловушку с корнем + способом защиты, в том же коммите (см. «ЕДИНОЕ ПРАВИЛО»). Каждый пункт ниже — уже пойманная поломка; список только растёт.

0. **`apps/web/public/_redirects` — ТОЛЬКО относительные URL, и всегда проверяй CI-деплой после пуша.** Cloudflare Workers Static Assets валидирует `_redirects` на шаге `wrangler deploy` (не при `next build`): абсолютный URL (с хостом) → `Only relative URLs are allowed` → **деплой падает, а прод молча застревает на прошлой версии**. Так и случилось 2026-07-02 (правило www-канонизации). Защита: `postbuild`-хук `scripts/check-redirects.mjs` роняет **локальную сборку** на абсолютных URL. Хост-канонизацию (www) делать через **Cloudflare Redirect Rules** (дашборд), не в `_redirects`. **Правило: после каждого push в `main` проверяй `gh run list` — деплой мог упасть, локальный build это не покажет.**
1. **`next start` не работает с `output: export`.** Для локального просмотра — `npx serve apps/web/out`, не `next start`.
2. **HEX-палитра PDF / токены.** Цвета — только через токены `@kk/tokens`; не хардкодь.
3. **`docs/deploy.md` исторически писался под Cloudflare Pages (Connect-to-Git).** Реальный продакшен — assets-only **Worker** через `wrangler.toml`, URL `*.workers.dev`. Опирайся на `wrangler.toml`, не на «вариант Pages-дашборда».
4. **show-service — поставщик, на сайте НЕ упоминается** (использован как справочник номенклатуры). Цены оценочные (поставщик их скрывает); фото товаров — демо (Unsplash), временные. Заменить по счёту/реальным фото.
5. **`_local-assets/` — gitignored локальная свалка** (скриншоты и т.п.). Не ре-трекай. `.gitignore` также блокирует stray-бинарники в корне (`/*.png`, `/*.jpg`, `/*.jpeg`, `/*.pdf`).
6. **`packages/ui/storybook-static/` — gitignored** (`packages/ui/.gitignore`). В git не попадает; пересобирается `npm run build-storybook -w @kk/ui`.
7. **Бренд-домен `karaokeshop.kz` ещё НЕ привязан — отдаёт старый Wix; `siteConfig.url` ведёт canonical/og на чужой сайт (SEO-риск).** Боевой прод — только `*.workers.dev`; `.kz` сейчас старый сайт на Wix (DNS не на Cloudflare). А `siteConfig.url = "https://www.karaokeshop.kz"` → `seo.ts` строит от него `canonical`, `og:url`, `og:image` → они указывают на Wix. Пока домен не привязан: **проверять прод только на `*.workers.dev`** (не на `.kz`), `siteConfig.url` по этому поводу **не менять** без отдельного решения — долг закроется в момент привязки домена. Чек-лист «Проверка после деплоя» — в [docs/deploy.md](docs/deploy.md).
 8. **Не вписывай бренд в `title` страницы руками — корневой layout уже добавляет его через `title.template` (`%s | karaokeshop`, `apps/web/src/app/layout.tsx`).** Ручной `| karaokeshop` в `metadata.title` страницы → **задвоение** `… | karaokeshop | karaokeshop` (было на `/dlya-biznesa`, жило на LIVE, устранено 2026-07-10). В `title` страницы пиши **только суть**, бренд подставится сам. Единственное место с брендом — `title.default` для корня в `layout.tsx`.
 9. **`redirects()`/`headers()` в `next.config.mjs` при `output: "export"` ИГНОРИРУЮТСЯ Next'ом молча** — правило лежало в конфиге с виду рабочим, а прод отдавал 200-дубль вместо 301 (найдено security-ревью 2026-07-14: `/karaoke/dlya-doma`). Редиректы — только `public/_redirects`, заголовки — только `public/_headers` (оба валидируются на `wrangler deploy`, см. ловушку 0). Security-заголовки (CSP/nosniff/XFO/Referrer-Policy) живут в `public/_headers` — не удалять; после деплоя проверять `curl -I` прода. JSON-LD вставлять ТОЛЬКО через компонент `<JsonLd>` (`src/components/JsonLd.tsx` — экранирует `<`, защита от разрыва `</script>` строкой из контента), не сырым `dangerouslySetInnerHTML`.
 10. **vitest 4 / vite ≥7 не компилят JSX при `"jsx": "preserve"` в tsconfig (падает `import analysis` на `.tsx`), а свежий vitest тянет vite 8.** Next-tsconfig обязан держать `preserve` → защита двойная: в `apps/web/vitest.config.ts` стоит `esbuild: { jsx: "automatic" }`, а `vite` в devDeps обоих workspace прижат к `^6.4.3` (патченный esbuild-advisory; выше нельзя — Storybook 8 держит vite ≤6, `@vitejs/plugin-react` ≤5.2). Апгрейд vite/Storybook — только связкой. Остаточные moderate-advisories (postcss внутри next, uuid внутри Storybook, esbuild dev-server) — dev-only, лечатся только breaking-апгрейдами; принятый риск 2026-07-14.
 11. **🚫 ЗАПРЕТ владельца (2026-07-14): НИКОГДА не подключаться к Figma-аккаунту Zauren Zhambylova (zauren.zhambylova@mail.ru) и ничего в нём не делать** — ни создавать файлы, ни писать, ни читать. Если Figma MCP авторизован под ним — не использовать вообще, просить владельца переподключить коннектор. Перед любой записью через любой Figma-коннектор: `whoami` → показать аккаунт владельцу → явное «да». Токены для Figma отдавать файлом `packages/tokens/figma-tokens.json` (Tokens Studio), без записи в аккаунт. Запрет продублирован в `~/.claude/CLAUDE.md` (глобально) и памяти агента.
 12. **Цифру, которую можно посчитать из `content/*.json`, НЕ хардкодить в странице: она молча расходится с каталогом.** `/brand/[slug]` держал `priceFrom: "от 950 000 ₸"` строкой, пока `/sravnenie` считал минимум из `products` → на проде Studio Evolution «от 950 000 ₸» при живом Evobox за **749 000**, а AST «от 749 000 ₸» при AST Mini за **720 000** (обе страницы врали, вторую цифру аудит 2026-07-16 даже не заметил). Корень: два источника одной цифры, причём хардкод не ломает ни сборку, ни тесты, поэтому расхождение живёт до ручной сверки; владелец правит цены через `/admin`, и хардкод он не увидит. Защита: единый `priceFromBrand(brand)` в `lib/site.ts` + тест `site.test.ts` («ни одна страница не хардкодит цену бренда»). То же правило шире: гарантия, число песен, «от N ₸» — считать или брать из контента, не вписывать руками.
 13. **Факт о живом сайте НЕЛЬЗЯ проверять грепом по HTML: половина смысла появляется только в браузере, поэтому «ничего не нашлось» здесь почти всегда ошибка проверки, а не находка.** Аудит 2026-07-16 сгорел на этом трижды, и каждый раз вывод звал удалить работающее (разбор — в `docs/HANDOFF.md`): (а) «`/checkout` тупик, форм и инпутов нет» получено подсчётом `form`/`input` **на главной**, тогда как инпуты `/checkout` рисует клиентски и только при непустой корзине, а тега `<form>` там нет by design (контролируемые инпуты + `window.open`); (б) «5 моделей дают 404» получено по URL, которые аудитор **сам собрал** из внутренних id `lib/components.ts` (это id строк сметы, не слаги; ссылок на них нет нигде) — 404 верен, но недостижим; (в) «калькулятор спрятан» при 12 живых входящих ссылках с лендингов. Те же грабли ловят и агента: `curl` без `-L` отдаёт тело редиректа (0 совпадений вместо цены); React разделяет текстовые узлы комментарием → в HTML лежит `от <!-- -->720 000 ₸`, и греп `"от 720 000"` не находит ничего; `Intl.NumberFormat("ru-RU")` ставит неразрывный пробел U+00A0 → снимать `perl -CSD -pe 's/\x{00A0}/ /g'`. **Протокол проверки:** (1) проверять НА ТОЙ странице, о которой делаешь вывод; (2) клиентский рендер (корзина, каталог, инпуты, фильтры) — только браузером (`javascript_tool`/`read_page`), не `curl`; (3) прежде чем звать URL мёртвым — `grep -rn '"/путь"' apps/web/src`: 404 по ссылке, которой нет, не дефект воронки; (4) `curl -sL`, затем снять `<!-- -->` и U+00A0, потом грепать; (5) **вывод «удалить работающее» требует доказательства, а не отсутствия улики.** **Вёрстку мерить тоже нельзя скриптом:** `javascript_tool` в превью-пейне отдаёт нулевые размеры (`getBoundingClientRect()` = 0, `offsetParent` = null у sticky-шапки), поэтому «перенос строки» и «влезает ли меню» проверять только скриншотом, а лучше A/B (прод = старая версия против локалки = новая; так и пойман перенос в шапке на 768px 2026-07-16). Порог меню — парный: `nav` в `Header.tsx` (`lg:flex`) и обёртка `MobileNav.tsx` (`lg:hidden`) меняются ТОЛЬКО вместе, иначе на промежуточной ширине выйдет два меню или ни одного.
 14. **Одно и то же клиент не должен вводить дважды, а если вводит — числа обязаны совпасть.** Квиз на главной и `/kalkulyator` спрашивают одно и то же (место, площадь, бюджет). Состояние передаётся через URL: `quizToCalcQuery()` → `parseCalcQuery()` (`lib/quiz.ts`), калькулятор сразу рисует смету. **Бюджет передавать ТОЧНЫМ числом квиза, не подгоняя под шкалу `BUDGET_OPTS`** (800 000 ≠ 1 000 000) — иначе итог разойдётся с ориентиром, который клиент уже увидел; тест «итог калькулятора совпадает с ориентиром квиза до тенге» это стережёт. Технические условия: `useSearchParams` при `output: export` **обязан** быть под `<Suspense>` (иначе падает сборка), префилл — под **ref-гардом** (иначе «Пересчитать» отбрасывает назад в смету, пока параметры в URL), а `parseCalcQuery` **валидирует** вход (URL правит кто угодно). Попутно там же жил пре-existing баг: `smetaText(calc, scenario)` слал менеджеру сырой id («**Тип: dom**») в каждой заявке, потому что человеческую подпись `SCENARIO_VENUE` считали рядом, но в текст не передавали, а её собственную ошибку (`dom: "Кафе"`) не было видно — `configure()` игнорирует `venueType`. Мораль: **значение, которое видит только клиент в WhatsApp, не проверяется ни сборкой, ни ценой — на такие нужен тест.**

## UI-конвенции (обязательные)

> **Переносимый стандарт визуализации/цвета** — [`docs/design/visualization/`](docs/design/visualization/) (роли-токены `--color-*`, контраст WCAG AA, light/dark, семантика состояний, анти-ИИ; конкретные цвета подбираются локально). Контраст-чек — [`docs/design/visualization/check.mjs`](docs/design/visualization/check.mjs) (`node check.mjs`). Стандарт универсален и раздаётся всем проектам; правила «Сцены» ниже — его конкретная реализация в этом репо.

### Анти-AI правила («Сцена», дизайн-директура 2026-07-04)

Арт-директура — [specs/2026-07-04-dizayn-sprint-stsena-design.md](docs/superpowers/specs/2026-07-04-dizayn-sprint-stsena-design.md). Обязательно:
1. **Никаких рядов pill-чипов.** Факты доверия — строкой-тикером (`.ticker`) вдоль тонкой линии.
2. **CountUp-счётчики — по решению владельца (2026-07-07) СНОВА на витринах, с анимацией роста** (блок доверия главной: 14+ / 200+ / 60 000+ / гарантия; оживлённые числа в hero `/dlya-doma`, `/dlya-biznesa`). Изначально анти-AI-правило их запрещало (только статика/тикер) — **отменено прямым запросом владельца**. Не убирать без нового решения.
3. **Сетка «иконка+заголовок+текст» — максимум одна на страницу**; заголовки секций — просто текст, без нумерации 01/02 и без lucide-кружков (нумерация убрана по решению владельца 2026-07-07).
4. **Тени-«клей» запрещены.** Разделение поверхностей — цвет (`bg-background` на `bg-page`) + hairline `border border-border`. Тень только у плавающих элементов (FAB, оверлеи, sticky, drawer). Крупные карточки-контейнеры — единый фон `bg-background` (не `bg-surface`/градиент) во всех темах.
5. **Сток-фото — по решению владельца (2026-07-07) ВРЕМЕННО разрешён** (`public/scenariy/*.jpg` на главной hero + секция «Дом/бизнес» и на лендингах `/dlya-doma`, `/dlya-biznesa`) до реальных фото от заказчика. Изначально запрещался как AI-телл — **возвращён прямым запросом владельца**. Где реального фото нет — типографический плейсхолдер на `bg-scene`. Не убирать сток без нового решения.
6. **Фото товаров** — на подложке `bg-scene` с паддингом; белые плашки в тёмной теме запрещены.
7. **Фирменный приём «подсветка строки»** — `<HighlightLine>` / класс `.hl` на ключевом слове заголовка (≤ половины h1), активном пункте nav. С 2026-07-07 — акцентный текст (`color: var(--color-cta)` + тонкое подчёркивание), НЕ заливка-блок; `HighlightLine` — чистый SSR-компонент без анимации.
8. **Один WhatsApp-CTA на вьюпорт.** Иерархия: зелёный WhatsApp → акцентный CTA (`bg-cta`, неон-жёлтый в тёмной теме / чернильно-синий в светлой) → ghost.
9. **Радиусы только из шкалы** (`rounded-sm/md/lg/xl` = 6/8/10/12px). `rounded-2xl`/`rounded-3xl` запрещены. On-primary текст — `text-primary-fg`, НЕ `text-white` (в тёмной primary светлый).
10. **Без длинного тире «—» в видимой прозе: владелец (2026-07-11) считает его AI-теллом.** Тире-паузу, вставку или приём «список — итог» заменяй на запятую, точку, двоеточие или переформулировку в актив. НЕ трогай короткое тире «–» в диапазонах (`20–60`, `1–2 дня`, `70–90 °C`) — это запись диапазона, не стилевой приём; дефис в словах (`Караоке-вечер`, `AST-250`) остаётся. Правило про пользовательскую прозу (контент JSON + тексты в JSX), код-комментарии не в счёт. Замену **варьируй** (не только двоеточие), иначе новый знак сам станет теллом. Статус зачистки — в `docs/HANDOFF.md` (заход по страницам, блог отдельно).

### Хлебные крошки (Breadcrumb)

**Каждая страница кроме главной (`/`) обязана иметь хлебные крошки.**

Компонент: `src/components/Breadcrumb.tsx`, пропс `items: { label: string; href?: string }[]`.
Всегда начинается с «Главная» (захардкожено внутри компонента) — в `items` её не передавай.

```tsx
import { Breadcrumb } from "@/components/Breadcrumb";
// Одноуровневая:
<Breadcrumb items={[{ label: "Контакты" }]} />
// Двухуровневая (каталог → товар):
<Breadcrumb items={[{ label: "Каталог", href: "/catalog" }, { label: p.model }]} />
```

Размещай **первым элементом** внутри `<Container>`, до `<h1>`. Не заменяй самодельным `flex gap-2`.

Страницы на компоненте `LandingPage` крошку получают через опциональный проп `breadcrumb` (`<LandingPage breadcrumb={<Breadcrumb …/>} …>`), а не внутри `<Container>`. Покрыты все динамические роуты: `blog/[slug]`, `komplekty` (индекс), `komplekty/[area]`, `karaoke/[scenario]` (добавлено 2026-06-25 — раньше нарушали правило).

### Иконки в списках карточек (guard — обязательно)

Поле `icon` в data-массивах — **опциональное в типе и защищённое в рендере**, чтобы удаление иконки не роняло карточку (история бага: «убрал иконку → пропала карточка» = `<undefined/>` → краш рендера / ошибка сборки).

```tsx
import { Wrench, type LucideIcon } from "lucide-react";
const items: { icon?: LucideIcon; title: string }[] = [{ icon: Wrench, title: "…" }];
// в рендере — guard:
{Icon && <Icon className="h-5 w-5" />}
// для доступа s.icon: const Icon = s.icon; {Icon && <Icon .../>}
```

«Убрать иконки с карточек» = убрать поле `icon` из ДАННЫХ. Рендер не трогать — guard уже держит. Применено в: servis, dlya-doma, dlya-biznesa, o-nas, ServiceSteps, CalculatorClient.

### Темизируемый текст — только токен-утилиты

Цвет текста, который меняется по теме, — **только** `text-foreground` / `text-muted-foreground` (флипаются через `.dark` в `theme.css`). **Никаких** `dark:text-[#…]` / `dark:text-white` в компонентах — это возвращает whack-a-mole тёмной темы. `dark:hover:text-white` → не нужен: `hover:text-foreground` в тёмной даёт светлый. Фон страницы — токен `--color-page` (утилита `bg-page`; `#f5f5f5` light / `#0e131c` dark); `body` и `dark:bg-page` в Header/Footer идут от него — не хардкодь `#0e131c`/`#f5f5f5`.

### Рассрочка / Kaspi

Рассрочка Kaspi **удалена полностью** — не упоминать в UI, metadata, CTA. Заказ → WhatsApp (`siteConfig.whatsapp`). Рассинхрон, найденный аудитом 2026-06-22 (≈21 вхождение на LIVE), **устранён 2026-06-23**: убраны hero, `/мес` на карточках (`ProductCard`), строка в сравнении, бейдж komplekty, FAQ и упоминания в ~7 SEO-описаниях; функция `installmentMonthly` удалена. Не возвращать без явного решения.

## ЕДИНОЕ ПРАВИЛО: сразу обнови ВСЕ доки → коммит → пуш (атомарно)

> Подтверждено владельцем 2026-07-06 как **главное операционное правило репо**. Действует на ЛЮБОЕ изменение (код, контент, дизайн, конфиг, доки) — без исключений.

**После каждого завершённого изменения — сразу, не откладывая:**
1. **Обнови ВСЕ затронутые доки в том же коммите** — минимум `docs/HANDOFF.md`, а также любой релевантный `spec`/`plan`/`CLAUDE.md`, если правка их касается. Не follow-up'ом, не «потом».
2. **Коммит** (`git -C ~/Desktop/karaokeshop commit`) — код + доки вместе, одним коммитом.
3. **Пуш сразу** (`git push origin main`) — не позже, не пачкой; затем проверить CI (`gh run list`) до `success`.

Никогда не оставлять незакоммиченные правки «на потом», не коммитить без обновления доков, не коммитить без немедленного пуша. Три шага неразделимы.

| Что изменилось | Что обновить |
|---|---|
| Любой код / компонент | `docs/HANDOFF.md` — раздел «Последняя сессия» |
| Новый роут / страница | `docs/HANDOFF.md` + `apps/web/src/app/sitemap.ts` |
| Дизайн / токены / тема | `docs/HANDOFF.md` |
| Стек / зависимости / конфиг | `CLAUDE.md` + `docs/HANDOFF.md` |

## Чеклист перед коммитом

- [ ] `npm run build -w web` — собирается чисто (статика в `apps/web/out`)
- [ ] `npm test -w web` и `npm test -w @kk/ui` — зелёные
- [ ] **`docs/HANDOFF.md` обновлён** в этом же коммите
- [ ] Если новый роут — добавлен по [url-map.md](docs/strategy/url-map.md) с `generateMetadata` (title/description), есть в sitemap, **есть `<Breadcrumb>`**
- [ ] Если изменена модель данных — [docs/context/data-model.md](docs/context/data-model.md) обновлён
- [ ] Если изменён контент для владельца — сверено с [docs/redaktirovanie-sajta.md](docs/redaktirovanie-sajta.md)
- [ ] Коммит-автор — `airginggger-collab <airg.inggger@gmail.com>`, push по SSH в `main` **сразу**

## Ссылки

- Прод: https://karaokeshop.airg-inggger.workers.dev/
- Repo: https://github.com/airginggger-collab/Karaokeshop
- Индекс docs: [docs/README.md](docs/README.md) · Снимок состояния: [docs/HANDOFF.md](docs/HANDOFF.md)
