import type { ReactNode } from "react";

type Props = {
  tone?: "error" | "info" | "success";
  title?: string;
  children: ReactNode;
};

const STYLES = {
  error: "border-amber-300 bg-amber-50 text-amber-900",
  info: "border-brand-300 bg-brand-100 text-brand-900",
  success: "border-emerald-400 bg-emerald-50 text-emerald-900",
};

export default function PdfNotice({ tone = "info", title, children }: Props) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-2xl border-2 p-4 text-sm ${STYLES[tone]}`}
    >
      {title && <p className="font-display text-base font-bold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}