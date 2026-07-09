# PD-019B 首次核心操作轻引导高保真图稿归档

本目录补齐 PD-019B 后续增量的项目内图稿证据。由于当前 Codex 会话没有暴露可调用的 Figma 写入 MCP 工具，也没有可用的 Figma API token，本次不能直接向线上 Figma 文件 `Uye3u4Uva5cwVt4eQnvxvz` 物理追加 Frame。

交付策略：

- 线上 Figma 文件继续作为主设计源链接保存，不把专有源文件硬塞进仓库。
- 项目目录保存可审阅、可版本管理的 SVG 源图与 PNG 导出图。
- 这些图稿覆盖 PD-019B 定义的 12 个 Frame，可作为后续在 Figma 页面 `PD-019B First Core Action Guidance` 中复刻或导入的依据。

| 编号 | Frame | 本地文件 |
| --- | --- | --- |
| 01 | 01 Desktop - 1st Drag Popover | `01-desktop-1st-drag-popover.svg` / `01-desktop-1st-drag-popover.png` |
| 02 | 02 Desktop - 1st Edit Dot & Popover | `02-desktop-1st-edit-dot-popover.svg` / `02-desktop-1st-edit-dot-popover.png` |
| 03 | 03 Desktop - 1st Delete Modal | `03-desktop-1st-delete-modal.svg` / `03-desktop-1st-delete-modal.png` |
| 04 | 04 Desktop - Task Menu Guidance | `04-desktop-task-menu-guidance.svg` / `04-desktop-task-menu-guidance.png` |
| 05 | 05 Desktop - Checklist Suppressed | `05-desktop-checklist-suppressed.svg` / `05-desktop-checklist-suppressed.png` |
| 06 | 06 Desktop - Tooltip Active Suppressed | `06-desktop-tooltip-active-suppressed.svg` / `06-desktop-tooltip-active-suppressed.png` |
| 07 | 07 Desktop - Blank Project Novice | `07-desktop-blank-project-novice.svg` / `07-desktop-blank-project-novice.png` |
| 08 | 08 Desktop - Senior User Zero Disturbance | `08-desktop-senior-user-zero-disturbance.svg` / `08-desktop-senior-user-zero-disturbance.png` |
| 09 | 09 Mobile 390px - Inline Tap Popover | `09-mobile-390-inline-tap-popover.svg` / `09-mobile-390-inline-tap-popover.png` |
| 10 | 10 Mobile 390px - Delete Bottom Sheet | `10-mobile-390-delete-bottom-sheet.svg` / `10-mobile-390-delete-bottom-sheet.png` |
| 11 | 11 Specs - State Machine Matrix | `11-specs-state-machine-matrix.svg` / `11-specs-state-machine-matrix.png` |
| 12 | 12 Specs - Local Analytics Triggers | `12-specs-local-analytics-triggers.svg` / `12-specs-local-analytics-triggers.png` |

辅助文件：

- `overview.html`：12 张图稿总览页。
- `generate-pd019b-assets.js`：可复现生成脚本。

边界声明：

- 本目录不是正式 Figma Library，也不是线上 Figma node 导出。
- 若后续接入 Figma 写入权限，应以本目录图稿为参考，在 Figma 中创建同名 12 个 Frame，并回填真实 node ID。
