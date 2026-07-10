const fs = require("fs");
const path = require("path");

let sharp = null;
try {
  sharp = require("sharp");
} catch {
  sharp = null;
}

let chromium = null;
try {
  ({ chromium } = require("playwright"));
} catch {
  chromium = null;
}

const outDir = __dirname;

const colors = {
  bg: "#f5f6f8",
  top: "#ffffff",
  line: "#d8dde6",
  text: "#1f2937",
  muted: "#5f6b7a",
  blue: "#2f5fbb",
  blueSoft: "#eaf1ff",
  green: "#16803c",
  greenSoft: "#ecfdf3",
  orange: "#e65100",
  orangeSoft: "#fff4e8",
  red: "#c62828",
  redSoft: "#fde8e8",
  dark: "#313131",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rect(x, y, w, h, fill = "#fff", stroke = "none", r = 0, attrs = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" ${attrs}/>`;
}

function line(x1, y1, x2, y2, stroke = colors.line, attrs = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" ${attrs}/>`;
}

function text(value, x, y, size = 14, fill = colors.text, weight = 400, attrs = "") {
  return `<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" fill="${fill}" font-weight="${weight}" ${attrs}>${esc(value)}</text>`;
}

function wrapText(value, x, y, maxChars, lineHeight, size = 14, fill = colors.text, weight = 400) {
  const words = String(value).split("");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current += word;
    }
  }
  if (current) lines.push(current);
  return lines
    .map((row, index) => text(row, x, y + index * lineHeight, size, fill, weight))
    .join("");
}

function iconDots(x, y, fill = colors.muted) {
  return [0, 7, 14]
    .map((dx) => `<circle cx="${x + dx}" cy="${y}" r="2.2" fill="${fill}"/>`)
    .join("");
}

function card(x, y, title, subtitle = "示例任务 · 今天", opts = {}) {
  const dot = opts.dot
    ? `<circle cx="${x + 196}" cy="${y + 42}" r="4" fill="${colors.orange}"/>
       <circle cx="${x + 196}" cy="${y + 42}" r="10" fill="${colors.orange}" opacity=".14"/>`
    : "";
  const hover = opts.hover ? `stroke="${colors.blue}" stroke-width="1.5"` : `stroke="${colors.line}"`;
  return `
    ${rect(x, y, 240, 112, "#fff", "none", 6, `${hover} filter="url(#shadow)"`)}
    ${text(title, x + 16, y + 32, 14, colors.text, 650)}
    ${dot}
    ${text(subtitle, x + 16, y + 58, 12, colors.muted)}
    ${rect(x + 16, y + 76, 58, 22, colors.blueSoft, "none", 4)}
    ${text("新手", x + 33, y + 91, 11, colors.blue, 650)}
    ${iconDots(x + 206, y + 88)}
  `;
}

function popover(x, y, value, w = 252, arrow = "down") {
  const arrowShape =
    arrow === "left"
      ? `<polygon points="${x},${y + 22} ${x - 8},${y + 28} ${x},${y + 34}" fill="${colors.dark}"/>`
      : `<polygon points="${x + w / 2 - 7},${y + 48} ${x + w / 2 + 7},${y + 48} ${x + w / 2},${y + 56}" fill="${colors.dark}"/>`;
  return `
    ${rect(x, y, w, 48, colors.dark, "none", 4, `filter="url(#shadowStrong)"`)}
    ${text("✕", x + w - 22, y + 19, 11, "#a6a6a6")}
    ${wrapText(value, x + 16, y + 20, 24, 16, 12, "#fff")}
    ${arrowShape}
  `;
}

function shell(content, title, width = 1440, height = 900) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity=".10"/></filter>
    <filter id="shadowStrong" x="-20%" y="-20%" width="140%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity=".22"/></filter>
  </defs>
  ${rect(0, 0, width, height, colors.bg)}
  ${text(title, 32, 42, 18, colors.text, 700)}
  ${content}
</svg>`;
}

function desktopBoard(opts = {}) {
  const panel = opts.checklist
    ? `
      ${rect(1096, 72, 304, 760, "#fff", colors.line, 8, `filter="url(#shadow)"`)}
      ${text("新手启动 Checklist", 1120, 116, 16, colors.text, 700)}
      ${text("3/3 已完成", 1120, 144, 12, colors.green, 700)}
      ${["创建真实任务", "拖动到进行中", "完成第一次编辑"].map((t, i) => `
        ${rect(1120, 174 + i * 58, 252, 40, i === 2 ? colors.greenSoft : "#f8fafc", colors.line, 4)}
        ${text("✓", 1135, 199 + i * 58, 13, colors.green, 700)}
        ${text(t, 1160, 199 + i * 58, 13, colors.text)}
      `).join("")}
    `
    : "";
  const tooltip = opts.tooltip ? popover(598, 154, "WIP 限制会提醒你避免一次推进过多任务。", 250, "down") : "";
  return `
    ${rect(0, 64, 1440, 1, colors.line)}
    ${rect(0, 0, 1440, 64, colors.top)}
    ${text("Kanboard", 32, 39, 18, colors.blue, 800)}
    ${rect(1260, 18, 118, 32, colors.blue, "none", 4)}
    ${text("创建任务", 1290, 39, 13, "#fff", 700)}
    ${rect(0, 65, 236, 835, "#fff")}
    ${text("项目向导", 32, 112, 13, colors.muted, 700)}
    ${text("新手项目创建", 32, 148, 15, colors.text, 700)}
    ${text("任务拆解优化", 32, 178, 13, colors.muted)}
    ${line(236, 65, 236, 900)}
    ${text("新手创建体验优化看板", 272, 112, 22, colors.text, 750)}
    ${text("首次核心操作轻引导 · PD-019B", 272, 140, 13, colors.muted)}
    ${[0, 1, 2].map((i) => {
      const x = 272 + i * 284;
      const names = ["待学", "进行中", "已完成"];
      return `
        ${rect(x, 184, 260, 520, "#f8fafc", colors.line, 8)}
        ${text(names[i], x + 18, 218, 14, colors.text, 700)}
        ${text(String(i === 0 ? 2 : i), x + 224, 218, 12, colors.muted, 700)}
      `;
    }).join("")}
    ${card(282, 244, opts.cardTitle || "把示例任务改成真实任务", "可拖动 · 可双击编辑", { dot: opts.dot, hover: opts.hover })}
    ${opts.secondCard === false ? "" : card(282, 376, "拆成第一个小步骤", "建议 10 分钟内完成")}
    ${card(566, 244, "补充任务验收标准", "进行中 · 1 条检查项")}
    ${card(850, 244, "项目创建完成", "已完成 · 自动保存")}
    ${panel}
    ${tooltip}
    ${opts.extra || ""}
  `;
}

function mobileShell(content, title) {
  return shell(`
    ${rect(0, 0, 390, 844, "#f6f8fb")}
    ${rect(0, 0, 390, 56, "#fff")}
    ${text("Kanboard", 18, 35, 16, colors.blue, 800)}
    ${iconDots(342, 30, colors.muted)}
    ${text(title, 18, 94, 16, colors.text, 750)}
    ${content}
  `, title, 390, 844);
}

const frames = [
  {
    file: "01-desktop-1st-drag-popover",
    title: "01 Desktop - 1st Drag Popover",
    svg: shell(desktopBoard({ hover: true, extra: popover(276, 188, "你可以把卡片向右拖动，推进任务状态。", 270) }), "01 Desktop - 1st Drag Popover"),
  },
  {
    file: "02-desktop-1st-edit-dot-popover",
    title: "02 Desktop - 1st Edit Dot & Popover",
    svg: shell(desktopBoard({ dot: true, hover: true, extra: popover(360, 188, "双击可把示例卡改成你的真实任务。", 276) }), "02 Desktop - 1st Edit Dot & Popover"),
  },
  {
    file: "03-desktop-1st-delete-modal",
    title: "03 Desktop - 1st Delete Modal",
    svg: shell(desktopBoard({
      extra: `
        ${rect(0, 0, 1440, 900, "rgba(0,0,0,.40)")}
        ${rect(540, 340, 360, 174, "#fff", colors.line, 8, `filter="url(#shadowStrong)"`)}
        ${text("彻底删除任务吗？", 566, 378, 16, colors.text, 750)}
        ${wrapText("删除会彻底移除此卡片，本地数据不可恢复。这是你第一次删除操作，确认要继续吗？", 566, 410, 24, 18, 12, colors.muted)}
        ${rect(640, 460, 104, 36, "#ebf3fc", "none", 4)}
        ${text("取消删除", 664, 483, 13, colors.blue, 700)}
        ${rect(760, 460, 104, 36, colors.redSoft, "none", 4)}
        ${text("确认删除", 784, 483, 13, colors.red, 700)}
      `,
    }), "03 Desktop - 1st Delete Modal"),
  },
  {
    file: "04-desktop-task-menu-guidance",
    title: "04 Desktop - Task Menu Guidance",
    svg: shell(desktopBoard({
      extra: `
        ${rect(482, 324, 168, 188, "#fff", colors.line, 6, `filter="url(#shadow)"`)}
        ${["编辑任务", "复制任务", "移动到进行中", "关闭任务", "删除任务"].map((item, i) => text(item, 506, 358 + i * 34, 13, i === 4 ? colors.red : colors.text)).join("")}
        ${popover(662, 354, "这里还有复制、关闭、移动等更多操作。", 270, "left")}
      `,
    }), "04 Desktop - Task Menu Guidance"),
  },
  {
    file: "05-desktop-checklist-suppressed",
    title: "05 Desktop - Checklist Suppressed",
    svg: shell(desktopBoard({
      hover: true,
      checklist: true,
      extra: `
        ${rect(264, 232, 292, 150, "none", colors.orange, 4, `stroke-dasharray="8 6" stroke-width="2"`)}
        ${rect(274, 220, 210, 28, colors.orangeSoft, colors.orange, 4)}
        ${text("Suppressed: Checklist Open", 286, 239, 12, colors.orange, 700)}
      `,
    }), "05 Desktop - Checklist Suppressed"),
  },
  {
    file: "06-desktop-tooltip-active-suppressed",
    title: "06 Desktop - Tooltip Active Suppressed",
    svg: shell(desktopBoard({
      hover: true,
      tooltip: true,
      extra: `
        ${rect(274, 220, 248, 28, "#fff7ed", colors.orange, 4)}
        ${text("Guidance opacity: 0% while tooltip active", 286, 239, 12, colors.orange, 700)}
      `,
    }), "06 Desktop - Tooltip Active Suppressed"),
  },
  {
    file: "07-desktop-blank-project-novice",
    title: "07 Desktop - Blank Project Novice",
    svg: shell(`
      ${desktopBoard({ secondCard: false, cardTitle: "第一张真实任务已创建", hover: true })}
      ${rect(282, 376, 240, 86, "#fff", colors.line, 6)}
      ${text("空白项目不预加载气泡", 302, 410, 13, colors.muted, 700)}
      ${text("创建首张真实卡后才触发", 302, 438, 12, colors.muted)}
      ${popover(276, 188, "首张真实卡创建后，拖动提示才会出现。", 276)}
    `, "07 Desktop - Blank Project Novice"),
  },
  {
    file: "08-desktop-senior-user-zero-disturbance",
    title: "08 Desktop - Senior User Zero Disturbance",
    svg: shell(desktopBoard({
      extra: `
        ${rect(1030, 184, 270, 92, "#fff", colors.line, 6)}
        ${text("State: completed / dismissed", 1050, 220, 13, colors.text, 700)}
        ${text("No dot · No popover · No inline strip", 1050, 248, 12, colors.muted)}
      `,
    }), "08 Desktop - Senior User Zero Disturbance"),
  },
  {
    file: "09-mobile-390-inline-tap-popover",
    title: "09 Mobile 390px - Inline Tap Popover",
    svg: mobileShell(`
      ${rect(18, 122, 354, 116, "#fff", colors.line, 8, `filter="url(#shadow)"`)}
      ${text("把示例任务改成真实任务", 34, 154, 14, colors.text, 700)}
      ${text("可拖动 · 可双击编辑", 34, 180, 12, colors.muted)}
      ${rect(34, 198, 322, 32, "#f6f8fa", "#d7e3f7", 4)}
      ${rect(34, 198, 2, 32, colors.blue)}
      ${text("点击右下角 ⋯ 菜单，或双击修改任务", 46, 219, 11, colors.blue, 700)}
      ${text("✕", 336, 219, 12, colors.blue, 700)}
      ${rect(18, 260, 354, 116, "#fff", colors.line, 8)}
      ${text("拆成第一个小步骤", 34, 294, 14, colors.text, 700)}
      ${text("建议 10 分钟内完成", 34, 320, 12, colors.muted)}
    `, "09 Mobile 390px - Inline Tap Popover"),
  },
  {
    file: "10-mobile-390-delete-bottom-sheet",
    title: "10 Mobile 390px - Delete Bottom Sheet",
    svg: mobileShell(`
      ${rect(18, 122, 354, 116, "#fff", colors.line, 8)}
      ${text("把示例任务改成真实任务", 34, 154, 14, colors.text, 700)}
      ${text("可拖动 · 可双击编辑", 34, 180, 12, colors.muted)}
      ${rect(0, 0, 390, 844, "rgba(0,0,0,.40)")}
      ${rect(0, 578, 390, 266, "#fff", "none", 18, `filter="url(#shadowStrong)"`)}
      ${rect(164, 592, 62, 4, "#d8dde6", "none", 2)}
      ${text("彻底删除任务吗？", 24, 640, 17, colors.text, 750)}
      ${wrapText("删除会移除此卡片。本地数据不可恢复，这是你的第一次删除操作。", 24, 674, 23, 18, 13, colors.muted)}
      ${rect(24, 740, 342, 44, "#ebf3fc", "none", 6)}
      ${text("取消删除", 164, 768, 14, colors.blue, 700)}
      ${rect(24, 794, 342, 44, colors.redSoft, "none", 6)}
      ${text("确认删除", 164, 822, 14, colors.red, 700)}
    `, "10 Mobile 390px - Delete Bottom Sheet"),
  },
  {
    file: "11-specs-state-machine-matrix",
    title: "11 Specs - State Machine Matrix",
    svg: shell(`
      ${rect(70, 92, 1060, 620, "#fff", colors.line, 8, `filter="url(#shadow)"`)}
      ${text("首次核心操作轻引导状态机矩阵", 110, 142, 24, colors.text, 800)}
      ${["not_seen", "shown", "dismissed", "completed", "suppressed"].map((state, i) => {
        const x = 110 + i * 198;
        const fill = [colors.blueSoft, "#fff", "#f8fafc", colors.greenSoft, colors.orangeSoft][i];
        return `
          ${rect(x, 190, 168, 360, fill, colors.line, 8)}
          ${text(state, x + 22, 228, 16, colors.text, 800)}
          ${text(["可触发", "正在展示", "用户关闭", "动作完成", "互斥避让"][i], x + 22, 262, 13, colors.muted, 700)}
          ${line(x + 22, 286, x + 146, 286)}
          ${wrapText(["首张真实卡 Hover / Tap 后进入 shown", "展示 popover、dot 或 inline strip", "写入 localStorage，不再打扰", "拖动/编辑/删除成功后完成", "Checklist、Tooltip、Dialog 激活时临时隐藏"][i], x + 22, 326, 12, 20, 13, colors.text)}
        `;
      }).join("")}
      ${line(270, 370, 306, 370, colors.blue, `stroke-width="2" marker-end="url(#arrow)"`)}
      ${text("z-index: guidance 90 < tooltip 92 < toast 95 < dialog/drawer 100", 110, 620, 14, colors.muted, 700)}
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${colors.blue}"/></marker></defs>
    `, "11 Specs - State Machine Matrix", 1200, 800),
  },
  {
    file: "12-specs-local-analytics-triggers",
    title: "12 Specs - Local Analytics Triggers",
    svg: shell(`
      ${rect(70, 92, 1060, 620, "#fff", colors.line, 8, `filter="url(#shadow)"`)}
      ${text("本地模拟埋点触发边界", 110, 142, 24, colors.text, 800)}
      ${[
        ["first_action_guidance_shown", "not_seen → shown", colors.blueSoft, colors.blue],
        ["first_action_guidance_dismissed", "点击关闭 / tap 关闭", "#f8fafc", colors.muted],
        ["first_action_drag_completed", "首拖成功", colors.greenSoft, colors.green],
        ["first_action_edit_completed", "首编成功", colors.greenSoft, colors.green],
        ["first_action_delete_confirmed", "确认删除", colors.redSoft, colors.red],
        ["first_action_guidance_suppressed", "互斥组件激活", colors.orangeSoft, colors.orange],
      ].map((row, i) => {
        const x = 126 + (i % 2) * 492;
        const y = 198 + Math.floor(i / 2) * 126;
        return `
          ${rect(x, y, 420, 82, row[2], row[3], 6)}
          ${text(row[0], x + 22, y + 34, 15, row[3], 800)}
          ${text(row[1], x + 22, y + 62, 13, colors.text)}
        `;
      }).join("")}
      ${rect(126, 604, 912, 52, "#f8fafc", colors.line, 6)}
      ${text("样例 localStorage key: kanboard:firstCoreActionGuidance:{projectId}", 150, 636, 14, colors.text, 700)}
    `, "12 Specs - Local Analytics Triggers", 1200, 800),
  },
];

function overview() {
  const items = frames
    .map((frame) => `
      <article>
        <h2>${esc(frame.title)}</h2>
        <img src="./${frame.file}.svg" alt="${esc(frame.title)}" />
      </article>
    `)
    .join("");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PD-019B First Core Action Guidance Archive</title>
  <style>
    body { margin: 0; background: #eef1f5; color: #1f2937; font-family: Inter, Arial, sans-serif; }
    header { padding: 32px 40px 16px; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { margin: 0; color: #5f6b7a; }
    main { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; padding: 24px 40px 48px; }
    article { background: #fff; border: 1px solid #d8dde6; border-radius: 8px; padding: 16px; }
    h2 { font-size: 15px; margin: 0 0 12px; }
    img { width: 100%; height: auto; border: 1px solid #d8dde6; border-radius: 4px; display: block; }
  </style>
</head>
<body>
  <header>
    <h1>PD-019B First Core Action Guidance Archive</h1>
    <p>12 张首次核心操作轻引导高保真状态图。本目录为项目内可版本化图稿归档，线上 Figma 源文件仍以 Figma 链接为准。</p>
  </header>
  <main>${items}</main>
</body>
</html>`;
}

function manifest() {
  return JSON.stringify({
    project: "Kanboard 新手项目创建与任务拆解优化",
    deliverable: "PD-019B First Core Action Guidance",
    targetFigmaFile: "https://www.figma.com/design/Uye3u4Uva5cwVt4eQnvxvz",
    recommendedFigmaPage: "PD-019B First Core Action Guidance",
    sourceOfTruth: "Project-local SVG/PNG assets. Online Figma node write requires a connected Figma MCP tool or API token.",
    importMode: {
      preferred: "Import each SVG as an editable vector frame, then name the Figma frames from this manifest.",
      fallback: "Import pd-019b-contact-sheet.svg as a visual reference contact sheet."
    },
    frames: frames.map((frame, index) => {
      const width = Number(frame.svg.match(/width="(\d+)"/)?.[1] || 1440);
      const height = Number(frame.svg.match(/height="(\d+)"/)?.[1] || 900);
      return {
        order: index + 1,
        figmaFrameName: frame.title.replace(/^\d+\s+/, ""),
        viewport: `${width}x${height}`,
        svg: `${frame.file}.svg`,
        png: `${frame.file}.png`
      };
    })
  }, null, 2);
}

function contactSheet() {
  const scale = 0.22;
  const cardW = 360;
  const cardH = 292;
  const gap = 32;
  const cols = 3;
  const rows = Math.ceil(frames.length / cols);
  const width = cols * cardW + (cols + 1) * gap;
  const height = 120 + rows * cardH + (rows + 1) * gap;
  const thumbs = frames.map((frame, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = gap + col * (cardW + gap);
    const y = 120 + gap + row * (cardH + gap);
    const originalW = Number(frame.svg.match(/width="(\d+)"/)?.[1] || 1440);
    const originalH = Number(frame.svg.match(/height="(\d+)"/)?.[1] || 900);
    const thumbW = originalW * scale;
    const thumbH = originalH * scale;
    const encoded = Buffer.from(frame.svg, "utf8").toString("base64");
    return `
      ${rect(x, y, cardW, cardH, "#ffffff", colors.line, 8, `filter="url(#shadow)"`)}
      ${text(frame.title, x + 16, y + 30, 14, colors.text, 700)}
      ${text(`${originalW}x${originalH} · ${frame.file}.svg`, x + 16, y + 54, 11, colors.muted)}
      <image href="data:image/svg+xml;base64,${encoded}" x="${x + 16}" y="${y + 76}" width="${thumbW}" height="${thumbH}" preserveAspectRatio="xMinYMin meet"/>
    `;
  }).join("");
  return shell(`
    ${text("PD-019B Figma Import Contact Sheet", 40, 50, 26, colors.text, 800)}
    ${text("Use this as a visual reference. Import individual SVG files for editable frame-level handoff.", 40, 82, 14, colors.muted, 500)}
    ${thumbs}
  `, "PD-019B Figma Import Contact Sheet", width, height);
}

function figmaImportGuide() {
  return `# PD-019B Figma 导入说明

本文件用于把 \`设计图/PD-019B/\` 的本地图稿同步到线上 Figma 文件：

- Figma 文件：https://www.figma.com/design/Uye3u4Uva5cwVt4eQnvxvz
- 建议页面名：\`PD-019B First Core Action Guidance\`
- 导入清单：\`figma-import-manifest.json\`
- 总览参考：\`pd-019b-contact-sheet.svg\` / \`pd-019b-contact-sheet.png\`

## 当前真实状态

当前 Codex 会话没有暴露 \`use_figma\` / \`generate_figma_design\` / \`create_new_file\` 等 Figma 写入工具，也没有可用的 Figma API token。因此本仓库不宣称 PD-019B 已经物理写入线上 Figma node。

## 推荐导入方式

1. 在 Figma 文件中创建页面 \`PD-019B First Core Action Guidance\`。
2. 按 \`figma-import-manifest.json\` 的顺序导入 12 个 \`.svg\` 文件。
3. 将每个导入对象重命名为 manifest 中的 \`figmaFrameName\`。
4. 将 1440x900 桌面图按 3 列排布，将 390x844 移动端图放在右侧或独立 section，将 1200x800 specs 图放在底部。
5. 可额外导入 \`pd-019b-contact-sheet.svg\` 作为总览参考，但它应作为 reference，不替代 12 个可编辑 SVG frame。
6. 完成后，把真实 Figma node id 回填到 \`docs/03-ux-design/首次核心操作轻引导高保真设计-PD-019B.md\`。

## 验收标准

- Figma 页面中能看到 12 个 PD-019B Frame。
- Frame 名称与 \`figma-import-manifest.json\` 一致。
- 至少包含 desktop drag/edit/delete/menu/suppressed、mobile inline/bottom-sheet、state machine、local analytics trigger 这些状态。
- 文档中仍保留真实边界：若未通过 MCP/API 自动写入，不写“Codex 已物理写入线上 node”。
`;
}

function readme() {
  const rows = frames
    .map((frame, index) => `| ${String(index + 1).padStart(2, "0")} | ${frame.title} | \`${frame.file}.svg\` / \`${frame.file}.png\` |`)
    .join("\n");
  return `# PD-019B 首次核心操作轻引导高保真图稿归档

本目录补齐 PD-019B 后续增量的项目内图稿证据。由于当前 Codex 会话没有暴露可调用的 Figma 写入 MCP 工具，也没有可用的 Figma API token，本次不能直接向线上 Figma 文件 \`Uye3u4Uva5cwVt4eQnvxvz\` 物理追加 Frame。

交付策略：

- 线上 Figma 文件继续作为主设计源链接保存，不把专有源文件硬塞进仓库。
- 项目目录保存可审阅、可版本管理的 SVG 源图与 PNG 导出图。
- 这些图稿覆盖 PD-019B 定义的 12 个 Frame，可作为后续在 Figma 页面 \`PD-019B First Core Action Guidance\` 中复刻或导入的依据。

| 编号 | Frame | 本地文件 |
| --- | --- | --- |
${rows}

辅助文件：

- \`overview.html\`：12 张图稿总览页。
- \`figma-import-manifest.json\`：线上 Figma 页面复刻/导入清单。
- \`FIGMA_IMPORT.md\`：手动导入或有权限环境下同步 Figma 的操作说明。
- \`pd-019b-contact-sheet.svg/png\`：12 张图稿的总览式导入参考图。
- \`generate-pd019b-assets.js\`：可复现生成脚本。

边界声明：

- 本目录不是正式 Figma Library，也不是线上 Figma node 导出。
- 若后续接入 Figma 写入权限，应以本目录图稿为参考，在 Figma 中创建同名 12 个 Frame，并回填真实 node ID。
`;
}

async function main() {
  let browser = null;
  const getBrowser = async () => {
    if (!browser && chromium) {
      browser = await chromium.launch({ headless: true });
    }
    return browser;
  };
  for (const frame of frames) {
    const svgPath = path.join(outDir, `${frame.file}.svg`);
    const pngPath = path.join(outDir, `${frame.file}.png`);
    fs.writeFileSync(svgPath, frame.svg, "utf8");
    if (sharp) {
      try {
        await sharp(Buffer.from(frame.svg)).png().toFile(pngPath);
      } catch {
        sharp = null;
      }
    }
    if (!sharp && chromium) {
      const renderBrowser = await getBrowser();
      const width = Number(frame.svg.match(/width="(\d+)"/)?.[1] || 1440);
      const height = Number(frame.svg.match(/height="(\d+)"/)?.[1] || 900);
      const page = await renderBrowser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.setContent(`<style>html,body{margin:0;padding:0;background:white;}</style>${frame.svg}`);
      await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width, height } });
      await page.close();
    }
  }
  fs.writeFileSync(path.join(outDir, "overview.html"), overview(), "utf8");
  fs.writeFileSync(path.join(outDir, "figma-import-manifest.json"), manifest(), "utf8");
  fs.writeFileSync(path.join(outDir, "FIGMA_IMPORT.md"), figmaImportGuide(), "utf8");
  const sheet = contactSheet();
  fs.writeFileSync(path.join(outDir, "pd-019b-contact-sheet.svg"), sheet, "utf8");
  if (sharp) {
    try {
      await sharp(Buffer.from(sheet)).png().toFile(path.join(outDir, "pd-019b-contact-sheet.png"));
    } catch {
      sharp = null;
    }
  }
  if (!sharp && chromium) {
    const renderBrowser = await getBrowser();
    const width = Number(sheet.match(/width="(\d+)"/)?.[1] || 1200);
    const height = Number(sheet.match(/height="(\d+)"/)?.[1] || 900);
    const page = await renderBrowser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(`<style>html,body{margin:0;padding:0;background:white;}</style>${sheet}`);
    await page.screenshot({ path: path.join(outDir, "pd-019b-contact-sheet.png"), clip: { x: 0, y: 0, width, height } });
    await page.close();
  }
  fs.writeFileSync(path.join(outDir, "README.md"), readme(), "utf8");
  if (browser) {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
