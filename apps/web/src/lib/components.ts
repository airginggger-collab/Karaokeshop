// Справочник компонентов для онлайн-калькулятора.
// ⚠️ ЦЕНЫ — ПЛЕЙСХОЛДЕРЫ. Заменить на актуальный прайс поставщика
// (ассортимент: проф-акустика, сабвуферы, усилители, микшеры,
//  радиомикрофоны Shure, свет, кабельная продукция).

export type BaseSystem = { id: string; name: string; price: number; maxArea: number };

export const baseSystems: BaseSystem[] = [
  { id: "ast-mini", name: "Караоке-система AST Mini", price: 720000, maxArea: 30 },
  { id: "ast-50", name: "Караоке-система AST-50", price: 1100000, maxArea: 50 },
  { id: "ast-250", name: "Караоке-система AST-250", price: 1500000, maxArea: 80 },
  { id: "ast-350", name: "Караоке-система AST-350", price: 2200000, maxArea: 130 },
];

export type Comp = { id: string; name: string; price: number };

export const comps: Record<string, Comp> = {
  speaker: { id: "speaker", name: "Акустическая система", price: 120000 },
  sub: { id: "sub", name: "Сабвуфер", price: 220000 },
  amp: { id: "amp", name: "Усилитель мощности", price: 180000 },
  mixer: { id: "mixer", name: "Микшерный пульт", price: 130000 },
  mic: { id: "mic", name: "Радиомикрофон Shure", price: 90000 },
  light: { id: "light", name: "Световой прибор", price: 60000 },
  cables: { id: "cables", name: "Кабельная обвязка (комплект)", price: 50000 },
  install: { id: "install", name: "Монтаж и настройка под ключ", price: 120000 },
};
