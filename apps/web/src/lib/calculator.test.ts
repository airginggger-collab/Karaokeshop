import { describe, it, expect } from "vitest";
import { configure, configureByBudget, pickBase } from "./calculator";

describe("pickBase", () => {
  it("выбирает систему по площади", () => {
    expect(pickBase(25).id).toBe("ast-mini");
    expect(pickBase(70).id).toBe("ast-250");
    expect(pickBase(200).id).toBe("ast-350");
  });
});

describe("configure", () => {
  it("положительный итог и колонки по площади (2 пары на 80 м²)", () => {
    const c = configure({ area: 80, venueType: "bar", mics: 4, light: true, sub: true });
    expect(c.total).toBeGreaterThan(0);
    const sp = c.lines.find((l) => l.name.includes("Акустическая"));
    expect(sp?.qty).toBe(4);
    const mic = c.lines.find((l) => l.name.includes("микрофон") || l.name.includes("Радиомикрофон"));
    expect(mic?.qty).toBe(4);
  });

  it("без света и саба — позиций нет", () => {
    const c = configure({ area: 20, venueType: "kafe", mics: 2, light: false, sub: false });
    expect(c.lines.some((l) => l.name.includes("Сабвуфер"))).toBe(false);
    expect(c.lines.some((l) => l.name.includes("Световой"))).toBe(false);
  });

  it("микрофоны зажаты в 2..6", () => {
    expect(configure({ area: 30, venueType: "kafe", mics: 0, light: false, sub: false }).lines.find((l) => l.name.includes("Радиомикрофон"))?.qty).toBe(2);
    expect(configure({ area: 30, venueType: "kafe", mics: 99, light: false, sub: false }).lines.find((l) => l.name.includes("Радиомикрофон"))?.qty).toBe(6);
  });
});

describe("configureByBudget", () => {
  it("подбирает конфиг в рамках бюджета", () => {
    const r = configureByBudget(2000000, "bar");
    expect(r.fits).toBe(true);
    expect(r.calc.total).toBeLessThanOrEqual(2000000);
  });

  it("при слишком малом бюджете отдаёт минимум с флагом fits=false", () => {
    const r = configureByBudget(100000, "kafe");
    expect(r.fits).toBe(false);
  });
});
