"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { products, blogPosts, typeLabels } from "@/lib/site";

const QUICK_LINKS = [
  { label: "Каталог", href: "/catalog" },
  { label: "Готовые решения", href: "/gotovye-resheniya" },
  { label: "Калькулятор", href: "/kalkulyator" },
  { label: "Сравнение брендов", href: "/sravnenie" },
  { label: "Монтаж под ключ", href: "/pod-klyuch" },
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  const matchedProducts = q.length > 1
    ? products.filter((p) =>
        p.model.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.scenarioLabel ?? "").toLowerCase().includes(q) ||
        typeLabels[p.type].toLowerCase().includes(q) ||
        (p.note ?? "").toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const matchedPosts = q.length > 1
    ? blogPosts.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults = matchedProducts.length > 0 || matchedPosts.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q) return;
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative mx-auto mt-16 w-full max-w-xl px-4">
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск товаров, статей..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Esc
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {/* Результаты товаров */}
            {matchedProducts.length > 0 && (
              <div className="mb-1">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Товары</p>
                {matchedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-surface"
                  >
                    <div>
                      <p className="text-sm font-medium">{p.model}</p>
                      <p className="text-xs text-muted-foreground">{p.brand} · {p.scenarioLabel}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}

            {/* Результаты блога */}
            {matchedPosts.length > 0 && (
              <div className="mb-1">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Статьи</p>
                {matchedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-surface"
                  >
                    <p className="text-sm">{p.title}</p>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}

            {/* Нет результатов */}
            {q.length > 1 && !hasResults && (
              <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                Ничего не найдено по «{query}»
              </p>
            )}

            {/* Быстрые ссылки */}
            {!q && (
              <div>
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Разделы</p>
                {QUICK_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-surface"
                  >
                    <p className="text-sm">{l.label}</p>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
