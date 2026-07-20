"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Mic2, Search } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./CartButton";
import { ThemeToggle } from "./ThemeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { mainNav, isNavGroup, type NavItem, type NavLink } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

// Выпадающая группа: hover открывает список, клик по заголовку ведёт на href
// секции (если он есть). Раскрытие держится на group-hover / group-focus-within
// (клавиатура: Tab на триггер → Tab внутрь пунктов), поэтому список остаётся в
// DOM (opacity, не visibility) и доступен без JS-состояния. `pt-2` на обёртке —
// мост наведения, чтобы курсор с триггера доезжал до меню, не закрывая его.
function NavDropdown({ item, pathname }: { item: Extract<NavItem, { links: NavLink[] }>; pathname: string }) {
  const active =
    (item.href ? isActive(pathname, item.href) : false) ||
    item.links.some((l) => isActive(pathname, l.href));

  const triggerClass = active ? "hl font-medium" : "text-muted-foreground hover:text-foreground";
  const label = (
    <>
      {item.label}
      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden />
    </>
  );

  return (
    <div className="group relative">
      {item.href ? (
        <Link href={item.href} aria-haspopup="menu" className={`inline-flex items-center gap-1 ${triggerClass}`}>
          {label}
        </Link>
      ) : (
        <button type="button" aria-haspopup="menu" className={`inline-flex items-center gap-1 ${triggerClass}`}>
          {label}
        </button>
      )}
      <div
        role="menu"
        className="pointer-events-none absolute left-0 top-full z-40 min-w-[220px] translate-y-1 pt-2 opacity-0 transition duration-150 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          {item.links.map((l) => {
            const la = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                role="menuitem"
                aria-current={la ? "page" : undefined}
                className={
                  la
                    ? "block bg-muted px-4 py-2.5 text-sm font-medium text-foreground"
                    : "block px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
        {/* Порог lg, не md: 5 пунктов верхнего уровня (часть — выпадашки со
            всеми страницами) на 768px не помещаются между лого и иконками и
            рвутся на две строки. На 768–1023 меню отдаёт бургер — тот же
            mainNav списком. Порог парный с MobileNav (lg:hidden) — менять
            только вместе (ловушка 13). */}
        <nav className="hidden flex-1 items-center gap-5 text-sm lg:flex">
          {mainNav.map((n) =>
            isNavGroup(n) ? (
              <NavDropdown key={n.label} item={n} pathname={pathname} />
            ) : (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(pathname, n.href) ? "page" : undefined}
                className={
                  isActive(pathname, n.href)
                    ? "hl font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {n.label}
              </Link>
            )
          )}
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
