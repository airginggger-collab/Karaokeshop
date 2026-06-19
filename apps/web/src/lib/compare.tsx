"use client";

import * as React from "react";

const KEY = "kk-compare";
const MAX = 4;

type CompareCtx = {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  count: number;
  full: boolean;
  ready: boolean;
};

const Ctx = React.createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {
      /* ignore */
    }
  }, [slugs, ready]);

  const toggle = React.useCallback((slug: string) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX) return prev;
      return [...prev, slug];
    });
  }, []);

  const remove = React.useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = React.useCallback(() => setSlugs([]), []);
  const has = React.useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return (
    <Ctx.Provider value={{ slugs, toggle, remove, clear, has, count: slugs.length, full: slugs.length >= MAX, ready }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCompare(): CompareCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useCompare must be used within CompareProvider");
  return c;
}
