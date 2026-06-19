// Справочник компонентов для онлайн-калькулятора.
// Цены привязаны к уровню поставщика (show-service): готовые караоке-решения
// до 60 м² = 551 800 ₸, до 80 м² = 611 800 ₸ (подтверждено с сайта поставщика).
// ⚠️ Покомпонентные цены ниже — ОЦЕНКА в этом ценовом уровне; финальные —
// по полному прайсу поставщика (заменить значения здесь, в одном месте).

export type BaseSystem = { id: string; name: string; price: number; maxArea: number };

export const baseSystems: BaseSystem[] = [
  { id: "ast-mini", name: "Караоке-система (база)", price: 160000, maxArea: 30 },
  { id: "ast-50", name: "Караоке-система (зал)", price: 220000, maxArea: 50 },
  { id: "ast-250", name: "Караоке-система (бар)", price: 300000, maxArea: 80 },
  { id: "ast-350", name: "Караоке-система (клуб)", price: 420000, maxArea: 130 },
];

export type Comp = { id: string; name: string; price: number };

export const comps: Record<string, Comp> = {
  speaker: { id: "speaker", name: "Акустическая система", price: 45000 },
  sub: { id: "sub", name: "Сабвуфер", price: 60000 },
  amp: { id: "amp", name: "Усилитель мощности", price: 55000 },
  mixer: { id: "mixer", name: "Микшерный пульт", price: 40000 },
  mic: { id: "mic", name: "Радиомикрофон Shure", price: 22000 },
  light: { id: "light", name: "Световой прибор", price: 25000 },
  cables: { id: "cables", name: "Кабельная обвязка (комплект)", price: 18000 },
  install: { id: "install", name: "Монтаж и настройка под ключ", price: 60000 },
};
