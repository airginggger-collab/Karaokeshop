# Модель данных

> ⚠️ **Этот документ — ПЛАНОВАЯ схема для будущей CMS**, не описание текущего кода.
>
> **Текущая реальность:** контент захардкожен в `apps/web/src/lib/site.ts` (TypeScript-типы + массивы). Фактические поля смотри там — они беднее плановых (нет `priceHistory`, `specs`, `seo`, `*_kk`, `videoUrl`; `image` — строка Unsplash, не `asset[]`).
>
> **Когда CMS будет выбрана** (ADR-0001), схема ниже станет основой для её конфигурации. До этого — справочник намерений, не реальности.

Сущности для любой CMS (см. [ADR 0001](../adr/0001-cms.md)). Заказчик заполняет данными (товары/цены/песни/кейсы). Поля `seo` и `*_kk` (KZ) — план, в `site.ts` их нет.

## product — караоке-система / товар
| Поле | Тип | Прим. |
|---|---|---|
| `slug` | string (уник.) | URL: `/product/ast-250` |
| `brand` | enum: `ast` \| `studio_evolution` | бренд |
| `model` | string | «AST-250» |
| `scenario` | enum[]: `dom` `kafe` `bar` `klub` `otel` | сценарий (для тегов и фильтров) |
| `areaMax` | number (м²) | до скольки м² рассчитан |
| `type` | enum: `sistema` `mikrofon` `akustika` `miksher` `svet` `aksessuar` | тип |
| `price` | number (₸) | текущая цена |
| `priceOld` | number? (₸) | старая цена (для −%) |
| `priceHistory` | {date, price}[] | **журнал цен** (не перезапись) |
| `installmentMonthly` | number? | платёж/мес (или вычисляется price/12) |
| `inStock` | bool | наличие |
| `kit` | string[] | что в комплекте |
| `songsCount` | number | песен в базе |
| `specs` | {key,value}[] | характеристики |
| `images` | asset[] | фото. **Сейчас:** поле `image: string` — Unsplash URL (временное демо). Заменить на `/products/<slug>.jpg` |
| `videoUrl` | string? | демо |
| `rating` / `reviewsCount` | number | для AggregateRating |
| `seo` | SEO | см. ниже |
| `*_kk` | — | KZ-локали текстовых полей |

## bundle — готовый комплект по площади
| Поле | Тип |
|---|---|
| `slug` | `do-80` |
| `title` / `title_kk` | «Караоке для бара до 80 м²» |
| `areaMax` | number |
| `venueType` | enum: `kafe` `bar` `klub` `otel` |
| `priceFrom` / `priceTo` | number (диапазон под ключ) |
| `includes` | string[] (состав) |
| `serviceIncluded` | string[] (проект, монтаж, обучение…) |
| `products` | ref→product[] |
| `seo` | SEO |

## case — кейс оснащённого заведения (B2B-доверие)
| Поле | Тип |
|---|---|
| `slug` / `title` | «Караоке-бар, Алматы» |
| `venueType` / `city` / `area` | сегментация |
| `system` | ref→product |
| `images` | asset[] |
| `quote` | отзыв владельца |
| `seo` | SEO |

## song — позиция каталога песен (опц., если показываем базу)
| Поле | Тип |
|---|---|
| `title` / `artist` / `language` | string |
| `updatedAt` | date (для «обновление репертуара») |

## lead — заявка (B2B/консультация)
| Поле | Тип |
|---|---|
| `name` / `phone` | string |
| `venueType` / `area` | из калькулятора |
| `recommendedKit` | string (контекст из подбора) |
| `source` | enum: `pod_klyuch` `product` `bundle` `home` |
| `createdAt` | date |
> Уходит в CRM/уведомление (WhatsApp/почта). Основа будущего дэшборда.

## page / blogPost — страницы и статьи
| Поле | Тип |
|---|---|
| `slug` / `title` / `body` | контент (+ `*_kk`) |
| `cluster` | какой SEO-кластер закрывает |
| `faq` | {q,a}[] (для FAQPage-разметки) |
| `seo` | SEO |

## SEO (встраиваемый объект у всех публичных сущностей)
| Поле | Тип |
|---|---|
| `title` / `description` | string (RU + `*_kk`) |
| `ogImage` | asset |
| `canonical` | string? |
| `noindex` | bool |

## Шаблон для заказчика
Самое срочное — заполнить `product` по всем актуальным системам AST и Studio Evolution (модель, бренд, сценарий, площадь, цена, состав, песни, фото). Формат: Excel/Google Sheets по колонкам выше → импортируем в CMS. См. [бриф, раздел 3 «Данные каталога»](../client/client-brief.md).
