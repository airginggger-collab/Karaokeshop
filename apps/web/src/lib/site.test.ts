import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  siteConfig, scenarios, bundles, brands, products, staticPages, priceFromBrand,
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

describe("цена «от N ₸» — единый источник (ловушка 12)", () => {
  it("priceFromBrand = минимум по каталогу бренда, null у пустого", () => {
    expect(priceFromBrand("AST")).toBe(720000);
    expect(priceFromBrand("Studio Evolution")).toBe(749000);
    expect(priceFromBrand("Бренда-нет")).toBeNull();
    for (const b of brands) {
      const min = priceFromBrand(b.name);
      expect(min).not.toBeNull();
      // «от» обязано совпадать с самым дешёвым живым товаром бренда
      expect(min).toBe(Math.min(...products.filter((p) => p.brand === b.name).map((p) => p.price)));
    }
  });

  it("страницы не хардкодят цену бренда строкой", () => {
    // Пре-existing дефект (найден 2026-07-16): /brand/[slug] держал «от 950 000 ₸»
    // строкой при живом Evobox за 749 000 — сборка и тесты молчали.
    const root = path.join(__dirname, "..", "app");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(e.name)) files.push(full);
      }
    };
    walk(root);
    expect(files.length).toBeGreaterThan(0);

    // «от 950 000 ₸» / «от 749000 ₸» и т.п. в исходнике страницы — запрещено:
    // цена берётся из priceFromBrand(). Пробел любой, включая неразрывный.
    const hardcoded = /от\s*\d{3}[\s  ]?\d{3}\s*₸/;
    // Единственное исключение, ждёт ответа владельца (вопрос №3 «актуальный прайс»,
    // задан 2026-07-16). На /dlya-doma «от 749 000 ₸» — цена самого дешёвого
    // ГОТОВОГО КОМПЛЕКТА (gotovye-resheniya), а не товара, поэтому пересчитать её
    // из products нельзя. При этом она спорна: AST Mini за 720 000 продаётся уже
    // комплектом (kit: пульт, 2 микрофона, акустика, кабели), то есть заголовок
    // «AST Mini и Evobox от 749 000 ₸» противоречит сам себе. Придёт прайс — либо
    // цифра подтвердится, либо строка уедет в данные, и исключение снимается.
    const allowed = new Set(["dlya-doma/page.tsx"]);

    const offenders = files
      .filter((f) => hardcoded.test(fs.readFileSync(f, "utf8")))
      .map((f) => path.relative(root, f))
      .filter((rel) => !allowed.has(rel));
    expect(offenders).toEqual([]);
  });
});
