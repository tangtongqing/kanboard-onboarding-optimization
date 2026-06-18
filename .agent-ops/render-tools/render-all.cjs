const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../..");
const mermaidConfigPath = path.join(__dirname, "mermaid-config.json");
const puppeteerConfigPath = path.join(__dirname, "puppeteer-config.json");
const cssFile = path.join(__dirname, "diagram-theme.css");
const sourceDir = path.join(__dirname, "sources");
const requestedName = process.argv[2] || null;

const jobs = [
  {
    doc: "docs/03-ux-design/流程图与信息架构-PD-005.md",
    output: "设计图/PD-005",
    names: [
      "pd-005-story-map",
      "pd-005-before-blank-flow",
      "pd-005-template-main-flow",
      "pd-005-returning-user-blank-flow",
      "pd-005-error-empty-name-flow",
      "pd-005-return-template-selection-flow",
      "pd-005-switch-create-mode-flow",
      "pd-005-cancel-create-flow",
      "pd-005-mobile-preview-overflow-flow",
      "pd-005-unsaved-close-flow",
      "pd-005-information-architecture",
      "pd-005-object-relationship"
    ]
  },
  {
    doc: "docs/03-ux-design/交互状态规格-PD-006.md",
    output: "设计图/PD-006",
    names: [
      "pd-006-create-wizard-state-machine",
      "pd-006-create-mode-submit-validation",
      "pd-006-form-validation-error-flow",
      "pd-006-unsaved-close-confirmation-flow",
      "pd-006-example-card-edit-delete-state"
    ]
  },
  {
    doc: "docs/03-ux-design/设计原则与非目标-PD-007.md",
    output: "设计图/PD-007",
    names: [
      "pd-007-design-principle-trace",
      "pd-007-scope-boundary-map",
      "pd-007-decision-tradeoff-tree"
    ]
  },
  {
    doc: "docs/03-ux-design/高保真原型页面清单与设计Brief-PD-008.md",
    output: "设计图/PD-008",
    names: [
      "pd-008-prototype-flow",
      "pd-008-page-structure",
      "pd-008-state-coverage",
      "pd-008-desktop-modal-structure"
    ]
  },
  {
    doc: "docs/03-ux-design/设计系统整理-PD-009.md",
    output: "设计图/PD-009",
    names: [
      "pd-009-system-hierarchy",
      "pd-009-component-state-coverage",
      "pd-009-wizard-component-application",
      "pd-009-decision-inheritance"
    ]
  }
];

function mermaidBlocks(markdown) {
  return [...markdown.matchAll(/```mermaid\s*\r?\n([\s\S]*?)```/g)].map((match) => match[1].trim() + "\n");
}

async function main() {
  const { renderMermaid } = await import("@mermaid-js/mermaid-cli");
  const puppeteer = (await import("puppeteer")).default;
  const mermaidConfig = JSON.parse(fs.readFileSync(mermaidConfigPath, "utf8"));
  const puppeteerConfig = JSON.parse(fs.readFileSync(puppeteerConfigPath, "utf8"));
  const myCSS = fs.readFileSync(cssFile, "utf8");
  const browser = await puppeteer.launch({ headless: true, ...puppeteerConfig });
  fs.mkdirSync(sourceDir, { recursive: true });

  try {
    for (const job of jobs) {
      const docPath = path.join(workspace, job.doc);
      const blocks = mermaidBlocks(fs.readFileSync(docPath, "utf8"));
      if (blocks.length !== job.names.length) {
        throw new Error(`${job.doc}: expected ${job.names.length} Mermaid blocks, found ${blocks.length}`);
      }

      const outputDir = path.join(workspace, job.output);
      fs.mkdirSync(outputDir, { recursive: true });

      for (let index = 0; index < blocks.length; index += 1) {
        const name = job.names[index];
        if (requestedName && name !== requestedName) continue;
        const mmdPath = path.join(sourceDir, `${name}.mmd`);
        const svgPath = path.join(outputDir, `${name}.svg`);
        const pngPath = path.join(outputDir, `${name}.png`);
        fs.writeFileSync(mmdPath, blocks[index], "utf8");

        process.stdout.write(`Rendering ${name} (${index + 1}/${blocks.length})\n`);
        const options = {
          mermaidConfig,
          backgroundColor: "white",
          myCSS,
          viewport: { width: 1600, height: 1200, deviceScaleFactor: 2 }
        };
        const svg = await renderMermaid(browser, blocks[index], "svg", options);
        const png = await renderMermaid(browser, blocks[index], "png", options);
        fs.writeFileSync(svgPath, svg.data);
        fs.writeFileSync(pngPath, png.data);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
