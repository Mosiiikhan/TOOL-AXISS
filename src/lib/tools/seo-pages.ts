import type { SeoPage } from "./types";

export const seoPages: SeoPage[] = [
  // ---------- COMPRESS ----------
  {
    slug: "compress-image-to-20kb",
    tool: "image-compressor",
    title: "Compress Image to 20KB Online Free",
    h1: "Compress Image to 20KB",
    description:
      "Reduce a photo or signature to under 20KB right in your browser. Free, private and no signup needed.",
    intro:
      "A 20KB limit is very tight. It is common for signature and small photo fields on application forms. A normal phone photo is far bigger than that, so this tool lowers the quality first and, if that is not enough, also makes the picture a little smaller in pixels. Your image never leaves your device.",
    steps: [
      "Add your signature or photo.",
      "Leave the limit on 20 KB.",
      "Check the preview. Small signatures stay clear, big photos get softer.",
      "Press Download and upload the file to your form.",
    ],
    faqs: [
      {
        q: "Why did my picture become smaller in pixels?",
        a: "At 20KB quality alone cannot shrink a large photo enough, so the tool also reduces its width and height until it fits.",
      },
      {
        q: "Will a full face photo look good at 20KB?",
        a: "It will be small and a bit soft. If your form allows more, try 50KB for a clearer result.",
      },
    ],
    preset: { targetKB: 20 },
    related: [
      "compress-image-to-50kb",
      "compress-image-to-100kb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-50kb",
    tool: "image-compressor",
    title: "Compress Image to 50KB Online - Free and Private",
    h1: "Compress Image to 50KB",
    description:
      "Get your photo under 50KB without a signup. Works in your browser, so your picture is never uploaded.",
    intro:
      "50KB is a popular limit for ID, passport style and profile photos on application portals. It is small enough to upload quickly but big enough to keep a face clear when the photo is shown at a small size. This tool finds the sharpest version that still fits.",
    steps: [
      "Add your photo.",
      "Keep the limit on 50 KB.",
      "Look at the preview and the new size.",
      "Press Download and attach the file to your application.",
    ],
    faqs: [
      {
        q: "Is 50KB enough for a clear face photo?",
        a: "Usually yes when the photo is shown small on a form. It is not meant for printing or large displays.",
      },
      {
        q: "What if my file is already under 50KB?",
        a: "Then it is left as it is. The tool only changes files that are over the limit.",
      },
    ],
    preset: { targetKB: 50 },
    related: [
      "compress-image-to-20kb",
      "compress-image-to-100kb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-100kb",
    tool: "image-compressor",
    title: "Compress Image to 100KB Online Free",
    h1: "Compress Image to 100KB",
    description:
      "Shrink any JPG, PNG or WebP photo to under 100KB in your browser. Free, private and no signup needed.",
    intro:
      "Many job portals, government forms and school websites reject uploads over 100KB. This page squeezes your photo under that limit while keeping it sharp enough to read. Everything happens on your device, so your photo is never uploaded anywhere.",
    steps: [
      "Add your photo with the upload box.",
      "Wait a moment while the tool finds the best quality that fits under 100KB.",
      "Check the preview and the new file size.",
      "Press Download and upload the file to your form.",
    ],
    faqs: [
      {
        q: "Why does my photo look slightly softer?",
        a: "To reach 100KB the tool lowers the quality a little. Photos with lots of detail lose a bit more than simple ones.",
      },
      {
        q: "Will it work for PNG screenshots?",
        a: "Yes, but WebP or JPG shrink much more than PNG. Choose one of those formats for the smallest result.",
      },
    ],
    preset: { targetKB: 100 },
    related: [
      "compress-image-to-50kb",
      "compress-image-to-200kb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-200kb",
    tool: "image-compressor",
    title: "Compress Image to 200KB Online - Keep It Sharp",
    h1: "Compress Image to 200KB",
    description:
      "Shrink a photo to 200KB while keeping it sharp. Free, fast and private, right in your browser.",
    intro:
      "200KB leaves room for good quality, so most photos only need a small quality drop to fit. It suits profile pictures, resume uploads and website images where you want a light file that still looks clean on a normal screen.",
    steps: [
      "Add your image.",
      "Keep the limit on 200 KB.",
      "Compare the new size with the original.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Will I notice a quality drop at 200KB?",
        a: "For most photos the difference is very small. Detailed pictures lose a bit more than simple ones.",
      },
      {
        q: "Can I use this for website images?",
        a: "Yes. Smaller images help pages load faster. For the smallest file, save as WebP.",
      },
    ],
    preset: { targetKB: 200 },
    related: [
      "compress-image-to-100kb",
      "compress-image-to-kb",
      "compress-jpg",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-kb",
    tool: "image-compressor",
    title: "Compress Image to Any Size in KB - Free Online Tool",
    h1: "Compress Image to Any KB",
    description:
      "Type the size your form asks for and shrink your image to fit. Free, private and works in your browser.",
    intro:
      "Every form asks for a different limit. Type the size you need, anywhere from 5 KB to 5000 KB, and the tool shrinks your image to fit. It counts 1 KB as 1000 bytes, so your file stays under the limit however the website counts. Your image never leaves your device.",
    steps: [
      "Add your image.",
      "Type the size limit your form asks for, or tap one of the quick buttons.",
      "Check that the green message says the file is under your limit.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Is 1 MB the same as 1000 KB?",
        a: "Some websites count 1 MB as 1000 KB and some as 1024 KB. Because this tool uses 1000, your file fits either way.",
      },
      {
        q: "What if my limit is in MB?",
        a: "Multiply by 1000. For a 2 MB limit, type 2000 in the box.",
      },
    ],
    preset: { targetKB: 150 },
    related: [
      "compress-image-to-50kb",
      "compress-image-to-100kb",
      "compress-image-to-200kb",
    ],
    published: true,
  },
  {
    slug: "compress-jpg",
    tool: "image-compressor",
    title: "Compress JPG Online - Reduce JPG Size Free",
    h1: "Compress JPG Images",
    description:
      "Make JPG files smaller with a simple quality slider. Free, private and nothing is uploaded.",
    intro:
      "JPG files shrink well because a small quality drop is hard to see but saves a lot of space. Use the presets for a quick result, or the slider to find your own balance between a small file and a sharp picture. Your JPG comes back as a JPG.",
    steps: [
      "Add one or more JPG images.",
      "Pick Smallest file, Balanced or Best quality, or move the slider.",
      "Watch the size bar to see how much you saved.",
      "Press Download, or Download all for several images.",
    ],
    faqs: [
      {
        q: "What quality should I choose?",
        a: "Balanced is a good start. Go lower for the smallest file, higher if you plan to print.",
      },
      {
        q: "Can I compress many JPGs at once?",
        a: "Yes. Add several files and download them all together.",
      },
    ],
    preset: { outputFormat: "jpg" },
    related: ["compress-image-to-100kb", "compress-image-to-kb", "png-to-jpg"],
    published: true,
  },
  {
    slug: "compress-png",
    tool: "image-compressor",
    title: "Compress PNG Online - Make PNG Files Smaller",
    h1: "Compress PNG Images",
    description:
      "Shrink big PNG files and keep transparency. Free, private and nothing is uploaded.",
    intro:
      "PNG files do not lose quality, so they are often very large and a quality slider cannot shrink them much. The best way to make a PNG small is to save it as WebP, which keeps transparent backgrounds and is usually far smaller. This page does that for you in your browser. If a form only accepts PNG, check the size first, because the PNG itself will stay large.",
    steps: [
      "Add your PNG image.",
      "Leave Save as on WebP for the smallest file. It keeps transparency.",
      "Check the new size and the preview.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "Does it keep the transparent background?",
        a: "Yes, with WebP and PNG. JPG cannot be transparent, so those areas turn white.",
      },
      {
        q: "Why does the quality slider not shrink my PNG?",
        a: "PNG saves every pixel exactly, so quality settings do not apply. Saving as WebP or JPG is what makes the file smaller.",
      },
    ],
    preset: { accept: "image/png" },
    related: ["png-to-jpg", "webp-to-png", "compress-image-to-kb"],
    published: true,
  },
  {
    slug: "compress-image-for-whatsapp",
    tool: "image-compressor",
    title: "Compress Image for WhatsApp - Send Photos Faster",
    h1: "Compress Image for WhatsApp",
    description:
      "Make photos smaller before sending them on WhatsApp. Free and private, right in your browser.",
    intro:
      "Big photos take longer to send and use more mobile data. Shrink a photo here first and it uploads quickly, even on a slow connection. The picture comes back as a normal JPG that opens everywhere. Your photo is never uploaded to our servers.",
    steps: [
      "Add your photos. You can add several at once.",
      "Tap Balanced for a good mix of size and quality, or Smallest file for the fastest sending.",
      "Check the size bar to see how much you saved.",
      "Press Download image, then send it from your phone or computer.",
    ],
    faqs: [
      {
        q: "Will the picture look worse?",
        a: "A little at Smallest file, but very little at Balanced. Phone screens are small, so most people cannot tell.",
      },
      {
        q: "Can I shrink many photos at once?",
        a: "Yes. Add them together and press Download all.",
      },
    ],
    preset: { outputFormat: "jpg" },
    related: [
      "compress-jpg",
      "compress-image-for-email",
      "compress-image-to-200kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-for-email",
    tool: "image-compressor",
    title: "Compress Image for Email - Make Attachments Smaller",
    h1: "Compress Image for Email",
    description:
      "Shrink photos so they fit in an email attachment. Free, private and no signup, right in your browser.",
    intro:
      "Many email services limit how much you can attach, often around 20 to 25 MB in total, and several full-size phone photos can easily pass that. Shrink them here first so your email goes through and loads faster for the person who gets it. The files come back as ordinary JPGs, and nothing is uploaded.",
    steps: [
      "Add all the photos you want to send.",
      "Choose Balanced, or Smallest file if your email still bounces.",
      "Check the total size at the bottom.",
      "Press Download all and attach the new files to your email.",
    ],
    faqs: [
      {
        q: "How small should my photos be for email?",
        a: "Check the limit of your email service. If you are over it, pick Smallest file or set an exact size in the By file size tab.",
      },
      {
        q: "Will the person see a blurry photo?",
        a: "On a screen, Balanced looks almost the same as the original. If they plan to print it, send the original separately.",
      },
    ],
    preset: { outputFormat: "jpg" },
    related: [
      "compress-image-for-whatsapp",
      "compress-image-to-kb",
      "compress-jpg",
    ],
    published: true,
  },

  // ---------- CONVERT ----------
  {
    slug: "png-to-jpg",
    tool: "image-converter",
    title: "PNG to JPG Converter - Free and Instant",
    h1: "Convert PNG to JPG",
    description:
      "Turn PNG images into smaller JPG files in one click. Runs in your browser, no upload and no signup.",
    intro:
      "PNG files keep every pixel perfect, which makes them large. If you only need a normal photo or a file that is easy to email, JPG is usually much smaller. This page converts your PNG to JPG right in your browser.",
    steps: [
      "Add one or more PNG images.",
      "Leave the format on JPG and adjust the quality if you like.",
      "Check the new size next to the original.",
      "Press Download to save your JPG.",
    ],
    faqs: [
      {
        q: "What happens to transparent areas?",
        a: "JPG cannot be transparent, so those areas turn white.",
      },
      {
        q: "Can I convert many files at once?",
        a: "Yes. Add several PNG files and download them all together.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/png" },
    related: ["jpg-to-png", "webp-to-jpg", "compress-jpg"],
    published: true,
  },
  {
    slug: "jpg-to-png",
    tool: "image-converter",
    title: "JPG to PNG Converter - Free and Instant",
    h1: "Convert JPG to PNG",
    description:
      "Turn JPG photos into PNG files in one click. Free, private and works right in your browser.",
    intro:
      "Some programs, design tools and websites ask for PNG files. This page converts your JPG to PNG in your browser, so your photo is never uploaded. Keep in mind that PNG does not add back detail that JPG already lost, and the PNG file will usually be bigger.",
    steps: [
      "Add one or more JPG or JPEG images.",
      "Leave the format on PNG.",
      "Check the new size next to the original.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Will my picture look better as a PNG?",
        a: "No. The picture looks the same. PNG just saves it without losing any more detail.",
      },
      {
        q: "Why is my PNG bigger than the JPG?",
        a: "PNG keeps every pixel exactly, so photos take much more space. If size matters, choose WebP or keep the JPG.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/jpeg" },
    related: ["png-to-jpg", "jpg-to-webp", "compress-jpg"],
    published: true,
  },
  {
    slug: "webp-to-jpg",
    tool: "image-converter",
    title: "WebP to JPG Converter - Free Online",
    h1: "Convert WebP to JPG",
    description:
      "Change WebP images to JPG so they open anywhere. Free, private and no signup.",
    intro:
      "WebP images from websites are small, but many apps, forms and older programs cannot open them. JPG works almost everywhere. This page turns your WebP into a JPG in your browser, and nothing is uploaded.",
    steps: [
      "Add your WebP images.",
      "Leave the format on JPG and adjust the quality if you want.",
      "Check the preview and the new size.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "What happens to transparent parts of my WebP?",
        a: "JPG cannot be transparent, so those areas become white. Choose PNG if you need to keep transparency.",
      },
      {
        q: "Why did a website give me a WebP file?",
        a: "Websites often use WebP because it loads faster. When you save the image it can arrive as WebP.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/webp" },
    related: ["webp-to-png", "png-to-jpg", "compress-jpg"],
    published: true,
  },
  {
    slug: "webp-to-png",
    tool: "image-converter",
    title: "WebP to PNG Converter - Free Online Tool",
    h1: "Convert WebP to PNG",
    description:
      "Convert WebP images to PNG and keep transparency. Free, private and runs in your browser.",
    intro:
      "PNG is a safe choice when you want to edit an image or keep a transparent background. This page converts your WebP to PNG in your browser. Transparent areas stay transparent, and your file is never uploaded.",
    steps: [
      "Add your WebP images.",
      "Leave the format on PNG.",
      "Check the preview. Transparent areas show as a light checker pattern.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Is the transparent background kept?",
        a: "Yes. PNG supports transparency, so a see-through WebP stays see-through.",
      },
      {
        q: "Why is the PNG so much bigger?",
        a: "WebP squeezes files very well and PNG does not. A bigger file is normal.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/webp" },
    related: ["webp-to-jpg", "jpg-to-png", "png-to-jpg"],
    published: true,
  },
  {
    slug: "jpg-to-webp",
    tool: "image-converter",
    title: "JPG to WebP Converter - Make Images Smaller",
    h1: "Convert JPG to WebP",
    description:
      "Turn JPG photos into smaller WebP files for faster websites. Free and private, in your browser.",
    intro:
      "WebP files are usually smaller than JPG at the same quality, which helps a website load faster. This page converts your JPG to WebP in your browser, and your photos are never uploaded. Modern browsers show WebP, but some older programs cannot open it.",
    steps: [
      "Add your JPG or JPEG images.",
      "Leave the format on WebP and set the quality.",
      "Compare the new size with the original.",
      "Press Download WebP.",
    ],
    faqs: [
      {
        q: "Will my website visitors see WebP images?",
        a: "Yes, all current browsers support WebP.",
      },
      {
        q: "Can I upload WebP to every form?",
        a: "Not always. Some forms only accept JPG or PNG. If a form refuses the file, convert it back to JPG.",
      },
    ],
    preset: { outputFormat: "webp", accept: "image/jpeg" },
    related: ["jpg-to-png", "webp-to-jpg", "compress-jpg"],
    published: true,
  },

  // ---------- RESIZE ----------
  {
    slug: "resize-image-in-pixels",
    tool: "image-resizer",
    title: "Resize Image in Pixels - Set Exact Width and Height",
    h1: "Resize Image in Pixels",
    description:
      "Type the exact width and height you need and resize your image in seconds. Free and private, right in your browser.",
    intro:
      "Many forms, websites and apps ask for an image of an exact size, such as 600 by 800 pixels. Type the width and height you need and this tool resizes your picture to match. If the shape of your picture is different from the size you typed, you choose whether to crop the edges or stretch it. Nothing is uploaded, because everything happens on your device.",
    steps: [
      "Add your image. Its current size shows in pixels.",
      "Type the width and height you need. Turn the lock on if you want the picture to keep its shape.",
      "If the shape is different, choose Crop to fit or Stretch.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "What does keeping proportions mean?",
        a: "When the lock is on, changing the width also changes the height by the right amount, so the picture is never squeezed or stretched.",
      },
      {
        q: "Why does my picture look blurry after making it bigger?",
        a: "A small picture has only so many pixels. Making it bigger spreads those pixels out, so it cannot get sharper than the original.",
      },
    ],
    preset: {},
    related: [
      "resize-image-by-percentage",
      "resize-image-for-instagram",
      "compress-image-to-100kb",
    ],
    published: true,
  },
  {
    slug: "resize-image-by-percentage",
    tool: "image-resizer",
    title: "Resize Image by Percentage - Make It Smaller or Bigger",
    h1: "Resize Image by Percentage",
    description:
      "Make an image 50% smaller or 150% bigger with one slider. Free, private and works in your browser.",
    intro:
      "You do not always know the exact size you need. Sometimes you just want a picture half as big, or a bit smaller to send by email. Move the slider and this tool works out the new width and height for you, and keeps the shape of your picture the same. Your image never leaves your device.",
    steps: [
      "Add your image.",
      "Drag the slider or tap 25%, 50%, 75% or 150%.",
      "Read the new size under the slider.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "Will 50% make the file half the size?",
        a: "The width and height become half. Because the picture has a quarter of the pixels, the file is often much smaller than half.",
      },
      {
        q: "Can I make a picture bigger than 100%?",
        a: "Yes, up to 200%. Bigger pictures can look soft, because no new detail is added.",
      },
    ],
    preset: { resizeMode: "percent" },
    related: ["resize-image-in-pixels", "compress-image-to-kb", "compress-jpg"],
    published: true,
  },
  {
    slug: "resize-image-for-instagram",
    tool: "image-resizer",
    title: "Resize Image for Instagram - Free Online Tool",
    h1: "Resize Image for Instagram",
    description:
      "Resize your photo to Instagram's square post size without leaving your browser. Free and private.",
    intro:
      "Instagram works best with images prepared at the right size. This page sets your photo to 1080 by 1080 pixels, the standard square post, so it looks crisp. If your photo is not square, the tool asks whether to crop the edges or stretch it, so you decide how it looks.",
    steps: [
      "Add your photo.",
      "Keep the size at 1080 by 1080 pixels, or change it.",
      "If your photo is not square, choose Crop to fit or Stretch.",
      "Check the preview, press Download image and post it.",
    ],
    faqs: [
      {
        q: "Will my photo be cropped?",
        a: "Only if you choose Crop to fit. That fills the whole square and cuts the edges. Stretch keeps everything but can squeeze the picture.",
      },
      {
        q: "Is 1080 by 1080 the only size Instagram accepts?",
        a: "No, it is the standard square. You can type another width and height in the size boxes.",
      },
    ],
    preset: { width: 1080, height: 1080 },
    related: [
      "resize-image-in-pixels",
      "resize-image-for-youtube-thumbnail",
      "compress-image-to-100kb",
    ],
    published: true,
  },
  {
    slug: "resize-image-for-youtube-thumbnail",
    tool: "image-resizer",
    title: "Resize Image for YouTube Thumbnail - 3840 x 2160",
    h1: "Resize Image for YouTube Thumbnail",
    description:
      "Set your picture to the 16:9 size YouTube recommends for thumbnails. Free and private, in your browser.",
    intro:
      "YouTube's help page recommends custom thumbnails of 3840 by 2160 pixels for videos, in a 16:9 shape, with a minimum width of 640 pixels. Many older guides still say 1280 by 720, which is also 16:9 and above the minimum width. This page sets your picture to 3840 by 2160 and crops the edges so it fills the frame. Always check YouTube Help for the latest rules.",
    steps: [
      "Add your picture.",
      "Keep the size at 3840 by 2160 pixels, or tap HD for 1280 by 720.",
      "If your picture is not 16:9, choose Crop to fit so it fills the whole thumbnail.",
      "Save as JPG for a smaller file, then press Download image and upload it in YouTube Studio.",
    ],
    faqs: [
      {
        q: "Should I use 1280 by 720 or 3840 by 2160?",
        a: "YouTube's help page currently recommends 3840 by 2160. A 1280 by 720 picture is still 16:9 and above the 640 pixel minimum width, so it still works.",
      },
      {
        q: "What file types can I use?",
        a: "YouTube's help page names JPG and PNG. JPG usually makes a smaller file.",
      },
      {
        q: "Is there a file size limit?",
        a: "YouTube's help page lists 2 MB when you upload from mobile and 50 MB from a computer. If your file is too big, shrink it with our compress tool.",
      },
    ],
    preset: { width: 3840, height: 2160 },
    related: [
      "resize-image-for-instagram",
      "resize-image-in-pixels",
      "compress-image-to-200kb",
    ],
    published: true,
  },
];

export const getSeoPage = (slug: string) =>
  seoPages.find((p) => p.slug === slug && p.published);

export const publishedSeoPages = () => seoPages.filter((p) => p.published);