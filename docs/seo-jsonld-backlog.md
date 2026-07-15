# SEO / JSON-LD: остаточный бэклог (аудит 2026-07-15)

> Источник: exhaustive-аудит workflow'ом (4 измерения × адверсариальная верификация, 39 находок, 31 вердикт). Всё P0/P1/P2 code-fixable уже внедрено (см. `docs/HANDOFF.md`, коммиты 2026-07-15). Здесь только открытое: либо заблокировано ассетами владельца, либо низкоценно (без rich-результата).

## Уже сделано (не повторять)

- `productJsonLd`: `sku`, `description`, `category`, `offers.itemCondition=NewCondition`, `offers.priceValidUntil`, `seller` по `@id #business`.
- `websiteJsonLd` (WebSite + SearchAction на `/catalog?q=`), `blogPostingJsonLd` (26 постов), `itemListJsonLd` (каталог).
- BreadcrumbList (`withLd`) на всех 7 ранее-проблемных роутах, рассинхрон LD с видимой крошкой на `/dlya-doma` `/keysy` `/sravnenie` устранён.
- LocalBusiness → `ElectronicsStore` + `areaServed` + `hasMap` + `image`.
- P0: выдуманные `rating`/`reviewsCount` удалены из `products.json` (мина снята), `aggregateRating` ждёт реальные отзывы.

## Открыто

### Заблокировано ассетами/решением владельца

| Что | Где | Разблокирует |
|---|---|---|
| `logo` + реальные `sameAs`-профили LocalBusiness | `layout.tsx` localBusinessLd | Файл логотипа в `public/` + ссылки на Instagram / Google Business / карточку организации 2ГИС (не URL поиска). URL логотипа наследует `siteConfig.url` → до привязки `.kz` резолвится на Wix |
| Фото товаров у 14/18 (`image` в Product) | `products.json` | Реальные фото товаров (ловушка 4: сейчас демо/временные). НЕ подставлять общий `og.jpg` (рассинхрон с видимым плейсхолдером + ведёт на Wix) |
| `datePublished`/`dateModified`/`author`/`image` у 26 постов (Article rich) | `blog.json`, `blogPostingJsonLd` | Реальные даты/автор/картинки постов от владельца |

### Инфраструктурный риск (кодом не чинится)

- **Все абсолютные URL разметки/canonical/og ведут на `www.karaokeshop.kz` (старый Wix, домен не привязан).** `siteConfig.url` НЕ менять (запрет владельца, ловушка 7). Снимается привязкой домена к Cloudflare. До привязки: не сабмитить `sitemap.xml` в Search Console; прод `workers.dev` НЕ закрывать `noindex` (обнулит единственную живую органику); после cutover прогнать Google Rich Results Test.

### Низкоценно (entity-граф, без rich-результата) — по желанию

- `Service`-разметка на `/servis` и `/pod-klyuch` (`provider: {@id #business}`, `areaServed`).
- `itemListJsonLd` на индекс `/komplekty` и страницы `/brand/[slug]` (у `/gotovye-resheniya` нет пер-товарных URL, пропустить).
- FAQPage валиден, но Google с 2023 не даёт FAQ-сниппет коммерции: не удалять, не рассчитывать на сниппет.
