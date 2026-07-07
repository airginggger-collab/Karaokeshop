# Цветовые системы для сайтов — проверенная база

> Справочник: проверенные принципы, индустриальные системы и готовые палитры (с hex и источниками).
> Собрано мульти-агентным research-проходом по первоисточникам. Дополняет [VISUALIZATION.md](VISUALIZATION.md) (правило) конкретными примерами.

---

## 1. Проверенные принципы

- **60-30-10.** 60% доминантный (фон), 30% вторичный (поверхности), 10% акцент. Доминант/вторичный — near-neutral; насыщенный акцент — под главный CTA. *(NN/g)*
- **Роль ≠ hex.** Токен именует применение, значение подставляет тема → ре-темизация без правки кода. *(IBM Carbon, Adobe Spectrum, Apple HIG)*
- **Пара color / on-color.** Каждая цветная поверхность идёт с текстовым companion на дальнем конце тональной шкалы → контраст by construction. *(Material Design 3)*
- **Один hue = один смысл.** Одна синяя = «интерактивно» на всех экранах. Минимум: серые + один бренд-цвет. *(NN/g, Carbon — Blue 60)*
- **Серых больше, чем кажется.** 8–10 оттенков + 1–2 primary + семантика по 5–10 шагов. *(Refactoring UI, Radix)*
- **Температура = иерархия.** Тёплые наступают, холодные отступают: тёплый CTA на холодной поверхности = передний план без тени. *(Color Temperature Guide)*
- **Насыщенность как дисциплина.** 60/30 приглушены; saturation+brightness только у 10% акцента. *(Supercharge)*
- **Никогда не цветом единым.** Дублируй смысл иконкой/текстом; greyscale-тест. *(NN/g, WCAG 1.4.1)*

---

## 2. Established-системы — что своровать

| Система | Модель | Забрать |
|---|---|---|
| **Material 3** | 5 key-цветов → тональные палитры 0–100; роли `{color}/on-/container/on-container` | механику `on-*`-пар, `surface-container-*` вместо теней |
| **Apple HIG** | семантические адаптивные токены (не фикс-hex) | иерархию `label/secondary/tertiary`, tiered-backgrounds |
| **IBM Carbon** | role-токены × 4 темы; gray + один Blue 60 `#0f62fe` | «серые + один accent», layer-токены |
| **Tailwind** | 11 шагов `50→950`, `500` — якорь | маппинг шагов на роли (50/100 фон, 200/300 бордеры, 600/700 текст, 800/900 заголовки) |
| **Radix** | 12 шагов, у каждого одна работа; 9 — solid brand, 11/12 — текст (APCA Lc 60/90) | семантический контракт шкалы + gray-in-tone-of-accent |
| **Stripe** | палитра на CIELAB (перцептивная равномерность) | предсказуемую доступность, равный визуальный вес hue |

---

## 3. Проверенные палитры (с hex)

**Radix — Slate + Indigo** (light · эталон нейтраль+бренд)
`bg #fcfcfd · surface #f9f9fb · border #d9d9e0 · muted #60646c · text #1c2024 · primary #3e63dd · hover #3358d4 · link #3a5bc7`

**Tailwind — Slate + Indigo** (light · де-факто стандарт)
`bg #f8fafc · surface #f1f5f9 · border #e2e8f0 · muted #64748b · text #0f172a · primary #4f46e5 · accent #6366f1`

**Material — Dark baseline** (dark · канон)
`surface #121212 · 1dp #1e1e1e · 8dp #2d2d2d · primary #bb86fc · secondary #03dac6 · error #cf6679 · on-surface #fff (87%) · on-primary #000`

**Apple iOS — System (Light)** (⚠ systemGray #8e8e93 как body-текст на белом ~3.3:1 — только крупное/вторичное)
`page #f2f2f7 · card #fff · separator #c6c6c8 · text #1c1c1e · muted #8e8e93 · primary #007aff · success #34c759 · danger #ff3b30 · warning #ff9500`

**Apple iOS — System (Dark)** (три яруса фона, акценты brightened)
`base #000 · secondary #1c1c1e · tertiary #2c2c2e · text #fff · muted #8e8e93 · primary #0a84ff · success #30d158 · danger #ff453a`

**IBM Carbon — Gray + Blue 60** (light · enterprise/минимал)
`page #f4f4f4 · card #fff · border #e0e0e0 · muted #6f6f6f · body #525252 · text #161616 · primary #0f62fe · hover #0043ce`

**Happy Hues — Teal / Amber** (light · тёплый, дружелюбный)
`bg #f2f7f5 · headline #00473e · body #475d5b · primary #faae2b · on-primary #00473e · accent #ffa8ba / #fa5246`

**Stripe — Blurple / Navy** (light · премиум/финтех)
`bg #f6f9fc · card #fff · border #e6ebf1 · muted #425466 · text #0a2540 · primary #635bff · accent #00afe1`

> Правило текста: тело/заголовки — на самых тёмных шагах; mid/solid brand-шаг — только кнопки/ссылки, **никогда** как body text.

---

## 4. Контраст / доступность (числа)

| Что | AA | AAA |
|---|---|---|
| Обычный текст (< 24px / < 18.5px bold) | **4.5:1** | 7:1 |
| Крупный текст (≥ 24px / ≥ 18.5px bold) | **3:1** | 4.5:1 |
| UI-элементы, границы, иконки, фокус | **3:1** | — |

Формула — см. [VISUALIZATION.md §3](VISUALIZATION.md) и готовый чекер [check.mjs](check.mjs).
APCA (черновик WCAG 3): sanity-check тёмной темы, т.к. WCAG 2 переоценивает контраст у near-black.

---

## 5. Тёмная тема (do / don't)

**Do:** база тёмно-серый `#121212` (не чёрный) · elevation светлыми оверлеями (1dp 5% → 24dp 16%) · десатурируй акценты (тон 500→200) · текст белый с opacity-ярусами (87/60/38%) · два яруса фона base+elevated.
**Don't:** не чистый #000 базой / не чистый #fff текстом (halation) · не инвертируй палитру механически · тёплые акценты скупо · фото не на полной яркости.
*(Material 2 · Android MDC · Apple HIG · web.dev)*

---

## 6. Анти-ИИ (чего избегать)

Чистый `#fff`/`#000` · дефолт-bootstrap-синий/unstyled-slate · тинты через `opacity` · тень-«клей» под каждой карточкой · радуга акцентов · фиолет→синий градиент-hero на белом · ряды pill-чипов · эмодзи-маркеры секций · всё по центру · `rounded-*` везде · дизайн без привязки к теме.

---

## 7. Метод подбора (с нуля)

1. Один бренд-hue → шкала `50→950` (база годна фоном кнопки).
2. Нейтральная шкала 8–10 с осознанной температурой.
3. Назначь роли-токены; разложи по 60-30-10.
4. Семантика состояний отдельными ролями.
5. Проверь контраст каждой пары (AA).
6. Ре-тюнингуй dark → перепроверь контраст.

---

## Источники

Material 3 — https://m3.material.io/styles/color/roles ·
Material 2 Dark — https://m2.material.io/design/color/dark-theme.html ·
Apple HIG Color — https://developer.apple.com/design/human-interface-guidelines/color ·
IBM Carbon — https://carbondesignsystem.com/elements/color/overview/ ·
Tailwind — https://tailwindcss.com/docs/colors ·
Radix — https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale ·
Refactoring UI — https://www.refactoringui.com/previews/building-your-color-palette ·
NN/g — https://www.nngroup.com/articles/color-enhance-design/ ·
WCAG 1.4.3 — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ·
WebAIM — https://webaim.org/articles/contrast/ ·
APCA — https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html ·
Stripe — https://stripe.com/blog/accessible-color-systems ·
Happy Hues — https://www.happyhues.co/palettes/5 ·
web.dev — https://web.dev/articles/prefers-color-scheme
