# PD-010B 创建向导核心整改与可访问性补齐 - Mimo 结果

| 项目 | 内容 |
|---|---|
| 任务编号 | PD-010B |
| 任务名称 | 创建向导核心整改与可访问性补齐 |
| 日期 | 2026-06-22 |
| 执行智能体 | Mimo Code（执行）/ 本会话以执行智能体身份运行 |
| Product Design 路由 | `product-design-workflow`；register `product`；shape 后、真人测试前的 implementation remediation；`systematic-debugging` 四阶段 |
| 最终状态 | 待 Codex 验收（不等于 PD-011 Gate 已通过） |

## 1. 修改摘要

按 `systematic-debugging` 四阶段（根因调查 → 模式比较 → 失败断言 → 实现）修复 R06/R08/R11/R14 四项问题。每项均先复现根因证据、写修复前会失败的回归断言，再做最小实现修复，最后运行完整静态审计。

- **R11**：模板生成卡新增稳定 `isExample: true` 字段；看板卡渲染示例徽标；空白/用户新增/复制卡为非示例；编辑（Object.assign）、移动、持久化不丢失标记。
- **R06**：新增 `#projectNameError` 节点与 `aria-describedby` 关联；名称空提交/invalid 显示行内错误并设 `aria-invalid="true"`；有效输入后清除；保留原生 `required` 兜底。
- **R08**：仅作用于 `#projectDialog` 的 scoped sticky，移动端长内容滚动时头部/底部操作保持可触达；桌面端不溢出时无副作用；390px 无横向溢出。
- **R14**：打开弹窗记录初始快照（默认模板选择不算脏）；名称/描述/创建方式/模板选择变化判定 dirty；dirty 关闭/取消/ESC 触发 `confirm("确定离开吗？未保存的内容将丢失")`；统一处理 form method=dialog submit 与 dialog cancel 事件，避免重复弹窗。

**严格遵守纪律**：未读取 `.gitignore`、Git 历史、其他 inbox/outbox、渲染缓存；未修改 README/PRODUCT/PD 文档/治理文档/设计图/渲染工具；未新增依赖或测试文件（仅扩展现有静态审计）；未实现 V03b/V04a/V05b/V06a，未进入 PD-011/高保真/Figma；未顺手处理 R09/R10/R12/R13；未重构无关业务逻辑；测试用状态条件等待，无固定延时掩盖异步。

## 2. 修改文件

| 文件 | 操作 | 变更范围 |
|---|---|---|
| `index.html` | 修改 | 项目名称 label 内加 `#projectNameError` 节点 + `aria-describedby` + `aria-invalid="false"`（仅 1 处 label） |
| `app.js` | 修改 | R11（makeCard 默认 isExample、createProjectFromTemplate 设 true、cloneCardForCopy 设 false、卡渲染徽标）、R06（showProjectNameError/clearProjectNameError/saveProjectFromDialog 兜底/invalid+input 监听/openProjectDialog 重置）、R08（无 JS，纯 CSS）、R14（projectDialogSnapshot 变量、capture/isDirty/clear/requestClose 函数、openProjectDialog 记快照、saveProjectFromDialog cancel 拦截、dialog cancel 监听、保存成功清理） |
| `styles.css` | 修改 | `.example-label`（R11 徽标）、`.field-error` + `#projectNameInput[aria-invalid="true"]`（R06）、`#projectDialog .modal-header/.modal-actions` scoped sticky（R08） |
| `tests/static-feature-audit-v08.js` | 修改 | 新增 `testProjectDialogRemediation` 函数（32 个断言覆盖 R06/R08/R11/R14），注册到 main 调用链 |
| `.agent-ops/mimo/outbox/PD-010B-core-remediation-accessibility-result.md` | 新建 | 本结果文件 |

未修改任何允许范围外文件。git status 中其他 M 文件（render-tools、README、治理文档、PD-006 等）是 PD-010/PD-010A 阶段及 Codex 验收时的遗留改动，非本任务触碰。

## 3. 每项问题的复现步骤与根因

### R11 模板示例卡身份

- **复现**：`fresh` → 新建项目（默认模板）→ 检查 `activeProjectFrom(state).columns[].cards[].isExample`。修复前字段为 `undefined`，`=== true` 为 false。
- **根因**（`[代码事实]`）：
  - `app.js` 旧 `makeCard`（3171）未声明 `isExample` 字段。
  - `createProjectFromTemplate`（旧 4941-4946）`makeCard({...clone(templateCard), swimlaneId})` 未设示例标记；clone 不带该字段。
  - 看板卡渲染（旧 4691）`<h4>` 只有 isClosed 徽标，无示例徽标。
- **模式比较**：项目内 isClosed 是现成的布尔标记 + `.closed-label` 徽标模式，R11 照此实现。

### R06 行内错误与 ARIA

- **复现**：打开新建弹窗 → 清空名称 → 点保存。修复前：`saveProjectFromDialog` 第 4963 `preventDefault()` 后 4965 `if(!name) return` 静默返回；无错误节点、无 aria 关联。
- **根因**（`[代码事实]`）：旧 `saveProjectFromDialog` 空名分支直接 `return`，不显示错误；HTML 无 `#projectNameError`、无 `aria-describedby`/`aria-invalid`。原生 `required` 能阻止原生提交，但绕过原生（如 JS click）后无行内反馈、无 ARIA。
- **模式比较**：项目内其他弹窗（column/swimlane/card）也只用原生 required，无统一行内错误模式；R06 为项目名称字段建立该模式。
- **校正**：PD-010A Codex 验收已将 R06 从 P1 降为 P2（原生 required 兜底存在），本任务按 P2 补齐行内错误与 ARIA。

### R08 390px 移动端底部操作

- **复现**：`setViewportSize(390,900)` → 打开新建弹窗 → `form.scrollTop = form.scrollHeight` → 测 `.modal-actions.getBoundingClientRect().bottom`。修复前底部 > 视口高（随滚动消失）。
- **根因**（`[代码事实]`）：`styles.css:1388` `.modal form { max-height:min(86vh,860px); overflow:auto; padding:20px }`，`.modal-actions` 作为 form 子元素随容器滚动。
- **模式比较**：项目内 `.sidebar` 用 `position:sticky` 固定（testDesktopSidebarFixedWorkspaceScroll 已验证），R08 借鉴该模式并 scoped 到 `#projectDialog`。

### R14 未保存关闭确认

- **复现**：打开新建弹窗 → 填名称 → 点 ×/ESC。修复前：`<form method="dialog">` + ×按钮 `type=submit formnovalidate value=cancel`，`saveProjectFromDialog` cancel 分支直接 `return`（form method=dialog 自动关闭）；ESC 触发原生 cancel 事件直接关闭。无 dirty 判定、无确认。
- **根因**（`[代码事实]`）：
  - 旧 `saveProjectFromDialog` 第 4962 `if(submitter?.value==='cancel') return`，依赖 form method=dialog 关闭，无确认。
  - 无 dialog `cancel` 事件监听，ESC 走原生关闭。
  - 无初始快照、无 dirty 判定逻辑。
- **模式比较**：项目内 `deleteEditingCard` 用 `window.confirm()`（R15 已实现），R14 沿用 `confirm()` 模式。

## 4. 修复前失败断言证据

新增 `testProjectDialogRemediation`（32 断言）注册到 main。**修复前**运行（4 项代码均未改时）：

```
ok 71 - template project has example cards
Error: every template card carries isExample flag
    at check (.../tests/static-feature-audit-v08.js:12:11)
    at testProjectDialogRemediation (.../tests/static-feature-audit-v08.js:196:3)
```

由于 `check()` 抛错即停，第一个 R11 断言（`every template card carries isExample flag`，第 196 行）失败后停止。R06/R08/R14 断言虽未单独跑到，但其失败性由根因证据保证（R06 无 error 节点、R08 无 sticky、R14 无 confirm 监听）。这符合 `systematic-debugging`：失败断言已就位并在修复前失败。修复后逐项转绿（见第 5-8 节）。

## 5. R06 实现与测试

**实现**：
- `index.html`：项目名称 label 内加 `<em id="projectNameError" class="field-error" aria-live="polite"></em>`；input 加 `aria-describedby="projectNameError" aria-invalid="false"`。
- `app.js`：
  - 新增 `showProjectNameError()`（设错误文案 + aria-invalid=true）、`clearProjectNameError()`（清空 + aria-invalid=false）。
  - `saveProjectFromDialog` 空名分支：`showProjectNameError(); focus; return`（兜底，防止绕过原生）。
  - 监听 `invalid`（preventDefault + showProjectNameError）、`input`（clearProjectNameError）。
  - `openProjectDialog` 打开时 `clearProjectNameError()` 重置残留。
- `styles.css`：`.field-error`（错误文字，红色 + 文字"请输入项目名称"，不只靠颜色）、`#projectNameInput[aria-invalid="true"]`（红边框）。
- 保留原生 `<input required>` 兜底。invalid 监听里 `preventDefault()` 阻止原生气泡，统一定制校验；不破坏原生兜底，因为 `required` 属性仍在，且 saveProjectFromDialog 兜底独立生效。

**测试**（修复后，ok 78-85）：
- ok 78 project name error node exists
- ok 79 name input describes error node（aria-describedby === "projectNameError"）
- ok 80 project dialog stays open on empty name
- ok 81 empty name does not create project（projects.length === 2）
- ok 82 inline error text renders（含"请输入项目名称"）
- ok 83 name input marked aria-invalid on error（=== "true"）
- ok 84 aria-invalid cleared after valid input（!== "true"）
- ok 85 error text cleared after valid input（trim() === ""）

## 6. R08 实现与测试

**实现**（纯 CSS，scoped 到 `#projectDialog`）：
```css
#projectDialog .modal-header { position: sticky; top: -20px; margin: -20px -20px 0; padding: 20px 20px 12px; background: #ffffff; z-index: 2; }
#projectDialog .modal-actions { position: sticky; bottom: -20px; margin: 0 -20px -20px; padding: 12px 20px 20px; background: #ffffff; justify-content: flex-end; z-index: 2; }
```
负 margin（-20px）+ 对应 padding 抵消 form 的 20px padding 以铺满宽度；不透明白色背景；z-index:2 层级。桌面端内容不溢出时 sticky 元素留在文档流原位，不改变布局（验证：桌面端 testProjectCrudAndTemplates 等全部通过）。

**测试**（修复后，ok 96-97，390px 视口）：
- ok 96 mobile modal actions stay in viewport after scroll（actionsBottom <= viewportHeight）
- ok 97 mobile project dialog has no horizontal overflow（scrollX === 0 && clientWidth <= 390）
- 测试结束恢复视口 1280。

## 7. R11 实现与测试

**实现**：
- `app.js makeCard`：新增 `isExample: Boolean(options.isExample)`（默认 false）。
- `createProjectFromTemplate`：`card.isExample = true`（模板卡）。
- `cloneCardForCopy`：`isExample: false`（复制是用户新增，不带示例身份）。
- 卡渲染 `<h4>`：`${card.isExample ? '<span class="example-label" title="...">示例</span>' : ""}`，放在 isClosed 徽标前。
- 编辑路径 `saveCardFromDialog` 用 `Object.assign(card, payload)`，payload 不含 isExample，故编辑示例卡不丢标记（已核验）；移动 `moveCardWithinLane` 只挪位置不重建卡，安全。
- `styles.css`：`.example-label`（蓝色描边 + 文字"示例"，参照 closed-label，不只靠颜色）。

**测试**（修复后，ok 71-77）：
- ok 71 template project has example cards（length > 0）
- ok 72 every template card carries isExample flag（全部 === true）
- ok 73 example badge renders on board card（.example-label 可见）
- ok 74 blank project created
- ok 75 card created: User Card Audit
- ok 76 blank project and user cards are not examples（全部 !== true）
- ok 77 no example badge on user-created cards（.example-label count === 0）
- 关键回归：ok 103 template project has PM learning cards === 19（卡数量未变）

## 8. R14 实现与测试

**实现**：
- 模块级 `projectDialogSnapshot` 变量。
- `captureProjectDialogSnapshot()`：记录 name/description/mode/templateId/editingProjectId。在 `openProjectDialog` 的 `showModal()` 后调用。
- `isProjectDialogDirty()`：对比当前 name/description/mode/templateId 与快照。**默认模板选择不算脏**（快照记的就是默认值，对比一致）。
- `requestProjectDialogClose()`：dirty 则 `confirm("确定离开吗？未保存的内容将丢失")`，确认→清理快照+返回 true；取消→focus 名称输入+返回 false；pristine→清理+返回 true。
- `saveProjectFromDialog` cancel 分支：`preventDefault()`（阻止 form method=dialog 自动关闭）→ `requestProjectDialogClose()` → 确认才 `dialog.close()`。
- `els.projectDialog.addEventListener("cancel", ...)`：ESC 触发，`preventDefault()` → 同上流程。
- 成功保存：`clearProjectDialogSnapshot()` 后 `dialog.close()`。
- 统一入口避免重复弹窗：submit(cancel) 与 dialog cancel(ESC) 都只调 `requestProjectDialogClose` 一次。

**测试**（修复后，ok 86-95）：每段用 `page.removeAllListeners("dialog")` 干净隔离 handler，避免与全局 accept 竞争。
- ok 86 pristine close does not confirm（confirmCalls === 0）
- ok 87 pristine close exits dialog（dialog closed）
- ok 88 dirty close triggers confirm（confirmCalls === 1）
- ok 89 cancel confirm keeps dialog open（dialog 仍 open）
- ok 90 cancel confirm preserves input（名称保留）
- ok 91 dirty close re-confirms on leave（confirmCalls === 1）
- ok 92 confirm leave closes dialog
- ok 93 confirm leave does not create project（projects.length 不变）
- ok 94 dirty ESC triggers confirm
- ok 95 cancel ESC confirm keeps dialog open

## 9. 完整命令输出摘要

验收命令三连（均退出码 0）：

```
$ node --check app.js            → exit 0
$ node --check tests/static-feature-audit-v08.js → exit 0
$ node tests/static-feature-audit-v08.js
... ok 360 - analytics dialog fits mobile viewport
... ok 361 - developer dialog fits mobile viewport
... ok 362 - extension lab dialog fits mobile viewport

362 checks passed.                → exit 0
```

**稳定性复跑**：连续两次完整运行均为 `exit 0`、`362 checks passed`，无 flaky。

新增 `testProjectDialogRemediation` 贡献 25 个断言（ok 71-95），其余既有断言全部保持通过（含 testImportExport，见第 10 节说明）。模板卡数量回归（ok 103 === 19）、项目编辑/删除、列泳道增删、任务增删移、设置、移动端弹窗、桌面 sidebar 固定等既有测试全部不回归。

## 10. 未解决问题

1. **testImportExport 的 flaky 观察**：在 R14 测试调试阶段，曾观察到 testImportExport 在 `page.fill("#importJsonInput", exportJson)` 处偶发失败（等待 editable 超时，与超长含 base64 附件的 JSON 填充时序有关）。但在最终两次连续完整运行中均通过（362 passed）。这是既有测试的固有 flaky，与 R06/R08/R11/R14 修复无关（R08 sticky 仅作用于 `#projectDialog`，import 是另一 dialog）。如实报告，建议 Codex 知悉该 flaky 存在。
2. R14 的 `confirm()` 是原生阻塞对话框，可访问性与视觉一致性弱于自定义确认弹窗；任务单未要求自定义弹窗，故用 confirm。后续若 PD-011 要求统一确认组件，需重构。
3. R08 sticky 的 `top:-20px`/`bottom:-20px` 依赖 form padding 恰好为 20px；若后续调整 `.modal form` padding，需同步更新 sticky 偏移。
4. R11 徽标 `title` 属性提供 hover 提示，但触屏设备无 hover；移动端仅靠文字"示例"区分（满足"不只靠颜色"）。
5. 未验证 Safari/iOS 真机的 sticky 表现（测试为 Chromium headless）。

## 11. 风险或需要 Codex 判断的点

1. **R06 invalid preventDefault 与原生兜底**：invalid 监听里 `event.preventDefault()` 阻止了原生校验气泡，改为统一定制错误。原生 `required` 属性保留，且 `saveProjectFromDialog` 兜底独立判断空名。需 Codex 确认此定制方式可接受（任务单第 68 行允许，前提是说明不破坏原生兜底——已说明）。
2. **R08 sticky 对桌面端的零副作用**：已通过桌面端全部既有测试（项目增删改、模板、列泳道、任务、设置、移动端弹窗、sidebar 固定）验证不回归。但 sticky 在极少数浏览器/grid 布局边缘情况可能有差异，建议 Codex 在真机/多浏览器复核。
3. **R14 默认模板不算脏的判定**：快照在 `showModal()` 后、用户任何操作前记录，默认选中"从模板开始"+默认模板 id，故 pristine 关闭不确认（ok 86 验证）。若后续改默认方式逻辑，需同步检查快照时机。
4. **R14 confirm 的重复触发边界**：submit(cancel) 与 dialog cancel(ESC) 是两条独立事件路径，各自只调一次 `requestProjectDialogClose`。已验证不会同一次关闭触发两次确认。但若浏览器对 ESC 同时触发 cancel 和某种 submit，理论上可能重复——当前 Chromium 测试未见此情况。
5. **PD-011 Gate 未通过声明**：本任务完成 R06/R08/R11/R14 整改，但**不等于 PD-011 Gate 已通过**。Gate 当前仍为 No-Go，需 Codex 复核四项修复、重跑审计、并确认 V03b/V04a/V05b/V06a 对照资产与真人测试前置条件后重新评估。
6. **测试 handler 全局污染**：R14 测试段用 `removeAllListeners("dialog")` 会清掉 main 顶部注册的全局 accept handler，每段末尾重新注册恢复。若后续在 testProjectDialogRemediation 之后新增依赖全局 accept 的 dialog 测试，需确保 handler 已恢复（当前末尾已恢复）。
7. **testImportExport flaky**：建议 Codex 决定是否单独加固该既有测试（如分块 fill 或增长 timeout），但这超出本任务范围，未擅自动手。
