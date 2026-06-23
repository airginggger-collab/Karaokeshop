"use client";

import Link from "next/link";
import { Speaker } from "lucide-react";
import { Badge } from "@kk/ui";
import { priceFmt, discountPct, typeLabels, siteConfig, type Product } from "@/lib/site";

export function ProductCard({ p }: { p: Product }) {
  const pct = discountPct(p.price, p.priceOld);
  const label = p.scenarioLabel ?? typeLabels[p.type];
  const sub = p.power ?? p.note;
  const waText = encodeURIComponent(`Здравствуйте! Интересует ${p.model}, подскажите наличие и цену.`);
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${waText}`;

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:border-primary"
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-surface to-muted">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.model} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Speaker className="h-9 w-9 text-muted-foreground transition group-hover:scale-105" />
        )}
        {pct ? (
          <span className="absolute left-2 top-2 rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-fg">
            −{pct}%
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <Badge tone="primary">{label}</Badge>
        <h3 className="mt-2 font-medium">{p.model}</h3>
        {sub ? <p className="text-xs text-muted-foreground">{sub}</p> : null}
        <p className="mt-1 text-[15px] font-semibold">{priceFmt(p.price)}</p>
        {pct ? (
          <p className="text-xs text-muted-foreground line-through">{priceFmt(p.priceOld!)}</p>
        ) : null}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 text-[13px] font-medium text-white transition hover:bg-[#1ebe5d]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L0 24l6.335-1.501A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 0 1-5.006-1.371l-.36-.214-3.726.883.935-3.617-.235-.372A9.818 9.818 0 1 1 12 21.818z" />
          </svg>
          Узнать цену
        </a>
      </div>
    </Link>
  );
}
