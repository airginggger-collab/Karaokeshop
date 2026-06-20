# Миграция контента: site.ts → Sanity CMS

> Когда подключать: после финализации ADR-0001 (выбран Sanity) и получения Sanity Project ID.
> До тех пор — контент в `apps/web/src/lib/site.ts`, правится вручную.

---

## Что мигрировать

| Сущность в site.ts | Тип Sanity | Кол-во записей |
|---|---|---|
| `products[]` | `product` | 18 |
| `scenarios[]` | `landing` (тип: scenario) | 5 |
| `bundles[]` | `landing` (тип: bundle) | 4 |
| `brands[]` | `brand` | 2 |
| `cases[]` | `case` | 3 |
| `blogPosts[]` | `blogPost` | 3 |
| `songs[]` | `song` | ~20 |
| `siteConfig` | `siteSettings` (singleton) | 1 |
| `staticPages[]` | `page` | 1 (servis) |

Калькулятор (`components.ts`) — **не мигрировать** в Sanity; остаётся в коде, правится разработчиком.

---

## Шаги миграции

### Шаг 1: Sanity Studio

```bash
npm create sanity@latest -- --project-id <ID> --dataset production --template clean
# разместить в packages/cms/ или apps/studio/
```

### Шаг 2: Схема (packages/cms-schema)

Описать типы по [data-model.md](data-model.md):
- `product.ts` — все поля + `image: image()` (Sanity asset)
- `brand.ts`, `case.ts`, `blogPost.ts`, `song.ts`, `page.ts`
- `siteSettings.ts` (singleton: phone, whatsapp, address, hours)

### Шаг 3: Наполнение данными

Перенести вручную через Studio или скриптом:

```ts
// scripts/seed-sanity.ts
import { createClient } from "@sanity/client";
import { products } from "../apps/web/src/lib/site";

const client = createClient({ projectId: "...", dataset: "production", token: process.env.SANITY_API_TOKEN, apiVersion: "2024-01-01" });

for (const p of products) {
  await client.create({ _type: "product", ...p });
}
```

Фото: загрузить реальные JPG через `client.assets.upload("image", fs.createReadStream(...))`.

### Шаг 4: Фронт — GROQ-запросы

Заменить импорты из `site.ts` на fetch из Sanity:

```ts
// было:
import { products } from "@/lib/site";

// стало:
import { client } from "@/lib/sanity";
const products = await client.fetch(`*[_type == "product"] | order(featured desc)`);
```

Переход с `output: "export"` на ISR (`revalidate: 3600`) или on-demand revalidation через Sanity webhook.

### Шаг 5: Переключение деплоя

`output: "export"` → убрать (или переключить на `@opennextjs/cloudflare`).
Добавить `NEXT_PUBLIC_SANITY_PROJECT_ID` и `SANITY_API_TOKEN` в Cloudflare environment.

---

## Риски

| Риск | Митигация |
|---|---|
| Потеря SEO при смене URL | URL не меняются — ЧПУ те же (`/product/<slug>`) |
| Слетевшие метаданные | `generateMetadata` переписывается с GROQ-данными; тесты `seo.test.ts` — зелёные |
| Downtime при переключении | Deploy preview на ветке, smoke-тест до мержа в main |
| Цены — по-прежнему оценочные | Отдельная задача: получить прайс от поставщика и внести в Studio |

---

## До миграции (текущий воркэраунд)

Правка контента — через `site.ts` в браузере (GitHub.dev) по [redaktirovanie-sajta.md](../redaktirovanie-sajta.md).
