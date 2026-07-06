import { describe, it, expect } from "vitest";
import {
  siteConfig, scenarios, bundles, brands, products, staticPages,
  songsSample, cases, blogPosts, storyPosts, songsTotal,
  oNasMeta, kontaktyMeta, sravnenieMeta, catalogMeta, podKlyuchMeta,
  komplektyIndexMeta, kalkulyatorMeta, pesniMeta, keysyMeta, blogMeta,
  dlyaDomaMetaV2, dlyaBiznesaMeta, gotovyeResheniyaMeta,
  type Landing,
} from "./site";

const uniq = (xs: string[]) => new Set(xs).size === xs.length;
const isLanding = (m: Landing) =>
  typeof m.slug === "string" && !!m.h1 && !!m.title && !!m.description;

describe("контент-целостность site.ts (контракт для Фазы 1)", () => {
  it("счётчики коллекций не меняются", () => {
    expect(products).toHaveLength(18);
    expect(scenarios).toHaveLength(5);
    expect(bundles).toHaveLength(4);
    expect(brands).toHaveLength(2);
    expect(staticPages).toHaveLength(1);
    expect(blogPosts).toHaveLength(26);
    expect(storyPosts).toHaveLength(8);
    expect(cases).toHaveLength(3);
    expect(songsSample).toHaveLength(8);
  });

  it("siteConfig — обязательные контакты на месте", () => {
    for (const k of ["name", "url", "phone", "whatsapp", "address", "email"] as const) {
      expect(typeof siteConfig[k]).toBe("string");
      expect((siteConfig[k] as string).length).toBeGreaterThan(0);
    }
    expect(songsTotal).toBe(60000);
  });

  it("товары: уникальные slug, цена — конечное число > 0, тип валиден", () => {
    expect(uniq(products.map((p) => p.slug))).toBe(true);
    const types = new Set(["sistema", "akustika", "mikrofon", "sub", "miksher"]);
    for (const p of products) {
      expect(Number.isFinite(p.price)).toBe(true);
      expect(p.price).toBeGreaterThan(0);
      expect(types.has(p.type)).toBe(true);
      expect(typeof p.model).toBe("string");
      expect(p.model.length).toBeGreaterThan(0);
      expect(typeof p.inStock).toBe("boolean");
    }
  });

  it("лендинги/бренды/мета — валидная форма Landing, уникальные slug", () => {
    for (const l of [...scenarios, ...bundles, ...staticPages]) expect(isLanding(l)).toBe(true);
    expect(uniq(scenarios.map((s) => s.slug))).toBe(true);
    expect(uniq(bundles.map((b) => b.slug))).toBe(true);
    expect(uniq(brands.map((b) => b.slug))).toBe(true);
    for (const m of [oNasMeta, kontaktyMeta, sravnenieMeta, catalogMeta, podKlyuchMeta,
      komplektyIndexMeta, kalkulyatorMeta, pesniMeta, keysyMeta, blogMeta,
      dlyaDomaMetaV2, dlyaBiznesaMeta, gotovyeResheniyaMeta]) {
      expect(isLanding(m)).toBe(true);
    }
  });

  it("блог: уникальные slug, есть заголовок и тело", () => {
    expect(uniq(blogPosts.map((p) => p.slug))).toBe(true);
    for (const p of blogPosts) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.body.length).toBeGreaterThan(0);
    }
  });
});
