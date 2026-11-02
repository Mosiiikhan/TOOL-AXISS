import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn why we built Tools Axiis: free online tools that run in your browser, with no sign-up and no file uploads.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Simple tools, built for everyone"
        subtitle="Free, fast and private tools that work right in your browser."
      />
      <AboutContent />
    </>
  );
}