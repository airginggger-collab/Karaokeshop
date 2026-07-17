import { baseSystems, acoustics, comps, type BaseSystem, type Acoustic } from "./components";

export type CalcInput = {
  area: number;
  venueType: string;
  mics: number;
  light: boolean;
  sub: boolean;
};

/** ЕДИНЫЙ источник сценариев подбора. Отсюда берут: UI калькулятора,
 * белый список parseCalcQuery (lib/quiz.ts) и страницы /komplekty.
 * Держать список в двух местах нельзя: белый список, собранный отдельно из
 * ответов квиза, знал только dom/kafe/bar — ссылка с ?scenario=klub молча
 * теряла бы состояние (ловушка 12: один источник на одну правду).
 * `venue` — подпись типа в заявке WhatsApp; на цену НЕ влияет (см. configure). */
export type CalcScenario = { id: string; label: string; sub: string; venue: string; areaDefault: number };

export const CALC_SCENARIOS: CalcScenario[] = [
  { id: "dom", label: "Дом", sub: "гостиная, баня, гостевой дом", venue: "Дом", areaDefault: 25 },
  { id: "kafe", label: "Кафе", sub: "до 40 мест", venue: "Кафе", areaDefault: 40 },
  { id: "bar", label: "Бар / паб", sub: "40–80 мест", venue: "Бар / паб", areaDefault: 70 },
  { id: "restoran", label: "Ресторан", sub: "банкеты, мероприятия", venue: "Ресторан", areaDefault: 80 },
  { id: "klub", label: "Клуб / VIP", sub: "от 80 м²", venue: "Караоке-клуб", areaDefault: 120 },
];

export const isCalcScenario = (id: string): boolean => CALC_SCENARIOS.some((s) => s.id === id);

export const venueOf = (id: string | null | undefined): string =>
  CALC_SCENARIOS.find((s) => s.id === id)?.venue ?? "Заведение";

/** Комплект под площадь — та же сборка, что показывает калькулятор и квиз.
 * Страницы /komplekty обязаны звать ИМЕННО её, иначе цифры разойдутся. */
export function bundleFor(area: number, scenarioId: string): Calc {
  return configure({
    area,
    venueType: venueOf(scenarioId),
    mics: 4,
    light: true,
    sub: area >= 50,
  });
}

export type Line = { name: string; qty: number; price: number; subtotal: number; hint?: string };
export type Calc = { base: string; area: number; lines: Line[]; total: number };

export function pickBase(area: number): BaseSystem {
  return baseSystems.find((b) => area <= b.maxArea) ?? baseSystems[baseSystems.length - 1];
}

export function pickAcoustic(area: number): Acoustic {
  return acoustics.find((a) => area <= a.maxArea) ?? acoustics[acoustics.length - 1];
}

export function configure(input: CalcInput): Calc {
  const area = Math.max(10, Math.round(input.area));
  const base = pickBase(area);
  const ac = pickAcoustic(area);
  const mics = Math.max(2, Math.min(6, Math.round(input.mics)));

  const lines: Line[] = [];
  const add = (name: string, qty: number, price: number, hint?: string) => {
    if (qty > 0) lines.push({ name, qty, price, subtotal: qty * price, hint });
  };

  add(base.name, 1, base.price, "Медиаплеер + эхо-процессор: ключевой модуль системы");
  add(`${ac.name} · ${ac.power}`, 1, ac.price, `Мощность подобрана под ${area} м²: достаточный запас без перегрева`);
  add(comps.sub.name, input.sub ? 1 : 0, comps.sub.price, "Расширяет АЧХ до 40 Гц, голос звучит объёмнее");
  add(comps.mixer.name, 1, comps.mixer.price, "Dynacord PowerMate: балансный выход, 2-полосный EQ на каждый канал");
  add(comps.mic.name, mics, comps.mic.price, "Shure BLX24 UHF с автовыбором частоты, не конфликтует с Wi-Fi роутером");
  add(comps.light.name, input.light ? 2 : 0, comps.light.price, "Заливной свет создаёт атмосферу без перегруза сети");
  add(comps.cables.name, 1, comps.cables.price, "Балансные XLR-кабели убирают фон и наводки от сети 220 В");
  add(comps.install.name, 1, comps.install.price, "Прокладка в кабель-канале, настройка эквалайзера под акустику зала");

  const total = lines.reduce((s, l) => s + l.subtotal, 0);
  return { base: base.id, area, lines, total };
}

export type BudgetFit = { calc: Calc; fits: boolean; trimmed: string[] };

/**
 * Собирает смету под выбранную площадь и пытается уложиться в бюджет,
 * снимая необязательные позиции (свет → сабвуфер → лишние микрофоны).
 * Площадь зала НЕ меняется — в отличие от configureByBudget. Если даже
 * минимальный комплект дороже бюджета, возвращает его с fits=false.
 */
export function configureWithinBudget(input: CalcInput, budget: number): BudgetFit {
  const trimmed: string[] = [];
  let current: CalcInput = { ...input };
  let calc = configure(current);
  if (calc.total <= budget) return { calc, fits: true, trimmed };

  if (current.light) {
    current = { ...current, light: false };
    calc = configure(current);
    trimmed.push("световое оборудование");
    if (calc.total <= budget) return { calc, fits: true, trimmed };
  }
  if (current.sub) {
    current = { ...current, sub: false };
    calc = configure(current);
    trimmed.push("сабвуфер");
    if (calc.total <= budget) return { calc, fits: true, trimmed };
  }
  if (current.mics > 2) {
    current = { ...current, mics: 2 };
    calc = configure(current);
    trimmed.push("микрофоны до 2 шт");
    if (calc.total <= budget) return { calc, fits: true, trimmed };
  }

  return { calc, fits: false, trimmed };
}

export function configureByBudget(budget: number, venueType: string): { calc: Calc; fits: boolean } {
  const tiers = [130, 80, 50, 30];
  for (const area of tiers) {
    const calc = configure({ area, venueType, mics: 2, light: true, sub: area > 40 });
    if (calc.total <= budget) return { calc, fits: true };
  }
  const calc = configure({ area: 30, venueType, mics: 2, light: false, sub: false });
  return { calc, fits: false };
}

export function smetaText(calc: Calc, venueType: string): string {
  const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
  const head = `Здравствуйте! Хочу смету на оснащение под ключ.\nТип: ${venueType}, площадь: ${calc.area} м²`;
  const body = calc.lines.map((l) => `• ${l.name} × ${l.qty}`).join("\n");
  return `${head}\n${body}\nИтого: ${fmt(calc.total)} ₸`;
}
