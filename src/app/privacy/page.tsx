import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PolicyContent from "@/components/pages/PolicyContent";
import { privacyPolicy } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Tool Axiis handles your information. Your images are processed in your browser and are never uploaded to our servers.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="What we collect, what we don't, and the choices you have."
      />
      <PolicyContent {...privacyPolicy} />
    </>
  );
}