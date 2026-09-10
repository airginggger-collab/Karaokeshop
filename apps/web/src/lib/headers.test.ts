import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const pub = join(__dirname, "../../public");
const read = (p: string) => readFileSync(join(pub, p), "utf8");

// Разбор public/_headers: путь-правило → строки заголовков под ним.
function rules(): Map<string, string[]> {
  const out = new Map<string, string[]>();
  let cur: string[] | null = null;
  for (const line of read("_headers").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    if (!/^\s/.test(line)) out.set(line.trim(), (cur = []));
    else cur?.push(line.trim());
  }
  return out;
}

const csp = (lines: string[] = []) =>
  lines.find((l) => l.startsWith("Content-Security-Policy:"))?.slice(24).trim() ?? "";

const directive = (policy: string, name: string) =>
  policy.split(";").map((d) => d.trim()).find((d) => d.startsWith(name + " "))?.split(/\s+/).slice(1) ?? [];

// Кабинет /admin/ (Sveltia CMS) грузит бандл с CDN и ходит в api.github.com.
// Общая CSP сайта это режет → белый экран, войти нельзя. Сборка, тесты и деплой
// при этом зелёные, а кабинет не открывают неделями (так и прожили 2026-07-14…09-10).
describe("_headers: CSP кабинета /admin/", () => {
  const r = rules();
  const admin = r.get("/admin/*");

  it("у /admin/* своя CSP, а общая снята `!` (иначе политики склеиваются и строгая побеждает)", () => {
    expect(admin).toBeDefined();
    expect(admin).toContain("! Content-Security-Policy");
    expect(csp(admin)).not.toBe("");
  });

  it("CSP кабинета пускает скрипт, который реально грузит admin/index.html", () => {
    const src = read("admin/index.html").match(/<script[^>]+src="([^"]+)"/)?.[1];
    expect(src).toBeDefined();
    const origin = new URL(src!).origin;
    expect(directive(csp(admin), "script-src")).toContain(origin);
    expect(directive(csp(admin), "connect-src")).toContain(origin);
  });

  it("CSP кабинета пускает GitHub API — без него не работают вход по токену и сохранение", () => {
    expect(directive(csp(admin), "connect-src")).toContain("https://api.github.com");
  });

  it("исключение не протекло на весь сайт: общая CSP не пускает CDN кабинета", () => {
    expect(csp(r.get("/*"))).not.toContain("unpkg.com");
  });
});

// Бикон Cloudflare Web Analytics вставляет сам Cloudflare на краю, в репо его тега нет,
// поэтому потерю хоста в CSP не видно ни в коде, ни в сборке: статистика просто перестаёт
// писаться (так и было 2026-07-14…09-10). Разрешён хост целиком: реальный URL бикона
// `beacon.min.js/v31…`, точный путь `beacon.min.js` из доков CF с ним не совпадает.
describe("_headers: CSP сайта пускает Cloudflare Web Analytics", () => {
  it("script-src общей CSP содержит хост бикона", () => {
    expect(directive(csp(rules().get("/*")), "script-src")).toContain("https://static.cloudflareinsights.com");
  });
});
