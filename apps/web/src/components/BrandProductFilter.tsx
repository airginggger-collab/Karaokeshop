"use client";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/site";

const SCENARIOS: { key: string; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "dom", label: "Дом" },
  { key: "bar", label: "Кафе / бар" },
  { key: "klub", label: "Клуб" },
];

export function BrandProductFilter({ items }: { items: Product[] }) {
  const availableScenarios = new Set(items.map((p) => p.scenario).filter(Boolean));
  const chips = SCENARIOS.filter((s) => s.key === "all" || availableScenarios.has(s.key));

  const [active, setActive] = useState("all");
  const filtered = active === "all" ? items : items.filter((p) => p.scenario === active);

  return (
    <div>
      {chips.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {chips.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === s.key
                  ? "bg-cta text-cta-fg"
                  : "bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}
