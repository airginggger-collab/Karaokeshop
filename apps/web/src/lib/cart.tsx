"use client";

import * as React from "react";

export type CartItem = { id: string; name: string; price: number; meta?: string; qty: number };
export type CartInput = { id: string; name: string; price: number; meta?: string };

type CartCtx = {
  add: (item: CartInput, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  items: CartItem[];
  total: number;
  ready: boolean;
};

const Ctx = React.createContext<CartCtx | null>(null);
const KEY = "kk-cart";

/** Защищает от повреждённого/подделанного localStorage: отбрасывает мусор,
 * приводит qty к целому ≥1, проверяет, что цена — конечное число ≥0, дедуплицирует id. */
function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartItem[] = [];
  for (const it of raw) {
    if (!it || typeof it !== "object") continue;
    const r = it as Record<string, unknown>;
    const id = typeof r.id === "string" ? r.id : null;
    const name = typeof r.name === "string" ? r.name : null;
    const price = typeof r.price === "number" && Number.isFinite(r.price) && r.price >= 0 ? r.price : null;
    if (!id || !name || price === null || seen.has(id)) continue;
    const qtyFloor = typeof r.qty === "number" ? Math.floor(r.qty) : 1;
    const qty = Number.isFinite(qtyFloor) && qtyFloor >= 1 ? qtyFloor : 1;
    const meta = typeof r.meta === "string" ? r.meta : undefined;
    seen.add(id);
    out.push({ id, name, price, qty, meta });
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(sanitizeCart(JSON.parse(raw)));
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

  const add = React.useCallback((item: CartInput, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ add, remove, clear, count, items, total, ready }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
