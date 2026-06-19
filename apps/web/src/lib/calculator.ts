import { baseSystems, comps, type BaseSystem } from "./components";

export type CalcInput = {
  area: number;
  venueType: string;
  mics: number;
  light: boolean;
  sub: boolean;
};

export type Line = { name: string; qty: number; price: number; subtotal: number };
export type Calc = { base: string; area: number; lines: Line[]; total: number };

export function pickBase(area: number): BaseSystem {
  return baseSystems.find((b) => area <= b.maxArea) ?? baseSystems[baseSystems.length - 1];
}

export function configure(input: CalcInput): Calc {
  const area = Math.max(10, Math.round(input.area));
  const base = pickBase(area);
  const speakerUnits = Math.max(1, Math.ceil(area / 40)) * 2;
  const mics = Math.max(2, Math.min(6, Math.round(input.mics)));

  const lines: Line[] = [];
  const add = (name: string, qty: number, price: number) => {
    if (qty > 0) lines.push({ name, qty, price, subtotal: qty * price });
  };

  add(base.name, 1, base.price);
  add(comps.speaker.name, speakerUnits, comps.speaker.price);
  add(comps.sub.name, input.sub ? 1 : 0, comps.sub.price);
  add(comps.amp.name, 1, comps.amp.price);
  add(comps.mixer.name, 1, comps.mixer.price);
  add(comps.mic.name, mics, comps.mic.price);
  add(comps.light.name, input.light ? 2 : 0, comps.light.price);
  add(comps.cables.name, 1, comps.cables.price);
  add(comps.install.name, 1, comps.install.price);

  const total = lines.reduce((s, l) => s + l.subtotal, 0);
  return { base: base.id, area, lines, total };
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
