import type { CalcInput } from "./calculator";

const AREA_BY_ANSWER: Record<string, number> = {
  "до 30 м²": 25,
  "30–80 м²": 55,
  "80–150 м²": 110,
  "150 м² и больше": 170,
};

const BUDGET_BY_ANSWER: Record<string, number> = {
  "до 800 000 ₸": 800000,
  "800 000 – 1 500 000 ₸": 1500000,
  "1 500 000 – 3 000 000 ₸": 3000000,
  "Обсуждаем": Infinity,
};

const VENUE_BY_ANSWER: Record<string, string> = {
  "Дом / квартира": "Дом",
  "Баня или гостевой дом": "Дом",
  "Кафе или ресторан": "Кафе",
  "Бар или клуб": "Бар / клуб",
};

/** answers = [место, площадь, бюджет] из QuizWidget. */
export function quizToInput(answers: string[]): CalcInput {
  const area = AREA_BY_ANSWER[answers[1]] ?? 55;
  return {
    area,
    venueType: VENUE_BY_ANSWER[answers[0]] ?? "Заведение",
    mics: 4,
    light: true,
    sub: area >= 50,
  };
}

export function quizBudget(answers: string[]): number {
  return BUDGET_BY_ANSWER[answers[2]] ?? Infinity;
}
