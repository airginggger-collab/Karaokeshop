import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FilterRail } from "@/components/FilterRail";
import { ProductGrid } from "@/components/ProductGrid";
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
      <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
        <FilterRail />
        <ProductGrid items={products} />
      </div>
    </Container>
  );
}
