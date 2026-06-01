# Kanboard 完整复现差距清单 V0.6

| 项目 | 内容 |
|---|---|
| 日期 | 2026-06-01 |
| 状态 | V0.6/V0.7 已完成，V0.8 待开发 |
| 目的 | 修正“静态页面已完成”的边界，明确后续要补齐的 Kanboard 复现范围 |

## 1. 结论

当前页面不是 Kanboard 完全复现，而是“核心看板 + 泳道/子任务/评论 + 新手创建向导”的静态原型。

如果目标改为“尽量完整复现 Kanboard 后再进入 Figma”，那么 V0.6 不应该进入 Figma，而应该先做完整复现补齐。

## 2. 官方功能参考

根据 Kanboard 官方文档，用户侧能力至少覆盖以下模块：

- Boards：看板视图、列表视图、项目概览、卡片折叠/展开、紧凑模式、隐藏/显示列。  
  参考：https://docs.kanboard.org/v1/user/boards/
- Projects：团队项目、个人项目、复制项目、权限、角色、自定义筛选。  
  参考：https://docs.kanboard.org/v1/user/projects/
- Tasks：创建任务、复制任务、移动任务、关闭任务、内部任务链接、循环任务、标签、截图、任务分析。  
  参考：https://docs.kanboard.org/v1/user/tasks/
- Swimlanes：默认泳道、多泳道、泳道拖拽、禁用/排序泳道。  
  参考：https://docs.kanboard.org/v1/user/swimlanes/
- Subtasks：子任务负责人、Todo/In progress/Done 三状态、排序、子任务计时。  
  参考：https://docs.kanboard.org/v1/user/subtasks/
- Time Tracking：任务预计耗时、实际耗时、子任务耗时汇总。  
  参考：https://docs.kanboard.org/v1/user/time_tracking/
- Automatic Actions：项目级自动化动作。  
  参考：https://docs.kanboard.org/v1/user/automatic_actions/
- Users and Groups、Notifications、Project Analytics、Advanced Search 等能力。  
  参考：https://docs.kanboard.org/

## 3. 当前已复现

- 项目创建、编辑、删除、切换。
- 看板列创建、编辑、删除、WIP 展示。
- 任务卡创建、编辑、删除。
- 卡片跨列、跨泳道流转。
- 泳道创建、编辑、删除。
- 子任务 checklist。
- 评论和活动记录。
- 负责人、分类、优先级、截止日期、标签、颜色、预计工时。
- 搜索、负责人筛选、分类筛选、泳道筛选。
- 新手项目创建向导和 4 个模板。
- localStorage 本地保存。

## 4. 仍需补齐

### V0.6：补齐 Kanboard 核心视图和任务动作（已完成）

- [x] 增加视图切换：看板视图 / 列表视图 / 项目概览。
- [x] 增加卡片折叠/展开模式。
- [x] 增加紧凑模式和隐藏/显示列。
- [x] 增加任务关闭/重新打开。
- [x] 增加任务复制、移动到其他项目。
- [x] 增加内部任务链接：阻塞、被阻塞、重复、父子任务等。
- [x] 增加高级搜索语法的轻量版。

### V0.7：补齐项目配置和协作能力（已完成）

- [x] 增加项目设置页。
- [x] 区分个人项目和团队项目。
- [x] 增加项目成员、角色和权限展示。
- [x] 增加分类管理、标签管理。
- [x] 增加自定义筛选。
- [x] 增加泳道禁用、排序、默认泳道设置。

### V0.8：补齐分析、时间和自动化

- 增加项目分析页：任务分布、完成数、周期时间的静态模拟。
- 增加任务时间跟踪：预计耗时、实际耗时、子任务耗时汇总。
- 增加循环任务配置。
- 增加自动化规则配置的静态模拟。
- 增加通知中心的静态模拟。

## 5. 暂不复现的工程能力

这些属于后端系统或部署能力，不适合作为当前静态页面完整复现目标：

- 登录注册和真实鉴权。
- 真实多用户实时协作。
- 邮件发送、RSS/iCalendar 订阅。
- 插件系统、Webhook、API 服务。
- 数据库、后台任务、Docker/服务器部署。
- 文件真实上传和服务端存储。

## 6. 调整后的原则

先把“用户能看见、能操作、能理解的 Kanboard 产品能力”补齐，再进入 Figma 高保真。

Figma 阶段不再放在 V0.6，调整到 V0.9 或后续版本。

## 7. V0.6 验证结果

- `node --check app.js` 通过。
- 浏览器自动化验证通过：列表视图、概览视图、高级搜索、任务链接、关闭任务、显示已关闭、复制任务、跨项目移动。
- 生成截图：`设计图/kanboard-v0.6-fuller-reproduction.png`。
