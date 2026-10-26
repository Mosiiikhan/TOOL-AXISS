export type ToolCategory = "image" | "pdf" | "text";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  faqs: ToolFAQ[];
}

export type ToolId = "image-compressor" | "image-converter" | "image-resizer";

// Tool ko page ke hisaab se pehle se set karne wali settings
export interface ToolPreset {
  targetKB?: number;
  outputFormat?: "jpg" | "png" | "webp";
  accept?: string;
  width?: number;
  height?: number;
  resizeMode?: "pixels" | "percent";
}

export interface SeoPage {
  slug: string;
  tool: ToolId;
  title: string;
  h1: string;
  description: string;
  intro: string;
  steps: string[];
  faqs: ToolFAQ[];
  preset: ToolPreset;
  related: string[];
  published: boolean;
}

// Har tool (workspace) ko page se preset milta hai
export interface WorkspaceProps {
  preset?: ToolPreset;
}