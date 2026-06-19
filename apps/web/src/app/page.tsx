import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/site";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <TrustStrip />
      <Container className="py-8">
        <SectionHeading title="Популярные системы" href="/catalog" />
        <ProductGrid items={featured} />
      </Container>
    </>
  );
}
