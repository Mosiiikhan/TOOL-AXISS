import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools/tools";

export default function ToolsList() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm font-semibold text-brand-700">
          {tools.length} free {tools.length === 1 ? "tool" : "tools"} available
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-brand-300 bg-brand-100 p-4 text-center text-sm font-semibold text-brand-800">
          More tools are coming soon. Check back again!
        </p>
      </div>
    </section>
  );
}