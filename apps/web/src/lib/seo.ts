import { siteConfig } from "./site";

export type ProductLd = {
  name: string;
  price: number;
  slug: string;
  brand?: string;
  inStock?: boolean;
  image?: string;
  rating?: number;
  reviewsCount?: number;
};

export function productJsonLd(p: ProductLd) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    ...(p.image ? { image: `${siteConfig.url}${p.image}` } : {}),
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    ...(p.rating && p.reviewsCount ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviewsCount,
        bestRating: 5,
        worstRating: 1,
      },
    } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "KZT",
      price: p.price,
      availability:
        p.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${p.slug}`,
      seller: { "@type": "Organization", name: "karaokeshop" },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
