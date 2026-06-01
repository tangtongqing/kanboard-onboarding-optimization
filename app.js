const STORAGE_KEY = "kanboard-mvp-v03";

let state = loadState();
let editingProjectId = null;
let editingColumnId = null;
let editingCard = null;
let draggedCard = null;

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
  cardDialog: document.querySelector("#cardDialog"),
  cardForm: document.querySelector("#cardForm"),
  cardDialogTitle: document.querySelector("#cardDialogTitle"),
  cardTitleInput: document.querySelector("#cardTitleInput"),
  cardAssigneeInput: document.querySelector("#cardAssigneeInput"),
  cardCategoryInput: document.querySelector("#cardCategoryInput"),
  cardPriorityInput: document.querySelector("#cardPriorityInput"),
  cardDueInput: document.querySelector("#cardDueInput"),
  cardTagsInput: document.querySelector("#cardTagsInput"),
  cardColorInput: document.querySelector("#cardColorInput"),
  cardDescInput: document.querySelector("#cardDescInput"),
  deleteCardBtn: document.querySelector("#deleteCardBtn")
};

document.querySelector("#newProjectBtn").addEventListener("click", () => openProjectDialog());
document.querySelector("#editProjectBtn").addEventListener("click", () => openProjectDialog(activeProject().id));
document.querySelector("#deleteProjectBtn").addEventListener("click", deleteActiveProject);
document.querySelector("#addColumnBtn").addEventListener("click", () => openColumnDialog());
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemoData);

els.searchInput.addEventListener("input", renderBoard);
els.assigneeFilter.addEventListener("change", renderBoard);
els.categoryFilter.addEventListener("change", renderBoard);
els.projectForm.addEventListener("submit", saveProjectFromDialog);
els.columnForm.addEventListener("submit", saveColumnFromDialog);
els.deleteColumnBtn.addEventListener("click", deleteEditingColumn);
els.cardForm.addEventListener("submit", saveCardFromDialog);
els.deleteCardBtn.addEventListener("click", deleteEditingCard);

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
  return {
    activeProjectId: projectId,
    projects: [
      {
        id: projectId,
        name: "产品优化项目",
        description: "复现 Kanboard 的项目、任务卡片和卡片流转，再加入新手创建向导。",
        createdAt: new Date().toISOString(),
        columns: [
          {
            id: uid("column"),
            title: "待办",
            wipLimit: 0,
            cards: [
              makeCard("梳理 Kanboard 核心功能", "明确 MVP 必须包含项目、列、任务卡和拖拽流转。", "PM", "调研", "高", "blue", ["MVP"])
            ]
          },
          {
            id: uid("column"),
            title: "进行中",
            wipLimit: 3,
            cards: [
              makeCard("实现任务卡片拖拽", "卡片可以在列之间移动，表达任务状态变化。", "开发", "原型", "中", "green", ["交互"])
            ]
          },
          {
            id: uid("column"),
            title: "待验证",
            wipLimit: 0,
            cards: []
          },
          {
            id: uid("column"),
            title: "已完成",
            wipLimit: 0,
            cards: [
              makeCard("完成 V0.2 竞品分析", "对比 Kanboard、WeKan、Trello、Notion 的新手创建体验。", "PM", "文档", "中", "gray", ["研究"])
            ]
          }
        ]
      }
    ]
  };
}

function makeCard(title, description, assignee, category, priority, color, tags = []) {
  return {
    id: uid("card"),
    title,
    description,
    assignee,
    category,
    priority,
    color,
    tags,
    dueDate: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function activeProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0];
}

function allCards(project = activeProject()) {
  return project.columns.flatMap((column) => column.cards.map((card) => ({ ...card, columnId: column.id, columnTitle: column.title })));
}

function render() {
  if (!activeProject()) {
    state = createDemoState();
    persist();
  }
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
    button.innerHTML = `<strong>${escapeHtml(project.name)}</strong><span>${project.columns.length} 列 · ${allCards(project).length} 任务</span>`;
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
  const cards = allCards();
  const assignees = unique(cards.map((card) => card.assignee).filter(Boolean));
  const categories = unique(cards.map((card) => card.category).filter(Boolean));
  const currentAssignee = els.assigneeFilter.value;
  const currentCategory = els.categoryFilter.value;

  fillSelect(els.assigneeFilter, "全部负责人", assignees, currentAssignee);
  fillSelect(els.categoryFilter, "全部分类", categories, currentCategory);
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
  project.columns.forEach((column) => {
    const columnEl = document.createElement("article");
    columnEl.className = "column";
    columnEl.dataset.columnId = column.id;
    columnEl.innerHTML = `
      <header class="column-header">
        <div class="column-title">
          <strong>${escapeHtml(column.title)}</strong>
          <span>${column.cards.length} 任务${column.wipLimit ? ` · WIP ${column.wipLimit}` : ""}</span>
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
    const visibleCards = column.cards.filter(cardMatchesFilters);

    if (!visibleCards.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "暂无匹配任务";
      body.appendChild(empty);
    } else {
      visibleCards.forEach((card) => body.appendChild(createCardElement(card, column.id)));
    }

    columnEl.querySelector('[data-action="edit-column"]').addEventListener("click", () => openColumnDialog(column.id));
    columnEl.querySelector('[data-action="new-card"]').addEventListener("click", () => openCardDialog(column.id));
    columnEl.addEventListener("dragover", handleColumnDragOver);
    columnEl.addEventListener("dragleave", handleColumnDragLeave);
    columnEl.addEventListener("drop", handleColumnDrop);
    els.board.appendChild(columnEl);
  });
}

function createCardElement(card, columnId) {
  const cardEl = document.createElement("article");
  cardEl.className = `card color-${card.color || "blue"}`;
  cardEl.draggable = true;
  cardEl.dataset.cardId = card.id;
  cardEl.dataset.columnId = columnId;
  cardEl.innerHTML = `
    <h4>${escapeHtml(card.title)}</h4>
    ${card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
    <div class="card-meta">
      ${card.assignee ? `<span class="pill">${escapeHtml(card.assignee)}</span>` : ""}
      ${card.category ? `<span class="pill">${escapeHtml(card.category)}</span>` : ""}
      ${card.priority ? `<span class="pill priority-${priorityClass(card.priority)}">${escapeHtml(card.priority)}</span>` : ""}
      ${card.dueDate ? `<span class="pill ${isOverdue(card.dueDate) ? "overdue" : ""}">${escapeHtml(card.dueDate)}</span>` : ""}
    </div>
    ${card.tags?.length ? `<div class="tag-row">${card.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
  `;
  cardEl.addEventListener("click", () => openCardDialog(columnId, card.id));
  cardEl.addEventListener("dragstart", (event) => {
    draggedCard = { columnId, cardId: card.id };
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
    const id = uid("project");
    state.projects.push({
      id,
      name,
      description: els.projectDescInput.value.trim(),
      createdAt: new Date().toISOString(),
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

function openCardDialog(columnId, cardId = null) {
  const project = activeProject();
  const column = project.columns.find((item) => item.id === columnId);
  const card = cardId ? column.cards.find((item) => item.id === cardId) : null;
  editingCard = { columnId, cardId };

  els.cardDialogTitle.textContent = card ? "编辑任务" : "新增任务";
  els.cardTitleInput.value = card?.title || "";
  els.cardDescInput.value = card?.description || "";
  els.cardAssigneeInput.value = card?.assignee || "";
  els.cardCategoryInput.value = card?.category || "";
  els.cardPriorityInput.value = card?.priority || "中";
  els.cardDueInput.value = card?.dueDate || "";
  els.cardTagsInput.value = card?.tags?.join(", ") || "";
  els.cardColorInput.value = card?.color || "blue";
  els.deleteCardBtn.style.visibility = card ? "visible" : "hidden";

  els.cardDialog.showModal();
  els.cardTitleInput.focus();
}

function saveCardFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.cardTitleInput.value.trim();
  if (!title) return;

  const column = activeProject().columns.find((item) => item.id === editingCard.columnId);
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
    updatedAt: new Date().toISOString()
  };

  if (editingCard.cardId) {
    const card = column.cards.find((item) => item.id === editingCard.cardId);
    Object.assign(card, payload);
  } else {
    column.cards.push({ id: uid("card"), createdAt: new Date().toISOString(), ...payload });
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
  event.currentTarget.classList.remove("drop-target");
  if (!draggedCard || draggedCard.columnId === targetColumnId) return;

  const project = activeProject();
  const fromColumn = project.columns.find((column) => column.id === draggedCard.columnId);
  const toColumn = project.columns.find((column) => column.id === targetColumnId);
  const movingCard = fromColumn.cards.find((card) => card.id === draggedCard.cardId);
  fromColumn.cards = fromColumn.cards.filter((card) => card.id !== draggedCard.cardId);
  movingCard.updatedAt = new Date().toISOString();
  toColumn.cards.push(movingCard);
  persist();
  render();
}

function resetDemoData() {
  if (!confirm("重置会清空当前本地演示数据，继续？")) return;
  state = createDemoState();
  persist();
  render();
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
