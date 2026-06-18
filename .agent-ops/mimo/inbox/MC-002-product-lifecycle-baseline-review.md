任务编号：MC-002-product-lifecycle-baseline-review
任务名称：完整产品生命周期真实进度复核

背景：
- 当前项目是 Kanboard 新手项目创建与任务拆解优化。
- 项目已经提前做了大量静态原型、功能复现、截图和自动化验收。
- 但从完整产品生命周期看，PRD、用户故事、验收标准、信息架构、用户旅程、流程图、可用性测试和作品集叙事等前期产品设计产物并未系统完成。
- Codex 已新增 `docs/00-project-governance/产品生命周期真实进度基线.md`，用于记录真实完成情况。
- 本任务要求 Mimo Code 复核该基线是否准确，并指出遗漏或需要修正的地方。

目标：
- 从完整产品生命周期角度复核项目真实进度。
- 判断 `docs/00-project-governance/产品生命周期真实进度基线.md` 是否准确区分了“静态实现进度”和“产品设计产物进度”。
- 补充遗漏的生命周期阶段、缺失产物和后续任务顺序建议。
- 明确后续是否应暂停 V0.8.28 功能复现，回到产品设计 0 到 1 补齐。

允许读取：
- `docs/00-project-governance/产品生命周期真实进度基线.md`
- `README.md`
- `docs/00-project-governance/项目实战路线图.md`
- `docs/00-project-governance/Kanboard新手项目创建与任务拆解优化-启动说明.md`
- `docs/01-research-discovery/用户研究与需求池-V0.2.md`
- `docs/01-research-discovery/竞品分析报告-V0.2.md`
- `docs/04-implementation-log/00-foundation/新手创建向导说明-V0.5.md`
- `docs/04-implementation-log/00-foundation/Kanboard完整复现差距清单-V0.6.md`
- `docs/05-validation/静态功能验收报告-V0.8.md`
- `docs/04-implementation-log/02-platform-capabilities/API方法细化补齐说明-V0.8.27.md`
- `docs/00-project-governance/版本记录.md`
- `index.html`
- `styles.css`
- `app.js`
- `tests/static-feature-audit-v08.js`
- `.mimocode/workflows/COLLABORATING_AGENT_WORKFLOW.md`
- `.agent-ops/mimo/README.md`

允许修改：
- 只允许写入 `.agent-ops/mimo/outbox/MC-002-product-lifecycle-baseline-review-result.md`

禁止事项：
- 不要修改业务代码。
- 不要修改 `docs/00-project-governance/产品生命周期真实进度基线.md` 或其他项目文档。
- 不要继续规划 V0.8.28 功能复现为默认主线。
- 不要生成 Figma、高保真、代码实现或新页面。
- 不要引入真实后端请求、真实凭据、外部依赖或网络访问。
- 不要使用自动化 server、attach、trace 或可视化终端方案。

复核要求：
1. 输出你对当前项目真实阶段的判断。
2. 复核 `docs/00-project-governance/产品生命周期真实进度基线.md` 中的生命周期阶段是否完整。
3. 标出文档中判断准确的部分。
4. 标出文档中需要补充、修正或降级的部分。
5. 按 P0/P1/P2 给出后续从头补齐的任务顺序。
6. 明确说明：当前是否应暂停 V0.8.28 静态功能复现，为什么。
7. 如果你认为某个“已完成”其实只能算“部分完成”，请给出依据。

验收命令：
```powershell
# 本任务为审计复核任务，不要求运行前端验收命令。
# 如未修改业务代码，请在结果中写明：
# 未运行 node 验收命令，原因：生命周期复核任务且未修改业务文件。
```

结果写入：
- `.agent-ops/mimo/outbox/MC-002-product-lifecycle-baseline-review-result.md`

回传格式：
1. 复核摘要
2. 当前真实阶段判断
3. 基线文档准确部分
4. 基线文档需修正部分
5. 产品生命周期缺口清单
6. P0/P1/P2 后续任务顺序
7. 是否暂停 V0.8.28 的判断
8. 命令结果
9. 未解决问题
10. 风险或需要 Codex 判断的点
