
import { seoPages } from "./seo-pages";
import { metadataSeoPages } from "./metadata-seo";
import { pdfSeoPages } from "./pdf-seo";
import type { SeoPage } from "../tools/types";

export const allSeoPages: SeoPage[] = [
  ...seoPages,
  ...metadataSeoPages,
  ...pdfSeoPages,
];

export const getSeoPage = (slug: string) =>
  allSeoPages.find((p) => p.slug === slug && p.published);

export const publishedSeoPages = () =>
  allSeoPages.filter((p) => p.published);
