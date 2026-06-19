"use client";

import * as React from "react";
import { products, type Product } from "./site";

type CartItem = { slug: string; qty: number };

type CartCtx = {
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  lines: { product: Product; qty: number }[];
  total: number;
  ready: boolean;
};

const Ctx = React.createContext<CartCtx | null>(null);
const KEY = "kk-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const add = React.useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.slug === slug);
      if (ex) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, qty }];
    });
  }, []);

  const remove = React.useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const lines = items
    .map((i) => ({ product: products.find((p) => p.slug === i.slug), qty: i.qty }))
    .filter((l): l is { product: Product; qty: number } => Boolean(l.product));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <Ctx.Provider value={{ add, remove, clear, count, lines, total, ready }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
