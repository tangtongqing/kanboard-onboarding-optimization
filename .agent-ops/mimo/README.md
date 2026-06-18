# Mimo Code 文件中转协作

这个目录只用于当前项目的文件中转：

- `inbox/`：Codex 写给 Mimo Code 的任务单。
- `outbox/`：Mimo Code 写回的结果报告。
- `archive/`：已完成任务归档。

全局协作智能体工作流不放在项目目录下。请使用：

`C:\Users\tangtongqing\.codex\skills\product-design-workflow\COLLABORATING_AGENT_WORKFLOW.md`

## 工作方式

1. Codex 根据项目目标写一份任务单到 `inbox/`。
2. 用户让 Mimo Code 打开当前项目目录，并要求它按全局协作智能体工作流读取最新任务单。
3. Mimo Code 按任务单工作，把结果写入任务指定的 `outbox/` 文件。
4. Codex 读取 `outbox/` 结果和代码 diff，进行验收。
5. 通过后进入下一轮；不通过则由 Codex 再写一份修正任务单。

## 给 Mimo Code 的固定启动语

```text
你是本项目的执行智能体。请先阅读你的全局协作智能体工作流指南，然后只读取 .agent-ops/mimo/inbox 中最新任务单，并严格按任务要求工作。
完成后把结果写入任务单指定的 .agent-ops/mimo/outbox 文件。
不要自行扩大范围；遇到不确定、测试失败、权限/安全风险时，把问题写入结果文件，不要自己猜。
```
