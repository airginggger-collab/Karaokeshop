import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

// Flat config (ESLint 9). `next lint` объявлен deprecated в Next 15 и удаляется
// в Next 16, поэтому линт запускается напрямую через ESLint CLI (`eslint .`).
// Правила Next (`eslint-config-next`) пока поставляются в старом eslintrc-
// формате — их подключает FlatCompat, это штатный рецепт самого Next.
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts", "public/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Сайт статический (`output: "export"`, `images.unoptimized`) — next/image
      // здесь ничего не оптимизирует, а правило требует его вместо <img>.
      "@next/next/no-img-element": "off",
    },
  },
  {
    // Конфиги по своей природе экспортируют объект/массив анонимно.
    files: ["*.config.mjs", "*.config.js"],
    rules: { "import/no-anonymous-default-export": "off" },
  },
  {
    // `/admin/` — статика Decap CMS в `public/admin/`, а не роут Next.
    // <Link> увёл бы в клиентскую навигацию по несуществующему роуту.
    files: ["src/app/admin-guide/page.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
];

export default config;
