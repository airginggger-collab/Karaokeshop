import Link from "next/link";
import { Speaker } from "lucide-react";
import { Badge } from "@kk/ui";
import { priceFmt, installmentMonthly, discountPct, type Product } from "@/lib/site";

export function ProductCard({ p }: { p: Product }) {
  const pct = discountPct(p.price, p.priceOld);
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:shadow-md"
    >
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-surface to-muted">
        <Speaker className="h-9 w-9 text-muted-foreground transition group-hover:scale-105" />
        {pct ? (
          <span className="absolute left-2 top-2 rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">
            −{pct}%
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <Badge tone="primary">{p.scenarioLabel}</Badge>
        <h3 className="mt-2 font-medium">{p.model}</h3>
        <p className="mt-1 text-[15px] font-semibold">{priceFmt(p.price)}</p>
        {pct ? (
          <p className="text-xs text-muted-foreground line-through">{priceFmt(p.priceOld!)}</p>
        ) : (
          <p className="text-xs text-accent-fg">от {priceFmt(installmentMonthly(p.price))}/мес</p>
        )}
      </div>
    </Link>
  );
}
