任务编号：PD-010
任务名称：低保真线框与关键状态

背景：
- 当前项目是“Kanboard 新手项目创建与任务拆解优化”。
- MC-002 与 PD-001~PD-009 已完成各自任务范围，并通过 2026-06-18 完成度审计。
- PD-008 已定义 P001~P014 页面、核心页面 Brief、状态范围、响应式要求和线框优先级。
- PD-009 已整理现有 Token、组件规范、组件状态矩阵和 P002/P004/P005/P006/P009/P013 页面映射。
- 当前尚无真正的桌面端与 390px 低保真线框。PD-008 的桌面弹窗图只是区域结构示意，不能替代本任务。
- 本任务是 `product-design-workflow` 中的 `impeccable shape` 阶段，只做设计规划和低保真结构，不进入高保真、Figma 或代码实现。

目标：
- 新建 `docs/03-ux-design/低保真线框与关键状态-PD-010.md`。
- 将 PD-008/009 的页面 Brief、组件层级和状态规范转成可评审的低保真线框。
- 覆盖桌面端与 390px 移动端的核心创建流程，明确区域层级、内容顺序、滚动边界、固定区域、焦点顺序和主次操作。
- 将 V03~V06 转成可以比较的备选线框，不提前把未验证假设写成最终方案。
- 为后续形成性测试、PD-011 高保真 / Figma 和 `impeccable craft` 提供确认后的结构输入。

Product Design 路由：
- 总工作流：`product-design-workflow`
- register：`product`
- impeccable 阶段：`shape`
- fidelity：低保真 / sketch，不做 mid-fi 或 high-fi
- breadth：新建项目到创建成功看板首屏的完整核心流程
- interactivity：静态线框与状态说明，不做代码原型
- color strategy：Restrained，颜色只用于结构分组和状态语义，不做视觉定稿
- scene sentence：用户在白天的笔记本电脑或手机上，专注把一个模糊目标快速整理成第一张可用看板，需要清楚、安静、可预期的工作界面
- anchor references：现有 Kanboard 静态原型的产品身份；Linear 的克制表单层级与状态反馈；Notion 模板预览的信息组织，但不得照搬卡片市场结构
- visual direction probe：跳过。原因是本任务为 sketch 级低保真规划，按 `impeccable shape` 不需要图像方向探针

允许读取：
- `PRODUCT.md`
- `README.md`
- `docs/README.md`
- `docs/00-project-governance/产品生命周期真实进度基线.md`
- `docs/00-project-governance/双智能体协同推进方案.md`
- `docs/01-research-discovery/产品机会说明与问题定义-PD-001.md`
- `docs/01-research-discovery/用户研究计划与访谈脚本-PD-002.md`
- `docs/02-requirements/功能优化PRD骨架-PD-003.md`
- `docs/02-requirements/用户故事与验收标准-PD-004.md`
- `docs/03-ux-design/流程图与信息架构-PD-005.md`
- `docs/03-ux-design/交互状态规格-PD-006.md`
- `docs/03-ux-design/设计原则与非目标-PD-007.md`
- `docs/03-ux-design/高保真原型页面清单与设计Brief-PD-008.md`
- `docs/03-ux-design/设计系统整理-PD-009.md`
- `.agent-ops/mimo/outbox/PD-008-codex-validation.md`
- `.agent-ops/mimo/outbox/PD-009-codex-validation.md`
- `.agent-ops/mimo/outbox/PD-001-to-PD-009-completion-audit-2026-06-18.md`
- `index.html`
- `styles.css`
- `app.js`
- `设计图/PD-005/` 至 `设计图/PD-009/`

允许修改：
- 新建或更新 `docs/03-ux-design/低保真线框与关键状态-PD-010.md`
- 写入 `.agent-ops/mimo/outbox/PD-010-low-fidelity-wireframes-key-states-result.md`

禁止事项：
- 不要修改 `PRODUCT.md`、`README.md`、`index.html`、`styles.css`、`app.js`、`tests/`、治理文档或现有 `设计图/`。
- 不要生成 PNG、SVG、Figma 文件、高保真视觉稿、真实截图或代码实现。Mimo 只交付 Markdown 与 Mermaid 源码，图片由 Codex 验收阶段导出。
- 不要继续扩展 Kanboard 系统级功能，不要加入 API、部署、插件、认证、数据库或运维能力。
- 不要新增 PD-003~PD-009 范围之外的页面或功能。
- 不要用高保真颜色、字体、阴影、插画或装饰替代结构判断。
- 不要把默认创建方式、模板信息密度、预览层级或移动端容器模式写成最终定论。
- 不要声称已完成真实用户研究、可用性验证、高保真或 Figma。
- 不要把线框画成重复的同尺寸卡片网格；模板卡片只作为真实选择控件存在。

文档要求：
1. 标题使用 `# 低保真线框与关键状态 PD-010`。
2. 开头标注：`版本性质：假设版 / 待研究验证版 / impeccable shape 低保真输出`。
3. 必须包含以下章节：
   - 文档目的
   - Shape 设计简报
   - 上游输入与约束
   - 线框范围与屏幕清单
   - 桌面端低保真线框
   - 390px 移动端低保真线框
   - 关键状态线框
   - 滚动、固定与焦点顺序
   - V03~V06 备选方案对比
   - 形成性测试任务与观察点
   - 可访问性检查清单
   - 非目标与后续 PD-011 输入
4. `Shape 设计简报` 必须记录：Feature Summary、Primary User Action、Design Direction、Scope、Layout Strategy、Key States、Interaction Model、Content Requirements 和 Recommended References。
5. 线框必须覆盖：
   - P002 新建项目弹窗默认态
   - P004 模板列表与模板选中态
   - P005 模板预览态
   - P006 空白创建表单
   - P009 创建成功后的看板首屏
   - P013 移动端 390px 创建向导
6. 同屏或成组覆盖六类关键状态：default、selected、loading、error、success、confirmation。
7. 每个核心线框必须说明：
   - 页面/状态编号与视口
   - 用户目标和主操作
   - 区域层级与阅读顺序
   - 主操作、次操作和退出操作
   - 内容最小值、典型值和极端值
   - 可滚动区域与固定区域
   - 键盘焦点顺序
   - 移动端重排规则
   - 对应上游需求、状态和设计原则
   - 待验证点
8. 必须使用真实内容进行低保真占位，不使用无意义 Lorem Ipsum：
   - 4 个模板：个人学习、求职准备、小团队迭代、Bug 跟踪
   - 项目名称、列结构和 3~4 张示例任务
   - 清楚的按钮、错误、确认和成功文案
9. 必须使用 Mermaid 绘制至少 9 张图：
   - W01 核心屏幕与状态地图
   - W02 桌面 P002 默认态
   - W03 桌面 P004 模板列表/选中态
   - W04 桌面 P005 模板预览态
   - W05 桌面 P006 空白创建表单
   - W06 P009 创建成功看板首屏
   - W07 390px P002/P004 创建方式与模板列表
   - W08 390px P005/P006 预览与空白表单
   - W09 loading/error/success/confirmation 状态板
   可额外绘制滚动固定关系图或焦点顺序图。
10. Mermaid 线框使用灰阶或极少量语义色，节点文字直接表达区域和状态；颜色不得作为唯一信息来源。
11. 明确以下结构关系：
   - 桌面端模板列表、模板预览、名称表单和底部操作区如何共存。
   - 预览内容过长时，哪一区域滚动，底部操作是否固定。
   - 移动端单列顺序、返回路径和主操作可见性。
   - 有未保存内容时关闭如何进入 confirmation。
   - loading 时如何阻止重复提交，error 时如何保留输入并恢复。
12. V03~V06 必须提供可比较备选，但不定稿：
   - V03 模板卡片精简摘要 vs 扩展摘要
   - V04 预览单层摘要 vs 强层级分区
   - V05 默认模板路径 vs 默认空白路径
   - V06 移动端全屏容器 vs 保留边距的对话框
13. 形成性测试至少包含 4 个任务：首次选择创建方式、选择并理解模板、从空白项目快速创建、移动端完成创建；每项给出观察点和通过口径。
14. 可访问性至少检查：语义顺序、键盘顺序、可见焦点、错误关联、状态播报、非颜色语义、390px 无横向溢出和 44px 触摸目标。
15. 结尾明确 PD-011 只能在低保真结构和必要的形成性测试结论确认后进入，不得把本任务直接记为高保真完成。

验收方式：
```powershell
# 本任务为 impeccable shape / 低保真文档任务，不要求运行前端业务验收命令。
# Mimo 必须在结果中写明：
# 未运行 node 业务验收命令，原因：PD-010 只修改低保真设计文档，未修改业务代码。
# 同时报告 Mermaid 图数量、编号和所有实际修改文件。
```

结果写入：
- `.agent-ops/mimo/outbox/PD-010-low-fidelity-wireframes-key-states-result.md`

回传格式：
1. 修改摘要
2. 修改文件
3. Product Design 路由与 Shape 简报摘要
4. 桌面端线框清单
5. 390px 移动端线框清单
6. 关键状态覆盖
7. V03~V06 备选方案
8. Mermaid 图清单
9. 形成性测试输入
10. 命令结果
11. 未解决问题
12. 风险或需要 Codex 判断的点
