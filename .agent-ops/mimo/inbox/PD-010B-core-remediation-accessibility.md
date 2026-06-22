任务编号：PD-010B
任务名称：创建向导核心整改与可访问性补齐

背景：
- `PD-010A` 专家走查文档已由 Codex 修订后通过，但 `PD-011 Gate` 当前为 `No-Go`。
- Gate 的三个 P1 问题是：R08 移动端底部操作不固定、R11 模板示例卡无身份标记、R14 未保存关闭确认缺失。
- R06 已由 Codex 校正为 P2：项目名称输入有原生 `required` 校验，不是“静默无响应”，但缺少行内错误文字、`aria-invalid` 与 `aria-describedby`。
- 本任务先修复 R08/R11/R14，并补齐 R06。完成后仍不能直接进入 PD-011；还需准备 V03b/V04a/V05b/V06a 对照资产并执行真人形成性测试。

目标：
- 以可复现证据确认 R06/R08/R11/R14 的根因。
- 在不改变当前产品范围和数据模型主体的前提下完成最小实现修复。
- 先补失败回归用例，再逐项实现并运行完整静态功能审计。
- 保持空白项目、模板项目、项目编辑、任务编辑删除和现有移动端行为不回归。

工作流路由：
- 总工作流：`product-design-workflow`
- register：`product`
- 阶段：shape 后、真人测试前的 implementation remediation
- 调试方法：`systematic-debugging` 四阶段；禁止未复现先改代码
- Product Design 路由：existing prototype scoped fixes，不进入 ideation、high-fidelity 或 Figma

允许读取：
- `PRODUCT.md`
- `docs/03-ux-design/交互状态规格-PD-006.md`
- `docs/03-ux-design/设计系统整理-PD-009.md`
- `docs/03-ux-design/低保真线框与关键状态-PD-010.md`
- `docs/05-validation/低保真形成性评审与结构决策-PD-010A.md`
- `.agent-ops/mimo/outbox/PD-010A-codex-validation.md`
- `index.html`
- `styles.css`
- `app.js`
- `tests/static-feature-audit-v08.js`

允许修改：
- `index.html`
- `styles.css`
- `app.js`
- `tests/static-feature-audit-v08.js`
- `.agent-ops/mimo/outbox/PD-010B-core-remediation-accessibility-result.md`

禁止事项：
- 不要读取允许清单之外的文件；不要读取 `.gitignore`、Git 历史、其他 inbox/outbox、渲染缓存或本地工具缓存。
- 不要修改 `README.md`、`PRODUCT.md`、PD 文档、治理文档、设计图或渲染工具。
- 不要新增依赖、构建工具、框架或测试文件，优先扩展现有静态审计。
- 不要实现 V03b/V04a/V05b/V06a，不要进入 PD-011、高保真、Figma 或视觉重设计。
- 不要顺手处理 R09/R10/R12/R13 或其他非本任务问题。
- 不要重构无关业务逻辑、模板数据、看板状态模型或现有系统级功能。
- 不要用固定延时掩盖异步问题；测试使用状态条件等待。
- 不要只改 CSS/文案而不补回归测试。

调试与实现顺序：
1. Phase 1 根因调查：逐项复现并记录 DOM、事件、状态与 CSS 证据。
2. Phase 2 模式比较：寻找项目内已有的 `required`、`confirm()`、徽标和移动端固定区域模式。
3. Phase 3 单一假设：每次只为一个 R 问题增加失败断言，确认断言在修复前失败。
4. Phase 4 实现：一次只修一个问题；对应断言通过后再进入下一项。
5. 四项完成后运行完整 `tests/static-feature-audit-v08.js`，不得只跑新增片段。

R06：行内错误与 ARIA：
- 保留 `<input required>` 原生约束校验作为兜底。
- 在项目名称字段附近提供稳定错误节点，例如 `#projectNameError`。
- 名称为空尝试提交或触发 `invalid` 时：
  - 弹窗保持打开，不创建项目。
  - 显示“请输入项目名称”。
  - 名称输入设置 `aria-invalid="true"`。
  - 使用 `aria-describedby` 关联错误节点。
- 用户输入有效名称后清除错误文案和错误状态，但保留必要的描述关联。
- 不要重复弹出第二套冲突提示；若使用 `preventDefault()` 统一定制校验，必须在结果中说明为什么不会破坏原生兜底。

R08：390px 移动端底部操作：
- 在 390px 视口下，项目创建弹窗内容滚动时 `.modal-actions` 保持可见或可稳定触达。
- 优先使用当前滚动容器内的 scoped sticky 方案，只作用于 `#projectDialog`，不得改变所有系统弹窗。
- sticky 区域需要有不透明背景、合理边界和层级，不能遮挡最后一段表单内容。
- 390px 下不得产生新的横向溢出。
- 桌面端现有布局不得改变。

R11：模板示例卡身份：
- 只有模板生成的任务卡写入稳定布尔字段 `isExample: true`。
- 空白项目任务和用户后来新增的任务默认不是示例卡。
- 编辑、移动、持久化和重新渲染不得丢失 `isExample`。
- 看板卡片为示例卡时显示可读的“示例”徽标；徽标不能只靠颜色表达。
- 不要给普通任务误加徽标，也不要改变模板任务标题。

R14：未保存关闭确认：
- 项目弹窗打开时记录初始快照；默认模板选择本身不应让刚打开的弹窗立即变脏。
- 以下变化至少应判定为 dirty：名称、描述、创建方式、模板选择；编辑已有项目时名称/描述变化也应判定。
- dirty 状态下点击右上角关闭、点击取消或按 ESC，必须触发“确定离开吗？未保存的内容将丢失”确认。
- 用户选择继续编辑时：弹窗保持打开，输入和选择不丢失，焦点回到合理控件。
- 用户确认离开时：弹窗关闭，不创建/不保存，并清理本次快照状态。
- pristine 状态下关闭不应弹确认，保持现有快速退出行为。
- 避免同一次关闭触发两次确认；原生 `method="dialog"` submit 与 `cancel` 事件需要统一处理。

测试要求：
1. 先为每个问题增加至少一个修复前会失败的断言，并在结果中记录失败证据。
2. R06 至少断言：空名称不创建、弹窗保持打开、错误可见、ARIA 关联正确、输入后错误清除。
3. R08 至少在 390px 视口断言：滚动前后底部操作仍在视口内、无横向溢出；测试结束恢复原视口。
4. R11 至少断言：模板项目状态中示例卡带 `isExample`、DOM 显示“示例”徽标、空白/用户新增任务无徽标、持久化后仍保留。
5. R14 至少断言：
   - pristine 关闭不确认；
   - dirty 点击关闭并取消确认后仍打开且输入保留；
   - dirty 确认离开后关闭且未创建；
   - ESC dirty 路径也受保护。
6. 保留并通过现有项目创建、项目编辑、模板生成、任务编辑删除和移动端弹窗适配测试。
7. Playwright `dialog` 处理必须按测试场景明确 accept/dismiss，不要让全局自动 accept 掩盖确认流程。

验收命令：
```powershell
node --check app.js
node --check tests/static-feature-audit-v08.js
node tests/static-feature-audit-v08.js
```

结果写入：
- `.agent-ops/mimo/outbox/PD-010B-core-remediation-accessibility-result.md`

回传格式：
1. 修改摘要
2. 修改文件
3. 每项问题的复现步骤与根因
4. 修复前失败断言证据
5. R06 实现与测试
6. R08 实现与测试
7. R11 实现与测试
8. R14 实现与测试
9. 完整命令输出摘要
10. 未解决问题
11. 风险或需要 Codex 判断的点

完成口径：
- 四项问题均有根因、失败测试、最小修复和通过证据。
- 完整静态审计退出码为 0。
- 没有修改允许范围之外的文件。
- 不得把本任务完成写成 PD-011 Gate 已通过；Codex 仍需复核并重新评估 Gate。
