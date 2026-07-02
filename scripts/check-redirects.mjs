// Валидация apps/web/public/_redirects перед деплоем.
// Cloudflare Workers Static Assets принимает в _redirects ТОЛЬКО относительные URL.
// Абсолютные (с http/https-хостом) → wrangler deploy падает
// ("Invalid _redirects configuration: Only relative URLs are allowed").
// Раньше это ловилось только в CI-деплое (локальный `next build` файл не валидирует),
// из-за чего прод молча застревал. Теперь ловим на сборке.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL("../apps/web/public/_redirects", import.meta.url));
if (!existsSync(path)) {
  console.log("check-redirects: _redirects отсутствует — пропуск.");
  process.exit(0);
}

const bad = [];
readFileSync(path, "utf8").split("\n").forEach((line, i) => {
  const l = line.trim();
  if (!l || l.startsWith("#")) return;      // пусто или комментарий
  if (/https?:\/\//i.test(l)) bad.push(`  строка ${i + 1}: ${l}`);
});

if (bad.length) {
  console.error("\n❌ _redirects: только ОТНОСИТЕЛЬНЫЕ URL (Cloudflare Workers Static Assets).");
  console.error("   Абсолютные (с хостом) правила ломают `wrangler deploy` и застревают на CI.");
  console.error("   Хост-канонизацию (www) делать через Cloudflare Redirect Rules, не здесь.\n");
  console.error(bad.join("\n"));
  console.error("");
  process.exit(1);
}

console.log("✓ check-redirects: только относительные правила — деплой не сломается.");
