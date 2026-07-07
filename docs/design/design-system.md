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
| `bg-page` | `--color-page` | `#edf0f5` | `#0e131c` |
| `bg-background` | `--color-bg` | `#ffffff` | `#172130` |
| `bg-surface` | `--color-surface` | `#e4e9f0` | `#22304a` |
| `bg-muted` | `--color-muted` | `#e4e9f0` | `#141b28` |
| `border-border` | `--color-border` | `#d3dae5` | `#2a3852` |

### Текст
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `text-foreground` | `--color-fg` | `#16203a` | `#f0f4fc` |
| `text-muted-foreground` | `--color-muted-fg` | `#566178` | `#aac0d6` |

### Марка · акцент
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `text/bg-primary` | `--color-primary` | `#17233f` (чернильно-синий) | `#facc15` (неон-жёлтый) |
| `text-primary-fg` | `--color-primary-fg` | `#ffffff` | `#2a2400` |
| `bg-primary-soft` | `--color-primary-soft` | `#e2e7f0` | `#2a2408` |
| `accent` | `--color-accent` | `#17233f` | `#facc15` |
| `accent-fg` | `--color-accent-fg` | `#17233f` | `#fef3c7` |
| `accent-soft` | `--color-accent-soft` | `#e2e7f0` | `#2a2408` |

Марка логотипа (не токенизирована, фиксирована в Header + фавикон, не флипается по теме): квадрат **`#17233f`** (тёмно-синий) с тонким бордером **`#2a3852`** + микрофон **`#facc15`** (жёлтый) — перекрашена 2026-07-07 под новую палитру (была фиолетовая `#7c5cff` + белый мик).

### Действия (кнопки, горячий бейдж)
| Утилита | CSS-переменная | Light | Dark |
|---|---|---|---|
| `bg-cta` | `--color-cta` | `#17233f` | `#facc15` |
| `text-cta-fg` | `--color-cta-fg` | `#ffffff` | `#2a2400` |
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
| `bg-scene` | `--color-scene` | `#eef1f6` | `#1a2233` |

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
- **Подсветка строки** `.hl` / `<HighlightLine>` — заливка `--color-cta` (неон-жёлтый в тёмной, чернильно-синий в светлой), текст `--color-cta-fg`, радиус 4px. На ключевом слове заголовка (≤ половины h1) и активном пункте nav.
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

## 6. Промпты для Google Stitch (UI-кит, тёмная тема)

Stitch по промпту рисует **один экран**, поэтому «кит» задаётся как экран-витрина компонентов (style guide / UI kit sheet), а НЕ лендинг. Ключевые триггеры в промпте: «UI Kit / Style Guide screen (component sheet, NOT an app page)», перечень секций-витрин, «reusable component library sheet for handoff to Figma». Если Stitch обрежет длинный экран — попроси в чате «continue / add the remaining sections» или генери в два захода (секции 1–4, затем 5–7).

### 🇬🇧 English

```text
Design a single "UI Kit / Style Guide" screen (a component sheet, NOT an app
page) for a karaoke-equipment brand, dark theme, neon-yellow accent on a cold
navy "night concert" vibe. One long scrollable screen organized into labeled
sections that showcase the design system. Page background #0E131C, everything
sits on cards #172130 with 1px #2A3852 borders, no shadows, no gradients.

Sections to lay out, in order:

1. COLORS — a grid of color swatches, each a rounded chip with its HEX label
   below: page #0E131C, card #172130, surface #22304A, border #2A3852,
   text #F0F4FC, muted #AAC0D6, accent/primary/CTA #FACC15 (dark text on it),
   sale #FF5C8A, success #4ADE80, error #FF6B6B, photo backdrop #1A2233,
   brand #17233F with #FACC15 mic.
2. TYPOGRAPHY — a type specimen: headings in "Unbounded" bold and body in
   "Manrope", showing the scale 12/14/16/18/20/24/30/36/48/60 px with labels.
3. BUTTONS — all variants and states in a row: primary solid #FACC15 (dark
   #2A2400 text), secondary ghost with #2A3852 border, WhatsApp green #25D366,
   disabled. Show default + hover.
4. BADGES / CHIPS — default chip #22304A, sale badge #FF5C8A, success and
   error tags.
5. FORM FIELDS — text input, textarea and select in dark style, with focus state.
6. CARDS — a plain content card and a product card (product image sits on a
   #1A2233 backdrop with padding, title, price, CTA button).
7. RADIUS & SPACING — sample squares showing corner radius 6/8/10/12 px and a
   4px spacing scale.

Fonts: headings "Unbounded", body/UI "Manrope". Corner radius 8–12px. Label
every section with a small numeric eyebrow (01, 02…). This is a reusable
component library sheet for handoff to Figma.
```

### 🇷🇺 Русский

```text
Сделай один экран «UI Kit / Гайд стилей» (витрина компонентов, НЕ страницу
приложения) для бренда караоке-оборудования, тёмная тема, неон-жёлтый акцент
на холодной тёмно-синей базе, настроение «ночь концерта». Одна длинная
прокручиваемая страница из подписанных секций, показывающих дизайн-систему.
Фон #0E131C, всё на карточках #172130 с границей 1px #2A3852, без теней и
градиентов.

Секции по порядку:

1. ЦВЕТА — сетка свотчей: каждый — скруглённый чип с подписью HEX снизу:
   фон #0E131C, карточка #172130, подложка #22304A, граница #2A3852,
   текст #F0F4FC, приглушённый #AAC0D6, акцент/кнопка #FACC15 (тёмный текст
   на нём), скидка #FF5C8A, успех #4ADE80, ошибка #FF6B6B, подложка фото
   #1A2233, марка #17233F с микрофоном #FACC15.
2. ТИПОГРАФИКА — образец шрифтов: заголовки «Unbounded» жирный, текст
   «Manrope», со шкалой 12/14/16/18/20/24/30/36/48/60 px и подписями.
3. КНОПКИ — все варианты и состояния в ряд: основная заливка #FACC15 (тёмный
   текст #2A2400), вторичная ghost с рамкой #2A3852, WhatsApp зелёная
   #25D366, отключённая. Показать обычное + наведение.
4. БЕЙДЖИ / ЧИПЫ — обычный чип #22304A, бейдж скидки #FF5C8A, теги успеха и ошибки.
5. ПОЛЯ ФОРМ — текстовое поле, textarea и select в тёмном стиле, с состоянием фокуса.
6. КАРТОЧКИ — обычная карточка и карточка товара (фото на подложке #1A2233 с
   падингом, название, цена, кнопка CTA).
7. РАДИУСЫ И ОТСТУПЫ — квадраты со скруглением 6/8/10/12 px и шкалой отступов 4px.

Шрифты: заголовки «Unbounded», текст/интерфейс «Manrope». Скругление 8–12px.
Каждую секцию подписать цифрой (01, 02…). Это переиспользуемая витрина
компонентов для передачи в Figma.
```

### UI-панель Stitch (выставить руками после генерации)
| Контрол | Значение |
|---|---|
| Mode / Appearance | Dark |
| Primary color | `#FACC15` (кнопки и акцент-текст, тёмный текст `#2A2400` поверх) |
| Background | `#0E131C` |
| Font | Manrope (заголовки — Unbounded, если есть) |
| Corner radius | 8px (Medium) |

Замечания: Unbounded может отсутствовать в пикере Stitch → близкий wide-display. После генерации проверь `#FACC15` и `#0E131C` — Stitch любит сдвигать эти цвета.

> **Рецвет 2026-07-07:** промпты и таблица выше обновлены под неон-жёлтый (тёмная) / чернильно-синий (светлая) акцент — решение владельца, см. `docs/HANDOFF.md`. Структура промптов и секций не менялась.
