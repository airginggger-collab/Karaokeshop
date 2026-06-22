"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="-ml-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 top-14 z-30 bg-foreground/20"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={[
          "absolute left-0 right-0 top-14 z-40 border-b border-border bg-background shadow-sm transition-[opacity,transform] duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 p-3">
          {mainNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] hover:bg-muted"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
