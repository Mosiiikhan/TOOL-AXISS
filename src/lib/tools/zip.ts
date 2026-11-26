
import JSZip from "jszip";

export interface ZipFile {
  name: string;
  data: Blob;
}

export async function createZip(files: ZipFile[]): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("There are no files to download.");
  }

  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file.data);
  }

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/zip",
    compression: "STORE",
  });
}
