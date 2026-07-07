"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mic2, Search } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./CartButton";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { mainNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    <header className="sticky top-0 z-30 border-b border-border bg-background dark:bg-page">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className="box-border flex h-7 w-7 items-center justify-center rounded-[8px]"
            style={{ background: "#17233f", border: "1px solid #2a3852" }}
          >
            <Mic2 className="h-4 w-4" style={{ color: "#facc15" }} />
          </span>
          karaokeshop
        </Link>
        <nav className="hidden flex-1 items-center gap-5 text-sm md:flex">
          {mainNav.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "hl font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Поиск"
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <CartButton />
        </div>
      </Container>
    </header>
    </>
  );
}
