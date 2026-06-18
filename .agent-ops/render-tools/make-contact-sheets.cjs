const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const workspace = path.resolve(__dirname, "../..");
const qaDir = path.join(__dirname, "qa");
const folders = ["PD-005", "PD-006", "PD-007", "PD-008", "PD-009"];
const cellWidth = 560;
const cellHeight = 400;
const columns = 3;

async function main() {
  fs.mkdirSync(qaDir, { recursive: true });

  for (const folder of folders) {
    const sourceDir = path.join(workspace, "设计图", folder);
    const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".png")).sort();
    const rows = Math.ceil(files.length / columns);
    const composites = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const input = path.join(sourceDir, file);
      const metadata = await sharp(input).metadata();
      process.stdout.write(`${folder}\t${file}\t${metadata.width}x${metadata.height}\n`);
      const thumb = await sharp(input)
        .resize(cellWidth - 32, cellHeight - 32, { fit: "inside", background: "#ffffff" })
        .extend({
          top: 16,
          bottom: 16,
          left: 16,
          right: 16,
          background: "#ffffff"
        })
        .png()
        .toBuffer();
      composites.push({
        input: thumb,
        left: (index % columns) * cellWidth,
        top: Math.floor(index / columns) * cellHeight,
        gravity: "centre"
      });
    }

    await sharp({
      create: {
        width: columns * cellWidth,
        height: rows * cellHeight,
        channels: 3,
        background: "#eef2f6"
      }
    }).composite(composites).png().toFile(path.join(qaDir, `${folder}.png`));
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
