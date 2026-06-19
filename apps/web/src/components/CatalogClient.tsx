"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { ProductGrid } from "./ProductGrid";
import { typeLabels, type Product, type ProductType } from "@/lib/site";

function toggle(set: Set<string>, v: string): Set<string> {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

const typeOpts = Object.entries(typeLabels) as [ProductType, string][];

export function CatalogClient({ items }: { items: Product[] }) {
  const [types, setTypes] = React.useState<Set<string>>(new Set());
  const [brands, setBrands] = React.useState<Set<string>>(new Set());
  const [q, setQ] = React.useState("");

  const brandOpts = Array.from(new Set(items.map((i) => i.brand)));

  const filtered = items.filter((p) => {
    if (types.size && !types.has(p.type)) return false;
    if (brands.size && !brands.has(p.brand)) return false;
    if (q.trim() && !p.model.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <aside className="text-sm">
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border px-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по модели"
            className="h-9 w-full bg-transparent text-sm outline-none"
          />
        </div>

        <p className="mb-2 font-medium">Тип</p>
        {typeOpts.map(([key, label]) => (
          <label key={key} className="mb-1.5 flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" checked={types.has(key)} onChange={() => setTypes((s) => toggle(s, key))} className="h-4 w-4 accent-primary" />
            {label}
          </label>
        ))}

        <p className="mb-2 mt-4 font-medium">Бренд</p>
        {brandOpts.map((b) => (
          <label key={b} className="mb-1.5 flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" checked={brands.has(b)} onChange={() => setBrands((s) => toggle(s, b))} className="h-4 w-4 accent-primary" />
            {b}
          </label>
        ))}
      </aside>

      <div>
        <p className="mb-3 text-sm text-muted-foreground">{filtered.length} товаров</p>
        {filtered.length ? (
          <ProductGrid items={filtered} />
        ) : (
          <p className="text-sm text-muted-foreground">Ничего не найдено — измените фильтры.</p>
        )}
      </div>
    </div>
  );
}
