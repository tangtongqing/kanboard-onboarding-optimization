const STORAGE_KEY = "kanboard-static-v04";

let state = loadState();
let editingProjectId = null;
let editingColumnId = null;
let editingSwimlaneId = null;
let editingCard = null;
let draggedCard = null;
let draftSubtasks = [];
let draftComments = [];
let draftActivity = [];

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
  memberOptions: document.querySelector("#memberOptions"),
  categoryOptions: document.querySelector("#categoryOptions"),
  projectDialog: document.querySelector("#projectDialog"),
  projectForm: document.querySelector("#projectForm"),
  projectDialogTitle: document.querySelector("#projectDialogTitle"),
  projectNameInput: document.querySelector("#projectNameInput"),
  projectDescInput: document.querySelector("#projectDescInput"),
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
  commentInput: document.querySelector("#commentInput"),
  addCommentBtn: document.querySelector("#addCommentBtn"),
  commentList: document.querySelector("#commentList"),
  activityList: document.querySelector("#activityList"),
  deleteCardBtn: document.querySelector("#deleteCardBtn")
};

document.querySelector("#newProjectBtn").addEventListener("click", () => openProjectDialog());
document.querySelector("#editProjectBtn").addEventListener("click", () => openProjectDialog(activeProject().id));
document.querySelector("#deleteProjectBtn").addEventListener("click", deleteActiveProject);
document.querySelector("#addColumnBtn").addEventListener("click", () => openColumnDialog());
document.querySelector("#addSwimlaneBtn").addEventListener("click", () => openSwimlaneDialog());
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemoData);

els.searchInput.addEventListener("input", renderBoard);
els.assigneeFilter.addEventListener("change", renderBoard);
els.categoryFilter.addEventListener("change", renderBoard);
els.swimlaneFilter.addEventListener("change", renderBoard);
els.projectForm.addEventListener("submit", saveProjectFromDialog);
els.columnForm.addEventListener("submit", saveColumnFromDialog);
els.deleteColumnBtn.addEventListener("click", deleteEditingColumn);
els.swimlaneForm.addEventListener("submit", saveSwimlaneFromDialog);
els.deleteSwimlaneBtn.addEventListener("click", deleteEditingSwimlane);
els.cardForm.addEventListener("submit", saveCardFromDialog);
els.deleteCardBtn.addEventListener("click", deleteEditingCard);
els.addSubtaskBtn.addEventListener("click", addDraftSubtask);
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
    subtasks: (options.subtasks || []).map((task) => ({ id: uid("subtask"), title: task.title, done: Boolean(task.done) })),
    comments: options.comments || [],
    activity: [{ id: uid("activity"), text: "创建了任务", createdAt: now }],
    createdAt: now,
    updatedAt: now
  };
}

function normalizeState() {
  if (!state.projects?.length) state = createDemoState();
  state.projects.forEach((project) => {
    if (!project.swimlanes?.length) {
      project.swimlanes = [{ id: uid("lane"), title: "默认泳道", description: "默认任务分组" }];
    }
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
      });
    });
  });
  if (!state.projects.some((project) => project.id === state.activeProjectId)) {
    state.activeProjectId = state.projects[0].id;
  }
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
  const assignees = unique(cards.map((card) => card.assignee).filter(Boolean));
  const categories = unique(cards.map((card) => card.category).filter(Boolean));
  fillSelect(els.assigneeFilter, "全部负责人", assignees, els.assigneeFilter.value);
  fillSelect(els.categoryFilter, "全部分类", categories, els.categoryFilter.value);
  fillSelect(els.swimlaneFilter, "全部泳道", project.swimlanes.map((lane) => lane.title), els.swimlaneFilter.value);
  fillDatalist(els.memberOptions, assignees);
  fillDatalist(els.categoryOptions, categories);
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
  const doing = cards.filter((card) => ["进行中", "开发中", "处理中"].includes(card.columnTitle)).length;
  const done = cards.filter((card) => ["已完成", "完成", "Done"].includes(card.columnTitle)).length;
  const dueSoon = cards.filter((card) => isDueSoon(card.dueDate)).length;
  els.metricCards.textContent = cards.length;
  els.metricDoing.textContent = doing;
  els.metricDue.textContent = dueSoon;
  els.metricDone.textContent = done;
}

function renderBoard() {
  const project = activeProject();
  els.board.innerHTML = "";
  const selectedLaneTitle = els.swimlaneFilter.value;
  const swimlanes = selectedLaneTitle
    ? project.swimlanes.filter((lane) => lane.title === selectedLaneTitle)
    : project.swimlanes;

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
    project.columns.forEach((column) => laneBoard.appendChild(createColumnElement(column, lane)));
    els.board.appendChild(swimlaneEl);
  });
}

function createColumnElement(column, lane) {
  const columnEl = document.createElement("article");
  columnEl.className = "column";
  columnEl.dataset.columnId = column.id;
  columnEl.dataset.swimlaneId = lane.id;

  const cardsInLane = column.cards.filter((card) => card.swimlaneId === lane.id);
  const visibleCards = cardsInLane.filter(cardMatchesFilters);

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
  cardEl.className = `card color-${card.color || "blue"}`;
  cardEl.draggable = true;
  cardEl.dataset.cardId = card.id;
  cardEl.dataset.columnId = columnId;
  cardEl.dataset.swimlaneId = swimlaneId;
  cardEl.innerHTML = `
    <div class="card-topline">
      <h4>${escapeHtml(card.title)}</h4>
      <div class="card-sort">
        <button class="mini-button" type="button" data-action="move-up" aria-label="上移">↑</button>
        <button class="mini-button" type="button" data-action="move-down" aria-label="下移">↓</button>
      </div>
    </div>
    ${card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
    <div class="card-meta">
      ${card.assignee ? `<span class="pill">${escapeHtml(card.assignee)}</span>` : ""}
      ${card.category ? `<span class="pill">${escapeHtml(card.category)}</span>` : ""}
      ${card.priority ? `<span class="pill priority-${priorityClass(card.priority)}">${escapeHtml(card.priority)}</span>` : ""}
      ${card.estimate ? `<span class="pill">${escapeHtml(card.estimate)}h</span>` : ""}
      ${card.dueDate ? `<span class="pill ${isOverdue(card.dueDate) ? "overdue" : ""}">${escapeHtml(card.dueDate)}</span>` : ""}
    </div>
    ${card.tags?.length ? `<div class="tag-row">${card.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    ${card.subtasks?.length ? `<div class="progress-bar" title="子任务 ${progress.done}/${progress.total}"><span style="width: ${progress.percent}%"></span></div>` : ""}
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

function cardMatchesFilters(card) {
  const query = els.searchInput.value.trim().toLowerCase();
  const assignee = els.assigneeFilter.value;
  const category = els.categoryFilter.value;
  const text = [card.title, card.description, card.assignee, card.category, ...(card.tags || [])].join(" ").toLowerCase();
  return (!query || text.includes(query)) && (!assignee || card.assignee === assignee) && (!category || card.category === category);
}

function openProjectDialog(projectId = null) {
  editingProjectId = projectId;
  const project = projectId ? state.projects.find((item) => item.id === projectId) : null;
  els.projectDialogTitle.textContent = project ? "编辑项目" : "新建项目";
  els.projectNameInput.value = project?.name || "";
  els.projectDescInput.value = project?.description || "";
  els.projectDialog.showModal();
  els.projectNameInput.focus();
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
    const laneId = uid("lane");
    const id = uid("project");
    state.projects.push({
      id,
      name,
      description: els.projectDescInput.value.trim(),
      createdAt: new Date().toISOString(),
      swimlanes: [{ id: laneId, title: "默认泳道", description: "默认任务分组" }],
      columns: [
        { id: uid("column"), title: "待办", wipLimit: 0, cards: [] },
        { id: uid("column"), title: "进行中", wipLimit: 3, cards: [] },
        { id: uid("column"), title: "已完成", wipLimit: 0, cards: [] }
      ]
    });
    state.activeProjectId = id;
  }

  editingProjectId = null;
  els.projectDialog.close();
  persist();
  render();
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
  const laneId = card?.swimlaneId || swimlaneId || project.swimlanes[0].id;

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
  els.cardSwimlaneInput.innerHTML = project.swimlanes.map((lane) => `<option value="${lane.id}">${escapeHtml(lane.title)}</option>`).join("");
  els.cardSwimlaneInput.value = laneId;
  els.deleteCardBtn.style.visibility = card ? "visible" : "hidden";
  draftSubtasks = clone(card?.subtasks || []);
  draftComments = clone(card?.comments || []);
  draftActivity = clone(card?.activity || []);
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
