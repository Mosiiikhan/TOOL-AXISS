import { cpSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "node_modules/mediainfo.js/dist";
const find = (dir, test) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      const r = find(p, test);
      if (r) return r;
    } else if (test(p)) return p;
  }
};
const wasm = find(root, (p) => p.endsWith("MediaInfoModule.wasm"));
const esm = find(root, (p) => p.includes("esm-bundle") && p.endsWith("index.js"));
if (!wasm || !esm) throw new Error("mediainfo.js files not found in " + root);

mkdirSync("public/wasm", { recursive: true });
cpSync(wasm, "public/wasm/MediaInfoModule.wasm");
cpSync(esm, "public/wasm/mediainfo.js");
console.log("Copied:", wasm, "and", esm);