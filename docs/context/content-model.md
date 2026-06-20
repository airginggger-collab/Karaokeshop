# Контент-модель — текущая реальность (site.ts)

> **Это снимок того, что реально в коде прямо сейчас** (`apps/web/src/lib/site.ts`).
> Плановая CMS-схема (поля `seo`, `*_kk`, `priceHistory`, `specs`) — в [data-model.md](data-model.md).
> Когда Sanity будет подключён (ADR-0001) — этот файл устареет, данные переедут в CMS Studio.

---

## siteConfig — глобальные настройки сайта

```ts
siteConfig = {
  name: "karaokeshop",
  url: "https://www.karaokeshop.kz",
  city: "Алматы",
  phone: "+7 707 579-99-95",
  whatsapp: "77075799995",          // используется во всех wa.me-ссылках
  address: "Алматы, ул. Муканова, офис 8",
  hours: "Пн–Сб · 10:00–19:00",
  email: "karaokeshop2015@gmail.com",
  defaultTitle: string,
  defaultDescription: string,
}
```

Правка: строки в `site.ts` → `siteConfig`.

---

## Product — товар

```ts
type Product = {
  slug: string;          // URL-идентификатор: /product/<slug>
  type: ProductType;     // "sistema" | "akustika" | "mikrofon" | "sub" | "miksher"
  model: string;         // «AST-250»
  brand: string;         // «AST», «Studio Evolution», «Shure», …
  price: number;         // ₸, оценочная (поставщик цены не публикует)
  priceOld?: number;     // для отображения скидки
  inStock: boolean;
  featured?: boolean;    // выводится на главной/в топе
  rating?: number;
  reviewsCount?: number;
  power?: string;        // для акустики/сабвуфера
  note?: string;         // для микрофонов
  image?: string;        // Unsplash URL (временно); заменить на /products/<slug>.jpg
  // только для систем:
  scenario?: string;     // "dom" | "kafe" | "bar" | "klub"
  scenarioLabel?: string;
  areaMax?: number;      // м²
  songsCount?: number;
  kit?: string[];        // состав комплекта
}
```

**18 товаров** в массиве `products`:
- Системы (4): ast-250, ast-mini, evobox, evobox-plus
- Акустика (6): the-box-achat-mini, the-box-cl115, the-box-cl110, rcf-evox-8, hk-polar-10, martin-xp12a
- Сабвуфер (1): martin-xp118a
- Микрофоны (6): shure-blx24-sm58, shure-blx24-pg58, shure-blx288, shure-qlxd24, rolenz-vm200, rolenz-rdl200
- Микшер (1): dynacord-powermate

---

## Landing — сценарные лендинги и статические страницы

```ts
type Landing = { slug: string; h1: string; title: string; description: string }
```

**scenarios** (5): dlya-doma, dlya-kafe, dlya-bara, dlya-restorana, dlya-kluba → `/karaoke/<slug>`

**bundles** (4): do-30, do-50, do-80, do-100 → `/komplekty/<slug>`

**staticPages** (1): servis → `/<slug>` (через catch-all `[page]`)

Отдельные named-экспорты: `oNasMeta`, `kontaktyMeta`, `sravnenieMeta`, `catalogMeta`, `podKlyuchMeta`, `komplektyIndexMeta`, `kalkulyatorMeta`, `pesniMeta`.

---

## Brand

```ts
type Brand = { slug: string; name: string; h1: string; title: string; description: string }
```
2 бренда: ast, studio-evolution → `/brand/<slug>`

---

## Case — B2B-кейс

```ts
type Case = { slug: string; venue: string; city: string; area: string; system: string; quote: string; author: string }
```
3 кейса: bar-almaty, restoran-astana, otel-shymkent → страница `/keysy`

---

## BlogPost

```ts
type BlogPost = {
  slug: string; title: string; description: string;
  date: string; readingTime: string; cluster: string;
  body: string;          // HTML-строка
  faq?: { q: string; a: string }[];
}
```
3 поста: kak-vybrat-karaoke-dlya-bara, skolko-stoit-osnastit-karaoke-klub, ast-ili-evolution → `/blog/<slug>`

---

## Song — песня в каталоге

```ts
type Song = { title: string; artist: string; language: "RU" | "KZ" | "EN" }
```
Демо-список (~20 позиций) → страница `/pesni`

---

## allPaths() — все URL в sitemap

44 пути: `/` + 10 фиксированных + 5 сценарных + 4 комплекта + 2 бренда + 18 товаров + 3 блога + 1 staticPage.

⚠️ `/sravnit` (сравнение товаров) есть как роут, но **не в `allPaths()`** → пропущен в sitemap. Фикс: добавить `"/sravnit"` в функцию.

---

## Калькулятор (components.ts)

Отдельный файл `src/lib/components.ts` — цены оборудования для калькулятора сметы.
Структуры: `BaseSystem`, `Acoustic`, `Comp`. Цены оценочные, правятся там же.
