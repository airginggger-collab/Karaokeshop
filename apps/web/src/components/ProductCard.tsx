import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { priceFmt, discountPct, typeLabels, type Product } from "@/lib/site";

export function ProductCard({ p }: { p: Product }) {
  const pct = discountPct(p.price, p.priceOld);
  const label = p.scenarioLabel ?? typeLabels[p.type];
  const sub = p.power ?? p.note;

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition"
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden">
        <ProductImage src={p.image} model={p.model} />
        {pct ? (
          <span className="absolute left-2 top-2 rounded-md bg-hot px-2 py-0.5 text-[11px] font-medium text-white">
            −{pct}%
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <h3 className="mt-2 font-medium leading-snug transition group-hover:text-primary">{p.model}</h3>
        {sub ? <p className="text-xs text-muted-foreground">{sub}</p> : null}
        <div className="mt-auto pt-3">
          {pct ? (
            <p className="text-xs text-muted-foreground line-through">{priceFmt(p.priceOld!)}</p>
          ) : null}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-primary">{priceFmt(p.price)}</p>
            <span className="flex items-center gap-0.5 text-xs font-medium text-primary transition group-hover:gap-1">
              Подробнее <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
