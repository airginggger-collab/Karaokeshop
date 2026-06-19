"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-14 z-40 border-b border-border bg-background shadow-sm">
          <nav className="flex flex-col gap-1 p-3">
            {mainNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-[15px] hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
