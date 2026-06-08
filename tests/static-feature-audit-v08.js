const path = require("path");
const { chromium } = require("playwright");

const STORAGE_KEY = "kanboard-static-v0825";
const ROOT = path.resolve(__dirname, "..");
const FILE_URL = `file:///${path.join(ROOT, "index.html").replace(/\\/g, "/")}`;

let passed = 0;

function check(condition, name) {
  if (!condition) {
    throw new Error(name);
  }
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

function activeProjectFrom(state) {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0];
}

function allCards(project) {
  return project.columns.flatMap((column) => column.cards.map((card) => ({ ...card, columnId: column.id })));
}

async function getState(page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
}

async function getActiveProject(page) {
  const state = await getState(page);
  return activeProjectFrom(state);
}

async function fresh(page) {
  await page.goto(FILE_URL);
  await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
  await page.reload();
  await page.waitForSelector("#board");
  await page.waitForFunction((key) => Boolean(localStorage.getItem(key)), STORAGE_KEY);
}

async function pause() {
  await new Promise((resolve) => setTimeout(resolve, 120));
}

async function saveForm(page, formSelector) {
  await page.click(`${formSelector} .primary-action.compact`);
  await pause();
}

async function closeCardDialog(page) {
  if (await page.locator("#cardDialog[open]").count()) {
    await page.locator('#cardForm button[value="cancel"]').first().click();
    await pause();
  }
}

async function quickCreateCard(page, columnId, laneId, title, options = {}) {
  const columnSelector = `.column[data-column-id="${columnId}"][data-swimlane-id="${laneId}"]`;
  await page.locator(`${columnSelector} [data-action="new-card"]`).click();
  await page.fill("#cardTitleInput", title);
  if (options.assignee) await page.fill("#cardAssigneeInput", options.assignee);
  if (options.category) await page.fill("#cardCategoryInput", options.category);
  if (options.tags) await page.fill("#cardTagsInput", options.tags);
  if (options.estimate) await page.fill("#cardEstimateInput", options.estimate);
  await saveForm(page, "#cardForm");
  const project = await getActiveProject(page);
  const card = allCards(project).find((item) => item.title === title);
  check(Boolean(card), `card created: ${title}`);
  return card;
}

async function createBlankProject(page, name) {
  await page.click("#newProjectBtn");
  await page.check('input[name="projectMode"][value="blank"]');
  await page.fill("#projectNameInput", name);
  await page.fill("#projectDescInput", `${name} description`);
  await saveForm(page, "#projectForm");
  const state = await getState(page);
  check(activeProjectFrom(state).name === name, `blank project created: ${name}`);
  return state.activeProjectId;
}

async function testInitialShell(page) {
  await fresh(page);
  const state = await getState(page);
  const project = activeProjectFrom(state);
  const learningProject = state.projects.find((item) => item.name === "个人学习计划项目");
  check(state.projects.length === 2, "demo has two projects");
  check(Boolean(learningProject), "demo includes personal learning project");
  check(learningProject.columns.length === 6, "learning project has six growth columns");
  check(learningProject.swimlanes.length === 7, "learning project has seven PM learning swimlanes");
  check(allCards(learningProject).length === 19, "learning project has nineteen PM growth cards");
  check(allCards(learningProject).some((card) => card.title === "写出第一版 PRD 框架"), "learning project includes PRD practice");
  check(project.columns.length === 11, "demo has eleven PM workflow columns");
  check(project.swimlanes.length === 1, "demo PM project uses one main workflow swimlane");
  check(allCards(project).length === 25, "demo has twenty-five PM workflow cards");
  check(new Set(allCards(project).map((card) => card.swimlaneId)).size === 1, "demo PM cards stay in the main workflow swimlane");
  check(project.timeline.plannedStart === "2026-05-20" && project.timeline.plannedLaunch === "2026-06-11", "demo has project timeline");
  check(allCards(project).some((card) => card.schedule?.plannedEnd), "demo cards have schedule dates");
  check(Boolean(project.settings), "project settings normalized");
  check(project.settings.permissionMode === "team", "project permission mode normalized");
  check(project.settings.publicAccessEnabled === false, "project public access disabled by default");
  check(Boolean(project.settings.publicToken), "project public token normalized");
  check(project.settings.groups.length >= 1, "project group permissions normalized");
  check(project.files.length >= 2, "project files normalized");
  check(state.plugins.config.installerEnabled === false, "plugin installer disabled by default");
  check(state.plugins.catalog.some((plugin) => plugin.status === "installed"), "plugin catalog has installed plugin");
  check(state.identity.users.some((user) => user.role === "app-admin"), "identity directory has administrator");
  check(state.identity.groups.length >= 2, "identity directory has groups");
  check(state.system.api.endpoint === "/jsonrpc.php", "system API endpoint normalized");
  check(state.system.reverseProxy.trustedNetworks.includes("127.0.0.1/32"), "system trusted proxy defaults normalized");
  check(state.operations.cron.schedule === "0 8 * * *", "operations cron defaults normalized");
  check(state.operations.jobs.length >= 3, "operations job queue normalized");
  check(state.runtime.database.driver === "sqlite", "runtime database driver defaults to sqlite");
  check(state.runtime.environment.phpVersion.startsWith("8."), "runtime PHP version normalized");
  check(state.runtime.php.extensions.pdo_sqlite === true, "runtime SQLite PDO extension normalized");
  check(state.deployment.install.method === "archive", "deployment install method defaults to archive");
  check(state.deployment.access.dataDenyRule === true, "deployment data deny rule defaults enabled");
  check(state.developer.webhooks.selectedEvent === "task.create", "developer webhook event defaults to task.create");
  check(state.developer.api.selectedProcedure === "getVersion", "developer API procedure defaults to getVersion");
  check(state.developer.pluginDev.name === "PmWorkflow", "developer plugin skeleton defaults normalized");
  check(state.extensions.authProviders.selectedInterface === "oauth", "extension auth provider defaults to OAuth interface");
  check(state.extensions.automaticActions.selectedEvent === "task.move.column", "extension automatic action defaults to task move event");
  check(state.extensions.notificationTypes.typeKey === "chatops", "extension notification type defaults normalized");
  check(state.extensions.advanced.authorization.scope === "project", "extension advanced authorization defaults normalized");
  check(state.extensions.advanced.routes.url.includes("/pm/workflow"), "extension custom route defaults normalized");
  check(state.extensions.advanced.schema.driverFile === "Sqlite.php", "extension schema migration defaults normalized");
  check(await page.locator("#developerBtn").isVisible(), "developer entry renders in topbar");
  check(state.deployment.docker.versionPinned === true, "deployment Docker image pinning defaults enabled");
  check(project.automations.length >= 2, "default automation rules normalized");
  check((await page.locator("#projectList .project-item").count()) === 2, "project list renders");
  check((await page.locator("#viewSwitcher button").count()) === 5, "project view switcher exposes five views");
  check(await page.locator("#activityBtn").isVisible(), "activity entry renders");
  check(await page.locator("#subscriptionsBtn").isVisible(), "subscription entry renders");
  check(await page.locator("#importExportBtn").isVisible(), "import export entry renders");
  check(await page.locator("#pluginsBtn").isVisible(), "plugins entry renders");
  check(await page.locator("#userManagementBtn").isVisible(), "user management entry renders");
  check(await page.locator("#systemSettingsBtn").isVisible(), "system settings entry renders");
  check(await page.locator("#runtimeBtn").isVisible(), "runtime environment entry renders");
  check(await page.locator("#deploymentBtn").isVisible(), "deployment check entry renders");
  check(await page.locator("#extensionLabBtn").isVisible(), "extension lab entry renders");
  check(await page.locator("#operationsBtn").isVisible(), "operations entry renders");
  check(await page.locator("#shortcutsBtn").isVisible(), "shortcut help entry renders");
  check((await page.locator(".swimlane").count()) === 1, "main workflow swimlane renders");
  check(state.ui.hideEmptyColumns === true, "empty columns are hidden by default");
  check((await page.locator(".column").count()) === 11, "main swimlane renders each workflow column once");
  await page.uncheck("#hideEmptyColumnsInput");
  await pause();
  check((await page.locator(".column").count()) === 11, "full view keeps one workflow column set for the main swimlane");
  check(Number(await page.locator("#metricCards").textContent()) === 25, "metrics render card count");
}

async function testDialogCancelBypassesRequiredFields(page) {
  await fresh(page);

  await page.click("#newProjectBtn");
  await page.locator("#projectDialog .modal-header .icon-button").click();
  await pause();
  check((await page.locator("#projectDialog[open]").count()) === 0, "project dialog close bypasses required name");

  await page.click("#addColumnBtn");
  await page.locator("#columnDialog .modal-header .icon-button").click();
  await pause();
  check((await page.locator("#columnDialog[open]").count()) === 0, "column dialog close bypasses required title");

  await page.click("#addSwimlaneBtn");
  await page.locator('#swimlaneForm .modal-actions button[value="cancel"]').click();
  await pause();
  check((await page.locator("#swimlaneDialog[open]").count()) === 0, "swimlane dialog cancel bypasses required title");

  await page.locator('.column [data-action="new-card"]').first().click();
  await page.locator("#cardDialog .modal-header .icon-button").click();
  await pause();
  check((await page.locator("#cardDialog[open]").count()) === 0, "card dialog close bypasses required title");
}

async function testProjectCrudAndTemplates(page) {
  await fresh(page);
  await page.click("#newProjectBtn");
  check((await page.locator(".template-option").count()) === 4, "template picker has four templates");
  check(await page.locator("#templatePreview").isVisible(), "template preview renders");
  await page.fill("#projectNameInput", "Template Audit");
  await page.fill("#projectDescInput", "Created by audit");
  await saveForm(page, "#projectForm");
  let project = await getActiveProject(page);
  check(project.name === "Template Audit", "template project becomes active");
  check(project.columns.length === 6, "template project has generated learning columns");
  check(project.swimlanes.length === 7, "template project has PM learning swimlanes");
  check(allCards(project).length === 19, "template project has PM learning cards");

  await fresh(page);
  const blankId = await createBlankProject(page, "Blank Audit");
  project = await getActiveProject(page);
  check(project.id === blankId && project.columns.length === 3, "blank project has Kanboard starter columns");
  check(allCards(project).length === 0, "blank project starts without cards");

  await page.click("#editProjectBtn");
  await page.fill("#projectNameInput", "Blank Audit Edited");
  await saveForm(page, "#projectForm");
  project = await getActiveProject(page);
  check(project.name === "Blank Audit Edited", "project edit saves");

  const beforeDelete = (await getState(page)).projects.length;
  await page.click("#deleteProjectBtn");
  await pause();
  const afterDelete = await getState(page);
  check(afterDelete.projects.length === beforeDelete - 1, "project delete removes active project");
  check(afterDelete.activeProjectId !== blankId, "project delete switches active project");
}

async function testColumnAndSwimlaneCrud(page) {
  await fresh(page);
  let project = await getActiveProject(page);
  const initialColumns = project.columns.length;
  await page.click("#addColumnBtn");
  await page.fill("#columnTitleInput", "Audit Column");
  await page.fill("#columnWipInput", "2");
  await saveForm(page, "#columnForm");
  project = await getActiveProject(page);
  const addedColumn = project.columns.find((column) => column.title === "Audit Column");
  check(Boolean(addedColumn), "column create saves title");
  check(addedColumn.wipLimit === 2, "column create saves WIP limit");

  await page.locator(`.column[data-column-id="${addedColumn.id}"] .board-menu summary`).first().click();
  await page.locator(`.column[data-column-id="${addedColumn.id}"] [data-action="edit-column"]`).first().click();
  await page.fill("#columnTitleInput", "Audit Column Edited");
  await page.fill("#columnWipInput", "4");
  await saveForm(page, "#columnForm");
  project = await getActiveProject(page);
  check(project.columns.some((column) => column.title === "Audit Column Edited" && column.wipLimit === 4), "column edit saves");

  await page.locator(`.column[data-column-id="${addedColumn.id}"] .board-menu summary`).first().click();
  await page.locator(`.column[data-column-id="${addedColumn.id}"] [data-action="edit-column"]`).first().click();
  await page.click("#deleteColumnBtn");
  await pause();
  project = await getActiveProject(page);
  check(project.columns.length === initialColumns, "column delete removes empty column");

  const initialLanes = project.swimlanes.length;
  await page.click("#addSwimlaneBtn");
  await page.fill("#swimlaneTitleInput", "Audit Lane");
  await page.fill("#swimlaneDescInput", "Lane created by audit");
  await saveForm(page, "#swimlaneForm");
  project = await getActiveProject(page);
  check(project.swimlanes.length === initialLanes + 1, "swimlane create adds lane");

  await page.locator('.swimlane [data-action="edit-swimlane"]').last().click();
  await page.fill("#swimlaneTitleInput", "Audit Lane Edited");
  await saveForm(page, "#swimlaneForm");
  project = await getActiveProject(page);
  check(project.swimlanes.some((lane) => lane.title === "Audit Lane Edited"), "swimlane edit saves");

  await page.locator('.swimlane [data-action="edit-swimlane"]').last().click();
  await page.click("#deleteSwimlaneBtn");
  await pause();
  project = await getActiveProject(page);
  check(project.swimlanes.length === initialLanes, "swimlane delete removes empty lane");
}

async function testCardCrudDetailsAndPersistence(page) {
  await fresh(page);
  let project = await getActiveProject(page);
  const column = project.columns[0];
  const lane = project.swimlanes[0];
  const selector = `.column[data-column-id="${column.id}"][data-swimlane-id="${lane.id}"]`;
  await page.locator(`${selector} [data-action="new-card"]`).click();
  await page.fill("#cardTitleInput", "Audit Task");
  await page.fill("#cardAssigneeInput", "Auditor");
  await page.fill("#cardCategoryInput", "QA");
  await page.selectOption("#cardPriorityInput", { index: 2 });
  await page.fill("#cardDueInput", "2026-06-15");
  await page.fill("#cardTagsInput", "alpha,beta");
  await page.selectOption("#cardColorInput", "rose");
  await page.fill("#cardEstimateInput", "2.5");
  await page.fill("#cardActualInput", "1.5");
  await page.fill("#cardPlannedStartInput", "2026-06-10");
  await page.fill("#cardPlannedEndInput", "2026-06-12");
  await page.fill("#cardActualStartInput", "2026-06-11");
  await page.fill("#cardActualEndInput", "2026-06-13");
  await page.fill("#cardDescInput", "Audit detail text");
  await page.fill("#subtaskInput", "Subtask One");
  await page.click("#addSubtaskBtn");
  await page.fill("#commentInput", "First comment");
  await page.click("#addCommentBtn");
  await page.fill("#timeSpentInput", "0.75");
  await page.fill("#timeNoteInput", "Audit session");
  await page.click("#addTimeEntryBtn");
  await page.fill("#attachmentNameInput", "audit-prd.pdf");
  await page.fill("#attachmentMetaInput", "PDF · 2MB");
  await page.click("#addAttachmentBtn");
  await page.selectOption("#recurringPatternInput", "weekly");
  await page.fill("#recurringNextDateInput", "2026-06-08");
  await saveForm(page, "#cardForm");

  project = await getActiveProject(page);
  let card = allCards(project).find((item) => item.title === "Audit Task");
  check(card.assignee === "Auditor", "card assignee saves");
  check(card.category === "QA", "card category saves");
  check(card.tags.length === 2, "card tags save");
  check(card.subtasks.length === 1, "card subtasks save");
  check(card.comments.length === 1, "card comments save");
  check(card.timeLogs.length === 1, "card time log saves");
  check(card.attachments.length === 1, "card attachment saves");
  check(card.recurring.pattern === "weekly", "card recurring pattern saves");
  check(card.actualTime === "1.5", "card actual time saves");
  check(card.schedule.plannedStart === "2026-06-10" && card.schedule.actualEnd === "2026-06-13", "card schedule saves");

  await page.reload();
  project = await getActiveProject(page);
  card = allCards(project).find((item) => item.title === "Audit Task");
  check(Boolean(card), "card persists after reload");

  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.locator('#subtaskList input[type="checkbox"]').first().check();
  await saveForm(page, "#cardForm");
  project = await getActiveProject(page);
  card = allCards(project).find((item) => item.title === "Audit Task");
  check(card.subtasks[0].done === true, "subtask checkbox state saves");

  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.click("#deleteCardBtn");
  await pause();
  project = await getActiveProject(page);
  check(!allCards(project).some((item) => item.id === card.id), "card delete removes card");
}

async function testFlowSortingSearchAndViews(page) {
  await fresh(page);
  let project = await getActiveProject(page);
  const sourceColumn = project.columns[0];
  const targetColumn = project.columns[1];
  const card = sourceColumn.cards[0];
  const laneId = card.swimlaneId;
  const beforeSourceCount = sourceColumn.cards.length;
  const beforeTargetCount = targetColumn.cards.length;
  const sourceCard = page.locator(`.card[data-card-id="${card.id}"]`);
  const targetBody = page.locator(`.column[data-column-id="${targetColumn.id}"][data-swimlane-id="${laneId}"] .column-body`);
  await sourceCard.scrollIntoViewIfNeeded();
  await targetBody.scrollIntoViewIfNeeded();
  await sourceCard.dragTo(targetBody, { force: true });
  await pause();
  project = await getActiveProject(page);
  check(project.columns[0].cards.length === beforeSourceCount - 1 && project.columns[1].cards.length === beforeTargetCount + 1, "drag and drop moves card across columns");

  const lane = project.swimlanes.find((item) => item.id === laneId);
  const sortableOne = await quickCreateCard(page, targetColumn.id, lane.id, "Sort One");
  const sortableTwo = await quickCreateCard(page, targetColumn.id, lane.id, "Sort Two");
  project = await getActiveProject(page);
  const beforeOrder = project.columns[1].cards.map((item) => item.id);
  await page.locator(`.card[data-card-id="${sortableTwo.id}"] [data-action="move-up"]`).click();
  await pause();
  project = await getActiveProject(page);
  const afterOrder = project.columns[1].cards.map((item) => item.id);
  check(afterOrder.indexOf(sortableTwo.id) < beforeOrder.indexOf(sortableTwo.id), "card move up changes order");
  check(afterOrder.includes(sortableOne.id), "card sorting keeps sibling cards");

  const searchCard = await quickCreateCard(page, project.columns[0].id, project.swimlanes[0].id, "Search Audit", {
    assignee: "SearchUser",
    category: "SearchCat",
    tags: "audit"
  });
  await page.fill("#searchInput", "assignee:SearchUser tag:audit status:open");
  await pause();
  check((await page.locator(".card").count()) === 1, "advanced search filters visible cards");
  check(await page.locator(`.card[data-card-id="${searchCard.id}"]`).isVisible(), "advanced search keeps matching card");
  await page.fill("#searchInput", "");
  await pause();

  await page.click('[data-view="list"]');
  check(await page.locator(".list-view").isVisible(), "list view renders");
  await page.click('[data-view="calendar"]');
  check(await page.locator(".calendar-view").isVisible(), "calendar view renders");
  await page.click('[data-view="gantt"]');
  check(await page.locator(".gantt-view").isVisible(), "gantt view renders");
  await page.click('[data-view="overview"]');
  check(await page.locator(".overview-view").isVisible(), "overview view renders");
  await page.keyboard.press("?");
  check(await page.locator("#shortcutsDialog[open]").isVisible(), "keyboard shortcut help opens");
  await page.locator('#shortcutsDialog button[value="cancel"]').first().click();
  await pause();
  await page.keyboard.press("v");
  await page.keyboard.press("b");
  check(await page.locator(".swimlane").isVisible(), "keyboard prefix switches to board view");
  await page.keyboard.press("f");
  check(await page.locator("#searchInput").evaluate((input) => document.activeElement === input), "keyboard shortcut focuses search");
  await page.fill("#searchInput", "Search Audit");
  await page.locator("body").click({ position: { x: 10, y: 10 } });
  await page.keyboard.press("r");
  check((await page.locator("#searchInput").inputValue()) === "", "keyboard shortcut resets search");
  await page.click('[data-view="board"]');
  await page.selectOption("#cardModeSelect", "compact");
  project = await getActiveProject(page);
  const state = await getState(page);
  check(state.ui.cardMode === "compact", "card display mode saves");

  await page.locator(".column .board-menu summary").first().click();
  check(await page.locator(".column .board-menu-panel").first().isVisible(), "column dropdown menu renders");
  await page.locator('.column .board-menu-panel [data-action="hide-column"]').first().click();
  await pause();
  let stateAfterMenu = await getState(page);
  check(stateAfterMenu.ui.hiddenColumns[stateAfterMenu.activeProjectId].length === 1, "column dropdown menu hides column");

  check(await page.locator("#columnVisibility .column-picker summary").isVisible(), "column visibility picker renders compact summary");
  await page.locator("#columnVisibility .column-picker summary").click();
  check((await page.locator("#columnVisibility .column-picker-option").count()) === project.columns.length, "column visibility picker lists every column");
  await page.locator('#columnVisibility [data-action="show-all-columns"]').click();
  await pause();
  const firstVisibilityCheckbox = page.locator("#columnVisibility .column-picker-option input").first();
  await firstVisibilityCheckbox.uncheck();
  await pause();
  let stateAfterHide = await getState(page);
  check(stateAfterHide.ui.hiddenColumns[stateAfterHide.activeProjectId].length === 1, "column visibility hides column");
  check(await page.locator("#columnVisibility .column-picker").evaluate((picker) => picker.open), "column visibility picker stays open after change");
  await page.locator('#columnVisibility [data-action="show-all-columns"]').click();
  await pause();
  stateAfterHide = await getState(page);
  check(stateAfterHide.ui.hiddenColumns[stateAfterHide.activeProjectId].length === 0, "column visibility restores column");

  project = await getActiveProject(page);
  const menuCard = allCards(project).find((item) => item.title === "Search Audit");
  await page.locator(`.card[data-card-id="${menuCard.id}"] .board-menu summary`).click();
  check(await page.locator(`.card[data-card-id="${menuCard.id}"] .board-menu-panel`).isVisible(), "task dropdown menu renders");
  await page.locator(`.card[data-card-id="${menuCard.id}"] [data-action="duplicate-card"]`).click();
  await pause();
  project = await getActiveProject(page);
  check(allCards(project).filter((item) => item.title.startsWith("Search Audit")).length === 2, "task dropdown menu duplicates card");
}

async function testTaskActionsLinksAndMove(page) {
  await fresh(page);
  let project = await getActiveProject(page);
  let card = allCards(project)[0];
  const initialCount = allCards(project).length;
  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.click("#duplicateCardBtn");
  await pause();
  project = await getActiveProject(page);
  check(allCards(project).length === initialCount + 1, "duplicate task adds a copy");
  await closeCardDialog(page);

  card = allCards(project)[0];
  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.click("#toggleCardClosedBtn");
  await pause();
  project = await getActiveProject(page);
  check(allCards(project).find((item) => item.id === card.id).isClosed === true, "task can be closed");
  await closeCardDialog(page);
  check((await page.locator(`.card[data-card-id="${card.id}"]`).count()) === 0, "closed task hides by default");
  await page.check("#showClosedInput");
  await pause();
  check(await page.locator(`.card[data-card-id="${card.id}"]`).isVisible(), "show closed displays closed task");
  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.click("#toggleCardClosedBtn");
  await pause();
  project = await getActiveProject(page);
  check(allCards(project).find((item) => item.id === card.id).isClosed === false, "task can be reopened");
  await closeCardDialog(page);

  card = allCards(project)[0];
  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.click("#addLinkBtn");
  await saveForm(page, "#cardForm");
  project = await getActiveProject(page);
  check(allCards(project).find((item) => item.id === card.id).links.length === 1, "internal task link saves");

  const targetProjectId = await createBlankProject(page, "Move Target");
  await page.locator("#projectList .project-item").first().click();
  await pause();
  project = await getActiveProject(page);
  card = allCards(project)[0];
  await page.locator(`.card[data-card-id="${card.id}"]`).click();
  await page.selectOption("#moveProjectInput", targetProjectId);
  await page.click("#moveCardBtn");
  await pause();
  const state = await getState(page);
  const targetProject = activeProjectFrom(state);
  check(state.activeProjectId === targetProjectId, "moving task switches to target project");
  check(targetProject.columns[0].cards.some((item) => item.id === card.id), "moving task transfers card");
}

async function testSettingsAnalyticsAutomation(page) {
  await fresh(page);
  await page.click("#addSwimlaneBtn");
  await page.fill("#swimlaneTitleInput", "Audit Disabled Lane");
  await saveForm(page, "#swimlaneForm");
  await page.click("#projectSettingsBtn");
  await page.selectOption("#settingsProjectTypeInput", "personal");
  await page.selectOption("#settingsAccessModeInput", "private");
  await page.check("#settingsPublicAccessInput");
  await page.fill("#settingsPlannedStartInput", "2026-06-01");
  await page.fill("#settingsPlannedLaunchInput", "2026-06-30");
  await page.fill("#settingsActualStartInput", "2026-06-02");
  await page.fill("#projectFileNameInput", "Audit PRD.pdf");
  await page.fill("#projectFileMetaInput", "PDF · 500KB");
  await page.fill("#projectFileOwnerInput", "Auditor");
  await page.click("#addProjectFileBtn");
  await page.fill("#memberNameInput", "Auditor");
  await page.click("#addMemberBtn");
  await page.fill("#groupNameInput", "Audit Group");
  await page.selectOption("#groupRoleInput", "访客");
  await page.click("#addGroupBtn");
  await page.fill("#categoryNameInput", "AuditCat");
  await page.click("#addCategoryBtn");
  await page.fill("#tagNameInput", "audit-tag");
  await page.click("#addTagBtn");
  await page.fill("#filterNameInput", "Audit Open");
  await page.fill("#filterQueryInput", "assignee:Auditor status:open");
  await page.click("#addFilterBtn");
  await page.locator('#settingsSwimlaneList .settings-item [data-action="toggle"]').nth(1).click();
  await saveForm(page, "#projectSettingsForm");
  let project = await getActiveProject(page);
  check(project.settings.projectType === "personal", "project type setting saves");
  check(project.settings.permissionMode === "private", "project access mode saves");
  check(project.settings.publicAccessEnabled === true, "project public access setting saves");
  check(project.timeline.plannedLaunch === "2026-06-30", "project timeline setting saves");
  check(project.files.some((item) => item.name === "Audit PRD.pdf"), "project file setting saves");
  check(project.settings.members.some((item) => item.name === "Auditor"), "member setting saves");
  check(project.settings.groups.some((item) => item.name === "Audit Group" && item.role === "访客"), "group permission setting saves");
  check(project.settings.categories.includes("AuditCat"), "category setting saves");
  check(project.settings.tags.includes("audit-tag"), "tag setting saves");
  check(project.settings.customFilters.some((item) => item.name === "Audit Open"), "custom filter setting saves");
  check(project.settings.disabledSwimlaneIds.length === 1, "swimlane disable setting saves");
  await page.click('[data-view="overview"]');
  check((await page.locator(".overview-panel", { hasText: "Audit PRD.pdf" }).count()) >= 1, "overview renders project files");
  check((await page.locator(".overview-panel", { hasText: "私有项目" }).count()) >= 1, "overview renders access mode");
  check((await page.locator(".overview-panel", { hasText: "公共订阅" }).count()) >= 1, "overview renders public subscription status");
  await page.click('[data-view="board"]');
  await page.click("#subscriptionsBtn");
  check(await page.locator("#subscriptionsDialog[open]").isVisible(), "subscription dialog opens");
  check((await page.locator("#icalFeedInput").inputValue()).endsWith("/calendar.ics"), "iCalendar link renders");
  check((await page.locator("#rssFeedInput").inputValue()).endsWith("/activity.atom"), "RSS Atom link renders");
  check(await page.locator("#copyIcalBtn").isEnabled(), "iCalendar copy action enables with public access");
  await page.click("#copyIcalBtn");
  check((await page.locator("#subscriptionStatus").textContent()).includes("iCalendar"), "subscription copy feedback renders");
  check((await page.locator("#subscriptionPreviewList .subscription-preview-item").count()) >= 1, "subscription activity preview renders");
  await page.locator('#subscriptionsDialog button[value="cancel"]').first().click();

  const enabledLane = project.swimlanes.find((lane) => !project.settings.disabledSwimlaneIds.includes(lane.id));
  const analyticsCard = await quickCreateCard(page, project.columns[0].id, enabledLane.id, "Analytics Audit", {
    assignee: "Auditor",
    estimate: "3"
  });
  await page.locator(`.card[data-card-id="${analyticsCard.id}"]`).click();
  await page.fill("#cardActualInput", "2");
  await page.fill("#cardPlannedStartInput", "2026-06-01");
  await page.fill("#cardPlannedEndInput", "2026-06-02");
  await page.fill("#cardActualStartInput", "2026-06-01");
  await page.fill("#timeSpentInput", "1");
  await page.fill("#timeNoteInput", "Analytics session");
  await page.click("#addTimeEntryBtn");
  await page.fill("#attachmentNameInput", "analytics-brief.docx");
  await page.fill("#attachmentMetaInput", "DOCX");
  await page.click("#addAttachmentBtn");
  await page.selectOption("#recurringPatternInput", "monthly");
  await page.fill("#recurringNextDateInput", "2026-07-01");
  await saveForm(page, "#cardForm");
  project = await getActiveProject(page);
  const savedAnalyticsCard = allCards(project).find((item) => item.title === "Analytics Audit");
  check(savedAnalyticsCard.timeLogs.length === 1, "time tracking log saves for analytics");
  check(savedAnalyticsCard.attachments.length === 1, "attachment data saves for analytics");
  check(savedAnalyticsCard.recurring.pattern === "monthly", "recurring task data saves for analytics");
  check(savedAnalyticsCard.schedule.plannedEnd === "2026-06-02", "card schedule data saves for analytics");

  await page.click("#analyticsBtn");
  check((await page.locator("#analyticsSummary .overview-panel").count()) === 6, "analytics summary renders six metrics");
  check((await page.locator("#analyticsTimelineSummary .overview-panel").count()) === 6, "timeline summary renders six metrics");
  check((await page.locator("#analyticsPhaseTimeline .phase-item").count()) === project.columns.length, "phase timeline renders every column");
  const riskItems = await page.locator("#analyticsRiskList .settings-item").count();
  const riskEmpty = await page.locator("#analyticsRiskList .empty-state").count();
  check(riskItems + riskEmpty >= 1, "cycle risk panel renders");
  check((await page.locator("#analyticsColumnBreakdown .analytics-item").count()) === project.columns.length, "analytics column breakdown renders");
  await page.locator('#analyticsDialog .modal-actions button[value="cancel"]').click();
  await pause();

  await page.click("#automationBtn");
  const beforeAutomation = project.automations.length;
  await page.fill("#automationTargetInput", "Audit target");
  await page.click("#addAutomationBtn");
  await page.click("#runAutomationBtn");
  await saveForm(page, "#automationForm");
  project = await getActiveProject(page);
  check(project.automations.length === beforeAutomation + 1, "automation rule create saves");
  check(project.automations.some((rule) => rule.lastRunAt), "automation simulation stamps last run time");
  check(project.notifications.length >= 1 && project.notifications[0].read === false, "automation simulation creates unread notification");

  await page.click("#activityBtn");
  check((await page.locator("#projectActivityList .project-activity-item").count()) >= 1, "project activity stream renders");
  await page.locator('#activityDialog button[value="cancel"]').first().click();
  await pause();

  await page.click("#notificationsBtn");
  check((await page.locator("#notificationList .notification-item").count()) >= 1, "notification center renders notifications");
  await page.click("#markNotificationsBtn");
  await pause();
  project = await getActiveProject(page);
  check(project.notifications.every((item) => item.read), "notification center marks all read");
}

async function testImportExport(page) {
  await fresh(page);
  const initialState = await getState(page);
  const initialProjectCount = initialState.projects.length;
  await page.click("#importExportBtn");
  check(await page.locator("#importExportDialog[open]").isVisible(), "import export dialog opens");
  check((await page.locator("#exportPreviewInput").inputValue()).startsWith("id,title,column"), "tasks CSV export preview renders");
  await page.click("#copyExportBtn");
  check((await page.locator("#importExportStatus").textContent()).includes("导出内容已选中"), "export copy feedback renders");
  await page.selectOption("#exportTypeInput", "subtasks-csv");
  await page.click("#generateExportBtn");
  check((await page.locator("#exportPreviewInput").inputValue()).startsWith("cardId,cardTitle"), "subtasks CSV export preview renders");
  await page.selectOption("#exportTypeInput", "project-json");
  await page.click("#generateExportBtn");
  const exportJson = await page.locator("#exportPreviewInput").inputValue();
  const parsed = JSON.parse(exportJson);
  check(parsed.exportVersion === "kanboard-static-v0825", "project JSON export version renders");
  check(parsed.project.columns.length >= 1, "project JSON export includes columns");
  await page.fill("#importJsonInput", exportJson);
  await page.click("#previewImportBtn");
  check(await page.locator("#importProjectBtn").isEnabled(), "JSON import preview enables import");
  await page.click("#importProjectBtn");
  await pause();
  const importedState = await getState(page);
  const importedProject = activeProjectFrom(importedState);
  check(importedState.projects.length === initialProjectCount + 1, "JSON import creates a new project");
  check(importedProject.name.endsWith(" - 导入"), "JSON import renames project copy");
  check(importedProject.columns.length === parsed.project.columns.length, "JSON import keeps column count");
  check(allCards(importedProject).length === allCards(parsed.project).length, "JSON import keeps task count");
}

async function testPlugins(page) {
  await fresh(page);
  await page.click("#pluginsBtn");
  check(await page.locator("#pluginsDialog[open]").isVisible(), "plugins dialog opens");
  check(await page.locator("#availablePluginList [data-action='install']").first().isDisabled(), "plugin install disabled by default");
  await page.check("#pluginInstallerInput");
  check(await page.locator("#availablePluginList [data-action='install']").first().isEnabled(), "plugin install enables when requirements pass");
  await page.locator("#availablePluginList [data-action='install']").first().click();
  await pause();
  let state = await getState(page);
  check(state.plugins.catalog.filter((plugin) => plugin.status === "installed").length >= 2, "plugin install saves state");
  await page.locator("#installedPluginList [data-action='upgrade']:not([disabled])").first().click();
  await pause();
  state = await getState(page);
  const budgetPlugin = state.plugins.catalog.find((plugin) => plugin.id === "budget");
  check(budgetPlugin.version === budgetPlugin.latestVersion, "plugin upgrade saves latest version");
  await page.locator("#installedPluginList [data-action='uninstall']").first().click();
  await pause();
  state = await getState(page);
  check(state.plugins.catalog.some((plugin) => plugin.status === "available"), "plugin uninstall returns plugin to catalog");
  check((await page.locator("#pluginStatus").textContent()).includes("安装器可用"), "plugin status explains installer availability");
}

async function testIdentityManagement(page) {
  await fresh(page);
  await page.click("#userManagementBtn");
  check(await page.locator("#identityDialog[open]").isVisible(), "identity dialog opens");
  check((await page.locator("#identityUserList .identity-user-item").count()) >= 4, "identity user list renders");
  check((await page.locator("#identityGroupList .identity-group-item").count()) >= 2, "identity group list renders");
  await page.fill("#identityUsernameInput", "audit_user");
  await page.fill("#identityDisplayNameInput", "审计用户");
  await page.fill("#identityEmailInput", "audit@example.com");
  await page.selectOption("#identityUserRoleInput", "app-manager");
  await page.fill("#identitySecretInput", "123456");
  await page.click("#addIdentityUserBtn");
  await pause();
  let state = await getState(page);
  const auditUser = state.identity.users.find((user) => user.username === "audit_user");
  check(Boolean(auditUser) && auditUser.role === "app-manager", "identity local user create saves");
  await page.fill("#identityGroupNameInput", "Audit Group");
  await page.fill("#identityGroupExternalInput", "external-audit");
  await page.click("#addIdentityGroupBtn");
  await pause();
  state = await getState(page);
  const auditGroup = state.identity.groups.find((group) => group.name === "Audit Group");
  check(Boolean(auditGroup), "identity group create saves");
  await page.selectOption("#identityGroupSelect", auditGroup.id);
  await page.selectOption("#identityGroupUserSelect", auditUser.id);
  await page.click("#addIdentityGroupMemberBtn");
  await pause();
  state = await getState(page);
  check(state.identity.groups.find((group) => group.id === auditGroup.id).memberIds.includes(auditUser.id), "identity group member add saves");
  await page.locator(`#identityUserList [data-id="${auditUser.id}"] [data-action="twofactor"]`).check();
  await pause();
  state = await getState(page);
  const securedUser = state.identity.users.find((user) => user.id === auditUser.id);
  check(securedUser.twoFactor && securedUser.apiKeyRequired, "identity 2FA marks API key requirement");
  await page.locator(`#identityUserList [data-id="${auditUser.id}"] [data-action="toggle"]`).click();
  await pause();
  state = await getState(page);
  check(state.identity.users.find((user) => user.id === auditUser.id).active === false, "identity user disable saves");
  await page.locator(`#identityGroupList [data-id="${auditGroup.id}"] [data-user-id="${auditUser.id}"]`).click();
  await pause();
  state = await getState(page);
  check(!state.identity.groups.find((group) => group.id === auditGroup.id).memberIds.includes(auditUser.id), "identity group member remove saves");
  check((await page.locator("#identityStatus").textContent()).length > 0, "identity status feedback renders");
}

async function testSystemSettings(page) {
  await fresh(page);
  await page.click("#systemSettingsBtn");
  check(await page.locator("#systemSettingsDialog[open]").isVisible(), "system settings dialog opens");
  check((await page.locator("#systemSummary .analytics-card").count()) === 4, "system settings summary renders");
  check((await page.locator("#systemConfigPreview").inputValue()).includes("LDAP_AUTH"), "system config preview renders");
  await page.fill("#apiHeaderInput", "X-API-Auth");
  await page.check("#ldapEnabledInput");
  await page.selectOption("#ldapBindTypeInput", "user");
  await page.fill("#ldapUserBaseInput", "ou=People,dc=example,dc=com");
  await page.check("#proxyEnabledInput");
  await page.fill("#proxyTrustedInput", "");
  await page.check("#hideLoginInput");
  await pause();
  let state = await getState(page);
  check(state.system.api.authHeader === "X-API-Auth", "system API custom header saves");
  check(state.system.ldap.enabled && state.system.ldap.bindType === "user", "system LDAP settings save");
  check(state.system.reverseProxy.enabled, "system reverse proxy setting saves");
  check((await page.locator("#systemStatus").textContent()).includes("TRUSTED_PROXY_NETWORKS"), "system risk status renders missing trusted proxy warning");
  await page.fill("#proxyTrustedInput", "127.0.0.1/32,::1/128");
  await page.uncheck("#proxyStripHeadersInput");
  await pause();
  state = await getState(page);
  check(state.system.reverseProxy.trustedNetworks.includes("127.0.0.1/32"), "system trusted proxy networks save");
  check(state.system.reverseProxy.stripIncomingHeaders === false, "system proxy header stripping toggle saves");
  check((await page.locator("#systemConfigPreview").inputValue()).includes("REVERSE_PROXY_AUTH"), "system reverse proxy config preview renders");
}

async function testRuntimeEnvironment(page) {
  await fresh(page);
  await page.click("#runtimeBtn");
  check(await page.locator("#runtimeDialog[open]").isVisible(), "runtime dialog opens");
  check((await page.locator("#runtimeSummary .analytics-card").count()) === 4, "runtime summary renders");
  check((await page.locator("#runtimeRequirementList .runtime-requirement-item").count()) >= 12, "runtime PHP requirement list renders");
  check((await page.locator("#runtimeConfigPreview").inputValue()).includes("DB_DRIVER"), "runtime config preview renders");
  await page.selectOption("#runtimeDbDriverInput", "postgres");
  await page.fill("#runtimeDbHostInput", "db.internal");
  await page.fill("#runtimeDbPortInput", "5432");
  await page.fill("#runtimeDbNameInput", "kanboard_pm");
  await pause();
  let state = await getState(page);
  check(state.runtime.database.driver === "postgres", "runtime database driver saves");
  check(state.runtime.database.host === "db.internal" && state.runtime.database.name === "kanboard_pm", "runtime remote database fields save");
  check((await page.locator("#runtimeStatus").textContent()).includes("pdo_pgsql"), "runtime missing driver extension risk renders");
  await page.locator('#runtimeRequirementList [data-extension="pdo_pgsql"]').check();
  await pause();
  state = await getState(page);
  check(state.runtime.php.extensions.pdo_pgsql === true, "runtime driver extension toggle saves");
  await page.uncheck("#runtimeOpcacheInput");
  await pause();
  check((await page.locator("#runtimeStatus").textContent()).includes("OpCode"), "runtime performance warning renders");
  await page.click("#runDbBackupBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.runtime.database.lastBackupAt), "runtime backup simulation saves timestamp");
  check(state.runtime.upgrade.backupVerified === true, "runtime backup marks upgrade checklist");
  await page.click("#runDbMigrationBtn");
  await pause();
  state = await getState(page);
  check(state.runtime.database.currentSchemaVersion === state.runtime.database.latestSchemaVersion, "runtime migration syncs schema version");
  await page.click("#runDbOptimizeBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.runtime.database.lastOptimizeAt), "runtime optimize simulation saves timestamp");
  check(state.runtime.logs.length >= 3, "runtime operation logs render");
  await page.locator('#runtimeUpgradeList [data-upgrade-key="changeLogReviewed"]').check();
  await page.locator('#runtimeUpgradeList [data-upgrade-key="workersStopped"]').check();
  await pause();
  state = await getState(page);
  check(state.runtime.upgrade.changeLogReviewed && state.runtime.upgrade.workersStopped, "runtime upgrade checklist saves");
  check((await page.locator("#runtimeConfigPreview").inputValue()).includes("DB_HOSTNAME"), "runtime database config preview includes hostname");
}

async function testDeploymentChecks(page) {
  await fresh(page);
  await page.click("#deploymentBtn");
  check(await page.locator("#deploymentDialog[open]").isVisible(), "deployment dialog opens");
  check((await page.locator("#deploymentSummary .analytics-card").count()) === 4, "deployment summary renders");
  check((await page.locator("#deploymentRunbookPreview").inputValue()).includes("ENABLE_URL_REWRITE"), "deployment runbook renders URL rewrite config");
  check((await page.locator("#deploymentRiskList .deployment-risk-item").count()) >= 1, "deployment risk list renders");
  await page.selectOption("#deploymentMethodInput", "docker");
  await page.check("#dockerEnabledInput");
  await page.selectOption("#dockerComposeProfileInput", "postgres");
  await page.fill("#dockerTagInput", "latest");
  await page.uncheck("#dockerPinnedInput");
  await pause();
  let state = await getState(page);
  check(state.deployment.install.method === "docker", "deployment method saves docker");
  check(state.deployment.docker.enabled === true && state.deployment.docker.composeProfile === "postgres", "deployment Docker profile saves");
  check((await page.locator("#deploymentRiskList").textContent()).includes("Docker"), "deployment Docker pinning risk renders");
  await page.fill("#dockerTagInput", "v1.2.46");
  await page.check("#dockerPinnedInput");
  await page.uncheck("#deploymentDataProtectedInput");
  await pause();
  check((await page.locator("#deploymentRiskList").textContent()).includes("data"), "deployment data exposure risk renders");
  await page.check("#deploymentDataProtectedInput");
  await page.selectOption("#accessWebServerInput", "nginx");
  await page.uncheck("#accessDataDenyInput");
  await pause();
  check((await page.locator("#deploymentRiskList").textContent()).includes("data"), "deployment nginx data deny risk renders");
  await page.check("#accessDataDenyInput");
  await page.check("#accessProxyInput");
  await page.fill("#accessTrustedProxyInput", "");
  await pause();
  check((await page.locator("#deploymentRiskList").textContent()).includes("TRUSTED_PROXY_NETWORKS"), "deployment trusted proxy risk renders");
  await page.fill("#accessTrustedProxyInput", "127.0.0.1/32,::1/128");
  await page.click("#runHealthcheckBtn");
  await pause();
  state = await getState(page);
  check(state.deployment.docker.healthStatus === "200 OK", "deployment healthcheck simulation saves status");
  check(state.deployment.logs.some((entry) => entry.action === "healthcheck.php"), "deployment healthcheck writes log");
  check((await page.locator("#deploymentRunbookPreview").inputValue()).includes("docker run"), "deployment runbook renders docker command");
  await page.check("#deploymentPasswordChangedInput");
  await page.check("#accessStripAuthInput");
  await page.check("#accessStripForwardedInput");
  await pause();
  state = await getState(page);
  check(state.deployment.install.defaultPasswordChanged === true, "deployment password checklist saves");
  check(state.deployment.access.stripAuthHeaders && state.deployment.access.stripForwardedHeaders, "deployment proxy header checklist saves");
}

async function testDeveloperIntegrations(page) {
  await fresh(page);
  await page.click("#developerBtn");
  check(await page.locator("#developerDialog[open]").isVisible(), "developer dialog opens");
  check((await page.locator("#developerSummary .analytics-card").count()) === 4, "developer summary renders");
  check((await page.locator("#apiProcedureIndex .developer-index-item").count()) >= 6, "developer API procedure index renders");
  check((await page.locator("#webhookPayloadPreview").inputValue()).includes("event_name"), "developer webhook payload preview renders");
  check((await page.locator("#apiRequestPreview").inputValue()).includes("jsonrpc"), "developer API request preview renders");
  check((await page.locator("#pluginSkeletonPreview").inputValue()).includes("class Plugin"), "developer plugin skeleton preview renders");

  await page.check("#webhookEnabledInput");
  await page.fill("#webhookUrlInput", "https://hooks.example.com/kanboard");
  await page.fill("#webhookTokenInput", "secret-token");
  await page.selectOption("#webhookEventInput", "task.update");
  await page.fill("#webhookTimeoutInput", "1500");
  await pause();
  let state = await getState(page);
  check(state.developer.webhooks.selectedEvent === "task.update", "developer webhook event saves");
  check(state.developer.webhooks.timeoutBudgetMs === 1500, "developer webhook timeout saves");
  check((await page.locator("#developerRiskList .developer-risk-item.fail").count()) >= 1, "developer webhook risk renders");
  await page.click("#sendWebhookBtn");
  await pause();
  state = await getState(page);
  check(state.developer.webhooks.receiverStatus === "200 OK", "developer webhook simulation saves status");
  check(state.developer.webhooks.deliveries.length === 1, "developer webhook delivery log saves");

  await page.fill("#apiEndpointDeveloperInput", "https://kanboard.example.com/jsonrpc.php");
  await page.selectOption("#apiAccessTypeInput", "user");
  await page.selectOption("#apiAuthMethodInput", "header");
  await page.fill("#apiCustomHeaderDeveloperInput", "X-API-Auth");
  await page.selectOption("#apiProcedureInput", "createTask");
  await page.check("#apiBatchModeInput");
  await pause();
  check((await page.locator("#apiRequestPreview").inputValue()).includes("createTask"), "developer API preview updates selected method");
  await page.click("#runApiProcedureBtn");
  await pause();
  state = await getState(page);
  check(state.developer.api.selectedProcedure === "createTask", "developer API procedure saves");
  check(state.developer.api.logs.length === 1, "developer API call log saves");

  await page.fill("#pluginNameInput", "bad plugin");
  await pause();
  check((await page.locator("#developerRiskList .developer-risk-item.fail").count()) >= 1, "developer plugin naming risk renders");
  await page.fill("#pluginNameInput", "PmWorkflowPlus");
  await page.fill("#pluginNamespaceInput", "PmWorkflowPlus");
  await page.check("#pluginSchemaInput");
  await page.check("#pluginMetadataInput");
  await page.check("#pluginApiMethodInput");
  await page.check("#pluginHookInput");
  await page.selectOption("#pluginHookSelect", "template:layout:css");
  await page.selectOption("#pluginEventSelect", "task.close");
  await page.fill("#pluginProcedureNameInput", "pm_workflow_export");
  await page.click("#generatePluginBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.developer.pluginDev.lastGeneratedAt), "developer plugin skeleton generation timestamp saves");
  const skeleton = await page.locator("#pluginSkeletonPreview").inputValue();
  check(skeleton.includes("getCompatibleVersion"), "developer plugin skeleton includes compatibility method");
  check(skeleton.includes("pm_workflow_export"), "developer plugin skeleton includes API method");
  check((await page.locator("#developerStatus").textContent()).length > 0, "developer status feedback renders");
}

async function testExtensionLab(page) {
  await fresh(page);
  await page.click("#extensionLabBtn");
  check(await page.locator("#extensionDialog[open]").isVisible(), "extension lab dialog opens");
  check((await page.locator("#extensionSummary .analytics-card").count()) === 5, "extension summary renders");
  check((await page.locator("#authProviderList .extension-provider-item").count()) >= 5, "extension auth provider list renders");
  check((await page.locator("#authFlowList .extension-flow-item").count()) === 6, "extension auth workflow renders");
  check((await page.locator("#authProviderPreview").inputValue()).includes("AuthenticationManager"), "extension auth provider preview renders");
  check((await page.locator("#actionExtensionPreview").inputValue()).includes("getCompatibleEvents"), "extension automatic action preview renders");
  check((await page.locator("#notificationExtensionPreview").inputValue()).includes("NotificationInterface"), "extension notification preview renders");
  check((await page.locator("#advancedAccessPreview").inputValue()).includes("projectAccessMap"), "extension advanced access preview renders");
  check((await page.locator("#advancedProviderPreview").inputValue()).includes("externalLinkManager"), "extension advanced provider preview renders");
  check((await page.locator("#advancedSchemaPreview").inputValue()).includes("const VERSION"), "extension advanced schema preview renders");
  check((await page.locator("#advancedEventsPreview").inputValue()).includes("eventManager"), "extension advanced event preview renders");

  await page.selectOption("#authProviderInterfaceInput", "pre");
  await page.fill("#authProviderNameInput", "ProxySso");
  await page.fill("#authProviderClassInput", "Kanboard\\Plugin\\ProxySso\\Auth\\ProxySsoProvider");
  await page.fill("#authExternalIdColumnInput", "sso_id");
  await page.uncheck("#authAutoCreateInput");
  await page.check("#authSessionCheckInput");
  await pause();
  let state = await getState(page);
  check(state.extensions.authProviders.selectedInterface === "pre", "extension auth provider interface saves");
  check(state.extensions.authProviders.providerName === "ProxySso", "extension auth provider name saves");
  await page.click("#runAuthSimulationBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.extensions.authProviders.lastSimulationAt), "extension auth provider simulation timestamp saves");
  check(state.extensions.authProviders.providers.some((provider) => provider.id === "custom-auth-provider"), "extension custom auth provider registers in list");

  await page.fill("#actionNameInput", "MoveTaskToReady");
  await page.fill("#actionClassInput", "Kanboard\\Plugin\\PmWorkflow\\Action\\MoveTaskToReady");
  await page.selectOption("#actionEventInput", "task.update");
  await page.fill("#actionRequiredParameterInput", "");
  await pause();
  check((await page.locator("#extensionRiskList .extension-risk-item.fail").count()) >= 1, "extension automatic action risk renders");
  await page.fill("#actionRequiredParameterInput", "target_column_id");
  await page.fill("#actionEventParameterInput", "task_id,column_id,project_id");
  await page.fill("#actionConditionInput", "column_id == review");
  await page.click("#runActionExtensionBtn");
  await pause();
  state = await getState(page);
  check(state.extensions.automaticActions.selectedEvent === "task.update", "extension automatic action event saves");
  check(state.extensions.automaticActions.logs.length === 1, "extension automatic action log saves");

  await page.fill("#notificationTypeKeyInput", "chat-ops");
  await page.fill("#notificationTypeLabelInput", "Chat Ops");
  await page.fill("#notificationHandlerClassInput", "Kanboard\\Plugin\\ChatOps\\Notification\\ChatOpsHandler");
  await page.selectOption("#notificationScopeInput", "user");
  await page.selectOption("#notificationEventInput", "task.close");
  await page.fill("#notificationEndpointInput", "");
  await pause();
  check((await page.locator("#extensionRiskList .extension-risk-item.fail").count()) >= 1, "extension notification endpoint risk renders");
  await page.fill("#notificationEndpointInput", "https://chat.example.com/hooks/kanboard");
  await page.click("#sendExtensionNotificationBtn");
  await pause();
  state = await getState(page);
  check(state.extensions.notificationTypes.typeKey === "chat-ops", "extension notification type key saves");
  check(state.extensions.notificationTypes.logs.length === 1, "extension notification delivery log saves");

  await page.selectOption("#advancedAuthorizationScopeInput", "application");
  await page.selectOption("#advancedAuthorizationRoleInput", "Role::APP_MANAGER");
  await page.fill("#advancedAuthorizationControllerInput", "PmWorkflowController");
  await page.fill("#advancedAuthorizationActionInput", "export");
  await page.fill("#advancedRouteUrlInput", "pm/workflow/:project_id");
  await pause();
  check((await page.locator("#extensionRiskList .extension-risk-item.fail").count()) >= 1, "extension custom route risk renders");
  await page.fill("#advancedRouteUrlInput", "/pm/workflow/:project_id");
  await page.selectOption("#advancedRouteResultInput", "redirect");
  await page.click("#runAdvancedRouteBtn");
  await pause();
  state = await getState(page);
  check(state.extensions.advanced.authorization.scope === "application", "extension advanced authorization scope saves");
  check(Boolean(state.extensions.advanced.routes.lastStatus), "extension custom route status saves");

  await page.fill("#advancedExternalLinkPatternInput", "https://github.com/example/product/pull/");
  await pause();
  check((await page.locator("#extensionRiskList .extension-risk-item.fail").count()) >= 1, "extension external link risk renders");
  await page.fill("#advancedExternalLinkPatternInput", "https://github.com/example/product/pull/%s");
  await page.click("#runAdvancedProviderSyncBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.extensions.advanced.providers.lastSyncAt), "extension provider sync timestamp saves");
  check(state.extensions.advanced.logs.some((entry) => entry.type === "Provider Registry"), "extension provider sync log saves");

  await page.fill("#advancedSchemaVersionInput", "2");
  await page.selectOption("#advancedSchemaDriverInput", "Postgres.php");
  await page.fill("#advancedSchemaTableInput", "pm_workflow_links");
  await page.click("#runAdvancedSchemaBtn");
  await pause();
  state = await getState(page);
  check(state.extensions.advanced.schema.version === 2, "extension schema version saves");
  check(Boolean(state.extensions.advanced.schema.lastMigrationAt), "extension schema migration timestamp saves");
  check((await page.locator("#advancedSchemaPreview").inputValue()).includes("version_2"), "extension schema migration preview updates");

  await page.fill("#advancedHelperNameInput", "pmWorkflowHelper");
  await page.fill("#advancedEventNameInput", "pm.workflow.released");
  await page.fill("#advancedOverrideTemplateInput", "dashboard/sidebar");
  await page.click("#generateAdvancedPluginBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.extensions.advanced.events.lastGeneratedAt), "extension helper event generation timestamp saves");
  check((await page.locator("#advancedEventsPreview").inputValue()).includes("pm.workflow.released"), "extension helper event preview updates");
  check((await page.locator("#extensionStatus").textContent()).length > 0, "extension status feedback renders");
}

async function testOperations(page) {
  await fresh(page);
  await page.click("#operationsBtn");
  check(await page.locator("#operationsDialog[open]").isVisible(), "operations dialog opens");
  check((await page.locator("#operationsSummary .analytics-card").count()) === 4, "operations summary renders");
  check((await page.locator("#jobQueueList .operation-job-item").count()) >= 3, "operations job queue renders");
  await page.selectOption("#cronModeInput", "url");
  await page.fill("#cronUrlInput", "https://kanboard.example.com/cronjob?token=test");
  await page.click("#runCronBtn");
  await pause();
  let state = await getState(page);
  check(state.operations.cron.status === "已运行", "operations cron run saves status");
  check(state.operations.jobs.filter((job) => job.status === "done").length >= 3, "operations cron completes daily jobs");
  await page.click("#runWorkerBtn");
  await pause();
  state = await getState(page);
  check(state.operations.worker.enabled === true && state.operations.worker.processed >= 1, "operations worker simulation saves progress");
  await page.selectOption("#mailTransportInput", "smtp");
  await page.fill("#mailTestRecipientInput", "ops@example.com");
  await page.click("#sendTestMailBtn");
  await pause();
  state = await getState(page);
  check(Boolean(state.operations.mail.lastTestAt), "operations test mail saves timestamp");
  await page.selectOption("#cliCommandInput", "db:version");
  check((await page.locator("#cliPreviewInput").inputValue()).includes("db:version"), "operations CLI preview changes");
  await page.click("#runCliBtn");
  await pause();
  state = await getState(page);
  check(state.operations.cli.logs.some((entry) => entry.command === "db:version"), "operations CLI run writes log");
  check((await page.locator("#operationsStatus").textContent()).length > 0, "operations status feedback renders");
}

async function testMobileDialogBounds(page) {
  await page.setViewportSize({ width: 390, height: 900 });
  await fresh(page);
  await page.click("#analyticsBtn");
  const analyticsFits = await page.evaluate(() => {
    const dialog = document.querySelector("#analyticsDialog");
    return dialog.getBoundingClientRect().width <= window.innerWidth;
  });
  check(analyticsFits, "analytics dialog fits mobile viewport");
  await page.locator('#analyticsDialog .modal-actions button[value="cancel"]').click();
  await pause();
  await page.click("#developerBtn");
  const developerFits = await page.evaluate(() => {
    const dialog = document.querySelector("#developerDialog");
    return dialog.getBoundingClientRect().width <= window.innerWidth;
  });
  check(developerFits, "developer dialog fits mobile viewport");
  await page.locator('#developerDialog .modal-actions button[value="cancel"]').click();
  await pause();
  await page.click("#extensionLabBtn");
  const extensionFits = await page.evaluate(() => {
    const dialog = document.querySelector("#extensionDialog");
    return dialog.getBoundingClientRect().width <= window.innerWidth;
  });
  check(extensionFits, "extension lab dialog fits mobile viewport");
  await page.locator('#extensionDialog .modal-actions button[value="cancel"]').click();
  await pause();
  await page.setViewportSize({ width: 1280, height: 900 });
}

async function testDesktopSidebarFixedWorkspaceScroll(page) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await fresh(page);
  const layout = await page.evaluate(async () => {
    const sidebar = document.querySelector(".sidebar");
    const workspace = document.querySelector(".workspace");
    const sidebarTopBefore = sidebar.getBoundingClientRect().top;
    window.scrollTo(0, 320);
    workspace.scrollTop = 320;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return {
      windowScrollY: window.scrollY,
      bodyOverflow: getComputedStyle(document.body).overflow,
      workspaceOverflowY: getComputedStyle(workspace).overflowY,
      workspaceCanScroll: workspace.scrollHeight > workspace.clientHeight,
      workspaceScrolled: workspace.scrollTop > 0,
      sidebarTopBefore,
      sidebarTopAfter: sidebar.getBoundingClientRect().top
    };
  });
  check(layout.bodyOverflow === "hidden" && layout.windowScrollY === 0, "desktop page scroll is locked to app shell");
  check(layout.workspaceOverflowY === "auto" && layout.workspaceCanScroll && layout.workspaceScrolled, "desktop workspace owns vertical scroll");
  check(layout.sidebarTopBefore === 0 && layout.sidebarTopAfter === 0, "desktop sidebar stays fixed while workspace scrolls");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(8000);
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  try {
    await testInitialShell(page);
    await testDialogCancelBypassesRequiredFields(page);
    await testProjectCrudAndTemplates(page);
    await testColumnAndSwimlaneCrud(page);
    await testCardCrudDetailsAndPersistence(page);
    await testFlowSortingSearchAndViews(page);
    await testTaskActionsLinksAndMove(page);
    await testSettingsAnalyticsAutomation(page);
    await testImportExport(page);
    await testPlugins(page);
    await testIdentityManagement(page);
    await testSystemSettings(page);
    await testRuntimeEnvironment(page);
    await testDeploymentChecks(page);
    await testDeveloperIntegrations(page);
    await testExtensionLab(page);
    await testOperations(page);
    await testDesktopSidebarFixedWorkspaceScroll(page);
    await testMobileDialogBounds(page);
    console.log(`\n${passed} checks passed.`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
