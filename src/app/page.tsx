import Hero from "@/components/home/Hero";
import PopularTools from "@/components/home/PopularTools";
import Features from "@/components/home/Features";
import FAQPreview from "@/components/home/FAQPreview";
import JsonLd from "@/components/seo/JsonLd";
import { webSiteJsonLd } from "@/lib/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <Hero />
      <PopularTools />
      <Features />
      <FAQPreview />
    </>
  );
}