import { describe, it, expect } from "vitest";
import { quizToInput, quizBudget, quizToCalcQuery, parseCalcQuery } from "./quiz";
import { configureWithinBudget } from "./calculator";

describe("quizToInput", () => {
  it("маппит площадь в представительное значение и включает саб от 50 м²", () => {
    expect(quizToInput(["Дом / квартира", "до 30 м²", "до 800 000 ₸"]).area).toBe(25);
    const bar = quizToInput(["Бар или клуб", "80–150 м²", "Обсуждаем"]);
    expect(bar.area).toBe(110);
    expect(bar.sub).toBe(true); // area >= 50
    expect(bar.mics).toBe(4);
    expect(bar.light).toBe(true);
  });

  it("дом маленькой площади — без саба", () => {
    expect(quizToInput(["Дом / квартира", "до 30 м²", "до 800 000 ₸"]).sub).toBe(false);
  });

  it("неизвестный ответ — безопасный дефолт (55 м²)", () => {
    expect(quizToInput(["?", "?", "?"]).area).toBe(55);
  });
});

describe("quizBudget", () => {
  it("маппит бюджет; «Обсуждаем» — без ограничения", () => {
    expect(quizBudget(["Дом / квартира", "до 30 м²", "до 800 000 ₸"])).toBe(800000);
    expect(quizBudget(["Бар или клуб", "80–150 м²", "Обсуждаем"])).toBe(Infinity);
  });
});

describe("сквозное состояние квиз → калькулятор (пункт 9 аудита)", () => {
  const home = ["Дом / квартира", "до 30 м²", "до 800 000 ₸"];
  const club = ["Бар или клуб", "80–150 м²", "Обсуждаем"];

  it("собирает query из трёх ответов", () => {
    expect(quizToCalcQuery(home)).toBe("?scenario=dom&area=25&budget=800000");
  });

  it("«Обсуждаем» = без ограничения: budget в URL не кладём (Infinity не сериализуем)", () => {
    const q = quizToCalcQuery(club);
    expect(q).toBe("?scenario=bar&area=110");
    expect(q).not.toContain("Infinity");
  });

  it("баня уходит в тот же сценарий, что и квартира", () => {
    expect(quizToCalcQuery(["Баня или гостевой дом", "до 30 м²", "Обсуждаем"])).toContain("scenario=dom");
  });

  it("мусорные ответы не дают ссылку с битым состоянием", () => {
    expect(quizToCalcQuery(["?", "?", "?"])).toBe("");
  });

  it("query разбирается обратно без потерь", () => {
    const p = new URLSearchParams(quizToCalcQuery(home));
    expect(parseCalcQuery((k) => p.get(k))).toEqual({ scenario: "dom", area: 25, budget: 800000 });
  });

  it("без budget в URL — без ограничения", () => {
    const p = new URLSearchParams(quizToCalcQuery(club));
    expect(parseCalcQuery((k) => p.get(k))?.budget).toBe(Infinity);
  });

  it("подделанный URL отбрасывается, а не роняет калькулятор", () => {
    const bad = [
      "scenario=<script>&area=25",
      "scenario=dom&area=99999",
      "scenario=dom&area=abc",
      "scenario=dom&area=25&budget=-5",
      "area=25",
    ];
    for (const raw of bad) {
      const p = new URLSearchParams(raw);
      expect(parseCalcQuery((k) => p.get(k))).toBeNull();
    }
  });

  // Главное: калькулятор обязан показать ровно тот же итог, что клиент увидел
  // в квизе. Ради этого бюджет передаётся точным числом, а не подгоняется
  // под шкалу BUDGET_OPTS калькулятора (800 000 ≠ 1 000 000).
  it("итог калькулятора совпадает с ориентиром квиза до тенге", () => {
    for (const answers of [home, club, ["Кафе или ресторан", "30–80 м²", "800 000 – 1 500 000 ₸"]]) {
      const fromQuiz = configureWithinBudget(quizToInput(answers), quizBudget(answers));

      const p = new URLSearchParams(quizToCalcQuery(answers));
      const q = parseCalcQuery((k) => p.get(k))!;
      const fromCalc = configureWithinBudget(
        { area: q.area, venueType: "не влияет на цену", mics: 4, light: true, sub: q.area >= 50 },
        q.budget,
      );

      expect(fromCalc.calc.total).toBe(fromQuiz.calc.total);
      expect(fromCalc.calc.lines.map((l) => l.name)).toEqual(fromQuiz.calc.lines.map((l) => l.name));
      expect(fromCalc.fits).toBe(fromQuiz.fits);
    }
  });
});
