
import { PDFDocument, PageSizes } from "pdf-lib";
import { validateImageFiles } from "../shared/validation";
import { PdfToolError } from "../shared/types";
import { throwIfAborted, yieldToBrowser } from "../shared/utils";

export type PdfPageSize = "a4" | "letter" | "fit";
export type PdfOrientation = "portrait" | "landscape";

export interface ImageToPdfOptions {
  pageSize?: PdfPageSize;
  orientation?: PdfOrientation;
  margin?: number;
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
}

export interface ImageToPdfResult {
  blob: Blob;
  fileName: string;
  pageCount: number;
}

function getPageDimensions(
  size: PdfPageSize,
  orientation: PdfOrientation,
  imageWidth: number,
  imageHeight: number,
): [number, number] {
  if (size === "fit") {
    return [imageWidth, imageHeight];
  }

  const dimensions = size === "letter" ? PageSizes.Letter : PageSizes.A4;

  const isPortrait = orientation === "portrait";

  return isPortrait
    ? [Math.min(...dimensions), Math.max(...dimensions)]
    : [Math.max(...dimensions), Math.min(...dimensions)];
}

async function imageToBytes(file: File): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function convertImagesToPdf(
  files: File[],
  options: ImageToPdfOptions = {},
): Promise<ImageToPdfResult> {
  if (!files.length) {
    throw new PdfToolError("empty", "Please select at least one image.");
  }

  const validation = await validateImageFiles(files);

  if (validation.rejected.length > 0) {
    throw new PdfToolError(
      "invalid-type",
      validation.rejected.map((item) => `${item.name}: ${item.reason}`).join("\n"),
    );
  }

  const images = validation.accepted;

  if (!images.length) {
    throw new PdfToolError("invalid-type", "No valid images were selected.");
  }

  const pdf = await PDFDocument.create();

  const margin = Math.max(0, Math.min(options.margin ?? 24, 100));

  for (let index = 0; index < images.length; index++) {
    throwIfAborted(options.signal);

    const file = images[index];
    const bytes = await imageToBytes(file);
    const kind = validation.kinds.get(file);

    let embeddedImage;

    try {
      if (kind === "jpeg") {
        embeddedImage = await pdf.embedJpg(bytes);
      } else if (kind === "png") {
        embeddedImage = await pdf.embedPng(bytes);
      } else if (kind === "webp") {
        const bitmap = await createImageBitmap(file);

        try {
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;

          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas is not supported.");
          }

          context.drawImage(bitmap, 0, 0);

          const pngBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Could not convert WebP image."));
            }, "image/png");
          });

          embeddedImage = await pdf.embedPng(
            new Uint8Array(await pngBlob.arrayBuffer()),
          );
        } finally {
          bitmap.close();
        }
      } else {
        throw new Error("Unsupported image format.");
      }

      const [pageWidth, pageHeight] = getPageDimensions(
        options.pageSize ?? "a4",
        options.orientation ?? "portrait",
        embeddedImage.width,
        embeddedImage.height,
      );

      const page = pdf.addPage([pageWidth, pageHeight]);

      const availableWidth = Math.max(1, pageWidth - margin * 2);
      const availableHeight = Math.max(1, pageHeight - margin * 2);

      const scale = Math.min(
        availableWidth / embeddedImage.width,
        availableHeight / embeddedImage.height,
      );

      const width = embeddedImage.width * scale;
      const height = embeddedImage.height * scale;

      page.drawImage(embeddedImage, {
        x: (pageWidth - width) / 2,
        y: (pageHeight - height) / 2,
        width,
        height,
      });
    } catch (error) {
      if (error instanceof PdfToolError) throw error;

      throw new PdfToolError(
        "conversion-failed",
        `Could not process ${file.name}. Please try another image.`,
      );
    }

    options.onProgress?.(Math.round(((index + 1) / images.length) * 100));

    await yieldToBrowser();
  }

  throwIfAborted(options.signal);

  const pdfBytes = await pdf.save();
  const pdfArrayBuffer = new ArrayBuffer(pdfBytes.byteLength);
new Uint8Array(pdfArrayBuffer).set(pdfBytes);

const blob = new Blob([pdfArrayBuffer], {
  type: "application/pdf",
});

  return {
    blob,
    fileName: "toolaxiis-images.pdf",
    pageCount: images.length,
  };
}
