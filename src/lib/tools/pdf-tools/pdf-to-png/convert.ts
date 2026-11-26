
import { loadPdfJs } from "../shared/pdfjs";
import { validatePdfFile, LIMITS } from "../shared/validation";
import { PdfToolError } from "../shared/types";
import {
  clampScale,
  pageFileName,
  throwIfAborted,
  yieldToBrowser,
} from "../shared/utils";

export interface PdfToPngOptions {
  pages?: number[];
  scale?: number;
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
}

export interface PngPageResult {
  blob: Blob;
  fileName: string;
  pageNumber: number;
}

export interface PdfToPngResult {
  files: PngPageResult[];
  totalPages: number;
}

export async function convertPdfToPng(
  file: File,
  options: PdfToPngOptions = {},
): Promise<PdfToPngResult> {
  await validatePdfFile(file);
  throwIfAborted(options.signal);

  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());

  const loadingTask = pdfjs.getDocument({
    data,
    maxImageSize: LIMITS.maxPdfPages * 1000000,
  });

  try {
    const pdf = await loadingTask.promise;

    if (pdf.numPages > LIMITS.maxPdfPages) {
      throw new PdfToolError(
        "too-many-pages",
        `PDF cannot contain more than ${LIMITS.maxPdfPages} pages.`,
      );
    }

    const selectedPages = options.pages?.length
      ? [...new Set(options.pages)]
      : Array.from({ length: pdf.numPages }, (_, index) => index + 1);

    if (
      selectedPages.some(
        (page) => !Number.isInteger(page) || page < 1 || page > pdf.numPages,
      )
    ) {
      throw new PdfToolError(
        "invalid-pdf",
        "One or more selected page numbers are invalid.",
      );
    }

    const results: PngPageResult[] = [];
    const base = file.name.replace(/\.pdf$/i, "") || "document";
    const requestedScale = Math.max(0.5, Math.min(options.scale ?? 2, 4));

    for (let index = 0; index < selectedPages.length; index++) {
      throwIfAborted(options.signal);

      const pageNumber = selectedPages[index];
      const page = await pdf.getPage(pageNumber);
      const initialViewport = page.getViewport({ scale: 1 });

      const scale = clampScale(
        initialViewport.width,
        initialViewport.height,
        requestedScale,
      );

      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      const context = canvas.getContext("2d");

      if (!context) {
        throw new PdfToolError(
          "conversion-failed",
          "Your browser could not create a canvas.",
        );
      }

      try {
        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
        throwIfAborted(options.signal);

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (result) => {
              if (result) resolve(result);
              else reject(new Error("PNG image creation failed."));
            },
            "image/png",
          );
        });

        results.push({
          blob,
          fileName: pageFileName(base, pageNumber, pdf.numPages, "png"),
          pageNumber,
        });
      } finally {
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }

      options.onProgress?.(
        Math.round(((index + 1) / selectedPages.length) * 100),
      );

      await yieldToBrowser();
    }

    return {
      files: results,
      totalPages: pdf.numPages,
    };
  } catch (error) {
    if (
      error instanceof PdfToolError ||
      (error instanceof Error && error.name === "AbortError")
    ) {
      throw error;
    }

    throw new PdfToolError(
      "conversion-failed",
      "Could not convert this PDF to PNG. Please check the file and try again.",
    );
  } finally {
    await loadingTask.destroy();
  }
}
