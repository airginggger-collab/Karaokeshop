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

/** Сценарий квиза → id сценария калькулятора (SCENARIOS в CalculatorClient). */
const SCENARIO_ID_BY_ANSWER: Record<string, string> = {
  "Дом / квартира": "dom",
  "Баня или гостевой дом": "dom",
  "Кафе или ресторан": "kafe",
  "Бар или клуб": "bar",
};

export type CalcQuery = { scenario: string; area: number; budget: number };

/** Ответы квиза → query для /kalkulyator: клиент не отвечает на те же
 * три вопроса второй раз (пункт 9 аудита 2026-07-16 — состояние терялось).
 * Бюджет передаём ТОЧНЫМ числом квиза, а не подгоняем под шкалу калькулятора:
 * иначе смета в калькуляторе разойдётся с ориентиром, который клиент уже
 * увидел в квизе. Infinity («Обсуждаем») в URL не кладём. */
export function quizToCalcQuery(answers: string[]): string {
  const scenario = SCENARIO_ID_BY_ANSWER[answers[0]];
  const area = AREA_BY_ANSWER[answers[1]];
  const budget = BUDGET_BY_ANSWER[answers[2]];
  if (!scenario || !area) return "";

  const q = new URLSearchParams({ scenario, area: String(area) });
  if (Number.isFinite(budget)) q.set("budget", String(budget));
  return `?${q.toString()}`;
}

/** Обратный разбор на стороне /kalkulyator. null — если параметров нет или
 * они не проходят валидацию: URL правит кто угодно, доверять ему нельзя. */
export function parseCalcQuery(get: (k: string) => string | null): CalcQuery | null {
  const scenario = get("scenario");
  const area = Number(get("area"));
  const rawBudget = get("budget");
  const budget = rawBudget === null ? Infinity : Number(rawBudget);

  const known = new Set(Object.values(SCENARIO_ID_BY_ANSWER));
  if (!scenario || !known.has(scenario)) return null;
  if (!Number.isFinite(area) || area < 10 || area > 500) return null;
  if (rawBudget !== null && (!Number.isFinite(budget) || budget <= 0)) return null;

  return { scenario, area, budget };
}
