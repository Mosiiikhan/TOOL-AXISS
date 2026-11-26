import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { WorkspaceProps } from "@/lib/tools/types";

export const toolWorkspaces: Record<string, ComponentType<WorkspaceProps>> = {
  "image-compressor": dynamic(() => import("./ImageCompressor")),
  "image-converter": dynamic(() => import("./ImageConverter")),
  "image-resizer": dynamic(() => import("./ImageResizer")),
  "image-video-metadata-viewer": dynamic(() => import("./MetadataViewer")),
  "metadata-remover": dynamic(() => import("./MetadataRemover")),
  "image-to-pdf": dynamic(() => import("./ImageToPdf")),
  "pdf-to-jpg": dynamic(() => import("./PdfToJpg")),
  "pdf-to-png": dynamic(() => import("./PdfToPng")),
};