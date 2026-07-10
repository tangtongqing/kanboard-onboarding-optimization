# PD-019B Figma 导入说明

本文件用于把 `设计图/PD-019B/` 的本地图稿同步到线上 Figma 文件：

- Figma 文件：https://www.figma.com/design/Uye3u4Uva5cwVt4eQnvxvz
- 建议页面名：`PD-019B First Core Action Guidance`
- 导入清单：`figma-import-manifest.json`
- 总览参考：`pd-019b-contact-sheet.svg` / `pd-019b-contact-sheet.png`

## 当前真实状态

当前 Codex 会话没有暴露 `use_figma` / `generate_figma_design` / `create_new_file` 等 Figma 写入工具，也没有可用的 Figma API token。因此本仓库不宣称 PD-019B 已经物理写入线上 Figma node。

## 推荐导入方式

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
- 文档中仍保留真实边界：若未通过 MCP/API 自动写入，不写“Codex 已物理写入线上 node”。
