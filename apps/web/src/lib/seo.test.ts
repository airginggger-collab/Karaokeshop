import { describe, it, expect } from "vitest";
import { productJsonLd, breadcrumbJsonLd } from "./seo";

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
