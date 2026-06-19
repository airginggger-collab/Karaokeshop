import type { MetadataRoute } from "next";
import { siteConfig, allPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
