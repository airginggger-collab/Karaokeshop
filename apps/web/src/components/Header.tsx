import Link from "next/link";
import { Mic2, Search, ShoppingCart, CreditCard } from "lucide-react";
import { Container } from "./Container";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/komplekty", label: "Готовые комплекты" },
  { href: "/pod-klyuch", label: "Под ключ" },
  { href: "/pesni", label: "Песни" },
  { href: "/servis", label: "Сервис" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <Container className="flex h-14 items-center gap-5">
        <Link href="/" className="flex items-center gap-1.5 font-medium">
          <Mic2 className="h-5 w-5 text-primary" />
          karaokeshop
        </Link>
        <nav className="hidden flex-1 items-center gap-4 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Search className="h-[18px] w-[18px] text-muted-foreground" aria-hidden />
          <Link href="/catalog" aria-label="Корзина">
            <ShoppingCart className="h-[18px] w-[18px] text-muted-foreground" />
          </Link>
          <span className="hidden items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-[11px] font-medium text-accent-fg sm:inline-flex">
            <CreditCard className="h-3.5 w-3.5" />
            рассрочка 0-0-12
          </span>
        </div>
      </Container>
    </header>
  );
}
