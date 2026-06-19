import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, priceFmt, siteConfig } from "@/lib/site";
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
  return {
    title: `${p.model} — купить в ${siteConfig.city}, цена ${priceFmt(p.price)} | рассрочка Kaspi`,
    description: `${p.model} (${p.brand}) — до ${p.areaMax} м². Цена ${priceFmt(p.price)}, рассрочка Kaspi 0-0-12, монтаж и гарантия.`,
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
  const ld = productJsonLd({
    name: p.model,
    price: p.price,
    slug: p.slug,
    brand: p.brand,
    inStock: p.inStock,
  });
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <p className="text-xs text-muted-foreground">
        {p.brand} · до {p.areaMax} м²
      </p>
      <h1 className="mt-1 text-2xl font-medium">{p.model}</h1>
      <p className="mt-2 text-xl font-medium">{priceFmt(p.price)}</p>
      <p className="mt-1 text-sm" style={{ color: "var(--color-accent)" }}>
        Рассрочка Kaspi 0-0-12
      </p>
    </main>
  );
}
