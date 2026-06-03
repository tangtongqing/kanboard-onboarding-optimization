const path = require("path");
const { chromium } = require("playwright");

const STORAGE_KEY = "kanboard-static-v088";
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
  check(project.swimlanes.length === 4, "demo has four PM workstream swimlanes");
  check(allCards(project).length === 25, "demo has twenty-five PM workflow cards");
  check(project.timeline.plannedStart === "2026-05-20" && project.timeline.plannedLaunch === "2026-06-11", "demo has project timeline");
  check(allCards(project).some((card) => card.schedule?.plannedEnd), "demo cards have schedule dates");
  check(Boolean(project.settings), "project settings normalized");
  check(project.automations.length >= 2, "default automation rules normalized");
  check((await page.locator("#projectList .project-item").count()) === 2, "project list renders");
  check((await page.locator(".swimlane").count()) === 4, "swimlanes render");
  check(state.ui.hideEmptyColumns === true, "empty columns are hidden by default");
  check((await page.locator(".column").count()) === 17, "compact swimlanes hide empty columns");
  await page.uncheck("#hideEmptyColumnsInput");
  await pause();
  check((await page.locator(".column").count()) === 44, "full swimlanes can show every workflow column");
  check(Number(await page.locator("#metricCards").textContent()) === 25, "metrics render card count");
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

  await page.locator(`.column[data-column-id="${addedColumn.id}"] [data-action="edit-column"]`).first().click();
  await page.fill("#columnTitleInput", "Audit Column Edited");
  await page.fill("#columnWipInput", "4");
  await saveForm(page, "#columnForm");
  project = await getActiveProject(page);
  check(project.columns.some((column) => column.title === "Audit Column Edited" && column.wipLimit === 4), "column edit saves");

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
  await page.click('[data-view="overview"]');
  check(await page.locator(".overview-view").isVisible(), "overview view renders");
  await page.click('[data-view="board"]');
  await page.selectOption("#cardModeSelect", "compact");
  project = await getActiveProject(page);
  const state = await getState(page);
  check(state.ui.cardMode === "compact", "card display mode saves");

  const firstVisibilityButton = page.locator("#columnVisibility button").first();
  await firstVisibilityButton.click();
  await pause();
  let stateAfterHide = await getState(page);
  check(stateAfterHide.ui.hiddenColumns[stateAfterHide.activeProjectId].length === 1, "column visibility hides column");
  await page.locator("#columnVisibility button").first().click();
  await pause();
  stateAfterHide = await getState(page);
  check(stateAfterHide.ui.hiddenColumns[stateAfterHide.activeProjectId].length === 0, "column visibility restores column");
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
  await page.click("#projectSettingsBtn");
  await page.selectOption("#settingsProjectTypeInput", "personal");
  await page.fill("#settingsPlannedStartInput", "2026-06-01");
  await page.fill("#settingsPlannedLaunchInput", "2026-06-30");
  await page.fill("#settingsActualStartInput", "2026-06-02");
  await page.fill("#memberNameInput", "Auditor");
  await page.click("#addMemberBtn");
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
  check(project.timeline.plannedLaunch === "2026-06-30", "project timeline setting saves");
  check(project.settings.members.some((item) => item.name === "Auditor"), "member setting saves");
  check(project.settings.categories.includes("AuditCat"), "category setting saves");
  check(project.settings.tags.includes("audit-tag"), "tag setting saves");
  check(project.settings.customFilters.some((item) => item.name === "Audit Open"), "custom filter setting saves");
  check(project.settings.disabledSwimlaneIds.length === 1, "swimlane disable setting saves");

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
  await page.selectOption("#recurringPatternInput", "monthly");
  await page.fill("#recurringNextDateInput", "2026-07-01");
  await saveForm(page, "#cardForm");
  project = await getActiveProject(page);
  const savedAnalyticsCard = allCards(project).find((item) => item.title === "Analytics Audit");
  check(savedAnalyticsCard.timeLogs.length === 1, "time tracking log saves for analytics");
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

  await page.click("#notificationsBtn");
  check((await page.locator("#notificationList .notification-item").count()) >= 1, "notification center renders notifications");
  await page.click("#markNotificationsBtn");
  await pause();
  project = await getActiveProject(page);
  check(project.notifications.every((item) => item.read), "notification center marks all read");
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
    await testProjectCrudAndTemplates(page);
    await testColumnAndSwimlaneCrud(page);
    await testCardCrudDetailsAndPersistence(page);
    await testFlowSortingSearchAndViews(page);
    await testTaskActionsLinksAndMove(page);
    await testSettingsAnalyticsAutomation(page);
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
