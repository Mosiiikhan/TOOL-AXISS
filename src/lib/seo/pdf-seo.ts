
import type { SeoPage, ToolId } from "../tools/types";

/**
 * PDF tools SEO landing pages.
 *
 * Feature scope is based on the latest workspace implementations discussed:
 * - Image to PDF: JPG/JPEG, PNG and WebP; multiple images per PDF; A4, Letter
 *   and Fit page sizes; portrait/landscape; configurable margins.
 * - PDF to JPG / PNG: multiple PDFs; all pages or selected pages; render scale
 *   control; progress/cancel; individual downloads and ZIP download.
 * - JPG output additionally supports adjustable JPG quality.
 *
 * Do not publish pages for formats, DPI controls, output-size targets,
 * transparency controls or embedded-image extraction that the workspaces
 * do not currently implement.
 */

const makePage = (
  slug: string,
  tool: ToolId,
  title: string,
  h1: string,
  description: string,
  intro: string,
  steps: string[],
  faqs: { q: string; a: string }[],
  related: string[] = [],
): SeoPage => ({
  slug,
  tool,
  title,
  h1,
  description,
  intro,
  steps,
  faqs,
  preset: {},
  related,
  published: true,
});

export const pdfSeoPages: SeoPage[] = [
  // ==================== IMAGE TO PDF ====================

  makePage(
    "image-to-pdf",
    "image-to-pdf",
    "Image to PDF Converter Free Online | Tool Axiis",
    "Convert Images to PDF Online",
    "Convert JPG, PNG and WebP images into a PDF online for free. Arrange multiple images, choose A4, Letter or Fit page size, and download your PDF.",
    "Turn your pictures into a shareable PDF without installing software. Add JPG, PNG or WebP images, arrange them in the order you want, and combine them into one document. Choose A4, Letter or Fit page sizing, set the page orientation and margins, then create your PDF directly in your browser.",
    [
      "Open the Image to PDF converter.",
      "Select or drag in JPG, PNG or WebP images.",
      "Arrange the images in the order you want in the PDF.",
      "Choose A4, Letter or Fit, then set orientation and margins.",
      "Start the conversion and download the completed PDF.",
    ],
    [
      { q: "Which image formats can I convert to PDF?", a: "The current converter supports JPG/JPEG, PNG and WebP images." },
      { q: "Can I combine several images into one PDF?", a: "Yes. Add multiple supported images, arrange their order and convert them into one PDF document." },
      { q: "Can I choose A4 or Letter paper size?", a: "Yes. You can choose A4, Letter or Fit page sizing, along with portrait or landscape orientation and page margins." },
      { q: "Are my images uploaded?", a: "The conversion is performed in your browser. Your selected images are not sent to our server for conversion." },
    ],
    ["jpg-to-pdf", "png-to-pdf", "webp-to-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "jpg-to-pdf",
    "image-to-pdf",
    "JPG to PDF Converter Free Online | Tool Axiis",
    "Convert JPG to PDF Online",
    "Convert JPG images to PDF online. Combine multiple JPG photos, arrange pages, select A4 or Letter size and download one PDF for free.",
    "JPG is a common format for phone photos, scanned documents and pictures. Convert one or more JPG files into a PDF that is easier to share, print or submit. You can reorder the images and choose the page size, orientation and margins before downloading.",
    [
      "Select one or more JPG images.",
      "Arrange the images in the required order.",
      "Choose A4, Letter or Fit page size.",
      "Set portrait or landscape orientation and margins.",
      "Convert the JPG files and download your PDF.",
    ],
    [
      { q: "Can I convert multiple JPG files into one PDF?", a: "Yes. Add multiple JPG images and combine them into a single PDF, with each image placed in the document in the order you choose." },
      { q: "Does JPG to PDF reduce image quality?", a: "The converter places the JPG image content into PDF pages. The resulting appearance also depends on the original image dimensions and the selected page layout." },
      { q: "Can I make an A4 PDF from JPG images?", a: "Yes. Select A4 as the page size before converting." },
    ],
    ["image-to-pdf", "jpeg-to-pdf", "multiple-images-to-pdf", "image-to-a4-pdf"],
  ),

  makePage(
    "jpeg-to-pdf",
    "image-to-pdf",
    "JPEG to PDF Converter Free Online | Tool Axiis",
    "Convert JPEG to PDF Online",
    "Turn JPEG photos into a PDF online for free. Add multiple JPEG images, arrange them, choose page dimensions and download one PDF.",
    "JPEG and JPG refer to the same widely used image format. Use this page to turn JPEG photos into a PDF document for printing, sharing or uploading to a form. Add several images if needed, set their order and choose A4, Letter or Fit page sizing.",
    [
      "Choose your JPEG image files.",
      "Add more JPEG images if you want a multi-page PDF.",
      "Arrange the images in the correct order.",
      "Select the page size, orientation and margins.",
      "Convert and download the PDF.",
    ],
    [
      { q: "Is JPEG different from JPG?", a: "No. JPEG and JPG are two filename extensions for the same image format." },
      { q: "Can I put multiple JPEG photos in one PDF?", a: "Yes. Select multiple supported JPEG images and combine them into one PDF document." },
      { q: "Can I choose the PDF paper size?", a: "Yes. The converter offers A4, Letter and Fit page sizing, plus orientation and margin settings." },
    ],
    ["jpg-to-pdf", "image-to-pdf", "photo-to-pdf"],
  ),

  makePage(
    "png-to-pdf",
    "image-to-pdf",
    "PNG to PDF Converter Free Online | Tool Axiis",
    "Convert PNG to PDF Online",
    "Convert PNG images to PDF online for free. Combine PNG files, arrange their order and choose A4, Letter or Fit page sizing.",
    "Convert PNG graphics, screenshots and image files into a PDF document. Add one PNG or combine several images into a single PDF. Choose how pages should be sized and oriented, then download the result without installing a desktop application.",
    [
      "Select one or more PNG files.",
      "Arrange the images in your preferred order.",
      "Choose A4, Letter or Fit page size.",
      "Adjust orientation and margins.",
      "Convert the PNG images and download the PDF.",
    ],
    [
      { q: "Can I convert transparent PNG files to PDF?", a: "PNG files are accepted. The appearance of transparent areas in the PDF depends on how the image is placed on the PDF page." },
      { q: "Can I convert multiple PNG images at once?", a: "Yes. Add multiple PNG images and combine them into one PDF." },
      { q: "Is this PNG to PDF converter free?", a: "Yes. You can use the browser-based converter without creating an account." },
    ],
    ["image-to-pdf", "jpg-to-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "webp-to-pdf",
    "image-to-pdf",
    "WebP to PDF Converter Free Online | Tool Axiis",
    "Convert WebP to PDF Online",
    "Convert WebP images to PDF online. Add one or multiple WebP files, arrange them and choose A4, Letter or Fit page layout.",
    "WebP images are commonly used on websites, but some document portals and print workflows ask for PDF files instead. Convert supported WebP images into a PDF, combine multiple pictures and choose the page size and orientation that suit your document.",
    [
      "Select your WebP image files.",
      "Add additional images if you need a multi-page PDF.",
      "Arrange the images in the desired order.",
      "Choose A4, Letter or Fit and adjust page orientation.",
      "Convert the WebP images and download the PDF.",
    ],
    [
      { q: "Can I convert WebP images to PDF?", a: "Yes. WebP is one of the image formats supported by this converter." },
      { q: "Can I combine multiple WebP files into one PDF?", a: "Yes. Add multiple supported WebP images and arrange them before conversion." },
      { q: "Do I need to install a WebP converter?", a: "No. The conversion runs in your browser, so no separate converter installation is required." },
    ],
    ["image-to-pdf", "png-to-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "combine-images-into-one-pdf",
    "image-to-pdf",
    "Combine Images into One PDF Online | Tool Axiis",
    "Combine Multiple Images into One PDF",
    "Combine multiple JPG, PNG and WebP images into one PDF. Arrange the images, choose page settings and download a single document.",
    "When photos or screenshots are saved as separate files, sharing them one by one can be inconvenient. Combine supported images into a single PDF instead. You can control their order and choose A4, Letter or Fit page sizing before creating the document.",
    [
      "Select all JPG, PNG or WebP images you want to combine.",
      "Reorder the images to set the PDF page sequence.",
      "Choose the page size and orientation.",
      "Adjust margins if required.",
      "Create and download the combined PDF.",
    ],
    [
      { q: "Can I combine different image formats in one PDF?", a: "Yes. You can combine supported JPG, PNG and WebP images in the same PDF." },
      { q: "Will each image become a separate PDF page?", a: "The converter places the selected images into the PDF as pages, following the order you set." },
      { q: "Can I change the image order?", a: "Yes. Arrange the images before starting the conversion." },
    ],
    ["image-to-pdf", "multiple-images-to-pdf", "batch-image-to-pdf"],
  ),

  makePage(
    "merge-jpg-to-pdf",
    "image-to-pdf",
    "Merge JPG Images into One PDF | Tool Axiis",
    "Merge JPG Files into One PDF",
    "Merge multiple JPG files into one PDF document. Reorder photos, select page size and orientation, and download the combined file.",
    "If you have several JPG photos or scanned pages, you can place them together in one PDF rather than managing separate image files. Add the JPGs, arrange the sequence and select the page layout before converting.",
    [
      "Add the JPG files you want to merge.",
      "Arrange them in the order they should appear.",
      "Choose A4, Letter or Fit page size.",
      "Select portrait or landscape orientation and set margins.",
      "Convert the images into one PDF and download it.",
    ],
    [
      { q: "Does merging JPG files create one PDF or separate PDFs?", a: "The converter combines the selected images into one PDF document." },
      { q: "Can I rearrange JPG files before merging?", a: "Yes. Set the image order before conversion so the PDF pages follow your chosen sequence." },
      { q: "Can I merge JPG files with PNG images?", a: "The converter accepts JPG, PNG and WebP, so supported formats can be combined in one PDF." },
    ],
    ["jpg-to-pdf", "combine-images-into-one-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "multiple-images-to-pdf",
    "image-to-pdf",
    "Multiple Images to PDF Converter | Tool Axiis",
    "Convert Multiple Images to One PDF",
    "Turn multiple JPG, PNG and WebP images into a single PDF. Reorder images and choose A4, Letter or Fit page dimensions.",
    "Create a multi-page PDF from a collection of images. This is useful for photo sets, receipts, class notes and scanned pages. Add your supported image files, arrange their order and configure the PDF page layout before downloading.",
    [
      "Select multiple JPG, PNG or WebP images.",
      "Review the selected images and change their order if needed.",
      "Choose A4, Letter or Fit page size.",
      "Set orientation and margins.",
      "Create one PDF containing your images.",
    ],
    [
      { q: "How many images can I add?", a: "The current workspace allows up to 100 images, with a 30 MB limit per image." },
      { q: "Can I mix JPG, PNG and WebP images?", a: "Yes. All three supported formats can be included in the same conversion." },
      { q: "Can I create a separate PDF for every image?", a: "This workspace combines the selected images into one PDF; it is designed for a single combined document." },
    ],
    ["image-to-pdf", "combine-images-into-one-pdf", "batch-image-to-pdf"],
  ),

  makePage(
    "batch-image-to-pdf",
    "image-to-pdf",
    "Batch Image to PDF Converter Online | Tool Axiis",
    "Convert Images to PDF in a Batch",
    "Add a batch of JPG, PNG and WebP images and combine them into one PDF. Arrange pages and choose page layout settings online.",
    "Prepare a group of image files together instead of converting them individually. The current image-to-PDF workspace accepts multiple supported images in one session and combines them into a single PDF. Arrange the pages and set the paper layout before conversion.",
    [
      "Select a batch of JPG, PNG or WebP images.",
      "Wait for the image list and previews to load.",
      "Arrange the files in the required page order.",
      "Set page size, orientation and margins.",
      "Convert the batch into one PDF document.",
    ],
    [
      { q: "Does batch conversion create multiple PDF files?", a: "The current workspace combines the selected image batch into one PDF document, rather than creating a separate PDF for each image." },
      { q: "What image formats are accepted?", a: "The workspace supports JPG/JPEG, PNG and WebP." },
      { q: "Can I remove an image from the batch?", a: "Yes. You can remove selected images or clear the list before starting the conversion." },
    ],
    ["multiple-images-to-pdf", "combine-images-into-one-pdf", "image-to-pdf"],
  ),

  makePage(
    "photo-to-pdf",
    "image-to-pdf",
    "Photo to PDF Converter Free Online | Tool Axiis",
    "Convert Photos to PDF",
    "Convert JPG, PNG and WebP photos into a PDF online. Combine multiple photos, arrange them and choose a page size.",
    "Put your digital photos into a PDF for sharing, printing or document submission. Add supported photo files from your device, arrange them in the desired order and choose a page layout. Multiple photos can be combined into one PDF document.",
    [
      "Choose the photos you want to include.",
      "Add supported JPG, PNG or WebP files.",
      "Arrange the photos in the correct order.",
      "Choose page size, orientation and margins.",
      "Convert and download your photo PDF.",
    ],
    [
      { q: "Can I convert phone photos to PDF?", a: "Yes, if the photos are in a supported JPG, PNG or WebP format." },
      { q: "Can I put several photos on separate PDF pages?", a: "Yes. Add multiple photos and the converter places them into the PDF in the order you choose." },
      { q: "Can I choose A4 for a photo PDF?", a: "Yes. A4 and Letter page sizes are available, as well as Fit." },
    ],
    ["image-to-pdf", "jpg-to-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "screenshot-to-pdf",
    "image-to-pdf",
    "Screenshot to PDF Converter Online | Tool Axiis",
    "Convert Screenshots to PDF",
    "Convert supported screenshot images in JPG or PNG format to PDF. Combine multiple screenshots and arrange their page order.",
    "Screenshots are often saved as PNG or JPG images. Convert supported screenshots into a PDF when you need to share a conversation, instructions, receipts or reference material as one document. Add multiple screenshots and arrange their order before conversion.",
    [
      "Save or locate your screenshots as JPG or PNG files.",
      "Select one or multiple screenshots.",
      "Arrange the screenshots in the order you want.",
      "Choose A4, Letter or Fit page sizing.",
      "Convert the screenshots into a PDF.",
    ],
    [
      { q: "Can I convert screenshots to PDF?", a: "Yes. Screenshots saved as supported JPG or PNG images can be added to the image-to-PDF converter." },
      { q: "Can I combine several screenshots?", a: "Yes. Add multiple screenshots and combine them into one multi-page PDF." },
      { q: "Does the tool capture screenshots from my screen?", a: "No. Select screenshot image files that are already saved on your device." },
    ],
    ["png-to-pdf", "multiple-images-to-pdf", "image-to-pdf"],
  ),

  makePage(
    "scan-image-to-pdf",
    "image-to-pdf",
    "Scanned Image to PDF Converter | Tool Axiis",
    "Convert Scanned Images to PDF",
    "Combine scanned JPG, PNG or WebP page images into a PDF. Arrange scanned pages and choose A4, Letter or Fit page sizing.",
    "If your scanner or phone has saved document pages as image files, combine those pages into one PDF for easier sharing and printing. Add the supported scanned images, arrange their sequence and choose the page layout that fits your document.",
    [
      "Select the scanned pages saved as JPG, PNG or WebP images.",
      "Add all pages that belong in the document.",
      "Arrange the scans in reading order.",
      "Choose A4, Letter or Fit page size.",
      "Create and download the scanned-pages PDF.",
    ],
    [
      { q: "Can I turn scanned images into one PDF?", a: "Yes. Add supported scanned image files and combine them into one PDF document." },
      { q: "Does this tool scan paper documents using a camera?", a: "No. It converts image files that have already been scanned or photographed." },
      { q: "Can I choose A4 for scanned pages?", a: "Yes. Select A4 page size before converting." },
    ],
    ["image-to-pdf", "multiple-images-to-pdf", "image-to-a4-pdf"],
  ),

  makePage(
    "image-to-a4-pdf",
    "image-to-pdf",
    "Image to A4 PDF Converter Online | Tool Axiis",
    "Convert Images to A4 PDF",
    "Convert JPG, PNG and WebP images to an A4-sized PDF. Combine multiple images and choose portrait or landscape orientation.",
    "A4 is a common paper size for forms, reports and printed documents. Use this page to place supported images into an A4 PDF. Add one or more images, arrange their order and select portrait or landscape orientation before creating the file.",
    [
      "Add JPG, PNG or WebP images.",
      "Arrange the images in the desired order.",
      "Choose A4 as the PDF page size.",
      "Select portrait or landscape orientation and adjust margins.",
      "Convert and download the A4 PDF.",
    ],
    [
      { q: "Can I convert multiple images into an A4 PDF?", a: "Yes. Add multiple supported images and create a multi-page A4 PDF." },
      { q: "Can I choose A4 portrait or landscape?", a: "Yes. The workspace provides portrait and landscape orientation options." },
      { q: "Will the image be stretched to fill A4?", a: "The page layout uses the selected page size and fit behavior; review the output to make sure it matches your intended layout." },
    ],
    ["image-to-pdf", "image-to-letter-pdf", "multiple-images-to-pdf"],
  ),

  makePage(
    "image-to-letter-pdf",
    "image-to-pdf",
    "Image to Letter Size PDF Converter | Tool Axiis",
    "Convert Images to Letter Size PDF",
    "Create a Letter-sized PDF from JPG, PNG and WebP images. Combine multiple pictures and select portrait or landscape orientation.",
    "Letter is a common paper size in the United States and some other document workflows. Convert supported images into a Letter-sized PDF, arrange multiple pages and select portrait or landscape orientation to prepare a document for sharing or printing.",
    [
      "Select JPG, PNG or WebP images.",
      "Arrange the image sequence.",
      "Choose Letter as the PDF page size.",
      "Set portrait or landscape orientation and margins.",
      "Create and download the Letter-sized PDF.",
    ],
    [
      { q: "Can I create a Letter-size PDF from images?", a: "Yes. Select Letter in the page-size options before converting." },
      { q: "Can I combine multiple images in a Letter PDF?", a: "Yes. Multiple supported images can be combined into one PDF." },
      { q: "Is Letter the same as A4?", a: "No. Letter and A4 are different paper dimensions. Choose the one required for your document." },
    ],
    ["image-to-pdf", "image-to-a4-pdf", "multiple-images-to-pdf"],
  ),

  // ==================== PDF TO JPG ====================

  makePage(
    "pdf-to-jpg",
    "pdf-to-jpg",
    "PDF to JPG Converter Free Online | Tool Axiis",
    "Convert PDF to JPG Online",
    "Convert PDF pages to JPG images online for free. Choose pages and render scale, adjust JPG quality, preview results and download images or a ZIP.",
    "Turn PDF pages into JPG images that are easy to view, share or use in other documents. Add one or more PDF files, convert every page or select specific pages, and adjust the render scale and JPG quality. Preview the generated images, download pages individually or collect them in a ZIP file.",
    [
      "Select one or more PDF files.",
      "Choose all pages or enter the page numbers you need.",
      "Set the render scale and JPG image quality.",
      "Start conversion and review the generated page previews.",
      "Download individual JPG files or download them together as a ZIP.",
    ],
    [
      { q: "Can I convert every page of a PDF to JPG?", a: "Yes. Choose all pages to render the complete PDF as separate JPG images." },
      { q: "Can I convert only selected PDF pages?", a: "Yes. You can enter specific page numbers instead of converting the entire document." },
      { q: "Can I control JPG quality?", a: "Yes. The JPG workspace includes an adjustable image-quality setting." },
      { q: "Can I download all JPG pages together?", a: "Yes. Download individual images or use the ZIP download for the converted pages." },
    ],
    ["pdf-to-jpeg", "pdf-to-jpg-high-resolution", "convert-all-pdf-pages-to-jpg"],
  ),

  makePage(
    "pdf-to-jpeg",
    "pdf-to-jpg",
    "PDF to JPEG Converter Free Online | Tool Axiis",
    "Convert PDF to JPEG Online",
    "Convert PDF pages into JPEG images online. Select pages, adjust render scale and image quality, then download JPG files or a ZIP.",
    "JPEG is another name for the JPG image format. Convert PDF pages into JPEG images, choose which pages to render and adjust the output scale and quality. The converter displays previews so you can check the images before downloading them.",
    [
      "Add your PDF file.",
      "Choose all pages or specify selected page numbers.",
      "Adjust render scale and JPEG quality.",
      "Convert the selected pages and preview the results.",
      "Download JPEG images individually or as a ZIP archive.",
    ],
    [
      { q: "Is JPEG the same as JPG?", a: "Yes. JPEG and JPG are two common extensions for the same image format." },
      { q: "Can I select particular PDF pages?", a: "Yes. Enter the page numbers you want to convert." },
      { q: "Can I change JPEG quality?", a: "Yes. You can adjust the JPG/JPEG output quality in the converter." },
    ],
    ["pdf-to-jpg", "high-quality-pdf-to-jpg", "pdf-to-jpg-zip"],
  ),

  makePage(
    "convert-pdf-to-jpg-online",
    "pdf-to-jpg",
    "Convert PDF to JPG Online Free | Tool Axiis",
    "Convert a PDF File to JPG Images",
    "Use this free online PDF to JPG converter to render PDF pages as images. Select pages, adjust scale and quality, and download the results.",
    "Convert a PDF document into image files directly in your browser. Choose whether to render every page or only selected pages, then adjust the output scale and JPG quality. You can inspect the previews and save the resulting images one by one or together in a ZIP.",
    [
      "Upload a PDF from your device.",
      "Select all pages or specify the pages to convert.",
      "Choose the render scale and JPG quality.",
      "Run the conversion and check the previews.",
      "Download the JPG images or ZIP file.",
    ],
    [
      { q: "Do I need desktop software to convert PDF to JPG?", a: "No. You can use the converter in a supported web browser." },
      { q: "Can I convert a multi-page PDF?", a: "Yes. The converter can render all pages or selected pages from a PDF." },
      { q: "Can I download the converted images as a ZIP?", a: "Yes. A ZIP download is available for the generated JPG images." },
    ],
    ["pdf-to-jpg", "pdf-to-jpeg", "pdf-to-jpg-zip"],
  ),

  makePage(
    "pdf-to-jpg-high-resolution",
    "pdf-to-jpg",
    "PDF to High Resolution JPG Converter | Tool Axiis",
    "Convert PDF to High Resolution JPG",
    "Render PDF pages as higher-resolution JPG images by choosing a larger conversion scale. Adjust JPG quality and download individual images or a ZIP.",
    "When a PDF page needs to be viewed or reused as a larger image, the render scale matters. This converter lets you increase the scale up to the available 4x setting and adjust JPG quality. Larger render settings can produce bigger images and files, so check the previews and file sizes before downloading.",
    [
      "Add the PDF you want to convert.",
      "Select all pages or enter specific page numbers.",
      "Choose a larger render scale for more image pixels.",
      "Adjust JPG quality and start conversion.",
      "Preview and download the generated images.",
    ],
    [
      { q: "Can I increase the resolution of a JPG rendered from PDF?", a: "Yes. Increase the render scale in the converter, up to its available 4x setting. This renders the PDF page to more pixels; it does not restore detail that is absent from the source PDF." },
      { q: "Does a higher render scale create larger files?", a: "Usually. More image pixels can increase output dimensions and file size." },
      { q: "Can I still control JPG compression quality?", a: "Yes. The JPG quality setting can be adjusted separately from the render scale." },
    ],
    ["pdf-to-jpg", "pdf-to-jpg-hd", "high-quality-pdf-to-jpg"],
  ),

  makePage(
    "pdf-to-jpg-hd",
    "pdf-to-jpg",
    "PDF to HD JPG Converter Online | Tool Axiis",
    "Convert PDF Pages to HD JPG Images",
    "Render PDF pages as larger JPG images using the converter's scale control. Adjust JPG quality and download page images separately or in a ZIP.",
    "For a larger JPG rendition of a PDF page, choose a higher render scale before conversion. The available scale control goes up to 4x, and you can also set JPG quality. The final dimensions depend on the PDF page size and the scale selected.",
    [
      "Select a PDF file.",
      "Choose the pages to convert.",
      "Increase the render scale for larger output dimensions.",
      "Set the JPG quality and convert.",
      "Review the previews and download your HD-sized JPG images.",
    ],
    [
      { q: "What does HD mean when converting PDF to JPG?", a: "Here, it refers to rendering the PDF page at a larger pixel size by increasing the scale. The actual dimensions depend on the source PDF page." },
      { q: "Is there an HD button?", a: "Use the render-scale control to choose a larger output scale, up to the available 4x setting." },
      { q: "Will HD conversion make a blurry source PDF sharp?", a: "No. Increasing render dimensions cannot recreate detail that is missing from the original PDF." },
    ],
    ["pdf-to-jpg", "pdf-to-jpg-high-resolution", "high-quality-pdf-to-jpg"],
  ),

  makePage(
    "high-quality-pdf-to-jpg",
    "pdf-to-jpg",
    "High Quality PDF to JPG Converter | Tool Axiis",
    "Convert PDF to High Quality JPG",
    "Convert PDF pages to JPG and adjust image quality from the available quality control. Choose pages, preview output and download JPGs or a ZIP.",
    "The JPG quality setting affects the balance between image appearance and file size. Use this page to render PDF pages as JPG images and choose an output quality that suits your needs. You can also change render scale when you need different image dimensions.",
    [
      "Add a PDF file.",
      "Select all pages or specify the pages you need.",
      "Set JPG quality using the quality control.",
      "Choose a render scale and start conversion.",
      "Check the previews and download your JPG images.",
    ],
    [
      { q: "Can I control the quality of PDF to JPG conversion?", a: "Yes. The converter provides an adjustable JPG quality setting from 50% to 100%." },
      { q: "Does higher JPG quality increase file size?", a: "Higher JPG quality commonly produces larger files, although the final size also depends on page content and dimensions." },
      { q: "Can I change both quality and dimensions?", a: "Yes. JPG quality and render scale are separate controls in the converter." },
    ],
    ["pdf-to-jpg", "pdf-to-jpeg", "pdf-to-jpg-high-resolution"],
  ),

  makePage(
    "pdf-to-jpg-zip",
    "pdf-to-jpg",
    "PDF to JPG ZIP Converter | Tool Axiis",
    "Convert PDF to JPG and Download ZIP",
    "Convert PDF pages to JPG images and download the results together in a ZIP file. Select pages, set scale and JPG quality, and preview images.",
    "A multi-page PDF can produce many separate JPG files. Instead of saving each image one at a time, use the ZIP download to collect the converted pages into one archive. Choose the pages, scale and JPG quality before conversion.",
    [
      "Select one or more PDF files.",
      "Choose all pages or selected page numbers.",
      "Set render scale and JPG quality.",
      "Convert the pages and wait for the previews.",
      "Choose the ZIP download to save the JPG images together.",
    ],
    [
      { q: "Can I download all converted JPG files in one ZIP?", a: "Yes. The workspace provides a ZIP download for the generated JPG images." },
      { q: "Can I choose which pages go into the ZIP?", a: "Yes. Select all pages or specify page numbers before converting." },
      { q: "Can I also download one JPG separately?", a: "Yes. Individual page downloads are available alongside the ZIP option." },
    ],
    ["pdf-to-jpg", "convert-all-pdf-pages-to-jpg", "pdf-to-jpeg"],
  ),

  makePage(
    "convert-all-pdf-pages-to-jpg",
    "pdf-to-jpg",
    "Convert All PDF Pages to JPG Online | Tool Axiis",
    "Convert Every PDF Page to JPG",
    "Turn every page of a PDF into a separate JPG image. Adjust scale and quality, preview the pages and download them individually or in a ZIP.",
    "If you need image files for an entire PDF document, select the all-pages option to render each page as a separate JPG. The converter shows the generated page previews and provides individual downloads as well as a ZIP archive.",
    [
      "Choose the PDF file.",
      "Select the option to convert all pages.",
      "Set the JPG render scale and quality.",
      "Start conversion and review each page preview.",
      "Download individual JPG pages or the complete ZIP.",
    ],
    [
      { q: "Does this convert every page in a multi-page PDF?", a: "Yes. Choose all pages to render every page in the selected PDF." },
      { q: "Will all pages be saved as one JPG?", a: "No. Each PDF page is rendered as its own JPG image. You can collect the images in a ZIP file." },
      { q: "Can I adjust output quality for all pages?", a: "Yes. The selected JPG quality and render scale are applied to the conversion." },
    ],
    ["pdf-to-jpg", "pdf-to-jpg-zip", "pdf-to-jpg-single-page"],
  ),

  makePage(
    "extract-jpg-from-pdf",
    "pdf-to-jpg",
    "Extract JPG Pages from PDF Online | Tool Axiis",
    "Extract JPG Images from PDF Pages",
    "Render selected PDF pages as JPG image files. Choose pages, adjust scale and quality, then download the generated images.",
    "Use this tool when you need JPG versions of pages from a PDF document. Select the pages you want to render, adjust the image scale and JPG quality, and download the resulting page images. This converts PDF pages into JPGs; it does not extract original embedded image objects from inside the PDF.",
    [
      "Add the PDF document.",
      "Enter the page numbers you want as JPG images, or choose all pages.",
      "Adjust render scale and JPG quality.",
      "Convert and inspect the page previews.",
      "Download the JPG page images individually or as a ZIP.",
    ],
    [
      { q: "Does this extract original embedded photos from a PDF?", a: "No. It renders PDF pages as JPG images. It does not separately extract original embedded image objects." },
      { q: "Can I render only one page?", a: "Yes. Enter the page number you want to convert." },
      { q: "Can I download several extracted page images together?", a: "Yes. Use the ZIP download to collect the generated JPG page images." },
    ],
    ["pdf-to-jpg", "pdf-to-jpg-single-page", "pdf-to-jpg-zip"],
  ),

  makePage(
    "pdf-to-jpg-single-page",
    "pdf-to-jpg",
    "Convert Single PDF Page to JPG | Tool Axiis",
    "Convert a Single PDF Page to JPG",
    "Convert a specific page of a PDF into a JPG image. Enter the page number, choose scale and quality, and download the result.",
    "You do not always need to convert an entire PDF. If you only need one page as an image, enter its page number in the page-selection field. Choose the render scale and JPG quality, then preview and download that page.",
    [
      "Select the PDF document.",
      "Enter the page number you want to convert.",
      "Choose the render scale and JPG quality.",
      "Start conversion and check the preview.",
      "Download the JPG image.",
    ],
    [
      { q: "Can I convert just one page from a PDF?", a: "Yes. Enter the page number you want to render instead of selecting all pages." },
      { q: "Can I choose a different page later?", a: "Yes. Change the selected page number and run another conversion." },
      { q: "Can I set the JPG quality for one page?", a: "Yes. The JPG quality control is available for selected-page conversions too." },
    ],
    ["pdf-to-jpg", "convert-all-pdf-pages-to-jpg", "pdf-to-jpg-high-resolution"],
  ),

  makePage(
    "pdf-to-jpg-no-upload",
    "pdf-to-jpg",
    "PDF to JPG Without Uploading Files | Tool Axiis",
    "Convert PDF to JPG Without Uploading",
    "Convert PDF pages to JPG in your browser without sending your documents to our conversion server. Select pages, adjust output and download images.",
    "PDF documents can contain personal or business information. This browser-based converter processes the selected PDF locally in your browser rather than uploading it to our server for conversion. Choose the pages, render scale and JPG quality, then download the resulting images.",
    [
      "Open the PDF to JPG converter in your browser.",
      "Select a PDF file from your device.",
      "Choose all pages or specific page numbers.",
      "Set render scale and JPG quality.",
      "Convert locally and download the generated JPG images.",
    ],
    [
      { q: "Are my PDF files uploaded to a server?", a: "The PDF conversion is performed locally in your browser; the selected document is not sent to our server for conversion." },
      { q: "Can I convert private documents?", a: "You can use the local browser-based workflow for documents you choose to process. Keep in mind that browser extensions and the device itself are outside the converter's control." },
      { q: "Can I download the images as a ZIP?", a: "Yes. The converter supports individual image downloads and a ZIP download." },
    ],
    ["pdf-to-jpg", "pdf-to-png-no-upload", "pdf-to-jpg-zip"],
  ),

  // ==================== PDF TO PNG ====================

  makePage(
    "pdf-to-png",
    "pdf-to-png",
    "PDF to PNG Converter Free Online | Tool Axiis",
    "Convert PDF to PNG Online",
    "Convert PDF pages to PNG images online for free. Select pages, adjust render scale, preview results and download PNG files or a ZIP.",
    "Convert PDF pages into PNG images for use in presentations, documents, graphics and other projects. Add one or more PDFs, select all pages or specific page numbers, and choose the render scale. Preview the generated PNG files, download them individually or save them together in a ZIP.",
    [
      "Select one or more PDF files.",
      "Choose all pages or enter the page numbers to convert.",
      "Set the render scale for the PNG output.",
      "Start conversion and review the generated previews.",
      "Download PNG images individually or together in a ZIP.",
    ],
    [
      { q: "Can I convert every page of a PDF to PNG?", a: "Yes. Select all pages to render each page as a separate PNG image." },
      { q: "Can I convert only selected PDF pages?", a: "Yes. Enter the page numbers you want to convert." },
      { q: "Can I download all PNG pages in one ZIP?", a: "Yes. You can download individual PNG files or use the ZIP download." },
      { q: "Can I choose PNG image dimensions?", a: "You can adjust the render scale. The resulting pixel dimensions depend on the PDF page dimensions and selected scale." },
    ],
    ["convert-pdf-to-png-online", "pdf-to-png-high-resolution", "pdf-to-png-zip"],
  ),

  makePage(
    "convert-pdf-to-png-online",
    "pdf-to-png",
    "Convert PDF to PNG Online Free | Tool Axiis",
    "Convert a PDF File to PNG Images",
    "Convert PDF pages into PNG files in your browser. Choose pages, adjust render scale, preview the results and download PNG images or a ZIP.",
    "Turn a PDF document into PNG image files without installing a desktop converter. Choose which pages to render and adjust the scale to control the output dimensions. Review the previews and download the images separately or together.",
    [
      "Add a PDF from your device.",
      "Select all pages or specify page numbers.",
      "Choose the PNG render scale.",
      "Convert and check the page previews.",
      "Download the PNG images or ZIP archive.",
    ],
    [
      { q: "Do I need to install software to convert PDF to PNG?", a: "No. The conversion runs in your browser." },
      { q: "Can I convert a multi-page PDF?", a: "Yes. Convert all pages or select particular page numbers." },
      { q: "Can I download the PNG images together?", a: "Yes. Use the ZIP download to collect the generated page images." },
    ],
    ["pdf-to-png", "pdf-to-png-zip", "convert-all-pdf-pages-to-png"],
  ),

  makePage(
    "pdf-to-png-high-resolution",
    "pdf-to-png",
    "PDF to High Resolution PNG Converter | Tool Axiis",
    "Convert PDF to High Resolution PNG",
    "Render PDF pages as larger PNG images by increasing the conversion scale up to the available 4x setting. Preview and download the results.",
    "When you need a larger PNG rendition of a PDF page, increase the render scale before conversion. The workspace supports scale settings up to 4x, subject to canvas safety limits. Larger output dimensions can use more memory and produce larger files.",
    [
      "Select the PDF document.",
      "Choose all pages or select specific pages.",
      "Increase the render scale for larger PNG dimensions.",
      "Start conversion and review the previews.",
      "Download individual PNG files or the ZIP archive.",
    ],
    [
      { q: "Can I increase PNG resolution when converting a PDF?", a: "Yes. Increase the render scale up to the available 4x setting. Actual dimensions depend on the PDF page size and canvas limits." },
      { q: "Does a higher scale increase PNG file size?", a: "Usually. Larger pixel dimensions generally require more storage." },
      { q: "Can I select only some pages for high-resolution conversion?", a: "Yes. Use the page-selection field to choose the pages to render." },
    ],
    ["pdf-to-png", "lossless-pdf-to-png", "pdf-to-png-zip"],
  ),

  makePage(
    "lossless-pdf-to-png",
    "pdf-to-png",
    "Lossless PDF to PNG Converter | Tool Axiis",
    "Convert PDF Pages to PNG Format",
    "Render PDF pages as PNG images, a lossless image format. Select pages, adjust render scale and download PNG files individually or in a ZIP.",
    "PNG uses lossless image compression, which can be useful for text, diagrams and graphics rendered from PDF pages. Convert the pages you need to PNG, choose the render scale and preview the output. The PNG files preserve the rendered pixels without JPG-style lossy compression, but they are still raster images.",
    [
      "Add your PDF file.",
      "Choose all pages or select particular pages.",
      "Set the render scale.",
      "Convert the pages to PNG and inspect the previews.",
      "Download the PNG images or ZIP file.",
    ],
    [
      { q: "Is PNG a lossless image format?", a: "Yes. PNG uses lossless compression, so it does not apply JPG-style lossy image compression to the rendered pixels." },
      { q: "Does PDF to PNG preserve PDF vector data?", a: "No. This converter renders each PDF page into a raster PNG image. It does not preserve editable vector objects." },
      { q: "Can I choose the output dimensions?", a: "You can adjust render scale; output dimensions also depend on the source page size and rendering limits." },
    ],
    ["pdf-to-png", "pdf-to-png-high-resolution", "pdf-to-jpg"],
  ),

  makePage(
    "pdf-to-png-zip",
    "pdf-to-png",
    "PDF to PNG ZIP Converter | Tool Axiis",
    "Convert PDF to PNG and Download ZIP",
    "Convert PDF pages to PNG images and save them together in a ZIP file. Select pages, adjust scale and preview the output.",
    "A PDF with several pages can create many PNG files. Use the ZIP download to collect the generated images in one archive instead of saving every page separately. Choose the pages and render scale before starting the conversion.",
    [
      "Select one or more PDF files.",
      "Choose all pages or specific page numbers.",
      "Set the PNG render scale.",
      "Convert the pages and check the previews.",
      "Download the PNG images together as a ZIP.",
    ],
    [
      { q: "Can I download PDF pages as PNG in one ZIP?", a: "Yes. The workspace offers a ZIP download for the generated PNG images." },
      { q: "Can I download one PNG without the ZIP?", a: "Yes. Individual page downloads are also available." },
      { q: "Can I choose which PDF pages are included?", a: "Yes. Select all pages or enter the page numbers to convert before downloading." },
    ],
    ["pdf-to-png", "convert-all-pdf-pages-to-png", "convert-pdf-to-png-online"],
  ),

  makePage(
    "convert-all-pdf-pages-to-png",
    "pdf-to-png",
    "Convert All PDF Pages to PNG Online | Tool Axiis",
    "Convert Every PDF Page to PNG",
    "Render every page of a PDF as a separate PNG image. Choose output scale, preview the results and download pages individually or in a ZIP.",
    "When you need image files for an entire PDF, choose all pages to render each page as its own PNG. You can adjust the render scale, inspect the output previews and download individual images or a ZIP containing the converted pages.",
    [
      "Add the PDF document.",
      "Select all pages for conversion.",
      "Choose the PNG render scale.",
      "Start conversion and review the generated page previews.",
      "Download individual PNGs or the ZIP archive.",
    ],
    [
      { q: "Will every PDF page become a PNG?", a: "Yes. Selecting all pages renders each page as a separate PNG image." },
      { q: "Are all pages combined into one long PNG?", a: "No. Each PDF page is generated as an individual PNG file." },
      { q: "Can I save all page images at once?", a: "Yes. Use the ZIP download to save the generated PNG files together." },
    ],
    ["pdf-to-png", "pdf-to-png-zip", "pdf-to-png-batch"],
  ),

  makePage(
    "pdf-to-png-batch",
    "pdf-to-png",
    "Batch PDF to PNG Converter Online | Tool Axiis",
    "Convert PDF Files to PNG in a Batch",
    "Add multiple PDF files and convert their pages to PNG images. Select pages, set render scale and download generated images or a ZIP.",
    "If you have more than one PDF to process, add the files to the batch workspace. Choose the pages to render and the output scale, then convert and review the generated PNG images. Download the results individually or use the ZIP option.",
    [
      "Select the PDF files you want to process.",
      "Choose all pages or specify page numbers.",
      "Set the PNG render scale.",
      "Start the batch conversion and review the previews.",
      "Download the generated PNG images or ZIP archive.",
    ],
    [
      { q: "Can I add multiple PDF files?", a: "Yes. The workspace supports adding multiple PDF files for conversion." },
      { q: "Can I choose pages from the PDFs?", a: "Yes. Use the page-selection control to choose all pages or specific page numbers." },
      { q: "Can I download batch results together?", a: "Yes. The workspace includes a ZIP download for generated PNG images." },
    ],
    ["pdf-to-png", "pdf-to-png-zip", "convert-all-pdf-pages-to-png"],
  ),

  makePage(
    "pdf-to-png-no-upload",
    "pdf-to-png",
    "PDF to PNG Without Uploading Files | Tool Axiis",
    "Convert PDF to PNG Without Uploading",
    "Convert PDF pages to PNG locally in your browser without sending the selected document to our conversion server. Choose pages and download images.",
    "PDFs may contain private records, forms or work documents. This converter renders the selected PDF in your browser rather than uploading it to our server for conversion. Choose the pages and render scale, then download the generated PNG images.",
    [
      "Open the PDF to PNG converter.",
      "Select a PDF stored on your device.",
      "Choose all pages or specific page numbers.",
      "Set the render scale and start conversion.",
      "Download the PNG images individually or as a ZIP.",
    ],
    [
      { q: "Are my PDF files uploaded for conversion?", a: "The PDF rendering is performed locally in your browser. The selected document is not sent to our server for conversion." },
      { q: "Can I convert a private PDF?", a: "You can use the local browser-based workflow. Keep your device and browser environment secure, as those are outside the converter's control." },
      { q: "Can I convert only selected pages?", a: "Yes. Select all pages or enter the page numbers you want to render." },
    ],
    ["pdf-to-png", "pdf-to-jpg-no-upload", "pdf-to-png-zip"],
  ),
];
