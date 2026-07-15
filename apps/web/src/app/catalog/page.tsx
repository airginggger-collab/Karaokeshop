import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CatalogClient } from "@/components/CatalogClient";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/seo";
import { catalogMeta, products } from "@/lib/site";

export const metadata: Metadata = {
  title: catalogMeta.title,
  description: catalogMeta.description,
  alternates: { canonical: "/catalog" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb withLd currentPath="/catalog" items={[{ label: "Каталог" }]} />
      <JsonLd
        data={itemListJsonLd(
          products.map((p) => ({ name: p.model, path: `/product/${p.slug}` })),
        )}
      />
      <h1 className="font-display text-2xl font-bold">{catalogMeta.h1}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{catalogMeta.description}</p>
      <div className="mt-6">
        <Suspense fallback={null}>
          <CatalogClient items={products} />
        </Suspense>
      </div>
    </Container>
  );
}
