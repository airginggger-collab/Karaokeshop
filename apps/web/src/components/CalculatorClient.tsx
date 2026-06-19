"use client";

import * as React from "react";
import { MessageCircle, ShoppingCart, Check } from "lucide-react";
import { Button, Badge } from "@kk/ui";
import { useCart } from "@/lib/cart";
import { configure, configureByBudget, smetaText, type Calc } from "@/lib/calculator";
import { priceFmt, installmentMonthly, siteConfig } from "@/lib/site";

const venueTypes = ["Кафе", "Бар / паб", "Караоке-клуб", "Отель / банкет"];

function chip(active: boolean): string {
  return `rounded-md border px-3 py-1.5 text-sm transition ${
    active ? "border-primary text-primary" : "border-border text-foreground hover:bg-surface"
  }`;
}
function tab(active: boolean): string {
  return `rounded-md px-3 py-1.5 text-sm transition ${
    active ? "bg-primary text-primary-fg" : "text-muted-foreground"
  }`;
}

export function CalculatorClient() {
  const { add } = useCart();
  const [mode, setMode] = React.useState<"params" | "budget">("params");
  const [area, setArea] = React.useState(80);
  const [venue, setVenue] = React.useState("Бар / паб");
  const [mics, setMics] = React.useState(4);
  const [light, setLight] = React.useState(true);
  const [sub, setSub] = React.useState(true);
  const [budget, setBudget] = React.useState(2500000);
  const [added, setAdded] = React.useState(false);

  let calc: Calc;
  let fits = true;
  if (mode === "params") {
    calc = configure({ area, venueType: venue, mics, light, sub });
  } else {
    const r = configureByBudget(budget, venue);
    calc = r.calc;
    fits = r.fits;
  }

  const monthly = priceFmt(installmentMonthly(calc.total));
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(smetaText(calc, venue))}`;

  const addSmeta = () => {
    add({ id: `smeta-${Date.now()}`, name: `Смета · ${calc.area} м² · ${venue}`, price: calc.total, meta: "конфигуратор" });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-5 inline-flex rounded-lg border border-border p-1">
          <button type="button" onClick={() => setMode("params")} className={tab(mode === "params")}>
            По параметрам
          </button>
          <button type="button" onClick={() => setMode("budget")} className={tab(mode === "budget")}>
            По бюджету
          </button>
        </div>

        <p className="mb-2 text-xs text-muted-foreground">Тип заведения</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {venueTypes.map((t) => (
            <button key={t} type="button" onClick={() => setVenue(t)} className={chip(venue === t)}>
              {t}
            </button>
          ))}
        </div>

        {mode === "params" ? (
          <>
            <p className="mb-2 text-sm font-medium">
              Площадь зала: <span className="text-primary">{area} м²</span>
            </p>
            <input type="range" min={10} max={150} step={5} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full accent-primary" />

            <p className="mb-2 mt-5 text-sm font-medium">
              Радиомикрофоны: <span className="text-primary">{mics}</span>
            </p>
            <input type="range" min={2} max={6} step={1} value={mics} onChange={(e) => setMics(Number(e.target.value))} className="w-full accent-primary" />

            <div className="mt-5 flex flex-wrap gap-5 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={sub} onChange={(e) => setSub(e.target.checked)} className="h-4 w-4 accent-primary" />
                Сабвуфер
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={light} onChange={(e) => setLight(e.target.checked)} className="h-4 w-4 accent-primary" />
                Световое оборудование
              </label>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm font-medium">Бюджет, ₸</p>
            <input
              type="number"
              min={400000}
              step={100000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="h-11 w-full max-w-xs rounded-lg border border-border bg-transparent px-3 text-sm outline-none"
            />
            {!fits ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Бюджета недостаточно для полного комплекта — показываем минимальную конфигурацию.
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">Подобрали максимальную комплектацию в рамках бюджета.</p>
            )}
          </>
        )}
      </div>

      <aside className="h-fit rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Смета под ключ</h3>
          <Badge tone="primary">{calc.area} м²</Badge>
        </div>

        <div className="mt-3 divide-y divide-border text-sm">
          {calc.lines.map((l) => (
            <div key={l.name} className="flex items-center justify-between gap-2 py-2">
              <span className="text-muted-foreground">
                {l.name} {l.qty > 1 ? <span className="text-foreground">× {l.qty}</span> : null}
              </span>
              <span className="whitespace-nowrap">{priceFmt(l.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
          <span className="font-medium">Итого</span>
          <span className="text-xl font-semibold">{priceFmt(calc.total)}</span>
        </div>
        <p className="mt-1 text-right text-xs text-accent-fg">рассрочка Kaspi — от {monthly}/мес</p>

        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={() => window.open(waUrl, "_blank", "noopener")}>
            <MessageCircle className="h-4 w-4" /> Заявка со сметой в WhatsApp
          </Button>
          <Button variant="ghost" onClick={addSmeta}>
            {added ? (
              <>
                <Check className="h-4 w-4" /> Добавлено
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" /> Добавить смету в корзину
              </>
            )}
          </Button>
        </div>
      </aside>
    </div>
  );
}
