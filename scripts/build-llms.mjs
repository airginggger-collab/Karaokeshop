import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Генерирует apps/web/public/llms.txt из content/*.json (Фаза 3a, AI-видимость).
// Формат llms.txt: заголовок сайта, аннотация, разделы со ссылками и описаниями,
// чтобы внешние AI-агенты (ChatGPT, Perplexity) точно понимали ассортимент и структуру.
// Запускается на prebuild, результат попадает в статический экспорт (public → out).
// Fail-fast как check-redirects: пустой каталог роняет сборку.

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(scriptDir);
const contentDir = join(repoRoot, "apps", "web", "content");
const outFile = join(repoRoot, "apps", "web", "public", "llms.txt");

function load(name) {
  const raw = JSON.parse(readFileSync(join(contentDir, name), "utf8"));
  return Array.isArray(raw) ? raw : raw.items ?? raw;
}

const ru = (n) => Number(n).toLocaleString("ru-RU");
const tenge = (n) => `${ru(n)} ₸`;

function build() {
  const cfg = load("site-config.json");
  const site = Array.isArray(cfg) ? cfg[0] : cfg;
  const url = site.url.replace(/\/$/, "");
  const products = load("products.json");
  const bundles = load("bundles.json");
  const blog = load("blog.json");

  if (!products.length) throw new Error("build-llms: пустой каталог товаров, сборка остановлена");

  const lines = [];
  lines.push(`# ${site.name}`, "");
  lines.push(
    `> ${site.defaultDescription} Каталог: ${products.length} караоке-систем, ${ru(site.songsTotal)}+ песен.`,
    "",
  );
  lines.push(
    `Контакты: ${site.address}. Телефон ${site.phone}, WhatsApp +${site.whatsapp}. Часы работы: ${site.hours}. Email ${site.email}.`,
    "",
  );

  lines.push("## Каталог систем", "");
  for (const p of products) {
    if (!p.slug || p.price == null) throw new Error(`build-llms: товар без slug/price: ${JSON.stringify(p).slice(0, 80)}`);
    const facts = [
      p.brand && `бренд ${p.brand}`,
      p.scenarioLabel && `сценарий ${p.scenarioLabel}`,
      p.areaMax && `до ${p.areaMax} м²`,
      p.songsCount && `${ru(p.songsCount)} песен`,
      `цена ${tenge(p.price)}`,
    ].filter(Boolean).join(", ");
    const note = p.note ? `. ${p.note}` : "";
    lines.push(`- [${p.model}](${url}/product/${p.slug}): ${facts}${note}`);
  }
  lines.push("");

  lines.push("## Готовые комплекты", "");
  for (const b of bundles) {
    lines.push(`- [${b.title}](${url}/komplekty/${b.slug}): ${b.description}`);
  }
  lines.push("");

  lines.push("## Разделы сайта", "");
  const pages = [
    ["Каталог", "/catalog", "все караоке-системы с фильтрами по сценарию и площади"],
    ["Для дома", "/dlya-doma", "подбор караоке для квартиры и дома"],
    ["Для бизнеса", "/dlya-biznesa", "караоке под ключ для баров, ресторанов, клубов, отелей"],
    ["Готовые решения", "/gotovye-resheniya", "собранные комплекты под типовые задачи"],
    ["Калькулятор сметы", "/kalkulyator", "расчёт стоимости комплекта под площадь и задачи"],
    ["Сервис и монтаж", "/servis", "доставка, установка, настройка, гарантия"],
    ["Песни", "/pesni", "база песен караоке-систем"],
    ["Сравнение", "/sravnenie", "сравнение систем между собой"],
    ["Кейсы", "/keysy", "примеры внедрений у клиентов"],
    ["О компании", "/o-nas", "дилер AST и Studio Evolution в Алматы с 2012"],
    ["Контакты", "/kontakty", "адрес шоурума, телефон, WhatsApp"],
    ["Блог", "/blog", "статьи о выборе и эксплуатации караоке"],
  ];
  for (const [label, path, desc] of pages) {
    lines.push(`- [${label}](${url}${path}): ${desc}`);
  }
  lines.push("");

  lines.push("## Блог", "");
  for (const post of blog) {
    const desc = (post.excerpt || "").trim();
    lines.push(`- [${post.title}](${url}/blog/${post.slug})${desc ? `: ${desc}` : ""}`);
  }
  lines.push("");

  return lines.join("\n");
}

const out = build();
writeFileSync(outFile, out, "utf8");
console.log(`build-llms: записан ${outFile} (${out.length} символов)`);
