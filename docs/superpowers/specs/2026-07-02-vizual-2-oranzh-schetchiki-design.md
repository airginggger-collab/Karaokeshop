# Дизайн: визуальный апдейт-2 — оранж в тёмном, счётчики, фоны hero, без верх. обводки — 2026-07-02

> Итерация после янтарного апдейта. Одобрено в брейнсторме 2026-07-02 (превью в companion).

## Цель
Убрать «жёлтость» в тёмных местах, оживить цифры анимацией, смягчить фоны hero, убрать верхнюю 3px-обводку.

## Изменения

### 1. Акцент — менее жёлтый в ТЁМНОМ (светлая тема без изменений)
Только `packages/tokens/css/theme.css`:
- `.dark`: `--color-primary`, `--color-accent`, `--color-cta` `#f59e0b` → **`#f97316`** (оранж). `--color-primary-fg`/`--color-cta-fg` — тёмные, остаются читаемы (текст на оранже — светлый `#fff` где нужно; для кнопок `--color-cta-fg` в тёмной уже `#1a1204`, оставить — тёмный на оранже ок по контрасту).
- `:root` `--night-accent` `#f59e0b` → **`#f97316`** (тёмные секции на светлой странице: hero «Для бизнеса», pod-klyuch).
- `:root` primary/accent (`#b45309`) и cta (`#f59e0b`, золотые кнопки) — **НЕ трогаем** (светлая тема как сейчас).

### 2. Hero «Для бизнеса» — менее чёрный
`apps/web/src/app/dlya-biznesa/page.tsx` hero: `background: var(--night-bg)` (#0b1220) → `background: "linear-gradient(135deg, #1e2b40 0%, #131b29 100%)"`.

### 3. Hero «Для дома» — тёплый серый
`apps/web/src/app/dlya-doma/page.tsx` hero: класс `bg-gradient-to-br from-surface to-muted` → `bg-gradient-to-br from-white to-[#eeeeec]`.

### 4. Анимация счётчиков — компонент `<CountUp>`
Новый клиент-компонент `apps/web/src/components/CountUp.tsx`:
- Пропсы: `value: string` (напр. `"60 000+"`, `"2 года"`, `"14+"`).
- Парсит первое число (цифры, игнорируя пробелы-разделители), запоминает префикс/суффикс (нецифровой хвост, напр. `+`, ` года`).
- На появлении в вьюпорте (IntersectionObserver, once) анимирует 0→N за ~1.1с (ease-out cubic, requestAnimationFrame), форматирует число `Intl.NumberFormat("ru-RU")`, добавляет суффикс.
- `prefers-reduced-motion: reduce` → сразу финальное значение, без анимации.
- До появления/на сервере — показывает финальное значение (SSR-safe: начальный текст = `value`, анимация только на клиенте после mount+intersect).
- Применить: trust-блок главной ([page.tsx](../apps/web/src/app/page.tsx) 4 числа: 14+/200+/60 000+/2 года) + «200+ проектов» в hero «Для бизнеса». Цены (`от 749 000 ₸`) — НЕ анимируем.
- Тест `CountUp.test.tsx`: парсинг value → число+суффикс (напр. `"60 000+"` → 60000/`+`, `"2 года"` → 2/` года`).

### 5. Убрать верхнюю 3px-обводку — везде
Удалить `borderTop`/`borderTopWidth`/`borderTopColor` (3px) в:
- `apps/web/src/app/dlya-doma/page.tsx:53`
- `apps/web/src/app/dlya-biznesa/page.tsx:79` и `:124`
- `apps/web/src/app/pod-klyuch/page.tsx:84`
- `apps/web/src/app/brand/[slug]/page.tsx:78`
- `apps/web/src/app/o-nas/page.tsx:78`

## Вне скоупа
WhatsApp-зелёный, квиз, товарные/сценарные фото, светлый акцент, тинт карточек `#eeeeec` — не трогаем.

## Проверка
`npm run build -w web` + `npm test -w web` (+ новый CountUp-тест) + `npm test -w @kk/ui` зелёные. Превью обеих тем: тёмные места оранжевые (не жёлтые), светлая как была; hero бизнеса не чёрный, дом тёплый серый; счётчики растут при скролле; верхних 3px-линий нет; `prefers-reduced-motion` — числа статичны. Ветка `redesign-amber-2`, мердж после превью.
