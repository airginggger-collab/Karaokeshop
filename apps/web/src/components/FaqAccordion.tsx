"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem { q: string; a: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-background">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            aria-expanded={open === i}
          >
            <span className="font-medium">{item.q}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="border-t border-border px-5 pb-4 pt-3">
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
