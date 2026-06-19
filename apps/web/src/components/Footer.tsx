import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/pod-klyuch", label: "Оснащение под ключ" },
  { href: "/sravnenie", label: "AST или Evolution" },
  { href: "/keysy", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/servis", label: "Сервис и гарантия" },
  { href: "/o-nas", label: "О компании" },
  { href: "/kontakty", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="flex flex-col gap-2 py-8 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">karaokeshop · {siteConfig.city}</p>
        <p>Караоке-системы AST и Studio Evolution. Продажа, монтаж, сервис с 2012.</p>
        <p className="text-foreground">{siteConfig.phone}</p>
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
