import { SITE_NAME } from "@/lib/tools/constants";

export const TERMS_UPDATED = "October 29, 2026";

export const termsSections: { title: string; body: string[] }[] = [
  {
    title: "Using the site",
    body: [
      `By using ${SITE_NAME} you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    title: "What the tools do",
    body: [
      `${SITE_NAME} offers tools to compress, convert and resize images. The tools run inside your browser, so your files are processed on your own device and are not uploaded to our servers.`,
    ],
  },
  {
    title: "Your files",
    body: [
      "You are responsible for the files you use. Only use pictures that you own or have permission to use. We do not claim any rights to your files.",
    ],
  },
  {
    title: "No guarantee",
    body: [
      "The tools are provided as they are. Results can differ in quality and size, and we do not promise that a result will be accepted by any form, website or authority. Please check the requirements and the result yourself before you submit it.",
      "Sizes and limits mentioned on our pages, such as sizes for social media, are for guidance only. Platforms can change them at any time.",
    ],
  },
  {
    title: "Limits of your device",
    body: [
      "Because the work happens in your browser, very large pictures or older devices may fail or run slowly. If a picture does not work, try a smaller one or another browser.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Please do not misuse the site, try to disrupt it, or use it to break the law or the rights of others.",
    ],
  },
  {
    title: "Ads and other websites",
    body: [
      "The site may show ads from third parties or link to other websites. We are not responsible for the content or practices of those websites.",
    ],
  },
  {
    title: "Our responsibility",
    body: [
      "As far as the law allows, we are not responsible for any loss or damage that comes from using the site, including lost files or a rejected application.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date at the top shows when they were last changed. If you keep using the site after a change, you accept the new terms.",
    ],
  },
];