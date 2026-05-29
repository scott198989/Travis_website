import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
