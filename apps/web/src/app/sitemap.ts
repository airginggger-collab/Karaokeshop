import type { MetadataRoute } from "next";
import { siteConfig, routeMeta } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...Object.keys(routeMeta)];
  return paths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
