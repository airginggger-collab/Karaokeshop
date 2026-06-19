"use client";

import * as React from "react";
import { Button } from "@kk/ui";

const areas = [
  { key: "30", label: "до 30 м²", kit: "AST Mini · комплект «Кафе»", price: "≈ 720 000 – 1 100 000 ₸ под ключ" },
  { key: "50", label: "до 50 м²", kit: "AST-50 · комплект «Зал»", price: "≈ 1 200 000 – 1 600 000 ₸ под ключ" },
  { key: "80", label: "до 80 м²", kit: "AST-350 · комплект «Бар»", price: "≈ 2 100 000 – 2 600 000 ₸ под ключ" },
  { key: "100", label: "до 100+ м²", kit: "AST-350 + RCF · комплект «Клуб»", price: "≈ 2 800 000 – 3 600 000 ₸ под ключ" },
];
const types = ["Кафе", "Бар / паб", "Караоке-клуб", "Отель / банкет"];

function chip(active: boolean): string {
  return `rounded-md border px-3 py-1.5 text-sm transition ${
    active ? "border-primary text-primary" : "border-border text-foreground hover:bg-surface"
  }`;
}

export function AreaCalculator() {
  const [area, setArea] = React.useState("80");
  const [type, setType] = React.useState("Бар / паб");
  const a = areas.find((x) => x.key === area)!;

  return (
    <div className="rounded-xl border border-border p-5">
      <h3 className="font-medium">Подберём комплект под площадь</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Выберите площадь и тип заведения — покажем готовое решение.
      </p>

      <p className="mb-2 mt-4 text-xs text-muted-foreground">Площадь зала</p>
      <div className="flex flex-wrap gap-2">
        {areas.map((x) => (
          <button key={x.key} type="button" onClick={() => setArea(x.key)} className={chip(area === x.key)}>
            {x.label}
          </button>
        ))}
      </div>

      <p className="mb-2 mt-4 text-xs text-muted-foreground">Тип заведения</p>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-lg bg-primary-soft p-4">
        <p className="text-xs text-primary">
          Рекомендуем для «{type}» · {a.label}
        </p>
        <p className="mt-0.5 font-medium text-primary">{a.kit}</p>
        <p className="text-sm text-primary">{a.price}</p>
        <div className="mt-3">
          <Button>Оставить заявку на расчёт</Button>
        </div>
      </div>
    </div>
  );
}
