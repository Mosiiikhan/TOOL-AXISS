import type { Tool } from "@/lib/tools/types";
import { SITE_NAME, SITE_URL } from "@/lib/tools/constants";

const base = SITE_URL.replace(/\/$/, "");

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: base,
  };
}

// name optional hai: SEO pages ka naam h1 se aata hai, asli tools ka title se
export function webApplicationJsonLd(tool: Tool, name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name ?? tool.title.split(" - ")[0],
    description: tool.description,
    url: `${base}/tools/${tool.slug}`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

// Tool page ke liye ek hi call: WebApplication, aur FAQ hon to FAQPage bhi
export function toolJsonLd(tool: Tool, name?: string) {
  const items: Record<string, unknown>[] = [webApplicationJsonLd(tool, name)];
  if (tool.faqs.length > 0) items.push(faqJsonLd(tool.faqs));
  return items;
}