const STORAGE_KEY = "kanboard-static-v07";
const PROJECT_TEMPLATES = [
  {
    id: "learning",
    name: "个人学习项目",
    description: "适合课程学习、考试准备、作品集训练，把学习任务从“要做”推进到“已学完”。",
    columns: [
      { key: "todo", title: "待学", wipLimit: 0 },
      { key: "doing", title: "学习中", wipLimit: 3 },
      { key: "done", title: "已学完", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "main", title: "学习任务", description: "课程、练习和复盘任务" }
    ],
    cards: [
      {
        column: "todo",
        swimlane: "main",
        title: "学习英语词汇",
        description: "每天完成一组高频词汇，并把不熟悉的词加入复习列表。",
        assignee: "我",
        category: "词汇",
        priority: "中",
        color: "blue",
        tags: ["英语", "输入"],
        estimate: "1.5",
        subtasks: [
          { title: "背诵 50 个高频词汇", done: false },
          { title: "完成一次自测", done: false },
          { title: "记录错误词汇", done: false }
        ]
      },
      {
        column: "doing",
        swimlane: "main",
        title: "完成两套英语试卷",
        description: "记录错题原因，区分词汇、定位、长难句和选项陷阱。",
        assignee: "我",
        category: "刷题",
        priority: "高",
        color: "green",
        tags: ["英语", "练习"],
        estimate: "3",
        subtasks: [
          { title: "完成第一套试卷", done: false },
          { title: "完成第二套试卷", done: false },
          { title: "标注错题原因", done: false }
        ]
      },
      {
        column: "todo",
        swimlane: "main",
        title: "复习之前做过的错题",
        description: "把错题从“做过”转化为“真正掌握”。",
        assignee: "我",
        category: "复盘",
        priority: "中",
        color: "amber",
        tags: ["错题", "复盘"],
        estimate: "2",
        subtasks: [
          { title: "归类错题", done: false },
          { title: "整理高频错误类型", done: false }
        ]
      }
    ]
  },
  {
    id: "job",
    name: "求职准备项目",
    description: "适合 PM 实习/校招，把简历、作品集、投递和面试推进放到同一张看板里。",
    columns: [
      { key: "todo", title: "待准备", wipLimit: 0 },
      { key: "doing", title: "进行中", wipLimit: 3 },
      { key: "sent", title: "已投递", wipLimit: 0 },
      { key: "interview", title: "面试中", wipLimit: 0 },
      { key: "done", title: "已完成", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "materials", title: "材料准备", description: "简历、作品集和自我介绍" },
      { key: "applications", title: "投递跟进", description: "岗位投递和面试状态" }
    ],
    cards: [
      {
        column: "todo",
        swimlane: "materials",
        title: "完善产品经理实习简历",
        description: "突出 Kanboard 优化项目中的调研、原型和可运行 Demo。",
        assignee: "我",
        category: "简历",
        priority: "高",
        color: "blue",
        tags: ["简历"],
        estimate: "2",
        subtasks: [
          { title: "补充项目背景", done: false },
          { title: "量化产出结果", done: false }
        ]
      },
      {
        column: "doing",
        swimlane: "materials",
        title: "整理 3 个作品集项目",
        description: "每个项目保留问题、方案、过程、结果四段表达。",
        assignee: "我",
        category: "作品集",
        priority: "高",
        color: "green",
        tags: ["作品集"],
        estimate: "4"
      },
      {
        column: "sent",
        swimlane: "applications",
        title: "投递 5 个目标岗位",
        description: "记录公司、岗位、JD 关键词和下一步动作。",
        assignee: "我",
        category: "投递",
        priority: "中",
        color: "amber",
        tags: ["投递"],
        estimate: "1"
      }
    ]
  },
  {
    id: "sprint",
    name: "小团队迭代",
    description: "适合 2-5 人小团队管理一轮需求，从需求池推进到发布验收。",
    columns: [
      { key: "backlog", title: "需求池", wipLimit: 0 },
      { key: "design", title: "设计中", wipLimit: 2 },
      { key: "dev", title: "开发中", wipLimit: 3 },
      { key: "test", title: "测试中", wipLimit: 2 },
      { key: "done", title: "已发布", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "product", title: "产品与设计", description: "需求、交互和验收标准" },
      { key: "engineering", title: "研发与测试", description: "实现、联调和发布" }
    ],
    cards: [
      {
        column: "backlog",
        swimlane: "product",
        title: "定义新手创建向导 P0 范围",
        description: "明确本轮只做模板选择、预览和生成项目。",
        assignee: "PM",
        category: "需求",
        priority: "高",
        color: "blue",
        tags: ["P0"],
        estimate: "2"
      },
      {
        column: "design",
        swimlane: "product",
        title: "绘制创建向导低保真流程",
        description: "空白项目 / 从模板开始 / 模板预览 / 创建完成。",
        assignee: "设计",
        category: "原型",
        priority: "中",
        color: "green",
        tags: ["流程"],
        estimate: "3"
      },
      {
        column: "dev",
        swimlane: "engineering",
        title: "实现模板生成逻辑",
        description: "从模板数据生成列、泳道和示例任务卡。",
        assignee: "开发",
        category: "实现",
        priority: "高",
        color: "rose",
        tags: ["前端"],
        estimate: "4"
      }
    ]
  },
  {
    id: "bug",
    name: "Bug 跟踪",
    description: "适合个人开发者或小团队跟踪问题、修复、验证和关闭。",
    columns: [
      { key: "reported", title: "已报告", wipLimit: 0 },
      { key: "triage", title: "待确认", wipLimit: 0 },
      { key: "fixing", title: "修复中", wipLimit: 3 },
      { key: "verify", title: "待验证", wipLimit: 0 },
      { key: "closed", title: "已关闭", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "frontend", title: "前端问题", description: "页面、交互和样式问题" },
      { key: "data", title: "数据问题", description: "保存、状态和字段问题" }
    ],
    cards: [
      {
        column: "reported",
        swimlane: "frontend",
        title: "拖拽后卡片状态未及时刷新",
        description: "复现步骤：拖动任务到另一个列后，指标数字需要立即更新。",
        assignee: "开发",
        category: "交互",
        priority: "高",
        color: "rose",
        tags: ["Bug"],
        estimate: "1"
      },
      {
        column: "triage",
        swimlane: "data",
        title: "刷新后评论是否正确保存",
        description: "验证 localStorage 中评论、子任务、活动记录是否完整保存。",
        assignee: "测试",
        category: "数据",
        priority: "中",
        color: "amber",
        tags: ["验证"],
        estimate: "1.5"
      },
      {
        column: "verify",
        swimlane: "frontend",
        title: "小屏下模板选择区域是否可用",
        description: "验证移动端模板列表和预览是否纵向排列。",
        assignee: "设计",
        category: "响应式",
        priority: "中",
        color: "gray",
        tags: ["UI"],
        estimate: "1"
      }
    ]
  }
];

let state = loadState();
let editingProjectId = null;
let editingColumnId = null;
let editingSwimlaneId = null;
let editingCard = null;
let draggedCard = null;
let draftSubtasks = [];
let draftComments = [];
let draftActivity = [];
let draftLinks = [];
let draftProjectSettings = null;
let selectedTemplateId = PROJECT_TEMPLATES[0].id;

const els = {
  projectList: document.querySelector("#projectList"),
  projectTitle: document.querySelector("#projectTitle"),
  projectDescription: document.querySelector("#projectDescription"),
  board: document.querySelector("#board"),
  metricCards: document.querySelector("#metricCards"),
  metricDoing: document.querySelector("#metricDoing"),
  metricDue: document.querySelector("#metricDue"),
  metricDone: document.querySelector("#metricDone"),
  searchInput: document.querySelector("#searchInput"),
  assigneeFilter: document.querySelector("#assigneeFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  swimlaneFilter: document.querySelector("#swimlaneFilter"),
  customFilterSelect: document.querySelector("#customFilterSelect"),
  viewButtons: [...document.querySelectorAll("#viewSwitcher [data-view]")],
  cardModeSelect: document.querySelector("#cardModeSelect"),
  showClosedInput: document.querySelector("#showClosedInput"),
  columnVisibility: document.querySelector("#columnVisibility"),
  memberOptions: document.querySelector("#memberOptions"),
  categoryOptions: document.querySelector("#categoryOptions"),
  projectDialog: document.querySelector("#projectDialog"),
  projectForm: document.querySelector("#projectForm"),
  projectDialogTitle: document.querySelector("#projectDialogTitle"),
  projectNameInput: document.querySelector("#projectNameInput"),
  projectDescInput: document.querySelector("#projectDescInput"),
  projectCreateOptions: document.querySelector("#projectCreateOptions"),
  projectModeInputs: [...document.querySelectorAll('input[name="projectMode"]')],
  templateArea: document.querySelector("#templateArea"),
  templatePicker: document.querySelector("#templatePicker"),
  templatePreview: document.querySelector("#templatePreview"),
  saveProjectBtn: document.querySelector("#saveProjectBtn"),
  projectSettingsDialog: document.querySelector("#projectSettingsDialog"),
  projectSettingsForm: document.querySelector("#projectSettingsForm"),
  settingsProjectTypeInput: document.querySelector("#settingsProjectTypeInput"),
  settingsDefaultSwimlaneInput: document.querySelector("#settingsDefaultSwimlaneInput"),
  memberNameInput: document.querySelector("#memberNameInput"),
  memberRoleInput: document.querySelector("#memberRoleInput"),
  addMemberBtn: document.querySelector("#addMemberBtn"),
  memberList: document.querySelector("#memberList"),
  categoryNameInput: document.querySelector("#categoryNameInput"),
  addCategoryBtn: document.querySelector("#addCategoryBtn"),
  categoryList: document.querySelector("#categoryList"),
  tagNameInput: document.querySelector("#tagNameInput"),
  addTagBtn: document.querySelector("#addTagBtn"),
  tagList: document.querySelector("#tagList"),
  filterNameInput: document.querySelector("#filterNameInput"),
  filterQueryInput: document.querySelector("#filterQueryInput"),
  addFilterBtn: document.querySelector("#addFilterBtn"),
  customFilterList: document.querySelector("#customFilterList"),
  settingsSwimlaneList: document.querySelector("#settingsSwimlaneList"),
  columnDialog: document.querySelector("#columnDialog"),
  columnForm: document.querySelector("#columnForm"),
  columnDialogTitle: document.querySelector("#columnDialogTitle"),
  columnTitleInput: document.querySelector("#columnTitleInput"),
  columnWipInput: document.querySelector("#columnWipInput"),
  deleteColumnBtn: document.querySelector("#deleteColumnBtn"),
  swimlaneDialog: document.querySelector("#swimlaneDialog"),
  swimlaneForm: document.querySelector("#swimlaneForm"),
  swimlaneDialogTitle: document.querySelector("#swimlaneDialogTitle"),
  swimlaneTitleInput: document.querySelector("#swimlaneTitleInput"),
  swimlaneDescInput: document.querySelector("#swimlaneDescInput"),
  deleteSwimlaneBtn: document.querySelector("#deleteSwimlaneBtn"),
  cardDialog: document.querySelector("#cardDialog"),
  cardForm: document.querySelector("#cardForm"),
  cardDialogTitle: document.querySelector("#cardDialogTitle"),
  cardTitleInput: document.querySelector("#cardTitleInput"),
  cardAssigneeInput: document.querySelector("#cardAssigneeInput"),
  cardSwimlaneInput: document.querySelector("#cardSwimlaneInput"),
  cardCategoryInput: document.querySelector("#cardCategoryInput"),
  cardPriorityInput: document.querySelector("#cardPriorityInput"),
  cardDueInput: document.querySelector("#cardDueInput"),
  cardTagsInput: document.querySelector("#cardTagsInput"),
  cardColorInput: document.querySelector("#cardColorInput"),
  cardEstimateInput: document.querySelector("#cardEstimateInput"),
  cardDescInput: document.querySelector("#cardDescInput"),
  subtaskSummary: document.querySelector("#subtaskSummary"),
  subtaskInput: document.querySelector("#subtaskInput"),
  addSubtaskBtn: document.querySelector("#addSubtaskBtn"),
  subtaskList: document.querySelector("#subtaskList"),
  cardOperations: document.querySelector("#cardOperations"),
  cardStatusText: document.querySelector("#cardStatusText"),
  toggleCardClosedBtn: document.querySelector("#toggleCardClosedBtn"),
  duplicateCardBtn: document.querySelector("#duplicateCardBtn"),
  moveProjectInput: document.querySelector("#moveProjectInput"),
  moveCardBtn: document.querySelector("#moveCardBtn"),
  cardLinksSection: document.querySelector("#cardLinksSection"),
  linkTypeInput: document.querySelector("#linkTypeInput"),
  linkTaskInput: document.querySelector("#linkTaskInput"),
  addLinkBtn: document.querySelector("#addLinkBtn"),
  linkList: document.querySelector("#linkList"),
  commentInput: document.querySelector("#commentInput"),
  addCommentBtn: document.querySelector("#addCommentBtn"),
  commentList: document.querySelector("#commentList"),
  activityList: document.querySelector("#activityList"),
  deleteCardBtn: document.querySelector("#deleteCardBtn")
};

document.querySelector("#newProjectBtn").addEventListener("click", () => openProjectDialog());
document.querySelector("#editProjectBtn").addEventListener("click", () => openProjectDialog(activeProject().id));
document.querySelector("#projectSettingsBtn").addEventListener("click", openProjectSettingsDialog);
document.querySelector("#deleteProjectBtn").addEventListener("click", deleteActiveProject);
document.querySelector("#addColumnBtn").addEventListener("click", () => openColumnDialog());
document.querySelector("#addSwimlaneBtn").addEventListener("click", () => openSwimlaneDialog());
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemoData);

els.searchInput.addEventListener("input", renderBoard);
els.assigneeFilter.addEventListener("change", renderBoard);
els.categoryFilter.addEventListener("change", renderBoard);
els.swimlaneFilter.addEventListener("change", renderBoard);
els.customFilterSelect.addEventListener("change", renderBoard);
els.viewButtons.forEach((button) => button.addEventListener("click", () => setViewMode(button.dataset.view)));
els.cardModeSelect.addEventListener("change", setCardMode);
els.showClosedInput.addEventListener("change", toggleClosedVisibility);
els.projectModeInputs.forEach((input) => input.addEventListener("change", renderProjectCreateOptions));
els.projectForm.addEventListener("submit", saveProjectFromDialog);
els.projectSettingsForm.addEventListener("submit", saveProjectSettings);
els.addMemberBtn.addEventListener("click", addDraftMember);
els.addCategoryBtn.addEventListener("click", addDraftCategory);
els.addTagBtn.addEventListener("click", addDraftTag);
els.addFilterBtn.addEventListener("click", addDraftCustomFilter);
els.columnForm.addEventListener("submit", saveColumnFromDialog);
els.deleteColumnBtn.addEventListener("click", deleteEditingColumn);
els.swimlaneForm.addEventListener("submit", saveSwimlaneFromDialog);
els.deleteSwimlaneBtn.addEventListener("click", deleteEditingSwimlane);
els.cardForm.addEventListener("submit", saveCardFromDialog);
els.deleteCardBtn.addEventListener("click", deleteEditingCard);
els.addSubtaskBtn.addEventListener("click", addDraftSubtask);
els.toggleCardClosedBtn.addEventListener("click", toggleEditingCardClosed);
els.duplicateCardBtn.addEventListener("click", duplicateEditingCard);
els.moveCardBtn.addEventListener("click", moveEditingCardToProject);
els.addLinkBtn.addEventListener("click", addDraftLink);
els.addCommentBtn.addEventListener("click", addDraftComment);

normalizeState();
persist();
render();

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadState() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return createDemoState();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createDemoState() {
  const projectId = uid("project");
  const laneProduct = { id: uid("lane"), title: "产品设计泳道", description: "调研、方案、文档和评审任务" };
  const laneDev = { id: uid("lane"), title: "研发实现泳道", description: "前端实现、验证和交互细节" };
  const todoColumn = { id: uid("column"), title: "待办", wipLimit: 0, cards: [] };
  const doingColumn = { id: uid("column"), title: "进行中", wipLimit: 3, cards: [] };
  const reviewColumn = { id: uid("column"), title: "待验证", wipLimit: 0, cards: [] };
  const doneColumn = { id: uid("column"), title: "已完成", wipLimit: 0, cards: [] };

  todoColumn.cards.push(makeCard({
    title: "梳理 Kanboard 核心功能",
    description: "明确 MVP 必须包含项目、列、任务卡、泳道和拖拽流转。",
    assignee: "PM",
    category: "调研",
    priority: "高",
    color: "blue",
    tags: ["MVP"],
    swimlaneId: laneProduct.id,
    subtasks: [
      { title: "定义复现范围", done: true },
      { title: "确认不做范围", done: false }
    ]
  }));
  doingColumn.cards.push(makeCard({
    title: "实现任务卡片拖拽",
    description: "卡片可以在列和泳道之间移动，表达任务状态变化。",
    assignee: "开发",
    category: "原型",
    priority: "中",
    color: "green",
    tags: ["交互"],
    swimlaneId: laneDev.id,
    subtasks: [
      { title: "跨列移动", done: true },
      { title: "跨泳道移动", done: false }
    ]
  }));
  doneColumn.cards.push(makeCard({
    title: "完成 V0.2 竞品分析",
    description: "对比 Kanboard、WeKan、Trello、Notion 的新手创建体验。",
    assignee: "PM",
    category: "文档",
    priority: "中",
    color: "gray",
    tags: ["研究"],
    swimlaneId: laneProduct.id,
    subtasks: [
      { title: "竞品维度定义", done: true },
      { title: "需求池整理", done: true }
    ]
  }));

  return {
    activeProjectId: projectId,
    projects: [
      {
        id: projectId,
        name: "产品优化项目",
        description: "复现 Kanboard 的项目、任务卡、泳道和卡片流转，再加入新手创建向导。",
        createdAt: new Date().toISOString(),
        swimlanes: [laneProduct, laneDev],
        columns: [todoColumn, doingColumn, reviewColumn, doneColumn]
      }
    ]
  };
}

function makeCard(options) {
  const now = new Date().toISOString();
  return {
    id: uid("card"),
    title: options.title,
    description: options.description || "",
    assignee: options.assignee || "",
    category: options.category || "",
    priority: options.priority || "中",
    color: options.color || "blue",
    tags: options.tags || [],
    dueDate: options.dueDate || "",
    estimate: options.estimate || "",
    swimlaneId: options.swimlaneId || "",
    isClosed: Boolean(options.isClosed),
    links: options.links || [],
    subtasks: (options.subtasks || []).map((task) => ({ id: uid("subtask"), title: task.title, done: Boolean(task.done) })),
    comments: options.comments || [],
    activity: [{ id: uid("activity"), text: "创建了任务", createdAt: now }],
    createdAt: now,
    updatedAt: now
  };
}

function normalizeState() {
  if (!state.projects?.length) state = createDemoState();
  state.ui ||= {};
  state.ui.viewMode ||= "board";
  state.ui.cardMode ||= "expanded";
  state.ui.showClosed ??= false;
  state.ui.hiddenColumns ||= {};
  state.projects.forEach((project) => {
    state.ui.hiddenColumns[project.id] ||= [];
    if (!project.swimlanes?.length) {
      project.swimlanes = [{ id: uid("lane"), title: "默认泳道", description: "默认任务分组" }];
    }
    project.settings = normalizeProjectSettings(project);
    const fallbackLaneId = project.swimlanes[0].id;
    project.columns ||= [];
    if (!project.columns.length) {
      project.columns = [
        { id: uid("column"), title: "待办", wipLimit: 0, cards: [] },
        { id: uid("column"), title: "进行中", wipLimit: 3, cards: [] },
        { id: uid("column"), title: "已完成", wipLimit: 0, cards: [] }
      ];
    }
    project.columns.forEach((column) => {
      column.cards ||= [];
      column.cards.forEach((card) => {
        card.swimlaneId ||= fallbackLaneId;
        card.subtasks ||= [];
        card.comments ||= [];
        card.activity ||= [];
        card.tags ||= [];
        card.links ||= [];
        card.isClosed ??= false;
      });
    });
  });
  if (!state.projects.some((project) => project.id === state.activeProjectId)) {
    state.activeProjectId = state.projects[0].id;
  }
}

function normalizeProjectSettings(project) {
  const cards = project.columns?.flatMap((column) => column.cards || []) || [];
  const derivedMembers = unique(cards.map((card) => card.assignee).filter(Boolean));
  const derivedCategories = unique(cards.map((card) => card.category).filter(Boolean));
  const derivedTags = unique(cards.flatMap((card) => card.tags || []));
  const settings = project.settings || {};
  const defaultLaneId = project.swimlanes.some((lane) => lane.id === settings.defaultSwimlaneId)
    ? settings.defaultSwimlaneId
    : project.swimlanes[0].id;

  return {
    projectType: settings.projectType || "team",
    defaultSwimlaneId: defaultLaneId,
    disabledSwimlaneIds: (settings.disabledSwimlaneIds || []).filter((id) => project.swimlanes.some((lane) => lane.id === id)),
    members: (settings.members?.length ? settings.members : derivedMembers.map((name) => ({ id: uid("member"), name, role: name === "PM" ? "管理员" : "成员" }))),
    categories: unique([...(settings.categories || []), ...derivedCategories]),
    tags: unique([...(settings.tags || []), ...derivedTags]),
    customFilters: settings.customFilters?.length ? settings.customFilters : [
      { id: uid("filter"), name: "我的高优先级", query: "assignee:PM priority:高 status:open" },
      { id: uid("filter"), name: "临近截止任务", query: "status:open" }
    ]
  };
}

function activeProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0];
}

function allCards(project = activeProject()) {
  return project.columns.flatMap((column) => column.cards.map((card) => ({ ...card, columnId: column.id, columnTitle: column.title })));
}

function render() {
  normalizeState();
  renderProjects();
  renderHeader();
  renderFilters();
  renderMetrics();
  renderViewControls();
  renderBoard();
}

function renderProjects() {
  els.projectList.innerHTML = "";
  state.projects.forEach((project) => {
    const button = document.createElement("button");
    button.className = `project-item ${project.id === state.activeProjectId ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(project.name)}</strong><span>${project.columns.length} 列 · ${project.swimlanes.length} 泳道 · ${allCards(project).length} 任务</span>`;
    button.addEventListener("click", () => {
      state.activeProjectId = project.id;
      persist();
      render();
    });
    els.projectList.appendChild(button);
  });
}

function renderHeader() {
  const project = activeProject();
  els.projectTitle.textContent = project.name;
  els.projectDescription.textContent = project.description || "暂无描述";
}

function renderFilters() {
  const project = activeProject();
  const cards = allCards();
  const assignees = unique([...project.settings.members.map((member) => member.name), ...cards.map((card) => card.assignee).filter(Boolean)]);
  const categories = unique([...project.settings.categories, ...cards.map((card) => card.category).filter(Boolean)]);
  fillSelect(els.assigneeFilter, "全部负责人", assignees, els.assigneeFilter.value);
  fillSelect(els.categoryFilter, "全部分类", categories, els.categoryFilter.value);
  fillSelect(els.swimlaneFilter, "全部泳道", enabledSwimlanes(project).map((lane) => lane.title), els.swimlaneFilter.value);
  fillCustomFilters(project);
  fillDatalist(els.memberOptions, assignees);
  fillDatalist(els.categoryOptions, categories);
}

function fillCustomFilters(project) {
  const selected = els.customFilterSelect.value;
  els.customFilterSelect.innerHTML = `<option value="">全部自定义筛选</option>`;
  project.settings.customFilters.forEach((filter) => {
    const option = document.createElement("option");
    option.value = filter.id;
    option.textContent = filter.name;
    els.customFilterSelect.appendChild(option);
  });
  els.customFilterSelect.value = project.settings.customFilters.some((filter) => filter.id === selected) ? selected : "";
}

function fillSelect(select, label, values, selected) {
  select.innerHTML = `<option value="">${label}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  select.value = values.includes(selected) ? selected : "";
}

function fillDatalist(list, values) {
  list.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    list.appendChild(option);
  });
}

function renderMetrics() {
  const cards = allCards();
  const openCards = cards.filter((card) => !card.isClosed);
  const doing = openCards.filter((card) => ["进行中", "开发中", "处理中", "学习中"].includes(card.columnTitle)).length;
  const done = cards.filter((card) => card.isClosed || ["已完成", "完成", "Done", "已学完"].includes(card.columnTitle)).length;
  const dueSoon = openCards.filter((card) => isDueSoon(card.dueDate)).length;
  els.metricCards.textContent = cards.length;
  els.metricDoing.textContent = doing;
  els.metricDue.textContent = dueSoon;
  els.metricDone.textContent = done;
}

function renderViewControls() {
  els.viewButtons.forEach((button) => {
    const isActive = button.dataset.view === state.ui.viewMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  els.cardModeSelect.value = state.ui.cardMode;
  els.showClosedInput.checked = state.ui.showClosed;

  const project = activeProject();
  const hiddenIds = hiddenColumnIds(project.id);
  els.columnVisibility.innerHTML = project.columns.map((column) => `
    <button class="${hiddenIds.has(column.id) ? "" : "active"}" type="button" data-column-id="${column.id}">
      ${hiddenIds.has(column.id) ? "显示" : "隐藏"} ${escapeHtml(column.title)}
    </button>
  `).join("");
  els.columnVisibility.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => toggleColumnVisibility(button.dataset.columnId));
  });
}

function setViewMode(viewMode) {
  state.ui.viewMode = viewMode;
  persist();
  render();
}

function setCardMode() {
  state.ui.cardMode = els.cardModeSelect.value;
  persist();
  render();
}

function toggleClosedVisibility() {
  state.ui.showClosed = els.showClosedInput.checked;
  persist();
  render();
}

function hiddenColumnIds(projectId = activeProject().id) {
  return new Set(state.ui.hiddenColumns?.[projectId] || []);
}

function visibleColumns(project = activeProject()) {
  const hiddenIds = hiddenColumnIds(project.id);
  return project.columns.filter((column) => !hiddenIds.has(column.id));
}

function enabledSwimlanes(project = activeProject()) {
  const disabled = new Set(project.settings.disabledSwimlaneIds || []);
  const lanes = project.swimlanes.filter((lane) => !disabled.has(lane.id));
  return lanes.length ? lanes : project.swimlanes.slice(0, 1);
}

function toggleColumnVisibility(columnId) {
  const project = activeProject();
  const hidden = new Set(state.ui.hiddenColumns[project.id] || []);
  if (hidden.has(columnId)) {
    hidden.delete(columnId);
  } else {
    hidden.add(columnId);
  }
  state.ui.hiddenColumns[project.id] = [...hidden];
  persist();
  render();
}

function renderBoard() {
  const project = activeProject();
  els.board.innerHTML = "";
  els.board.className = `board view-${state.ui.viewMode} card-mode-${state.ui.cardMode}`;
  if (state.ui.viewMode === "list") {
    renderListView(project);
    return;
  }
  if (state.ui.viewMode === "overview") {
    renderOverviewView(project);
    return;
  }

  const selectedLaneTitle = els.swimlaneFilter.value;
  const availableSwimlanes = enabledSwimlanes(project);
  const swimlanes = selectedLaneTitle
    ? availableSwimlanes.filter((lane) => lane.title === selectedLaneTitle)
    : availableSwimlanes;

  swimlanes.forEach((lane) => {
    const swimlaneEl = document.createElement("section");
    swimlaneEl.className = "swimlane";
    swimlaneEl.innerHTML = `
      <header class="swimlane-header">
        <div class="swimlane-title">
          <h3>${escapeHtml(lane.title)}</h3>
          <p>${escapeHtml(lane.description || "无说明")}</p>
        </div>
        <button class="secondary-button" type="button" data-action="edit-swimlane">编辑泳道</button>
      </header>
      <div class="swimlane-board"></div>
    `;

    swimlaneEl.querySelector('[data-action="edit-swimlane"]').addEventListener("click", () => openSwimlaneDialog(lane.id));
    const laneBoard = swimlaneEl.querySelector(".swimlane-board");
    visibleColumns(project).forEach((column) => laneBoard.appendChild(createColumnElement(column, lane)));
    els.board.appendChild(swimlaneEl);
  });
}

function renderListView(project) {
  const rows = allCards(project).filter((card) => {
    const column = project.columns.find((item) => item.id === card.columnId);
    const lane = project.swimlanes.find((item) => item.id === card.swimlaneId);
    return !hiddenColumnIds(project.id).has(card.columnId)
      && !project.settings.disabledSwimlaneIds.includes(card.swimlaneId)
      && cardMatchesFilters(card, column, lane);
  });

  const list = document.createElement("section");
  list.className = "list-view";
  list.innerHTML = `
    <div class="list-header">
      <strong>任务</strong>
      <strong>状态</strong>
      <strong>泳道</strong>
      <strong>负责人</strong>
      <strong>优先级</strong>
      <strong>截止</strong>
    </div>
  `;

  if (!rows.length) {
    list.innerHTML += `<div class="empty-state">暂无匹配任务</div>`;
  } else {
    rows.forEach((card) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `list-row ${card.isClosed ? "closed" : ""}`;
      row.innerHTML = `
        <span><strong>${escapeHtml(card.title)}</strong>${card.tags?.length ? `<em>${card.tags.map(escapeHtml).join(" / ")}</em>` : ""}</span>
        <span>${escapeHtml(card.isClosed ? "已关闭" : card.columnTitle)}</span>
        <span>${escapeHtml(project.swimlanes.find((lane) => lane.id === card.swimlaneId)?.title || "默认泳道")}</span>
        <span>${escapeHtml(card.assignee || "-")}</span>
        <span>${escapeHtml(card.priority || "-")}</span>
        <span>${escapeHtml(card.dueDate || "-")}</span>
      `;
      row.addEventListener("click", () => openCardDialog(card.columnId, card.id, card.swimlaneId));
      list.appendChild(row);
    });
  }
  els.board.appendChild(list);
}

function renderOverviewView(project) {
  const cards = allCards(project);
  const openCards = cards.filter((card) => !card.isClosed);
  const closedCards = cards.filter((card) => card.isClosed);
  const byColumn = project.columns.map((column) => ({
    title: column.title,
    count: column.cards.filter((card) => !card.isClosed).length,
    closed: column.cards.filter((card) => card.isClosed).length
  }));
  const byAssignee = groupCounts(openCards.map((card) => card.assignee || "未分配"));
  const urgent = openCards.filter((card) => ["高", "紧急"].includes(card.priority)).slice(0, 6);

  const overview = document.createElement("section");
  overview.className = "overview-view";
  overview.innerHTML = `
    <article class="overview-panel">
      <span>打开任务</span>
      <strong>${openCards.length}</strong>
    </article>
    <article class="overview-panel">
      <span>已关闭任务</span>
      <strong>${closedCards.length}</strong>
    </article>
    <article class="overview-panel">
      <span>临近截止</span>
      <strong>${openCards.filter((card) => isDueSoon(card.dueDate)).length}</strong>
    </article>
    <article class="overview-panel">
      <span>高优先级</span>
      <strong>${urgent.length}</strong>
    </article>
    <article class="overview-panel wide">
      <h3>列分布</h3>
      ${byColumn.map((item) => `
        <div class="overview-line">
          <span>${escapeHtml(item.title)}</span>
          <strong>${item.count} 打开${item.closed ? ` · ${item.closed} 关闭` : ""}</strong>
        </div>
      `).join("")}
    </article>
    <article class="overview-panel wide">
      <h3>负责人分布</h3>
      ${byAssignee.map((item) => `
        <div class="overview-line">
          <span>${escapeHtml(item.label)}</span>
          <strong>${item.count}</strong>
        </div>
      `).join("") || `<div class="empty-state">暂无负责人数据</div>`}
    </article>
    <article class="overview-panel full">
      <h3>高优先级任务</h3>
      ${urgent.length ? urgent.map((card) => `
        <button class="overview-task" type="button" data-column-id="${card.columnId}" data-card-id="${card.id}" data-swimlane-id="${card.swimlaneId}">
          <strong>${escapeHtml(card.title)}</strong>
          <span>${escapeHtml(card.columnTitle)} · ${escapeHtml(card.assignee || "未分配")} · ${escapeHtml(card.priority)}</span>
        </button>
      `).join("") : `<div class="empty-state">暂无高优先级任务</div>`}
    </article>
  `;
  overview.querySelectorAll(".overview-task").forEach((button) => {
    button.addEventListener("click", () => openCardDialog(button.dataset.columnId, button.dataset.cardId, button.dataset.swimlaneId));
  });
  els.board.appendChild(overview);
}

function createColumnElement(column, lane) {
  const columnEl = document.createElement("article");
  columnEl.className = "column";
  columnEl.dataset.columnId = column.id;
  columnEl.dataset.swimlaneId = lane.id;

  const cardsInLane = column.cards.filter((card) => card.swimlaneId === lane.id);
  const visibleCards = cardsInLane.filter((card) => cardMatchesFilters(card, column, lane));

  columnEl.innerHTML = `
    <header class="column-header">
      <div class="column-title">
        <strong>${escapeHtml(column.title)}</strong>
        <span>${cardsInLane.length} 任务${column.wipLimit ? ` · WIP ${column.wipLimit}` : ""}</span>
      </div>
      <div class="column-actions">
        <button class="icon-button" type="button" data-action="edit-column" aria-label="编辑列">⋯</button>
      </div>
    </header>
    <div class="column-body"></div>
    <footer class="column-footer">
      <button class="secondary-button" type="button" data-action="new-card">新增任务</button>
    </footer>
  `;

  const body = columnEl.querySelector(".column-body");
  if (!visibleCards.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "暂无匹配任务";
    body.appendChild(empty);
  } else {
    visibleCards.forEach((card) => body.appendChild(createCardElement(card, column.id, lane.id)));
  }

  columnEl.querySelector('[data-action="edit-column"]').addEventListener("click", () => openColumnDialog(column.id));
  columnEl.querySelector('[data-action="new-card"]').addEventListener("click", () => openCardDialog(column.id, null, lane.id));
  columnEl.addEventListener("dragover", handleColumnDragOver);
  columnEl.addEventListener("dragleave", handleColumnDragLeave);
  columnEl.addEventListener("drop", handleColumnDrop);
  return columnEl;
}

function createCardElement(card, columnId, swimlaneId) {
  const cardEl = document.createElement("article");
  const progress = getSubtaskProgress(card);
  const isCollapsed = state.ui.cardMode === "collapsed";
  const isCompact = state.ui.cardMode === "compact";
  cardEl.className = `card color-${card.color || "blue"} ${card.isClosed ? "closed" : ""}`;
  cardEl.draggable = !card.isClosed;
  cardEl.dataset.cardId = card.id;
  cardEl.dataset.columnId = columnId;
  cardEl.dataset.swimlaneId = swimlaneId;
  cardEl.innerHTML = `
    <div class="card-topline">
      <h4>${escapeHtml(card.title)}${card.isClosed ? `<span class="closed-label">已关闭</span>` : ""}</h4>
      <div class="card-sort">
        <button class="mini-button" type="button" data-action="move-up" aria-label="上移">↑</button>
        <button class="mini-button" type="button" data-action="move-down" aria-label="下移">↓</button>
      </div>
    </div>
    ${!isCollapsed && !isCompact && card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
    ${!isCollapsed ? `
      <div class="card-meta">
        ${card.assignee ? `<span class="pill">${escapeHtml(card.assignee)}</span>` : ""}
        ${card.category && !isCompact ? `<span class="pill">${escapeHtml(card.category)}</span>` : ""}
        ${card.priority ? `<span class="pill priority-${priorityClass(card.priority)}">${escapeHtml(card.priority)}</span>` : ""}
        ${card.estimate && !isCompact ? `<span class="pill">${escapeHtml(card.estimate)}h</span>` : ""}
        ${card.links?.length && !isCompact ? `<span class="pill">${card.links.length} 链接</span>` : ""}
        ${card.dueDate ? `<span class="pill ${isOverdue(card.dueDate) ? "overdue" : ""}">${escapeHtml(card.dueDate)}</span>` : ""}
      </div>
      ${card.tags?.length && !isCompact ? `<div class="tag-row">${card.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      ${card.subtasks?.length ? `<div class="progress-bar" title="子任务 ${progress.done}/${progress.total}"><span style="width: ${progress.percent}%"></span></div>` : ""}
    ` : ""}
  `;

  cardEl.querySelector('[data-action="move-up"]').addEventListener("click", (event) => {
    event.stopPropagation();
    moveCardWithinLane(columnId, card.id, -1);
  });
  cardEl.querySelector('[data-action="move-down"]').addEventListener("click", (event) => {
    event.stopPropagation();
    moveCardWithinLane(columnId, card.id, 1);
  });
  cardEl.addEventListener("click", () => openCardDialog(columnId, card.id, swimlaneId));
  cardEl.addEventListener("dragstart", (event) => {
    draggedCard = { columnId, cardId: card.id, swimlaneId };
    cardEl.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", card.id);
  });
  cardEl.addEventListener("dragend", () => {
    draggedCard = null;
    cardEl.classList.remove("dragging");
    document.querySelectorAll(".column.drop-target").forEach((el) => el.classList.remove("drop-target"));
  });
  return cardEl;
}

function cardMatchesFilters(card, column = null, lane = null) {
  if (card.isClosed && !state.ui.showClosed) return false;
  const query = parseSearchQuery(currentSearchQuery());
  const assignee = els.assigneeFilter.value;
  const category = els.categoryFilter.value;
  const laneTitle = lane?.title || "";
  const columnTitle = column?.title || "";
  if (assignee && card.assignee !== assignee) return false;
  if (category && card.category !== category) return false;
  if (query.filters.assignee && card.assignee !== query.filters.assignee) return false;
  if (query.filters.category && card.category !== query.filters.category) return false;
  if (query.filters.priority && card.priority !== query.filters.priority) return false;
  if (query.filters.column && !columnTitle.toLowerCase().includes(query.filters.column.toLowerCase())) return false;
  if (query.filters.lane && !laneTitle.toLowerCase().includes(query.filters.lane.toLowerCase())) return false;
  if (query.filters.tag && !(card.tags || []).some((tag) => tag.toLowerCase().includes(query.filters.tag.toLowerCase()))) return false;
  if (query.filters.status === "closed" && !card.isClosed) return false;
  if (query.filters.status === "open" && card.isClosed) return false;

  const text = [
    card.title,
    card.description,
    card.assignee,
    card.category,
    card.priority,
    columnTitle,
    laneTitle,
    ...(card.tags || []),
    ...(card.links || []).map((link) => `${link.type} ${link.targetTitle}`)
  ].join(" ").toLowerCase();
  return query.terms.every((term) => text.includes(term.toLowerCase()));
}

function currentSearchQuery() {
  const project = activeProject();
  const customFilter = project.settings.customFilters.find((filter) => filter.id === els.customFilterSelect.value);
  return [els.searchInput.value, customFilter?.query].filter(Boolean).join(" ");
}

function parseSearchQuery(raw) {
  const result = { terms: [], filters: {} };
  raw.trim().split(/\s+/).filter(Boolean).forEach((token) => {
    const match = token.match(/^([a-zA-Z]+):(.+)$/);
    if (!match) {
      result.terms.push(token);
      return;
    }
    const keyMap = {
      assignee: "assignee",
      user: "assignee",
      category: "category",
      cat: "category",
      tag: "tag",
      priority: "priority",
      column: "column",
      lane: "lane",
      swimlane: "lane",
      status: "status"
    };
    const key = keyMap[match[1].toLowerCase()];
    if (key) result.filters[key] = match[2];
  });
  return result;
}

function openProjectDialog(projectId = null) {
  editingProjectId = projectId;
  const project = projectId ? state.projects.find((item) => item.id === projectId) : null;
  els.projectDialogTitle.textContent = project ? "编辑项目" : "新建项目";
  els.projectNameInput.value = project?.name || "";
  els.projectDescInput.value = project?.description || "";
  els.projectCreateOptions.style.display = project ? "none" : "grid";
  els.saveProjectBtn.textContent = project ? "保存" : "创建项目";
  if (!project) {
    selectedTemplateId = PROJECT_TEMPLATES[0].id;
    els.projectModeInputs.forEach((input) => {
      input.checked = input.value === "template";
    });
    renderProjectCreateOptions();
  }
  els.projectDialog.showModal();
  els.projectNameInput.focus();
}

function selectedProjectMode() {
  return els.projectModeInputs.find((input) => input.checked)?.value || "template";
}

function renderProjectCreateOptions() {
  const isTemplateMode = selectedProjectMode() === "template";
  els.templateArea.style.display = isTemplateMode ? "grid" : "none";
  if (!isTemplateMode) return;

  renderTemplatePicker();
  renderTemplatePreview();
}

function renderTemplatePicker() {
  els.templatePicker.innerHTML = "";
  PROJECT_TEMPLATES.forEach((template) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `template-option ${template.id === selectedTemplateId ? "active" : ""}`;
    button.setAttribute("aria-pressed", template.id === selectedTemplateId ? "true" : "false");
    button.innerHTML = `
      <strong>${escapeHtml(template.name)}</strong>
      <span>${template.columns.length} 列 · ${template.swimlanes.length} 泳道 · ${template.cards.length} 张示例卡</span>
    `;
    button.addEventListener("click", () => {
      selectedTemplateId = template.id;
      renderTemplatePicker();
      renderTemplatePreview();
    });
    els.templatePicker.appendChild(button);
  });
}

function renderTemplatePreview() {
  const template = PROJECT_TEMPLATES.find((item) => item.id === selectedTemplateId) || PROJECT_TEMPLATES[0];
  const columnPreview = template.columns.map((column) => column.title).join(" → ");
  const lanePreview = template.swimlanes.map((lane) => lane.title).join(" / ");
  const cardPreview = template.cards.slice(0, 4).map((card) => card.title).join(" / ");

  els.templatePreview.innerHTML = `
    <h4>${escapeHtml(template.name)}</h4>
    <p>${escapeHtml(template.description)}</p>
    <div class="preview-grid">
      <div class="preview-box">
        <strong>看板列</strong>
        <span>${escapeHtml(columnPreview)}</span>
      </div>
      <div class="preview-box">
        <strong>泳道</strong>
        <span>${escapeHtml(lanePreview)}</span>
      </div>
      <div class="preview-box">
        <strong>示例任务</strong>
        <span>${escapeHtml(cardPreview)}</span>
      </div>
    </div>
  `;
}

function createBlankProject(name, description) {
  const lane = { id: uid("lane"), title: "默认泳道", description: "默认任务分组" };
  return {
    id: uid("project"),
    name,
    description,
    createdAt: new Date().toISOString(),
    swimlanes: [lane],
    columns: [
      { id: uid("column"), title: "待办", wipLimit: 0, cards: [] },
      { id: uid("column"), title: "进行中", wipLimit: 3, cards: [] },
      { id: uid("column"), title: "已完成", wipLimit: 0, cards: [] }
    ]
  };
}

function createProjectFromTemplate(name, description, templateId) {
  const template = PROJECT_TEMPLATES.find((item) => item.id === templateId) || PROJECT_TEMPLATES[0];
  const lanes = template.swimlanes.map((lane) => ({
    id: uid("lane"),
    title: lane.title,
    description: lane.description
  }));
  const laneByKey = new Map(template.swimlanes.map((lane, index) => [lane.key, lanes[index]]));
  const columns = template.columns.map((column) => ({
    id: uid("column"),
    title: column.title,
    wipLimit: column.wipLimit || 0,
    cards: []
  }));
  const columnByKey = new Map(template.columns.map((column, index) => [column.key, columns[index]]));

  template.cards.forEach((templateCard) => {
    const column = columnByKey.get(templateCard.column) || columns[0];
    const lane = laneByKey.get(templateCard.swimlane) || lanes[0];
    const card = makeCard({
      ...clone(templateCard),
      swimlaneId: lane.id
    });
    card.activity = addActivity(card.activity, `由「${template.name}」模板生成`);
    column.cards.push(card);
  });

  return {
    id: uid("project"),
    name,
    description: description || template.description,
    createdAt: new Date().toISOString(),
    swimlanes: lanes,
    columns
  };
}

function saveProjectFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const name = els.projectNameInput.value.trim();
  if (!name) return;

  if (editingProjectId) {
    const project = state.projects.find((item) => item.id === editingProjectId);
    project.name = name;
    project.description = els.projectDescInput.value.trim();
  } else {
    const mode = selectedProjectMode();
    const project = mode === "template"
      ? createProjectFromTemplate(name, els.projectDescInput.value.trim(), selectedTemplateId)
      : createBlankProject(name, els.projectDescInput.value.trim());
    state.projects.push(project);
    state.activeProjectId = project.id;
  }

  editingProjectId = null;
  els.projectDialog.close();
  persist();
  render();
}

function openProjectSettingsDialog() {
  const project = activeProject();
  draftProjectSettings = {
    ...clone(project.settings),
    swimlanes: clone(project.swimlanes)
  };
  els.settingsProjectTypeInput.value = draftProjectSettings.projectType;
  renderProjectSettings();
  els.projectSettingsDialog.showModal();
}

function saveProjectSettings(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const project = activeProject();
  const { swimlanes, ...settings } = draftProjectSettings;
  project.swimlanes = swimlanes;
  project.settings = {
    ...settings,
    projectType: els.settingsProjectTypeInput.value,
    defaultSwimlaneId: els.settingsDefaultSwimlaneInput.value
  };
  draftProjectSettings = null;
  els.projectSettingsDialog.close();
  persist();
  render();
}

function renderProjectSettings() {
  if (!draftProjectSettings) return;
  els.settingsDefaultSwimlaneInput.innerHTML = draftProjectSettings.swimlanes
    .map((lane) => `<option value="${lane.id}">${escapeHtml(lane.title)}</option>`)
    .join("");
  els.settingsDefaultSwimlaneInput.value = draftProjectSettings.defaultSwimlaneId;
  els.settingsDefaultSwimlaneInput.onchange = () => {
    draftProjectSettings.defaultSwimlaneId = els.settingsDefaultSwimlaneInput.value;
    draftProjectSettings.disabledSwimlaneIds = draftProjectSettings.disabledSwimlaneIds.filter((id) => id !== draftProjectSettings.defaultSwimlaneId);
    renderProjectSettings();
  };
  renderMemberSettings();
  renderSimpleSettingList(els.categoryList, draftProjectSettings.categories, "category");
  renderSimpleSettingList(els.tagList, draftProjectSettings.tags, "tag");
  renderCustomFilterSettings();
  renderSwimlaneSettings();
}

function renderMemberSettings() {
  els.memberList.innerHTML = draftProjectSettings.members.length
    ? draftProjectSettings.members.map((member) => `
      <div class="settings-item" data-id="${member.id}">
        <strong>${escapeHtml(member.name)}</strong>
        <select data-action="role">
          ${["管理员", "成员", "访客"].map((role) => `<option value="${role}" ${member.role === role ? "selected" : ""}>${role}</option>`).join("")}
        </select>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除成员">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无成员</div>`;

  els.memberList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="role"]').addEventListener("change", (event) => {
      const member = draftProjectSettings.members.find((item) => item.id === row.dataset.id);
      member.role = event.target.value;
    });
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      draftProjectSettings.members = draftProjectSettings.members.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderSimpleSettingList(container, values, type) {
  container.innerHTML = values.length
    ? values.map((value) => `
      <div class="settings-item" data-value="${escapeHtml(value)}">
        <strong>${escapeHtml(value)}</strong>
        <button class="mini-button" type="button" aria-label="删除">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无${type === "category" ? "分类" : "标签"}</div>`;

  container.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      const target = row.dataset.value;
      if (type === "category") {
        draftProjectSettings.categories = draftProjectSettings.categories.filter((item) => item !== target);
      } else {
        draftProjectSettings.tags = draftProjectSettings.tags.filter((item) => item !== target);
      }
      renderProjectSettings();
    });
  });
}

function renderCustomFilterSettings() {
  els.customFilterList.innerHTML = draftProjectSettings.customFilters.length
    ? draftProjectSettings.customFilters.map((filter) => `
      <div class="settings-item filter-item" data-id="${filter.id}">
        <strong>${escapeHtml(filter.name)}</strong>
        <span>${escapeHtml(filter.query)}</span>
        <button class="mini-button" type="button" aria-label="删除筛选">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无自定义筛选</div>`;

  els.customFilterList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftProjectSettings.customFilters = draftProjectSettings.customFilters.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderSwimlaneSettings() {
  const disabled = new Set(draftProjectSettings.disabledSwimlaneIds);
  els.settingsSwimlaneList.innerHTML = draftProjectSettings.swimlanes.map((lane, index) => `
    <div class="settings-item swimlane-setting" data-id="${lane.id}">
      <div>
        <strong>${escapeHtml(lane.title)}</strong>
        <span>${escapeHtml(lane.description || "无说明")}</span>
      </div>
      <span class="role-pill">${draftProjectSettings.defaultSwimlaneId === lane.id ? "默认" : disabled.has(lane.id) ? "已禁用" : "启用"}</span>
      <button class="mini-button" type="button" data-action="up" aria-label="上移" ${index === 0 ? "disabled" : ""}>↑</button>
      <button class="mini-button" type="button" data-action="down" aria-label="下移" ${index === draftProjectSettings.swimlanes.length - 1 ? "disabled" : ""}>↓</button>
      <button class="secondary-button" type="button" data-action="toggle">${disabled.has(lane.id) ? "启用" : "禁用"}</button>
    </div>
  `).join("");

  els.settingsSwimlaneList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="up"]').addEventListener("click", () => moveDraftSwimlane(row.dataset.id, -1));
    row.querySelector('[data-action="down"]').addEventListener("click", () => moveDraftSwimlane(row.dataset.id, 1));
    row.querySelector('[data-action="toggle"]').addEventListener("click", () => toggleDraftSwimlane(row.dataset.id));
  });
}

function addDraftMember() {
  const name = els.memberNameInput.value.trim();
  if (!name || draftProjectSettings.members.some((member) => member.name === name)) return;
  draftProjectSettings.members.push({ id: uid("member"), name, role: els.memberRoleInput.value });
  els.memberNameInput.value = "";
  renderProjectSettings();
}

function addDraftCategory() {
  const value = els.categoryNameInput.value.trim();
  if (!value || draftProjectSettings.categories.includes(value)) return;
  draftProjectSettings.categories.push(value);
  draftProjectSettings.categories = unique(draftProjectSettings.categories);
  els.categoryNameInput.value = "";
  renderProjectSettings();
}

function addDraftTag() {
  const value = els.tagNameInput.value.trim();
  if (!value || draftProjectSettings.tags.includes(value)) return;
  draftProjectSettings.tags.push(value);
  draftProjectSettings.tags = unique(draftProjectSettings.tags);
  els.tagNameInput.value = "";
  renderProjectSettings();
}

function addDraftCustomFilter() {
  const name = els.filterNameInput.value.trim();
  const query = els.filterQueryInput.value.trim();
  if (!name || !query) return;
  draftProjectSettings.customFilters.push({ id: uid("filter"), name, query });
  els.filterNameInput.value = "";
  els.filterQueryInput.value = "";
  renderProjectSettings();
}

function moveDraftSwimlane(swimlaneId, direction) {
  const index = draftProjectSettings.swimlanes.findIndex((lane) => lane.id === swimlaneId);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= draftProjectSettings.swimlanes.length) return;
  [draftProjectSettings.swimlanes[index], draftProjectSettings.swimlanes[nextIndex]] = [draftProjectSettings.swimlanes[nextIndex], draftProjectSettings.swimlanes[index]];
  renderProjectSettings();
}

function toggleDraftSwimlane(swimlaneId) {
  if (draftProjectSettings.defaultSwimlaneId === swimlaneId) {
    alert("默认泳道不能禁用。");
    return;
  }
  const disabled = new Set(draftProjectSettings.disabledSwimlaneIds);
  if (disabled.has(swimlaneId)) {
    disabled.delete(swimlaneId);
  } else {
    const enabledCount = draftProjectSettings.swimlanes.filter((lane) => !disabled.has(lane.id)).length;
    if (enabledCount <= 1) {
      alert("至少保留一个启用泳道。");
      return;
    }
    disabled.add(swimlaneId);
  }
  draftProjectSettings.disabledSwimlaneIds = [...disabled];
  renderProjectSettings();
}

function deleteActiveProject() {
  if (state.projects.length <= 1) {
    alert("至少保留一个项目。");
    return;
  }
  const project = activeProject();
  if (!confirm(`删除项目“${project.name}”？`)) return;
  state.projects = state.projects.filter((item) => item.id !== project.id);
  state.activeProjectId = state.projects[0].id;
  persist();
  render();
}

function openColumnDialog(columnId = null) {
  editingColumnId = columnId;
  const column = columnId ? activeProject().columns.find((item) => item.id === columnId) : null;
  els.columnDialogTitle.textContent = column ? "编辑列" : "新增列";
  els.columnTitleInput.value = column?.title || "";
  els.columnWipInput.value = column?.wipLimit || "";
  els.deleteColumnBtn.style.visibility = column ? "visible" : "hidden";
  els.columnDialog.showModal();
  els.columnTitleInput.focus();
}

function saveColumnFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.columnTitleInput.value.trim();
  if (!title) return;
  const wipLimit = Number(els.columnWipInput.value) || 0;
  const project = activeProject();

  if (editingColumnId) {
    const column = project.columns.find((item) => item.id === editingColumnId);
    column.title = title;
    column.wipLimit = wipLimit;
  } else {
    project.columns.push({ id: uid("column"), title, wipLimit, cards: [] });
  }

  editingColumnId = null;
  els.columnDialog.close();
  persist();
  render();
}

function deleteEditingColumn() {
  if (!editingColumnId) return;
  const project = activeProject();
  if (project.columns.length <= 1) {
    alert("至少保留一个看板列。");
    return;
  }
  const column = project.columns.find((item) => item.id === editingColumnId);
  const message = column.cards.length
    ? `删除“${column.title}”列？其中 ${column.cards.length} 个任务也会被删除。`
    : `删除“${column.title}”列？`;
  if (!confirm(message)) return;
  project.columns = project.columns.filter((item) => item.id !== editingColumnId);
  editingColumnId = null;
  els.columnDialog.close();
  persist();
  render();
}

function openSwimlaneDialog(swimlaneId = null) {
  editingSwimlaneId = swimlaneId;
  const lane = swimlaneId ? activeProject().swimlanes.find((item) => item.id === swimlaneId) : null;
  els.swimlaneDialogTitle.textContent = lane ? "编辑泳道" : "新增泳道";
  els.swimlaneTitleInput.value = lane?.title || "";
  els.swimlaneDescInput.value = lane?.description || "";
  els.deleteSwimlaneBtn.style.visibility = lane ? "visible" : "hidden";
  els.swimlaneDialog.showModal();
  els.swimlaneTitleInput.focus();
}

function saveSwimlaneFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.swimlaneTitleInput.value.trim();
  if (!title) return;
  const project = activeProject();

  if (editingSwimlaneId) {
    const lane = project.swimlanes.find((item) => item.id === editingSwimlaneId);
    lane.title = title;
    lane.description = els.swimlaneDescInput.value.trim();
  } else {
    project.swimlanes.push({ id: uid("lane"), title, description: els.swimlaneDescInput.value.trim() });
  }

  editingSwimlaneId = null;
  els.swimlaneDialog.close();
  persist();
  render();
}

function deleteEditingSwimlane() {
  if (!editingSwimlaneId) return;
  const project = activeProject();
  if (project.swimlanes.length <= 1) {
    alert("至少保留一个泳道。");
    return;
  }
  const lane = project.swimlanes.find((item) => item.id === editingSwimlaneId);
  if (!confirm(`删除泳道“${lane.title}”？其中任务会移动到第一个泳道。`)) return;
  const fallbackLane = project.swimlanes.find((item) => item.id !== editingSwimlaneId);
  project.columns.forEach((column) => {
    column.cards.forEach((card) => {
      if (card.swimlaneId === editingSwimlaneId) card.swimlaneId = fallbackLane.id;
    });
  });
  project.swimlanes = project.swimlanes.filter((item) => item.id !== editingSwimlaneId);
  editingSwimlaneId = null;
  els.swimlaneDialog.close();
  persist();
  render();
}

function openCardDialog(columnId, cardId = null, swimlaneId = null) {
  const project = activeProject();
  const column = project.columns.find((item) => item.id === columnId);
  const card = cardId ? column.cards.find((item) => item.id === cardId) : null;
  editingCard = { columnId, cardId };
  const laneId = card?.swimlaneId || swimlaneId || project.settings.defaultSwimlaneId || project.swimlanes[0].id;

  els.cardDialogTitle.textContent = card ? "编辑任务" : "新增任务";
  els.cardTitleInput.value = card?.title || "";
  els.cardDescInput.value = card?.description || "";
  els.cardAssigneeInput.value = card?.assignee || "";
  els.cardCategoryInput.value = card?.category || "";
  els.cardPriorityInput.value = card?.priority || "中";
  els.cardDueInput.value = card?.dueDate || "";
  els.cardTagsInput.value = card?.tags?.join(", ") || "";
  els.cardColorInput.value = card?.color || "blue";
  els.cardEstimateInput.value = card?.estimate || "";
  els.cardSwimlaneInput.innerHTML = enabledSwimlanes(project).map((lane) => `<option value="${lane.id}">${escapeHtml(lane.title)}</option>`).join("");
  els.cardSwimlaneInput.value = laneId;
  if (!els.cardSwimlaneInput.value) els.cardSwimlaneInput.value = enabledSwimlanes(project)[0].id;
  els.deleteCardBtn.style.visibility = card ? "visible" : "hidden";
  els.cardOperations.style.display = card ? "grid" : "none";
  els.cardLinksSection.style.display = card ? "grid" : "none";
  els.cardStatusText.textContent = card?.isClosed ? "已关闭" : "打开";
  els.toggleCardClosedBtn.textContent = card?.isClosed ? "重新打开任务" : "关闭任务";
  els.moveProjectInput.innerHTML = state.projects
    .filter((item) => item.id !== project.id)
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join("");
  els.moveCardBtn.disabled = !card || state.projects.length <= 1;
  draftSubtasks = clone(card?.subtasks || []);
  draftComments = clone(card?.comments || []);
  draftActivity = clone(card?.activity || []);
  draftLinks = clone(card?.links || []);
  renderCardLinkOptions(card?.id);
  renderCardDetails();
  els.cardDialog.showModal();
  els.cardTitleInput.focus();
}

function saveCardFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.cardTitleInput.value.trim();
  if (!title) return;

  const project = activeProject();
  const sourceColumn = project.columns.find((item) => item.id === editingCard.columnId);
  const targetSwimlaneId = els.cardSwimlaneInput.value;
  const tags = els.cardTagsInput.value.split(",").map((tag) => tag.trim()).filter(Boolean);
  const payload = {
    title,
    description: els.cardDescInput.value.trim(),
    assignee: els.cardAssigneeInput.value.trim(),
    category: els.cardCategoryInput.value.trim(),
    priority: els.cardPriorityInput.value,
    dueDate: els.cardDueInput.value,
    tags,
    color: els.cardColorInput.value,
    estimate: els.cardEstimateInput.value,
    swimlaneId: targetSwimlaneId,
    subtasks: draftSubtasks,
    comments: draftComments,
    links: draftLinks,
    activity: draftActivity,
    updatedAt: new Date().toISOString()
  };

  if (editingCard.cardId) {
    const card = sourceColumn.cards.find((item) => item.id === editingCard.cardId);
    payload.activity = addActivity(draftActivity, "更新了任务信息");
    Object.assign(card, payload);
  } else {
    const card = makeCard(payload);
    card.comments = draftComments;
    card.activity = addActivity(card.activity, "添加到看板");
    sourceColumn.cards.push(card);
  }

  editingCard = null;
  els.cardDialog.close();
  persist();
  render();
}

function deleteEditingCard() {
  if (!editingCard?.cardId) return;
  if (!confirm("删除这个任务？")) return;
  const column = activeProject().columns.find((item) => item.id === editingCard.columnId);
  column.cards = column.cards.filter((card) => card.id !== editingCard.cardId);
  editingCard = null;
  els.cardDialog.close();
  persist();
  render();
}

function toggleEditingCardClosed() {
  const context = findCardContext(editingCard?.cardId);
  if (!context) return;
  context.card.isClosed = !context.card.isClosed;
  context.card.updatedAt = new Date().toISOString();
  context.card.activity = addActivity(context.card.activity || [], context.card.isClosed ? "关闭了任务" : "重新打开了任务");
  draftActivity = clone(context.card.activity);
  els.cardStatusText.textContent = context.card.isClosed ? "已关闭" : "打开";
  els.toggleCardClosedBtn.textContent = context.card.isClosed ? "重新打开任务" : "关闭任务";
  persist();
  render();
  renderCardDetails();
}

function duplicateEditingCard() {
  const context = findCardContext(editingCard?.cardId);
  if (!context) return;
  const copy = cloneCardForCopy(context.card);
  context.column.cards.push(copy);
  persist();
  render();
  alert("已复制任务到当前列。");
}

function moveEditingCardToProject() {
  const targetProjectId = els.moveProjectInput.value;
  const context = findCardContext(editingCard?.cardId);
  const targetProject = state.projects.find((project) => project.id === targetProjectId);
  if (!context || !targetProject) return;

  context.column.cards = context.column.cards.filter((card) => card.id !== context.card.id);
  const targetColumn = targetProject.columns[0];
  const targetLane = targetProject.swimlanes.find((lane) => lane.id === targetProject.settings.defaultSwimlaneId) || enabledSwimlanes(targetProject)[0];
  context.card.swimlaneId = targetLane.id;
  context.card.updatedAt = new Date().toISOString();
  context.card.activity = addActivity(context.card.activity || [], `移动到项目“${targetProject.name}”`);
  targetColumn.cards.push(context.card);
  state.activeProjectId = targetProject.id;
  editingCard = null;
  els.cardDialog.close();
  persist();
  render();
}

function addDraftLink() {
  const targetCardId = els.linkTaskInput.value;
  const target = allCards().find((card) => card.id === targetCardId);
  if (!target || draftLinks.some((link) => link.targetCardId === targetCardId && link.type === els.linkTypeInput.value)) return;
  draftLinks.push({
    id: uid("link"),
    type: els.linkTypeInput.value,
    targetCardId,
    targetTitle: target.title
  });
  draftActivity = addActivity(draftActivity, `添加了“${els.linkTypeInput.value}”任务链接`);
  renderCardDetails();
}

function addDraftSubtask() {
  const title = els.subtaskInput.value.trim();
  if (!title) return;
  draftSubtasks.push({ id: uid("subtask"), title, done: false });
  els.subtaskInput.value = "";
  renderCardDetails();
}

function addDraftComment() {
  const text = els.commentInput.value.trim();
  if (!text) return;
  draftComments.unshift({ id: uid("comment"), author: "我", text, createdAt: new Date().toISOString() });
  draftActivity = addActivity(draftActivity, "添加了评论");
  els.commentInput.value = "";
  renderCardDetails();
}

function renderCardLinkOptions(currentCardId) {
  const options = allCards()
    .filter((card) => card.id !== currentCardId)
    .map((card) => `<option value="${card.id}">${escapeHtml(card.title)} · ${escapeHtml(card.columnTitle)}</option>`)
    .join("");
  els.linkTaskInput.innerHTML = options || `<option value="">暂无可链接任务</option>`;
  els.addLinkBtn.disabled = !options;
}

function renderCardDetails() {
  const progress = getSubtaskProgress({ subtasks: draftSubtasks });
  els.subtaskSummary.textContent = `${progress.done}/${progress.total}`;
  els.subtaskList.innerHTML = draftSubtasks.length
    ? draftSubtasks.map((task) => `
      <div class="subtask-row ${task.done ? "done" : ""}" data-id="${task.id}">
        <input type="checkbox" ${task.done ? "checked" : ""} aria-label="完成子任务">
        <span>${escapeHtml(task.title)}</span>
        <button class="mini-button" type="button" aria-label="删除子任务">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无子任务</div>`;

  els.subtaskList.querySelectorAll(".subtask-row").forEach((row) => {
    const id = row.dataset.id;
    row.querySelector("input").addEventListener("change", (event) => {
      const task = draftSubtasks.find((item) => item.id === id);
      task.done = event.target.checked;
      draftActivity = addActivity(draftActivity, task.done ? "完成了一个子任务" : "重新打开一个子任务");
      renderCardDetails();
    });
    row.querySelector("button").addEventListener("click", () => {
      draftSubtasks = draftSubtasks.filter((item) => item.id !== id);
      draftActivity = addActivity(draftActivity, "删除了一个子任务");
      renderCardDetails();
    });
  });

  els.commentList.innerHTML = draftComments.length
    ? draftComments.map((comment) => `
      <div class="comment-item">
        <p>${escapeHtml(comment.text)}</p>
        <span>${escapeHtml(comment.author)} · ${formatTime(comment.createdAt)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无评论</div>`;

  els.linkList.innerHTML = draftLinks.length
    ? draftLinks.map((link) => `
      <div class="link-item" data-id="${link.id}">
        <p><strong>${escapeHtml(link.type)}</strong> ${escapeHtml(link.targetTitle)}</p>
        <button class="mini-button" type="button" aria-label="删除链接">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无任务链接</div>`;

  els.linkList.querySelectorAll(".link-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftLinks = draftLinks.filter((link) => link.id !== row.dataset.id);
      draftActivity = addActivity(draftActivity, "删除了一个任务链接");
      renderCardDetails();
    });
  });

  els.activityList.innerHTML = draftActivity.length
    ? draftActivity.slice(0, 8).map((item) => `
      <div class="activity-item">
        <p>${escapeHtml(item.text)}</p>
        <span>${formatTime(item.createdAt)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无活动记录</div>`;
}

function handleColumnDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drop-target");
}

function handleColumnDragLeave(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    event.currentTarget.classList.remove("drop-target");
  }
}

function handleColumnDrop(event) {
  event.preventDefault();
  const targetColumnId = event.currentTarget.dataset.columnId;
  const targetSwimlaneId = event.currentTarget.dataset.swimlaneId;
  event.currentTarget.classList.remove("drop-target");
  if (!draggedCard) return;
  if (draggedCard.columnId === targetColumnId && draggedCard.swimlaneId === targetSwimlaneId) return;

  const project = activeProject();
  const fromColumn = project.columns.find((column) => column.id === draggedCard.columnId);
  const toColumn = project.columns.find((column) => column.id === targetColumnId);
  const movingCard = fromColumn.cards.find((card) => card.id === draggedCard.cardId);
  const targetLane = project.swimlanes.find((lane) => lane.id === targetSwimlaneId);
  fromColumn.cards = fromColumn.cards.filter((card) => card.id !== draggedCard.cardId);
  movingCard.swimlaneId = targetSwimlaneId;
  movingCard.updatedAt = new Date().toISOString();
  movingCard.activity = addActivity(movingCard.activity || [], `移动到“${toColumn.title} / ${targetLane.title}”`);
  toColumn.cards.push(movingCard);
  persist();
  render();
}

function moveCardWithinLane(columnId, cardId, direction) {
  const column = activeProject().columns.find((item) => item.id === columnId);
  const card = column.cards.find((item) => item.id === cardId);
  const laneCards = column.cards.filter((item) => item.swimlaneId === card.swimlaneId);
  const laneIndex = laneCards.findIndex((item) => item.id === cardId);
  const swapCard = laneCards[laneIndex + direction];
  if (!swapCard) return;
  const cardIndex = column.cards.findIndex((item) => item.id === card.id);
  const swapIndex = column.cards.findIndex((item) => item.id === swapCard.id);
  [column.cards[cardIndex], column.cards[swapIndex]] = [column.cards[swapIndex], column.cards[cardIndex]];
  card.activity = addActivity(card.activity || [], direction < 0 ? "在列内上移" : "在列内下移");
  persist();
  render();
}

function resetDemoData() {
  if (!confirm("重置会清空当前本地演示数据，继续？")) return;
  state = createDemoState();
  persist();
  render();
}

function getSubtaskProgress(card) {
  const total = card.subtasks?.length || 0;
  const done = card.subtasks?.filter((task) => task.done).length || 0;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function addActivity(activity, text) {
  return [{ id: uid("activity"), text, createdAt: new Date().toISOString() }, ...(activity || [])];
}

function findCardContext(cardId, project = activeProject()) {
  if (!cardId) return null;
  for (const column of project.columns) {
    const card = column.cards.find((item) => item.id === cardId);
    if (card) return { project, column, card };
  }
  return null;
}

function cloneCardForCopy(card) {
  const now = new Date().toISOString();
  return {
    ...clone(card),
    id: uid("card"),
    title: `${card.title} - 副本`,
    isClosed: false,
    subtasks: (card.subtasks || []).map((task) => ({ ...task, id: uid("subtask") })),
    comments: clone(card.comments || []),
    links: clone(card.links || []),
    activity: [{ id: uid("activity"), text: "由复制任务生成", createdAt: now }],
    createdAt: now,
    updatedAt: now
  };
}

function groupCounts(values) {
  const counts = values.reduce((map, value) => {
    map.set(value, (map.get(value) || 0) + 1);
    return map;
  }, new Map());
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "zh-CN"));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function priorityClass(priority) {
  return {
    高: "high",
    紧急: "urgent"
  }[priority] || "normal";
}

function isOverdue(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateString) < today;
}

function isDueSoon(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateString);
  const diffDays = (due - today) / 86400000;
  return diffDays >= 0 && diffDays <= 3;
}

function formatTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
