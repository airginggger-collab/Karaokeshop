"use client";

import * as React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

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
      const text = [
        "Здравствуйте! Подбираю систему по результатам квиза:",
        `— ${steps[0].question} ${next[0]}`,
        `— ${steps[1].question} ${next[1]}`,
        `— ${steps[2].question} ${next[2]}`,
        "Можете подобрать решение?",
      ].join("\n");
      setDone(true);
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }

  const current = steps[step];

  return (
    <div className="rounded-3xl bg-background p-6 sm:p-8">
      {/* Прогресс */}
      <div className="mb-6 flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= step ? "var(--color-primary)" : "var(--color-border)" }}
          />
        ))}
      </div>

      {done ? (
        <div className="text-center">
          <p className="font-display text-lg font-semibold">Открываем WhatsApp…</p>
          <p className="mt-1 text-sm text-muted-foreground">Ваши ответы уже в сообщении — просто отправьте.</p>
          <button onClick={reset} className="mt-4 text-sm text-primary hover:underline">
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
