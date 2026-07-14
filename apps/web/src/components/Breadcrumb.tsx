import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type BreadcrumbItem = { label: string; href?: string };

/** withLd — компонент сам отдаёт BreadcrumbList JSON-LD из тех же items
 * (плюс «Главная» → "/"), чтобы не держать ручной <JsonLd> рядом.
 * currentPath — путь текущей (последней, без href) страницы для её item. */
export function Breadcrumb({
  items,
  withLd = false,
  currentPath,
}: {
  items: BreadcrumbItem[];
  withLd?: boolean;
  currentPath?: string;
}) {
  return (
    <>
      {withLd && (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            ...items.map((it) => ({ name: it.label, path: it.href ?? currentPath ?? "" })),
          ])}
        />
      )}
      <nav aria-label="breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
