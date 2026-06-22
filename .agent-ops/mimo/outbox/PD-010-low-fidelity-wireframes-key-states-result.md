# PD-010 低保真线框与关键状态 - Mimo 结果

| 项目 | 内容 |
|---|---|
| 任务编号 | PD-010 |
| 任务名称 | 低保真线框与关键状态 |
| 日期 | 2026-06-22 |
| 执行智能体 | Mimo Code（执行）/ 本会话以执行智能体身份运行 |
| Product Design 路由 | 总工作流 `product-design-workflow`；register `product`；impeccable 阶段 `shape`；fidelity 低保真 sketch |
| 最终状态 | 待 Codex 验收 |

## 1. 修改摘要

新建低保真线框主文档，把 PD-008 页面 Brief、PD-006 状态规格、PD-009 组件规范转成可评审的桌面端与 390px 低保真线框，覆盖 P002/P004/P005/P006/P009/P013 六个核心页面与 default/selected/loading/error/success/confirmation 六类关键状态。线框使用真实模板内容（4 模板的列、泳道、示例任务来自 `app.js` `PROJECT_TEMPLATES`），不使用 Lorem Ipsum。V03~V06 转为可比较的线框备选，保留 `[待验证]`，不定稿。

关键结构发现：现有 `index.html` `#projectDialog` 中项目名称/描述输入在创建方式切换**之上**，且默认选中"从模板开始"（`checked`），与 PD-006 S05/S06 描述（输入在预览/空白区内）存在差异。线框以现有代码结构为事实基线绘制，并将该顺序与默认方式差异归入 V05 待验证。

## 2. 修改文件

| 文件 | 操作 | 说明 |
|---|---|---|
| `docs/03-ux-design/低保真线框与关键状态-PD-010.md` | 新建 | 主文档，14 章，739 行，11 张 Mermaid 源码 |
| `.agent-ops/mimo/outbox/PD-010-low-fidelity-wireframes-key-states-result.md` | 新建 | 本结果文件 |

未修改任何业务代码（`index.html`、`styles.css`、`app.js`、`tests/`、`PRODUCT.md`、`README.md`、治理文档、`设计图/`）。

## 3. Product Design 路由与 Shape 简报摘要

- 总工作流：`product-design-workflow`
- register：`product`
- impeccable 阶段：`shape`（sketch 低保真，不进 mid-fi/high-fi）
- color strategy：Restrained，灰阶 + 极少语义色，颜色不作唯一信息来源
- scene sentence：用户在笔记本/手机上专注把模糊目标快速整理成第一张可用看板
- anchor references：现有 Kanboard 静态原型身份、Linear 克制表单、Notion 模板预览信息组织（不照搬卡片市场）
- visual direction probe：跳过（shape 阶段不需要）

Shape 简报覆盖任务单要求的全部字段：Feature Summary、Primary User Action、Design Direction、Scope、Layout Strategy、Key States、Interaction Model、Content Requirements、Recommended References、Visual Direction Probe。

## 4. 桌面端线框清单

| 编号 | 屏幕 | 状态覆盖 | Mermaid |
|---|---|---|---|
| W01 | 核心屏幕与状态地图（P001→P009 全流程索引） | 全状态索引 | §5.1 |
| W02 | P002 新建项目弹窗默认态 | default | §5.2 |
| W03 | P004 模板列表与选中态 | default / selected | §5.3 |
| W04 | P005 模板预览态（列/泳道/示例任务+过长滚动） | default | §5.4 |
| W05 | P006 空白创建表单 | default / error | §5.5 |
| W06 | P009 创建成功看板首屏（含示例卡编辑/删除入口） | success | §5.6 |

每个线框都说明了视口、用户目标、区域层级与阅读顺序、主/次/退出操作、内容最小/典型/极端值、可滚动与固定区域、键盘焦点顺序、对应上游需求/状态/原则、待验证点。

## 5. 390px 移动端线框清单

| 编号 | 屏幕 | 状态覆盖 | Mermaid |
|---|---|---|---|
| W07 | P002/P004 创建方式与模板列表 | default / selected | §6.1 |
| W08 | P005/P006 预览与空白表单 | default | §6.2 |

移动端规则：创建方式水平→纵向全宽，模板 2 列→单列，按钮→全宽，触摸目标建议 ≥44px `[规范补齐]`，预览过长底部操作固定。容器是否改全屏归入 V06 `[待验证]`。

## 6. 关键状态覆盖

| 编号 | 状态板 | 覆盖状态 | Mermaid |
|---|---|---|---|
| W09 | loading/error/success/confirmation 状态板 | loading·error·success·confirmation（+ default/selected 已在 W02~W08） | §7.1 |

W09 明确了：loading 阻止重复提交并禁用关闭、`aria-live` 播报；error 保留输入、`aria-invalid`+`aria-describedby`、焦点移错误摘要；success 弹窗关闭切新项目、可选 toast；confirmation（S11 未保存关闭/S15 删除示例卡）居中对话框、移动端按钮全宽。并补充了滚动/固定/焦点顺序关系图 W10、W11（§8）。

六类关键状态 default/selected/loading/error/success/confirmation 全部同屏或成组覆盖。

## 7. V03~V06 备选方案

| 编号 | 备选 | 状态 |
|---|---|---|
| V03 | 模板卡片精简摘要 vs 扩展摘要 | `[待验证]` §9.1 |
| V04 | 预览单层摘要 vs 强层级分区 | `[待验证]` §9.2 |
| V05 | 默认模板路径 vs 默认空白路径 + 名称输入位置（源于现有代码与 PD-006 差异） | `[待验证]` §9.3 |
| V06 | 移动端全屏容器 vs 保留边距对话框 | `[待验证]` §9.4 |

每个备选提供可比较维度、适用场景、风险、验证指标，未定稿。

## 8. Mermaid 图清单

共 11 张（任务要求 ≥9 张，含 2 张补充）：

| 编号 | 图名 | 位置 |
|---|---|---|
| W01 | 核心屏幕与状态地图 | §5.1 |
| W02 | 桌面 P002 默认态 | §5.2 |
| W03 | 桌面 P004 模板列表/选中态 | §5.3 |
| W04 | 桌面 P005 模板预览态 | §5.4 |
| W05 | 桌面 P006 空白表单（含错误） | §5.5 |
| W06 | 桌面 P009 看板首屏 | §5.6 |
| W07 | 390px P002/P004 | §6.1 |
| W08 | 390px P005/P006 | §6.2 |
| W09 | loading/error/success/confirmation 状态板 | §7.1 |
| W10 | 滚动与固定关系图（补充） | §8.1 |
| W11 | 键盘焦点顺序图（补充） | §8.2 |

校验：`grep -c '```mermaid'` = 11，闭合 ```` ``` ```` = 11，开闭配对完整，无未闭合代码块。所有线框使用灰阶 + 极少语义色（错误 `#fff1f0`/`#b42318`、成功 `#ecfdf3`/`#16803c`、确认 `#fff7e8`/`#b56b0b`、选中 primary 描边），节点文字直接表达区域与状态，颜色不作唯一信息来源。

PNG/SVG 导出由 Codex 验收阶段处理（Mimo 无图片能力，按分工只交付 Markdown + Mermaid 源码），建议存放 `设计图/PD-010/`。

## 9. 形成性测试输入

提供 6 个任务脚本（任务单要求 ≥4）：

| 任务 | 口径 |
|---|---|
| FT1 | 首次选择创建方式（观察默认方式影响） |
| FT2 | 选择并理解模板（观察列结构理解） |
| FT3 | 从空白快速创建（观察老用户是否被干扰） |
| FT4 | 移动端完成创建（观察 390px 可用性） |
| FT5 | 示例卡理解（延伸） |
| FT6 | 错误与确认恢复（延伸） |

每项给出场景口径、观察点、通过口径，观察记录含完成率/犹豫时长/首次点击/误操作/口头表达。全部标注 `[待验证·PD-002]`，是脚本输入不是结论。

## 10. 命令结果

未运行 node 业务验收命令，原因：PD-010 只新建低保真设计文档（`docs/03-ux-design/低保真线框与关键状态-PD-010.md`）与结果文件，未修改业务代码（`index.html`、`styles.css`、`app.js`、`tests/`）。

读取操作（任务允许范围）：PRODUCT.md、PD-005~PD-009 主文档、PD-008/PD-009 Codex 验收记录、完成度审计、`index.html` `#projectDialog` 结构、`app.js` `PROJECT_TEMPLATES`（4 模板真实列/泳道/示例任务）、`.gitignore`。

## 11. 未解决问题

1. 现有代码结构与 PD-006 描述存在两处差异（名称输入位置、默认创建方式），线框按现有代码绘制并归入 V05 待验证，需 Codex 确认是否同步修订 PD-006 或保留作为研究输入。
2. PNG/SVG 未导出（分工属 Codex 验收阶段），11 张 Mermaid 源码已就绪待导出。
3. 6 个形成性测试任务尚未执行，V03~V06 未定稿。
4. P010/P011（示例卡完整编辑/删除详情）仅作为 P009 成功态延伸表现，未展开完整任务详情弹窗线框（任务范围聚焦创建流程到看板首屏）。
5. 移动端名称/描述/创建方式是否跟随滚动或固定，线框标注"跟随滚动或固定（待测）"，需移动端实测确认。

## 12. 风险或需要 Codex 判断的点

1. **名称输入位置差异**：现有代码把名称/描述放在创建方式之上，PD-006 S05/S06 描述放在预览/空白区内。建议 Codex 决定：是修订 PD-006 对齐代码，还是把两者都作为 V05 备选进研究。线框当前以代码为准。
2. **默认创建方式**：现有代码默认"从模板开始"`checked`。若研究证明老用户更需默认空白，需同步改代码与文档。V05 保留对照。
3. **个人学习模板复杂度**：6 列 7 泳道 20 示例卡，在桌面预览和移动端都属极端值，可能需要预览密度上限或渐进披露（V04），但不得删减模板真实内容。
4. **示例卡徽标**：P009 示例卡需"示例"徽标区分普通任务，属 `[规范补齐]`，PD-011 高保真必须落实。
5. **触摸目标 ≥44px 与 toast 时长**：属 `[规范补齐]`，需 PD-011 视觉稿阶段实测，PD-010 已标注。
6. **PD-011 进入条件**：线框明确要求结构确认 + V03~V06 至少一轮形成性测试/专家评审 + token 实测后方可进入高保真，不得把 PD-010 记为高保真完成。
7. **Mermaid 渲染检查**：11 张图含 subgraph、长中文标签、classDef，Codex 导出 PNG/SVG 时需目视检查文字裁切、超宽画布（W06 含三组 subgraph）、连线交叉与浅色背景下文字对比，必要时按 PD-009 §14 视觉规范调整。
