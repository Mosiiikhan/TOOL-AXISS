
import type * as PdfJs from "pdfjs-dist";

let loading: Promise<typeof PdfJs> | null = null;

export function loadPdfJs(): Promise<typeof PdfJs> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("PDF tools only run in the browser."),
    );
  }

  if (!loading) {
    loading = import("pdfjs-dist")
      .then((mod) => {
        mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        return mod;
      })
      .catch((error: unknown) => {
        loading = null;
        throw error;
      });
  }

  return loading;
}
