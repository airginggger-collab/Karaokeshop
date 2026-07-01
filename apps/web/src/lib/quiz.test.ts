import { describe, it, expect } from "vitest";
import { quizToInput, quizBudget } from "./quiz";

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
