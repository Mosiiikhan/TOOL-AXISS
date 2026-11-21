import { formatBytes } from "@/lib/tools/utils";
import type {
  ExtractResult,
  MetaObject,
  MetaRow,
  MetaSection,
  MetaValue,
} from "./types";

const isObj = (v: unknown): v is MetaObject =>
  typeof v === "object" && v !== null && !Array.isArray(v);

export function humanize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_@]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function fmt(v: MetaValue | undefined): string {
  if (v === undefined || v === null) return "-";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") {
    return Number.isInteger(v) ? String(v) : String(Number(v.toFixed(6)));
  }
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v.every((x) => x === null || typeof x !== "object")
      ? v.map((x) => fmt(x)).join(", ")
      : JSON.stringify(v);
  }
  return JSON.stringify(v);
}

const has = (v: MetaValue | undefined): v is MetaValue =>
  v !== undefined && v !== null && v !== "";

function toNum(v: MetaValue | undefined): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function flatten(obj: MetaObject, skip?: Set<string>, prefix = ""): MetaRow[] {
  const out: MetaRow[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === "@type" || skip?.has(key)) continue;
    const label = prefix + humanize(key);
    if (isObj(value)) out.push(...flatten(value, undefined, `${label} › `));
    else out.push({ label, value: fmt(value) });
  }
  return out;
}

export function countFields(v: MetaValue): number {
  if (isObj(v)) return Object.values(v).reduce((n: number, x) => n + countFields(x), 0);
  return 1;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const aspect = (w: number, h: number) => {
  const g = gcd(w, h);
  return `${w / g}:${h / g} (${(w / h).toFixed(2)})`;
};

function clock(sec: number) {
  const s = Math.round(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, "0");
  const rr = String(r).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${rr}` : `${m}:${rr}`;
}

const withNum = (fn: (n: number) => string) => (v: MetaValue) => {
  const n = toNum(v);
  return n === null ? fmt(v) : fn(n);
};

const tDuration = withNum((n) => `${clock(n)} (${Number(n.toFixed(3))} s)`);
const tBitrate = withNum((n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)} Mb/s` : `${Math.round(n / 1000)} kb/s`,
);
const tBytes = withNum((n) => formatBytes(n));
const tHz = withNum((n) => `${Number((n / 1000).toFixed(3))} kHz`);
const tPx = withNum((n) => `${n} px`);
const tFps = withNum((n) => `${Number(n.toFixed(3))} fps`);

const tExposure = withNum((n) => (n > 0 && n < 1 ? `1/${Math.round(1 / n)} s` : `${n} s`));
const tFNumber = withNum((n) => `f/${Number(n.toFixed(1))}`);
const tMm = withNum((n) => `${Number(n.toFixed(1))} mm`);

function toDecimal(v: MetaValue | undefined, ref: MetaValue | undefined): number | null {
  let n: number | null = null;
  if (typeof v === "number") n = v;
  else if (Array.isArray(v) && v.length >= 3 && v.every((x) => typeof x === "number")) {
    const [d, m, s] = v as number[];
    n = d + m / 60 + s / 3600;
  }
  if (n === null) return null;
  const r = typeof ref === "string" ? ref.trim().toUpperCase() : "";
  return r === "S" || r === "W" ? -Math.abs(n) : n;
}

function toDms(n: number, pos: string, neg: string) {
  const a = Math.abs(n);
  const d = Math.floor(a);
  const mFull = (a - d) * 60;
  const m = Math.floor(mFull);
  const s = (mFull - m) * 60;
  return `${d}° ${m}' ${s.toFixed(2)}" ${n >= 0 ? pos : neg}`;
}

const IMAGE_SEGMENTS = ["ifd0", "exif", "interop", "gps", "ifd1", "xmp", "iptc", "icc", "jfif", "ihdr"];

function commonRows(result: ExtractResult): MetaRow[] {
  const f = result.file;
  return [
    { label: "File name", value: f.name },
    { label: "File extension", value: f.extension || "none" },
    { label: "MIME type", value: f.mime },
    {
      label: "File size",
      value: `${formatBytes(f.size)} (${f.size.toLocaleString("en-US")} bytes)`,
    },
    { label: "File format (detected)", value: result.format },
    {
      label: "Last modified (from your device)",
      value: f.lastModified ? new Date(f.lastModified).toLocaleString() : "Not available",
    },
  ];
}

function imageSections(result: ExtractResult): MetaSection[] {
  const raw = result.raw;
  const hasSegments = IMAGE_SEGMENTS.some((k) => k in raw);
  const flat: MetaObject = {};
  if (hasSegments) {
    for (const seg of ["ifd0", "exif", "interop", "gps"]) {
      const s = raw[seg];
      if (isObj(s)) Object.assign(flat, s);
    }
  } else {
    Object.assign(flat, raw);
  }

  const used = new Set<string>();
  const get = (...keys: string[]): MetaValue | undefined => {
    let found: MetaValue | undefined;
    for (const k of keys) {
      used.add(k);
      if (found === undefined && has(flat[k])) found = flat[k];
    }
    return found;
  };
  const r = (
    label: string,
    keys: string[],
    f?: (v: MetaValue) => string,
  ): MetaRow | null => {
    const v = get(...keys);
    return has(v) ? { label, value: f ? f(v) : fmt(v) } : null;
  };
  const list = (...items: (MetaRow | null)[]) =>
    items.filter((x): x is MetaRow => x !== null);

  const ihdr = isObj(raw.ihdr) ? raw.ihdr : null;
  const w = result.width;
  const h = result.height;

  const xr = toNum(get("XResolution"));
  const yr = toNum(get("YResolution"));
  const unit = get("ResolutionUnit");
  const depth = ihdr?.BitDepth ?? get("BitsPerSample");

  const basic: MetaRow[] = [
    ...commonRows(result),
    { label: "Width", value: w ? `${w} px` : "Not available" },
    { label: "Height", value: h ? `${h} px` : "Not available" },
    ...(w && h ? [{ label: "Aspect ratio", value: aspect(w, h) }] : []),
    ...list(
      r("Color space", ["ColorSpace"]),
      r("Orientation", ["Orientation"]),
      xr
        ? {
            label: "Resolution (DPI / PPI)",
            value: `${xr} × ${yr ?? xr} ${has(unit) ? fmt(unit) : ""}`.trim(),
          }
        : null,
      has(depth) ? { label: "Color depth (bits)", value: fmt(depth) } : null,
    ),
  ];

  const camera = list(
    r("Camera manufacturer", ["Make"]),
    r("Camera model", ["Model"]),
    r("Lens manufacturer", ["LensMake"]),
    r("Lens model", ["LensModel"]),
    r("Lens specification", ["LensSpecification"]),
    r("Camera serial number", ["BodySerialNumber", "SerialNumber"]),
    r("Lens serial number", ["LensSerialNumber"]),
    r("Firmware", ["FirmwareVersion", "Firmware"]),
  );

  const settings = list(
    r("ISO", ["ISO", "ISOSpeedRatings"]),
    r("Aperture (F-number)", ["FNumber"], tFNumber),
    r("Aperture value", ["ApertureValue"]),
    r("Exposure time", ["ExposureTime"], tExposure),
    r("Shutter speed value", ["ShutterSpeedValue"]),
    r("Focal length", ["FocalLength"], tMm),
    r("Focal length (35mm equivalent)", ["FocalLengthIn35mmFormat"], tMm),
    r("Exposure program", ["ExposureProgram"]),
    r("Exposure mode", ["ExposureMode"]),
    r("Metering mode", ["MeteringMode"]),
    r("Flash", ["Flash"]),
    r("White balance", ["WhiteBalance"]),
    r("Scene capture type", ["SceneCaptureType"]),
    r("Digital zoom ratio", ["DigitalZoomRatio"]),
    r("Brightness value", ["BrightnessValue"]),
    r("Exposure compensation", ["ExposureBiasValue", "ExposureCompensation"]),
  );

  const dates = list(
    r("Date and time (original)", ["DateTimeOriginal"]),
    r("Date and time (digitized)", ["CreateDate", "DateTimeDigitized"]),
    r("Date and time (metadata modified)", ["ModifyDate", "DateTime"]),
    r("Time zone offset (original)", ["OffsetTimeOriginal", "OffsetTime"]),
    r("Time zone offset (digitized)", ["OffsetTimeDigitized"]),
    r("Sub-seconds (original)", ["SubSecTimeOriginal", "SubSecTime"]),
  );

  const software = list(
    r("Software", ["Software"]),
    r("Artist", ["Artist"]),
    r("Copyright", ["Copyright"]),
    r("Image description", ["ImageDescription"]),
    r("User comment", ["UserComment"]),
    r("Title (Windows)", ["XPTitle"]),
    r("Author (Windows)", ["XPAuthor"]),
    r("Comment (Windows)", ["XPComment"]),
    r("Subject (Windows)", ["XPSubject"]),
    r("Keywords (Windows)", ["XPKeywords"]),
    r("Host computer", ["HostComputer"]),
  );

  // GPS
  const lat = toDecimal(get("GPSLatitude", "latitude"), get("GPSLatitudeRef"));
  const lon = toDecimal(get("GPSLongitude", "longitude"), get("GPSLongitudeRef"));
  const gps: MetaRow[] = [];
  if (lat !== null && lon !== null) {
    gps.push(
      { label: "Latitude (decimal)", value: lat.toFixed(6) },
      { label: "Longitude (decimal)", value: lon.toFixed(6) },
      { label: "Coordinates (decimal)", value: `${lat.toFixed(6)}, ${lon.toFixed(6)}` },
      {
        label: "Coordinates (degrees, minutes, seconds)",
        value: `${toDms(lat, "N", "S")}, ${toDms(lon, "E", "W")}`,
      },
    );
  }
  const alt = toNum(get("GPSAltitude"));
  const altRef = get("GPSAltitudeRef");
  if (alt !== null) {
    const below = altRef === 1 || (typeof altRef === "string" && /below/i.test(altRef));
    gps.push({
      label: "Altitude",
      value: `${Math.abs(alt).toFixed(1)} m ${below ? "below" : "above"} sea level`,
    });
  }
  const dir = toNum(get("GPSImgDirection"));
  if (dir !== null) gps.push({ label: "Direction", value: `${dir.toFixed(1)}°` });
  const stamp = get("GPSTimeStamp");
  const dstamp = get("GPSDateStamp");
  if (has(dstamp) || has(stamp)) {
    const t =
      Array.isArray(stamp) && stamp.every((x) => typeof x === "number")
        ? (stamp as number[]).map((x) => String(Math.floor(x)).padStart(2, "0")).join(":")
        : fmt(stamp);
    gps.push({ label: "GPS timestamp (UTC)", value: `${has(dstamp) ? fmt(dstamp) : ""} ${t}`.trim() });
  }
  ["GPSLatitudeRef", "GPSLongitudeRef", "GPSAltitudeRef", "GPSImgDirectionRef"].forEach((k) =>
    used.add(k),
  );

  // Baqi tags (EXIF / TIFF)
  const rest: MetaRow[] = [];
  for (const [k, v] of Object.entries(flat)) {
    if (used.has(k)) continue;
    if (k.startsWith("GPS")) gps.push({ label: humanize(k), value: fmt(v) });
    else rest.push({ label: humanize(k), value: fmt(v) });
  }

  const sections: MetaSection[] = [{ id: "basic", title: "Basic information", rows: basic }];
  const add = (id: string, title: string, rows: MetaRow[], extra?: Partial<MetaSection>) => {
    if (rows.length > 0 || extra?.text) sections.push({ id, title, rows, ...extra });
  };

  add("camera", "Camera information", camera);
  add("settings", "Photography settings", settings);
  add("dates", "Date and time", dates);
  add("gps", "GPS and location", gps);
  add("software", "Software, creator and description", software);
  if (isObj(raw.iptc)) add("iptc", "IPTC information", flatten(raw.iptc));
  if (typeof raw.xmp === "string" && raw.xmp.trim() !== "") {
    add("xmp", "XMP information", [], {
      text: raw.xmp,
      note: "XMP is stored as XML text. It is shown here exactly as found in the file.",
      collapsed: true,
    });
  }
  if (isObj(raw.icc)) add("icc", "Color profile (ICC)", flatten(raw.icc), { collapsed: true });
  const structure = [
    ...(isObj(raw.jfif) ? flatten(raw.jfif) : []),
    ...(isObj(raw.ihdr) ? flatten(raw.ihdr) : []),
  ];
  add("structure", "File structure (JFIF / PNG header)", structure);
  add("other", "Other EXIF and TIFF metadata", rest, { collapsed: rest.length > 25 });
  if (isObj(raw.ifd1)) {
    add("thumb", "Embedded thumbnail information", flatten(raw.ifd1), { collapsed: true });
  }
  return sections;
}

type KeySpec = [string, string, ((v: MetaValue) => string)?];

const GENERAL_KEYS: KeySpec[] = [
  ["Format", "Container format"],
  ["Format_Profile", "Container profile"],
  ["CodecID", "Container codec ID"],
  ["FileExtension", "File extension"],
  ["InternetMediaType", "MIME type"],
  ["FileSize", "File size", tBytes],
  ["Duration", "Duration", tDuration],
  ["OverallBitRate", "Overall bitrate", tBitrate],
  ["FrameRate", "Frame rate", tFps],
  ["Encoded_Date", "Encoded date"],
  ["Tagged_Date", "Tagged date"],
  ["File_Created_Date", "File created"],
  ["File_Modified_Date", "File modified"],
  ["Recorded_Date", "Recorded date"],
  ["Title", "Title"],
  ["Movie", "Movie"],
  ["Performer", "Artist"],
  ["Copyright", "Copyright"],
  ["Comment", "Comment"],
  ["Description", "Description"],
  ["Encoded_Application", "Encoded with"],
  ["Encoded_Library", "Encoder library"],
];

const VIDEO_KEYS: KeySpec[] = [
  ["Format", "Video codec"],
  ["Format_Profile", "Codec profile"],
  ["Format_Level", "Codec level"],
  ["CodecID", "Codec ID"],
  ["Width", "Width", tPx],
  ["Height", "Height", tPx],
  ["DisplayAspectRatio", "Display aspect ratio"],
  ["Rotation", "Rotation"],
  ["FrameRate", "Frame rate", tFps],
  ["FrameRate_Mode", "Frame rate mode"],
  ["BitRate", "Video bitrate", tBitrate],
  ["BitRate_Mode", "Bitrate mode"],
  ["BitDepth", "Bit depth"],
  ["ColorSpace", "Color space"],
  ["ChromaSubsampling", "Chroma subsampling"],
  ["colour_range", "Color range"],
  ["colour_primaries", "Color primaries"],
  ["transfer_characteristics", "Transfer characteristics"],
  ["matrix_coefficients", "Matrix coefficients"],
  ["HDR_Format", "HDR format"],
  ["ScanType", "Scan type"],
  ["Duration", "Duration", tDuration],
  ["StreamSize", "Stream size", tBytes],
  ["Language", "Language"],
];

const AUDIO_KEYS: KeySpec[] = [
  ["Format", "Audio codec"],
  ["Format_Profile", "Codec profile"],
  ["CodecID", "Codec ID"],
  ["Duration", "Audio duration", tDuration],
  ["BitRate", "Audio bitrate", tBitrate],
  ["BitRate_Mode", "Bitrate mode"],
  ["Channels", "Channels"],
  ["ChannelLayout", "Channel layout"],
  ["SamplingRate", "Sample rate", tHz],
  ["BitDepth", "Bit depth"],
  ["Language", "Language"],
  ["Title", "Title"],
];

const OTHER_KEYS: KeySpec[] = [
  ["Format", "Format"],
  ["CodecID", "Codec ID"],
  ["Title", "Title"],
  ["Language", "Language"],
  ["Duration", "Duration", tDuration],
];

function trackRows(track: MetaObject, keys: KeySpec[]) {
  const used = new Set<string>();
  const main: MetaRow[] = [];
  for (const [key, label, f] of keys) {
    used.add(key);
    const v = track[key];
    if (has(v)) main.push({ label, value: f ? f(v) : fmt(v) });
  }
  return { main, more: flatten(track, used) };
}

function videoSections(result: ExtractResult): MetaSection[] {
  const media = isObj(result.raw.media) ? result.raw.media : null;
  const tracks =
    media && Array.isArray(media.track) ? media.track.filter(isObj) : [];

  const sections: MetaSection[] = [
    { id: "file", title: "File information", rows: commonRows(result) },
  ];

  const counts: Record<string, number> = {};
  tracks.forEach((t, i) => {
    const type = typeof t["@type"] === "string" ? (t["@type"] as string) : "Other";
    counts[type] = (counts[type] ?? 0) + 1;
    const n = counts[type];

    if (type === "General") {
      const { main, more } = trackRows(t, GENERAL_KEYS);
      sections.push({
        id: `general-${i}`,
        title: "Basic video information",
        rows: main,
        moreRows: more,
      });
      return;
    }
    const keys = type === "Video" ? VIDEO_KEYS : type === "Audio" ? AUDIO_KEYS : OTHER_KEYS;
    const { main, more } = trackRows(t, keys);
    const title =
      type === "Video"
        ? `Video track ${n}`
        : type === "Audio"
          ? `Audio track ${n}`
          : type === "Text"
            ? `Subtitle track ${n}`
            : `${type} track ${n}`;
    sections.push({
      id: `${type.toLowerCase()}-${i}`,
      title,
      rows: main,
      moreRows: more,
      collapsed: type !== "Video" && type !== "Audio",
    });
  });
  return sections;
}

export function buildSections(result: ExtractResult): MetaSection[] {
  const base = result.kind === "image" ? imageSections(result) : videoSections(result);
  return result.extraSections ? [...base, ...result.extraSections] : base;
}

const rowsToObject = (rows: MetaRow[]) =>
  Object.fromEntries(rows.map((r) => [r.label, r.value]));

export function toJsonReport(
  result: ExtractResult,
  sections: MetaSection[],
  generatedAt: string,
): string {
  return JSON.stringify(
    {
      report: "Tool Axiis metadata report",
      generatedAt,
      kind: result.kind,
      file: result.file,
      format: result.format,
      width: result.width,
      height: result.height,
      warnings: result.warnings,
      categories: sections.map((s) => ({
        title: s.title,
        fields: rowsToObject(s.rows),
        ...(s.moreRows && s.moreRows.length > 0 ? { allFields: rowsToObject(s.moreRows) } : {}),
        ...(s.text ? { text: s.text } : {}),
      })),
      raw: result.raw,
    },
    null,
    2,
  );
}

export function toTextReport(
  result: ExtractResult,
  sections: MetaSection[],
  generatedAt: string,
): string {
  const lines: string[] = [
    "TOOL AXIIS - METADATA REPORT",
    `Generated: ${generatedAt}`,
    `File: ${result.file.name}`,
    `Type: ${result.kind === "image" ? "Image" : "Video"} (${result.format})`,
    "",
  ];
  if (result.warnings.length > 0) {
    lines.push("Notes:", ...result.warnings.map((w) => `- ${w}`), "");
  }
  const pad = (rows: MetaRow[]) =>
    rows.forEach((r) => lines.push(`${r.label.padEnd(36)} ${r.value}`));

  for (const s of sections) {
    lines.push(`=== ${s.title} ===`);
    if (s.note) lines.push(s.note);
    pad(s.rows);
    if (s.moreRows && s.moreRows.length > 0) {
      lines.push("", "--- All fields ---");
      pad(s.moreRows);
    }
    if (s.text) lines.push("", s.text);
    lines.push("");
  }
  lines.push(
    "A missing field does not prove that a file was edited or generated by AI.",
    "This report was created in your browser. Your file was not uploaded.",
  );
  return lines.join("\n");
}