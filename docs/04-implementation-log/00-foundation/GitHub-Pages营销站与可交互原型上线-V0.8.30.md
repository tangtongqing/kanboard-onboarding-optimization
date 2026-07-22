# GitHub Pages 营销站与可交互原型上线说明 V0.8.30

## 1. 上线结果

项目已从“只能本地打开的静态原型”升级为可公开访问的产品展示与体验站点。网站同时服务两类访问者：普通用户先理解产品价值并进入体验，面试官可以继续查看完整设计过程和验证证据。

| 页面 | 正式地址 | 主要对象 |
| --- | --- | --- |
| 营销首页 | https://tangtongqing.github.io/kanboard-onboarding-optimization/ | 潜在用户 |
| 产品体验 | https://tangtongqing.github.io/kanboard-onboarding-optimization/app.html | 希望直接操作产品的用户 |
| 价格计划 | https://tangtongqing.github.io/kanboard-onboarding-optimization/pricing.html | 评估方案与成本的用户 |
| 联系我们 | https://tangtongqing.github.io/kanboard-onboarding-optimization/contact.html | 产品咨询与团队部署意向用户 |
| 设计案例 | https://tangtongqing.github.io/kanboard-onboarding-optimization/landing.html | 面试官与作品集评审者 |

## 2. 页面与源码映射

仓库需要同时保留本地产品原型入口和线上营销首页，因此发布构建采用显式映射：

| 仓库源文件 | 线上文件 | 说明 |
| --- | --- | --- |
| `product.html` | `index.html` | 让站点根地址首先展示营销内容 |
| `index.html` | `app.html` | 保留完整可交互产品原型 |
| `pricing.html` | `pricing.html` | 独立价格计划页 |
| `contact.html` | `contact.html` | 独立联系页 |
| `landing.html` | `landing.html` | 独立作品集设计案例页 |

构建时会把营销页面中原本指向本地 `index.html` 的产品入口统一改写为 `app.html`，避免线上首页与产品原型发生路径冲突。

## 3. 自动发布机制

1. `scripts/build-pages.mjs` 清理并重新生成 `dist-pages/`。
2. 构建脚本复制页面运行所需的 HTML、CSS、JavaScript、视频与选定设计图。
3. `.github/workflows/deploy-pages.yml` 在 `main` 分支更新后执行构建。
4. GitHub Actions 上传 `dist-pages/` 并部署到 GitHub Pages。
5. `dist-pages/` 属于可重复生成的临时产物，已由 `.gitignore` 排除。

手动验证构建：

```powershell
node scripts/build-pages.mjs
```

核心产品回归：

```powershell
node tests/static-feature-audit-v08.js
```

## 4. 本轮验证

| 检查项 | 结果 |
| --- | --- |
| Pages 构建 | 成功生成 26 个发布文件 |
| JavaScript 语法 | 构建脚本、产品脚本与营销脚本检查通过 |
| 产品自动化回归 | `449 checks passed` |
| 本地完整路径 | 营销首页 → 产品体验 → 新建项目弹窗通过 |
| 浏览器控制台 | 本地发布包检查为 0 error / 0 warning |
| 云端发布 | GitHub Actions Pages 工作流成功完成 |
| 线上访问 | 标准 `github.io` HTTPS 地址已启用；营销首页已在真实浏览器加载验证 |

## 5. 域名处理记录

GitHub 个人 Pages 曾绑定已经失效的 `ttqmyh1217.me`，导致项目页继承无效域名并无法访问。2026-07-22 已经移除该绑定，个人主页与项目页均恢复使用标准 `tangtongqing.github.io` 域名，HTTPS 强制开启。

未来如需重新使用自定义域名，应先完成域名购买和 DNS 配置，再在 GitHub Pages 中绑定；不要先绑定一个尚未解析的域名。

## 6. 产品与运营边界

- 这是公开上线的静态交互演示，不是完整生产业务系统。
- 产品数据保存在浏览器 `localStorage`，没有账户体系、云端数据库或跨设备同步。
- 价格页用于表达产品方案，不包含真实支付。
- 联系页用于展示营销承接结构，不应把静态交互视为真实 CRM 线索入库。
- 当前上线可以支持作品集演示和产品体验，但不能证明真实用户转化、留存或商业结果。

## 7. 后续维护

- 页面或产品代码修改后，先运行构建和 449 项回归，再提交到 `main`。
- GitHub Pages 会在 `main` 更新后自动发布，无需手动上传 `dist-pages/`。
- 若线上部署失败，先查看仓库 Actions 中的 `Deploy GitHub Pages` 任务，再检查构建脚本引用的文件是否存在。
- 若需要下线，可在仓库 Pages 设置中停止发布；若需要回退，应回退对应代码提交并重新触发工作流。
