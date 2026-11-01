import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tools/constants";
import { publishedSeoPages } from "@/lib/tools/seo-pages";
import { tools } from "@/lib/tools/tools";

const base = SITE_URL.replace(/\/$/, "");

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: Entry[] = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const toolPages = tools.map(
    (t): Entry => ({
      url: `${base}/tools/${t.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const seoPages = publishedSeoPages().map(
    (p): Entry => ({
      url: `${base}/tools/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...toolPages, ...seoPages];
}