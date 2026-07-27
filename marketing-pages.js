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
  const configuredEndpoint = (() => {
    const value = String(window.__KANBOARD_CONTACT_ENDPOINT__ || "").trim();
    if (!value) return "";
    try {
      const endpoint = new URL(value);
      return endpoint.protocol === "https:" ? endpoint.toString() : "";
    } catch {
      return "";
    }
  })();
  const privateField = contactForm.querySelector("[data-private-contact-field]");
  const emailField = contactForm.querySelector('[name="email"]');
  const submitButton = contactForm.querySelector("#contactSubmitButton");
  const formStatus = contactForm.querySelector("#contactFormStatus");
  const publicFallback = contactForm.querySelector("#publicContactFallback");
  const result = document.querySelector(".contact-result");
  const issueLink = document.querySelector("#submitProjectIssue");
  const copyButton = document.querySelector("#copySummary");

  if (configuredEndpoint) {
    privateField.hidden = false;
    emailField.required = true;
    submitButton.textContent = "安全提交咨询";
    document.querySelector("#contactIntroDescription").textContent = "咨询 Pro 计划、团队部署、产品演示或反馈使用问题。提交后，内容会通过已配置的私密接收端安全发送。";
    document.querySelector("#contactFormGuidance").textContent = "表单将通过 HTTPS 提交到已配置的私密接收端。请只填写完成咨询所需的信息，不要提交密码或访问令牌。";
    document.querySelector("#contactDestinationAnswer").textContent = "提交后，内容会通过 HTTPS 发送到站点配置的私密表单接收端，不会公开显示。";
    document.querySelector("#privateContactAnswer").textContent = "可以。当前页面已启用私密咨询接收端；提交失败时不会丢失表单内容，并会提供不含邮箱的公开降级路径。";
  }

  const fields = [...contactForm.querySelectorAll("input, select, textarea")]
    .filter((field) => field.name !== "_gotcha");
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  const createPublicSummary = (values) => [
    "Kanboard 产品咨询",
    `咨询主题：${values.topic}`,
    `称呼：${values.name}`,
    `GitHub 用户名：${values.github || "未填写"}`,
    `组织或项目：${values.organization || "未填写"}`,
    `预计使用人数：${values.teamSize}`,
    "希望解决的问题：",
    values.message
  ].join("\n");

  const createIssueUrl = (values, summary) => {
    const issueUrl = new URL("https://github.com/tangtongqing/kanboard-onboarding-optimization/issues/new");
    issueUrl.searchParams.set("title", `[产品咨询] ${values.topic}`);
    issueUrl.searchParams.set("body", summary);
    return issueUrl.toString();
  };

  const showPublicResult = (values, summary) => {
    document.querySelector("#contactSummary").textContent = summary;
    issueLink.href = createIssueUrl(values, summary);
    issueLink.hidden = false;
    copyButton.hidden = false;
    document.querySelector("#contactResultEyebrow").textContent = "咨询内容已整理";
    document.querySelector("#contactResultTitle").textContent = "下一步，确认并提交。";
    document.querySelector("#contactResultDescription").textContent = "点击“提交到项目 Issue”会打开本项目的公开接收渠道，并预填下面的内容。请在 GitHub 页面再次检查，确认不含敏感信息后再提交。";
    contactForm.hidden = true;
    result.hidden = false;
    document.querySelector("#contactResultTitle").focus();
  };

  const showPrivateSuccess = (summary) => {
    document.querySelector("#contactSummary").textContent = summary;
    issueLink.hidden = true;
    copyButton.hidden = false;
    document.querySelector("#contactResultEyebrow").textContent = "咨询已安全提交";
    document.querySelector("#contactResultTitle").textContent = "我们已经收到。";
    document.querySelector("#contactResultDescription").textContent = "私密接收端已经确认提交。下面的副本只保留在当前页面，方便你核对本次咨询内容。";
    contactForm.hidden = true;
    result.hidden = false;
    document.querySelector("#contactResultTitle").focus();
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    const values = Object.fromEntries(new FormData(contactForm).entries());
    const publicSummary = createPublicSummary(values);
    if (!configuredEndpoint) {
      showPublicResult(values, publicSummary);
      return;
    }

    if (values._gotcha) return;
    submitButton.disabled = true;
    submitButton.textContent = "正在安全提交…";
    formStatus.dataset.state = "";
    formStatus.textContent = "正在连接私密接收端，请稍候。";
    publicFallback.hidden = true;

    try {
      const response = await fetch(configuredEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "omit",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify({
          topic: values.topic,
          name: values.name,
          email: values.email,
          github: values.github || "",
          organization: values.organization || "",
          teamSize: values.teamSize,
          message: values.message,
          source: "kanboard-onboarding-contact",
          submittedAt: new Date().toISOString(),
          _gotcha: values._gotcha || ""
        })
      });
      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      formStatus.dataset.state = "success";
      formStatus.textContent = "提交成功。";
      const privateSummary = `${publicSummary}\n联系邮箱：${values.email}`;
      showPrivateSuccess(privateSummary);
    } catch (error) {
      console.error("Private contact submission failed:", error);
      formStatus.dataset.state = "error";
      formStatus.textContent = "私密提交失败，表单内容仍然保留。你可以稍后重试，或使用不包含邮箱和敏感信息的公开 Issue。";
      publicFallback.href = createIssueUrl(values, publicSummary);
      publicFallback.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = "重新安全提交";
    }
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
