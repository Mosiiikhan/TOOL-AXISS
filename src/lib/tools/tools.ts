import type { Tool } from "./types";

export const tools: Tool[] = [
  {
    slug: "image-compressor",
    title: "Image Compressor - Compress JPG, PNG, WebP Online Free",
    description:
      "Reduce image size without losing quality. Free, fast and private: your files never leave your browser.",
    category: "image",
    faqs: [
      {
        q: "Are my images uploaded to a server?",
        a: "No. Compression happens inside your browser, so your files stay on your device.",
      },
    ],
  },
  {
    slug: "image-converter",
    title: "Image Converter - Convert JPG, PNG, WebP Online Free",
    description:
      "Convert images between JPG, PNG and WebP in one click. No signup, no upload, works in your browser.",
    category: "image",
    faqs: [
      {
        q: "Which formats are supported?",
        a: "You can convert between JPG, PNG and WebP.",
      },
    ],
  },
  {
    slug: "image-resizer",
    title: "Image Resizer - Resize Images by Pixels or Percentage",
    description:
      "Resize any image to exact width and height or by percentage. Free and private, runs in your browser.",
    category: "image",
    faqs: [
      {
        q: "Can I keep the aspect ratio?",
        a: "Yes. Lock the aspect ratio and the height adjusts automatically.",
      },
    ],
  },
];

export const getToolBySlug = (slug: string) =>
  tools.find((t) => t.slug === slug);

export const getRelatedTools = (slug: string, limit = 3) =>
  tools.filter((t) => t.slug !== slug).slice(0, limit);

