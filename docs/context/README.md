# context/ — контекст для разработчиков (handoff)

То, что отдаётся разработчику для входа в проект.

| Файл | Что внутри | Статус |
|---|---|---|
| [content-model.md](content-model.md) | Текущая реальность: типы и данные из `site.ts` | ✅ актуально |
| [data-model.md](data-model.md) | Плановая CMS-схема (для Sanity, Фаза 2) | ⚠️ план, не код |
| [data-migration.md](data-migration.md) | Как мигрировать site.ts → Sanity | ✅ готов |
| [api-contracts/leads.md](api-contracts/leads.md) | Лид-заявки: текущий WhatsApp-флоу + плановый API | ✅ готов |
| `env.example` | Переменные окружения (в `apps/web/`) | ✅ готов |

**Принцип:** документ позволяет разработчику с нулевым контекстом понять систему. Источник истины для текущего контента — `apps/web/src/lib/site.ts`; для токенов — `packages/tokens`.
