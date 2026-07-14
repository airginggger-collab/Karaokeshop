"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, MessageCircle, Check } from "lucide-react";
import { siteConfig, priceFmt } from "@/lib/site";
import { configureWithinBudget } from "@/lib/calculator";
import { quizToInput, quizBudget } from "@/lib/quiz";

type Step = { question: string; options: string[] };

const steps: Step[] = [
  {
    question: "Где будет стоять система?",
    options: ["Дом / квартира", "Баня или гостевой дом", "Кафе или ресторан", "Бар или клуб"],
  },
  {
    question: "Площадь помещения?",
    options: ["до 30 м²", "30–80 м²", "80–150 м²", "150 м² и больше"],
  },
  {
    question: "Примерный бюджет?",
    options: ["до 800 000 ₸", "800 000 – 1 500 000 ₸", "1 500 000 – 3 000 000 ₸", "Обсуждаем"],
  },
];

export function QuizWidget() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [done, setDone] = React.useState(false);

  function choose(option: string) {
    const next = [...answers, option];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true); // результат покажем инлайн, WhatsApp — по кнопке
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }

  const current = steps[step];

  const result = done && answers.length === steps.length
    ? configureWithinBudget(quizToInput(answers), quizBudget(answers))
    : null;

  const waText = result
    ? [
        "Здравствуйте! Подбираю систему по результатам квиза:",
        `— ${steps[0].question} ${answers[0]}`,
        `— ${steps[1].question} ${answers[1]}`,
        `— ${steps[2].question} ${answers[2]}`,
        `Рекомендация: ${result.calc.lines[0].name}, ориентир ${priceFmt(result.calc.total)}.`,
        "Уточните, пожалуйста, смету.",
      ].join("\n")
    : "";
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
      {/* Прогресс */}
      <div className="mb-6 flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-cta" : "bg-border"}`}
          />
        ))}
      </div>

      {done && result ? (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-fg">
              <Check className="h-4 w-4" />
            </span>
            <p className="font-display text-lg font-semibold">Готово, вот ориентир</p>
          </div>

          <div className="rounded-xl border border-border p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Рекомендуемая база
            </p>
            <p className="mt-1 font-medium">{result.calc.lines[0].name}</p>
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm text-muted-foreground">Ориентир под ключ</span>
              <span className="font-display text-2xl font-bold text-primary">{priceFmt(result.calc.total)}</span>
            </div>
            {result.trimmed.length > 0 && result.fits && (
              <p className="mt-2 text-xs text-muted-foreground">
                Под ваш бюджет: без {result.trimmed.join(", ")}.
              </p>
            )}
            {!result.fits && (
              <p className="mt-2 text-xs text-muted-foreground">
                Минимальный комплект под {result.calc.area} м² дороже выбранного бюджета. Это ориентир, точную смету подберём по проекту.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" /> Заявка в WhatsApp
            </a>
            <Link
              href="/kalkulyator"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-border py-3 text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              Открыть полную смету
            </Link>
          </div>

          <button onClick={reset} className="mt-3 text-sm text-primary hover:underline">
            Пройти заново
          </button>
        </div>
      ) : (
        <>
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Вопрос {step + 1} из {steps.length}
          </p>
          <h3 className="font-display text-lg font-semibold sm:text-xl">{current.question}</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => choose(opt)}
                className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                {opt}
                <ChevronRight className="h-4 w-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
