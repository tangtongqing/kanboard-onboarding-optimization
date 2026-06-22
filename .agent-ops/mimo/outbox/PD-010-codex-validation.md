# PD-010 Codex 验收记录

| 项目 | 内容 |
|---|---|
| 验收日期 | 2026-06-22 |
| 验收结论 | 修订后通过 |
| 产物性质 | 假设版 / 待研究验证版 / impeccable shape 低保真输出 |

## 1. 初始交付问题

1. W02 把新建态主按钮写成“保存”，与当前运行时“创建项目”文案不一致。
2. W02 把桌面模板列表写成“纵向 2×2”，与同文档的左侧单列结构冲突。
3. W05 与上游 PD-006 同时规定“名称为空提交触发错误”和“名称为空按钮禁用”，导致错误态无法通过提交触发。
4. W06 首次导出的成功 Toast 子节点与标题重叠，遮挡了关键信息。
5. Mimo 回传称读取了任务允许清单之外的 `.gitignore`；该文件未被 Mimo 修改，也未影响交付物，但属于读取范围纪律偏差。

## 2. Codex 修订

- 将新建态主按钮统一为“创建项目”，桌面模板列表统一为左侧单列纵向结构。
- 明确名称为空时允许提交并触发 S07 必填校验，同步修订 PD-006 的旧矛盾；loading 阶段仍禁用重复提交。
- 将 W06 Toast 合并为单节点，重新导出后不再发生文字重叠。
- 扩展项目渲染工具，使 `render-all.cjs PD-010` 和 `make-contact-sheets.cjs PD-010` 可定向处理本任务，不重写历史图片。
- 将越界读取记录为流程警告；后续 Mimo 任务仍须严格遵守允许读取清单。

## 3. 完整性验收

- 章节、Shape 简报字段、P002/P004/P005/P006/P009/P013 屏幕均已覆盖。
- default、selected、loading、error、success、confirmation 六类状态均已覆盖。
- V03~V06 均保留可比较备选，没有提前定稿。
- 已提供 6 项形成性测试任务及通过口径，超过任务要求的 4 项。
- 未发现 Mimo 越界修改业务代码或现有设计图。

## 4. 图形验收

- 11 张 Mermaid 均实际渲染成功。
- 已导出 11 PNG + 11 SVG 至 `设计图/PD-010/`。
- 目视检查包括：画布非空、中文可读、节点无裁切、状态颜色不承担唯一语义、W06 Toast 不重叠、W09 错误/加载/成功/确认关系清楚。
- W10 为滚动区与固定区的关系图，横向画布属于信息结构需要，不判定为异常超宽。

## 5. 验收命令

```powershell
node .agent-ops/render-tools/render-all.cjs PD-010
node .agent-ops/render-tools/make-contact-sheets.cjs PD-010
node --check .agent-ops/render-tools/render-all.cjs
node --check .agent-ops/render-tools/make-contact-sheets.cjs
git diff --check
```

未运行前端业务验收命令，原因：本任务只修改设计文档、治理进度、Mermaid 渲染工具与导出图片，未修改 `index.html`、`styles.css`、`app.js` 或 `tests/`。

## 6. 验收边界

- 本次通过只表示 PD-010 假设版低保真产物完整，不代表真实用户研究、形成性测试、高保真或 Figma 已完成。
- V03~V06 仍需至少一轮形成性测试或结构评审形成结论。
- PD-011 只能在上述结构和验证结论确认后进入。
