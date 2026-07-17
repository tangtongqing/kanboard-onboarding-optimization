const scenarios = {
  learning: {
    tag: "适合学生与产品学习者",
    title: "个人学习项目",
    description: "把课程、阅读和练习拆成一条能够持续推进的学习路径。",
    benefits: [
      "预置待学、学习中、已学完三列",
      "示例任务包含完成标准与常见误区",
      "用三个真实动作完成第一次上手"
    ],
    columns: [
      { title: "待学", cards: [{ title: "建立常用产品术语清单", meta: "基础知识 · 2h" }] },
      { title: "学习中", cards: [{ title: "整理第一章的知识点脑图", meta: "本周 · 3h" }] },
      { title: "已学完", cards: [{ title: "理解产品经理职责与能力模型", meta: "已完成" }] }
    ]
  },
  career: {
    tag: "适合正在准备面试的人",
    title: "求职准备项目",
    description: "把简历、作品集和面试练习放进一条看得见的准备流程。",
    benefits: [
      "按待准备、进行中、待反馈组织任务",
      "示例任务覆盖简历、案例与自我介绍",
      "清楚记录每项准备工作的完成标准"
    ],
    columns: [
      { title: "待准备", cards: [{ title: "把项目经历改写为 STAR 结构", meta: "简历 · 高优先级" }] },
      { title: "进行中", cards: [{ title: "整理 3 个作品集亮点故事", meta: "作品集 · 本周" }] },
      { title: "待反馈", cards: [{ title: "完成一次自我介绍录音", meta: "面试练习" }] }
    ]
  },
  team: {
    tag: "适合 2 至 5 人的小团队",
    title: "小团队迭代",
    description: "让一轮需求从收集、开发到发布验收都有清楚的负责人和状态。",
    benefits: [
      "预置需求池、开发中、待验收与已发布",
      "通过 WIP 限制避免同时启动太多任务",
      "适合产品、设计与开发一起跟进"
    ],
    columns: [
      { title: "需求池", cards: [{ title: "确认本轮迭代的用户问题", meta: "产品 · 待评审" }] },
      { title: "开发中", cards: [{ title: "实现项目模板选择入口", meta: "开发 · WIP 2/3" }] },
      { title: "待验收", cards: [{ title: "回归创建与首次操作流程", meta: "测试 · 今天" }] }
    ]
  },
  bugs: {
    tag: "适合个人开发者与轻量团队",
    title: "Bug 跟踪",
    description: "从稳定复现到修复验证，让每个问题都有完整的处理路径。",
    benefits: [
      "把复现、修复、验证和关闭分开管理",
      "示例卡提示复现步骤与验收标准",
      "优先级、负责人和截止时间一目了然"
    ],
    columns: [
      { title: "待复现", cards: [{ title: "登录按钮触发未捕获异常", meta: "高优先级 · 待复现" }] },
      { title: "修复中", cards: [{ title: "修正 app.js 空指针调用", meta: "开发 · 进行中" }] },
      { title: "待验证", cards: [{ title: "在 390px 下回归登录流程", meta: "测试 · 移动端" }] }
    ]
  }
};

const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const scenarioTag = document.querySelector("#scenarioTag");
const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioDescription = document.querySelector("#scenarioDescription");
const scenarioBenefits = document.querySelector("#scenarioBenefits");
const scenarioBoardTitle = document.querySelector("#scenarioBoardTitle");
const scenarioBoardMeta = document.querySelector("#scenarioBoardMeta");
const scenarioColumns = document.querySelector("#scenarioColumns");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderScenario(key) {
  const scenario = scenarios[key];
  if (!scenario) return;

  scenarioButtons.forEach((button) => {
    const active = button.dataset.scenario === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  scenarioTag.textContent = scenario.tag;
  scenarioTitle.textContent = scenario.title;
  scenarioDescription.textContent = scenario.description;
  scenarioBoardTitle.textContent = scenario.title;
  scenarioBoardMeta.textContent = `${scenario.columns.length} 列 · ${scenario.columns.reduce((total, column) => total + column.cards.length, 0)} 个示例任务`;

  scenarioBenefits.replaceChildren(...scenario.benefits.map((benefit) => {
    const item = document.createElement("li");
    item.textContent = benefit;
    return item;
  }));

  scenarioColumns.replaceChildren(...scenario.columns.map((column) => {
    const columnElement = document.createElement("section");
    columnElement.className = "scenario-column";

    const heading = document.createElement("div");
    heading.className = "scenario-column-head";
    const title = document.createElement("strong");
    title.textContent = column.title;
    const count = document.createElement("span");
    count.textContent = `${column.cards.length} 项`;
    heading.append(title, count);

    columnElement.append(heading, ...column.cards.map((card) => {
      const cardElement = document.createElement("article");
      cardElement.className = "scenario-card";
      const cardTitle = document.createElement("strong");
      cardTitle.textContent = card.title;
      const meta = document.createElement("span");
      meta.textContent = card.meta;
      cardElement.append(cardTitle, meta);
      return cardElement;
    }));

    return columnElement;
  }));
}

scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => renderScenario(button.dataset.scenario));
});

document.querySelectorAll("[data-scenario-link]").forEach((link) => {
  link.addEventListener("click", () => {
    renderScenario(link.dataset.scenarioLink);
  });
});

document.querySelectorAll('a[href^="#faq-"]').forEach((link) => {
  link.addEventListener("click", () => {
    const answer = document.querySelector(link.getAttribute("href"));
    if (answer instanceof HTMLDetailsElement) answer.open = true;
  });
});

const navLinks = [...document.querySelectorAll("[data-nav-section]")];
const observedSections = navLinks
  .map((link) => document.querySelector(`#${link.dataset.navSection}`))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach((link) => {
      const current = link.dataset.navSection === visibleSection.target.id;
      link.classList.toggle("current", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.6] });

  observedSections.forEach((section) => navigationObserver.observe(section));
}

document.querySelectorAll(".mobile-menu-panel a").forEach((link) => {
  link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
});

function syncHashState() {
  const scenarioKey = window.location.hash.replace("#scenario-", "");
  if (window.location.hash.startsWith("#scenario-") && scenarios[scenarioKey]) {
    renderScenario(scenarioKey);
  }

  const hashTarget = document.querySelector(window.location.hash || "#top");
  if (hashTarget instanceof HTMLDetailsElement) hashTarget.open = true;
}

renderScenario("learning");
syncHashState();
window.addEventListener("hashchange", syncHashState);

function setupProductTour() {
  const video = document.querySelector("#productTour");
  const toggle = document.querySelector(".tour-toggle");
  if (!video || !toggle) return;

  const icon = toggle.querySelector(".tour-toggle-icon");
  const label = toggle.querySelector(".tour-toggle-label");

  function updateTourState() {
    const playing = !video.paused;
    toggle.setAttribute("aria-pressed", String(playing));
    icon.textContent = playing ? "Ⅱ" : "▶";
    label.textContent = playing ? "暂停演示" : "播放演示";
  }

  toggle.addEventListener("click", async () => {
    if (video.paused) {
      try {
        await video.play();
      } catch {
        return;
      }
    } else {
      video.pause();
    }
    updateTourState();
  });

  video.addEventListener("play", updateTourState);
  video.addEventListener("pause", updateTourState);
  updateTourState();

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.55 && video.paused) {
          try {
            await video.play();
          } catch {
            return;
          }
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    }, { threshold: [0, 0.55] });
    videoObserver.observe(video);
  }
}

function setupMotion() {
  if (reducedMotion.matches || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("motion-ready");

  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      }
    });
  });

  const motionCopy = document.querySelector(".motion-copy");
  if (motionCopy) {
    const characters = Array.from(motionCopy.textContent);
    motionCopy.replaceChildren(...characters.map((character) => {
      const span = document.createElement("span");
      span.className = "motion-word";
      span.textContent = character === " " ? "\u00a0" : character;
      return span;
    }));

    const characterSpans = motionCopy.querySelectorAll(".motion-word");
    gsap.set(characterSpans, { opacity: 0.14 });
    gsap.to(characterSpans, {
      opacity: 1,
      stagger: 0.025,
      scrollTrigger: {
        trigger: motionCopy,
        start: "top 78%",
        end: "bottom 45%",
        scrub: true
      }
    });
  }

  const chapters = gsap.utils.toArray(".tour-chapter");
  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: ({ isActive }) => chapter.classList.toggle("is-active", isActive)
    });
  });

  ScrollTrigger.matchMedia({
    "(min-width: 1101px)": () => {
      ScrollTrigger.create({
        trigger: ".tour-layout",
        start: "top 16%",
        end: "bottom 72%",
        pin: ".tour-media",
        pinSpacing: false
      });

      gsap.to(".hero-product img", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-product",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6
        }
      });
    }
  });
}

setupProductTour();
setupMotion();
