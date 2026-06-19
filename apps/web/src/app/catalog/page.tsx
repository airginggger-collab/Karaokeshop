import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CatalogClient } from "@/components/CatalogClient";
import { catalogMeta, products } from "@/lib/site";

export const metadata: Metadata = {
  title: catalogMeta.title,
  description: catalogMeta.description,
  alternates: { canonical: "/catalog" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{catalogMeta.h1}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{catalogMeta.description}</p>
      <div className="mt-6">
        <CatalogClient items={products} />
      </div>
    </Container>
  );
}
