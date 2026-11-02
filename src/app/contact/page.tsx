import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question, feedback or an idea for a new tool? Get in touch with the Tool Axiis team by email.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        subtitle="Questions, feedback or ideas for new tools are always welcome."
      />
      <ContactContent />
    </>
  );
}