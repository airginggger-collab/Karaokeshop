"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { ProductGrid } from "./ProductGrid";
import { typeLabels, type Product, type ProductType } from "@/lib/site";

const typeOpts: [ProductType, string][] = Object.entries(typeLabels) as [ProductType, string][];

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "hl shrink-0 px-3 py-1.5 text-sm font-medium"
          : "shrink-0 px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className="h-36 animate-pulse bg-scene" />
      <div className="flex flex-col gap-2 p-3.5">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function CatalogClient({ items }: { items: Product[] }) {
  const [q, setQ] = React.useState("");
  const [activeType, setActiveType] = React.useState<ProductType | "all">("all");
  const [isPending, startTransition] = React.useTransition();

  const [displayed, setDisplayed] = React.useState(items);

  function applyFilters(query: string, type: ProductType | "all") {
    startTransition(() => {
      const result = items.filter((p) => {
        if (type !== "all" && p.type !== type) return false;
        if (query.trim() && !p.model.toLowerCase().includes(query.trim().toLowerCase()) && !p.brand.toLowerCase().includes(query.trim().toLowerCase())) return false;
        return true;
      });
      setDisplayed(result);
    });
  }

  function handleQ(v: string) {
    setQ(v);
    applyFilters(v, activeType);
  }

  function handleType(t: ProductType | "all") {
    setActiveType(t);
    applyFilters(q, t);
  }

  return (
    <div className="space-y-4">
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => handleQ(e.target.value)}
          placeholder="Поиск по модели или бренду…"
          className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm outline-none focus:border-primary"
        />
        {q && (
          <button
            type="button"
            onClick={() => handleQ("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Табы-фильтры */}
      <div aria-label="Фильтр по типу" className="flex gap-1 overflow-x-auto border-b border-border pb-1 scrollbar-none">
        <Tab active={activeType === "all"} onClick={() => handleType("all")}>Все</Tab>
        {typeOpts.map(([key, label]) => (
          <Tab key={key} active={activeType === key} onClick={() => handleType(key)}>{label}</Tab>
        ))}
      </div>

      {/* Счётчик */}
      <p className="text-sm text-muted-foreground">{displayed.length} товаров</p>

      {/* Сетка / shimmer */}
      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : displayed.length ? (
        <ProductGrid items={displayed} />
      ) : (
        <p className="py-10 text-center text-sm text-muted-foreground">Ничего не найдено. Попробуйте другой запрос.</p>
      )}
    </div>
  );
}
