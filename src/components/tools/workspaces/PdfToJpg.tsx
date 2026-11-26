"use client";
import { useEffect, useRef, useState } from "react";
import PdfDropzone from "@/components/tools/PdfDropzone";
import Button from "@/components/ui/Button";
import {
convertPdfToJpg,
createZip,
PdfToolError,
type JpgPageResult,
} from "@/lib/tools/pdf-tools";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";
type ImageResult = JpgPageResult & {
id: string;
sourceName: string;
};
function parsePages(value: string): number[] | undefined {
if (!value.trim()) return undefined;
const pages = value.split(",").map((item) => Number(item.trim()));
if (pages.some((page) => !Number.isInteger(page) || page < 1)) {
throw new Error("Enter valid page numbers, e.g. 1, 3, 5.");
}
return [...new Set(pages)];
}
function getBaseName(name: string) {
return name.replace(/\.pdf$/i, "") || "document";
}
export default function PdfToJpg() {
const [files, setFiles] = useState<File[]>([]);
const [pages, setPages] = useState("");
const [scale, setScale] = useState(2);
const [quality, setQuality] = useState(85);
const [results, setResults] = useState<ImageResult[]>([]);
const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
const [pdfPreviewUrls, setPdfPreviewUrls] = useState<Record<string, string>>({});
const [progress, setProgress] = useState(0);
const [busy, setBusy] = useState(false);
const [error, setError] = useState("");
const [downloading, setDownloading] = useState<string | null>(null);
const [downloaded, setDownloaded] = useState<string[]>([]);
const controller = useRef<AbortController | null>(null);
const downloadTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
const fileInputRef = useRef<HTMLInputElement>(null);
// Create and clean up preview URLs.
useEffect(() => {
const urls: Record<string, string> = {};
results.forEach((item) => {
urls[item.id] = URL.createObjectURL(item.blob);
});
setPreviewUrls(urls);
return () => {
Object.values(urls).forEach(URL.revokeObjectURL);
};
}, [results]);

// Render the first page of each selected PDF as a small upload thumbnail.
useEffect(() => {
let active = true;
const abortController = new AbortController();
const urls: Record<string, string> = {};

const createThumbnails = async () => {
for (const file of files) {
if (abortController.signal.aborted) return;

try {
const output = await convertPdfToJpg(file, {
pages: [1],
scale: 0.65,
quality: 0.65,
signal: abortController.signal,
});
const firstPage = output.files[0];
if (!firstPage || abortController.signal.aborted) continue;

const key = `${file.name}-${file.size}-${file.lastModified}`;
urls[key] = URL.createObjectURL(firstPage.blob);
if (active) setPdfPreviewUrls({ ...urls });
} catch {
// Keep the PDF file card usable even if its thumbnail cannot be rendered.
}
}
};

setPdfPreviewUrls({});
void createThumbnails();

return () => {
active = false;
abortController.abort();
Object.values(urls).forEach(URL.revokeObjectURL);
};
}, [files]);

useEffect(() => {
return () => {
controller.current?.abort();
downloadTimers.current.forEach(clearTimeout);
};
}, []);
const handleFiles = (selected: File[]) => {
if (!selected.length) return;
controller.current?.abort();
setFiles((previous) => {
const combined = [...previous, ...selected];
return combined.filter(
(file, index, array) =>
array.findIndex(
(item) =>
item.name === file.name &&
item.size === file.size &&
item.lastModified === file.lastModified,
) === index,
);
});
setResults([]);
setProgress(0);
setDownloaded([]);
setDownloading(null);
setError("");
};
const removeFile = (index: number) => {
setFiles((previous) => previous.filter((_, i) => i !== index));
setResults([]);
setDownloaded([]);
setDownloading(null);
setError("");
setProgress(0);
};
const reset = () => {
controller.current?.abort();
controller.current = null;
setFiles([]);
setPages("");
setResults([]);
setProgress(0);
setBusy(false);
setError("");
setDownloaded([]);
setDownloading(null);
};
const convert = async () => {
if (!files.length || busy) return;
setBusy(true);
setError("");
setResults([]);
setProgress(0);
setDownloaded([]);
const abortController = new AbortController();
controller.current = abortController;
try {
const selectedPages = parsePages(pages);
const allResults: ImageResult[] = [];
const usedNames = new Map<string, number>();
let completedFiles = 0;
for (const file of files) {
if (abortController.signal.aborted) {
throw new DOMException("Conversion cancelled.", "AbortError");
}
const output = await convertPdfToJpg(file, {
pages: selectedPages,
scale,
quality: quality / 100,
signal: abortController.signal,
onProgress: (fileProgress) => {
const overallProgress = Math.round(
((completedFiles + fileProgress / 100) / files.length) * 100,
);
setProgress(overallProgress);
},
});
const originalBase = getBaseName(file.name);
const duplicateCount = usedNames.get(originalBase) ?? 0;
usedNames.set(originalBase, duplicateCount + 1);
const baseName =
duplicateCount === 0
? originalBase
: `${originalBase}-${duplicateCount + 1}`;
output.files.forEach((item, index) => {
const fileName = `${baseName}-page-${item.pageNumber}.jpg`;
allResults.push({
...item,
fileName,
sourceName: file.name,
id: `${completedFiles}-${index}-${file.lastModified}`,
});
});
completedFiles++;
setResults([...allResults]);
setProgress(Math.round((completedFiles / files.length) * 100));
}
} catch (e) {
if (e instanceof Error && e.name === "AbortError") {
setError("Conversion was cancelled.");
} else {
setError(
e instanceof PdfToolError || e instanceof Error
? e.message
: "Could not convert the PDFs. Please try again.",
);
}
} finally {
if (controller.current === abortController) {
controller.current = null;
setBusy(false);
}
}
};
const triggerDownload = (
id: string,
blob: Blob,
fileName: string,
) => {
try {
downloadBlob(blob, fileName);
setDownloading(id);
setDownloaded((previous) =>
previous.includes(id) ? previous : [...previous, id],
);
const timer = setTimeout(() => {
setDownloading((current) => (current === id ? null : current));
}, 900);
downloadTimers.current.push(timer);
} catch {
setError(`Could not start downloading ${fileName}.`);
}
};
const downloadZip = async () => {
if (!results.length || downloading) return;
setDownloading("zip");
setError("");
try {
const zip = await createZip(
results.map((item) => ({
name: item.fileName,
data: item.blob,
})),
);
downloadBlob(zip, "toolaxiis-jpg-images.zip");
setDownloaded((previous) =>
previous.includes("zip") ? previous : [...previous, "zip"],
);
} catch {
setError("Could not create the ZIP file. Please try again.");
} finally {
const timer = setTimeout(() => setDownloading(null), 900);
downloadTimers.current.push(timer);
}
};
const totalSize = results.reduce(
(total, item) => total + item.blob.size,
0,
);
return (
<div className="space-y-5">
{files.length === 0 ? (
<PdfDropzone onFiles={handleFiles} multiple />
) : (
<>
{/* Selected PDF files */}
{results.length === 0 && (
<section className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-3">
<div>
<h3 className="font-display text-lg font-bold text-brand-900">
Your PDF files
</h3>
<p className="mt-1 text-sm text-slate-500">
{files.length} {files.length === 1 ? "file" : "files"} selected
</p>
</div>
<Button
type="button"
variant="secondary"
onClick={reset}
disabled={busy}
>
Remove all
</Button>
</div>
<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
{files.map((file, index) => (
<div
key={`${file.name}-${file.lastModified}-${index}`}
className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-300 hover:shadow-md"
>
<div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-100 p-3">
{pdfPreviewUrls[`${file.name}-${file.size}-${file.lastModified}`] ? (
<img
src={pdfPreviewUrls[`${file.name}-${file.size}-${file.lastModified}`]}
alt={`Preview of ${file.name}`}
className="max-h-full max-w-full rounded-lg object-contain"
/>
) : (
<div className="grid h-full w-full place-items-center bg-red-50 text-red-600">
<svg
viewBox="0 0 24 24"
className="size-7"
fill="none"
stroke="currentColor"
strokeWidth="1.7"
strokeLinecap="round"
strokeLinejoin="round"
>
<path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
<path d="M14 3v5h5" />
<path d="M8 15h8M8 18h5" />
</svg>
</div>
)}
</div>
<div className="w-full min-w-0 p-4">
<p
title={file.name}
className="truncate text-sm font-semibold text-brand-900"
>
{file.name}
</p>
<p className="mt-1 text-xs text-slate-500">
{formatBytes(file.size)}
</p>
</div>
<button
type="button"
onClick={() => removeFile(index)}
disabled={busy}
aria-label={`Remove ${file.name}`}
className="absolute right-3 top-3 grid size-8 shrink-0 place-items-center rounded-lg bg-white/90 text-slate-500 shadow-sm transition hover:bg-red-100 hover:text-red-600 disabled:opacity-40"
>
<svg
viewBox="0 0 24 24"
className="size-4"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
>
<path d="M18 6 6 18M6 6l12 12" />
</svg>
</button>
</div>
))}
{/* Compact add more card */}
{!busy && (
<button
type="button"
onClick={() => fileInputRef.current?.click()}
className="flex min-h-[70px] items-center justify-center gap-3 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 p-3 text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
>
<span className="grid size-10 place-items-center rounded-full bg-white shadow-sm">
<svg
viewBox="0 0 24 24"
className="size-6"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
>
<path d="M12 5v14M5 12h14" />
</svg>
</span>
<span className="text-left">
<span className="block text-sm font-semibold">
Add more PDFs
</span>
<span className="block text-xs text-slate-500">
Select additional files
</span>
</span>
</button>
)}
</div>
<input
ref={fileInputRef}
type="file"
accept="application/pdf,.pdf"
multiple
className="hidden"
onChange={(e) => {
handleFiles(Array.from(e.target.files ?? []));
e.target.value = "";
}}
/>
</section>
)}
{/* Error */}
{error && (
<p
role="alert"
className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
>
{error}
</p>
)}
{/* Conversion progress */}
{busy && (
<div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm">
<div className="flex items-center justify-between text-sm font-semibold text-brand-900">
<div className="flex items-center gap-2">
<svg
className="size-5 animate-spin text-brand-600"
viewBox="0 0 24 24"
fill="none"
aria-hidden="true"
>
<circle
cx="12"
cy="12"
r="9"
stroke="currentColor"
strokeWidth="3"
className="opacity-20"
/>
<path
d="M21 12a9 9 0 0 0-9-9"
stroke="currentColor"
strokeWidth="3"
strokeLinecap="round"
/>
</svg>
<span>Converting your PDFs to JPG...</span>
</div>
<span>{progress}%</span>
</div>
<div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-100">
<div
className="h-full rounded-full bg-brand-600 transition-all duration-300"
style={{ width: `${progress}%` }}
/>
</div>
<Button
type="button"
variant="secondary"
className="mt-4"
onClick={() => controller.current?.abort()}
>
Cancel
</Button>
</div>
)}
{/* Main action: convert first, then offer the ZIP download */}
{!busy && results.length === 0 && (
<Button
type="button"
size="lg"
className="w-full"
disabled={files.length === 0}
onClick={convert}
>
Convert to JPG
</Button>
)}
{/* Results */}
{results.length > 0 && (
<section className="space-y-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
<div className="flex flex-wrap items-center justify-between gap-3">
<div>
<h3 className="font-display text-lg font-bold text-emerald-800">
Your JPG images are ready!
</h3>
<p className="mt-1 text-sm text-emerald-700">
{results.length} images converted from {files.length} PDF
{files.length === 1 ? "" : "s"}.
</p>
<p className="mt-1 text-xs text-emerald-700">
Total size: {formatBytes(totalSize)}
</p>
</div>
<Button
type="button"
variant="secondary"
onClick={reset}
disabled={busy || downloading !== null}
>
Convert more PDFs
</Button>
</div>
{!busy && (
<div className="pt-1">
<Button
type="button"
size="lg"
className="w-full"
onClick={downloadZip}
disabled={downloading !== null}
>
{downloading === "zip"
? "Preparing ZIP..."
: downloaded.includes("zip")
? "✓ Download started"
: "Download all as ZIP"}
</Button>
</div>
)}
<div
className={
results.length === 1
? "mx-auto max-w-2xl"
: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
}
>
{results.map((item) => (
<article
key={item.id}
className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm"
>
<div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 p-3">
{previewUrls[item.id] && (
<img
src={previewUrls[item.id]}
alt={`${item.sourceName}, page ${item.pageNumber}`}
className="max-h-full max-w-full rounded-lg object-contain"
/>
)}
</div>
<div className="space-y-3 p-4">
<div className="min-w-0">
<p className="truncate text-sm font-semibold text-brand-900">
{item.fileName}
</p>
<p className="truncate text-xs text-slate-500">
{item.sourceName} · Page {item.pageNumber}
</p>
<p className="mt-1 text-xs text-slate-500">
{formatBytes(item.blob.size)}
</p>
</div>
<Button
type="button"
size="md"
className="w-full"
disabled={downloading !== null}
onClick={() =>
triggerDownload(item.id, item.blob, item.fileName)
}
>
{downloading === item.id
? "Starting download..."
: downloaded.includes(item.id)
? "✓ Download started"
: "Download JPG"}
</Button>
</div>
</article>
))}
</div>
</section>
)}
{/* Optional settings at the bottom */}
<details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
<summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl p-4 transition hover:bg-slate-50 [&::-webkit-details-marker]\\:hidden">
<div>
<p className="text-sm font-semibold text-brand-900">
Advanced JPG settings
</p>
<p className="mt-1 text-xs text-slate-500">
Optional · Customize image quality and resolution
</p>
</div>
<svg
viewBox="0 0 24 24"
className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
>
<path d="m6 9 6 6 6-6" />
</svg>
</summary>
<div className="space-y-5 border-t border-slate-100 p-5">
<div>
<label
htmlFor="jpg-pages"
className="mb-2 block text-sm font-semibold text-brand-900"
>
Pages to convert
</label>
<input
id="jpg-pages"
value={pages}
onChange={(e) => setPages(e.target.value)}
disabled={busy}
placeholder="Leave empty to convert all pages (e.g. 1, 3, 5)"
className="w-full rounded-xl border border-brand-300 bg-white px-4 py-3 text-sm text-brand-900 outline-none focus:border-brand-600"
/>
<p className="mt-2 text-xs text-slate-500">
The same page selection will be applied to every PDF.
Leave empty to convert all pages.
</p>
</div>
<div>
<div className="flex justify-between text-sm font-semibold text-brand-900">
<label htmlFor="jpg-scale">Output resolution</label>
<span>{scale}x</span>
</div>
<input
id="jpg-scale"
type="range"
min="1"
max="4"
step="0.5"
value={scale}
disabled={busy}
onChange={(e) => setScale(Number(e.target.value))}
className="mt-3 w-full accent-brand-600"
/>
<p className="mt-1 text-xs text-slate-500">
Higher resolution creates larger images.
</p>
</div>
<div>
<div className="flex justify-between text-sm font-semibold text-brand-900">
<label htmlFor="jpg-quality">JPG quality</label>
<span>{quality}%</span>
</div>
<input
id="jpg-quality"
type="range"
min="50"
max="100"
step="5"
value={quality}
disabled={busy}
onChange={(e) => setQuality(Number(e.target.value))}
className="mt-3 w-full accent-brand-600"
/>
</div>
</div>
</details>
</>
)}
</div>
);
}
