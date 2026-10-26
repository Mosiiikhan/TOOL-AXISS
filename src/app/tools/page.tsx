import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ToolsList from "@/components/tools/ToolsList";

export const metadata: Metadata = {
  title: "All Free Online Tools",
  description:
    "Browse all free online image tools: compress, convert and resize your images in your browser with no sign-up.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="All tools"
        title="Free online tools"
        subtitle="Pick a tool and start. Everything works in your browser, and your files stay on your device."
      />
      <ToolsList />
    </>
  );
}