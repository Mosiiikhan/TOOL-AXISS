import { seoPages } from "./seo-pages";
import { metadataSeoPages } from "./metadata-seo";
import type { SeoPage } from "../tools/types";

export const allSeoPages: SeoPage[] = [
  ...seoPages,
  ...metadataSeoPages,
];

export const getSeoPage = (slug: string) =>
  allSeoPages.find((p) => p.slug === slug && p.published);

export const publishedSeoPages = () =>
  allSeoPages.filter((p) => p.published);
