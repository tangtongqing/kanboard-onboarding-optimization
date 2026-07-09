# 新手激活体验回归截图与数据证据归档说明 (PD-018D)

本目录归档了在 `PD-018D` 以及 `PD-018F` 阶段生成的共计 14 张真实交互回归截图。所有截图均由 Playwright 自动化回归脚本 `scratch/take_screenshots.js` 在 headless 浏览器环境中自动捕捉，并同步生成了 localStorage 离线持久化数据。

---

## 1. 14张截图证据索引与说明

| 文件名 | 适配视口 | 核心功能场景与验证目的 |
|---|---|---|
| **`01-desktop-template-checklist-0of3.png`** | 桌面 (1280x800) | **学习模板初始化 (Checklist 0/3)**<br>用户以“学习模式”创建项目后，自动在看板顶部展示 Onboarding Checklist。当前进度为 0/3，表示尚未执行任何激活任务。 |
| **`02-desktop-example-card-open.png`** | 桌面 (1280x800) | **双击示例卡与 Onboarding 质量助手**<br>双击预置的引导示例卡（如《理解产品经理职责与能力模型》）后弹窗展示。对话框内成功映射并渲染了卡片的 `criteria`（完成标准）、`pitfall`（避坑提醒）及 `suggestion`（可修改建议）特定新手质量指导字段，不再是默认的“暂无特定标准”。 |
| **`03-desktop-checklist-1of3.png`** | 桌面 (1280x800) | **编辑示例卡 (Checklist 1/3)**<br>用户编辑保存示例卡标题后，第一个挑战“修改示例卡标题”判定完成，清单状态推进到 1/3，顶部进度条响应式递增。 |
| **`04-desktop-checklist-2of3-after-drag.png`** | 桌面 (1280x800) | **拖拽卡片 (Checklist 2/3)**<br>用户将任意卡片向右侧列拖动（如将卡片从“待学”拖入“学习中”或“已学完”）后，第二个挑战“向右侧列拖动卡片”判定完成，清单进度更新为 2/3。 |
| **`05-desktop-checklist-3of3-complete.png`** | 桌面 (1280x800) | **新建真实卡片 (Checklist 3/3)**<br>用户在首列（“待学”列）新建卡片后，第三个挑战“在首列新建卡片”判定完成，清单整体进度为 3/3。触发“全部完成”恭喜轻反馈，并记录相应埋点。 |
| **`06-desktop-checklist-dismissed-after-refresh.png`** | 桌面 (1280x800) | **永久隐藏与状态保持**<br>用户点击“永久隐藏”按钮后，Checklist 彻底淡出。刷新/重载页面后，Checklist 仍然保持隐藏状态，说明离线化 dismiss 标志生效。 |
| **`07-desktop-blank-project-no-checklist.png`** | 桌面 (1280x800) | **空白项目安全隔离**<br>切换到空白创建模式（Blank mode）新建的项目中，看板顶部干净，不会展示新手 Onboarding Checklist，保证高级用户的无干扰体验。 |
| **`08-desktop-tooltip-wip.png`** | 桌面 (1280x800) | **WIP 限制 Tooltip 交互**<br>用户将光标悬停或聚焦于 WIP 限制设置处的帮助图标时，成功触发 `wipLimit` 大白话词条解释气泡，气泡位置实现自适应对齐。 |
| **`09-desktop-tooltip-risk.png`** | 桌面 (1280x800) | **阻塞风险 Tooltip 交互**<br>用户将光标悬停在卡片关联关系（“内部任务链接”）的帮助图标上，触发 `blockRisk` 词条解释气泡。此时产品代码已完全移除程序化插桩，由真实的 app.js 触发并保持稳定显示。 |
| **`13-desktop-tooltip-swimlane.png`** | 桌面 (1280x800) | **泳道帮助 Tooltip 交互**<br>用户悬停在泳道编辑或新建的帮助图标上，触发 `swimlane` 自适应 Tooltip，文字包裹优秀无截断。 |
| **`14-desktop-tooltip-priority.png`** | 桌面 (1280x800) | **优先级帮助 Tooltip 交互**<br>用户悬停于任务卡片优先级设置的帮助图标上，触发并展示 `priority` 解释气泡。 |
| **`10-mobile-checklist-bubble-390.png`** | 移动端 (390px) | **390px 视口 Checklist Bubble**<br>在移动端 `<=` 480px 视口下，Checklist 自动折叠为右下角常驻的圆形百分比进度气泡，避免占用宝贵的移动端首屏看板空间。 |
| **`11-mobile-checklist-drawer-390.png`** | 移动端 (390px) | **390px 视口 Bottom Drawer**<br>轻触移动端百分比气泡，自下而上滑出半高 Onboarding 状态抽屉，底部配有 Backdrop 黑色半透明遮罩以防误触。 |
| **`12-mobile-tooltip-edge-390.png`** | 移动端 (390px) | **移动端视口边缘 Tooltip 避让**<br>在 390px 极窄视口下，Tooltip 自动进行两侧边缘碰撞检测，平滑调整气泡左右 offset 和三角指示针的位置，消除横向滚动条并防止内容被视口裁切。 |

---

## 2. LocalStorage 持久化数据证据

新手激活状态完全基于浏览器的 `localStorage` 进行离线持久化存储。主要包含以下两个维度的 key：

### 2.1 Onboarding Checklist 状态机实例数据
数据存储格式为 `kanboard:onboarding-checklist:{projectId}`。以下为自动化抓取得到的两组典型数据：

*   **数据样例一：一个已完成全部 3/3 挑战并且被用户手动永久隐藏的桌面模板项目**
    ```json
    {
      "shown": true,
      "dismissed": true,
      "collapsed": false,
      "completed": {
        "editExampleCard": true,
        "dragCardRight": true,
        "createRealCard": true
      },
      "createdAt": "2026-07-02T01:20:15.976Z",
      "updatedAt": "2026-07-02T01:20:22.004Z"
    }
    ```

*   **数据样例二：一个保持在 0/3 初始状态且折叠展示的移动端模板项目**
    ```json
    {
      "shown": true,
      "dismissed": false,
      "collapsed": false,
      "completed": {
        "editExampleCard": false,
        "dragCardRight": false,
        "createRealCard": false
      },
      "createdAt": "2026-07-02T01:20:29.452Z",
      "updatedAt": "2026-07-02T01:20:29.452Z"
    }
    ```

---

## 3. 本地模拟埋点系统与事件日志样例

新手激活行为埋点数据存储于 `localStorage` 的 `kanboard:activation-events` 数组中。以下为捕获的真实事件日志序列示例：

```json
[
  {
    "eventName": "activation_checklist_shown",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "templateName": "learning",
      "timestamp": "2026-07-02T01:20:15.977Z"
    }
  },
  {
    "eventName": "example_card_open",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "cardId": "card-1782876015975-e7d18b79c21a6",
      "columnId": "column-1782876015975-2cf6e6815933c",
      "timestamp": "2026-07-02T01:20:17.635Z"
    }
  },
  {
    "eventName": "activation_checklist_item_complete",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "itemId": "editExampleCard",
      "value": true,
      "timestamp": "2026-07-02T01:20:18.507Z"
    }
  },
  {
    "eventName": "example_card_edit_save",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "cardId": "card-1782876015975-e7d18b79c21a6",
      "columnId": "column-1782876015975-2cf6e6815933c",
      "previousTitle": "【学习示范】理解产品经理职责与能力模型",
      "currentTitle": "修改后的产品经理能力模型自查卡",
      "timestamp": "2026-07-02T01:20:18.509Z"
    }
  },
  {
    "eventName": "activation_checklist_item_complete",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "itemId": "dragCardRight",
      "value": true,
      "timestamp": "2026-07-02T01:20:19.647Z"
    }
  },
  {
    "eventName": "first_card_drag",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "cardId": "card-1782876015976-02b4353d432428",
      "fromCol": "column-1782876015975-06465cb49bf73",
      "toCol": "column-1782876015975-2cf6e6815933c",
      "timestamp": "2026-07-02T01:20:19.648Z"
    }
  },
  {
    "eventName": "activation_checklist_item_complete",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "itemId": "createRealCard",
      "value": true,
      "timestamp": "2026-07-02T01:20:20.838Z"
    }
  },
  {
    "eventName": "activation_checklist_all_complete",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "timestamp": "2026-07-02T01:20:20.839Z"
    }
  },
  {
    "eventName": "first_real_card_create",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "cardId": "card-1782876020838-01b06f0c112a18",
      "columnId": "column-1782876015975-1c2e1760557308",
      "title": "新建一个真实任务",
      "timestamp": "2026-07-02T01:20:20.839Z"
    }
  },
  {
    "eventName": "activation_checklist_dismiss",
    "payload": {
      "projectId": "project-1782876015976-09507d6feda858",
      "timestamp": "2026-07-02T01:20:22.004Z"
    }
  },
  {
    "eventName": "field_help_open",
    "payload": {
      "fieldName": "wipLimit",
      "isMobile": false,
      "timestamp": "2026-07-02T01:20:25.741Z"
    }
  },
  {
    "eventName": "field_help_close",
    "payload": {
      "fieldName": "wipLimit",
      "timestamp": "2026-07-02T01:20:26.154Z"
    }
  },
  {
    "eventName": "field_help_open",
    "payload": {
      "fieldName": "blockRisk",
      "isMobile": false,
      "timestamp": "2026-07-02T01:20:27.570Z"
    }
  },
  {
    "eventName": "field_help_close",
    "payload": {
      "fieldName": "blockRisk",
      "timestamp": "2026-07-02T01:20:28.014Z"
    }
  }
]
```
