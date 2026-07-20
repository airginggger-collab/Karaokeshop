import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";
import { waHref } from "@/lib/wa";

const cols = [
  {
    title: "О нас",
    links: [
      { href: "/o-nas", label: "О компании" },
      { href: "/keysy", label: "Кейсы" },
      { href: "/blog", label: "Блог" },
      { href: "/pesni", label: "Каталог песен" },
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
      { href: "/komplekty", label: "Комплекты по площади" },
      { href: "/pod-klyuch", label: "Монтаж под ключ" },
      { href: "/kalkulyator", label: "Калькулятор сметы" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { href: "/kontakty", label: siteConfig.address },
      { href: `tel:${siteConfig.phone.replace(/\s|-/g, "")}`, label: siteConfig.phone },
      { href: waHref(), label: "WhatsApp" },
      { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border dark:border-white/[0.06]">
      <Container className="py-10">
        <p className="ticker mb-8">монтаж под ключ · 2 года гарантии</p>
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
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} karaokeshop · {siteConfig.city}</p>
        </div>
      </Container>
    </footer>
  );
}
