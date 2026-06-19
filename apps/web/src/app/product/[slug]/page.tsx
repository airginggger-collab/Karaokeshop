import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Speaker, Star, ShieldCheck, Wrench, Music, CreditCard, Zap } from "lucide-react";
import { Badge, Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { AddToCart } from "@/components/AddToCart";
import { CompareToggle } from "@/components/CompareToggle";
import { products, priceFmt, installmentMonthly, discountPct, typeLabels, siteConfig } from "@/lib/site";
import { productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  const detail = p.areaMax ? `до ${p.areaMax} м²` : p.power ?? p.note ?? typeLabels[p.type];
  return {
    title: `${p.model} — купить в ${siteConfig.city}, цена ${priceFmt(p.price)} | рассрочка Kaspi`,
    description: `${p.model} (${p.brand}) — ${detail}. Цена ${priceFmt(p.price)}, рассрочка Kaspi 0-0-12, монтаж и гарантия.`,
    alternates: { canonical: `/product/${p.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const ld = productJsonLd({ name: p.model, price: p.price, slug: p.slug, brand: p.brand, inStock: p.inStock });
  const pct = discountPct(p.price, p.priceOld);
  const label = p.scenarioLabel ?? typeLabels[p.type];
  const songs = p.songsCount ? new Intl.NumberFormat("ru-RU").format(p.songsCount) : null;

  return (
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-surface to-muted">
          <Speaker className="h-16 w-16 text-muted-foreground" />
        </div>

        <div>
          <Badge tone="primary">
            {label} · {p.brand}
          </Badge>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{p.model}</h1>
          {p.rating ? (
            <p className="mt-1 flex items-center gap-1 text-sm text-accent-fg">
              <Star className="h-4 w-4" /> {p.rating} · {p.reviewsCount} отзыва · {p.inStock ? "в наличии" : "под заказ"}
            </p>
          ) : (
            <p className="mt-1 text-sm text-accent-fg">{p.inStock ? "в наличии" : "под заказ"}</p>
          )}

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">{priceFmt(p.price)}</span>
            {p.priceOld ? (
              <span className="text-sm text-muted-foreground line-through">{priceFmt(p.priceOld)}</span>
            ) : null}
            {pct ? <Badge tone="accent">−{pct}%</Badge> : null}
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-accent-fg">
            <CreditCard className="h-4 w-4" /> Kaspi рассрочка — от {priceFmt(installmentMonthly(p.price))} × 12 мес
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <AddToCart item={{ id: p.slug, name: p.model, price: p.price, meta: label }} />
            <CompareToggle slug={p.slug} variant="button" />
            <Button variant="ghost">Нужна консультация</Button>
          </div>

          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Гарантия + сервис-центр в Алматы
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4" /> Монтаж и настройка под помещение
            </li>
            {songs ? (
              <li className="flex items-center gap-2">
                <Music className="h-4 w-4" /> {songs}+ песен · обновление репертуара
              </li>
            ) : p.power ? (
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Мощность: {p.power}
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {p.kit ? (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-medium">Что в комплекте</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {p.kit.map((k) => (
              <span key={k} className="rounded-md bg-surface px-3 py-1.5">
                {k}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-medium">Характеристики</h2>
          <dl className="max-w-md divide-y divide-border overflow-hidden rounded-xl border border-border text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-muted-foreground">Бренд</dt>
              <dd>{p.brand}</dd>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-muted-foreground">Тип</dt>
              <dd>{typeLabels[p.type]}</dd>
            </div>
            {p.power ? (
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-muted-foreground">Мощность</dt>
                <dd>{p.power}</dd>
              </div>
            ) : null}
            {p.note ? (
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-muted-foreground">Особенности</dt>
                <dd>{p.note}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      )}
    </Container>
  );
}
