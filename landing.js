const board = document.querySelector("[data-board-stage]");
const playButton = document.querySelector("#stagePlay");
const stageTitle = document.querySelector("#stageTitle");
const stageButtons = [...document.querySelectorAll("[data-stage-button]")];

const stages = [
  "一个模糊目标",
  "生成可理解的结构",
  "用示例解释看板",
  "完成第一次有效操作"
];

let activeStage = 0;
let playing = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let boardVisible = true;
let timer = null;

function renderStage(nextStage) {
  activeStage = Number(nextStage);
  board.dataset.boardStage = String(activeStage);
  stageTitle.textContent = stages[activeStage];

  stageButtons.forEach((button, index) => {
    const isActive = index === activeStage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "step" : "false");
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
  }, 1800);
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

const boardObserver = new IntersectionObserver((entries) => {
  boardVisible = entries[0]?.isIntersecting ?? false;
  startTimer();
}, { threshold: 0.1 });

boardObserver.observe(board);

document.addEventListener("visibilitychange", startTimer);

renderStage(0);
syncPlayButton();
startTimer();
