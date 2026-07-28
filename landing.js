const board = document.querySelector("[data-board-stage]");
const playButton = document.querySelector("#stagePlay");
const stageTitle = document.querySelector("#stageTitle");
const stageButtons = [...document.querySelectorAll("[data-stage-button]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const stages = [
  "一个模糊目标",
  "生成可理解的结构",
  "用示例解释看板",
  "完成第一次有效操作"
];

let activeStage = 0;
let playing = !reducedMotion.matches;
let boardVisible = true;
let timer = null;

function renderStage(nextStage) {
  activeStage = Number(nextStage);
  board.dataset.boardStage = String(activeStage);
  stageTitle.textContent = stages[activeStage];

  stageButtons.forEach((button, index) => {
    const isActive = index === activeStage;
    button.classList.toggle("active", isActive);
    if (isActive) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
}

function syncPlayButton() {
  playButton.setAttribute("aria-pressed", String(playing));
  playButton.setAttribute("aria-label", playing ? "暂停看板演变演示" : "播放看板演变演示");
  playButton.querySelector("span").textContent = playing ? "Ⅱ" : "▶";
}

function stopTimer() {
  window.clearInterval(timer);
  timer = null;
}

function startTimer() {
  stopTimer();
  if (!playing || !boardVisible || document.hidden) return;

  timer = window.setInterval(() => {
    renderStage((activeStage + 1) % stages.length);
  }, 2200);
}

stageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderStage(button.dataset.stageButton);
    startTimer();
  });
});

playButton.addEventListener("click", () => {
  playing = !playing;
  syncPlayButton();
  startTimer();
});

if ("IntersectionObserver" in window) {
  const boardObserver = new IntersectionObserver((entries) => {
    boardVisible = entries[0]?.isIntersecting ?? false;
    startTimer();
  }, { threshold: 0.1 });

  boardObserver.observe(board);
}

document.addEventListener("visibilitychange", startTimer);

const chapterLinks = [...document.querySelectorAll("[data-chapter-link]")];
const chapterSections = chapterLinks
  .map((link) => document.querySelector(`#${link.dataset.chapterLink}`))
  .filter(Boolean);
const chapterCurrent = document.querySelector(".chapter-current");
const chapterScroller = document.querySelector(".chapter-nav-inner > div");

function updateChapter(section) {
  if (!section) return;

  const activeLink = chapterLinks.find((link) => link.dataset.chapterLink === section.id);
  if (!activeLink) return;

  chapterLinks.forEach((link) => {
    const current = link === activeLink;
    link.classList.toggle("current", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  const chapterNumber = section.dataset.chapter || "";
  chapterCurrent.replaceChildren();
  const number = document.createElement("b");
  number.textContent = chapterNumber;
  chapterCurrent.append(number, ` ${activeLink.textContent}`);

  if (window.innerWidth <= 760) {
    chapterScroller.scrollTo({
      left: Math.max(0, activeLink.offsetLeft - 16),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }
}

if ("IntersectionObserver" in window) {
  const chapterObserver = new IntersectionObserver((entries) => {
    const currentEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (currentEntry) updateChapter(currentEntry.target);
  }, {
    rootMargin: "-18% 0px -66%",
    threshold: [0, 0.15, 0.4]
  });

  chapterSections.forEach((section) => chapterObserver.observe(section));
}

chapterLinks.forEach((link) => {
  link.addEventListener("click", () => {
    updateChapter(document.querySelector(`#${link.dataset.chapterLink}`));
  });
});

renderStage(0);
syncPlayButton();
startTimer();
updateChapter(chapterSections[0]);
