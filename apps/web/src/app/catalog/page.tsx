import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CatalogClient } from "@/components/CatalogClient";
import { catalogMeta, products } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const breadcrumbLd = breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Каталог", path: "/catalog" }]);

export const metadata: Metadata = {
  title: catalogMeta.title,
  description: catalogMeta.description,
  alternates: { canonical: "/catalog" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumb items={[{ label: "Каталог" }]} />
      <h1 className="font-display text-2xl font-bold">{catalogMeta.h1}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{catalogMeta.description}</p>
      <div className="mt-6">
        <CatalogClient items={products} />
      </div>
    </Container>
  );
}
