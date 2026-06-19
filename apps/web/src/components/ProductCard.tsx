import Link from "next/link";
import { Speaker } from "lucide-react";
import { Badge } from "@kk/ui";
import { priceFmt, installmentMonthly, discountPct, type Product } from "@/lib/site";

export function ProductCard({ p }: { p: Product }) {
  const pct = discountPct(p.price, p.priceOld);
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-background transition hover:border-primary"
    >
      <div className="flex h-32 items-center justify-center bg-surface">
        <Speaker className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="p-3">
        <Badge tone="primary">{p.scenarioLabel}</Badge>
        <h3 className="mt-2 font-medium">{p.model}</h3>
        <p className="mt-1 text-[15px] font-medium">{priceFmt(p.price)}</p>
        {pct ? (
          <p className="text-xs text-muted-foreground">
            −{pct}% от {priceFmt(p.priceOld!)}
          </p>
        ) : (
          <p className="text-xs text-accent-fg">от {priceFmt(installmentMonthly(p.price))}/мес</p>
        )}
      </div>
    </Link>
  );
}
