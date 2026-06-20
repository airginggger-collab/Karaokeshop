# Промт для переезда на новую сессию

Скопируй текст ниже и вставь первым сообщением в новую сессию (Sonnet 4.6 и т.п.).

---

```text
Проект: karaokeshop.kz — ребилд интернет-магазина караоке-оборудования.
Это ОТДЕЛЬНЫЙ проект в ~/Desktop/karaokeshop (НЕ medlog, хотя сессия может
стартовать из каталога medlog — не перепутай).

Прежде чем что-либо делать:
1. Прочитай ~/Desktop/karaokeshop/docs/HANDOFF.md (снимок состояния) и
   docs/README.md (индекс). В них всё: что готово, что live, что дальше.

Правила работы с git (строго):
- Коммить только через: git -C ~/Desktop/karaokeshop ...
  (Bash сбрасывает рабочую директорию на medlog между вызовами).
- Push по SSH (ключ уже работает). Identity репо уже задана в local config
  (airginggger-collab <airg.inggger@gmail.com>) — отдельный -c не нужен.
- Репозиторий: github.com/airginggger-collab/Karaokeshop, ветка main.
- Каждый push в main авто-деплоится на Cloudflare (~1–2 мин).

Стек: Next.js 15 (App Router, output: export — статика) + Turborepo (npm
workspaces) + Tailwind на токенах + Storybook.
Проверка изменений:
  npm run build -w web   (сборка → apps/web/out)
  npm test -w web        (тесты)
Превью-MCP привязан к medlog — НЕ использовать; верифицировать через build
+ curl живого URL: https://karaokeshop.airg-inggger.workers.dev/

Контент/данные для правок:
  apps/web/src/lib/site.ts (товары, бренды, блог, кейсы, песни, контакты),
  apps/web/src/lib/components.ts (цены калькулятора),
  apps/web/public/products/ (фото).

Важно: show-service — поставщик, на сайте НЕ упоминается. Цены — оценочные
(поставщик их скрывает). Фото товаров сейчас демо (Unsplash) — временные.

Сначала сориентируйся по HANDOFF.md, потом жди мою задачу.
```
