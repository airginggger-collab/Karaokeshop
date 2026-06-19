// Номенклатура из каталога поставщика (show-service): реальные модели и спеки.
// ⚠️ Поставщик НЕ публикует цены в каталоге («не указана») — значения ниже
// ОЦЕНОЧНЫЕ, привязаны к подтверждённым «готовым решениям»
// (до 60 м² = 551 800 ₸, до 80 м² = 611 800 ₸). Финальные — по счёту
// поставщика (правится здесь, в одном месте).

export type BaseSystem = { id: string; name: string; price: number; maxArea: number };

export const baseSystems: BaseSystem[] = [
  { id: "ast-mini", name: "Караоке-система (компакт)", price: 160000, maxArea: 30 },
  { id: "ast-50", name: "Караоке-система AST 50", price: 220000, maxArea: 50 },
  { id: "ast-250", name: "Караоке-система AST 250", price: 300000, maxArea: 80 },
  { id: "ast-350", name: "Караоке-система AST 350", price: 420000, maxArea: 130 },
];

// Акустика по тирам площади (реальные модели поставщика)
export type Acoustic = { id: string; name: string; power: string; price: number; maxArea: number };

export const acoustics: Acoustic[] = [
  { id: "achat-mini", name: "Акустика The Box Pro Achat Mini", power: "220 Вт", price: 150000, maxArea: 30 },
  { id: "cl115", name: "Акустика The Box CL 115/108", power: "900 Вт", price: 240000, maxArea: 60 },
  { id: "cl110", name: "Акустика The Box CL 110/118 + сабвуфер", power: "1000 Вт", price: 360000, maxArea: 90 },
  { id: "rcf-evox", name: "Акустика RCF EVOX 8 (2 саба + сателлиты)", power: "1400 Вт", price: 520000, maxArea: 140 },
];

export type Comp = { id: string; name: string; price: number };

export const comps: Record<string, Comp> = {
  sub: { id: "sub", name: "Сабвуфер Martin Audio XP118A", price: 180000 },
  mixer: { id: "mixer", name: "Микшер Dynacord PowerMate", price: 120000 },
  mic: { id: "mic", name: "Радиомикрофон Shure BLX24/SM58", price: 60000 },
  light: { id: "light", name: "Световой прибор", price: 25000 },
  cables: { id: "cables", name: "Кабельная обвязка (комплект)", price: 18000 },
  install: { id: "install", name: "Монтаж и настройка под ключ", price: 60000 },
};

export const supplierBrands = ["AST", "The Box", "RCF", "HK Audio", "Dynacord", "Martin Audio", "Shure"];
