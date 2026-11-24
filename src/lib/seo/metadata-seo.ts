
import type { SeoPage } from "../tools/types";

export const metadataSeoPages: SeoPage[] = [
  // ==================== METADATA VIEWER ====================

  {
    slug: "image-metadata-viewer",
    tool: "image-video-metadata-viewer",
    title: "Image Metadata Viewer Free | Tool Axiis",
    h1: "Image Metadata Viewer",
    description:
      "View hidden image details, EXIF data, camera settings, dates and GPS information with this free online image metadata viewer.",
    intro:
      "Images can contain more information than the picture itself. Depending on the format and the way the image was saved, this information may include the camera model, capture date, exposure settings, GPS coordinates and editing software. Upload an image to inspect the metadata available inside it. Processing happens in your browser, so your file is not uploaded.",
    steps: [
      "Open the image metadata viewer.",
      "Select or drag an image into the upload area.",
      "Wait while the tool reads the available metadata.",
      "Review the image details, EXIF fields and any GPS or camera information found.",
    ],
    faqs: [
      {
        q: "What is image metadata?",
        a: "Image metadata is information stored alongside an image, such as its dimensions, format, camera details, date, software information and sometimes GPS coordinates.",
      },
      {
        q: "Can I view EXIF data with this tool?",
        a: "Yes. When EXIF information is present and readable, the viewer can display available camera, exposure, date and location details.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No. The image is processed inside your browser and is not sent to our server.",
      },
    ],
    preset: {},
    related: [
      "exif-viewer",
      "photo-metadata-viewer",
      "metadata-remover",
    ],
    published: true,
  },

  {
    slug: "exif-viewer",
    tool: "image-video-metadata-viewer",
    title: "EXIF Viewer Free | Tool Axiis",
    h1: "Free Online EXIF Viewer",
    description:
      "Open and inspect EXIF data online for free. Check camera models, lens details, exposure settings, dates and GPS information when available.",
    intro:
      "EXIF data is information that a camera or phone may save inside a photograph. It can help you understand how and when a picture was taken. Use this free EXIF viewer to inspect the information embedded in a supported image. The results depend on which fields the original file contains.",
    steps: [
      "Choose the photo you want to inspect.",
      "Add it to the EXIF viewer.",
      "Let the browser read its available EXIF information.",
      "Review camera, lens, exposure, date and GPS fields when present.",
    ],
    faqs: [
      {
        q: "What information does EXIF contain?",
        a: "EXIF can contain camera and lens models, exposure time, aperture, ISO, focal length, capture date and GPS coordinates. Not every photo contains every field.",
      },
      {
        q: "Can I view EXIF data from an iPhone photo?",
        a: "You can inspect supported iPhone image formats, including HEIC and HEIF. The information shown depends on the metadata stored in the original photo.",
      },
      {
        q: "Why is my EXIF data missing?",
        a: "Some apps and websites remove metadata when images are shared or downloaded. Screenshots may also contain little or no camera EXIF information.",
      },
    ],
    preset: {},
    related: [
      "image-metadata-viewer",
      "view-camera-settings-in-photo",
      "remove-image-metadata",
    ],
    published: true,
  },

  {
    slug: "photo-metadata-viewer",
    tool: "image-video-metadata-viewer",
    title: "Photo Metadata Viewer Free | Tool Axiis",
    h1: "Photo Metadata Viewer",
    description:
      "Check photo metadata online for free. Inspect image details, camera information, capture dates, software tags and embedded GPS data.",
    intro:
      "A photo may contain details that are not visible when you open it normally. These details can include its dimensions, camera information, capture date and location data. Add your photo to this viewer to see which metadata fields are available. No account or software installation is needed.",
    steps: [
      "Select the photo from your device.",
      "Add it to the photo metadata viewer.",
      "Wait for the metadata inspection to finish.",
      "Read the available file, camera, date and location details.",
    ],
    faqs: [
      {
        q: "Can I check metadata on a photo from my phone?",
        a: "Yes. You can inspect supported image files from a phone or computer. The fields displayed depend on the information saved in the photo.",
      },
      {
        q: "Does every photo contain location information?",
        a: "No. GPS information is only available when location data was recorded and kept in the image file.",
      },
      {
        q: "Can I use this without installing an app?",
        a: "Yes. The viewer runs in your web browser, so you do not need to install a separate application.",
      },
    ],
    preset: {},
    related: [
      "image-metadata-viewer",
      "check-photo-metadata",
      "remove-photo-metadata-online",
    ],
    published: true,
  },

  {
    slug: "check-photo-metadata",
    tool: "image-video-metadata-viewer",
    title: "Check Photo Metadata Free | Tool Axiis",
    h1: "Check Photo Metadata Online",
    description:
      "Check what information is stored in a photo. View available EXIF data, camera details, dates, GPS tags and image properties for free.",
    intro:
      "Want to know what information is stored inside a picture before sharing it? Checking its metadata can reveal details such as the camera model, capture date, image dimensions and possibly its GPS location. Upload your photo to inspect the fields that are actually present. A missing field does not necessarily mean that a photo has been edited.",
    steps: [
      "Choose the photo you want to check.",
      "Upload it through the browser-based file selector.",
      "Allow the viewer to inspect its metadata.",
      "Check the results for camera, date, GPS and other available fields.",
    ],
    faqs: [
      {
        q: "Can metadata tell me whether a photo was edited?",
        a: "Metadata may contain software or editing information, but it cannot reliably prove whether a photo has been edited. Some applications also remove or change metadata.",
      },
      {
        q: "Can I check the original date of a photo?",
        a: "If the original capture date is stored in the file and can be read, the viewer may display it. Files shared through apps may have missing or changed dates.",
      },
      {
        q: "Does checking metadata change my photo?",
        a: "No. The viewer inspects the file and displays available information. It does not remove or modify the original photo.",
      },
    ],
    preset: {},
    related: [
      "photo-metadata-viewer",
      "exif-viewer",
      "remove-metadata-before-sharing-photos",
    ],
    published: true,
  },

  {
    slug: "view-gps-location-in-photo",
    tool: "image-video-metadata-viewer",
    title: "View GPS Location in Photo Free | Tool Axiis",
    h1: "View GPS Location in a Photo",
    description:
      "Check whether a photo contains GPS coordinates. Inspect embedded location metadata online for free, directly in your browser.",
    intro:
      "Some phones and cameras save GPS coordinates when a picture is taken. These coordinates may reveal where the photo was captured. Use this tool to inspect the GPS metadata stored in a supported image. Location information will only appear if it was recorded and has not been removed from the file.",
    steps: [
      "Select the original photo you want to inspect.",
      "Add it to the metadata viewer.",
      "Wait for the viewer to read the image information.",
      "Look for GPS or location fields in the available metadata.",
    ],
    faqs: [
      {
        q: "Can I find where a photo was taken?",
        a: "You may be able to find its recorded GPS coordinates if the camera or phone saved location information and it is still present in the image.",
      },
      {
        q: "Why does my photo show no GPS location?",
        a: "Location services may have been disabled, the camera may not have recorded coordinates, or an app may have removed the GPS metadata.",
      },
      {
        q: "Does this tool track my current location?",
        a: "No. It reads location information embedded in the selected photo. It does not need your current GPS location.",
      },
    ],
    preset: {},
    related: [
      "image-metadata-viewer",
      "exif-viewer",
      "remove-gps-location-from-photo",
    ],
    published: true,
  },

  {
    slug: "view-camera-settings-in-photo",
    tool: "image-video-metadata-viewer",
    title: "View Camera Settings in Photo Free | Tool Axiis",
    h1: "View Camera Settings in a Photo",
    description:
      "Inspect camera settings saved in a photo, including ISO, aperture, shutter speed, focal length and camera model when available.",
    intro:
      "Photographs can store useful camera settings that help explain how an image was captured. Depending on the camera and file, these may include ISO, aperture, shutter speed, focal length, lens and camera model. Upload a supported image to inspect the camera information that remains in its metadata.",
    steps: [
      "Choose the original image from your device.",
      "Open it in the metadata viewer.",
      "Allow the tool to inspect its EXIF information.",
      "Review the camera model, lens and exposure settings that are available.",
    ],
    faqs: [
      {
        q: "Can I see the ISO of a photo?",
        a: "Yes, if the ISO value is stored in the image metadata and can be read by the viewer.",
      },
      {
        q: "Can I check aperture and shutter speed?",
        a: "The viewer can display available exposure fields such as aperture and exposure time when they are included in the photo.",
      },
      {
        q: "Why are some camera settings missing?",
        a: "Some image formats, editing applications and sharing services do not preserve every EXIF field. The viewer can only show information that is present and readable.",
      },
    ],
    preset: {},
    related: [
      "exif-viewer",
      "image-metadata-viewer",
      "photo-metadata-viewer",
    ],
    published: true,
  },

  {
    slug: "heic-metadata-viewer",
    tool: "image-video-metadata-viewer",
    title: "HEIC Metadata Viewer Free | Tool Axiis",
    h1: "HEIC Metadata Viewer",
    description:
      "View metadata inside HEIC and HEIF photos online for free. Inspect available camera details, dates, GPS information and image properties.",
    intro:
      "iPhones commonly save photos in HEIC format to reduce file size. Like other image formats, a HEIC photo may contain additional information such as camera details, capture date and GPS coordinates. Add your HEIC or HEIF image to inspect the metadata that is available. The viewer reads the file in your browser without uploading it.",
    steps: [
      "Select a HEIC or HEIF photo from your device.",
      "Add the file to the metadata viewer.",
      "Wait while the browser reads the available image information.",
      "Review the metadata fields, including camera, date and GPS details when present.",
    ],
    faqs: [
      {
        q: "Can I view EXIF data from an iPhone HEIC photo?",
        a: "Yes. The metadata viewer supports HEIC and HEIF images and can display available metadata fields stored in the photo.",
      },
      {
        q: "Does every HEIC photo contain GPS information?",
        a: "No. GPS data is only available when location information was recorded and retained in the original file.",
      },
      {
        q: "Do I need to convert HEIC to JPG first?",
        a: "No. You can add a supported HEIC or HEIF photo directly to the metadata viewer.",
      },
    ],
    preset: {
      accept: "image/heic,image/heif,.heic,.heif",
    },
    related: [
      "image-metadata-viewer",
      "exif-viewer",
      "heic-to-jpg",
    ],
    published: true,
  },

  // ==================== METADATA REMOVER ====================

  {
    slug: "remove-image-metadata",
    tool: "metadata-remover",
    title: "Remove Image Metadata Free | Tool Axiis",
    h1: "Remove Image Metadata",
    description:
      "Remove hidden metadata from JPG, PNG and WebP images for free. Clean image information in your browser without uploading your files.",
    intro:
      "Image files can contain hidden information such as camera details, capture dates, GPS coordinates and software tags. If you want to share a cleaner image file, removing this information can help reduce the metadata stored with it. Add a supported JPG, PNG or WebP image and download the cleaned result. Your file stays in your browser.",
    steps: [
      "Choose a JPG, PNG or WebP image.",
      "Add it to the metadata remover.",
      "Start the metadata removal process.",
      "Download the cleaned image and keep your original file if needed.",
    ],
    faqs: [
      {
        q: "Which image formats can I clean?",
        a: "The remover supports JPG, PNG and WebP images. HEIC, HEIF and AVIF removal are not currently supported.",
      },
      {
        q: "Will removing metadata reduce image quality?",
        a: "The tool removes supported hidden data blocks without recompressing the photo. The visible image is not intentionally compressed again.",
      },
      {
        q: "Are my images uploaded?",
        a: "No. Image processing takes place inside your browser and your file is not sent to our server.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "exif-remover",
      "remove-gps-location-from-photo",
      "image-metadata-viewer",
    ],
    published: true,
  },

  {
    slug: "exif-remover",
    tool: "metadata-remover",
    title: "EXIF Remover Free | Tool Axiis",
    h1: "EXIF Remover Online",
    description:
      "Remove supported EXIF and hidden metadata from JPG, PNG and WebP images online for free. Clean photos privately in your browser.",
    intro:
      "EXIF information can reveal details about a photo, including camera settings, capture dates and sometimes GPS coordinates. When you want to share a photo without its supported hidden metadata, use this EXIF remover to clean the file. It supports JPG, PNG and WebP images, with processing performed locally in your browser.",
    steps: [
      "Select the image containing metadata you want to remove.",
      "Add the JPG, PNG or WebP file to the remover.",
      "Run the metadata cleaning process.",
      "Download the cleaned image to your device.",
    ],
    faqs: [
      {
        q: "What EXIF information can be removed?",
        a: "The tool removes supported metadata categories such as GPS location, camera information, date and time, software details and other hidden data blocks.",
      },
      {
        q: "Does an EXIF remover change the visible picture?",
        a: "The remover cleans supported metadata blocks without recompressing the image. A JPEG orientation tag may be retained when needed to prevent the photo from displaying sideways.",
      },
      {
        q: "Can I remove EXIF from HEIC photos?",
        a: "No. HEIC and HEIF removal are not currently supported. Use a supported JPG, PNG or WebP image instead.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "remove-image-metadata",
      "remove-gps-location-from-photo",
      "image-metadata-viewer",
    ],
    published: true,
  },

  {
    slug: "remove-gps-location-from-photo",
    tool: "metadata-remover",
    title: "Remove GPS Location from Photo Free | Tool Axiis",
    h1: "Remove GPS Location from a Photo",
    description:
      "Remove supported GPS and location metadata from JPG, PNG and WebP photos before sharing. Free, private and browser-based.",
    intro:
      "Some photos contain GPS coordinates that can reveal where they were captured. If you do not want to share this embedded location information, you can clean supported image files before sending them to someone else. Add a JPG, PNG or WebP photo to remove its supported hidden metadata. The tool does not edit the visible contents of the picture.",
    steps: [
      "Choose the JPG, PNG or WebP photo you want to clean.",
      "Add it to the metadata remover.",
      "Start the cleaning process to remove supported hidden metadata.",
      "Download the cleaned image before sharing it.",
    ],
    faqs: [
      {
        q: "Will this remove GPS coordinates from my photo?",
        a: "The tool removes supported GPS metadata blocks from supported image files when those fields are present.",
      },
      {
        q: "Does it blur or hide anything visible in the photo?",
        a: "No. It removes hidden metadata, not visible objects. Faces, house numbers and location signs remain part of the image.",
      },
      {
        q: "Can I remove GPS data from a HEIC image?",
        a: "HEIC and HEIF removal are not currently supported. The remover accepts JPG, PNG and WebP images.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "remove-image-metadata",
      "exif-remover",
      "view-gps-location-in-photo",
    ],
    published: true,
  },

  {
    slug: "remove-photo-metadata-online",
    tool: "metadata-remover",
    title: "Remove Photo Metadata Online Free | Tool Axiis",
    h1: "Remove Photo Metadata Online",
    description:
      "Clean hidden information from JPG, PNG and WebP photos online. Remove supported metadata for free without uploading your files.",
    intro:
      "Photos may carry hidden details even when those details are not visible on screen. These can include camera information, dates, GPS tags and software details. This online photo metadata remover helps clean supported image files before you share or upload them. Everything happens locally in your browser, with no account required.",
    steps: [
      "Open the online photo metadata remover.",
      "Select a JPG, PNG or WebP photo.",
      "Run the metadata removal process.",
      "Save the cleaned photo to your device.",
    ],
    faqs: [
      {
        q: "Can I remove photo metadata online without installing software?",
        a: "Yes. The tool runs in your browser and does not require a separate application or installation.",
      },
      {
        q: "Which photo formats are supported?",
        a: "The remover supports JPG, PNG and WebP images. It does not currently remove metadata from HEIC, HEIF or AVIF files.",
      },
      {
        q: "Is the original photo overwritten?",
        a: "No. The tool creates a cleaned output for you to download. Keep your original file separately if you need it.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "remove-image-metadata",
      "exif-remover",
      "photo-metadata-viewer",
    ],
    published: true,
  },

  {
    slug: "remove-metadata-before-sharing-photos",
    tool: "metadata-remover",
    title: "Remove Photo Metadata Before Sharing Free | Tool Axiis",
    h1: "Remove Photo Metadata Before Sharing",
    description:
      "Clean supported hidden photo metadata before sharing pictures online. Remove camera, GPS and other metadata from JPG, PNG and WebP files.",
    intro:
      "Before sharing a personal photo, you may want to check what hidden information it contains. Some image files store camera details, dates and GPS coordinates that are not visible in the picture itself. You can remove supported metadata from a JPG, PNG or WebP image here before sending it to someone or posting it online. This does not remove visible details from the picture.",
    steps: [
      "Choose the photo you plan to share.",
      "Add the supported image file to the metadata remover.",
      "Run the cleaning process.",
      "Download the cleaned copy and share that version instead of the original.",
    ],
    faqs: [
      {
        q: "Should I remove photo metadata before sharing?",
        a: "It can be useful when you do not want to share supported embedded information such as GPS coordinates, camera details or capture dates.",
      },
      {
        q: "Does removing metadata make a photo anonymous?",
        a: "No. It removes supported hidden metadata, but visible content, faces, backgrounds and other identifying details remain in the picture.",
      },
      {
        q: "Does this work with photos from social media?",
        a: "You can try supported JPG, PNG and WebP files. Some social platforms already remove or change metadata when they process an image.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "remove-image-metadata",
      "remove-gps-location-from-photo",
      "check-photo-metadata",
    ],
    published: true,
  },

  {
    slug: "remove-camera-details-from-photo",
    tool: "metadata-remover",
    title: "Remove Camera Details from Photo Free | Tool Axiis",
    h1: "Remove Camera Details from a Photo",
    description:
      "Remove supported camera and lens metadata from JPG, PNG and WebP photos. Clean hidden image details online for free.",
    intro:
      "A photo may store information about the device and camera used to capture it. Depending on the file, this can include a camera model, lens details and exposure settings. If you prefer not to share this embedded information, use the remover to clean supported metadata from your image. The tool does not alter the visible scene or intentionally recompress the photo.",
    steps: [
      "Select the JPG, PNG or WebP image you want to clean.",
      "Add it to the metadata remover.",
      "Start the removal process.",
      "Download the cleaned image and use it when sharing your photo.",
    ],
    faqs: [
      {
        q: "Can camera model information be removed from a photo?",
        a: "The remover removes supported camera metadata blocks when they are present in a supported image file.",
      },
      {
        q: "Will this remove the camera watermark visible on an image?",
        a: "No. A visible watermark is part of the picture itself. This tool removes hidden metadata, not visible text or logos.",
      },
      {
        q: "Can I remove lens and exposure details too?",
        a: "Supported camera and EXIF metadata is removed as part of the cleaning process. The exact fields depend on what is stored in the original file.",
      },
    ],
    preset: {
      accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    },
    related: [
      "exif-remover",
      "remove-image-metadata",
      "view-camera-settings-in-photo",
    ],
    published: true,
  },
];
