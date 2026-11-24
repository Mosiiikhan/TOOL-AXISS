import type { SeoPage } from "../tools/types";

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

  // ---------- COMPRESS: MORE SIZES (wave 2: set published to true after 1-2 weeks) ----------
  {
    slug: "compress-image-to-10kb",
    tool: "image-compressor",
    title: "Compress Image to 10KB Online - Free and Private",
    h1: "Compress Image to 10KB",
    description:
      "Shrink a small photo or signature to under 10KB in your browser. Free, private and no signup needed.",
    intro:
      "10KB is a very small limit, mostly for signatures and tiny passport-style pictures on forms. To reach it, the tool lowers the quality and, if needed, also makes the picture smaller in pixels. Details will be soft, so it works best for simple pictures like signatures. Your image never leaves your device.",
    steps: [
      "Add your signature or small picture.",
      "Leave the limit on 10 KB.",
      "Check the preview. If it is too soft, ask if your form allows 20 KB.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Will a photo of a face look clear at 10KB?",
        a: "It will be small and quite soft. If your form allows more, try 20KB or 50KB.",
      },
      {
        q: "Why did my picture become smaller in pixels?",
        a: "Quality alone cannot shrink a large picture this much, so the tool also reduces its width and height until it fits.",
      },
    ],
    preset: { targetKB: 10 },
    related: [
      "compress-image-to-20kb",
      "compress-image-to-50kb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-30kb",
    tool: "image-compressor",
    title: "Compress Image to 30KB Online - Free Tool",
    h1: "Compress Image to 30KB",
    description:
      "Get your photo or signature under 30KB without signing up. Works in your browser and nothing is uploaded.",
    intro:
      "30KB sits between the tight 20KB limit and the common 50KB limit. It is enough to keep a signature clear and a small face photo readable. This tool finds the sharpest version that still fits, and your image never leaves your device.",
    steps: [
      "Add your photo or signature.",
      "Keep the limit on 30 KB.",
      "Look at the preview and the new size.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Is 30KB enough for a photo?",
        a: "For a small photo on a form, usually yes. For printing or big screens it is too small.",
      },
      {
        q: "What if my picture is already under 30KB?",
        a: "Then it is left as it is. The tool only changes files that are over the limit.",
      },
    ],
    preset: { targetKB: 30 },
    related: [
      "compress-image-to-20kb",
      "compress-image-to-50kb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-500kb",
    tool: "image-compressor",
    title: "Compress Image to 500KB Online - Keep Good Quality",
    h1: "Compress Image to 500KB",
    description:
      "Shrink a big photo to under 500KB while keeping it clear. Free, private and works in your browser.",
    intro:
      "500KB is roomy enough to keep most photos sharp. Phone photos are often several MB, so a small quality drop is usually all that is needed. It suits uploads that have a half-megabyte limit, and website pictures that should load fast. Your photo never leaves your device.",
    steps: [
      "Add your photo.",
      "Keep the limit on 500 KB.",
      "Compare the new size with the original.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Will I see a quality drop at 500KB?",
        a: "For most photos the difference is small. Very detailed pictures lose a little more.",
      },
      {
        q: "Can I use this for website images?",
        a: "Yes. Smaller images help pages load faster. For the smallest file, save as WebP.",
      },
    ],
    preset: { targetKB: 500 },
    related: [
      "compress-image-to-200kb",
      "compress-image-to-1mb",
      "compress-image-to-kb",
    ],
    published: true,
  },
  {
    slug: "compress-image-to-1mb",
    tool: "image-compressor",
    title: "Compress Image to 1MB Online - Free and Private",
    h1: "Compress Image to 1MB",
    description:
      "Reduce a large photo to under 1MB in your browser. Free, private and no signup needed.",
    intro:
      "Some forms and portals ask for pictures under 1 MB, and a modern phone photo can be several MB. This tool lowers the quality just enough to get under the limit and keeps the picture looking good. It counts 1 MB as 1000 KB, so the file fits however the website counts. Your photo never leaves your device.",
    steps: [
      "Add your photo.",
      "Keep the limit on 1 MB.",
      "Compare the new size with the original.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Is 1 MB the same as 1000 KB?",
        a: "Some websites count 1 MB as 1000 KB and some as 1024 KB. This tool uses 1000, so your file fits either way.",
      },
      {
        q: "Will my photo look different?",
        a: "At 1 MB most photos look almost the same. Photos that are already under 1 MB are left unchanged.",
      },
    ],
    preset: { targetKB: 1000 },
    related: [
      "compress-image-to-500kb",
      "compress-image-to-200kb",
      "compress-image-to-kb",
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
  {
    slug: "jfif-to-jpg",
    tool: "image-converter",
    title: "JFIF to JPG Converter (JFIF to JPEG) - Free and Instant",
    h1: "Convert JFIF to JPG or JPEG",
    description:
      "Turn a .jfif file into a normal .jpg in seconds. Free, private and no signup, right in your browser.",
    intro:
      "A .jfif file is a JPEG picture with a different file ending, and many programs, forms and websites refuse it for that reason alone. This page gives you the same picture as a .jpg (JPEG) that opens almost everywhere. Because a JFIF file is already a JPEG, the picture itself is not compressed again, so nothing is lost. JPG and JPEG are the same format; only the file ending differs. Your file never leaves your device.",
    steps: [
      "Add your .jfif file.",
      "JPG is already chosen. Check the preview and the JFIF to JPG label.",
      "Look at the new file name, which ends in .jpg.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "What is a JFIF file?",
        a: "JFIF stands for JPEG File Interchange Format. It is a JPEG picture saved with the .jfif ending. Some computers and browsers save downloaded pictures this way.",
      },
      {
        q: "Will I lose quality?",
        a: "No. The picture is already a JPEG, so the tool keeps it exactly as it is and only changes the file name.",
      },
      {
        q: "Why does a website not accept my .jfif file?",
        a: "Some forms only look at the file ending. A .jpg ending is the one most sites expect, so converting the name usually solves it.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/jpeg,.jfif" },
    related: ["jfif-to-png", "jfif-to-webp", "compress-jpg"],
    published: true,
  },
  {
    slug: "jfif-to-png",
    tool: "image-converter",
    title: "JFIF to PNG Converter - Free Online Tool",
    h1: "Convert JFIF to PNG",
    description:
      "Change .jfif pictures to PNG for editors and apps that will not open them. Free and private, in your browser.",
    intro:
      "Some design programs, editing apps and websites will not open a .jfif file but work fine with PNG. This page converts your JFIF picture to PNG in your browser. PNG saves every pixel without losing more detail, but it cannot bring back detail that JPEG already lost, and the file will usually be bigger. Nothing is uploaded.",
    steps: [
      "Add one or more .jfif files.",
      "Leave the format on PNG.",
      "Check the new size next to the original.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "My editor does not open .jfif. Is PNG the best choice?",
        a: "PNG works in almost every editor. If you only need the file to open and want a small size, converting to JPG is lighter.",
      },
      {
        q: "Will PNG make my picture sharper?",
        a: "No. The picture looks the same. PNG only stops it from losing more detail when you save it again.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/jpeg,.jfif" },
    related: ["jfif-to-jpg", "jfif-to-webp", "jpg-to-png"],
    published: true,
  },
  {
    slug: "jfif-to-webp",
    tool: "image-converter",
    title: "JFIF to WebP Converter - Make Images Smaller",
    h1: "Convert JFIF to WebP",
    description:
      "Turn .jfif pictures into smaller WebP files for websites. Free and private, in your browser.",
    intro:
      "If you want to put a .jfif picture on a website, WebP is usually a lighter choice, and the page loads faster. This page converts your JFIF to WebP in your browser. Modern browsers show WebP, but some older programs and some forms do not accept it, so keep your original file too.",
    steps: [
      "Add your .jfif files.",
      "Leave the format on WebP and set the quality.",
      "Compare the new size with the original.",
      "Press Download WebP.",
    ],
    faqs: [
      {
        q: "Is the WebP smaller than my .jfif?",
        a: "Usually yes at a similar look, but not always. The tool shows the new size next to the original so you can check.",
      },
      {
        q: "Will WebP open everywhere?",
        a: "All current browsers show WebP, but some older programs and forms do not accept it. If a form refuses the file, use JPG instead.",
      },
    ],
    preset: { outputFormat: "webp", accept: "image/jpeg,.jfif" },
    related: ["jfif-to-jpg", "jfif-to-png", "jpg-to-webp"],
    published: true,
  },

  // ---------- CONVERT: MORE FORMATS (wave 1) ----------
  {
    slug: "png-to-webp",
    tool: "image-converter",
    title: "PNG to WebP Converter - Smaller Images, Keep Transparency",
    h1: "Convert PNG to WebP",
    description:
      "Turn PNG images into much smaller WebP files and keep transparent backgrounds. Free and private, in your browser.",
    intro:
      "PNG files can be very large, especially screenshots and logos. WebP can save the same picture in a lot less space and still keeps transparent areas. This page converts your PNG to WebP in your browser, so your image is never uploaded. Modern browsers show WebP, but some older programs and forms do not accept it, so keep your original PNG too.",
    steps: [
      "Add your PNG images.",
      "Leave the format on WebP and set the quality.",
      "Compare the new size with the original.",
      "Press Download WebP.",
    ],
    faqs: [
      {
        q: "Does WebP keep the transparent background of my PNG?",
        a: "Yes. WebP supports transparency, so see-through areas stay see-through.",
      },
      {
        q: "How much smaller will the file be?",
        a: "It depends on the picture. The tool shows the new size next to the original so you can see the saving for your own file.",
      },
      {
        q: "Will a form accept a WebP file?",
        a: "Not always. If a form refuses WebP, convert to JPG instead, or keep the PNG.",
      },
    ],
    preset: { outputFormat: "webp", accept: "image/png" },
    related: ["compress-png", "webp-to-png", "png-to-jpg"],
    published: true,
  },
  {
    slug: "avif-to-jpg",
    tool: "image-converter",
    title: "AVIF to JPG Converter (AVIF to JPEG) - Free Online",
    h1: "Convert AVIF to JPG or JPEG",
    description:
      "Change AVIF images to JPG so they open in any app or form. Free, private and no signup.",
    intro:
      "AVIF is a modern image format that some websites and tools save pictures in, but many apps, forms and older programs cannot open it. JPG (JPEG) works almost everywhere. This page converts your AVIF to JPG in your browser, and nothing is uploaded. JPG and JPEG are the same format; only the file ending differs. If your browser is too old to open AVIF, the tool will tell you it could not convert the file.",
    steps: [
      "Add your .avif images.",
      "JPG is already chosen. Adjust the quality if you like.",
      "Check the preview and the new size.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "What is an AVIF file?",
        a: "AVIF is an image format designed to keep pictures small. Some websites serve images in AVIF, so a saved picture can arrive with that ending.",
      },
      {
        q: "What happens to transparent areas?",
        a: "JPG cannot be transparent, so those areas turn white. Choose PNG if you need to keep transparency.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/avif,.avif" },
    related: ["avif-to-png", "webp-to-jpg", "png-to-jpg"],
    published: true,
  },
  {
    slug: "avif-to-png",
    tool: "image-converter",
    title: "AVIF to PNG Converter - Free Online Tool",
    h1: "Convert AVIF to PNG",
    description:
      "Convert AVIF images to PNG for editors and apps that do not open them. Free and private, in your browser.",
    intro:
      "If an editor, design program or website will not open your AVIF image, PNG is a safe choice because almost everything supports it. This page converts your AVIF to PNG in your browser, and your image is never uploaded. Transparent areas stay transparent. The PNG file is usually much bigger than the AVIF, which is normal.",
    steps: [
      "Add your .avif images.",
      "Leave the format on PNG.",
      "Check the new size. A bigger file is normal for PNG.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Is the transparent background kept?",
        a: "Yes. PNG supports transparency, so a see-through AVIF stays see-through.",
      },
      {
        q: "Why is the PNG so much bigger?",
        a: "AVIF is built to keep files small and PNG is not. A bigger PNG is normal.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/avif,.avif" },
    related: ["avif-to-jpg", "webp-to-png", "jpg-to-png"],
    published: true,
  },
  {
    slug: "gif-to-png",
    tool: "image-converter",
    title: "GIF to PNG Converter - Free Online Tool",
    h1: "Convert GIF to PNG",
    description:
      "Turn a GIF image into a PNG picture. Free, private and no signup, right in your browser.",
    intro:
      "Need a still picture from a GIF? This page converts your GIF to PNG in your browser, and nothing is uploaded. PNG is a still image format, so an animated GIF will not stay animated. You get one picture, not a moving image. For a plain, non-animated GIF the result looks the same as the original.",
    steps: [
      "Add your .gif file.",
      "Leave the format on PNG.",
      "Check the preview. It is a single still picture.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Will my animated GIF still move as a PNG?",
        a: "No. PNG is a still image format, so you get a single picture instead of an animation.",
      },
      {
        q: "Does it keep transparent areas?",
        a: "Yes, PNG supports transparency.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/gif,.gif" },
    related: ["gif-to-jpg", "png-to-jpg", "jpg-to-png"],
    published: true,
  },
  {
    slug: "gif-to-jpg",
    tool: "image-converter",
    title: "GIF to JPG Converter (GIF to JPEG) - Free Online",
    h1: "Convert GIF to JPG or JPEG",
    description:
      "Change a GIF image to a JPG picture for forms and apps that need JPG. Free and private, in your browser.",
    intro:
      "Some forms and apps only accept JPG (JPEG) pictures. This page converts your GIF to JPG in your browser, and your file is never uploaded. JPG is a still image format, so an animated GIF will not stay animated, and you get one picture. JPG cannot be transparent, so see-through areas turn white. JPG and JPEG are the same format; only the file ending differs.",
    steps: [
      "Add your .gif file.",
      "JPG is already chosen. Adjust the quality if you like.",
      "Check the preview. It is a single still picture.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "Will my animated GIF still move as a JPG?",
        a: "No. JPG is a still image format, so you get a single picture instead of an animation.",
      },
      {
        q: "What happens to transparent areas?",
        a: "JPG cannot be transparent, so those areas turn white.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/gif,.gif" },
    related: ["gif-to-png", "png-to-jpg", "webp-to-jpg"],
    published: true,
  },
  {
    slug: "bmp-to-jpg",
    tool: "image-converter",
    title: "BMP to JPG Converter (BMP to JPEG) - Make Files Smaller",
    h1: "Convert BMP to JPG or JPEG",
    description:
      "Turn big BMP images into much smaller JPG files. Free, private and works right in your browser.",
    intro:
      "BMP files are often very large because they store a picture with almost no compression. JPG (JPEG) usually makes the same picture many times smaller, so it is easier to email, upload or store. This page converts your BMP to JPG in your browser, and nothing is uploaded. JPG and JPEG are the same format; only the file ending differs.",
    steps: [
      "Add your .bmp images.",
      "JPG is already chosen. Adjust the quality if you like.",
      "Compare the new size with the original.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "Why is my BMP file so big?",
        a: "BMP stores pictures with almost no compression, so files take a lot of space. Converting to JPG usually shrinks them a lot.",
      },
      {
        q: "Will I lose quality?",
        a: "JPG is a lossy format, so there is a small change. Move the quality slider up if you want it sharper.",
      },
    ],
    preset: { outputFormat: "jpg", accept: "image/bmp,.bmp" },
    related: ["bmp-to-png", "png-to-jpg", "compress-jpg"],
    published: true,
  },

  // ---------- CONVERT: MORE FORMATS (wave 2: set published to true after 1-2 weeks) ----------
  {
    slug: "bmp-to-png",
    tool: "image-converter",
    title: "BMP to PNG Converter - Free Online Tool",
    h1: "Convert BMP to PNG",
    description:
      "Convert BMP images to PNG and cut the file size without losing detail. Free and private, in your browser.",
    intro:
      "BMP files are huge because they hardly compress the picture. PNG also keeps every pixel, but it packs the file far better, so you save space with no loss of detail. This page converts your BMP to PNG in your browser, and your image is never uploaded.",
    steps: [
      "Add your .bmp images.",
      "Leave the format on PNG.",
      "Compare the new size with the original.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Will I lose quality going from BMP to PNG?",
        a: "No. PNG keeps every pixel exactly, so the picture stays the same while the file gets smaller.",
      },
      {
        q: "Is JPG smaller than PNG?",
        a: "Usually yes, but JPG loses a little detail. Choose PNG when you need the exact picture.",
      },
    ],
    preset: { outputFormat: "png", accept: "image/bmp,.bmp" },
    related: ["bmp-to-jpg", "jpg-to-png", "compress-png"],
    published: true,
  },

  // ---------- HEIC ----------
  {
    slug: "heic-to-jpg",
    tool: "image-converter",
    title: "HEIC to JPG Converter (HEIF to JPEG) - Free and Private",
    h1: "Convert HEIC to JPG or JPEG",
    description:
      "Turn iPhone HEIC photos into normal JPG files that open anywhere. Free, private and no signup, right in your browser.",
    intro:
      "HEIC (also called HEIF) is the photo format many iPhones use, and a lot of programs, websites and forms will not open it. This page converts a HEIC file to JPG (JPEG) so it works almost everywhere, and you can convert one HEIC image or many. The conversion happens in your browser, so your photos are never uploaded. JPG and JPEG are the same format; only the file ending differs.",
    steps: [
      "Add one or more .heic photos.",
      "JPG is already chosen. Move the quality slider if you want a smaller or sharper file.",
      "Compare the new size with the original.",
      "Press Download JPG, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "How do I convert a HEIC file to JPG online for free?",
        a: "Add the file above, keep JPG selected and press Download. It is free, needs no signup, and runs in your browser.",
      },
      {
        q: "What is a HEIC file?",
        a: "HEIC is a photo format that many iPhones save pictures in. It usually takes less space than JPG, but not every program, website or form accepts it.",
      },
      {
        q: "Will my photo lose quality?",
        a: "JPG is a lossy format, so there is a small change. The default quality is high, so most photos look the same on a screen. Raise the slider if you plan to print.",
      },
      {
        q: "Why is my JPG bigger than the HEIC?",
        a: "HEIC usually saves a picture in less space than JPG, so a bigger JPG is normal. If you need a small file, lower the quality or compress the JPG afterwards.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["iphone-photo-to-jpg", "heic-to-png", "compress-jpg"],
    published: true,
  },
  {
    slug: "heic-to-png",
    tool: "image-converter",
    title: "HEIC to PNG Converter - Free Online Tool",
    h1: "Convert HEIC to PNG",
    description:
      "Change iPhone HEIC photos to PNG for editors and apps that will not open them. Free and private, in your browser.",
    intro:
      "Some editing programs and design tools cannot open HEIC photos but work fine with PNG. This page converts your HEIC image to PNG in your browser, and nothing is uploaded. PNG saves every pixel without losing more detail when you edit and save again, but it cannot add back detail, and the file will be much bigger than the HEIC.",
    steps: [
      "Add your .heic photos.",
      "Choose PNG as the format.",
      "Check the new size. PNG files are large, so this is normal.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "How do I convert a HEIC image to PNG online?",
        a: "Add the image, choose PNG and press Download. The conversion happens in your browser and needs no signup.",
      },
      {
        q: "Should I choose PNG or JPG?",
        a: "Choose JPG for sharing, emailing and uploading, because the file is much smaller. Choose PNG when you will edit the picture again and want to avoid more quality loss.",
      },
      {
        q: "Why is my PNG so big?",
        a: "PNG keeps every pixel exactly, so photos take a lot of space. If size matters, use JPG or WebP instead.",
      },
    ],
    preset: {
      outputFormat: "png",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "heic-to-webp", "jpg-to-png"],
    published: true,
  },
  {
    slug: "heic-to-webp",
    tool: "image-converter",
    title: "HEIC to WebP Converter - Smaller Files for Websites",
    h1: "Convert HEIC to WebP",
    description:
      "Turn iPhone HEIC photos into WebP files for websites. Free and private, in your browser.",
    intro:
      "If you want to put an iPhone photo on a website, WebP is a light format that modern browsers show. This page converts your HEIC to WebP in your browser, so your photos never leave your device. Some older programs and some upload forms do not accept WebP, so keep your original photo too.",
    steps: [
      "Add your .heic photos.",
      "Choose WebP and set the quality.",
      "Compare the new size with the original.",
      "Press Download WebP.",
    ],
    faqs: [
      {
        q: "How do I convert HEIC to WebP online?",
        a: "Add your photos, choose WebP and press Download. It runs in your browser, so nothing is uploaded.",
      },
      {
        q: "Is WebP better than JPG for a website?",
        a: "WebP is often smaller at a similar look, which helps pages load faster. The tool shows the new size so you can check for your own photo.",
      },
      {
        q: "Will every form accept a WebP file?",
        a: "Not always. If a form refuses the file, convert your HEIC to JPG instead.",
      },
    ],
    preset: {
      outputFormat: "webp",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "heic-to-png", "jpg-to-webp"],
    published: true,
  },
  {
    slug: "iphone-photo-to-jpg",
    tool: "image-converter",
    title: "Convert iPhone Photos to JPG - Free and Private",
    h1: "Convert iPhone Photos to JPG",
    description:
      "Change your iPhone photos to JPG so they upload and open anywhere. Free, private and no app needed.",
    intro:
      "iPhones usually save photos as HEIC, and some websites, forms and programs reject that format. If you do not know what format your photo is in, just add it here and get a JPG (JPEG) back. If you would rather save future photos as JPG, open Settings, then Camera, then Formats, and choose Most Compatible. Menu names can change between iOS versions. Your photos are never uploaded.",
    steps: [
      "Add your iPhone photos. You can add many at once.",
      "Leave the format on JPG.",
      "Check the new sizes.",
      "Press Download all and use the JPG files.",
    ],
    faqs: [
      {
        q: "How do I convert iPhone pictures to JPEG?",
        a: "Add the pictures, keep JPG selected and press Download all. JPG and JPEG are the same format, so the files work anywhere that asks for either.",
      },
      {
        q: "Is there an Apple HEIC to JPG converter that needs no app?",
        a: "Yes. This page runs in your browser, so there is nothing to install.",
      },
      {
        q: "Will the camera setting change my old photos?",
        a: "No. The Most Compatible setting only affects new photos. Old HEIC photos stay as they are until you convert them.",
      },
      {
        q: "Why does a website say my photo type is not supported?",
        a: "Many sites expect JPG or PNG. A HEIC file is often rejected, so converting it to JPG usually fixes the problem.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: ["heic-to-jpg", "heic-to-png", "compress-image-to-100kb"],
    published: true,
  },
  {
    slug: "open-heic-on-windows",
    tool: "image-converter",
    title: "Open HEIC Files on Windows - Convert Them to JPG",
    h1: "Open HEIC Files on Windows",
    description:
      "A .heic file will not open on your PC? Convert it to JPG in your browser. Free, private and nothing to install.",
    intro:
      "You may get a .heic photo from an iPhone by email or chat, and then find it will not open on your Windows PC. Windows may need extra software to show HEIC photos. The quickest fix is to turn the file into a JPG that any viewer can open. Do it here in your browser, with nothing to install, and your photo is never uploaded.",
    steps: [
      "Add the .heic file you received.",
      "JPG is already chosen.",
      "Press Download JPG.",
      "Open the new JPG with any photo viewer or editor.",
    ],
    faqs: [
      {
        q: "Why does the photo open on an iPhone but not my PC?",
        a: "Apple devices open HEIC by default. Other programs may not, which is why the same file can fail on a PC.",
      },
      {
        q: "Do I need to install anything?",
        a: "No. The conversion runs in your browser, so there is nothing to download or install first.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "iphone-photo-to-jpg", "heic-to-png"],
    published: true,
  },
  {
    slug: "heic-converter",
    tool: "image-converter",
    title: "HEIC Converter - Convert HEIC to JPG, PNG or WebP",
    h1: "HEIC Converter",
    description:
      "Convert HEIC and HEIF photos to JPG, PNG or WebP. Free, private and no signup, right in your browser.",
    intro:
      "Not sure which format you need? Add your HEIC or HEIF photo here and choose JPG, PNG or WebP yourself. JPG works almost everywhere, PNG keeps every detail for editing, and WebP is small for websites. You can add many photos at once, so it also works as a bulk HEIC converter. Your photos are processed in your browser and are never uploaded.",
    steps: [
      "Add your .heic or .heif photos.",
      "Choose JPG, PNG or WebP.",
      "Compare the new size with the original.",
      "Press Download, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "Which format should I choose?",
        a: "Choose JPG if you want to share, email or upload the photo. Choose PNG if you will edit it again. Choose WebP for a small file on a website.",
      },
      {
        q: "Is there a bulk HEIC converter that works online?",
        a: "Yes. Add many photos together, choose a format and press Download all. Everything runs in your browser.",
      },
      {
        q: "Is HEIC the same as HEIF?",
        a: "They are closely related. HEIF is the file family and HEIC is the version most iPhones use. This page accepts both endings.",
      },
    ],
    preset: { accept: "image/heic,image/heif,.heic,.heif" },
    related: ["heic-to-jpg", "heic-to-png", "heic-to-webp"],
    published: true,
  },
  {
    slug: "convert-multiple-heic-to-jpg",
    tool: "image-converter",
    title: "Convert Multiple HEIC to JPG at Once - Free Batch Converter",
    h1: "Convert Many HEIC Photos to JPG at Once",
    description:
      "Convert a whole batch of HEIC photos to JPG in one go and download them all. Free and private, in your browser.",
    intro:
      "Converting photos one by one takes forever. This batch HEIC to JPG converter takes many photos together and converts them all in your browser, one after another. You then download them one by one or all at once. Your photos are never uploaded, so a big batch does not need a slow upload either.",
    steps: [
      "Select all your .heic photos at once, or drag them in together.",
      "Wait while each photo is converted.",
      "Check the list. Every photo shows its new size.",
      "Press Download all. Your browser may ask you to allow several downloads.",
    ],
    faqs: [
      {
        q: "Can I convert HEIC to JPG in bulk?",
        a: "Yes. Select many photos together, wait for the list to finish and use Download all.",
      },
      {
        q: "How many photos can I convert at once?",
        a: "There is no fixed number in the tool. A very large batch depends on your device's memory, so if your browser slows down, convert in smaller groups.",
      },
      {
        q: "Why did my browser ask about several downloads?",
        a: "Browsers often ask before letting a page save many files. Allow it so every photo downloads.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "iphone-photo-to-jpg", "heic-converter"],
    published: true,
  },
  {
    slug: "heic-to-jpg-without-losing-quality",
    tool: "image-converter",
    title: "HEIC to JPG Without Losing Quality - Free Converter",
    h1: "Convert HEIC to JPG Without Losing Quality",
    description:
      "Keep your HEIC photo as sharp as possible when you convert it. Set the quality yourself, free and private.",
    intro:
      "JPG always squeezes a picture a little, so no JPG is perfectly lossless. But you control how much. Move the quality slider to the top and the difference is very small on a normal screen, though the file gets bigger. If you want no extra loss at all, choose PNG instead. Everything runs in your browser and your photos are never uploaded.",
    steps: [
      "Add your .heic photo.",
      "Move the quality slider all the way to 100%.",
      "Compare the new size with the original. A sharper JPG is a bigger file.",
      "Press Download JPG, or switch to PNG for no extra loss.",
    ],
    faqs: [
      {
        q: "Can I convert HEIC to JPG with no loss at all?",
        a: "Not to JPG, because JPG always compresses. For no extra loss, choose PNG, which keeps the picture exactly, but the file will be much bigger.",
      },
      {
        q: "What quality should I use?",
        a: "Use the highest setting if you plan to print or edit the photo. For sharing on a screen, a lower setting gives a smaller file that still looks good.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-png", "heic-to-jpg", "heic-to-jpg-small-size"],
    published: true,
  },
  {
    slug: "heic-to-jpg-for-online-forms",
    tool: "image-converter",
    title: "HEIC to JPG for Online Forms and Applications",
    h1: "Convert HEIC to JPG for Online Forms",
    description:
      "Your form rejects iPhone photos? Convert HEIC to JPG here, then shrink it if the form has a size limit. Free and private.",
    intro:
      "Many application forms and upload fields accept only JPG or PNG, and often have a size limit too. An iPhone photo in HEIC format is rejected on the first count. Convert it to JPG here. If the form also has a limit, check the new size and, if it is still too big, shrink it with our compress tool. Your photo stays on your device.",
    steps: [
      "Add your .heic photo.",
      "Leave the format on JPG.",
      "Check the new size against the limit on your form.",
      "If it is too big, use the compress links below, then upload the file.",
    ],
    faqs: [
      {
        q: "Why does my form say the file type is not allowed?",
        a: "Many forms only accept JPG or PNG. A HEIC file is often rejected, so converting it to JPG usually fixes the error.",
      },
      {
        q: "What if the JPG is still too big?",
        a: "Use the compress tool and type the limit your form asks for. It lowers quality, and if needed the picture size, until the file fits.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-image-to-100kb",
      "compress-image-to-kb",
      "heic-to-jpg",
    ],
    published: true,
  },
  {
    slug: "heic-to-jpg-small-size",
    tool: "image-converter",
    title: "HEIC to JPG Small File Size - Lower the Quality",
    h1: "Convert HEIC to a Smaller JPG",
    description:
      "Get a lighter JPG from your HEIC photo by lowering the quality. Free, private and works in your browser.",
    intro:
      "A JPG from a HEIC photo can come out bigger than you expect, because HEIC usually saves a picture in less space. If you want a lighter file for sending or uploading, move the quality slider down. Lower quality means a smaller file and a slightly softer picture. Your photo is never uploaded.",
    steps: [
      "Add your .heic photo.",
      "Move the quality slider down for a smaller file.",
      "Watch the new size next to the original.",
      "Press Download JPG when the size looks right.",
    ],
    faqs: [
      {
        q: "Why is my JPG bigger than my HEIC?",
        a: "HEIC is built to save a picture in less space than JPG, so a bigger JPG is normal. Lowering the quality brings the size down.",
      },
      {
        q: "How low can I go?",
        a: "Go lower until the picture starts to look soft or blocky, then step back up. For an exact size limit, use the compress tool.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "compress-jpg", "compress-image-to-100kb"],
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

  // ---------- RESIZE: MORE SIZES (wave 2: set published to true after 1-2 weeks) ----------
  {
    slug: "resize-image-to-1920x1080",
    tool: "image-resizer",
    title: "Resize Image to 1920x1080 - Full HD Size Online",
    h1: "Resize Image to 1920 x 1080",
    description:
      "Set any picture to exactly 1920 by 1080 pixels. Crop or stretch to fit. Free and private, in your browser.",
    intro:
      "1920 by 1080 pixels is the Full HD size, a 16:9 shape used for many wallpapers, slides and videos. This page sets your picture to exactly that size. If your picture has a different shape, you choose whether to crop the edges or stretch it. Nothing is uploaded.",
    steps: [
      "Add your picture.",
      "Keep the size at 1920 by 1080 pixels.",
      "If the shape is different, choose Crop to fit or Stretch.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "What does 16:9 mean?",
        a: "It is the shape of the picture: 16 parts wide for every 9 parts tall. 1920 by 1080 is a 16:9 size.",
      },
      {
        q: "Why does my small picture look blurry at 1920 x 1080?",
        a: "Making a small picture bigger spreads its pixels out, so it cannot get sharper than the original.",
      },
    ],
    preset: { width: 1920, height: 1080 },
    related: [
      "resize-image-in-pixels",
      "resize-image-for-youtube-thumbnail",
      "resize-image-to-1280x720",
    ],
    published: true,
  },
  {
    slug: "resize-image-to-1280x720",
    tool: "image-resizer",
    title: "Resize Image to 1280x720 - HD Size Online",
    h1: "Resize Image to 1280 x 720",
    description:
      "Set any picture to exactly 1280 by 720 pixels, the HD size. Free, private and works in your browser.",
    intro:
      "1280 by 720 pixels is the HD size, also in a 16:9 shape. It is lighter than Full HD, so files are smaller. This page sets your picture to exactly 1280 by 720. If your picture has another shape, you choose whether to crop the edges or stretch it. Nothing is uploaded.",
    steps: [
      "Add your picture.",
      "Keep the size at 1280 by 720 pixels.",
      "If the shape is different, choose Crop to fit or Stretch.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "Is 1280 x 720 smaller than Full HD?",
        a: "Yes. Full HD is 1920 by 1080. 1280 by 720 has fewer pixels, so the picture takes less space.",
      },
      {
        q: "Will my picture be cropped?",
        a: "Only if you choose Crop to fit. Stretch keeps everything but can squeeze the picture.",
      },
    ],
    preset: { width: 1280, height: 720 },
    related: [
      "resize-image-to-1920x1080",
      "resize-image-in-pixels",
      "compress-image-to-200kb",
    ],
    published: true,
  },
  {
    slug: "resize-image-to-500x500",
    tool: "image-resizer",
    title: "Resize Image to 500x500 - Square Size Online",
    h1: "Resize Image to 500 x 500",
    description:
      "Set any picture to a 500 by 500 pixel square. Crop or stretch to fit. Free and private, in your browser.",
    intro:
      "A 500 by 500 pixel square is handy for profile pictures, small icons and thumbnails. This page sets your picture to exactly that size. If your picture is not square, you choose whether to crop the edges so it fills the square, or stretch it. Nothing is uploaded.",
    steps: [
      "Add your picture.",
      "Keep the size at 500 by 500 pixels.",
      "If your picture is not square, choose Crop to fit or Stretch.",
      "Press Download image.",
    ],
    faqs: [
      {
        q: "How do I keep my face in the middle?",
        a: "Choose Crop to fit. The tool crops from the center, so make sure your subject is near the middle of the picture.",
      },
      {
        q: "Can I use another square size?",
        a: "Yes. Change the width and height in the boxes to any size you need.",
      },
    ],
    preset: { width: 500, height: 500 },
    related: [
      "resize-image-in-pixels",
      "resize-image-for-instagram",
      "compress-image-to-50kb",
    ],
    published: true,
  },

  // ---------- NEW: IPHONE CONVERT ----------
  {
    slug: "iphone-photo-to-png",
    tool: "image-converter",
    title: "Convert iPhone Photos to PNG - Free and Private",
    h1: "Convert iPhone Photos to PNG",
    description:
      "Change your iPhone photos to PNG for editing and design apps. Free, private and no app needed.",
    intro:
      "iPhones usually save photos as HEIC, which many editing and design programs cannot open. PNG opens almost everywhere and keeps every pixel when you edit and save again. Add your iPhone photos here and get PNG files back. PNG files are much bigger than the originals, so if you only want to share or upload a photo, JPG is lighter. Your photos are never uploaded.",
    steps: [
      "Add your iPhone photos. You can add many at once.",
      "Leave the format on PNG.",
      "Check the new sizes. Big files are normal for PNG.",
      "Press Download all and open the PNG files in your editor.",
    ],
    faqs: [
      {
        q: "How do I convert an iPhone photo to PNG?",
        a: "Add the photo, keep PNG selected and press Download. The conversion runs in your browser, so there is nothing to install.",
      },
      {
        q: "Should I choose PNG or JPG for my iPhone photos?",
        a: "Choose JPG to share, email or upload, because the file is much smaller. Choose PNG when you plan to edit the photo again.",
      },
      {
        q: "Why is my PNG so much bigger than the photo on my iPhone?",
        a: "PNG keeps every pixel exactly, while the iPhone format is built to save space. A much bigger PNG is normal. For a lighter file, use JPG or WebP.",
      },
    ],
    preset: {
      outputFormat: "png",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: ["iphone-photo-to-jpg", "heic-to-png", "iphone-photo-to-webp"],
    published: true,
  },
  {
    slug: "iphone-photo-to-webp",
    tool: "image-converter",
    title: "Convert iPhone Photos to WebP - Smaller Web Images",
    h1: "Convert iPhone Photos to WebP",
    description:
      "Turn iPhone photos into light WebP files for your website. Free, private and no app needed.",
    intro:
      "If you want to put iPhone photos on a website, WebP is a light format that modern browsers show, and it helps pages load faster. Add your iPhone photos here and get WebP files back. Everything runs in your browser, so your photos are never uploaded. Some older programs and some upload forms do not accept WebP, so keep your original photos too.",
    steps: [
      "Add your iPhone photos. You can add many at once.",
      "Leave the format on WebP and set the quality.",
      "Compare the new sizes with the originals.",
      "Press Download all and add the WebP files to your site.",
    ],
    faqs: [
      {
        q: "How do I convert iPhone pictures to WebP?",
        a: "Add the pictures, keep WebP selected and press Download all. It runs in your browser and needs no signup.",
      },
      {
        q: "Will every upload form accept WebP?",
        a: "Not always. If a form refuses the file, convert your iPhone photo to JPG instead.",
      },
      {
        q: "Is WebP smaller than JPG?",
        a: "Often yes at a similar look. The tool shows the new size next to the original so you can check for your own photo.",
      },
    ],
    preset: {
      outputFormat: "webp",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: ["iphone-photo-to-jpg", "heic-to-webp", "jpg-to-webp"],
    published: true,
  },

  // ---------- NEW: HEIC AND IPHONE COMPRESS ----------
  {
    slug: "compress-heic",
    tool: "image-compressor",
    title: "Compress HEIC Online - Make HEIC Photos Smaller",
    h1: "Compress HEIC Photos",
    description:
      "Reduce the size of HEIC photos with a simple quality slider. Free, private and nothing is uploaded.",
    intro:
      "A modern iPhone photo can still be several MB, and many sites will not accept the HEIC format at all. This page makes your HEIC photo smaller and gives it back as a JPG, which opens almost everywhere. Use the presets or the slider to balance size and sharpness. Your photos are processed in your browser and are never uploaded.",
    steps: [
      "Add one or more .heic photos.",
      "Pick Smallest file, Balanced or Best quality, or move the slider.",
      "Watch the size bar to see how much you saved.",
      "Press Download, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "Can I save the result as HEIC again?",
        a: "No. The compressed photo comes back as a JPG, which works with many more programs, websites and forms.",
      },
      {
        q: "How do I compress HEIC without losing quality?",
        a: "Some quality is always traded for size. Balanced keeps most photos looking almost the same on a screen. Pick Best quality if you plan to print.",
      },
      {
        q: "Can I set an exact size for my HEIC photo?",
        a: "Yes. Use the By file size tab and type the limit your form asks for, or open one of the size pages linked below.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-jpg",
      "compress-heic-to-100kb",
      "heic-to-jpg-small-size",
    ],
    published: true,
  },
  {
    slug: "compress-iphone-photos",
    tool: "image-compressor",
    title: "Compress iPhone Photos Online - Free and Private",
    h1: "Compress iPhone Photos",
    description:
      "Make iPhone photos smaller for email, uploads and sharing. Free and private, right in your browser.",
    intro:
      "iPhone photos are often several MB each, which makes them slow to send and easy to push over an upload limit. Add them here and get smaller JPG files back that open anywhere, including photos that arrive in HEIC format. Choose a quick preset or set an exact size. Your photos stay on your device.",
    steps: [
      "Add your iPhone photos. You can add many at once.",
      "Tap Balanced for a good mix of size and quality, or Smallest file for the lightest result.",
      "Check the size bar to see how much you saved.",
      "Press Download all and send or upload the new files.",
    ],
    faqs: [
      {
        q: "How do I compress iPhone photos without losing quality?",
        a: "Pick Balanced. Most photos look almost the same on a screen, because a small quality drop saves a lot of space. Keep the originals if you plan to print.",
      },
      {
        q: "Can I compress iPhone photos for email?",
        a: "Yes. Add all the photos, pick Balanced, or Smallest file if the email still bounces, and attach the new files.",
      },
      {
        q: "Can I compress many iPhone photos at once?",
        a: "Yes. Add them together and press Download all. Your browser may ask you to allow several downloads.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: [
      "reduce-iphone-photo-size",
      "compress-image-for-email",
      "compress-heic",
    ],
    published: true,
  },
  {
    slug: "reduce-iphone-photo-size",
    tool: "image-compressor",
    title: "Reduce iPhone Photo Size - Make Photos Smaller",
    h1: "Reduce iPhone Photo Size",
    description:
      "Make an iPhone photo smaller in file size by lowering the quality. Free, private and works in your browser.",
    intro:
      "There are two ways to make an iPhone photo smaller in file size: save it at lower quality, or make it smaller in pixels. This page does the quality part for you, and our resize tool does the pixels part. Using both together gives the smallest file. To make new photos lighter from the start, open Settings, then Camera, then Formats, and choose High Efficiency. Menu names can change between iOS versions. Your photos are never uploaded.",
    steps: [
      "Add your iPhone photo.",
      "Pick Smallest file for the biggest saving, or move the slider yourself.",
      "Look at the size bar. If you need it even smaller, make the picture smaller in pixels with the resize link below.",
      "Press Download and use the new file.",
    ],
    faqs: [
      {
        q: "How can I make my iPhone photo smaller?",
        a: "Lower the quality here, make the picture smaller in pixels, or do both. Fewer pixels usually saves the most space.",
      },
      {
        q: "Will the High Efficiency camera setting reduce my photo size?",
        a: "It makes new photos use less space, but they are saved as HEIC, which some sites do not accept. Convert them to JPG here when you need to upload them.",
      },
      {
        q: "Will the photo look worse?",
        a: "A little at Smallest file, but very little at Balanced. On a phone screen most people cannot tell.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: [
      "compress-iphone-photos",
      "resize-image-by-percentage",
      "compress-heic",
    ],
    published: true,
  },
  {
    slug: "compress-heic-to-jpg",
    tool: "image-compressor",
    title: "Compress HEIC to JPG - Smaller JPG From iPhone Photos",
    h1: "Compress HEIC to JPG",
    description:
      "Convert HEIC to JPG and shrink it in one step, with an optional exact size limit. Free and private, in your browser.",
    intro:
      "This page turns your HEIC photo into a JPG and makes it smaller in the same step. Use a preset for a quick result, or type an exact size in the By file size tab when a form has a limit. It is the one to use when a plain conversion still gives a file that is too big. Your photos are never uploaded.",
    steps: [
      "Add your .heic photos.",
      "Pick Smallest file, Balanced or Best quality, or set an exact size.",
      "Check the size bar to see how much you saved.",
      "Press Download JPG, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "Why is my JPG bigger than the HEIC?",
        a: "HEIC usually saves a picture in less space than JPG, so a bigger JPG is normal. Compressing it here brings the size down.",
      },
      {
        q: "How is this different from the plain HEIC to JPG converter?",
        a: "The converter changes the format. This page also lets you aim for a smaller file, or an exact size such as 100 KB.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["compress-heic", "heic-to-jpg", "compress-heic-to-100kb"],
    published: true,
  },
  {
    slug: "compress-heic-to-png",
    tool: "image-compressor",
    title: "Compress HEIC to PNG - Convert and Save Space",
    h1: "Compress HEIC to PNG",
    description:
      "Convert HEIC to PNG when you need a lossless file, and see how much space it takes. Free and private, in your browser.",
    intro:
      "PNG keeps every pixel, so a quality slider cannot make it much smaller, and a PNG made from a HEIC photo is usually much bigger than the original. Use this page when you need PNG for editing and want to check the size. If you need a really small file, WebP or JPG will shrink far more. Your photos are never uploaded.",
    steps: [
      "Add your .heic photos.",
      "Choose PNG as the format.",
      "Check the new size. If it is too big, switch to WebP or JPG.",
      "Press Download PNG.",
    ],
    faqs: [
      {
        q: "Can I really make a PNG much smaller?",
        a: "Not by lowering quality, because PNG saves every pixel exactly. To get a much smaller file, choose WebP or JPG, or make the picture smaller in pixels.",
      },
      {
        q: "Why is my PNG bigger than the HEIC?",
        a: "HEIC is built to save space and PNG is not. A bigger PNG is normal.",
      },
    ],
    preset: {
      outputFormat: "png",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["compress-heic-to-webp", "heic-to-png", "compress-png"],
    published: true,
  },
  {
    slug: "compress-heic-to-webp",
    tool: "image-compressor",
    title: "Compress HEIC to WebP - Small Files for Websites",
    h1: "Compress HEIC to WebP",
    description:
      "Convert HEIC to WebP and shrink it in one step for faster websites. Free and private, in your browser.",
    intro:
      "WebP is a light format that modern browsers show, so it suits iPhone photos you want to put on a website. This page converts your HEIC photo to WebP and makes it smaller in the same step. Use a preset or set an exact size. Some older programs and some forms do not accept WebP, so keep your original photo too. Your photos are never uploaded.",
    steps: [
      "Add your .heic photos.",
      "Choose WebP and pick Balanced or Smallest file.",
      "Compare the new size with the original.",
      "Press Download WebP.",
    ],
    faqs: [
      {
        q: "Is WebP smaller than JPG?",
        a: "Often yes at a similar look. The tool shows the new size so you can check for your own photo.",
      },
      {
        q: "Will every form accept a WebP file?",
        a: "Not always. If a form refuses the file, use the HEIC to JPG option instead.",
      },
    ],
    preset: {
      outputFormat: "webp",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["compress-heic", "heic-to-webp", "compress-heic-to-jpg"],
    published: true,
  },

  // ---------- NEW: HEIC TARGET SIZE ----------
  {
    slug: "compress-heic-to-50kb",
    tool: "image-compressor",
    title: "Compress HEIC to 50KB - Free and Private",
    h1: "Compress HEIC to 50KB",
    description:
      "Shrink an iPhone HEIC photo to under 50KB and get a JPG back. Free, private and no signup needed.",
    intro:
      "Forms that ask for photos under 50KB usually accept only JPG or PNG, so a HEIC photo from an iPhone is rejected twice: once for the format and once for the size. This page fixes both in one step. It opens your HEIC photo, shrinks it under 50KB and gives it back as a JPG. Your photo never leaves your device.",
    steps: [
      "Add your .heic photo.",
      "Keep the limit on 50 KB.",
      "Check the preview and the new size.",
      "Press Download and upload the JPG to your form.",
    ],
    faqs: [
      {
        q: "Will my face photo be clear at 50KB?",
        a: "Usually yes when the photo is shown small on a form. It is not meant for printing or large displays.",
      },
      {
        q: "Why did my photo get smaller in pixels?",
        a: "iPhone photos are large. If quality alone cannot reach 50KB, the tool also lowers the width and height until the file fits.",
      },
    ],
    preset: {
      targetKB: 50,
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-100kb",
      "compress-image-to-50kb",
      "compress-heic",
    ],
    published: true,
  },
  {
    slug: "compress-heic-to-100kb",
    tool: "image-compressor",
    title: "Compress HEIC to 100KB - Free and Private",
    h1: "Compress HEIC to 100KB",
    description:
      "Get an iPhone HEIC photo under 100KB and saved as a JPG. Free, private and works in your browser.",
    intro:
      "Many job portals, school sites and government forms want a photo under 100KB and in JPG format. An iPhone photo in HEIC format fails both. This page opens your HEIC photo, shrinks it under 100KB and gives it back as a JPG in one step. Your photo is never uploaded.",
    steps: [
      "Add your .heic photo.",
      "Keep the limit on 100 KB.",
      "Compare the new size with the original.",
      "Press Download and upload the JPG to your form.",
    ],
    faqs: [
      {
        q: "Will my photo look softer at 100KB?",
        a: "A little. The tool lowers the quality just enough to fit, and detailed photos lose a bit more than simple ones.",
      },
      {
        q: "What if my form needs a different size?",
        a: "Use the exact size box in the compress tool and type your limit, or open the 50KB, 200KB, 500KB or 1MB page.",
      },
    ],
    preset: {
      targetKB: 100,
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-50kb",
      "compress-heic-to-200kb",
      "compress-image-to-100kb",
    ],
    published: true,
  },
  {
    slug: "compress-heic-to-200kb",
    tool: "image-compressor",
    title: "Compress HEIC to 200KB - Keep It Sharp",
    h1: "Compress HEIC to 200KB",
    description:
      "Shrink an iPhone HEIC photo to under 200KB and keep it sharp. Free, private and in your browser.",
    intro:
      "200KB leaves room for good quality, so most iPhone photos only need a small quality drop to fit. This page opens your HEIC photo, gets it under 200KB and gives it back as a JPG that works on almost every form and website. Your photo never leaves your device.",
    steps: [
      "Add your .heic photo.",
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
        q: "Why is the result a JPG and not a HEIC?",
        a: "JPG is accepted by far more forms and programs than HEIC, so the photo comes back as a JPG.",
      },
    ],
    preset: {
      targetKB: 200,
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-100kb",
      "compress-heic-to-500kb",
      "compress-image-to-200kb",
    ],
    published: true,
  },
  {
    slug: "compress-heic-to-500kb",
    tool: "image-compressor",
    title: "Compress HEIC to 500KB - Keep Good Quality",
    h1: "Compress HEIC to 500KB",
    description:
      "Shrink an iPhone HEIC photo to under 500KB and keep it clear. Free, private and works in your browser.",
    intro:
      "500KB is roomy enough to keep most photos sharp. An iPhone photo is often several MB, so a small quality drop is usually all that is needed. This page opens your HEIC photo, gets it under 500KB and returns it as a JPG for uploads and email. Your photo is never uploaded.",
    steps: [
      "Add your .heic photo.",
      "Keep the limit on 500 KB.",
      "Compare the new size with the original.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Will I see a quality drop at 500KB?",
        a: "For most photos the difference is small. Very detailed pictures lose a little more.",
      },
      {
        q: "What if my HEIC photo is already under 500KB?",
        a: "It is still converted to JPG so it opens everywhere, and it is only shrunk further if the result is over the limit.",
      },
    ],
    preset: {
      targetKB: 500,
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-200kb",
      "compress-heic-to-1mb",
      "compress-image-to-500kb",
    ],
    published: true,
  },
  {
    slug: "compress-heic-to-1mb",
    tool: "image-compressor",
    title: "Compress HEIC to 1MB - Free and Private",
    h1: "Compress HEIC to 1MB",
    description:
      "Reduce an iPhone HEIC photo to under 1MB and get a JPG back. Free, private and no signup needed.",
    intro:
      "Some forms and portals ask for pictures under 1 MB in JPG format, and a modern iPhone photo can be several MB in HEIC. This page opens your HEIC photo, lowers the quality just enough to get under the limit and returns it as a JPG. It counts 1 MB as 1000 KB, so the file fits however the website counts. Your photo never leaves your device.",
    steps: [
      "Add your .heic photo.",
      "Keep the limit on 1 MB.",
      "Compare the new size with the original.",
      "Press Download.",
    ],
    faqs: [
      {
        q: "Is 1 MB the same as 1000 KB?",
        a: "Some websites count 1 MB as 1000 KB and some as 1024 KB. This tool uses 1000, so your file fits either way.",
      },
      {
        q: "Will my photo look different at 1 MB?",
        a: "Most photos look almost the same. A photo that is already under 1 MB after conversion is left as it is.",
      },
    ],
    preset: {
      targetKB: 1000,
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic-to-500kb",
      "compress-heic-to-200kb",
      "compress-image-to-1mb",
    ],
    published: true,
  },

  // ---------- NEW: BULK AND BATCH ----------
  {
    slug: "bulk-heic-converter",
    tool: "image-converter",
    title: "Bulk HEIC Converter - Convert Many Photos at Once",
    h1: "Bulk HEIC Converter",
    description:
      "Convert a whole folder of HEIC photos to JPG, PNG or WebP in one go. Free and private, in your browser.",
    intro:
      "Have a whole camera roll of HEIC photos to convert? Select them all at once, choose JPG, PNG or WebP, and the tool converts them one after another in your browser. Then download them all together. Your photos are never uploaded, so there is no slow upload for a big batch either.",
    steps: [
      "Select all your .heic photos at once, or drag them in together.",
      "Choose JPG, PNG or WebP.",
      "Wait until every photo in the list shows its new size.",
      "Press Download all. Your browser may ask you to allow several downloads.",
    ],
    faqs: [
      {
        q: "How many HEIC photos can I convert at once?",
        a: "There is no fixed number in the tool. A very large batch depends on your device's memory, so if your browser slows down, convert in smaller groups.",
      },
      {
        q: "Can I choose a different format for the whole batch?",
        a: "Yes. Pick JPG, PNG or WebP before you download and every photo in the batch uses it.",
      },
    ],
    preset: { accept: "image/heic,image/heif,.heic,.heif" },
    related: [
      "convert-multiple-heic-to-jpg",
      "heic-converter",
      "bulk-heic-compressor",
    ],
    published: true,
  },
  {
    slug: "bulk-heic-compressor",
    tool: "image-compressor",
    title: "Bulk HEIC Compressor - Shrink Many Photos at Once",
    h1: "Bulk HEIC Compressor",
    description:
      "Compress many HEIC photos in one go and download them all as smaller JPGs. Free and private, in your browser.",
    intro:
      "Compressing photos one by one is slow. Add many HEIC photos together, pick a quality preset, and the tool shrinks them all in your browser and returns them as JPG files. Then download everything at once. Your photos are never uploaded.",
    steps: [
      "Select all your .heic photos at once, or drag them in together.",
      "Pick Balanced or Smallest file, or move the slider.",
      "Check the total size at the bottom.",
      "Press Download all.",
    ],
    faqs: [
      {
        q: "Can I compress many HEIC photos at once?",
        a: "Yes. Add them together, wait for the list to finish and press Download all.",
      },
      {
        q: "Can I set one size limit for all of them?",
        a: "Yes. Use the By file size tab and type a limit, and every photo in the batch is shrunk to fit it.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "compress-heic",
      "bulk-heic-converter",
      "compress-iphone-photos",
    ],
    published: true,
  },
  {
    slug: "batch-heic-to-png",
    tool: "image-converter",
    title: "Batch HEIC to PNG - Convert Many Photos at Once",
    h1: "Convert Many HEIC Photos to PNG",
    description:
      "Convert a batch of HEIC photos to PNG in one go and download them all. Free and private, in your browser.",
    intro:
      "This batch HEIC to PNG converter takes many photos together and converts them all in your browser, one after another. PNG keeps every pixel, so it suits photos you plan to edit, but the files are much bigger than HEIC, so a large batch can take a lot of space. Your photos are never uploaded.",
    steps: [
      "Select all your .heic photos at once, or drag them in together.",
      "Leave the format on PNG.",
      "Check the list. Every photo shows its new size.",
      "Press Download all.",
    ],
    faqs: [
      {
        q: "Can I convert HEIC to PNG in bulk?",
        a: "Yes. Select many photos together, wait for the list to finish and press Download all.",
      },
      {
        q: "Why is the whole batch so big?",
        a: "PNG keeps every pixel exactly, so photos take a lot of space. For a lighter batch, convert to JPG or WebP.",
      },
    ],
    preset: {
      outputFormat: "png",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-png", "bulk-heic-converter", "batch-heic-to-webp"],
    published: true,
  },
  {
    slug: "batch-heic-to-webp",
    tool: "image-converter",
    title: "Batch HEIC to WebP - Convert Many Photos at Once",
    h1: "Convert Many HEIC Photos to WebP",
    description:
      "Convert a batch of HEIC photos to WebP in one go for your website. Free and private, in your browser.",
    intro:
      "Preparing a set of iPhone photos for a website? This batch HEIC to WebP converter takes many photos together and converts them all in your browser. WebP files are light and modern browsers show them. Some older programs and forms do not accept WebP, so keep your originals too. Your photos are never uploaded.",
    steps: [
      "Select all your .heic photos at once, or drag them in together.",
      "Leave the format on WebP and set the quality.",
      "Check the list. Every photo shows its new size.",
      "Press Download all.",
    ],
    faqs: [
      {
        q: "Can I convert HEIC to WebP in bulk?",
        a: "Yes. Select many photos together, wait for the list to finish and press Download all.",
      },
      {
        q: "Is WebP a good choice for a whole gallery?",
        a: "Often yes, because the files are light and pages load faster. Check the sizes in the list to see the saving for your own photos.",
      },
    ],
    preset: {
      outputFormat: "webp",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-webp", "bulk-heic-converter", "batch-heic-to-png"],
    published: true,
  },

  // ---------- NEW: GUIDES (tool pages with guide-style content) ----------
  {
    slug: "how-to-convert-heic-to-jpg",
    tool: "image-converter",
    title: "How to Convert HEIC to JPG - Easy Steps, Free",
    h1: "How to Convert HEIC to JPG",
    description:
      "Learn how to turn HEIC photos into JPG, and convert one right now in your browser. Free and private.",
    intro:
      "There are two easy ways to get JPG instead of HEIC. The fastest is to convert the photos you already have, which you can do right here in your browser without installing anything. The other is to change your iPhone camera so new photos are saved as JPG: open Settings, then Camera, then Formats, and choose Most Compatible. Menu names can change between iOS versions. Your photos are never uploaded.",
    steps: [
      "Add the .heic photo or photos you want to convert.",
      "Keep JPG selected. Move the quality slider if you want a smaller or sharper file.",
      "Compare the new size with the original.",
      "Press Download JPG, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "What is the easiest way to convert HEIC to JPG?",
        a: "Add the file to the box above and press Download. It runs in your browser, needs no signup and nothing is installed.",
      },
      {
        q: "How do I stop my iPhone saving photos as HEIC?",
        a: "Open Settings, then Camera, then Formats, and choose Most Compatible. This only affects new photos, so convert the old ones here.",
      },
      {
        q: "Will I lose quality when I convert?",
        a: "JPG is a lossy format, so there is a small change. At a high quality setting most photos look the same on a screen.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "iphone-photo-to-jpg", "what-is-heic-file"],
    published: true,
  },
  {
    slug: "how-to-compress-heic-files",
    tool: "image-compressor",
    title: "How to Compress HEIC Files - Simple Guide",
    h1: "How to Compress HEIC Files",
    description:
      "Learn how to make HEIC photos smaller, and do it now in your browser. Free and private.",
    intro:
      "To make a HEIC photo smaller you can lower its quality, make it smaller in pixels, or do both. The quickest way is to use the tool on this page: add the photo, pick a preset and download the result. HEIC cannot be saved again by this tool, so the smaller photo comes back as a JPG, which also opens on far more sites and programs. Your photos are never uploaded.",
    steps: [
      "Add the .heic photos you want to shrink.",
      "Pick Smallest file, Balanced or Best quality, or type an exact size in the By file size tab.",
      "Watch the size bar to see how much you saved.",
      "Press Download, or Download all for several photos.",
    ],
    faqs: [
      {
        q: "What is the best way to make a HEIC file smaller?",
        a: "Lower the quality a little and, if you need more, make the picture smaller in pixels. Balanced is a good place to start.",
      },
      {
        q: "Can I compress HEIC to an exact size?",
        a: "Yes. Type the limit your form asks for in the By file size tab, or open one of the size pages such as 100KB or 1MB.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["compress-heic", "compress-heic-to-100kb", "compress-heic-to-jpg"],
    published: true,
  },
  {
    slug: "how-to-reduce-iphone-photo-size",
    tool: "image-compressor",
    title: "How to Reduce iPhone Photo Size - Simple Guide",
    h1: "How to Reduce iPhone Photo Size",
    description:
      "Learn how to make iPhone photos smaller for email and uploads, and do it now in your browser. Free and private.",
    intro:
      "There are three simple ways to get a smaller iPhone photo. You can shrink photos you already have with the tool on this page. You can make the picture smaller in pixels with our resize tool. Or you can change your camera format so new photos use less space: open Settings, then Camera, then Formats, and choose High Efficiency. Menu names can change between iOS versions. Your photos are never uploaded.",
    steps: [
      "Add the iPhone photos you want to make smaller.",
      "Pick Balanced, or Smallest file if you need a bigger saving.",
      "Check the size bar. If it is still too big, use the resize link below.",
      "Press Download all and use the new files.",
    ],
    faqs: [
      {
        q: "What is the quickest way to reduce an iPhone photo size?",
        a: "Add the photo here and pick Smallest file. For an even smaller file, also make the picture smaller in pixels.",
      },
      {
        q: "Does High Efficiency make my photos smaller?",
        a: "New photos use less space, but they are saved as HEIC, which some sites reject. Convert them to JPG when you need to upload them.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,image/jpeg,image/png,.heic,.heif,.jfif",
    },
    related: [
      "reduce-iphone-photo-size",
      "compress-iphone-photos",
      "resize-image-by-percentage",
    ],
    published: true,
  },
  {
    slug: "heic-vs-jpg",
    tool: "image-converter",
    title: "HEIC vs JPG - Differences and How to Convert",
    h1: "HEIC vs JPG: Which Should You Use?",
    description:
      "See how HEIC and JPG differ and convert HEIC to JPG in your browser. Free and private.",
    intro:
      "HEIC usually saves a photo in less space than JPG at a similar look, which is why many iPhones use it. JPG is bigger but opens almost everywhere, including on Windows, in older programs and on most upload forms. So use HEIC to save space on your phone, and convert to JPG when you need to share, email or upload. You can do that right here in your browser. Your photos are never uploaded.",
    steps: [
      "Add your .heic photos.",
      "Leave the format on JPG.",
      "Compare the new size with the original. A bigger JPG is normal.",
      "Press Download JPG.",
    ],
    faqs: [
      {
        q: "Is HEIC better than JPG?",
        a: "For file size, usually yes. For compatibility, JPG wins, because far more programs, websites and forms accept it.",
      },
      {
        q: "Why is my JPG bigger than the HEIC?",
        a: "HEIC is built to save a picture in less space than JPG, so a bigger JPG is normal. Lower the quality if you need a lighter file.",
      },
      {
        q: "Which should I use for uploads?",
        a: "JPG. Many forms reject HEIC, so converting to JPG usually avoids the error.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "what-is-heic-file", "heic-to-jpg-small-size"],
    published: true,
  },
  {
    slug: "what-is-heic-file",
    tool: "image-converter",
    title: "What Is a HEIC File? Open and Convert It Free",
    h1: "What Is a HEIC File?",
    description:
      "Find out what a .heic file is and how to open it by converting it to JPG. Free and private, in your browser.",
    intro:
      "A .heic file is a photo format that many iPhones use. It is based on HEIF, the High Efficiency Image Format, and it usually takes less space than a JPG at a similar look. The catch is that not every program, website or form can open it. If your HEIC photo will not open, convert it to JPG here. It runs in your browser, so your photos are never uploaded.",
    steps: [
      "Add your .heic photo.",
      "JPG is already chosen.",
      "Press Download JPG.",
      "Open the new JPG in any viewer, editor or upload form.",
    ],
    faqs: [
      {
        q: "Is HEIC the same as HEIF?",
        a: "They are closely related. HEIF is the file family and HEIC is the version most iPhones use. This page accepts both endings.",
      },
      {
        q: "Why will my HEIC file not open?",
        a: "Apple devices open HEIC by default, but other programs may need extra software or may not support it at all. Converting to JPG solves it.",
      },
    ],
    preset: {
      outputFormat: "jpg",
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: ["heic-to-jpg", "heic-vs-jpg", "open-heic-on-windows"],
    published: true,
  },
];

export const getSeoPage = (slug: string) =>
  seoPages.find((p) => p.slug === slug && p.published);

export const publishedSeoPages = () => seoPages.filter((p) => p.published);