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
