任务编号：PD-001
任务名称：产品机会说明与问题定义

背景：
- 当前项目是 Kanboard 新手项目创建与任务拆解优化。
- MC-002 复核已经确认：项目的静态原型和功能复现明显抢跑，但完整产品设计生命周期中的前期产物没有系统完成。
- 后续主线应暂停默认 V0.8.28 功能复现，从产品设计 0 到 1 补齐。
- `docs/00-project-governance/产品生命周期真实进度基线.md` 已作为真实进度基线。
- 本任务是产品设计补齐的第一步，只沉淀产品机会说明与问题定义，不进入 PRD 细节、不改原型代码。

目标：
- 新建一份正式的产品机会说明文档，作为后续 PRD、用户故事、流程图和原型设计的上游依据。
- 明确本项目到底要解决什么用户问题、为谁解决、为什么值得做、做成什么样算成功、哪些内容明确不做。
- 将现有选题、竞品、用户假设和需求池重新收束到“新手项目创建与任务拆解体验优化”这个核心命题上。

允许读取：
- `docs/00-project-governance/产品生命周期真实进度基线.md`
- `.agent-ops/mimo/outbox/MC-002-product-lifecycle-baseline-review-result.md`
- `README.md`
- `docs/00-project-governance/项目实战路线图.md`
- `docs/00-project-governance/Kanboard新手项目创建与任务拆解优化-启动说明.md`
- `docs/01-research-discovery/用户研究与需求池-V0.2.md`
- `docs/01-research-discovery/竞品分析报告-V0.2.md`
- `docs/04-implementation-log/00-foundation/新手创建向导说明-V0.5.md`
- `docs/00-project-governance/版本记录.md`

允许修改：
- 新建或更新 `docs/01-research-discovery/产品机会说明与问题定义-PD-001.md`
- 写入 `.agent-ops/mimo/outbox/PD-001-product-opportunity-problem-definition-result.md`

禁止事项：
- 不要修改 `index.html`、`styles.css`、`app.js`、`tests/` 或 `设计图/`。
- 不要继续扩展 Kanboard 功能复现。
- 不要写完整 PRD；本任务只完成 PRD 之前的机会定义和问题定义。
- 不要假装已有真实用户访谈结论；如果引用用户结论，必须标明是桌面研究、场景假设或待验证假设。
- 不要引入真实后端请求、真实凭据、外部依赖或网络访问。

文档要求：
1. 文档标题使用 `# 产品机会说明与问题定义 PD-001`。
2. 必须包含以下章节：
   - 项目背景
   - 产品机会一句话
   - 问题陈述 Problem Statement
   - 目标用户
   - 当前体验痛点
   - 现有证据与假设来源
   - 优化目标
   - 成功指标
   - 设计原则
   - 非目标 Non-Goals
   - 约束与风险
   - 后续需要验证的问题
3. 成功指标要区分：
   - 行为指标，例如首次项目创建完成率、首次创建耗时、模板使用率。
   - 体验指标，例如用户是否理解列结构、是否能修改示例卡。
   - 学习/作品集指标，例如是否能清楚展示发现问题、分析问题、设计方案和验证方案。
4. 设计原则必须从现有竞品分析和项目判断中提炼，不要写泛泛而谈的原则。
5. 非目标必须明确暂停系统级扩展，例如 API、部署、插件、认证、数据库、运维功能复现。
6. 结尾给出 `PD-002 用户研究计划与访谈脚本` 的输入建议。

验收方式：
```powershell
# 本任务为产品文档任务，不要求运行前端验收命令。
# 如未修改业务代码，请在结果中写明：
# 未运行 node 验收命令，原因：产品机会说明文档任务且未修改业务文件。
```

结果写入：
- `.agent-ops/mimo/outbox/PD-001-product-opportunity-problem-definition-result.md`

回传格式：
1. 修改摘要
2. 修改文件
3. 关键内容说明
4. 命令结果
5. 未解决问题
6. 风险或需要 Codex 判断的点
