
"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Dropzone from "@/components/tools/Dropzone";
import Button from "@/components/ui/Button";
import type { WorkspaceProps } from "@/lib/tools/types";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  convertImagesToPdf,
  validateImageFiles,
  LIMITS,
  type PdfPageSize,
  type PdfOrientation,
  PdfToolError,
} from "@/lib/tools/pdf-tools";
import { downloadBlob, formatBytes } from "@/lib/tools/utils";

type ImageItem = {
  id: string;
  file: File;
  url: string;
};

type DownloadState = "idle" | "preparing" | "started";

type SortableImageCardProps = {
  item: ImageItem;
  index: number;
  busy: boolean;
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  onRemove: (id: string) => void;
};

function SortableImageCard({
  item,
  index,
  busy,
  pageSize,
  orientation,
  onRemove,
}: SortableImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: busy,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  const previewAspect =
    pageSize === "fit"
      ? "aspect-square"
      : orientation === "portrait"
        ? "aspect-[3/4]"
        : "aspect-[4/3]";

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group relative min-w-0 overflow-hidden rounded-xl border bg-white ${
        isDragging
          ? "border-brand-600 opacity-30 shadow-lg"
          : "border-brand-200 hover:border-brand-400 hover:shadow-md"
      } ${busy ? "opacity-60" : ""}`}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={`relative flex ${previewAspect} cursor-grab touch-none items-center justify-center overflow-hidden bg-slate-100 active:cursor-grabbing`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.url}
          alt={item.file.name}
          draggable={false}
          className="size-full select-none object-contain"
        />

        <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-lg bg-brand-600 text-xs font-bold text-white shadow-md">
          {index + 1}
        </span>

        <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          Hold to move
        </span>

        <button
          type="button"
          disabled={busy}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.file.name}`}
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white/95 text-lg font-bold text-red-600 shadow-md transition hover:bg-red-50 disabled:opacity-40"
        >
          ×
        </button>
      </div>

      <div className="min-w-0 border-t border-brand-100 p-2.5">
        <p
          className="truncate text-xs font-semibold text-brand-900"
          title={item.file.name}
        >
          {item.file.name}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          {formatBytes(item.file.size)}
        </p>
      </div>
    </article>
  );
}

export default function ImageToPdf(_props: WorkspaceProps) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PdfPageSize>("a4");
  const [orientation, setOrientation] =
    useState<PdfOrientation>("portrait");
  const [margin, setMargin] = useState(24);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [downloadState, setDownloadState] =
    useState<DownloadState>("idle");

  const [result, setResult] = useState<{
    blob: Blob;
    fileName: string;
    pageCount: number;
  } | null>(null);

  const urls = useRef<string[]>([]);
  const controller = useRef<AbortController | null>(null);
  const downloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const clearDownloadTimer = () => {
    if (downloadTimer.current) {
      clearTimeout(downloadTimer.current);
      downloadTimer.current = null;
    }
  };

  const invalidateResult = () => {
    clearDownloadTimer();
    setResult(null);
    setDownloadState("idle");
  };

  useEffect(() => {
    const tracked = urls;

    return () => {
      controller.current?.abort();
      clearDownloadTimer();
      tracked.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFiles = async (files: File[]) => {
    setError("");
    setNotice("");
    invalidateResult();

    const validation = await validateImageFiles(files, items.length);

    const next = validation.accepted.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    urls.current.push(...next.map((item) => item.url));
    setItems((current) => [...current, ...next]);

    if (validation.rejected.length) {
      setNotice(
        validation.rejected
          .map((item) => `${item.name}: ${item.reason}`)
          .join(" "),
      );
    }
  };

  const removeImage = (id: string) => {
    const item = items.find((image) => image.id === id);

    if (item) {
      URL.revokeObjectURL(item.url);
      urls.current = urls.current.filter((url) => url !== item.url);
    }

    setItems((current) => current.filter((image) => image.id !== id));
    invalidateResult();
    setError("");
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (item) => item.id === active.id,
    );
    const newIndex = items.findIndex(
      (item) => item.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) return;

    setItems((current) => arrayMove(current, oldIndex, newIndex));
    invalidateResult();
    setError("");
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const reset = () => {
    controller.current?.abort();
    controller.current = null;
    clearDownloadTimer();
    setActiveId(null);

    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];

    setItems([]);
    setResult(null);
    setDownloadState("idle");
    setProgress(0);
    setBusy(false);
    setError("");
    setNotice("");
  };

  const updatePageSize = (value: PdfPageSize) => {
    setPageSize(value);
    invalidateResult();
    setError("");
  };

  const updateOrientation = (value: PdfOrientation) => {
    setOrientation(value);
    invalidateResult();
    setError("");
  };

  const updateMargin = (value: number) => {
    setMargin(value);
    invalidateResult();
    setError("");
  };

  const createPdf = async () => {
    if (!items.length || busy) return;

    clearDownloadTimer();
    setDownloadState("idle");
    setBusy(true);
    setProgress(0);
    setError("");
    setResult(null);

    const abortController = new AbortController();
    controller.current = abortController;

    try {
      const output = await convertImagesToPdf(
        items.map((item) => item.file),
        {
          pageSize,
          orientation,
          margin,
          signal: abortController.signal,
          onProgress: setProgress,
        },
      );

      if (!abortController.signal.aborted) {
        setResult(output);
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        setError("PDF creation was cancelled.");
      } else {
        setError(
          e instanceof PdfToolError
            ? e.message
            : "Could not create the PDF. Please try again.",
        );
      }
    } finally {
      if (controller.current === abortController) {
        controller.current = null;
        setBusy(false);
      }
    }
  };

  const handleDownload = () => {
    if (!result || downloadState !== "idle") return;

    clearDownloadTimer();

    try {
      // Immediately show the loading state.
      flushSync(() => {
        setDownloadState("preparing");
      });

      // Start the browser download directly from the user's click.
      downloadBlob(result.blob, result.fileName);

      // Show success feedback shortly after the download starts.
      downloadTimer.current = setTimeout(() => {
        setDownloadState("started");
        downloadTimer.current = null;
      }, 650);
    } catch {
      setDownloadState("idle");
      setError("Could not start the download. Please try again.");
    }
  };

  const settingButton = (active: boolean) =>
    `relative rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
      active
        ? "border-brand-600 bg-brand-600 text-white shadow-md ring-2 ring-brand-200"
        : "border-brand-200 bg-white text-brand-800 hover:border-brand-400 hover:bg-brand-50"
    }`;

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className="space-y-5">
      {items.length === 0 ? (
        <Dropzone
          onFiles={handleFiles}
          accept="image/jpeg,image/png,image/webp"
          hint="JPG, PNG and WebP · Maximum 30 MB each · Up to 100 images"
        />
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* IMAGE WORKSPACE */}
          <div className="min-w-0 space-y-4">
            <section className="rounded-2xl border border-brand-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-brand-900">
                      Your images
                    </h3>

                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-700">
                      {items.length}/{LIMITS.maxImages}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Drag images to rearrange. Each image becomes one PDF page.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={reset}
                  disabled={busy}
                >
                  Clear all
                </Button>
              </div>

              {/* IMAGE GRID */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <SortableContext
                  items={items.map((item) => item.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {items.map((item, index) => (
                      <SortableImageCard
                        key={item.id}
                        item={item}
                        index={index}
                        busy={busy}
                        pageSize={pageSize}
                        orientation={orientation}
                        onRemove={removeImage}
                      />
                    ))}

                    {/* ADD MORE TILE */}
                    {items.length < LIMITS.maxImages && (
                      <label
                        className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/60 p-3 text-center transition hover:border-brand-500 hover:bg-brand-50 ${
                          busy ? "pointer-events-none opacity-50" : ""
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          disabled={busy}
                          className="sr-only"
                          onChange={(event) => {
                            const files = Array.from(
                              event.target.files ?? [],
                            );

                            if (files.length) {
                              void handleFiles(files);
                            }

                            event.target.value = "";
                          }}
                        />

                        <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="size-8"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 5v14M5 12h14"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>

                        <span className="text-sm font-bold text-brand-800">
                          Add more images
                        </span>

                        <span className="text-xs text-slate-500">
                          JPG, PNG, WebP
                        </span>
                      </label>
                    )}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeItem ? (
                    <div className="overflow-hidden rounded-xl border-2 border-brand-600 bg-white shadow-2xl">
                      <div
                        className={`relative bg-slate-100 ${
                          pageSize === "fit"
                            ? "aspect-square"
                            : orientation === "portrait"
                              ? "aspect-[3/4]"
                              : "aspect-[4/3]"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeItem.url}
                          alt={activeItem.file.name}
                          className="size-full select-none object-contain"
                        />
                        <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                          {items.findIndex(
                            (item) => item.id === activeItem.id,
                          ) + 1}
                        </span>
                      </div>
                      <p className="truncate p-2 text-xs font-semibold text-brand-900">
                        {activeItem.file.name}
                      </p>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>

              <p className="mt-4 text-center text-xs text-slate-500">
                Tip: On mobile, press and hold an image to change its position.
              </p>
            </section>

            {/* CONVERT BUTTON */}
            {!busy && !result && (
              <Button
                type="button"
                size="lg"
                className="w-full"
                disabled={items.length === 0}
                onClick={createPdf}
              >
                Convert {items.length} Images to PDF
              </Button>
            )}

            {/* CONVERSION LOADING */}
            {busy && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-200 bg-white p-7 shadow-sm">
                <div
                  className="size-11 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
                  role="status"
                  aria-label="Creating PDF"
                />
                <p className="text-sm font-semibold text-brand-900">
                  Creating your PDF...
                </p>
                <p className="text-xs text-slate-500">
                  Please wait · {progress}%
                </p>

                <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => controller.current?.abort()}
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* DOWNLOAD RESULT */}
            {result && !busy && (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm">
                {downloadState === "idle" && (
                  <>
                    <p className="font-display text-lg font-bold text-emerald-800">
                      Your PDF is ready!
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      {result.pageCount} pages · {formatBytes(result.blob.size)}
                    </p>

                    <Button
                      type="button"
                      size="lg"
                      className="mt-4 w-full"
                      onClick={handleDownload}
                    >
                      Download PDF
                    </Button>
                  </>
                )}

                {downloadState === "preparing" && (
                  <div
                    className="flex flex-col items-center justify-center py-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="size-11 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

                    <p className="mt-3 font-semibold text-emerald-900">
                      Starting download...
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      Please wait a moment.
                    </p>
                  </div>
                )}

                {downloadState === "started" && (
                  <div
                    className="flex flex-col items-center justify-center py-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 animate-[bounce_0.5s_ease-out_1]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="size-7"
                        aria-hidden="true"
                      >
                        <path
                          d="m5 12 4 4L19 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="mt-3 font-bold text-emerald-800">
                      Download started successfully!
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      Check your browser&apos;s downloads.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PDF SETTINGS SIDEBAR */}
          <aside className="space-y-4 rounded-2xl border border-brand-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-5">
            <div>
              <h3 className="font-display text-lg font-bold text-brand-900">
                PDF settings
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Customize your PDF pages.
              </p>
            </div>

            {/* PAGE SIZE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-900">
                Page size
              </label>

              <div className="grid grid-cols-2 gap-2">
                {(["a4", "letter", "fit"] as PdfPageSize[]).map(
                  (size) => {
                    const selected = pageSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={busy}
                        aria-pressed={selected}
                        onClick={() => updatePageSize(size)}
                        className={`${settingButton(selected)} ${
                          size === "fit" ? "col-span-2" : ""
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {size === "fit" ? "Fit to image" : size.toUpperCase()}
                          {selected && <span aria-hidden="true">✓</span>}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Fit to image uses the original dimensions of each image.
              </p>
            </div>

            {/* ORIENTATION */}
            {pageSize !== "fit" && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Orientation
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {(["portrait", "landscape"] as PdfOrientation[]).map(
                    (value) => {
                      const selected = orientation === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={busy}
                          aria-pressed={selected}
                          onClick={() => updateOrientation(value)}
                          className={settingButton(selected)}
                        >
                          <span className="flex flex-col items-center gap-2">
                            <span
                              className={`block rounded-sm border-2 ${
                                selected
                                  ? "border-white"
                                  : "border-brand-500"
                              } ${
                                value === "portrait"
                                  ? "h-8 w-6"
                                  : "h-6 w-8"
                              }`}
                            />

                            <span className="flex items-center gap-1.5">
                              {value}
                              {selected && (
                                <span aria-hidden="true">✓</span>
                              )}
                            </span>
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            )}

            {/* MARGIN */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="pdf-margin"
                  className="text-sm font-semibold text-brand-900"
                >
                  Page margin
                </label>

                <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-700">
                  {margin} pt
                </span>
              </div>

              <input
                id="pdf-margin"
                type="range"
                min="0"
                max="100"
                step="1"
                value={margin}
                disabled={busy}
                onChange={(event) =>
                  updateMargin(Number(event.target.value))
                }
                className="mt-4 w-full cursor-pointer accent-brand-600"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>No margin</span>
                <span>Large</span>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="rounded-xl bg-brand-50 p-3">
              <p className="text-sm font-bold text-brand-900">
                PDF summary
              </p>

              <div className="mt-2 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between gap-2">
                  <span>Images</span>
                  <span className="font-semibold text-brand-900">
                    {items.length}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span>Page size</span>
                  <span className="font-semibold capitalize text-brand-900">
                    {pageSize === "fit" ? "Original" : pageSize}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span>Orientation</span>
                  <span className="font-semibold capitalize text-brand-900">
                    {pageSize === "fit" ? "Original" : orientation}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span>Margin</span>
                  <span className="font-semibold text-brand-900">
                    {margin} pt
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {notice && (
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          {notice}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
