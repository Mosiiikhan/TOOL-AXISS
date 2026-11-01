import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import ToolPageShell from "@/components/tools/ToolPageShell";
import { toolWorkspaces } from "@/components/tools/workspaces";
import { buildMetadata } from "@/lib/metadata";
import { toolJsonLd } from "@/lib/seo/json-ld";
import { getSeoPage, publishedSeoPages } from "@/lib/tools/seo-pages";
import { getRelatedTools, getToolBySlug, tools } from "@/lib/tools/tools";
import type { SeoPage, Tool } from "@/lib/tools/types";

type Props = { params: Promise<{ slug: string }> };

// ToolPageShell Tool leta hai, isliye SeoPage ko Tool ki shakal dete hain.
// Title "h1 - title" banta hai, taake related cards mein h1 hi dikhe.
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
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/tools/${slug}`,
  });
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
    <>
      <JsonLd data={toolJsonLd(shellTool, seo?.h1)} />
      <ToolPageShell tool={shellTool} related={related} seo={seo}>
        <Workspace preset={seo?.preset} />
      </ToolPageShell>
    </>
  );
}