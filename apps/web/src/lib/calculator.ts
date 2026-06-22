import { baseSystems, acoustics, comps, type BaseSystem, type Acoustic } from "./components";

export type CalcInput = {
  area: number;
  venueType: string;
  mics: number;
  light: boolean;
  sub: boolean;
};

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

  add(base.name, 1, base.price, "Медиаплеер + эхо-процессор — ключевой модуль системы");
  add(`${ac.name} · ${ac.power}`, 1, ac.price, `Мощность подобрана под ${area} м²: достаточный запас без перегрева`);
  add(comps.sub.name, input.sub ? 1 : 0, comps.sub.price, "Расширяет АЧХ до 40 Гц — голос звучит объёмнее");
  add(comps.mixer.name, 1, comps.mixer.price, "Dynacord PowerMate: балансный выход, 2-полосный EQ на каждый канал");
  add(comps.mic.name, mics, comps.mic.price, "Shure BLX24 UHF — автовыбор частоты, не конфликтует с Wi-Fi роутером");
  add(comps.light.name, input.light ? 2 : 0, comps.light.price, "Заливной свет создаёт атмосферу без перегруза сети");
  add(comps.cables.name, 1, comps.cables.price, "Балансные XLR-кабели — без фона и наводок от сети 220 В");
  add(comps.install.name, 1, comps.install.price, "Прокладка в кабель-канале, настройка эквалайзера под акустику зала");

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
