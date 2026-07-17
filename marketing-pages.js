const planData = {
  free: {
    eyebrow: "体验版",
    name: "从第一张看板开始",
    monthly: "¥0",
    annual: "¥0",
    monthlySuffix: "永久免费",
    annualSuffix: "永久免费",
    description: "适合第一次使用看板管理个人学习、求职准备或轻量任务的人。",
    features: ["四种场景模板", "看板、列表、日历、甘特与概览视图", "浏览器本地保存", "无需注册，立即开始"],
    cta: "免费开始",
    href: "index.html"
  },
  pro: {
    eyebrow: "Pro · 方案预览",
    name: "让个人项目跨设备继续",
    monthly: "¥29",
    annual: "¥23",
    monthlySuffix: "每月",
    annualSuffix: "每月，按年支付",
    description: "适合同时推进多个项目，并希望获得云端同步、导出与更多模板的个人用户。",
    features: ["不限项目数量", "跨设备云端同步", "完整场景模板库", "CSV 与 JSON 导出", "访客只读分享", "邮件支持"],
    cta: "申请 Pro 内测",
    href: "contact.html"
  },
  team: {
    eyebrow: "团队 · 方案预览",
    name: "把共同进度放进一个空间",
    monthly: "¥59",
    annual: "¥47",
    monthlySuffix: "每人每月",
    annualSuffix: "每人每月，按年支付",
    description: "适合需要共享项目、角色权限、活动记录和部署支持的小团队。",
    features: ["共享团队空间", "角色与项目权限", "团队模板与默认流程", "活动记录和备份", "成员与访客管理", "部署咨询与上手培训"],
    cta: "联系团队顾问",
    href: "contact.html#deployment"
  }
};

let selectedPlan = "free";
let billingMode = "monthly";

function renderPlan() {
  const plan = planData[selectedPlan];
  if (!plan) return;

  const eyebrow = document.querySelector("#planEyebrow");
  const name = document.querySelector("#planName");
  const price = document.querySelector("#planPrice");
  const suffix = document.querySelector("#planSuffix");
  const description = document.querySelector("#planDescription");
  const features = document.querySelector("#planFeatures");
  const cta = document.querySelector("#planCta");
  if (!eyebrow || !name || !price || !suffix || !description || !features || !cta) return;

  eyebrow.textContent = plan.eyebrow;
  name.textContent = plan.name;
  price.textContent = plan[billingMode];
  suffix.textContent = plan[`${billingMode}Suffix`];
  description.textContent = plan.description;
  features.replaceChildren(...plan.features.map((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    return item;
  }));
  cta.textContent = plan.cta;
  cta.href = plan.href;
}

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedPlan = button.dataset.plan;
    document.querySelectorAll("[data-plan]").forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    renderPlan();
  });
});

document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    billingMode = button.dataset.billing;
    document.querySelectorAll("[data-billing]").forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    renderPlan();
  });
});

function validateField(field) {
  const error = field.parentElement.querySelector(".field-error");
  let message = "";
  if (field.validity.valueMissing) message = "请填写这一项。";
  else if (field.validity.typeMismatch) message = "请输入有效的邮箱地址。";
  else if (field.validity.tooShort) message = `请至少填写 ${field.minLength} 个字符。`;
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
  return !message;
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const fields = [...contactForm.querySelectorAll("input, select, textarea")];
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    const values = Object.fromEntries(new FormData(contactForm).entries());
    const summary = [
      "Kanboard 产品咨询",
      `咨询主题：${values.topic}`,
      `称呼：${values.name}`,
      `工作邮箱：${values.email}`,
      `组织或项目：${values.organization || "未填写"}`,
      `预计使用人数：${values.teamSize}`,
      "希望解决的问题：",
      values.message
    ].join("\n");

    document.querySelector("#contactSummary").textContent = summary;
    contactForm.hidden = true;
    const result = document.querySelector(".contact-result");
    result.hidden = false;
    result.querySelector("h2").focus?.();
  });
}

const copySummary = document.querySelector("#copySummary");
copySummary?.addEventListener("click", async () => {
  const summary = document.querySelector("#contactSummary")?.textContent || "";
  try {
    await navigator.clipboard.writeText(summary);
    copySummary.textContent = "已复制";
  } catch {
    copySummary.textContent = "请手动复制上方内容";
  }
});

document.querySelectorAll(".mobile-menu-panel a").forEach((link) => {
  link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
});

function setupPageMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("marketing-motion-ready");
  gsap.utils.toArray("[data-page-reveal]").forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });
}

renderPlan();
setupPageMotion();
