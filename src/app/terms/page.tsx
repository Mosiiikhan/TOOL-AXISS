import TermsContent from "@/components/pages/TermsContent";
import PageHero from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The rules for using our free online image tools: what they do, your responsibility for your files, and the limits of our service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="Simple rules for using our free image tools."
      />
      <TermsContent />
    </>
  );
}