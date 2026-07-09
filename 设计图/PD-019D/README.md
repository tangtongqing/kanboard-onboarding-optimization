# 首次核心操作轻引导回归截图归档说明 (PD-019D)

本目录归档了在真实无头浏览器（桌面端 `1280px × 900px`，移动端 `390px × 844px`）下跑通首次核心操作轻引导回归测试后所捕获的 12 张高清截图证据。所有截图能完整、不失真地自适应呈现轻引导在交互流程中的各状态切换与避让抑制逻辑。

---

## 1. 截图文件清单与证据点说明

### [01-desktop-blank-project-no-guidance.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/01-desktop-blank-project-no-guidance.png)
*   **证据点**：**空白项目隔离，无引导展现。** 
*   **说明**：当用户创建了一个空白项目且项目内没有任何任务卡片时，看板页面清爽整洁。由于没有卡片实体作为引导锚点，系统会自动抑制，绝不展示任何拖拽、双击编辑提示点或气泡，避免干扰高级用户。

### [02-desktop-first-card-edit-dot.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/02-desktop-first-card-edit-dot.png)
*   **证据点**：**首张真实卡片呼吸红点呈现。**
*   **说明**：当用户在首列创建第一张卡片（或在新模板项目中首次渲染示例卡）之后，卡片标题左侧会浮现出一个直径为 `6px` 的橙色呼吸提示点（`.first-action-guidance-edit-dot`），用作指示双击可进行二次编辑的操作入口。

### [03-desktop-drag-guidance-popover.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/03-desktop-drag-guidance-popover.png)
*   **证据点**：**拖拽引导气泡（Popover）。**
*   **说明**：鼠标悬停在首张卡片上超过 `0.8s` 与卡片下方会自动浮现深灰色气泡提示（“试着把这个任务拖拽到‘进行中’或者其他列”），箭头指向卡片中心，引导用户尝试拖拽操作。

### [04-desktop-drag-completed-no-popover.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/04-desktop-drag-completed-no-popover.png)
*   **证据点**：**拖拽完成后气泡永久消除。**
*   **说明**：一旦用户触发了该卡片的原生 `dragstart` 动作，`dragCard` 引导进度即被置为 `completed` 并持久化。之后，气泡当场销毁，且再次 Hover 该卡片时将永远不再弹出拖拽气泡，不阻碍日常使用。

### [05-desktop-edit-guidance-popover.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/05-desktop-edit-guidance-popover.png)
*   **证据点**：**双击编辑引导气泡。**
*   **说明**：鼠标精准悬浮在卡片的橙色呼吸点上超过 `0.3s`，该点下方自适应拉起深灰编辑提示气泡（“双击可修改此示例任务的详细描述与分类属性”），向新手普及卡片打开编辑的快捷方式。

### [06-desktop-first-delete-confirm-dialog.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/06-desktop-first-delete-confirm-dialog.png)
*   **证据点**：**首次删除安全拦截自定义弹窗。**
*   **说明**：在编辑弹层中点击“删除卡片”，系统检测到该项目是首次删除操作时，会主动拦截原生 `confirm` 的生硬阻断，改为调用优雅的原生自定义模态对话框 `#firstDeleteConfirmDialog`。提供高对比度的危险次操作“确认删除”与温和主操作“取消操作”按钮，帮助小白用户消除对失误删除的恐惧。

### [07-desktop-delete-cancel-card-preserved.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/07-desktop-delete-cancel-card-preserved.png)
*   **证据点**：**取消删除防误删确认。**
*   **说明**：点击防误删拦截对话框的“取消操作”后，删除确认层立即关闭且退回到原任务编辑 Dialog 中，看板上的目标任务卡片被完美且安全地保留，没有发生任何意外流失。

### [08-desktop-task-menu-guidance.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/08-desktop-task-menu-guidance.png)
*   **证据点**：**任务更多操作菜单发现引导。**
*   **说明**：当用户首次点击任务卡片右侧的 `⋯`（ board-menu summary）调起下拉菜单时，菜单右侧自适应拉起提示气泡（“这里还有复制、关闭、移动等更多操作”），其 z-index 与定位完全受控，不遮挡菜单本身的交互子项。

### [09-desktop-suppressed-by-dialog-or-tooltip.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/09-desktop-suppressed-by-dialog-or-tooltip.png)
*   **证据点**：**非目标高优先级交互场景下的气泡互斥抑制。**
*   **说明**：当用户在引导未完成时，强行打开了“新建项目”对话框、修改了列配置或者拉起了别的 Tooltip 字段问号，处于展示态的轻引导 Popover 会即时调用 `destroyActivePopover(true)` 执行主动避让销毁，并在本地埋点中上报 `first_action_guidance_suppressed`，保证界面极简且焦点无干扰。

### [10-mobile-390-inline-guidance.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/10-mobile-390-inline-guidance.png)
*   **证据点**：**390px 视口下的响应式 inline 隐藏提示条。**
*   **说明**：在手机宽度视口下，为了防止小气泡在窄屏上因飘出视口造成截断或遮挡核心字段，气泡及橙色红点全部不展示。改为在第一张卡片底部自适应嵌入优雅的 `.first-action-guidance-inline` 提示条（高 32px，底边线颜色为规范 `#1D52B7`，文案“双击可修改此示例卡”），且支持轻触右侧 `×` 进行常态关闭与埋点上报。

### [11-mobile-390-delete-bottom-sheet.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/11-mobile-390-delete-bottom-sheet.png)
*   **证据点**：**390px 移动端防误删 Bottom Sheet 对话框。**
*   **说明**：在小屏下，删除确认 Dialog 响应式自适应呈底边靠拢滑出的 Bottom Sheet 面板，并且其“取消操作”与“确认删除”两大点击区域的高度全部对齐到不低于 `44px` 的触控人机工学指标，杜绝手指误触。

### [12-localstorage-guidance-state-and-events.png](file:///c:/Users/tangtongqing/Desktop/bin/产品经理/实战项目/Kanboard新手项目创建与任务拆解优化/设计图/PD-019D/12-localstorage-guidance-state-and-events.png)
*   **证据点**：**本地存储状态与激活日志埋点。**
*   **说明**：以代码格式覆盖呈呈现的 localStorage 进度字典和 activation-events 日志数组截图。证据表明所有四个轻引导阶段全部在对应的项目 ID 隔离下流转至 completed，且埋点日志被正确无漏地收集。

---

## 2. LocalStorage 证据参数深度剖析

### A. 进度状态机
*   **Key**：`kanboard:first-action-guidance:{projectId}`
*   **完成态实例数据**：
    ```json
    {
      "dragCard": "completed",
      "editCard": "completed",
      "deleteCard": "completed",
      "taskMenu": "completed",
      "updatedAt": "2026-07-08T03:00:44.290Z"
    }
    ```
*   **状态字段定义**：
    1.  `dragCard`：拖拽任务引导。可选状态：`not_seen` / `shown` / `completed` / `dismissed`。
    2.  `editCard`：双击卡片或点击红点引导。
    3.  `deleteCard`：首次删除防误删拦截引导。
    4.  `taskMenu`：点击任务卡 `⋯` 下拉菜单引导。

### B. 本地捕获激活埋点 (Activation Events)
*   **Key**：`kanboard:activation-events`
*   **核心埋点类型**：
    1.  `first_action_guidance_shown`：首次核心操作气泡或 inline 提示条正式在界面呈现时上报，payload 包含目标字段 `field` 及展示文本 `text`。
    2.  `first_action_guidance_suppressed`：提示气泡由于 Dialog 弹出或 Tooltip 触发而被强制抑制销毁时触发，上报被抑制的原因 `reason`。
    3.  `first_delete_confirm_viewed`：首次删除拦截对话框在浏览器拉起时触发，记录卡片 ID 与 `projectId`。
    4.  `first_delete_cancelled`：用户点击“取消操作”防误删返回时触发。
    5.  `first_delete_confirmed`：用户点击“确认删除”将卡片真正物理移除时触发。
    6.  `first_action_guidance_completed`：用户动作触发（如开始 dragstart、双击调起 openCardDialog、完成菜单编辑点击等）判定为完成时触发，标记该引导完美结束。

---

## 3. 局限性与设备验证声明
*   **移动端验证边界**：本目录下所有移动端 `390px` 截图（图 10、图 11）均在无真实物理手机机型接入的前提下，通过 Chromium 无头浏览器 390px 视口仿真得到。
*   **用户研究边界**：项目未实际招募真实的小白用户完成现场可用性实验，相关逻辑基于竞品二手研究和产品走查规范落地。
