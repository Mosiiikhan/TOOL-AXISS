import Button from "@/components/ui/Button";
import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools/tools";

export default function PopularTools() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Popular tools
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Pick a tool and start
          </h2>
          <p className="mt-3 text-slate-600">
            Each tool is free, fast and works right in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/tools" variant="secondary" size="lg">
            See all tools
          </Button>
        </div>
      </div>
    </section>
  );
}