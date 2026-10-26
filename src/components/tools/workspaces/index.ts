import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { WorkspaceProps } from "@/lib/tools/types";

export const toolWorkspaces: Record<string, ComponentType<WorkspaceProps>> = {
  "image-compressor": dynamic(() => import("./ImageCompressor")),
  "image-converter": dynamic(() => import("./ImageConverter")),
  "image-resizer": dynamic(() => import("./ImageResizer")),
};