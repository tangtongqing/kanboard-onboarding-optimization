const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const fileUrl = (name) => pathToFileURL(path.join(ROOT, name)).href;

let passed = 0;

function check(condition, name) {
  if (!condition) throw new Error(name);
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

async function openLocalPage(browser, name, viewport = { width: 1280, height: 900 }) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(() => {
    window.__releaseAuditLayoutShift = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__releaseAuditLayoutShift += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await context.route(/^https?:/, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(fileUrl(name), { waitUntil: "domcontentloaded" });
  return { context, page, errors };
}

async function contrastRatio(page, selector, backgroundSelector) {
  return page.evaluate(({ selector, backgroundSelector }) => {
    const parse = (value) => {
      const match = value.match(/\d+(?:\.\d+)?/g);
      return match ? match.slice(0, 3).map(Number) : [0, 0, 0];
    };
    const luminance = (rgb) => {
      const values = rgb.map((value) => {
        const channel = value / 255;
        return channel <= 0.03928
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
    };
    const foreground = parse(getComputedStyle(document.querySelector(selector)).color);
    const background = parse(getComputedStyle(document.querySelector(backgroundSelector)).backgroundColor);
    const lighter = Math.max(luminance(foreground), luminance(background));
    const darker = Math.min(luminance(foreground), luminance(background));
    return (lighter + 0.05) / (darker + 0.05);
  }, { selector, backgroundSelector });
}

async function checkNoPageOverflow(page, name) {
  const sizes = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  check(
    sizes.scrollWidth <= sizes.clientWidth,
    `${name} has no page-level horizontal overflow (${sizes.scrollWidth}/${sizes.clientWidth})`
  );
}

async function testApp(browser) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  check(html.includes('name="description"'), "product app has a meta description");
  check(!html.includes("V0.8.24"), "product app no longer exposes stale V0.8.24 labels");

  const { context, page, errors } = await openLocalPage(
    browser,
    "index.html",
    { width: 390, height: 844 }
  );
  try {
    check(await page.locator('#viewSwitcher[role="group"]').count() === 1, "view switcher exposes a semantic button group");
    check(await page.locator('#viewSwitcher button[aria-pressed]').count() === 5, "view switcher exposes five pressed-state buttons");
    check(await page.locator('#viewSwitcher [aria-selected]').count() === 0, "view switcher does not use tab-only ARIA attributes");

    const mobileWidths = await page.evaluate(() => {
      const cardModeLabel = document.querySelector("#cardModeSelect").closest("label");
      const hideEmptyLabel = document.querySelector("#hideEmptyColumnsInput").closest("label");
      return {
        cardMode: cardModeLabel.getBoundingClientRect().width,
        hideEmpty: hideEmptyLabel.getBoundingClientRect().width
      };
    });
    check(mobileWidths.cardMode >= 280, `mobile card display control is usable (${mobileWidths.cardMode}px)`);
    check(mobileWidths.hideEmpty >= 280, `mobile empty-column control is usable (${mobileWidths.hideEmpty}px)`);

    const descriptionContrast = await contrastRatio(page, "#projectDescription", ".workspace");
    check(descriptionContrast >= 4.5, `project description contrast is ${descriptionContrast.toFixed(2)}:1`);
    const viewButtonContrast = await contrastRatio(page, '#viewSwitcher button:not(.active)', "#viewSwitcher");
    check(viewButtonContrast >= 4.5, `inactive view contrast is ${viewButtonContrast.toFixed(2)}:1`);
    await page.waitForFunction(() => document.querySelectorAll(".project-item").length > 0);
    const layoutShift = await page.evaluate(() => window.__releaseAuditLayoutShift);
    check(layoutShift <= 0.05, `mobile app layout shift is ${layoutShift.toFixed(3)}`);
    const projectListMinHeight = await page.locator(".project-list").evaluate((node) => {
      return Number.parseFloat(getComputedStyle(node).minHeight) || 0;
    });
    check(projectListMinHeight >= 40, `mobile project list reserves ${projectListMinHeight}px before rendering`);
    await checkNoPageOverflow(page, "product app");
    check(errors.length === 0, `product app has no page errors: ${errors.join("; ")}`);
  } finally {
    await context.close();
  }
}

async function testMarketingHome(browser) {
  const { context, page, errors } = await openLocalPage(
    browser,
    "product.html",
    { width: 390, height: 844 }
  );
  try {
    const fontLink = page.locator('link[href*="fonts.googleapis.com/css2"]').first();
    check(await fontLink.getAttribute("media") === "print", "marketing font stylesheet is non-render-blocking");
    check(await page.locator(".hero [data-reveal]").count() === 0, "hero content is not hidden behind reveal animation");
    check(await page.locator("#scenarioTitle").evaluate((node) => node.tagName) === "H2", "scenario title keeps valid heading order");

    const missingDimensions = await page.locator("img:not([width]), img:not([height])").count();
    check(missingDimensions === 0, "marketing images declare intrinsic dimensions");

    const tourContrast = await contrastRatio(page, ".tour-chapter p", "#tour");
    check(tourContrast >= 4.5, `tour copy contrast is ${tourContrast.toFixed(2)}:1`);
    await page.locator('[data-scenario="career"]').click();
    check(await page.locator("#scenarioTitle").textContent() === "求职准备项目", "scenario selector updates product content");
    check(await page.locator('[data-scenario="career"]').getAttribute("aria-pressed") === "true", "scenario selector updates pressed state");
    await page.locator(".mobile-menu summary").click();
    check(await page.locator(".mobile-menu").getAttribute("open") !== null, "mobile navigation opens");
    await checkNoPageOverflow(page, "marketing home");
    check(errors.length === 0, `marketing home has no page errors: ${errors.join("; ")}`);
  } finally {
    await context.close();
  }
}

async function testContact(browser) {
  const { context, page, errors } = await openLocalPage(
    browser,
    "contact.html",
    { width: 390, height: 844 }
  );
  try {
    await page.selectOption('[name="topic"]', { label: "产品演示" });
    await page.fill('[name="name"]', "发布验收");
    await page.fill('[name="github"]', "release-auditor");
    await page.fill('[name="organization"]', "Kanboard 项目");
    await page.fill('[name="message"]', "希望确认产品演示和移动端体验已经达到公开发布标准。");
    await page.locator(".contact-form").evaluate((form) => form.requestSubmit());

    const issueLink = page.locator("#submitProjectIssue");
    check(await issueLink.isVisible(), "contact result provides a visible project contact action");
    const issueHref = await issueLink.getAttribute("href");
    check(
      issueHref.startsWith("https://github.com/tangtongqing/kanboard-onboarding-optimization/issues/new?"),
      "contact action targets the product repository issue intake"
    );
    const parsed = new URL(issueHref);
    check(parsed.searchParams.get("body").includes("发布验收"), "contact action carries the generated consultation summary");
    check(!parsed.searchParams.get("body").includes("@"), "public contact payload does not expose an email address");
    check(await page.locator("[data-private-contact-field]").isHidden(), "private email field stays hidden without a secure endpoint");
    await checkNoPageOverflow(page, "contact page");
    check(errors.length === 0, `contact page has no page errors: ${errors.join("; ")}`);
  } finally {
    await context.close();
  }
}

async function testPrivateContact(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    window.__KANBOARD_CONTACT_ENDPOINT__ = "https://forms.example.test/contact";
  });
  await context.route(/^https?:/, (route) => route.abort());
  let submittedPayload = null;
  await context.route("https://forms.example.test/contact", async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });
  const page = await context.newPage();
  try {
    await page.goto(fileUrl("contact.html"), { waitUntil: "domcontentloaded" });
    check(await page.locator("[data-private-contact-field]").isVisible(), "private email field appears when a secure endpoint is configured");
    check(await page.locator('[name="email"]').getAttribute("required") !== null, "private email field becomes required");

    await page.selectOption('[name="topic"]', { label: "团队版与价格" });
    await page.fill('[name="name"]', "私密咨询验收");
    await page.fill('[name="email"]', "private@example.com");
    await page.fill('[name="organization"]', "示例团队");
    await page.fill('[name="message"]', "希望通过私密渠道讨论团队部署、迁移范围和服务安排。");
    await page.locator(".contact-form").evaluate((form) => form.requestSubmit());

    await page.locator(".contact-result:not([hidden])").waitFor();
    check(submittedPayload?.email === "private@example.com", "secure contact endpoint receives the private email");
    check(submittedPayload?.topic === "团队版与价格", "secure contact endpoint receives the consultation topic");
    check(await page.locator("#contactResultTitle").textContent() === "我们已经收到。", "private contact shows a confirmed success state");
    check(await page.locator("#submitProjectIssue").isHidden(), "private success does not expose a public issue action");
  } finally {
    await context.close();
  }
}

async function testPrivateContactFailure(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    window.__KANBOARD_CONTACT_ENDPOINT__ = "https://forms.example.test/contact";
  });
  await context.route(/^https?:/, (route) => route.abort());
  await context.route("https://forms.example.test/contact", (route) => {
    return route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false })
    });
  });
  const page = await context.newPage();
  try {
    await page.goto(fileUrl("contact.html"), { waitUntil: "domcontentloaded" });
    await page.selectOption('[name="topic"]', { label: "自托管部署" });
    await page.fill('[name="name"]', "失败降级验收");
    await page.fill('[name="email"]', "private@example.com");
    await page.fill('[name="message"]', "希望确认私密接收端异常时，原始表单和安全降级入口仍然可用。");
    await page.locator(".contact-form").evaluate((form) => form.requestSubmit());

    await page.locator("#publicContactFallback:not([hidden])").waitFor();
    check(await page.locator(".contact-form").isVisible(), "failed private submission preserves the form");
    check(await page.locator("#contactSubmitButton").isEnabled(), "failed private submission can be retried");
    const fallbackHref = await page.locator("#publicContactFallback").getAttribute("href");
    check(!new URL(fallbackHref).searchParams.get("body").includes("@"), "failure fallback excludes the private email");
  } finally {
    await context.close();
  }
}

function testContactBuildConfiguration() {
  const buildScript = fs.readFileSync(path.join(ROOT, "scripts", "build-pages.mjs"), "utf8");
  const workflow = fs.readFileSync(path.join(ROOT, ".github", "workflows", "deploy-pages.yml"), "utf8");
  check(buildScript.includes("KANBOARD_CONTACT_ENDPOINT"), "site build accepts a configurable contact endpoint");
  check(buildScript.includes('replaceAll("<", "\\\\u003c")'), "contact endpoint is escaped before inline script injection");
  check(workflow.includes("vars.KANBOARD_CONTACT_ENDPOINT"), "Pages workflow passes the contact endpoint repository variable");
}

async function testCaseStudy(browser) {
  const { context, page, errors } = await openLocalPage(
    browser,
    "landing.html",
    { width: 390, height: 844 }
  );
  try {
    const archiveHref = await page.locator("#designHandoffLink").getAttribute("href");
    check(
      archiveHref.includes("github.com/tangtongqing/kanboard-onboarding-optimization/tree/main/"),
      "case-study handoff points to the public repository archive"
    );
    check(await page.locator("header .wordmark").getAttribute("aria-label") === null, "header wordmark uses its visible accessible name");
    check(Boolean(await page.locator("footer .footer-wordmark").getAttribute("aria-label")), "mobile footer wordmark keeps an accessible name");

    const boundaryContrast = await contrastRatio(page, ".hero-boundary p", ".hero-boundary");
    check(boundaryContrast >= 4.5, `case-study evidence boundary contrast is ${boundaryContrast.toFixed(2)}:1`);
    check(await page.locator(".evidence-tag").count() >= 12, "case-study labels evidence levels beside conclusions");
    check(await page.locator("#research").count() === 1, "case-study exposes research and evidence section");
    check(await page.locator("#needs").count() === 1, "case-study exposes evidence-to-needs mapping");
    check(await page.locator("#scope").count() === 1, "case-study exposes explicit product scope");
    check(await page.locator("#outcome").count() === 1, "case-study separates proved and unproved outcomes");
    check(
      (await page.locator(".hero-boundary").textContent()).includes("不是招募式真人访谈"),
      "case-study states the non-interview research boundary near the hero"
    );
    await page.locator('[data-stage-button="3"]').click();
    check(await page.locator("#stageTitle").textContent() === "完成第一次有效操作", "case-study stage control updates the demonstration");
    await checkNoPageOverflow(page, "case-study page");
    check(errors.length === 0, `case-study page has no page errors: ${errors.join("; ")}`);
  } finally {
    await context.close();
  }
}

async function testPricing(browser) {
  const { context, page, errors } = await openLocalPage(
    browser,
    "pricing.html",
    { width: 390, height: 844 }
  );
  try {
    await page.locator('[data-plan="pro"]').click();
    await page.locator('[data-billing="annual"]').click();
    check(await page.locator("#planPrice").textContent() === "¥23", "annual Pro price updates correctly");
    check(await page.locator("#planSuffix").textContent() === "每月，按年支付", "annual billing suffix updates correctly");
    check((await page.locator("#planCta").getAttribute("href")).includes("contact.html"), "paid-plan CTA routes to contact intake");
    await checkNoPageOverflow(page, "pricing page");
    check(errors.length === 0, `pricing page has no page errors: ${errors.join("; ")}`);
  } finally {
    await context.close();
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    await testApp(browser);
    await testMarketingHome(browser);
    await testPricing(browser);
    await testContact(browser);
    await testPrivateContact(browser);
    await testPrivateContactFailure(browser);
    await testCaseStudy(browser);
    testContactBuildConfiguration();
    console.log(`\n${passed} release checks passed.`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
