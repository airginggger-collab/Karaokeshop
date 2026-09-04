import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const src = join(__dirname, "..");
const read = (p: string) => readFileSync(join(src, p), "utf8");

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

// Регрессы, которые ломали именно телефон и которые не видит ни сборка, ни тип-чек.
describe("мобильная вёрстка: сторожа", () => {
  it("drawer бургера рендерится порталом в body", () => {
    // `.header-scene` держит backdrop-filter, а filter/backdrop-filter/transform
    // на предке делает его containing block для fixed-потомков: без портала
    // `fixed inset-0` схлопывается до коробки шапки (375×56) и меню
    // разваливается поверх контента страницы.
    const nav = read("components/MobileNav.tsx");
    expect(nav).toContain('from "react-dom"');
    expect(nav).toMatch(/createPortal\(\s*drawer\s*,\s*document\.body\s*\)/);
  });

  it("шапка держит backdrop-filter — значит портал обязателен", () => {
    // Если backdrop-filter уберут, тест выше станет необязательным, но пока он
    // есть, связка «шапка + fixed внутри неё» обязана идти через портал.
    expect(read("app/globals.css")).toMatch(/\.header-scene[\s\S]{0,200}backdrop-filter/);
  });

  it("sticky-панель товара публикует высоту, а низ страницы её учитывает", () => {
    expect(read("components/ProductStickyBar.tsx")).toContain("--sticky-bar-h");
    expect(read("app/globals.css")).toMatch(/padding-bottom:\s*var\(--sticky-bar-h/);
  });

  it("кнопка «Наверх» не анимирует bottom", () => {
    // bottom завязан на --sticky-bar-h; при transition-all Chrome не
    // перезапускает переход на изменение одной кастомной переменной и
    // замораживает bottom — кнопка ложилась поверх sticky-панели.
    const s = read("components/ScrollToTop.tsx");
    expect(s).toContain("var(--sticky-bar-h");
    // Смотрим только на классы: слово transition-all живёт и в комментарии выше.
    const classes = (s.match(/className=\{?`?[^`"]*`?\}?/g) ?? []).join(" ");
    expect(classes).not.toContain("transition-all");
  });

  it("поля ввода на телефоне не меньше 16px (iOS иначе зумит страницу)", () => {
    const withInput = walk(join(src, "components")).filter((f) => /<input/.test(readFileSync(f, "utf8")));
    expect(withInput.length).toBeGreaterThan(0);
    for (const file of withInput) {
      const s = readFileSync(file, "utf8");
      for (const cls of s.match(/className="[^"]*"/g) ?? []) {
        // text-sm без мобильного text-base — это 14px в поле → зум на iOS.
        if (/\btext-sm\b/.test(cls) && /\b(h-11|flex-1)\b/.test(cls)) {
          expect.soft(cls, `${file}: поле на text-sm`).toContain("text-base");
        }
      }
    }
  });
});

describe("karaokeshop не называет себя официальным дилером", () => {
  const claim = /[Оо]фициальн\w*\s+дилер|дилеры\s+AST/;

  it("страницы и layout чисты", () => {
    for (const file of walk(join(src, "app"))) {
      expect(claim.test(readFileSync(file, "utf8")), `${file}`).toBe(false);
    }
  });

  it("контент-мета чисты (кроме blog.json — там общие советы про рынок)", () => {
    const contentDir = join(src, "..", "content");
    for (const name of readdirSync(contentDir)) {
      if (!name.endsWith(".json") || name === "blog.json") continue;
      expect(claim.test(readFileSync(join(contentDir, name), "utf8")), name).toBe(false);
    }
  });
});
