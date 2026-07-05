import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Wrench, Music, Zap } from "lucide-react";
import { Badge, Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AddToCart } from "@/components/AddToCart";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { ProductStickyBar } from "@/components/ProductStickyBar";
import { products, priceFmt, discountPct, typeLabels, siteConfig } from "@/lib/site";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Рейтинг/отзывы в data-массиве не верифицированы (нет реальных отзывов от заказчика) —
// строка «4.9 · N отзывов» и aggregateRating в JSON-LD скрыты флагом, данные не удалять.
const SHOW_UNVERIFIED_RATINGS = false; // включить после реальных отзывов от заказчика

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
    title: `${p.model} — купить в ${siteConfig.city}, цена ${priceFmt(p.price)}`,
    description: `${p.model} (${p.brand}) — ${detail}. Цена ${priceFmt(p.price)}, монтаж, настройка и гарантия.`,
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

  // Похожие: тот же бренд (до 3), + альтернативы другого бренда того же типа (до 6 итого)
  const sameBrand = products.filter((x) => x.slug !== p.slug && x.brand === p.brand).slice(0, 3);
  const altBrand = products
    .filter((x) => x.slug !== p.slug && x.brand !== p.brand && x.type === p.type)
    .slice(0, Math.max(0, 6 - sameBrand.length));
  const related = [...sameBrand, ...altBrand];

  const ld = productJsonLd({
    name: p.model,
    price: p.price,
    slug: p.slug,
    brand: p.brand,
    inStock: p.inStock,
    image: p.image,
    ...(SHOW_UNVERIFIED_RATINGS ? { rating: p.rating, reviewsCount: p.reviewsCount } : {}),
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
    { name: p.model, path: `/product/${p.slug}` },
  ]);
  const pct = discountPct(p.price, p.priceOld);
  const label = p.scenarioLabel ?? typeLabels[p.type];
  const songs = p.songsCount ? new Intl.NumberFormat("ru-RU").format(p.songsCount) : null;
  const waText = encodeURIComponent(`Здравствуйте! Интересует ${p.model}, подскажите наличие и цену.`);
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${waText}`;

  return (
    <Container className="pb-28 pt-6 lg:pb-10">
      <Breadcrumb items={[{ label: "Каталог", href: "/catalog" }, { label: p.model }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Desktop split */}
      <div className="mt-6 lg:grid lg:grid-cols-[1fr_420px] lg:gap-12">

        {/* Фото — слева */}
        <div className="overflow-hidden rounded-xl bg-scene" style={{ minHeight: 360 }}>
          <div className="aspect-square w-full lg:aspect-auto lg:h-[520px]">
            <ProductImage src={p.image} model={p.model} className="h-full w-full" />
          </div>
        </div>

        {/* Детали — справа, sticky на десктопе */}
        <div className="mt-6 lg:sticky lg:top-[72px] lg:mt-0 lg:self-start">
          <Badge tone="primary">{label} · {p.brand}</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {p.model}
          </h1>

          {SHOW_UNVERIFIED_RATINGS && p.rating ? (
            <p className="mt-1 flex items-center gap-1 text-sm text-accent-fg">
              <Star className="h-4 w-4" /> {p.rating} · {p.reviewsCount} отзыва ·{" "}
              <span className={p.inStock ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                {p.inStock ? "в наличии" : "под заказ"}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-accent-fg">{p.inStock ? "в наличии" : "под заказ"}</p>
          )}

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold">{priceFmt(p.price)}</span>
            {p.priceOld ? (
              <span className="text-sm text-muted-foreground line-through">{priceFmt(p.priceOld)}</span>
            ) : null}
            {pct ? (
              <span className="rounded-md bg-hot px-2 py-0.5 text-xs font-medium text-hot-fg">−{pct}%</span>
            ) : null}
          </div>

          {/* CTA — только десктоп (mobile sticky bar ниже) */}
          <div className="mt-5 hidden flex-col gap-3 lg:flex">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L0 24l6.335-1.501A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 0 1-5.006-1.371l-.36-.214-3.726.883.935-3.617-.235-.372A9.818 9.818 0 1 1 12 21.818z" />
              </svg>
              Узнать цену в WhatsApp
            </a>
            <AddToCart item={{ id: p.slug, name: p.model, price: p.price, meta: label }} />
            <Button variant="ghost">Нужна консультация</Button>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> Гарантия + сервис-центр в Алматы
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4 shrink-0 text-primary" /> Монтаж и настройка под помещение
            </li>
            {songs ? (
              <li className="flex items-center gap-2">
                <Music className="h-4 w-4 shrink-0 text-primary" /> {songs}+ песен · обновление репертуара
              </li>
            ) : p.power ? (
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 shrink-0 text-primary" /> Мощность: {p.power}
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Состав / характеристики */}
      {p.kit ? (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-medium">Что в комплекте</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {p.kit.map((k) => (
              <span key={k} className="rounded-md bg-surface px-3 py-1.5">{k}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-medium">Характеристики</h2>
          <dl className="max-w-md divide-y divide-border overflow-hidden rounded-xl border border-border text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-muted-foreground">Бренд</dt><dd>{p.brand}</dd>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-muted-foreground">Тип</dt><dd>{typeLabels[p.type]}</dd>
            </div>
            {p.power ? (
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-muted-foreground">Мощность</dt><dd>{p.power}</dd>
              </div>
            ) : null}
            {p.note ? (
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-muted-foreground">Особенности</dt><dd>{p.note}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      )}

      {/* Похожие товары */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Похожие товары</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}

      {/* Mobile sticky bottom bar */}
      <ProductStickyBar model={p.model} price={p.price} />
    </Container>
  );
}
