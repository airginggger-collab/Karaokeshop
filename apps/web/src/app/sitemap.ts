import type { MetadataRoute } from "next";
import { siteConfig, allPaths } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
