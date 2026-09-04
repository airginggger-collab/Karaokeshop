/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт под Cloudflare Pages (вариант A, ADR-0002).
  // Сайт полностью SSG → отдаём чистую статику. Переключимся на
  // @opennextjs/cloudflare, когда добавим CMS/SSR (вариант B).
  output: "export",
  // ⚠️ redirects()/headers() при output:export ИГНОРИРУЮТСЯ Next'ом (ловушка 9).
  // Редиректы — public/_redirects, заголовки — public/_headers (Cloudflare).
  reactStrictMode: true,
  transpilePackages: ["@kk/ui"],
  // В статическом экспорте нет Image Optimization API.
  images: { unoptimized: true },
  // `next build` линтует сам, как только в проекте появляется конфиг ESLint —
  // и падает на первой же ошибке. То есть красный линт валил бы СБОРКУ, а
  // значит и деплой в CI (ловушка 20). Линт держим отдельной командой
  // (`npm run lint`), сборку от него отвязываем сознательно.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
