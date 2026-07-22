import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = join(root, "dist-pages");

const directFiles = [
  "product.css",
  "product.js",
  "marketing-pages.css",
  "landing.css",
  "landing.js",
  "styles.css",
  "app.js"
];

const marketingFiles = [
  "product.html",
  "pricing.html",
  "contact.html",
  "landing.html",
  "marketing-pages.js"
];

const designFiles = [
  "设计图/PD-010/pd-010-desktop-p005-template-preview.png",
  "设计图/PD-016/kanboard-v0.8.29-clarity-desktop.png",
  "设计图/PD-018D/01-desktop-template-checklist-0of3.png",
  "设计图/PD-018D/05-desktop-checklist-3of3-complete.png",
  "设计图/PD-018D/08-desktop-tooltip-wip.png",
  "设计图/PD-018D/11-mobile-checklist-drawer-390.png",
  "设计图/PD-019D/01-desktop-blank-project-no-guidance.png",
  "设计图/PD-019D/03-desktop-drag-guidance-popover.png",
  "设计图/PD-019D/11-mobile-390-delete-bottom-sheet.png"
];

async function copyFile(relativePath) {
  const destination = join(output, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await cp(join(root, relativePath), destination);
}

function rewriteProductEntry(content) {
  return content.replaceAll("index.html", "app.html");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const relativePath of [...directFiles, ...designFiles]) {
  await copyFile(relativePath);
}

for (const relativePath of marketingFiles) {
  const content = await readFile(join(root, relativePath), "utf8");
  await writeFile(join(output, relativePath), rewriteProductEntry(content), "utf8");
}

const marketingHome = await readFile(join(output, "product.html"), "utf8");
await writeFile(join(output, "index.html"), marketingHome, "utf8");
const appSource = await readFile(join(root, "index.html"), "utf8");
const appWithFavicon = appSource.replace(
  "</title>",
  "</title>\n  <link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='21' fill='none' stroke='%235848e8' stroke-width='11'/%3E%3C/svg%3E\">"
);
await writeFile(join(output, "app.html"), appWithFavicon, "utf8");
await cp(join(root, "assets"), join(output, "assets"), { recursive: true });
await writeFile(join(output, ".nojekyll"), "", "utf8");

const notFoundPage = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>页面未找到｜Kanboard</title><style>body{margin:0;display:grid;min-height:100vh;place-items:center;font-family:system-ui,sans-serif;color:#15151b}main{text-align:center;padding:24px}a{color:#5848e8;font-weight:700}</style></head>
<body><main><h1>页面未找到</h1><p>这个地址不存在，返回产品首页继续浏览。</p><a href="index.html">返回产品首页</a></main></body></html>`;
await writeFile(join(output, "404.html"), notFoundPage, "utf8");

console.log(`GitHub Pages bundle ready: ${output}`);
