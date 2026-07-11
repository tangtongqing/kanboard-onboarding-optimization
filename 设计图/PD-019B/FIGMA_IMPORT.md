# PD-019B Figma 导入说明

本文件用于把 `设计图/PD-019B/` 的本地图稿同步到线上 Figma 文件：

- Figma 文件：https://www.figma.com/design/Uye3u4Uva5cwVt4eQnvxvz
- 建议页面名：`PD-019B First Core Action Guidance`
- 导入清单：`figma-import-manifest.json`
- 总览参考：`pd-019b-contact-sheet.svg` / `pd-019b-contact-sheet.png`

## 当前真实状态

2026-07-11，用户已运行本地插件，将 12 个 PD-019B Frame 写入线上 Figma 页面并完成正式 PNG 导出。导出归档位于 `设计图/Figma线上归档/2026-07-10/PD-019B-First-Core-Action-Guidance/`。

## 推荐导入方式

### 方式 A：运行本地 Figma Development Plugin（推荐）

这是当前没有 Codex Figma 写入工具/token 时最接近“真实写入线上 Figma node”的方案。

1. 打开 Figma 目标文件：`https://www.figma.com/design/Uye3u4Uva5cwVt4eQnvxvz`。
2. 进入 `Plugins > Development > Import plugin from manifest...`。
3. 选择 `设计图/PD-019B/figma-import-plugin/manifest.json`。
4. 运行插件 `PD-019B First Core Action Guidance Importer`。
5. 插件会新建页面 `PD-019B First Core Action Guidance`；若同名页面已存在，则自动创建带 `Imported 2` 等后缀的新页面，并导入 12 个可编辑 SVG Frame。它不会修改或清空任何既有页面。

若未来需要重建或追加页面，可再次运行该插件；它不会修改或清空任何既有页面。

### 方式 B：手动导入 SVG

1. 在 Figma 文件中创建页面 `PD-019B First Core Action Guidance`。
2. 按 `figma-import-manifest.json` 的顺序导入 12 个 `.svg` 文件。
3. 将每个导入对象重命名为 manifest 中的 `figmaFrameName`。
4. 将 1440x900 桌面图按 3 列排布，将 390x844 移动端图放在右侧或独立 section，将 1200x800 specs 图放在底部。
5. 可额外导入 `pd-019b-contact-sheet.svg` 作为总览参考，但它应作为 reference，不替代 12 个可编辑 SVG frame。
6. 完成后，把真实 Figma node id 回填到 `docs/03-ux-design/首次核心操作轻引导高保真设计-PD-019B.md`。

## 验收标准

- Figma 页面中能看到 12 个 PD-019B Frame。
- Frame 名称与 `figma-import-manifest.json` 一致。
- 至少包含 desktop drag/edit/delete/menu/suppressed、mobile inline/bottom-sheet、state machine、local analytics trigger 这些状态。
- 文档中应如实记录：本次由用户运行本地插件完成物理写入；不是由 Codex MCP/API 直接写入。
