"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@kk/ui";
import { configureWithinBudget, smetaText, type Calc } from "@/lib/calculator";
import { priceFmt, siteConfig } from "@/lib/site";

const SCENARIOS = [
  { id: "dom", label: "Дом", sub: "гостиная, баня, гостевой дом" },
  { id: "kafe", label: "Кафе", sub: "до 40 мест" },
  { id: "bar", label: "Бар / паб", sub: "40–80 мест" },
  { id: "restoran", label: "Ресторан", sub: "банкеты, мероприятия" },
  { id: "klub", label: "Клуб / VIP", sub: "от 80 м²" },
];

const SCENARIO_VENUE: Record<string, string> = {
  dom: "Кафе",
  kafe: "Кафе",
  bar: "Бар / паб",
  restoran: "Кафе",
  klub: "Караоке-клуб",
};

const AREA_DEFAULTS: Record<string, number> = {
  dom: 25, kafe: 40, bar: 70, restoran: 80, klub: 120,
};

const BUDGET_OPTS = [
  { label: "до 1 000 000 ₸", value: 1000000 },
  { label: "1 000 000 – 2 000 000 ₸", value: 2000000 },
  { label: "2 000 000 – 3 500 000 ₸", value: 3500000 },
  { label: "Без ограничений", value: 9999999 },
];

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition",
              i + 1 < step
                ? "bg-cta text-cta-fg"
                : i + 1 === step
                ? "border-2 border-primary text-primary"
                : "border border-border text-muted-foreground",
            ].join(" ")}
          >
            {i + 1 < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px flex-1 transition ${i + 1 < step ? "bg-primary" : "bg-border"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function CalculatorClient() {
  const [step, setStep] = React.useState(1);
  const [scenario, setScenario] = React.useState<string | null>(null);
  const [area, setArea] = React.useState(70);
  const [budgetIdx, setBudgetIdx] = React.useState(2);
  const [calc, setCalc] = React.useState<Calc | null>(null);
  const [fits, setFits] = React.useState(true);
  const [trimmed, setTrimmed] = React.useState<string[]>([]);

  function handleScenario(id: string) {
    setScenario(id);
    setArea(AREA_DEFAULTS[id] ?? 70);
  }

  function buildSmeta() {
    const venue = SCENARIO_VENUE[scenario ?? "bar"] ?? "Бар / паб";
    const budget = BUDGET_OPTS[budgetIdx].value;
    const result = configureWithinBudget(
      { area, venueType: venue, mics: 4, light: true, sub: area >= 50 },
      budget,
    );
    setCalc(result.calc);
    setFits(result.fits);
    setTrimmed(result.trimmed);
    setStep(4);
  }

  const waUrl = calc
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(smetaText(calc, scenario ?? "bar"))}`
    : "#";

  return (
    <div className="mx-auto max-w-xl">
      {step < 4 && <StepIndicator step={step} total={3} />}

      {/* Шаг 1 — Сценарий */}
      {step === 1 && (
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold">Шаг 1 — Выберите сценарий</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleScenario(s.id)}
                className={[
                  "rounded-xl border p-4 text-left transition",
                  scenario === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary",
                ].join(" ")}
              >
                <p className="font-medium">{s.label}</p>
                <p className="text-sm text-muted-foreground">{s.sub}</p>
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!scenario}>
              Далее <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Шаг 2 — Площадь */}
      {step === 2 && (
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold">Шаг 2 — Площадь помещения</h2>
          <div className="rounded-xl border border-border bg-background p-6">
            <p className="mb-2 text-sm font-medium">
              Площадь зала: <span className="text-primary font-semibold">{area} м²</span>
            </p>
            <input
              type="range"
              min={15}
              max={200}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>15 м²</span><span>200 м²</span>
            </div>
            <div className="mt-5 flex gap-2">
              {[25, 50, 80, 120].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setArea(v)}
                  className={[
                    "rounded-full border px-3 py-1 text-sm transition",
                    area === v ? "border-cta bg-cta text-cta-fg" : "border-border hover:border-primary",
                  ].join(" ")}
                >
                  {v} м²
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4" /> Назад
            </Button>
            <Button onClick={() => setStep(3)}>
              Далее <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Шаг 3 — Бюджет */}
      {step === 3 && (
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold">Шаг 3 — Ориентир по бюджету</h2>
          <div className="grid gap-3">
            {BUDGET_OPTS.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBudgetIdx(i)}
                className={[
                  "rounded-xl border p-4 text-left transition",
                  budgetIdx === i
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary",
                ].join(" ")}
              >
                <p className="font-medium">{opt.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>
              <ArrowLeft className="h-4 w-4" /> Назад
            </Button>
            <Button onClick={buildSmeta}>
              Рассчитать смету <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Шаг 4 — Смета */}
      {step === 4 && calc && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Ваша смета</h2>
            <button
              type="button"
              onClick={() => { setStep(1); setScenario(null); setCalc(null); setFits(true); setTrimmed([]); }}
              className="text-sm text-primary hover:underline"
            >
              Пересчитать
            </button>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <div className="divide-y divide-border text-sm">
              {calc.lines.map((l) => (
                <div key={l.name} className="py-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span>
                      {l.name}{l.qty > 1 ? <span className="ml-1 text-muted-foreground">× {l.qty}</span> : null}
                    </span>
                    <span className="whitespace-nowrap font-medium">{priceFmt(l.subtotal)}</span>
                  </div>
                  {l.hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{l.hint}</p>}
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="font-medium">Итого</span>
              <span className="font-display text-2xl font-bold text-primary">{priceFmt(calc.total)}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Площадь {calc.area} м² · {SCENARIOS.find(s => s.id === scenario)?.label}. Итоговые цены подтверждаем по счёту.
          </p>

          {fits && trimmed.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Чтобы уложиться в бюджет «{BUDGET_OPTS[budgetIdx].label}», из комплекта убрали: {trimmed.join(", ")}.
            </p>
          )}
          {!fits && (
            <p className="mt-2 rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary">
              Минимальный комплект под {calc.area} м² выходит дороже бюджета «{BUDGET_OPTS[budgetIdx].label}» — показываем ориентир, точную смету подберём по проекту.
            </p>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
          >
            <MessageCircle className="h-4 w-4" />
            Отправить смету в WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
