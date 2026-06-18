# karaokeshop.kz — редизайн

Полный ребилд интернет-магазина караоке-оборудования (Алматы; бренды AST и Studio Evolution). Local-first документация и контекст проекта.

> 📚 **Вся документация и контекст — в [`docs/`](docs/README.md).** Это единый источник правды. Начинай оттуда.

## Быстрые ссылки
- [Индекс документации (карта)](docs/README.md)
- [Стратегия редизайна](docs/strategy/2026-06-18-redesign-strategy.md)
- [Семантическое ядро + карта URL](docs/strategy/semantic-core.md)
- [План Фазы 0–1](docs/plans/2026-06-18-phase-0-1.md)
- [Бриф заказчику](docs/client/client-brief.md) · [Быстрая анкета](docs/client/client-quick-survey.md)

## Статус
Фаза 0–1 (фундамент + IA/дизайн-система). Дорожная карта — в стратегии.

## Стек (план)
Next.js (App Router, SSR/SSG) + Headless CMS · интеграция Kaspi · SEO под Google + Яндекс · монорепо Turborepo.

## Структура
```
docs/
├── README.md      — индекс-карта всей документации
├── strategy/      — стратегия, семантическое ядро
├── research/      — рыночное исследование, конкуренты, аналитика
├── plans/         — планы по фазам
├── design/        — прототипы, дизайн-система, Figma
├── adr/           — решения (Architecture Decision Records)
├── context/       — handoff для разработчиков (data-model, API, content-model)
└── client/        — бриф, анкета, ответы заказчика
```

> Работа с git — только через `git -C ~/Desktop/karaokeshop`, чтобы не перепутать репозиторий.
