# PD-019B 首次核心操作轻引导高保真图稿归档

本目录保存 PD-019B 的可复现设计源。2026-07-11，用户已通过本目录的本地 Figma Development Plugin 将 12 个 Frame 写入线上 Figma 文件 `Uye3u4Uva5cwVt4eQnvxvz`，并完成正式 PNG 导出归档。

交付策略：

- 线上 Figma 文件继续作为主设计源链接保存，不把专有源文件硬塞进仓库。
- 项目目录保存可审阅、可版本管理的 SVG 源图与 PNG 导出图。
- 这些图稿覆盖 PD-019B 定义的 12 个 Frame，可作为 Figma 页面 `PD-019B First Core Action Guidance` 的可复现源与后续维护依据。

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
- `figma-import-manifest.json`：线上 Figma 页面复刻/导入清单。
- `FIGMA_IMPORT.md`：手动导入或有权限环境下同步 Figma 的操作说明。
- `figma-import-plugin/`：一次性 Figma Development Plugin，可在 Figma 内真实创建 `PD-019B First Core Action Guidance` 页面和 12 个可编辑 SVG Frame。
- `pd-019b-contact-sheet.svg/png`：12 张图稿的总览式导入参考图。
- `generate-pd019b-assets.js`：可复现生成脚本。

边界声明：

- 本目录不是正式 Figma Library；线上页面仍应以 Figma 文件为可编辑设计源。
- 正式 Figma PNG 导出存放于 `设计图/Figma线上归档/2026-07-10/PD-019B-First-Core-Action-Guidance/`；本目录中的 SVG/PNG 用于版本管理与复现。
