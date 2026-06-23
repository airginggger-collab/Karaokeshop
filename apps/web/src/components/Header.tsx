import Link from "next/link";
import { Mic2, Search } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./CartButton";
import { ThemeToggle } from "./ThemeToggle";
import { mainNav } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background dark:border-white/[0.08] dark:bg-[#0e131c]">
      <Container className="flex h-14 items-center gap-4">
        <MobileNav />
        <Link href="/" className="flex items-center gap-1.5 font-semibold tracking-tight">
          <Mic2 className="h-5 w-5 text-primary" />
          karaokeshop
        </Link>
        <nav className="hidden flex-1 items-center gap-5 text-sm text-muted-foreground md:flex">
          {mainNav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <button aria-label="Поиск" className="text-muted-foreground hover:text-foreground">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
}
