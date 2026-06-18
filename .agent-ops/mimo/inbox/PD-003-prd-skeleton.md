任务编号：PD-003
任务名称：功能优化 PRD 骨架

背景：
- 当前项目是 Kanboard 新手项目创建与任务拆解优化。
- MC-002 已确认：后续主线应暂停默认 V0.8.28 功能复现，回到完整产品设计生命周期补齐。
- PD-001 已完成 `docs/01-research-discovery/产品机会说明与问题定义-PD-001.md`。
- PD-002 已完成 `docs/01-research-discovery/用户研究计划与访谈脚本-PD-002.md`，但尚未执行真实访谈或可用性测试。
- 本任务需要输出 PRD 骨架 / 假设版，为后续用户故事、流程图和原型说明提供结构。

目标：
- 新建一份聚焦“新手项目创建向导”的功能优化 PRD 骨架。
- 将 PD-001 的问题定义、目标、成功指标、设计原则和非目标转成可评审 PRD 结构。
- 将 PD-002 的研究计划作为“待验证输入”，不要伪造研究结论。
- 明确 PRD 当前版本是“假设版 / 待研究验证版”，后续可在真实研究执行后更新。

允许读取：
- `docs/00-project-governance/产品生命周期真实进度基线.md`
- `docs/01-research-discovery/产品机会说明与问题定义-PD-001.md`
- `docs/01-research-discovery/用户研究计划与访谈脚本-PD-002.md`
- `.agent-ops/mimo/outbox/PD-001-product-opportunity-problem-definition-result.md`
- `.agent-ops/mimo/outbox/PD-002-user-research-plan-interview-script-result.md`
- `docs/01-research-discovery/用户研究与需求池-V0.2.md`
- `docs/01-research-discovery/竞品分析报告-V0.2.md`
- `docs/04-implementation-log/00-foundation/新手创建向导说明-V0.5.md`
- `README.md`

允许修改：
- 新建或更新 `docs/02-requirements/功能优化PRD骨架-PD-003.md`
- 写入 `.agent-ops/mimo/outbox/PD-003-prd-skeleton-result.md`

禁止事项：
- 不要修改 `index.html`、`styles.css`、`app.js`、`tests/` 或 `设计图/`。
- 不要继续扩展 Kanboard 功能复现。
- 不要把 V0.8.27 的全部系统级能力写进 PRD 范围。
- 不要把 PD-002 的研究计划写成已验证结论。
- 不要伪造用户访谈、可用性测试、埋点数据或 A/B 测试结果。
- 不要写成泛泛模板；必须聚焦“新手项目创建与任务拆解体验优化”。

文档要求：
1. 文档标题使用 `# 功能优化 PRD 骨架 PD-003`。
2. 必须在开头标注：`版本性质：假设版 / 待研究验证版`。
3. 必须包含以下章节：
   - 文档目的
   - 背景与问题
   - 目标用户
   - 目标与成功指标
   - 范围 In Scope
   - 非范围 Out of Scope
   - 用户场景
   - 需求列表
   - 功能说明
   - 交互与状态要求
   - 数据与埋点假设
   - 验收标准草案
   - 风险与待验证问题
   - 后续进入 PD-004 用户故事与验收标准的输入
4. PRD 范围必须聚焦：
   - 新建项目入口保留空白创建与模板创建。
   - 模板选择。
   - 模板预览。
   - 生成列结构和示例任务卡。
   - 创建后进入可用看板。
   - 示例卡可修改 / 可删除。
   - 老用户空白创建路径不被干扰。
5. 交互与状态要求必须至少覆盖：
   - 默认态
   - 空白创建态
   - 模板选择态
   - 模板预览态
   - 创建成功态
   - 必填错误态
   - 无模板匹配或模板不可用状态
   - 移动端基本要求
6. 验收标准草案必须能被后续 PD-004 转成用户故事验收条件。
7. 结尾必须列出哪些内容依赖 PD-002 真实研究执行后更新。

验收方式：
```powershell
# 本任务为 PRD 文档任务，不要求运行前端验收命令。
# 如未修改业务代码，请在结果中写明：
# 未运行 node 验收命令，原因：PRD 文档任务且未修改业务文件。
```

结果写入：
- `.agent-ops/mimo/outbox/PD-003-prd-skeleton-result.md`

回传格式：
1. 修改摘要
2. 修改文件
3. 关键内容说明
4. 命令结果
5. 未解决问题
6. 风险或需要 Codex 判断的点
