import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/tools/constants";

type Options = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
}: Options): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: { card: "summary", title, description },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}