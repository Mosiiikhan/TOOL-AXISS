import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageShell from "@/components/tools/ToolPageShell";
import { toolWorkspaces } from "@/components/tools/workspaces";
import { getRelatedTools, getToolBySlug, tools } from "@/lib/tools/tools";
import { getSeoPage, publishedSeoPages } from "@/lib/tools/seo-pages";
import type { SeoPage, Tool } from "@/lib/tools/types";

type Props = { params: Promise<{ slug: string }> };

// Abhi ToolPageShell sirf Tool leta hai, isliye SeoPage ko Tool bana kar dete hain.
// (Step 3b mein shell ko SEO sections dena sikhayenge.)
function seoAsTool(p: SeoPage): Tool {
  return {
    slug: p.slug,
    title: `${p.h1} - ${p.title}`,
    description: p.description,
    category: "image",
    faqs: p.faqs,
  };
}

function lookup(slug: string): Tool | undefined {
  const t = getToolBySlug(slug);
  if (t) return t;
  const s = getSeoPage(slug);
  return s ? seoAsTool(s) : undefined;
}

export function generateStaticParams() {
  return [
    ...tools.map((t) => ({ slug: t.slug })),
    ...publishedSeoPages().map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const seo = tool ? undefined : getSeoPage(slug);
  const meta = tool ?? seo;
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/tools/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const seo = tool ? undefined : getSeoPage(slug);

  const workspaceKey = tool ? tool.slug : seo?.tool;
  const Workspace = workspaceKey ? toolWorkspaces[workspaceKey] : undefined;
  const shellTool = tool ?? (seo ? seoAsTool(seo) : undefined);
  if (!shellTool || !Workspace) notFound();

  const related = seo
    ? seo.related.map(lookup).filter((t): t is Tool => Boolean(t))
    : getRelatedTools(slug);

  return (
    <ToolPageShell tool={shellTool} related={related} seo={seo}>
      <Workspace preset={seo?.preset} />
    </ToolPageShell>
  );
}