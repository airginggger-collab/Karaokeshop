import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brands, products, priceFmt } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";

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
    <LandingPage h1={b.h1} description={b.description}>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/product/${p.slug}`}
              className="block rounded-lg border border-border px-4 py-3 hover:bg-muted"
            >
              <span className="font-medium">{p.model}</span>
              <span className="ml-2 text-sm text-muted-foreground">{priceFmt(p.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </LandingPage>
  );
}
