/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт под Cloudflare Pages (вариант A, ADR-0002).
  // Сайт полностью SSG → отдаём чистую статику. Переключимся на
  // @opennextjs/cloudflare, когда добавим CMS/SSR (вариант B).
  output: "export",
  redirects: async () => [
    { source: "/karaoke/dlya-doma", destination: "/dlya-doma", permanent: true },
  ],
  reactStrictMode: true,
  transpilePackages: ["@kk/ui"],
  // В статическом экспорте нет Image Optimization API.
  images: { unoptimized: true },
};

export default nextConfig;
