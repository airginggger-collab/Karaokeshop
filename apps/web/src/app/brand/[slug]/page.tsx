import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { brands, products } from "@/lib/site";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: `/brand/${b.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) notFound();
  const items = products.filter((p) => p.brand === b.name);

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{b.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{b.description}</p>
      <div className="mt-6">
        <ProductGrid items={items} />
      </div>
    </Container>
  );
}
