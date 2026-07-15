import { describe, it, expect } from "vitest";
import {
  productJsonLd,
  breadcrumbJsonLd,
  websiteJsonLd,
  blogPostingJsonLd,
  itemListJsonLd,
} from "./seo";

describe("productJsonLd", () => {
  it("содержит Offer с ценой и валютой KZT", () => {
    const ld = productJsonLd({ name: "AST-250", price: 1500000, slug: "ast-250" });
    expect(ld["@type"]).toBe("Product");
    expect(ld.offers.priceCurrency).toBe("KZT");
    expect(ld.offers.price).toBe(1500000);
    expect(ld.offers.availability).toContain("InStock");
    expect(ld.offers.url).toContain("/product/ast-250");
  });

  it("помечает отсутствие на складе", () => {
    const ld = productJsonLd({ name: "X", price: 1, slug: "x", inStock: false });
    expect(ld.offers.availability).toContain("OutOfStock");
  });
});

describe("breadcrumbJsonLd", () => {
  it("нумерует позиции с 1", () => {
    const ld = breadcrumbJsonLd([
      { name: "Каталог", path: "/catalog" },
      { name: "AST-250", path: "/product/ast-250" },
    ]);
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].position).toBe(2);
  });
});

describe("websiteJsonLd", () => {
  it("описывает WebSite с SearchAction на /catalog?q=", () => {
    const ld = websiteJsonLd();
    expect(ld["@type"]).toBe("WebSite");
    expect(ld.potentialAction["@type"]).toBe("SearchAction");
    expect(ld.potentialAction.target.urlTemplate).toContain("/catalog?q={search_term_string}");
    expect(ld.potentialAction["query-input"]).toContain("search_term_string");
  });
});

describe("blogPostingJsonLd", () => {
  it("строит BlogPosting с headline, url и связью с бизнес-узлом", () => {
    const ld = blogPostingJsonLd({ title: "Как выбрать караоке", excerpt: "Коротко о выборе", slug: "kak-vybrat" });
    expect(ld["@type"]).toBe("BlogPosting");
    expect(ld.headline).toBe("Как выбрать караоке");
    expect(ld.url).toContain("/blog/kak-vybrat");
    expect(ld.author["@id"]).toContain("#business");
    expect(ld.publisher["@id"]).toContain("#business");
  });
});

describe("itemListJsonLd", () => {
  it("нумерует элементы с 1 и строит абсолютные url", () => {
    const ld = itemListJsonLd([
      { name: "AST-250", path: "/product/ast-250" },
      { name: "AST Mini", path: "/product/ast-mini" },
    ]);
    expect(ld["@type"]).toBe("ItemList");
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].position).toBe(2);
    expect(ld.itemListElement[0].url).toContain("/product/ast-250");
  });
});
