import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

const cols = [
  {
    title: "О нас",
    links: [
      { href: "/o-nas", label: "О компании" },
      { href: "/keysy", label: "Кейсы" },
      { href: "/blog", label: "Блог" },
      { href: "/servis", label: "Сервис и гарантия" },
      { href: "/sravnenie", label: "AST или Evolution" },
    ],
  },
  {
    title: "Каталог",
    links: [
      { href: "/catalog", label: "Всё оборудование" },
      { href: "/dlya-doma", label: "Для дома" },
      { href: "/dlya-biznesa", label: "Для бизнеса" },
      { href: "/gotovye-resheniya", label: "Готовые решения" },
      { href: "/pod-klyuch", label: "Монтаж под ключ" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { href: "/kontakty", label: siteConfig.address },
      { href: `tel:${siteConfig.phone.replace(/\s|-/g, "")}`, label: siteConfig.phone },
      { href: `https://wa.me/${siteConfig.whatsapp}`, label: "WhatsApp" },
      { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface dark:border-white/[0.06] dark:bg-page">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">Официальный дилер:</span>
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1 text-xs font-semibold">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-primary-soft text-[9px] font-bold text-primary">A</span>
              AST (Art System)
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1 text-xs font-semibold">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold" style={{ background: "var(--night-soft)", color: "var(--night-accent)" }}>SE</span>
              Studio Evolution
            </span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} karaokeshop · {siteConfig.city}</p>
        </div>
      </Container>
    </footer>
  );
}
