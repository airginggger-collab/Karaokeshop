import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/o-nas", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/servis", label: "Сервис и гарантия" },
  { href: "/pod-klyuch", label: "Оснащение под ключ" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="flex flex-col gap-2 py-8 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">karaokeshop · Алматы</p>
        <p>Караоке-системы AST и Studio Evolution. Продажа, монтаж, сервис с 2012.</p>
        <nav className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
