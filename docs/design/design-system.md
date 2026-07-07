# Дизайн-система «Сцена» — шпаргалка (токены, типографика, Stitch/Figma)

> **Источник правды — код, не этот файл.** Все значения ниже взяты 1:1 из:
> - цвета — [`packages/tokens/css/theme.css`](../../packages/tokens/css/theme.css) (light + `.dark`);
> - радиусы — [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json) → `css/tokens.css`;
> - маппинг утилит — [`apps/web/tailwind.config.ts`](../../apps/web/tailwind.config.ts);
> - шрифты — [`apps/web/src/app/layout.tsx`](../../apps/web/src/app/layout.tsx).
>
> Меняешь дизайн — правь **код-токены**, потом синхронизируй сюда (единое правило репо). Тема по умолчанию на сайте — **тёмная** (`class="dark"` на `<html>` из SSR).

---

## 1. Цвет

Каждый токен = утилита Tailwind + CSS-переменная + два значения (light / dark).
On-текст (текст поверх заливки) даётся отдельным токеном — не хардкодить `text-white`.

### Поверхности
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `bg-page` | `--color-page` | `#f4f2fa` | `#0b0913` |
| `bg-background` | `--color-bg` | `#ffffff` | `#171226` |
| `bg-surface` | `--color-surface` | `#eceaf5` | `#221a38` |
| `bg-muted` | `--color-muted` | `#e5e0f2` | `#141021` |
| `border-border` | `--color-border` | `#d9d3ea` | `#2c2347` |

### Текст
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `text-foreground` | `--color-fg` | `#1a1430` | `#f2effc` |
| `text-muted-foreground` | `--color-muted-fg` | `#5d5578` | `#a89fd0` |

### Марка · акцент
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `text/bg-primary` | `--color-primary` | `#4c30b8` | `#9d8bf0` |
| `text-primary-fg` | `--color-primary-fg` | `#ffffff` | `#170f38` |
| `bg-primary-soft` | `--color-primary-soft` | `#e9e4fb` | `#251c44` |
| `accent` | `--color-accent` | `#4c30b8` | `#9d8bf0` |
| `accent-fg` | `--color-accent-fg` | `#35208c` | `#c9c2e8` |
| `accent-soft` | `--color-accent-soft` | `#e9e4fb` | `#251c44` |

Марка логотипа (не токенизирована, фиксирована в Header + фавикон): **`#7c5cff`**.

### Действия (кнопки, горячий бейдж)
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `bg-cta` | `--color-cta` | `#6742e8` | `#7250f8` |
| `text-cta-fg` | `--color-cta-fg` | `#ffffff` | `#ffffff` |
| `bg-hot` | `--color-hot` | `#d6296b` | `#ff5c8a` |
| `text-hot-fg` | `--color-hot-fg` | `#ffffff` | `#2a0a14` |

`--color-hot` — дозированный акцент (скидки/горячие бейджи), **не для кнопок**.
WhatsApp-CTA — зелёный `#25D366`, намеренно **не токенизирован**.

### Состояния
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `text-success` | `--color-success` | `#15803d` | `#4ade80` |
| `text-danger` | `--color-danger` | `#c02637` | `#ff6b6b` |

### Сцена (подложка фото товара)
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `bg-scene` | `--color-scene` | `#f0eef8` | `#1f1832` |

Фото товара — на `bg-scene` с падингом. Белые плашки в тёмной теме запрещены.

---

## 2. Типографика

next/font/google, subsets `latin` + `cyrillic`.

| Роль | Шрифт | Начертания | Где |
|---|---|---|---|
| Display / заголовки | **Unbounded** (`font-display`) | 600, 700 | h1/h2, числа-акценты |
| Body / UI | **Manrope** (`font-sans`) | 400, 500, 600, 700 | весь текст, кнопки, подписи |

База UI-текста — `font-medium` (500). `h1–h3` — `letter-spacing: -0.01em`.

### Шкала размеров (Tailwind, 1rem = 16px)
| Утилита | Размер | Line-height |
|---|---|---|
| `text-xs` | 12px | 16px |
| `text-sm` ★ | 14px | 20px |
| `text-base` | 16px | 24px |
| `text-lg` | 18px | 28px |
| `text-xl` | 20px | 28px |
| `text-2xl` | 24px | 32px |
| `text-3xl` | 30px | 36px |
| `text-4xl` | 36px | 40px |
| `text-5xl` | 48px | 1.0 |
| `text-6xl` | 60px | 1.0 |

★ — самые ходовые (`text-sm`, `text-xs`, `font-medium`).

### Фирменные приёмы
- **Подсветка строки** `.hl` / `<HighlightLine>` — заливка `--color-cta`, текст `--color-cta-fg`, радиус 4px. На ключевом слове заголовка (≤ половины h1) и активном пункте nav.
- **Тикер фактов** `.ticker` — 12px, `letter-spacing: 0.12em`, вдоль hairline-линии сверху. Вместо ряда pill-чипов.

---

## 3. Радиусы (Style Dictionary → `tokens.css`)

| Утилита | Значение |
|---|---|
| `rounded-sm` | 6px |
| `rounded-md` | 8px |
| `rounded-lg` | 10px |
| `rounded-xl` | 12px |
| `rounded-full` | 9999px (аватары, точки, иконки-кнопки) |

⛔ `rounded-2xl` / `rounded-3xl` **запрещены**. Подсветка `.hl` — 4px.

---

## 4. Отступы (Tailwind, шаг 4px)

| Токен | px |  | Токен | px |
|---|---|---|---|---|
| `1` | 4 |  | `8` | 32 |
| `2` ★ | 8 |  | `10` | 40 |
| `3` | 12 |  | `12` | 48 |
| `4` ★ | 16 |  | `16` | 64 |
| `5` | 20 |  | `20` | 80 |
| `6` | 24 |  | `24` | 96 |

Карточки — внутренний падинг `p-5`/`p-6` (20–24px). Секции по вертикали — `py-10` (80px). Зазоры — `gap-2/3/4`.

---

## 5. Сетка и layout

- **Container:** центрирован, `max-width` 1152px (`max-w-6xl`), боковой падинг 16px (`px-4`).
- **Карточки:** `bg-background` на `bg-page` + hairline `border-border`. Разделение поверхностей — **цветом + hairline, не тенью**.
- **Тени:** только у плавающих элементов (FAB, оверлеи, sticky, drawer). Тени-«клей» между секциями запрещены.
- Заголовки секций — нумерация `01 / 02`, не lucide-кружки. Сетка «иконка+заголовок+текст» — максимум одна на страницу.

---

## 6. Промпты для Google Stitch (тёмная тема)

Stitch забирает тему из текста промпта; после генерации основной цвет/шрифт/скругление доводятся в его панели. Один промпт = один экран.

### 🇬🇧 English

```text
Design a dark-theme UI for a karaoke-equipment online store ("night concert"
vibe). Deep violet-black stage backgrounds, soft lavender text, one bold
electric-purple action color. Flat surfaces separated by 1px hairline borders,
no shadows except on floating elements, no gradients.

Colors: page #0B0913, cards #171226, raised surface #221A38, borders #2C2347,
text #F2EFFC, muted text #A89FD0, accent/links #9D8BF0, primary button #7250F8
(white text), sale badge #FF5C8A, success #4ADE80, error #FF6B6B, product-photo
backdrop #1F1832.

Fonts: headings "Unbounded" (bold, tight tracking), body & UI "Manrope".
Corner radius 8–12px (never larger). 4px spacing scale. Centered content,
max-width 1152px.

Buttons: primary solid #7250F8; secondary ghost with #2C2347 border. Product
photos sit on a #1F1832 backdrop with padding. Section headers use small
numeric labels (01, 02), not icons.
```

### 🇷🇺 Русский

```text
Сделай тёмную тему для интернет-магазина караоке-оборудования, настроение
«ночь концерта». Фиолетово-чёрный фон-сцена, лавандовый текст, один яркий
фиолетовый акцент. Плоские поверхности, разделённые границей 1px, без теней
(тень только у плавающих элементов), без градиентов.

Цвета: фон #0B0913, карточки #171226, подложка #221A38, границы #2C2347,
текст #F2EFFC, приглушённый #A89FD0, акцент/ссылки #9D8BF0, кнопка #7250F8
(белый текст), бейдж скидки #FF5C8A, успех #4ADE80, ошибка #FF6B6B,
подложка фото товара #1F1832.

Шрифты: заголовки «Unbounded» (жирный, плотный трекинг), текст и интерфейс
«Manrope». Скругление 8–12px, не больше. Отступы кратны 4px. Контент по центру,
макс. ширина 1152px.

Кнопки: основная — заливка #7250F8; вторичная — ghost с рамкой #2C2347. Фото
товара на подложке #1F1832 с падингом. Заголовки секций — цифрами (01, 02),
без иконок.
```

### UI-панель Stitch (выставить руками после генерации)
| Контрол | Значение |
|---|---|
| Mode / Appearance | Dark |
| Primary color | `#7250F8` (кнопки) / `#9D8BF0` (акцент-текст) |
| Background | `#0B0913` |
| Font | Manrope (заголовки — Unbounded, если есть) |
| Corner radius | 8px (Medium) |

Замечания: Unbounded может отсутствовать в пикере Stitch → близкий wide-display. После генерации проверь `#7250F8` и `#0B0913` — Stitch любит сдвигать эти цвета.
