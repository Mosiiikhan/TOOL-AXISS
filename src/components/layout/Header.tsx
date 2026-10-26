"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/tools/constants";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  // Drawer sirf us page par khula rehta hai jahan kholi gayi thi,
  // isliye link par click karte hi route badalne se apne aap band ho jata hai.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const logo = (
    <>
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white shadow-md shadow-brand-600/30">
        {SITE_NAME[0]}
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-brand-900">
        {SITE_NAME}
      </span>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-brand-200 bg-white/80 px-3 py-2.5 shadow-lg shadow-brand-600/10 backdrop-blur-xl sm:px-4">
          <Link href="/" className="flex items-center gap-2.5">
            {logo}
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive(l.href)
                    ? "bg-brand-100 text-brand-700"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="/tools">All tools</Button>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpenAt(pathname)}
              className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30 transition hover:bg-brand-700 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        inert={!open}
      >
        <div
          onClick={() => setOpenAt(null)}
          className={`absolute inset-0 bg-brand-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              {logo}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpenAt(null)}
              className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-700 transition hover:bg-brand-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-2xl px-4 py-3.5 font-display text-lg font-bold transition ${
                  isActive(l.href)
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-brand-50 text-brand-800 hover:bg-brand-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <Button href="/tools" size="lg" className="w-full">
              Browse all tools
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}