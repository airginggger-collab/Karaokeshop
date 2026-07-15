import { siteConfig } from "./site";

export type ProductLd = {
  name: string;
  price: number;
  slug: string;
  brand?: string;
  inStock?: boolean;
  image?: string;
  description?: string;
  category?: string;
  rating?: number;
  reviewsCount?: number;
};

export function productJsonLd(p: ProductLd) {
  // priceValidUntil детерминирован по году сборки (конец текущего года), чтобы
  // Offer не считался протухшим. seller связан по @id с бизнес-узлом (#business),
  // а не безымянной Organization, чтобы не плодить дубль в графе.
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.slug,
    ...(p.image ? { image: `${siteConfig.url}${p.image}` } : {}),
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    ...(p.description ? { description: p.description } : {}),
    ...(p.category ? { category: p.category } : {}),
    // aggregateRating эмитить ТОЛЬКО вместе с реальными отзывами, видимыми на самой
    // странице, иначе разметка отзывов, которых нет в контенте = нарушение Google
    // (structured data must match visible content) и риск ручных санкций. Выдуманные
    // rating/reviewsCount удалены из products.json (2026-07-15), ветка ждёт реальные.
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
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil,
      availability:
        p.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${p.slug}`,
      seller: { "@type": "Organization", "@id": `${siteConfig.url}/#business`, name: "karaokeshop" },
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

// WebSite + SearchAction: заявка на sitelinks searchbox в выдаче Google.
// Поиск сайта живёт на /catalog?q=… (CatalogClient читает ?q=). @id связывает
// узел с бизнес-узлом LocalBusiness (#business) в общий entity-граф.
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "ru",
    publisher: { "@id": `${siteConfig.url}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// BlogPosting для статей блога. Автор и издатель ссылаются на бизнес-узел (#business).
// Примечание: rich-результат Article у Google требует datePublished и изображения,
// которых в content/blog.json пока нет; узел всё равно усиливает entity-граф.
export function blogPostingJsonLd(post: { title: string; excerpt: string; slug: string }) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: "ru",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": `${siteConfig.url}/#business` },
    publisher: { "@id": `${siteConfig.url}/#business` },
  };
}

// ItemList для листингов (каталог, комплекты): заявка на carousel-rich у Google
// и явная связь листинга с товарами. Принимает пути, префиксует siteConfig.url.
export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${siteConfig.url}${it.path}`,
    })),
  };
}
