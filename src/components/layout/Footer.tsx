"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/tools/constants";
import { tools } from "@/lib/tools/tools";

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

const linkClass = "text-brand-200 transition hover:text-white";

const subscribe = () => () => {};

export default function Footer() {
  // Server aur build par null, browser mein asli saal.
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return (
    <>
      <div className="relative z-10 -mb-16 mt-20 px-4">
        <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-brand-400 to-brand-600 p-8 shadow-2xl shadow-brand-600/30 sm:p-10 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-48 rounded-full bg-brand-800/30 blur-2xl" />
          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Make your images lighter in seconds
            </h2>
            <p className="mt-2 max-w-md text-brand-50">
              Free, private and no signup. Everything runs right in your
              browser.
            </p>
          </div>
          <Button
            href="/tools/image-compressor"
            variant="secondary"
            size="lg"
            className="relative shrink-0"
          >
            Compress an image
          </Button>
        </div>
      </div>

      <footer className="bg-brand-900 bg-[radial-gradient(circle_at_10%_100%,var(--color-brand-700),transparent_55%)] pt-28">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-400 to-brand-600 font-display text-lg font-extrabold text-white shadow-lg shadow-brand-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" className="size-6" />
              </span>
              <span className="font-display text-2xl font-extrabold text-white">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
              Free image tools that run in your browser. Your files never leave
              your device.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className={linkClass}>
                    {t.title.split(" - ")[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="mx-auto max-w-5xl px-4 py-5 text-sm text-brand-300">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}