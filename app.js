const STORAGE_KEY = "kanboard-static-v0822";
const DEFAULT_PLUGIN_CATALOG = [
  {
    id: "github-auth",
    name: "Github Authentication",
    version: "1.0.1",
    latestVersion: "1.0.1",
    author: "Kanboard Community",
    description: "使用 GitHub 账号登录 Kanboard 的认证插件。",
    status: "available"
  },
  {
    id: "budget",
    name: "Budget Planning",
    version: "1.3.0",
    latestVersion: "1.4.0",
    author: "Kanboard Community",
    description: "为项目补充预算和成本跟踪能力。",
    status: "installed"
  },
  {
    id: "calendar-plus",
    name: "Calendar Plus",
    version: "0.9.0",
    latestVersion: "0.9.0",
    author: "Kanboard Community",
    description: "扩展日历视图与外部日历同步字段。",
    status: "available"
  }
];
const APP_ROLES = [
  { value: "app-admin", label: "管理员" },
  { value: "app-manager", label: "经理" },
  { value: "app-user", label: "用户" }
];
const USER_TYPES = [
  { value: "local", label: "本地用户" },
  { value: "remote", label: "远程用户" }
];
const CLI_COMMANDS = [
  { value: "cronjob", label: "cronjob", preview: "./cli cronjob" },
  { value: "notification:overdue-tasks", label: "notification:overdue-tasks", preview: "./cli notification:overdue-tasks --group --show" },
  { value: "projects:daily-stats", label: "projects:daily-stats", preview: "./cli projects:daily-stats" },
  { value: "trigger:tasks", label: "trigger:tasks", preview: "./cli trigger:tasks" },
  { value: "worker", label: "worker", preview: "./cli worker" },
  { value: "job", label: "job", preview: "echo 'RAW_JOB_DATA' | ./cli job" },
  { value: "db:migrate", label: "db:migrate", preview: "./cli db:migrate" },
  { value: "db:version", label: "db:version", preview: "./cli db:version" },
  { value: "plugin:upgrade", label: "plugin:upgrade", preview: "./cli plugin:upgrade" },
  { value: "user:reset-2fa", label: "user:reset-2fa", preview: "./cli user:reset-2fa my_user" }
];
const CORE_PHP_EXTENSIONS = ["gd", "mbstring", "openssl", "json", "hash", "ctype", "session", "filter", "xml", "SimpleXML", "dom"];
const DRIVER_EXTENSION_MAP = {
  sqlite: "pdo_sqlite",
  mysql: "pdo_mysql",
  postgres: "pdo_pgsql"
};
const OPTIONAL_PHP_EXTENSIONS = ["zip", "ldap", "curl"];
const DB_DRIVER_OPTIONS = [
  { value: "sqlite", label: "SQLite" },
  { value: "mysql", label: "MySQL / MariaDB" },
  { value: "postgres", label: "PostgreSQL" }
];
const DEPLOYMENT_METHODS = [
  { value: "archive", label: "Archive" },
  { value: "git", label: "Git" },
  { value: "docker", label: "Docker" }
];
const DOCKER_REGISTRIES = [
  "docker.io/kanboard/kanboard",
  "ghcr.io/kanboard/kanboard",
  "quay.io/kanboard/kanboard"
];
const DEPLOYMENT_WEB_SERVERS = ["apache", "nginx", "iis", "caddy"];
const PROJECT_TEMPLATES = [
  {
    id: "learning",
    name: "个人学习项目",
    description: "适合从 0 开始学习产品经理能力，把认知、调研、PRD、原型、协作和作品集训练拆成可推进任务。",
    columns: [
      { key: "plan", title: "待规划", wipLimit: 0 },
      { key: "learn", title: "资料学习", wipLimit: 4 },
      { key: "case", title: "案例拆解", wipLimit: 3 },
      { key: "practice", title: "实操产出", wipLimit: 3 },
      { key: "review", title: "复盘完善", wipLimit: 2 },
      { key: "mastered", title: "已掌握", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "foundation", title: "产品认知", description: "角色、术语和基础产品思维" },
      { key: "research", title: "用户研究", description: "访谈、画像、旅程和真实场景" },
      { key: "analysis", title: "需求分析", description: "需求池、优先级、MVP 和竞品判断" },
      { key: "solution", title: "方案表达", description: "PRD、原型、流程、指标和评审材料" },
      { key: "delivery", title: "协作交付", description: "研发沟通、测试验收、上线发布和风险处理" },
      { key: "growth", title: "数据增长", description: "埋点、运营反馈、复盘和下一轮迭代" },
      { key: "portfolio", title: "作品集求职", description: "项目故事线、面试表达和长期成长记录" }
    ],
    cards: [
      {
        column: "mastered",
        swimlane: "foundation",
        title: "理解产品经理职责与能力模型",
        description: "搞清楚产品经理不是画原型的人，而是发现问题、定义方案、推动落地的人。",
        assignee: "我",
        category: "产品认知",
        priority: "中",
        color: "blue",
        tags: ["入门", "能力模型"],
        estimate: "1.5",
        subtasks: [
          { title: "梳理 PM 日常工作内容", done: true },
          { title: "列出自己当前短板", done: true },
          { title: "确定 4 周学习节奏", done: true }
        ]
      },
      {
        column: "mastered",
        swimlane: "foundation",
        title: "建立产品术语清单",
        description: "把需求池、PRD、MVP、用户旅程、验收标准、埋点等高频概念整理成自己的语言。",
        assignee: "我",
        category: "基础知识",
        priority: "中",
        color: "gray",
        tags: ["术语", "基础"],
        estimate: "1",
        subtasks: [
          { title: "整理 20 个产品术语", done: true },
          { title: "为每个术语写一句解释", done: true }
        ]
      },
      {
        column: "case",
        swimlane: "research",
        title: "拆解 Kanboard 的核心用户路径",
        description: "从新建项目到创建任务、拖动卡片，画出用户第一次使用 Kanboard 的完整路径。",
        assignee: "我",
        category: "产品体验",
        priority: "高",
        color: "green",
        tags: ["体验拆解", "Kanboard"],
        estimate: "2",
        subtasks: [
          { title: "记录关键页面", done: true },
          { title: "标出新手卡点", done: false },
          { title: "输出路径图", done: false }
        ]
      },
      {
        column: "practice",
        swimlane: "research",
        title: "完成一次用户访谈练习",
        description: "围绕“新手如何拆任务”访谈 1-2 个同学或朋友，练习从回答里提炼真实问题。",
        assignee: "我",
        category: "用户研究",
        priority: "高",
        color: "amber",
        tags: ["访谈", "用户研究"],
        estimate: "3",
        subtasks: [
          { title: "准备访谈提纲", done: true },
          { title: "完成访谈记录", done: false },
          { title: "提炼 3 个痛点", done: false }
        ]
      },
      {
        column: "practice",
        swimlane: "analysis",
        title: "整理需求池并做优先级排序",
        description: "把调研、竞品和自己的体验问题统一放入需求池，再用影响范围和实现成本排序。",
        assignee: "我",
        category: "需求分析",
        priority: "高",
        color: "rose",
        tags: ["需求池", "优先级"],
        estimate: "2",
        subtasks: [
          { title: "合并重复需求", done: false },
          { title: "标注 P0/P1/P2", done: false },
          { title: "说明排序理由", done: false }
        ]
      },
      {
        column: "practice",
        swimlane: "solution",
        title: "写出第一版 PRD 框架",
        description: "用背景、目标、用户场景、功能范围、流程、验收标准组织一份可讨论的产品文档。",
        assignee: "我",
        category: "PRD",
        priority: "高",
        color: "blue",
        tags: ["PRD", "产品文档"],
        estimate: "4",
        subtasks: [
          { title: "写清楚问题背景", done: true },
          { title: "列出 P0 功能范围", done: false },
          { title: "补充验收标准", done: false }
        ]
      },
      {
        column: "practice",
        swimlane: "solution",
        title: "绘制低保真原型与页面流程",
        description: "先用静态页面或 Figma 低保真表达关键路径，再进入高保真视觉细化。",
        assignee: "我",
        category: "原型",
        priority: "中",
        color: "green",
        tags: ["原型", "流程"],
        estimate: "3",
        subtasks: [
          { title: "画出首页状态", done: false },
          { title: "画出新建项目路径", done: false },
          { title: "标注关键交互", done: false }
        ]
      },
      {
        column: "learn",
        swimlane: "growth",
        title: "设计数据指标与埋点问题",
        description: "练习从目标反推指标，例如创建完成率、模板使用率、任务创建数和次日回访。",
        assignee: "我",
        category: "数据分析",
        priority: "中",
        color: "amber",
        tags: ["指标", "埋点"],
        estimate: "2",
        subtasks: [
          { title: "定义北极星指标", done: false },
          { title: "列出 5 个过程指标", done: false },
          { title: "说明每个指标的用途", done: false }
        ]
      },
      {
        column: "plan",
        swimlane: "delivery",
        title: "模拟一次研发评审与排期沟通",
        description: "把需求讲给开发视角的人听，练习解释价值、边界、依赖和取舍。",
        assignee: "我",
        category: "项目协作",
        priority: "中",
        color: "rose",
        tags: ["评审", "沟通"],
        estimate: "2",
        subtasks: [
          { title: "准备评审材料", done: false },
          { title: "列出可能被问到的问题", done: false },
          { title: "记录评审修改点", done: false }
        ]
      },
      {
        column: "plan",
        swimlane: "delivery",
        title: "编写测试验收清单",
        description: "把功能是否完成转成可检查的验收项，练习从 PM 视角保障交付质量。",
        assignee: "我",
        category: "测试验收",
        priority: "中",
        color: "blue",
        tags: ["验收", "测试"],
        estimate: "1.5",
        subtasks: [
          { title: "写出核心流程验收项", done: false },
          { title: "补充异常状态", done: false },
          { title: "确认移动端可用性", done: false }
        ]
      },
      {
        column: "review",
        swimlane: "growth",
        title: "复盘上线运营和用户反馈",
        description: "练习用上线结果反推下一轮需求，而不是把发布当成项目终点。",
        assignee: "我",
        category: "复盘",
        priority: "中",
        color: "gray",
        tags: ["上线", "复盘"],
        estimate: "2",
        subtasks: [
          { title: "记录上线目标", done: false },
          { title: "收集反馈问题", done: false },
          { title: "拆出下一轮优化点", done: false }
        ]
      },
      {
        column: "plan",
        swimlane: "portfolio",
        title: "整理产品作品集故事线",
        description: "把这个 Kanboard 实战项目整理成作品集表达：问题、洞察、方案、验证和迭代。",
        assignee: "我",
        category: "作品集",
        priority: "高",
        color: "green",
        tags: ["作品集", "求职"],
        estimate: "4",
        subtasks: [
          { title: "整理项目背景", done: false },
          { title: "截图关键版本", done: false },
          { title: "写出项目复盘", done: false }
        ]
      },
      {
        column: "learn",
        swimlane: "foundation",
        title: "学习经典产品方法论",
        description: "理解用户价值、业务价值、MVP、北极星指标、AARRR 和增长漏斗等常用方法。",
        assignee: "我",
        category: "方法论",
        priority: "中",
        color: "amber",
        tags: ["方法论", "PM"],
        estimate: "2",
        subtasks: [
          { title: "整理 5 个常用模型", done: false },
          { title: "给每个模型配一个例子", done: false }
        ]
      },
      {
        column: "case",
        swimlane: "research",
        title: "绘制用户画像与用户旅程",
        description: "把访谈和观察结果沉淀成用户画像，再画出用户从触发到完成任务的路径。",
        assignee: "我",
        category: "用户研究",
        priority: "中",
        color: "blue",
        tags: ["画像", "旅程"],
        estimate: "2",
        subtasks: [
          { title: "定义目标用户", done: false },
          { title: "画出用户旅程阶段", done: false }
        ]
      },
      {
        column: "case",
        swimlane: "analysis",
        title: "完成竞品分析报告",
        description: "选择 3 个同类产品，对比核心路径、信息架构、优势缺口和可借鉴点。",
        assignee: "我",
        category: "竞品分析",
        priority: "高",
        color: "gray",
        tags: ["竞品", "分析"],
        estimate: "3",
        subtasks: [
          { title: "选择竞品对象", done: false },
          { title: "截图关键路径", done: false },
          { title: "输出对比结论", done: false }
        ]
      },
      {
        column: "learn",
        swimlane: "analysis",
        title: "练习定义 MVP 与不做范围",
        description: "把需求拆成必须做、可以后置、明确不做三类，训练产品边界感。",
        assignee: "我",
        category: "MVP",
        priority: "高",
        color: "rose",
        tags: ["MVP", "范围"],
        estimate: "1.5",
        subtasks: [
          { title: "列出 P0 功能", done: false },
          { title: "说明暂不做原因", done: false }
        ]
      },
      {
        column: "practice",
        swimlane: "delivery",
        title: "制定上线检查与风险预案",
        description: "练习从发布窗口、灰度范围、回滚方案、客服话术和监控指标检查上线准备。",
        assignee: "我",
        category: "上线",
        priority: "中",
        color: "green",
        tags: ["上线", "风险"],
        estimate: "2",
        subtasks: [
          { title: "列出上线前检查项", done: false },
          { title: "准备回滚方案", done: false }
        ]
      },
      {
        column: "review",
        swimlane: "portfolio",
        title: "每周复盘学习产出",
        description: "每周检查完成了哪些卡片、产出了哪些文档、哪些能力还停留在理解层。",
        assignee: "我",
        category: "复盘",
        priority: "中",
        color: "blue",
        tags: ["周复盘", "成长"],
        estimate: "1",
        subtasks: [
          { title: "回顾本周完成任务", done: false },
          { title: "补齐作品集素材", done: false }
        ]
      },
      {
        column: "plan",
        swimlane: "portfolio",
        title: "准备产品经理面试表达",
        description: "把项目经历整理成背景、问题、行动、结果和复盘，练习清楚讲出自己的产品判断。",
        assignee: "我",
        category: "面试",
        priority: "中",
        color: "amber",
        tags: ["面试", "表达"],
        estimate: "2",
        subtasks: [
          { title: "整理 3 个项目问题", done: false },
          { title: "准备自我介绍", done: false }
        ]
      }
    ]
  },
  {
    id: "job",
    name: "求职准备项目",
    description: "适合 PM 实习/校招，把简历、作品集、投递和面试推进放到同一张看板里。",
    columns: [
      { key: "todo", title: "待准备", wipLimit: 0 },
      { key: "doing", title: "进行中", wipLimit: 3 },
      { key: "sent", title: "已投递", wipLimit: 0 },
      { key: "interview", title: "面试中", wipLimit: 0 },
      { key: "done", title: "已完成", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "materials", title: "材料准备", description: "简历、作品集和自我介绍" },
      { key: "applications", title: "投递跟进", description: "岗位投递和面试状态" }
    ],
    cards: [
      {
        column: "todo",
        swimlane: "materials",
        title: "完善产品经理实习简历",
        description: "突出 Kanboard 优化项目中的调研、原型和可运行 Demo。",
        assignee: "我",
        category: "简历",
        priority: "高",
        color: "blue",
        tags: ["简历"],
        estimate: "2",
        subtasks: [
          { title: "补充项目背景", done: false },
          { title: "量化产出结果", done: false }
        ]
      },
      {
        column: "doing",
        swimlane: "materials",
        title: "整理 3 个作品集项目",
        description: "每个项目保留问题、方案、过程、结果四段表达。",
        assignee: "我",
        category: "作品集",
        priority: "高",
        color: "green",
        tags: ["作品集"],
        estimate: "4"
      },
      {
        column: "sent",
        swimlane: "applications",
        title: "投递 5 个目标岗位",
        description: "记录公司、岗位、JD 关键词和下一步动作。",
        assignee: "我",
        category: "投递",
        priority: "中",
        color: "amber",
        tags: ["投递"],
        estimate: "1"
      }
    ]
  },
  {
    id: "sprint",
    name: "小团队迭代",
    description: "适合 2-5 人小团队管理一轮需求，从需求池推进到发布验收。",
    columns: [
      { key: "backlog", title: "需求池", wipLimit: 0 },
      { key: "design", title: "设计中", wipLimit: 2 },
      { key: "dev", title: "开发中", wipLimit: 3 },
      { key: "test", title: "测试中", wipLimit: 2 },
      { key: "done", title: "已发布", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "product", title: "产品与设计", description: "需求、交互和验收标准" },
      { key: "engineering", title: "研发与测试", description: "实现、联调和发布" }
    ],
    cards: [
      {
        column: "backlog",
        swimlane: "product",
        title: "定义新手创建向导 P0 范围",
        description: "明确本轮只做模板选择、预览和生成项目。",
        assignee: "PM",
        category: "需求",
        priority: "高",
        color: "blue",
        tags: ["P0"],
        estimate: "2"
      },
      {
        column: "design",
        swimlane: "product",
        title: "绘制创建向导低保真流程",
        description: "空白项目 / 从模板开始 / 模板预览 / 创建完成。",
        assignee: "设计",
        category: "原型",
        priority: "中",
        color: "green",
        tags: ["流程"],
        estimate: "3"
      },
      {
        column: "dev",
        swimlane: "engineering",
        title: "实现模板生成逻辑",
        description: "从模板数据生成列、泳道和示例任务卡。",
        assignee: "开发",
        category: "实现",
        priority: "高",
        color: "rose",
        tags: ["前端"],
        estimate: "4"
      }
    ]
  },
  {
    id: "bug",
    name: "Bug 跟踪",
    description: "适合个人开发者或小团队跟踪问题、修复、验证和关闭。",
    columns: [
      { key: "reported", title: "已报告", wipLimit: 0 },
      { key: "triage", title: "待确认", wipLimit: 0 },
      { key: "fixing", title: "修复中", wipLimit: 3 },
      { key: "verify", title: "待验证", wipLimit: 0 },
      { key: "closed", title: "已关闭", wipLimit: 0 }
    ],
    swimlanes: [
      { key: "frontend", title: "前端问题", description: "页面、交互和样式问题" },
      { key: "data", title: "数据问题", description: "保存、状态和字段问题" }
    ],
    cards: [
      {
        column: "reported",
        swimlane: "frontend",
        title: "拖拽后卡片状态未及时刷新",
        description: "复现步骤：拖动任务到另一个列后，指标数字需要立即更新。",
        assignee: "开发",
        category: "交互",
        priority: "高",
        color: "rose",
        tags: ["Bug"],
        estimate: "1"
      },
      {
        column: "triage",
        swimlane: "data",
        title: "刷新后评论是否正确保存",
        description: "验证 localStorage 中评论、子任务、活动记录是否完整保存。",
        assignee: "测试",
        category: "数据",
        priority: "中",
        color: "amber",
        tags: ["验证"],
        estimate: "1.5"
      },
      {
        column: "verify",
        swimlane: "frontend",
        title: "小屏下模板选择区域是否可用",
        description: "验证移动端模板列表和预览是否纵向排列。",
        assignee: "设计",
        category: "响应式",
        priority: "中",
        color: "gray",
        tags: ["UI"],
        estimate: "1"
      }
    ]
  }
];

const DEFAULT_PHASE_PLAN_DAYS = {
  intake: 2,
  clarify: 3,
  solution: 2,
  prd: 3,
  review: 2,
  planning: 2,
  dev: 5,
  qa: 3,
  launch: 1,
  operate: 3,
  iterate: 2,
  plan: 2,
  learn: 3,
  case: 3,
  practice: 4,
  mastered: 0,
  todo: 2,
  doing: 3,
  done: 0
};

const DEMO_CARD_SCHEDULES = {
  intake: { plannedStart: "2026-05-20", plannedEnd: "2026-05-21", actualStart: "2026-05-20", actualEnd: "2026-05-22" },
  clarify: { plannedStart: "2026-05-22", plannedEnd: "2026-05-24", actualStart: "2026-05-23", actualEnd: "2026-05-26" },
  solution: { plannedStart: "2026-05-25", plannedEnd: "2026-05-26", actualStart: "2026-05-27", actualEnd: "2026-05-28" },
  prd: { plannedStart: "2026-05-27", plannedEnd: "2026-05-29", actualStart: "2026-05-29", actualEnd: "2026-05-31" },
  review: { plannedStart: "2026-05-30", plannedEnd: "2026-05-31", actualStart: "2026-06-01", actualEnd: "2026-06-02" },
  planning: { plannedStart: "2026-06-01", plannedEnd: "2026-06-02", actualStart: "2026-06-02", actualEnd: "" },
  dev: { plannedStart: "2026-06-03", plannedEnd: "2026-06-07", actualStart: "2026-06-03", actualEnd: "" },
  qa: { plannedStart: "2026-06-08", plannedEnd: "2026-06-10", actualStart: "", actualEnd: "" },
  launch: { plannedStart: "2026-06-11", plannedEnd: "2026-06-11", actualStart: "", actualEnd: "" },
  operate: { plannedStart: "2026-06-12", plannedEnd: "2026-06-14", actualStart: "", actualEnd: "" },
  iterate: { plannedStart: "2026-06-15", plannedEnd: "2026-06-16", actualStart: "", actualEnd: "" }
};

let state = loadState();
let editingProjectId = null;
let editingColumnId = null;
let editingSwimlaneId = null;
let editingCard = null;
let draggedCard = null;
let draftSubtasks = [];
let draftComments = [];
let draftActivity = [];
let draftLinks = [];
let draftTimeLogs = [];
let draftAttachments = [];
let draftProjectSettings = null;
let shortcutPrefix = "";
let shortcutPrefixTimer = null;
let selectedTemplateId = PROJECT_TEMPLATES[0].id;
let draftImportProject = null;

const els = {
  projectList: document.querySelector("#projectList"),
  projectTitle: document.querySelector("#projectTitle"),
  projectDescription: document.querySelector("#projectDescription"),
  board: document.querySelector("#board"),
  metricCards: document.querySelector("#metricCards"),
  metricDoing: document.querySelector("#metricDoing"),
  metricDue: document.querySelector("#metricDue"),
  metricDone: document.querySelector("#metricDone"),
  analyticsDialog: document.querySelector("#analyticsDialog"),
  analyticsSummary: document.querySelector("#analyticsSummary"),
  analyticsTimelineSummary: document.querySelector("#analyticsTimelineSummary"),
  analyticsPhaseTimeline: document.querySelector("#analyticsPhaseTimeline"),
  analyticsRiskList: document.querySelector("#analyticsRiskList"),
  analyticsColumnBreakdown: document.querySelector("#analyticsColumnBreakdown"),
  analyticsTimeBreakdown: document.querySelector("#analyticsTimeBreakdown"),
  analyticsCycleList: document.querySelector("#analyticsCycleList"),
  automationDialog: document.querySelector("#automationDialog"),
  automationForm: document.querySelector("#automationForm"),
  automationTriggerInput: document.querySelector("#automationTriggerInput"),
  automationActionInput: document.querySelector("#automationActionInput"),
  automationTargetInput: document.querySelector("#automationTargetInput"),
  addAutomationBtn: document.querySelector("#addAutomationBtn"),
  runAutomationBtn: document.querySelector("#runAutomationBtn"),
  automationList: document.querySelector("#automationList"),
  activityDialog: document.querySelector("#activityDialog"),
  activitySummary: document.querySelector("#activitySummary"),
  projectActivityList: document.querySelector("#projectActivityList"),
  shortcutsDialog: document.querySelector("#shortcutsDialog"),
  notificationsDialog: document.querySelector("#notificationsDialog"),
  markNotificationsBtn: document.querySelector("#markNotificationsBtn"),
  notificationList: document.querySelector("#notificationList"),
  subscriptionsDialog: document.querySelector("#subscriptionsDialog"),
  subscriptionSummary: document.querySelector("#subscriptionSummary"),
  icalFeedInput: document.querySelector("#icalFeedInput"),
  rssFeedInput: document.querySelector("#rssFeedInput"),
  copyIcalBtn: document.querySelector("#copyIcalBtn"),
  copyRssBtn: document.querySelector("#copyRssBtn"),
  subscriptionPreviewSummary: document.querySelector("#subscriptionPreviewSummary"),
  subscriptionPreviewList: document.querySelector("#subscriptionPreviewList"),
  subscriptionStatus: document.querySelector("#subscriptionStatus"),
  importExportDialog: document.querySelector("#importExportDialog"),
  importExportSummary: document.querySelector("#importExportSummary"),
  exportTypeInput: document.querySelector("#exportTypeInput"),
  generateExportBtn: document.querySelector("#generateExportBtn"),
  copyExportBtn: document.querySelector("#copyExportBtn"),
  exportPreviewInput: document.querySelector("#exportPreviewInput"),
  importJsonInput: document.querySelector("#importJsonInput"),
  previewImportBtn: document.querySelector("#previewImportBtn"),
  importProjectBtn: document.querySelector("#importProjectBtn"),
  importExportStatus: document.querySelector("#importExportStatus"),
  pluginsDialog: document.querySelector("#pluginsDialog"),
  pluginSummary: document.querySelector("#pluginSummary"),
  pluginInstallerInput: document.querySelector("#pluginInstallerInput"),
  pluginDirectoryInput: document.querySelector("#pluginDirectoryInput"),
  pluginZipInput: document.querySelector("#pluginZipInput"),
  pluginApiUrlInput: document.querySelector("#pluginApiUrlInput"),
  installedPluginSummary: document.querySelector("#installedPluginSummary"),
  availablePluginSummary: document.querySelector("#availablePluginSummary"),
  installedPluginList: document.querySelector("#installedPluginList"),
  availablePluginList: document.querySelector("#availablePluginList"),
  pluginStatus: document.querySelector("#pluginStatus"),
  identityDialog: document.querySelector("#identityDialog"),
  identitySummary: document.querySelector("#identitySummary"),
  identityUsernameInput: document.querySelector("#identityUsernameInput"),
  identityDisplayNameInput: document.querySelector("#identityDisplayNameInput"),
  identityEmailInput: document.querySelector("#identityEmailInput"),
  identityUserTypeInput: document.querySelector("#identityUserTypeInput"),
  identityUserRoleInput: document.querySelector("#identityUserRoleInput"),
  identitySecretInput: document.querySelector("#identitySecretInput"),
  addIdentityUserBtn: document.querySelector("#addIdentityUserBtn"),
  identityUserSummary: document.querySelector("#identityUserSummary"),
  identityUserList: document.querySelector("#identityUserList"),
  identityGroupSummary: document.querySelector("#identityGroupSummary"),
  identityGroupNameInput: document.querySelector("#identityGroupNameInput"),
  identityGroupExternalInput: document.querySelector("#identityGroupExternalInput"),
  addIdentityGroupBtn: document.querySelector("#addIdentityGroupBtn"),
  identityGroupSelect: document.querySelector("#identityGroupSelect"),
  identityGroupUserSelect: document.querySelector("#identityGroupUserSelect"),
  addIdentityGroupMemberBtn: document.querySelector("#addIdentityGroupMemberBtn"),
  identityGroupList: document.querySelector("#identityGroupList"),
  identityStatus: document.querySelector("#identityStatus"),
  systemSettingsDialog: document.querySelector("#systemSettingsDialog"),
  systemSummary: document.querySelector("#systemSummary"),
  apiEndpointInput: document.querySelector("#apiEndpointInput"),
  apiUserInput: document.querySelector("#apiUserInput"),
  apiTokenInput: document.querySelector("#apiTokenInput"),
  apiHeaderInput: document.querySelector("#apiHeaderInput"),
  apiRequireKeyInput: document.querySelector("#apiRequireKeyInput"),
  bruteCaptchaInput: document.querySelector("#bruteCaptchaInput"),
  bruteLockInput: document.querySelector("#bruteLockInput"),
  lockDurationInput: document.querySelector("#lockDurationInput"),
  hideLoginInput: document.querySelector("#hideLoginInput"),
  disableLogoutInput: document.querySelector("#disableLogoutInput"),
  markdownEscapeInput: document.querySelector("#markdownEscapeInput"),
  privateLinksInput: document.querySelector("#privateLinksInput"),
  privateWebhooksInput: document.querySelector("#privateWebhooksInput"),
  ldapEnabledInput: document.querySelector("#ldapEnabledInput"),
  ldapServerInput: document.querySelector("#ldapServerInput"),
  ldapBindTypeInput: document.querySelector("#ldapBindTypeInput"),
  ldapUserBaseInput: document.querySelector("#ldapUserBaseInput"),
  ldapUserFilterInput: document.querySelector("#ldapUserFilterInput"),
  ldapGroupBaseInput: document.querySelector("#ldapGroupBaseInput"),
  ldapGroupFilterInput: document.querySelector("#ldapGroupFilterInput"),
  ldapUserCreationInput: document.querySelector("#ldapUserCreationInput"),
  ldapGroupProviderInput: document.querySelector("#ldapGroupProviderInput"),
  proxyEnabledInput: document.querySelector("#proxyEnabledInput"),
  proxyTrustedInput: document.querySelector("#proxyTrustedInput"),
  proxyUserHeaderInput: document.querySelector("#proxyUserHeaderInput"),
  proxyEmailHeaderInput: document.querySelector("#proxyEmailHeaderInput"),
  proxyNameHeaderInput: document.querySelector("#proxyNameHeaderInput"),
  proxyAdminInput: document.querySelector("#proxyAdminInput"),
  proxyDomainInput: document.querySelector("#proxyDomainInput"),
  proxyStripHeadersInput: document.querySelector("#proxyStripHeadersInput"),
  systemConfigPreview: document.querySelector("#systemConfigPreview"),
  systemRiskSummary: document.querySelector("#systemRiskSummary"),
  systemStatus: document.querySelector("#systemStatus"),
  runtimeDialog: document.querySelector("#runtimeDialog"),
  runtimeSummary: document.querySelector("#runtimeSummary"),
  runtimeDbDriverInput: document.querySelector("#runtimeDbDriverInput"),
  runtimeSqlitePathInput: document.querySelector("#runtimeSqlitePathInput"),
  runtimeDbHostInput: document.querySelector("#runtimeDbHostInput"),
  runtimeDbPortInput: document.querySelector("#runtimeDbPortInput"),
  runtimeDbNameInput: document.querySelector("#runtimeDbNameInput"),
  runtimeDbUserInput: document.querySelector("#runtimeDbUserInput"),
  runtimeWalInput: document.querySelector("#runtimeWalInput"),
  runtimeAutoMigrationInput: document.querySelector("#runtimeAutoMigrationInput"),
  runtimeSchemaCurrentInput: document.querySelector("#runtimeSchemaCurrentInput"),
  runtimeSchemaLatestInput: document.querySelector("#runtimeSchemaLatestInput"),
  runDbBackupBtn: document.querySelector("#runDbBackupBtn"),
  runDbMigrationBtn: document.querySelector("#runDbMigrationBtn"),
  runDbOptimizeBtn: document.querySelector("#runDbOptimizeBtn"),
  runtimePhpVersionInput: document.querySelector("#runtimePhpVersionInput"),
  runtimeWebServerInput: document.querySelector("#runtimeWebServerInput"),
  runtimeInstallModeInput: document.querySelector("#runtimeInstallModeInput"),
  runtimeStorageProfileInput: document.querySelector("#runtimeStorageProfileInput"),
  runtimeDataWritableInput: document.querySelector("#runtimeDataWritableInput"),
  runtimeFilesDirInput: document.querySelector("#runtimeFilesDirInput"),
  runtimeCacheDriverInput: document.querySelector("#runtimeCacheDriverInput"),
  runtimeCacheWritableInput: document.querySelector("#runtimeCacheWritableInput"),
  runtimeOpcacheInput: document.querySelector("#runtimeOpcacheInput"),
  runtimeUrlRewriteInput: document.querySelector("#runtimeUrlRewriteInput"),
  runtimeDebugInput: document.querySelector("#runtimeDebugInput"),
  runtimeRequirementList: document.querySelector("#runtimeRequirementList"),
  runtimeUpgradeTargetInput: document.querySelector("#runtimeUpgradeTargetInput"),
  runtimeUpgradeList: document.querySelector("#runtimeUpgradeList"),
  runtimeConfigPreview: document.querySelector("#runtimeConfigPreview"),
  runtimeRiskSummary: document.querySelector("#runtimeRiskSummary"),
  runtimeLogList: document.querySelector("#runtimeLogList"),
  runtimeStatus: document.querySelector("#runtimeStatus"),
  deploymentDialog: document.querySelector("#deploymentDialog"),
  deploymentSummary: document.querySelector("#deploymentSummary"),
  deploymentMethodInput: document.querySelector("#deploymentMethodInput"),
  deploymentVersionInput: document.querySelector("#deploymentVersionInput"),
  deploymentPathInput: document.querySelector("#deploymentPathInput"),
  deploymentBaseUrlInput: document.querySelector("#deploymentBaseUrlInput"),
  deploymentPasswordChangedInput: document.querySelector("#deploymentPasswordChangedInput"),
  deploymentDataProtectedInput: document.querySelector("#deploymentDataProtectedInput"),
  deploymentHtaccessInput: document.querySelector("#deploymentHtaccessInput"),
  deploymentDataWritableInput: document.querySelector("#deploymentDataWritableInput"),
  deploymentOutsideRootInput: document.querySelector("#deploymentOutsideRootInput"),
  deploymentRequirementsInput: document.querySelector("#deploymentRequirementsInput"),
  dockerEnabledInput: document.querySelector("#dockerEnabledInput"),
  dockerRegistryInput: document.querySelector("#dockerRegistryInput"),
  dockerTagInput: document.querySelector("#dockerTagInput"),
  dockerPinnedInput: document.querySelector("#dockerPinnedInput"),
  dockerDataVolumeInput: document.querySelector("#dockerDataVolumeInput"),
  dockerPluginsVolumeInput: document.querySelector("#dockerPluginsVolumeInput"),
  dockerSslVolumeInput: document.querySelector("#dockerSslVolumeInput"),
  dockerEnvConfigInput: document.querySelector("#dockerEnvConfigInput"),
  dockerCustomConfigInput: document.querySelector("#dockerCustomConfigInput"),
  dockerHealthcheckInput: document.querySelector("#dockerHealthcheckInput"),
  dockerComposeProfileInput: document.querySelector("#dockerComposeProfileInput"),
  dockerSmtpInput: document.querySelector("#dockerSmtpInput"),
  runHealthcheckBtn: document.querySelector("#runHealthcheckBtn"),
  accessWebServerInput: document.querySelector("#accessWebServerInput"),
  accessRewriteInput: document.querySelector("#accessRewriteInput"),
  accessSubfolderInput: document.querySelector("#accessSubfolderInput"),
  accessDataDenyInput: document.querySelector("#accessDataDenyInput"),
  accessHtaccessDenyInput: document.querySelector("#accessHtaccessDenyInput"),
  accessProxyInput: document.querySelector("#accessProxyInput"),
  accessDirectBlockedInput: document.querySelector("#accessDirectBlockedInput"),
  accessStripAuthInput: document.querySelector("#accessStripAuthInput"),
  accessStripForwardedInput: document.querySelector("#accessStripForwardedInput"),
  accessTrustedProxyInput: document.querySelector("#accessTrustedProxyInput"),
  accessForwardProtoInput: document.querySelector("#accessForwardProtoInput"),
  accessRateLimitInput: document.querySelector("#accessRateLimitInput"),
  accessOutboundRestrictedInput: document.querySelector("#accessOutboundRestrictedInput"),
  deploymentRiskList: document.querySelector("#deploymentRiskList"),
  deploymentRunbookPreview: document.querySelector("#deploymentRunbookPreview"),
  deploymentLogList: document.querySelector("#deploymentLogList"),
  deploymentStatus: document.querySelector("#deploymentStatus"),
  operationsDialog: document.querySelector("#operationsDialog"),
  operationsSummary: document.querySelector("#operationsSummary"),
  cronModeInput: document.querySelector("#cronModeInput"),
  cronScheduleInput: document.querySelector("#cronScheduleInput"),
  cronWindowsInput: document.querySelector("#cronWindowsInput"),
  cronUrlInput: document.querySelector("#cronUrlInput"),
  runCronBtn: document.querySelector("#runCronBtn"),
  mailTransportInput: document.querySelector("#mailTransportInput"),
  mailFromInput: document.querySelector("#mailFromInput"),
  mailHostInput: document.querySelector("#mailHostInput"),
  mailPortInput: document.querySelector("#mailPortInput"),
  mailEncryptionInput: document.querySelector("#mailEncryptionInput"),
  mailUserInput: document.querySelector("#mailUserInput"),
  mailAppUrlInput: document.querySelector("#mailAppUrlInput"),
  mailTestRecipientInput: document.querySelector("#mailTestRecipientInput"),
  sendTestMailBtn: document.querySelector("#sendTestMailBtn"),
  workerEnabledInput: document.querySelector("#workerEnabledInput"),
  workerQueueInput: document.querySelector("#workerQueueInput"),
  workerSupervisorInput: document.querySelector("#workerSupervisorInput"),
  runWorkerBtn: document.querySelector("#runWorkerBtn"),
  jobQueueList: document.querySelector("#jobQueueList"),
  cliCommandInput: document.querySelector("#cliCommandInput"),
  cliPreviewInput: document.querySelector("#cliPreviewInput"),
  runCliBtn: document.querySelector("#runCliBtn"),
  cliLogList: document.querySelector("#cliLogList"),
  operationsStatus: document.querySelector("#operationsStatus"),
  searchInput: document.querySelector("#searchInput"),
  assigneeFilter: document.querySelector("#assigneeFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  swimlaneFilter: document.querySelector("#swimlaneFilter"),
  customFilterSelect: document.querySelector("#customFilterSelect"),
  viewButtons: [...document.querySelectorAll("#viewSwitcher [data-view]")],
  cardModeSelect: document.querySelector("#cardModeSelect"),
  showClosedInput: document.querySelector("#showClosedInput"),
  hideEmptyColumnsInput: document.querySelector("#hideEmptyColumnsInput"),
  columnVisibility: document.querySelector("#columnVisibility"),
  memberOptions: document.querySelector("#memberOptions"),
  categoryOptions: document.querySelector("#categoryOptions"),
  projectDialog: document.querySelector("#projectDialog"),
  projectForm: document.querySelector("#projectForm"),
  projectDialogTitle: document.querySelector("#projectDialogTitle"),
  projectNameInput: document.querySelector("#projectNameInput"),
  projectDescInput: document.querySelector("#projectDescInput"),
  projectCreateOptions: document.querySelector("#projectCreateOptions"),
  projectModeInputs: [...document.querySelectorAll('input[name="projectMode"]')],
  templateArea: document.querySelector("#templateArea"),
  templatePicker: document.querySelector("#templatePicker"),
  templatePreview: document.querySelector("#templatePreview"),
  saveProjectBtn: document.querySelector("#saveProjectBtn"),
  projectSettingsDialog: document.querySelector("#projectSettingsDialog"),
  projectSettingsForm: document.querySelector("#projectSettingsForm"),
  settingsProjectTypeInput: document.querySelector("#settingsProjectTypeInput"),
  settingsAccessModeInput: document.querySelector("#settingsAccessModeInput"),
  settingsPublicAccessInput: document.querySelector("#settingsPublicAccessInput"),
  settingsDefaultSwimlaneInput: document.querySelector("#settingsDefaultSwimlaneInput"),
  settingsPlannedStartInput: document.querySelector("#settingsPlannedStartInput"),
  settingsPlannedLaunchInput: document.querySelector("#settingsPlannedLaunchInput"),
  settingsActualStartInput: document.querySelector("#settingsActualStartInput"),
  settingsActualLaunchInput: document.querySelector("#settingsActualLaunchInput"),
  projectFileNameInput: document.querySelector("#projectFileNameInput"),
  projectFileMetaInput: document.querySelector("#projectFileMetaInput"),
  projectFileOwnerInput: document.querySelector("#projectFileOwnerInput"),
  addProjectFileBtn: document.querySelector("#addProjectFileBtn"),
  projectFileList: document.querySelector("#projectFileList"),
  memberNameInput: document.querySelector("#memberNameInput"),
  memberRoleInput: document.querySelector("#memberRoleInput"),
  addMemberBtn: document.querySelector("#addMemberBtn"),
  memberList: document.querySelector("#memberList"),
  groupNameInput: document.querySelector("#groupNameInput"),
  groupRoleInput: document.querySelector("#groupRoleInput"),
  addGroupBtn: document.querySelector("#addGroupBtn"),
  groupList: document.querySelector("#groupList"),
  categoryNameInput: document.querySelector("#categoryNameInput"),
  addCategoryBtn: document.querySelector("#addCategoryBtn"),
  categoryList: document.querySelector("#categoryList"),
  tagNameInput: document.querySelector("#tagNameInput"),
  addTagBtn: document.querySelector("#addTagBtn"),
  tagList: document.querySelector("#tagList"),
  filterNameInput: document.querySelector("#filterNameInput"),
  filterQueryInput: document.querySelector("#filterQueryInput"),
  addFilterBtn: document.querySelector("#addFilterBtn"),
  customFilterList: document.querySelector("#customFilterList"),
  settingsSwimlaneList: document.querySelector("#settingsSwimlaneList"),
  columnDialog: document.querySelector("#columnDialog"),
  columnForm: document.querySelector("#columnForm"),
  columnDialogTitle: document.querySelector("#columnDialogTitle"),
  columnTitleInput: document.querySelector("#columnTitleInput"),
  columnWipInput: document.querySelector("#columnWipInput"),
  deleteColumnBtn: document.querySelector("#deleteColumnBtn"),
  swimlaneDialog: document.querySelector("#swimlaneDialog"),
  swimlaneForm: document.querySelector("#swimlaneForm"),
  swimlaneDialogTitle: document.querySelector("#swimlaneDialogTitle"),
  swimlaneTitleInput: document.querySelector("#swimlaneTitleInput"),
  swimlaneDescInput: document.querySelector("#swimlaneDescInput"),
  deleteSwimlaneBtn: document.querySelector("#deleteSwimlaneBtn"),
  cardDialog: document.querySelector("#cardDialog"),
  cardForm: document.querySelector("#cardForm"),
  cardDialogTitle: document.querySelector("#cardDialogTitle"),
  cardTitleInput: document.querySelector("#cardTitleInput"),
  cardAssigneeInput: document.querySelector("#cardAssigneeInput"),
  cardSwimlaneInput: document.querySelector("#cardSwimlaneInput"),
  cardCategoryInput: document.querySelector("#cardCategoryInput"),
  cardPriorityInput: document.querySelector("#cardPriorityInput"),
  cardDueInput: document.querySelector("#cardDueInput"),
  cardTagsInput: document.querySelector("#cardTagsInput"),
  cardColorInput: document.querySelector("#cardColorInput"),
  cardEstimateInput: document.querySelector("#cardEstimateInput"),
  cardActualInput: document.querySelector("#cardActualInput"),
  cardPlannedStartInput: document.querySelector("#cardPlannedStartInput"),
  cardPlannedEndInput: document.querySelector("#cardPlannedEndInput"),
  cardActualStartInput: document.querySelector("#cardActualStartInput"),
  cardActualEndInput: document.querySelector("#cardActualEndInput"),
  cardDescInput: document.querySelector("#cardDescInput"),
  subtaskSummary: document.querySelector("#subtaskSummary"),
  subtaskInput: document.querySelector("#subtaskInput"),
  addSubtaskBtn: document.querySelector("#addSubtaskBtn"),
  subtaskList: document.querySelector("#subtaskList"),
  timeSummary: document.querySelector("#timeSummary"),
  timeSpentInput: document.querySelector("#timeSpentInput"),
  timeNoteInput: document.querySelector("#timeNoteInput"),
  addTimeEntryBtn: document.querySelector("#addTimeEntryBtn"),
  timeLogList: document.querySelector("#timeLogList"),
  attachmentSummary: document.querySelector("#attachmentSummary"),
  attachmentNameInput: document.querySelector("#attachmentNameInput"),
  attachmentMetaInput: document.querySelector("#attachmentMetaInput"),
  addAttachmentBtn: document.querySelector("#addAttachmentBtn"),
  attachmentList: document.querySelector("#attachmentList"),
  recurringPatternInput: document.querySelector("#recurringPatternInput"),
  recurringNextDateInput: document.querySelector("#recurringNextDateInput"),
  cardOperations: document.querySelector("#cardOperations"),
  cardStatusText: document.querySelector("#cardStatusText"),
  toggleCardClosedBtn: document.querySelector("#toggleCardClosedBtn"),
  duplicateCardBtn: document.querySelector("#duplicateCardBtn"),
  moveProjectInput: document.querySelector("#moveProjectInput"),
  moveCardBtn: document.querySelector("#moveCardBtn"),
  cardLinksSection: document.querySelector("#cardLinksSection"),
  linkTypeInput: document.querySelector("#linkTypeInput"),
  linkTaskInput: document.querySelector("#linkTaskInput"),
  addLinkBtn: document.querySelector("#addLinkBtn"),
  linkList: document.querySelector("#linkList"),
  commentInput: document.querySelector("#commentInput"),
  addCommentBtn: document.querySelector("#addCommentBtn"),
  commentList: document.querySelector("#commentList"),
  activityList: document.querySelector("#activityList"),
  deleteCardBtn: document.querySelector("#deleteCardBtn")
};

document.querySelector("#newProjectBtn").addEventListener("click", () => openProjectDialog());
document.querySelector("#editProjectBtn").addEventListener("click", () => openProjectDialog(activeProject().id));
document.querySelector("#analyticsBtn").addEventListener("click", openAnalyticsDialog);
document.querySelector("#activityBtn").addEventListener("click", openActivityDialog);
document.querySelector("#automationBtn").addEventListener("click", openAutomationDialog);
document.querySelector("#notificationsBtn").addEventListener("click", openNotificationsDialog);
document.querySelector("#subscriptionsBtn").addEventListener("click", openSubscriptionsDialog);
document.querySelector("#importExportBtn").addEventListener("click", openImportExportDialog);
document.querySelector("#pluginsBtn").addEventListener("click", openPluginsDialog);
document.querySelector("#userManagementBtn").addEventListener("click", openIdentityDialog);
document.querySelector("#systemSettingsBtn").addEventListener("click", openSystemSettingsDialog);
document.querySelector("#runtimeBtn").addEventListener("click", openRuntimeDialog);
document.querySelector("#deploymentBtn").addEventListener("click", openDeploymentDialog);
document.querySelector("#operationsBtn").addEventListener("click", openOperationsDialog);
document.querySelector("#shortcutsBtn").addEventListener("click", openShortcutsDialog);
document.querySelector("#projectSettingsBtn").addEventListener("click", openProjectSettingsDialog);
document.querySelector("#deleteProjectBtn").addEventListener("click", deleteActiveProject);
document.querySelector("#addColumnBtn").addEventListener("click", () => openColumnDialog());
document.querySelector("#addSwimlaneBtn").addEventListener("click", () => openSwimlaneDialog());
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemoData);

els.searchInput.addEventListener("input", renderBoard);
els.assigneeFilter.addEventListener("change", renderBoard);
els.categoryFilter.addEventListener("change", renderBoard);
els.swimlaneFilter.addEventListener("change", renderBoard);
els.customFilterSelect.addEventListener("change", renderBoard);
els.viewButtons.forEach((button) => button.addEventListener("click", () => setViewMode(button.dataset.view)));
els.cardModeSelect.addEventListener("change", setCardMode);
els.showClosedInput.addEventListener("change", toggleClosedVisibility);
els.hideEmptyColumnsInput.addEventListener("change", toggleEmptyColumnVisibility);
els.projectModeInputs.forEach((input) => input.addEventListener("change", renderProjectCreateOptions));
els.projectForm.addEventListener("submit", saveProjectFromDialog);
els.projectSettingsForm.addEventListener("submit", saveProjectSettings);
els.addMemberBtn.addEventListener("click", addDraftMember);
els.addProjectFileBtn.addEventListener("click", addDraftProjectFile);
els.addGroupBtn.addEventListener("click", addDraftGroup);
els.addCategoryBtn.addEventListener("click", addDraftCategory);
els.addTagBtn.addEventListener("click", addDraftTag);
els.addFilterBtn.addEventListener("click", addDraftCustomFilter);
els.automationForm.addEventListener("submit", saveAutomationDialog);
els.addAutomationBtn.addEventListener("click", addAutomationRule);
els.runAutomationBtn.addEventListener("click", runAutomationSimulation);
els.markNotificationsBtn.addEventListener("click", markNotificationsRead);
els.copyIcalBtn.addEventListener("click", () => copySubscriptionLink("ical"));
els.copyRssBtn.addEventListener("click", () => copySubscriptionLink("rss"));
els.generateExportBtn.addEventListener("click", generateExportPreview);
els.copyExportBtn.addEventListener("click", copyExportPreview);
els.previewImportBtn.addEventListener("click", previewImportProject);
els.importProjectBtn.addEventListener("click", importProjectFromDialog);
els.pluginInstallerInput.addEventListener("change", updatePluginConfigFromDialog);
els.pluginDirectoryInput.addEventListener("change", updatePluginConfigFromDialog);
els.pluginZipInput.addEventListener("change", updatePluginConfigFromDialog);
els.pluginApiUrlInput.addEventListener("input", updatePluginConfigFromDialog);
els.addIdentityUserBtn.addEventListener("click", addIdentityUser);
els.addIdentityGroupBtn.addEventListener("click", addIdentityGroup);
els.addIdentityGroupMemberBtn.addEventListener("click", addIdentityGroupMember);
[
  els.apiEndpointInput,
  els.apiUserInput,
  els.apiTokenInput,
  els.apiHeaderInput,
  els.apiRequireKeyInput,
  els.bruteCaptchaInput,
  els.bruteLockInput,
  els.lockDurationInput,
  els.hideLoginInput,
  els.disableLogoutInput,
  els.markdownEscapeInput,
  els.privateLinksInput,
  els.privateWebhooksInput,
  els.ldapEnabledInput,
  els.ldapServerInput,
  els.ldapBindTypeInput,
  els.ldapUserBaseInput,
  els.ldapUserFilterInput,
  els.ldapGroupBaseInput,
  els.ldapGroupFilterInput,
  els.ldapUserCreationInput,
  els.ldapGroupProviderInput,
  els.proxyEnabledInput,
  els.proxyTrustedInput,
  els.proxyUserHeaderInput,
  els.proxyEmailHeaderInput,
  els.proxyNameHeaderInput,
  els.proxyAdminInput,
  els.proxyDomainInput,
  els.proxyStripHeadersInput
].forEach((input) => input.addEventListener("input", updateSystemConfigFromDialog));
[
  els.apiRequireKeyInput,
  els.hideLoginInput,
  els.disableLogoutInput,
  els.markdownEscapeInput,
  els.privateLinksInput,
  els.privateWebhooksInput,
  els.ldapEnabledInput,
  els.ldapBindTypeInput,
  els.ldapUserCreationInput,
  els.ldapGroupProviderInput,
  els.proxyEnabledInput,
  els.proxyStripHeadersInput
].forEach((input) => input.addEventListener("change", updateSystemConfigFromDialog));
[
  els.cronModeInput,
  els.cronScheduleInput,
  els.cronWindowsInput,
  els.cronUrlInput,
  els.mailTransportInput,
  els.mailFromInput,
  els.mailHostInput,
  els.mailPortInput,
  els.mailEncryptionInput,
  els.mailUserInput,
  els.mailAppUrlInput,
  els.mailTestRecipientInput,
  els.workerEnabledInput,
  els.workerQueueInput,
  els.workerSupervisorInput,
  els.cliCommandInput
].forEach((input) => input.addEventListener("input", updateOperationsFromDialog));
[
  els.cronModeInput,
  els.mailTransportInput,
  els.mailEncryptionInput,
  els.workerEnabledInput,
  els.workerQueueInput,
  els.workerSupervisorInput,
  els.cliCommandInput
].forEach((input) => input.addEventListener("change", updateOperationsFromDialog));
els.runCronBtn.addEventListener("click", runCronSimulation);
els.runWorkerBtn.addEventListener("click", runWorkerSimulation);
els.sendTestMailBtn.addEventListener("click", sendTestMailSimulation);
els.runCliBtn.addEventListener("click", runCliSimulation);
[
  els.runtimeDbDriverInput,
  els.runtimeSqlitePathInput,
  els.runtimeDbHostInput,
  els.runtimeDbPortInput,
  els.runtimeDbNameInput,
  els.runtimeDbUserInput,
  els.runtimeWalInput,
  els.runtimeAutoMigrationInput,
  els.runtimeSchemaCurrentInput,
  els.runtimeSchemaLatestInput,
  els.runtimePhpVersionInput,
  els.runtimeWebServerInput,
  els.runtimeInstallModeInput,
  els.runtimeStorageProfileInput,
  els.runtimeDataWritableInput,
  els.runtimeFilesDirInput,
  els.runtimeCacheDriverInput,
  els.runtimeCacheWritableInput,
  els.runtimeOpcacheInput,
  els.runtimeUrlRewriteInput,
  els.runtimeDebugInput,
  els.runtimeUpgradeTargetInput
].forEach((input) => input.addEventListener("input", updateRuntimeFromDialog));
[
  els.runtimeDbDriverInput,
  els.runtimeWalInput,
  els.runtimeAutoMigrationInput,
  els.runtimeInstallModeInput,
  els.runtimeStorageProfileInput,
  els.runtimeDataWritableInput,
  els.runtimeCacheDriverInput,
  els.runtimeCacheWritableInput,
  els.runtimeOpcacheInput,
  els.runtimeUrlRewriteInput,
  els.runtimeDebugInput
].forEach((input) => input.addEventListener("change", updateRuntimeFromDialog));
els.runtimeRequirementList.addEventListener("change", updateRuntimeFromDialog);
els.runtimeUpgradeList.addEventListener("change", updateRuntimeFromDialog);
els.runDbBackupBtn.addEventListener("click", runDatabaseBackupSimulation);
els.runDbMigrationBtn.addEventListener("click", runDatabaseMigrationSimulation);
els.runDbOptimizeBtn.addEventListener("click", runDatabaseOptimizeSimulation);
[
  els.deploymentMethodInput,
  els.deploymentVersionInput,
  els.deploymentPathInput,
  els.deploymentBaseUrlInput,
  els.deploymentPasswordChangedInput,
  els.deploymentDataProtectedInput,
  els.deploymentHtaccessInput,
  els.deploymentDataWritableInput,
  els.deploymentOutsideRootInput,
  els.deploymentRequirementsInput,
  els.dockerEnabledInput,
  els.dockerRegistryInput,
  els.dockerTagInput,
  els.dockerPinnedInput,
  els.dockerDataVolumeInput,
  els.dockerPluginsVolumeInput,
  els.dockerSslVolumeInput,
  els.dockerEnvConfigInput,
  els.dockerCustomConfigInput,
  els.dockerHealthcheckInput,
  els.dockerComposeProfileInput,
  els.dockerSmtpInput,
  els.accessWebServerInput,
  els.accessRewriteInput,
  els.accessSubfolderInput,
  els.accessDataDenyInput,
  els.accessHtaccessDenyInput,
  els.accessProxyInput,
  els.accessDirectBlockedInput,
  els.accessStripAuthInput,
  els.accessStripForwardedInput,
  els.accessTrustedProxyInput,
  els.accessForwardProtoInput,
  els.accessRateLimitInput,
  els.accessOutboundRestrictedInput
].forEach((input) => input.addEventListener("input", updateDeploymentFromDialog));
[
  els.deploymentMethodInput,
  els.deploymentPasswordChangedInput,
  els.deploymentDataProtectedInput,
  els.deploymentHtaccessInput,
  els.deploymentDataWritableInput,
  els.deploymentOutsideRootInput,
  els.deploymentRequirementsInput,
  els.dockerEnabledInput,
  els.dockerRegistryInput,
  els.dockerPinnedInput,
  els.dockerDataVolumeInput,
  els.dockerPluginsVolumeInput,
  els.dockerSslVolumeInput,
  els.dockerEnvConfigInput,
  els.dockerCustomConfigInput,
  els.dockerHealthcheckInput,
  els.dockerComposeProfileInput,
  els.dockerSmtpInput,
  els.accessWebServerInput,
  els.accessRewriteInput,
  els.accessDataDenyInput,
  els.accessHtaccessDenyInput,
  els.accessProxyInput,
  els.accessDirectBlockedInput,
  els.accessStripAuthInput,
  els.accessStripForwardedInput,
  els.accessForwardProtoInput,
  els.accessRateLimitInput,
  els.accessOutboundRestrictedInput
].forEach((input) => input.addEventListener("change", updateDeploymentFromDialog));
els.runHealthcheckBtn.addEventListener("click", runDeploymentHealthcheckSimulation);
els.columnForm.addEventListener("submit", saveColumnFromDialog);
els.deleteColumnBtn.addEventListener("click", deleteEditingColumn);
els.swimlaneForm.addEventListener("submit", saveSwimlaneFromDialog);
els.deleteSwimlaneBtn.addEventListener("click", deleteEditingSwimlane);
els.cardForm.addEventListener("submit", saveCardFromDialog);
els.deleteCardBtn.addEventListener("click", deleteEditingCard);
els.addSubtaskBtn.addEventListener("click", addDraftSubtask);
els.addTimeEntryBtn.addEventListener("click", addDraftTimeEntry);
els.addAttachmentBtn.addEventListener("click", addDraftAttachment);
els.cardActualInput.addEventListener("input", renderCardDetails);
els.toggleCardClosedBtn.addEventListener("click", toggleEditingCardClosed);
els.duplicateCardBtn.addEventListener("click", duplicateEditingCard);
els.moveCardBtn.addEventListener("click", moveEditingCardToProject);
els.addLinkBtn.addEventListener("click", addDraftLink);
els.addCommentBtn.addEventListener("click", addDraftComment);
document.addEventListener("keydown", handleKeyboardShortcuts);

normalizeState();
persist();
render();

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
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

function createDefaultIdentity() {
  const adminId = uid("user");
  const pmId = uid("user");
  const designId = uid("user");
  const devId = uid("user");
  const qaId = uid("user");
  const opsId = uid("user");
  const productGroupId = uid("group");
  const opsGroupId = uid("group");
  return {
    users: [
      {
        id: adminId,
        username: "admin",
        name: "系统管理员",
        email: "admin@example.com",
        role: "app-admin",
        type: "local",
        active: true,
        twoFactor: true,
        apiKeyRequired: true,
        externalId: ""
      },
      {
        id: pmId,
        username: "pm",
        name: "PM",
        email: "pm@example.com",
        role: "app-manager",
        type: "local",
        active: true,
        twoFactor: false,
        apiKeyRequired: false,
        externalId: ""
      },
      {
        id: designId,
        username: "designer",
        name: "设计",
        email: "design@example.com",
        role: "app-user",
        type: "local",
        active: true,
        twoFactor: false,
        apiKeyRequired: false,
        externalId: ""
      },
      {
        id: devId,
        username: "dev",
        name: "研发",
        email: "dev@example.com",
        role: "app-user",
        type: "local",
        active: true,
        twoFactor: false,
        apiKeyRequired: false,
        externalId: ""
      },
      {
        id: qaId,
        username: "qa",
        name: "测试",
        email: "qa@example.com",
        role: "app-user",
        type: "local",
        active: true,
        twoFactor: false,
        apiKeyRequired: false,
        externalId: ""
      },
      {
        id: opsId,
        username: "ldap_ops",
        name: "运营",
        email: "ops@example.com",
        role: "app-user",
        type: "remote",
        active: true,
        twoFactor: false,
        apiKeyRequired: false,
        externalId: "uid=ops,ou=People,dc=example,dc=com"
      }
    ],
    groups: [
      {
        id: productGroupId,
        name: "产品研发测试小组",
        externalId: "team-product-delivery",
        memberIds: [pmId, designId, devId, qaId]
      },
      {
        id: opsGroupId,
        name: "运营观察组",
        externalId: "ldap-ops-watchers",
        memberIds: [opsId]
      }
    ]
  };
}

function createDefaultSystemConfig() {
  return {
    api: {
      endpoint: "/jsonrpc.php",
      applicationUser: "jsonrpc",
      applicationToken: "••••••••••••••••••••",
      authHeader: "",
      requireApiKeyFor2fa: true
    },
    ldap: {
      enabled: false,
      server: "ldap://ldap.example.com",
      bindType: "proxy",
      userBaseDn: "ou=People,dc=example,dc=com",
      userFilter: "uid=%s",
      userCreation: true,
      groupProvider: true,
      groupBaseDn: "ou=Groups,dc=example,dc=com",
      groupFilter: "(&(objectClass=groupOfNames)(cn=%s*))"
    },
    reverseProxy: {
      enabled: false,
      trustedNetworks: "127.0.0.1/32,::1/128",
      userHeader: "REMOTE_USER",
      emailHeader: "REMOTE_EMAIL",
      fullNameHeader: "REMOTE_NAME",
      defaultAdmin: "admin",
      defaultDomain: "example.com",
      stripIncomingHeaders: true
    },
    security: {
      hideLoginForm: false,
      disableLogout: false,
      markdownEscapeHtml: true,
      bruteForceCaptcha: 3,
      bruteForceLockdown: 6,
      lockdownDuration: 15,
      allowPrivateExternalLinks: false,
      allowPrivateWebhooks: false
    }
  };
}

function createDefaultOperations() {
  return {
    cron: {
      mode: "cli",
      schedule: "0 8 * * *",
      windowsTask: "Kanboard Daily Cron",
      url: "https://kanboard.example.com/cronjob?token=WEBHOOK_TOKEN",
      lastRunAt: "",
      status: "未运行"
    },
    worker: {
      enabled: false,
      queueDriver: "none",
      supervisor: "systemd",
      status: "未启动",
      processed: 0,
      failed: 0
    },
    mail: {
      transport: "smtp",
      from: "notifications@kanboard.local",
      hostname: "mail.example.com",
      port: 587,
      encryption: "tls",
      username: "kanboard",
      sendmailCommand: "/usr/sbin/sendmail -bs",
      appUrl: "https://kanboard.example.com",
      testRecipient: "pm@example.com",
      lastTestAt: ""
    },
    cli: {
      selectedCommand: "cronjob",
      logs: []
    },
    jobs: [
      { id: "daily-stats", name: "项目每日统计", command: "projects:daily-stats", status: "pending" },
      { id: "overdue-notifications", name: "逾期任务通知", command: "notification:overdue-tasks --group", status: "pending" },
      { id: "task-triggers", name: "每日任务触发器", command: "trigger:tasks", status: "pending" },
      { id: "plugin-upgrade", name: "插件升级检查", command: "plugin:upgrade", status: "waiting" }
    ]
  };
}

function createDefaultRuntime() {
  const extensions = {};
  [...CORE_PHP_EXTENSIONS, ...Object.values(DRIVER_EXTENSION_MAP), ...OPTIONAL_PHP_EXTENSIONS].forEach((extension) => {
    extensions[extension] = CORE_PHP_EXTENSIONS.includes(extension) || extension === "pdo_sqlite" || ["zip", "curl"].includes(extension);
  });
  return {
    database: {
      driver: "sqlite",
      sqlitePath: "data/db.sqlite",
      host: "localhost",
      port: "",
      name: "kanboard",
      username: "kanboard",
      walMode: true,
      autoMigrations: true,
      currentSchemaVersion: 95,
      latestSchemaVersion: 96,
      migrationStatus: "待升级",
      lastBackupAt: "",
      lastOptimizeAt: ""
    },
    environment: {
      phpVersion: "8.3.8",
      webServer: "Apache",
      installMode: "archive",
      storageProfile: "local-small",
      dataDirectoryWritable: true,
      filesDir: "data/files",
      cacheDriver: "memory",
      cacheDirectoryWritable: true,
      opcacheEnabled: true,
      urlRewrite: false,
      debugMode: false
    },
    php: {
      extensions
    },
    upgrade: {
      targetVersion: "1.2.46",
      changeLogReviewed: false,
      backupVerified: false,
      workersStopped: false,
      maintenanceMode: false,
      sessionsFlushed: false,
      pluginsChecked: false
    },
    logs: []
  };
}

function createDefaultDeployment() {
  return {
    install: {
      method: "archive",
      sourceVersion: "1.2.46",
      installPath: "/var/www/kanboard",
      baseUrl: "https://kanboard.example.com",
      defaultPasswordChanged: false,
      dataDirectoryProtected: true,
      htaccessOrWebConfigEnabled: true,
      dataDirectoryWritable: true,
      outsideDocumentRoot: false,
      requirementsChecked: true
    },
    docker: {
      enabled: false,
      registry: "docker.io/kanboard/kanboard",
      imageTag: "v1.2.46",
      versionPinned: true,
      dataVolume: true,
      pluginsVolume: true,
      sslVolume: true,
      envConfig: true,
      customConfigInData: true,
      healthcheckEnabled: true,
      healthStatus: "未检查",
      composeProfile: "sqlite",
      smtpTransportPlanned: true
    },
    access: {
      webServer: "nginx",
      urlRewrite: true,
      subfolder: "",
      dataDenyRule: true,
      htaccessDenyRule: true,
      behindReverseProxy: true,
      directAccessBlocked: true,
      stripAuthHeaders: true,
      stripForwardedHeaders: true,
      trustedProxyNetworks: "127.0.0.1/32,::1/128",
      forwardedProto: true,
      rateLimitEnabled: true,
      outboundNetworkRestricted: true
    },
    logs: []
  };
}

function createDemoState() {
  const projectId = uid("project");
  const laneMain = { id: uid("lane"), title: "产品开发主流程", description: "单一产品项目的完整状态流；需求、产品、研发、运营差异通过分类和标签表达" };
  const lanes = {
    demand: laneMain,
    product: laneMain,
    delivery: laneMain,
    growth: laneMain
  };
  const columns = [
    { id: uid("column"), key: "intake", title: "机会/需求池", wipLimit: 0, cards: [] },
    { id: uid("column"), key: "clarify", title: "需求澄清", wipLimit: 4, cards: [] },
    { id: uid("column"), key: "solution", title: "方案设计", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "prd", title: "PRD 原型", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "review", title: "评审确认", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "planning", title: "研发排期", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "dev", title: "研发实现", wipLimit: 5, cards: [] },
    { id: uid("column"), key: "qa", title: "测试验收", wipLimit: 4, cards: [] },
    { id: uid("column"), key: "launch", title: "上线发布", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "operate", title: "运营反馈", wipLimit: 3, cards: [] },
    { id: uid("column"), key: "iterate", title: "复盘迭代", wipLimit: 0, cards: [] }
  ];
  const columnByKey = new Map(columns.map((column) => [column.key, column]));
  const addDemoCard = (columnKey, laneKey, options) => {
    columnByKey.get(columnKey).cards.push(makeCard({
      ...options,
      schedule: options.schedule || DEMO_CARD_SCHEDULES[columnKey],
      swimlaneId: lanes[laneKey].id
    }));
  };

  addDemoCard("intake", "demand", {
    title: "收集业务方提需与目标口径",
    description: "记录提需人、业务目标、期望上线时间和影响范围，先判断是否值得进入需求澄清。",
    assignee: "PM",
    category: "提需",
    priority: "高",
    color: "blue",
    tags: ["提需", "目标"],
    estimate: "1.5",
    subtasks: [
      { title: "确认提需背景和业务目标", done: true },
      { title: "记录影响用户和使用场景", done: false },
      { title: "补齐期望上线时间", done: false }
    ]
  });
  addDemoCard("intake", "demand", {
    title: "汇总用户反馈与客服工单",
    description: "把高频反馈、投诉、客服转述和用户原话汇总成可判断的问题池。",
    assignee: "客服",
    category: "用户反馈",
    priority: "中",
    color: "amber",
    tags: ["反馈", "客服"],
    estimate: "2",
    subtasks: [
      { title: "整理近两周高频反馈", done: true },
      { title: "标注反馈频次和影响程度", done: false }
    ]
  });
  addDemoCard("intake", "growth", {
    title: "竞品功能拆解与机会点记录",
    description: "对比竞品同类流程，提炼我们当前流程缺口和可借鉴交互。",
    assignee: "PM",
    category: "竞品",
    priority: "中",
    color: "gray",
    tags: ["竞品", "机会点"],
    estimate: "3",
    subtasks: [
      { title: "选择 3 个对标产品", done: true },
      { title: "截图关键路径", done: true },
      { title: "沉淀机会点", done: false }
    ]
  });

  addDemoCard("clarify", "demand", {
    title: "明确问题假设与成功指标",
    description: "把“想做一个功能”转成“解决什么问题、用什么指标判断成功”。",
    assignee: "PM",
    category: "需求澄清",
    priority: "高",
    color: "blue",
    tags: ["问题定义", "指标"],
    estimate: "2",
    subtasks: [
      { title: "定义核心问题", done: true },
      { title: "确定成功指标", done: false },
      { title: "确认不做范围", done: false }
    ]
  });
  addDemoCard("clarify", "demand", {
    title: "访谈目标用户并整理场景",
    description: "用 3-5 个访谈样本校准需求，避免只按业务方想象做产品。",
    assignee: "PM",
    category: "用户研究",
    priority: "中",
    color: "green",
    tags: ["访谈", "场景"],
    estimate: "4",
    subtasks: [
      { title: "准备访谈提纲", done: true },
      { title: "完成用户访谈", done: false },
      { title: "输出场景摘要", done: false }
    ]
  });
  addDemoCard("clarify", "product", {
    title: "需求优先级评估",
    description: "按用户价值、业务价值、实现成本和风险判断本轮做什么、暂缓什么。",
    assignee: "PM",
    category: "优先级",
    priority: "高",
    color: "amber",
    tags: ["P0", "排期"],
    estimate: "1.5",
    subtasks: [
      { title: "标注 P0/P1/P2", done: true },
      { title: "同步暂不做原因", done: false }
    ]
  });

  addDemoCard("solution", "product", {
    title: "形成方案假设与取舍结论",
    description: "把多个方案按用户收益、业务收益、实现成本和风险做对比，明确本轮采用哪一个方案。",
    assignee: "PM",
    category: "方案设计",
    priority: "高",
    color: "blue",
    tags: ["方案", "取舍"],
    estimate: "2.5",
    subtasks: [
      { title: "列出备选方案", done: true },
      { title: "评估成本和风险", done: false },
      { title: "同步方案取舍原因", done: false }
    ]
  });

  addDemoCard("prd", "product", {
    title: "输出 PRD 需求文档",
    description: "沉淀背景、目标、用户故事、流程、页面规则、异常场景和验收标准。",
    assignee: "PM",
    category: "PRD",
    priority: "高",
    color: "blue",
    tags: ["PRD", "规则"],
    estimate: "5",
    subtasks: [
      { title: "补齐需求背景和目标", done: true },
      { title: "写核心业务规则", done: false },
      { title: "写异常和边界场景", done: false }
    ]
  });
  addDemoCard("prd", "product", {
    title: "绘制核心流程与页面原型",
    description: "先画低保真流程，再补关键页面状态，确保研发和测试能理解交互。",
    assignee: "设计",
    category: "原型",
    priority: "高",
    color: "green",
    tags: ["原型", "流程"],
    estimate: "4",
    subtasks: [
      { title: "画主流程", done: true },
      { title: "补空状态和错误状态", done: false },
      { title: "标注关键交互", done: false }
    ]
  });
  addDemoCard("solution", "growth", {
    title: "设计埋点与数据看板口径",
    description: "提前定义上线后要看的激活率、转化率、使用频次和漏斗节点。",
    assignee: "数据",
    category: "数据",
    priority: "中",
    color: "amber",
    tags: ["埋点", "指标"],
    estimate: "3",
    subtasks: [
      { title: "列出关键事件", done: true },
      { title: "定义漏斗口径", done: false }
    ]
  });

  addDemoCard("review", "product", {
    title: "组织产品评审并确认范围",
    description: "让业务、设计、研发、测试一起确认目标、范围、规则和风险。",
    assignee: "PM",
    category: "评审",
    priority: "高",
    color: "blue",
    tags: ["评审", "范围"],
    estimate: "2",
    subtasks: [
      { title: "预约评审会议", done: true },
      { title: "记录评审结论", done: false },
      { title: "同步范围变更", done: false }
    ]
  });
  addDemoCard("planning", "delivery", {
    title: "对接研发技术方案与排期",
    description: "确认接口、数据结构、依赖系统、工期、风险点和灰度方案。",
    assignee: "研发",
    category: "技术评审",
    priority: "高",
    color: "green",
    tags: ["技术方案", "排期"],
    estimate: "3",
    subtasks: [
      { title: "确认接口依赖", done: true },
      { title: "确认研发排期", done: false },
      { title: "识别技术风险", done: false }
    ]
  });
  addDemoCard("planning", "delivery", {
    title: "输出验收标准和测试重点",
    description: "把 PRD 转成测试能执行的验收清单，避免上线前才发现口径不一致。",
    assignee: "测试",
    category: "验收标准",
    priority: "中",
    color: "amber",
    tags: ["验收", "测试"],
    estimate: "2",
    subtasks: [
      { title: "整理主流程用例", done: true },
      { title: "补边界和异常用例", done: false }
    ]
  });

  addDemoCard("dev", "delivery", {
    title: "跟进前端/后端开发进度",
    description: "按里程碑同步开发进度，提前暴露阻塞项，避免临近提测才延期。",
    assignee: "研发",
    category: "研发",
    priority: "高",
    color: "green",
    tags: ["开发", "进度"],
    estimate: "6",
    subtasks: [
      { title: "后端接口开发", done: true },
      { title: "前端页面开发", done: false },
      { title: "异常状态处理", done: false }
    ]
  });
  addDemoCard("dev", "delivery", {
    title: "联调接口与异常场景",
    description: "PM 参与关键路径联调，确认页面表现、接口返回和异常兜底是否符合预期。",
    assignee: "研发",
    category: "联调",
    priority: "高",
    color: "blue",
    tags: ["联调", "异常"],
    estimate: "4",
    subtasks: [
      { title: "联调主路径", done: false },
      { title: "验证错误返回", done: false },
      { title: "记录待修复问题", done: false }
    ]
  });
  addDemoCard("dev", "product", {
    title: "处理研发过程中的需求变更",
    description: "把新增想法、实现限制和临时变更记录成变更单，避免口头承诺失控。",
    assignee: "PM",
    category: "变更管理",
    priority: "中",
    color: "amber",
    tags: ["变更", "范围"],
    estimate: "2",
    subtasks: [
      { title: "记录变更原因", done: false },
      { title: "评估影响范围", done: false }
    ]
  });

  addDemoCard("qa", "delivery", {
    title: "编写测试用例与验收清单",
    description: "测试按主流程、异常流程、权限、兼容性和数据口径拆解用例。",
    assignee: "测试",
    category: "测试",
    priority: "高",
    color: "green",
    tags: ["测试用例", "验收"],
    estimate: "4",
    subtasks: [
      { title: "主流程用例", done: true },
      { title: "异常场景用例", done: false },
      { title: "回归范围确认", done: false }
    ]
  });
  addDemoCard("qa", "delivery", {
    title: "跟进缺陷修复与回归测试",
    description: "按严重程度拆分缺陷，确认阻塞上线的问题优先修复并回归。",
    assignee: "测试",
    category: "缺陷",
    priority: "高",
    color: "rose",
    tags: ["Bug", "回归"],
    estimate: "5",
    subtasks: [
      { title: "标注阻塞缺陷", done: false },
      { title: "跟进修复状态", done: false },
      { title: "完成回归测试", done: false }
    ]
  });
  addDemoCard("qa", "product", {
    title: "PM 走查核心用户路径",
    description: "PM 按真实用户路径走查，确认体验、文案、默认值和边界状态可接受。",
    assignee: "PM",
    category: "验收",
    priority: "高",
    color: "blue",
    tags: ["走查", "体验"],
    estimate: "2",
    subtasks: [
      { title: "走查新用户路径", done: false },
      { title: "确认关键文案", done: false },
      { title: "输出验收结论", done: false }
    ]
  });

  addDemoCard("operate", "growth", {
    title: "准备上线公告与运营素材",
    description: "产出更新说明、帮助文档、运营话术和必要的用户引导素材。",
    assignee: "运营",
    category: "运营",
    priority: "中",
    color: "amber",
    tags: ["公告", "素材"],
    estimate: "3",
    subtasks: [
      { title: "写更新公告", done: false },
      { title: "准备帮助文档", done: false },
      { title: "同步运营话术", done: false }
    ]
  });
  addDemoCard("launch", "delivery", {
    title: "灰度发布与监控关键指标",
    description: "先小流量发布，观察错误率、转化率、反馈量和核心漏斗是否异常。",
    assignee: "研发",
    category: "上线",
    priority: "高",
    color: "green",
    tags: ["灰度", "监控"],
    estimate: "2",
    subtasks: [
      { title: "确认发布窗口", done: false },
      { title: "配置监控指标", done: false },
      { title: "准备回滚方案", done: false }
    ]
  });
  addDemoCard("operate", "growth", {
    title: "同步客服/销售/运营话术",
    description: "让一线团队知道功能变化、适用用户、常见问题和升级路径。",
    assignee: "运营",
    category: "培训",
    priority: "中",
    color: "blue",
    tags: ["培训", "话术"],
    estimate: "2",
    subtasks: [
      { title: "整理 FAQ", done: false },
      { title: "完成内部同步", done: false }
    ]
  });

  addDemoCard("operate", "growth", {
    title: "收集上线后反馈与数据",
    description: "上线后跟踪用户反馈、客服工单、数据看板和异常报警。",
    assignee: "PM",
    category: "反馈",
    priority: "高",
    color: "blue",
    tags: ["反馈", "数据"],
    estimate: "3",
    isClosed: true,
    subtasks: [
      { title: "收集首日反馈", done: true },
      { title: "检查关键漏斗", done: true },
      { title: "记录遗留问题", done: true }
    ]
  });
  addDemoCard("iterate", "growth", {
    title: "复盘版本效果与问题",
    description: "对比上线前目标和上线后数据，明确有效改进、失败假设和下一步动作。",
    assignee: "PM",
    category: "复盘",
    priority: "中",
    color: "gray",
    tags: ["复盘", "指标"],
    estimate: "2.5",
    subtasks: [
      { title: "整理指标变化", done: true },
      { title: "分析未达预期原因", done: false },
      { title: "输出复盘结论", done: false }
    ]
  });
  addDemoCard("iterate", "product", {
    title: "规划下一轮迭代需求",
    description: "把上线后反馈转回需求池，拆出下一轮可执行的优化点。",
    assignee: "PM",
    category: "迭代",
    priority: "中",
    color: "green",
    tags: ["迭代", "需求池"],
    estimate: "2",
    subtasks: [
      { title: "合并重复反馈", done: false },
      { title: "拆分下一轮需求", done: false },
      { title: "同步优先级建议", done: false }
    ]
  });

  const learningProject = createProjectFromTemplate(
    "个人学习计划项目",
    "用待规划、资料学习、案例拆解、实操产出、复盘完善、已掌握推进从 0 开始成为优秀产品经理的学习路线。",
    "learning"
  );

  return {
    activeProjectId: projectId,
    identity: createDefaultIdentity(),
    system: createDefaultSystemConfig(),
    operations: createDefaultOperations(),
    runtime: createDefaultRuntime(),
    deployment: createDefaultDeployment(),
    projects: [
      {
        id: projectId,
        name: "产品开发全流程项目",
        description: "用 Kanboard 复现 PM 从机会提需、需求澄清、方案设计、PRD 原型、评审排期、研发测试、上线运营到复盘迭代的完整周期。",
        createdAt: new Date().toISOString(),
        timeline: {
          plannedStart: "2026-05-20",
          plannedLaunch: "2026-06-11",
          actualStart: "2026-05-20",
          actualLaunch: "",
          phasePlans: Object.fromEntries(columns.map((column) => [column.key, DEFAULT_PHASE_PLAN_DAYS[column.key] ?? 2]))
        },
        files: [
          { id: uid("file"), name: "产品机会池与需求调研摘要.md", type: "Markdown", owner: "PM", createdAt: new Date().toISOString() },
          { id: uid("file"), name: "PRD-v1.0-评审版.pdf", type: "PDF · 2.4MB", owner: "PM", createdAt: new Date().toISOString() },
          { id: uid("file"), name: "上线检查清单.xlsx", type: "Excel", owner: "运营", createdAt: new Date().toISOString() }
        ],
        swimlanes: [laneMain],
        columns
      },
      learningProject
    ]
  };
}

function makeCard(options) {
  const now = new Date().toISOString();
  return {
    id: uid("card"),
    title: options.title,
    description: options.description || "",
    assignee: options.assignee || "",
    category: options.category || "",
    priority: options.priority || "中",
    color: options.color || "blue",
    tags: options.tags || [],
    dueDate: options.dueDate || "",
    estimate: options.estimate || "",
    actualTime: options.actualTime || "",
    schedule: normalizeSchedule(options.schedule),
    timeLogs: options.timeLogs || [],
    attachments: options.attachments || [],
    recurring: options.recurring || { pattern: "", nextDate: "" },
    swimlaneId: options.swimlaneId || "",
    isClosed: Boolean(options.isClosed),
    links: options.links || [],
    subtasks: (options.subtasks || []).map((task) => ({ id: uid("subtask"), title: task.title, done: Boolean(task.done) })),
    comments: options.comments || [],
    activity: [{ id: uid("activity"), text: "创建了任务", createdAt: now }],
    createdAt: now,
    updatedAt: now
  };
}

function normalizeState() {
  if (!state.projects?.length) state = createDemoState();
  state.ui ||= {};
  state.identity = normalizeIdentity(state.identity);
  state.system = normalizeSystemConfig(state.system);
  state.operations = normalizeOperations(state.operations);
  state.runtime = normalizeRuntime(state.runtime);
  state.deployment = normalizeDeployment(state.deployment);
  state.plugins = normalizePlugins(state.plugins);
  state.ui.viewMode ||= "board";
  state.ui.cardMode ||= "expanded";
  state.ui.showClosed ??= false;
  state.ui.hideEmptyColumns ??= true;
  state.ui.columnPickerOpen ??= false;
  state.ui.hiddenColumns ||= {};
  state.projects.forEach((project) => {
    state.ui.hiddenColumns[project.id] ||= [];
    if (!project.swimlanes?.length) {
      project.swimlanes = [{ id: uid("lane"), title: "默认泳道", description: "默认任务分组" }];
    }
    project.files = normalizeProjectFiles(project);
    project.settings = normalizeProjectSettings(project);
    project.timeline = normalizeProjectTimeline(project);
    project.automations = normalizeAutomations(project);
    project.notifications ||= [];
    const fallbackLaneId = project.swimlanes[0].id;
    project.columns ||= [];
    if (!project.columns.length) {
      project.columns = [
        { id: uid("column"), title: "待办", wipLimit: 0, cards: [] },
        { id: uid("column"), title: "进行中", wipLimit: 3, cards: [] },
        { id: uid("column"), title: "已完成", wipLimit: 0, cards: [] }
      ];
    }
    cleanHiddenColumns(project);
    project.columns.forEach((column) => {
      column.cards ||= [];
      column.cards.forEach((card) => {
        card.swimlaneId ||= fallbackLaneId;
        card.subtasks ||= [];
        card.comments ||= [];
        card.activity ||= [];
        card.tags ||= [];
        card.links ||= [];
        card.attachments ||= [];
        card.isClosed ??= false;
        card.actualTime ||= "";
        card.schedule = normalizeSchedule(card.schedule);
        card.timeLogs ||= [];
        card.recurring ||= { pattern: "", nextDate: "" };
      });
    });
  });
  if (!state.projects.some((project) => project.id === state.activeProjectId)) {
    state.activeProjectId = state.projects[0].id;
  }
}

function normalizeSchedule(schedule = {}) {
  return {
    plannedStart: schedule.plannedStart || "",
    plannedEnd: schedule.plannedEnd || "",
    actualStart: schedule.actualStart || "",
    actualEnd: schedule.actualEnd || ""
  };
}

function normalizeIdentity(existing = {}) {
  const fallback = createDefaultIdentity();
  const sourceUsers = existing.users?.length ? existing.users : fallback.users;
  const sourceGroups = existing.groups?.length ? existing.groups : fallback.groups;
  const seenUsernames = new Set();
  const users = sourceUsers
    .filter((user) => user.username || user.name)
    .map((user) => {
      const username = String(user.username || user.name).trim();
      const safeUsername = seenUsernames.has(username) ? `${username}-${seenUsernames.size + 1}` : username;
      seenUsernames.add(safeUsername);
      const twoFactor = Boolean(user.twoFactor ?? user.twofactor_activated);
      return {
        id: user.id || uid("user"),
        username: safeUsername,
        name: user.name || safeUsername,
        email: user.email || "",
        role: APP_ROLES.some((role) => role.value === user.role) ? user.role : "app-user",
        type: USER_TYPES.some((type) => type.value === user.type) ? user.type : (user.is_ldap_user ? "remote" : "local"),
        active: user.active ?? user.is_active !== "0",
        twoFactor,
        apiKeyRequired: user.apiKeyRequired ?? twoFactor,
        externalId: user.externalId || user.external_id || ""
      };
    });
  const validUserIds = new Set(users.map((user) => user.id));
  const seenGroupNames = new Set();
  const groups = sourceGroups
    .filter((group) => group.name)
    .map((group) => {
      const name = String(group.name).trim();
      const safeName = seenGroupNames.has(name) ? `${name}-${seenGroupNames.size + 1}` : name;
      seenGroupNames.add(safeName);
      return {
        id: group.id || uid("group"),
        name: safeName,
        externalId: group.externalId || group.external_id || "",
        memberIds: unique((group.memberIds || []).filter((id) => validUserIds.has(id)))
      };
    });
  return { users, groups };
}

function normalizeSystemConfig(existing = {}) {
  const defaults = createDefaultSystemConfig();
  return {
    api: {
      ...defaults.api,
      ...(existing.api || {}),
      endpoint: existing.api?.endpoint || defaults.api.endpoint,
      applicationUser: existing.api?.applicationUser || defaults.api.applicationUser,
      applicationToken: existing.api?.applicationToken || defaults.api.applicationToken,
      authHeader: existing.api?.authHeader || "",
      requireApiKeyFor2fa: existing.api?.requireApiKeyFor2fa ?? true
    },
    ldap: {
      ...defaults.ldap,
      ...(existing.ldap || {}),
      bindType: ["anonymous", "proxy", "user"].includes(existing.ldap?.bindType) ? existing.ldap.bindType : defaults.ldap.bindType
    },
    reverseProxy: {
      ...defaults.reverseProxy,
      ...(existing.reverseProxy || {}),
      userHeader: existing.reverseProxy?.userHeader || defaults.reverseProxy.userHeader,
      trustedNetworks: existing.reverseProxy && "trustedNetworks" in existing.reverseProxy
        ? existing.reverseProxy.trustedNetworks
        : defaults.reverseProxy.trustedNetworks
    },
    security: {
      ...defaults.security,
      ...(existing.security || {}),
      bruteForceCaptcha: clampNumber(existing.security?.bruteForceCaptcha, 0, 20, defaults.security.bruteForceCaptcha),
      bruteForceLockdown: clampNumber(existing.security?.bruteForceLockdown, 1, 50, defaults.security.bruteForceLockdown),
      lockdownDuration: clampNumber(existing.security?.lockdownDuration, 1, 1440, defaults.security.lockdownDuration)
    }
  };
}

function normalizeOperations(existing = {}) {
  const defaults = createDefaultOperations();
  const existingJobs = existing.jobs?.length ? existing.jobs : defaults.jobs;
  return {
    cron: {
      ...defaults.cron,
      ...(existing.cron || {}),
      mode: ["cli", "url", "windows"].includes(existing.cron?.mode) ? existing.cron.mode : defaults.cron.mode
    },
    worker: {
      ...defaults.worker,
      ...(existing.worker || {}),
      processed: Math.max(0, Number(existing.worker?.processed || 0)),
      failed: Math.max(0, Number(existing.worker?.failed || 0))
    },
    mail: {
      ...defaults.mail,
      ...(existing.mail || {}),
      port: clampNumber(existing.mail?.port, 1, 65535, defaults.mail.port),
      transport: ["smtp", "sendmail", "mail"].includes(existing.mail?.transport) ? existing.mail.transport : defaults.mail.transport,
      encryption: ["", "null", "ssl", "tls"].includes(existing.mail?.encryption) ? existing.mail.encryption : defaults.mail.encryption
    },
    cli: {
      ...defaults.cli,
      ...(existing.cli || {}),
      logs: (existing.cli?.logs || defaults.cli.logs).slice(0, 12)
    },
    jobs: existingJobs.map((job) => ({
      id: job.id || uid("job"),
      name: job.name || "后台任务",
      command: job.command || "job",
      status: ["pending", "running", "done", "failed", "waiting"].includes(job.status) ? job.status : "pending",
      lastRunAt: job.lastRunAt || ""
    }))
  };
}

function normalizeRuntime(existing = {}) {
  const defaults = createDefaultRuntime();
  const driver = DB_DRIVER_OPTIONS.some((option) => option.value === existing.database?.driver)
    ? existing.database.driver
    : defaults.database.driver;
  const extensions = {
    ...defaults.php.extensions,
    ...(existing.php?.extensions || {})
  };
  [...CORE_PHP_EXTENSIONS, ...Object.values(DRIVER_EXTENSION_MAP), ...OPTIONAL_PHP_EXTENSIONS].forEach((extension) => {
    extensions[extension] = Boolean(extensions[extension]);
  });
  return {
    database: {
      ...defaults.database,
      ...(existing.database || {}),
      driver,
      sqlitePath: existing.database?.sqlitePath || defaults.database.sqlitePath,
      host: existing.database?.host || defaults.database.host,
      port: existing.database?.port || "",
      name: existing.database?.name || defaults.database.name,
      username: existing.database?.username || defaults.database.username,
      currentSchemaVersion: clampNumber(existing.database?.currentSchemaVersion, 0, 9999, defaults.database.currentSchemaVersion),
      latestSchemaVersion: clampNumber(existing.database?.latestSchemaVersion, 0, 9999, defaults.database.latestSchemaVersion)
    },
    environment: {
      ...defaults.environment,
      ...(existing.environment || {}),
      phpVersion: existing.environment?.phpVersion || defaults.environment.phpVersion,
      webServer: existing.environment?.webServer || defaults.environment.webServer,
      installMode: ["archive", "git", "docker"].includes(existing.environment?.installMode)
        ? existing.environment.installMode
        : defaults.environment.installMode,
      storageProfile: ["local-small", "docker", "nfs", "high-availability"].includes(existing.environment?.storageProfile)
        ? existing.environment.storageProfile
        : defaults.environment.storageProfile,
      cacheDriver: ["memory", "file"].includes(existing.environment?.cacheDriver)
        ? existing.environment.cacheDriver
        : defaults.environment.cacheDriver
    },
    php: {
      extensions
    },
    upgrade: {
      ...defaults.upgrade,
      ...(existing.upgrade || {}),
      targetVersion: existing.upgrade?.targetVersion || defaults.upgrade.targetVersion
    },
    logs: (existing.logs || defaults.logs).slice(0, 12)
  };
}

function normalizeDeployment(existing = {}) {
  const defaults = createDefaultDeployment();
  const method = DEPLOYMENT_METHODS.some((item) => item.value === existing.install?.method)
    ? existing.install.method
    : defaults.install.method;
  const registry = DOCKER_REGISTRIES.includes(existing.docker?.registry)
    ? existing.docker.registry
    : defaults.docker.registry;
  const webServer = DEPLOYMENT_WEB_SERVERS.includes(existing.access?.webServer)
    ? existing.access.webServer
    : defaults.access.webServer;
  return {
    install: {
      ...defaults.install,
      ...(existing.install || {}),
      method,
      sourceVersion: existing.install?.sourceVersion || defaults.install.sourceVersion,
      installPath: existing.install?.installPath || defaults.install.installPath,
      baseUrl: existing.install?.baseUrl || defaults.install.baseUrl
    },
    docker: {
      ...defaults.docker,
      ...(existing.docker || {}),
      registry,
      imageTag: existing.docker?.imageTag || defaults.docker.imageTag,
      composeProfile: ["sqlite", "mysql", "postgres"].includes(existing.docker?.composeProfile)
        ? existing.docker.composeProfile
        : defaults.docker.composeProfile,
      healthStatus: existing.docker?.healthStatus || defaults.docker.healthStatus
    },
    access: {
      ...defaults.access,
      ...(existing.access || {}),
      webServer,
      subfolder: existing.access?.subfolder || "",
      trustedProxyNetworks: existing.access && "trustedProxyNetworks" in existing.access
        ? existing.access.trustedProxyNetworks
        : defaults.access.trustedProxyNetworks
    },
    logs: (existing.logs || defaults.logs).slice(0, 12)
  };
}

function normalizePlugins(existing = {}) {
  const byId = new Map((existing.catalog || []).map((plugin) => [plugin.id, plugin]));
  DEFAULT_PLUGIN_CATALOG.forEach((plugin) => {
    byId.set(plugin.id, {
      ...plugin,
      ...(byId.get(plugin.id) || {})
    });
  });
  return {
    config: {
      installerEnabled: existing.config?.installerEnabled ?? false,
      directoryWritable: existing.config?.directoryWritable ?? true,
      zipExtensionAvailable: existing.config?.zipExtensionAvailable ?? true,
      apiUrl: existing.config?.apiUrl || "https://kanboard.org/plugins.json"
    },
    catalog: [...byId.values()].map((plugin) => ({
      id: plugin.id,
      name: plugin.name,
      version: plugin.version || plugin.latestVersion || "1.0.0",
      latestVersion: plugin.latestVersion || plugin.version || "1.0.0",
      author: plugin.author || "Unknown",
      description: plugin.description || "",
      status: plugin.status || "available"
    }))
  };
}

function normalizeProjectFiles(project) {
  const existingFiles = (project.files || [])
    .filter((file) => file.name)
    .map((file) => ({
      id: file.id || uid("file"),
      name: file.name,
      type: file.type || "文档",
      owner: file.owner || "未指定",
      createdAt: file.createdAt || new Date().toISOString()
    }));
  if (existingFiles.length) return existingFiles;

  const hasPmWorkflow = project.columns.some((column) => ["intake", "prd", "launch", "iterate"].includes(column.key));
  const hasLearningWorkflow = project.columns.some((column) => ["learn", "practice", "mastered"].includes(column.key));
  const now = new Date().toISOString();
  if (hasPmWorkflow) {
    return [
      { id: uid("file"), name: "产品机会池与需求调研摘要.md", type: "Markdown", owner: "PM", createdAt: now },
      { id: uid("file"), name: "PRD-v1.0-评审版.pdf", type: "PDF · 2.4MB", owner: "PM", createdAt: now },
      { id: uid("file"), name: "上线检查清单.xlsx", type: "Excel", owner: "运营", createdAt: now }
    ];
  }
  if (hasLearningWorkflow) {
    return [
      { id: uid("file"), name: "从0成为优秀产品经理学习路线.md", type: "Markdown", owner: "我", createdAt: now },
      { id: uid("file"), name: "产品作品集素材清单.xlsx", type: "Excel", owner: "我", createdAt: now }
    ];
  }
  return [];
}

function normalizeProjectTimeline(project) {
  const existing = project.timeline || {};
  const hasPmWorkflow = project.columns.some((column) => ["intake", "prd", "launch", "iterate"].includes(column.key));
  const hasLearningWorkflow = project.columns.some((column) => ["learn", "practice", "mastered"].includes(column.key));
  const fallbackDates = hasPmWorkflow
    ? { plannedStart: "2026-05-20", plannedLaunch: "2026-06-11", actualStart: "2026-05-20", actualLaunch: "" }
    : hasLearningWorkflow
      ? { plannedStart: "2026-06-03", plannedLaunch: "2026-07-15", actualStart: "2026-06-03", actualLaunch: "" }
      : { plannedStart: "", plannedLaunch: "", actualStart: "", actualLaunch: "" };
  const phasePlans = { ...(existing.phasePlans || {}) };
  project.columns.forEach((column) => {
    const key = phaseKey(column);
    phasePlans[key] ??= DEFAULT_PHASE_PLAN_DAYS[column.key] ?? DEFAULT_PHASE_PLAN_DAYS[key] ?? 2;
  });
  return {
    plannedStart: existing.plannedStart || fallbackDates.plannedStart,
    plannedLaunch: existing.plannedLaunch || fallbackDates.plannedLaunch,
    actualStart: existing.actualStart || fallbackDates.actualStart,
    actualLaunch: existing.actualLaunch || fallbackDates.actualLaunch,
    phasePlans
  };
}

function phaseKey(column) {
  return column.key || column.title;
}

function normalizeAutomations(project) {
  if (project.automations?.length) return project.automations;
  return [
    {
      id: uid("automation"),
      trigger: "任务即将截止",
      action: "发送通知",
      target: "负责人",
      enabled: true,
      lastRunAt: ""
    },
    {
      id: uid("automation"),
      trigger: "任务被关闭",
      action: "添加评论",
      target: "自动记录完成",
      enabled: true,
      lastRunAt: ""
    }
  ];
}

function normalizeProjectSettings(project) {
  const cards = project.columns?.flatMap((column) => column.cards || []) || [];
  const derivedMembers = unique(cards.map((card) => card.assignee).filter(Boolean));
  const derivedCategories = unique(cards.map((card) => card.category).filter(Boolean));
  const derivedTags = unique(cards.flatMap((card) => card.tags || []));
  const settings = project.settings || {};
  const defaultLaneId = project.swimlanes.some((lane) => lane.id === settings.defaultSwimlaneId)
    ? settings.defaultSwimlaneId
    : project.swimlanes[0].id;
  const hasPmWorkflow = project.columns.some((column) => ["intake", "prd", "launch", "iterate"].includes(column.key));
  const hasLearningWorkflow = project.columns.some((column) => ["learn", "practice", "mastered"].includes(column.key));
  const defaultGroups = hasPmWorkflow
    ? [
      { id: uid("group"), name: "产品研发测试小组", role: "成员" },
      { id: uid("group"), name: "运营观察组", role: "访客" }
    ]
    : hasLearningWorkflow
      ? [{ id: uid("group"), name: "学习搭子", role: "访客" }]
      : [];
  const sourceMembers = settings.members?.length
    ? settings.members
    : derivedMembers.map((name) => ({ id: uid("member"), name, role: name === "PM" ? "管理员" : "成员" }));

  return {
    projectType: settings.projectType || "team",
    permissionMode: settings.permissionMode || (hasLearningWorkflow ? "private" : "team"),
    publicAccessEnabled: settings.publicAccessEnabled ?? settings.permissionMode === "public-readonly",
    publicToken: settings.publicToken || uid("public"),
    defaultSwimlaneId: defaultLaneId,
    disabledSwimlaneIds: (settings.disabledSwimlaneIds || []).filter((id) => project.swimlanes.some((lane) => lane.id === id)),
    members: sourceMembers.map((member) => ({
      id: member.id || uid("member"),
      name: member.name,
      role: member.role || "成员"
    })),
    groups: (settings.groups?.length ? settings.groups : defaultGroups).map((group) => ({
      id: group.id || uid("group"),
      name: group.name,
      role: group.role || "成员"
    })),
    categories: unique([...(settings.categories || []), ...derivedCategories]),
    tags: unique([...(settings.tags || []), ...derivedTags]),
    customFilters: settings.customFilters?.length ? settings.customFilters : [
      { id: uid("filter"), name: "我的高优先级", query: "assignee:PM priority:高 status:open" },
      { id: uid("filter"), name: "临近截止任务", query: "status:open" }
    ]
  };
}

function activeProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0];
}

function allCards(project = activeProject()) {
  return project.columns.flatMap((column) => column.cards.map((card) => ({ ...card, columnId: column.id, columnTitle: column.title })));
}

function render() {
  normalizeState();
  renderProjects();
  renderHeader();
  renderFilters();
  renderMetrics();
  renderViewControls();
  renderBoard();
}

function renderProjects() {
  els.projectList.innerHTML = "";
  state.projects.forEach((project) => {
    const button = document.createElement("button");
    button.className = `project-item ${project.id === state.activeProjectId ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(project.name)}</strong><span>${project.columns.length} 列 · ${project.swimlanes.length} 泳道 · ${allCards(project).length} 任务</span>`;
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
  const project = activeProject();
  const cards = allCards();
  const activeIdentityUsers = state.identity.users
    .filter((user) => user.active)
    .map((user) => user.name || user.username);
  const assignees = unique([...activeIdentityUsers, ...project.settings.members.map((member) => member.name), ...cards.map((card) => card.assignee).filter(Boolean)]);
  const categories = unique([...project.settings.categories, ...cards.map((card) => card.category).filter(Boolean)]);
  fillSelect(els.assigneeFilter, "全部负责人", assignees, els.assigneeFilter.value);
  fillSelect(els.categoryFilter, "全部分类", categories, els.categoryFilter.value);
  fillSelect(els.swimlaneFilter, "全部泳道", enabledSwimlanes(project).map((lane) => lane.title), els.swimlaneFilter.value);
  fillCustomFilters(project);
  fillDatalist(els.memberOptions, assignees);
  fillDatalist(els.categoryOptions, categories);
}

function fillCustomFilters(project) {
  const selected = els.customFilterSelect.value;
  els.customFilterSelect.innerHTML = `<option value="">全部自定义筛选</option>`;
  project.settings.customFilters.forEach((filter) => {
    const option = document.createElement("option");
    option.value = filter.id;
    option.textContent = filter.name;
    els.customFilterSelect.appendChild(option);
  });
  els.customFilterSelect.value = project.settings.customFilters.some((filter) => filter.id === selected) ? selected : "";
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
  const openCards = cards.filter((card) => !card.isClosed);
  const doingColumns = [
    "进行中",
    "开发中",
    "处理中",
    "资料学习",
    "案例拆解",
    "实操产出",
    "复盘完善",
    "需求澄清",
    "方案设计",
    "PRD 原型",
    "评审确认",
    "研发排期",
    "研发实现",
    "测试验收",
    "上线发布",
    "运营反馈",
    "复盘迭代"
  ];
  const doneColumns = ["已完成", "完成", "Done", "已学完", "已掌握"];
  const doing = openCards.filter((card) => doingColumns.includes(card.columnTitle)).length;
  const done = cards.filter((card) => card.isClosed || doneColumns.includes(card.columnTitle)).length;
  const dueSoon = openCards.filter((card) => isDueSoon(card.dueDate)).length;
  els.metricCards.textContent = cards.length;
  els.metricDoing.textContent = doing;
  els.metricDue.textContent = dueSoon;
  els.metricDone.textContent = done;
}

function openAnalyticsDialog() {
  renderAnalyticsDialog();
  els.analyticsDialog.showModal();
}

function renderAnalyticsDialog() {
  const project = activeProject();
  const cards = allCards(project);
  const openCards = cards.filter((card) => !card.isClosed);
  const closedCards = cards.filter((card) => card.isClosed);
  const totalEstimate = sumCards(cards, cardEstimatedHours);
  const totalActual = sumCards(cards, cardActualHours);
  const recurringCount = cards.filter((card) => card.recurring?.pattern).length;
  const unreadCount = project.notifications.filter((item) => !item.read).length;
  const phaseStats = buildPhaseStats(project);
  const risks = buildProjectRisks(project, phaseStats);
  const timelineSummary = buildTimelineSummary(project, phaseStats, risks);

  els.analyticsSummary.innerHTML = [
    ["打开任务", openCards.length],
    ["已关闭", closedCards.length],
    ["预估工时", `${formatHours(totalEstimate)}h`],
    ["实际工时", `${formatHours(totalActual)}h`],
    ["循环任务", recurringCount],
    ["未读通知", unreadCount]
  ].map(([label, value]) => `
    <article class="overview-panel">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `).join("");

  els.analyticsTimelineSummary.innerHTML = timelineSummary.map(([label, value]) => `
    <article class="overview-panel">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `).join("");

  const maxPhaseDays = Math.max(1, ...phaseStats.map((item) => Math.max(item.plannedDays, item.actualDays)));
  els.analyticsPhaseTimeline.innerHTML = phaseStats.map((item) => {
    const width = Math.max(8, Math.round((Math.max(item.actualDays, item.plannedDays) / maxPhaseDays) * 100));
    const varianceText = item.variance > 0 ? `+${item.variance} 天` : item.variance < 0 ? `${item.variance} 天` : "准点";
    return `
      <div class="settings-item phase-item ${item.variance > 0 ? "delayed" : ""}">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>计划 ${item.plannedDays} 天 · 实际 ${item.actualDays || "-"} 天 · ${item.cardCount} 任务 · 超期 ${item.overdueCards}</span>
          <div class="phase-meter" aria-hidden="true"><span style="width: ${width}%"></span></div>
        </div>
        <span class="role-pill">${escapeHtml(varianceText)}</span>
      </div>
    `;
  }).join("");

  els.analyticsRiskList.innerHTML = risks.length
    ? risks.map((risk) => `
      <div class="settings-item analytics-item risk-${risk.level}">
        <strong>${escapeHtml(risk.title)}</strong>
        <span>${escapeHtml(risk.body)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无明显周期风险</div>`;

  els.analyticsColumnBreakdown.innerHTML = project.columns.map((column) => {
    const columnCards = column.cards;
    const open = columnCards.filter((card) => !card.isClosed).length;
    const closed = columnCards.filter((card) => card.isClosed).length;
    return `
      <div class="settings-item analytics-item">
        <strong>${escapeHtml(column.title)}</strong>
        <span>${open} 打开 · ${closed} 关闭</span>
      </div>
    `;
  }).join("");

  const assigneeTime = groupCountsWithSum(cards, (card) => card.assignee || "未分配", cardActualHours);
  els.analyticsTimeBreakdown.innerHTML = assigneeTime.length
    ? assigneeTime.map((item) => `
      <div class="settings-item analytics-item">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${formatHours(item.total)}h 实际 · ${item.count} 任务</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无时间数据</div>`;

  els.analyticsCycleList.innerHTML = cards.slice(0, 6).map((card) => {
    const plannedDays = scheduleDays(card.schedule?.plannedStart, card.schedule?.plannedEnd);
    const actualDays = scheduleDays(card.schedule?.actualStart || card.schedule?.plannedStart, card.schedule?.actualEnd || todayString());
    const delay = cardDelayDays(card);
    return `
      <div class="settings-item analytics-item">
        <strong>${escapeHtml(card.title)}</strong>
        <span>计划 ${plannedDays || "-"} 天 · 实际 ${actualDays || "-"} 天 · ${delay > 0 ? `延期 ${delay} 天` : "未延期"} · ${formatHours(cardEstimatedHours(card))}h 预估</span>
      </div>
    `;
  }).join("") || `<div class="empty-state">暂无任务</div>`;
}

function buildTimelineSummary(project, phaseStats, risks) {
  const timeline = project.timeline || normalizeProjectTimeline(project);
  const plannedDays = scheduleDays(timeline.plannedStart, timeline.plannedLaunch);
  const actualDays = scheduleDays(timeline.actualStart || timeline.plannedStart, timeline.actualLaunch || todayString());
  const overdueCards = phaseStats.reduce((sum, item) => sum + item.overdueCards, 0);
  const activePhase = [...phaseStats].reverse().find((item) => item.openCards > 0)?.title || "暂无活跃阶段";
  return [
    ["计划周期", plannedDays ? `${plannedDays} 天` : "未设置"],
    ["已运行", actualDays ? `${actualDays} 天` : "未开始"],
    ["当前阶段", activePhase],
    ["周期风险", `${risks.length} 项`],
    ["超期任务", `${overdueCards} 张`],
    ["计划上线", timeline.plannedLaunch || "未设置"]
  ];
}

function buildPhaseStats(project) {
  const timeline = project.timeline || normalizeProjectTimeline(project);
  return project.columns.map((column) => {
    const cards = column.cards || [];
    const startedCards = cards.filter((card) => card.schedule?.actualStart || card.schedule?.actualEnd);
    const startDates = startedCards.map((card) => card.schedule.actualStart || card.schedule.plannedStart).filter(Boolean);
    const endDates = startedCards.map((card) => card.schedule.actualEnd || todayString()).filter(Boolean);
    const actualStart = minDateString(startDates);
    const actualEnd = maxDateString(endDates);
    const plannedDays = Number(timeline.phasePlans?.[phaseKey(column)] ?? DEFAULT_PHASE_PLAN_DAYS[column.key] ?? 2);
    const actualDays = actualStart && actualEnd ? scheduleDays(actualStart, actualEnd) : 0;
    const overdueCards = cards.filter((card) => cardDelayDays(card) > 0).length;
    return {
      key: phaseKey(column),
      title: column.title,
      plannedDays,
      actualDays,
      variance: actualDays ? actualDays - plannedDays : 0,
      cardCount: cards.length,
      openCards: cards.filter((card) => !card.isClosed).length,
      overdueCards
    };
  });
}

function buildProjectRisks(project, phaseStats) {
  const risks = [];
  const timeline = project.timeline || normalizeProjectTimeline(project);
  const launchDelay = timeline.plannedLaunch ? dateDelayDays(timeline.plannedLaunch, timeline.actualLaunch || todayString()) : 0;
  if (!timeline.actualLaunch && launchDelay > 0) {
    risks.push({
      level: "high",
      title: "项目上线存在延期风险",
      body: `计划上线日已超过 ${launchDelay} 天，建议先确认阻塞阶段和可降级范围。`
    });
  }
  phaseStats
    .filter((item) => item.variance > 0)
    .slice(0, 4)
    .forEach((item) => {
      risks.push({
        level: item.variance >= 3 ? "high" : "medium",
        title: `${item.title} 阶段超出计划`,
        body: `计划 ${item.plannedDays} 天，当前实际 ${item.actualDays} 天，已超出 ${item.variance} 天。`
      });
    });
  allCards(project)
    .map((card) => ({ card, delay: cardDelayDays(card) }))
    .filter((item) => item.delay > 0)
    .sort((a, b) => b.delay - a.delay)
    .slice(0, 4)
    .forEach(({ card, delay }) => {
      risks.push({
        level: delay >= 3 ? "high" : "medium",
        title: `任务「${card.title}」超期`,
        body: `计划完成日 ${card.schedule.plannedEnd}，已超出 ${delay} 天。`
      });
    });
  return risks.slice(0, 8);
}

function renderViewControls() {
  els.viewButtons.forEach((button) => {
    const isActive = button.dataset.view === state.ui.viewMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  els.cardModeSelect.value = state.ui.cardMode;
  els.showClosedInput.checked = state.ui.showClosed;
  els.hideEmptyColumnsInput.checked = state.ui.hideEmptyColumns;

  const project = activeProject();
  const hiddenIds = hiddenColumnIds(project.id);
  const visibleCount = project.columns.length - hiddenIds.size;
  const hiddenCount = hiddenIds.size;
  els.columnVisibility.innerHTML = `
    <details class="column-picker" ${state.ui.columnPickerOpen ? "open" : ""}>
      <summary>
        <span>
          <strong>列显示</strong>
          <em>${visibleCount}/${project.columns.length} 已显示${hiddenCount ? ` · ${hiddenCount} 已隐藏` : ""}</em>
        </span>
        <span class="column-picker-caret" aria-hidden="true">⌄</span>
      </summary>
      <div class="column-picker-panel">
        <div class="column-picker-actions">
          <button class="secondary-button compact-button" type="button" data-action="show-all-columns">全部显示</button>
          <button class="secondary-button compact-button" type="button" data-action="hide-empty-project-columns">隐藏无任务列</button>
        </div>
        <div class="column-picker-list" role="group" aria-label="选择要显示的列">
          ${project.columns.map((column) => {
            const isVisible = !hiddenIds.has(column.id);
            return `
              <label class="column-picker-option ${isVisible ? "" : "muted"}">
                <input type="checkbox" data-column-id="${column.id}" ${isVisible ? "checked" : ""} ${isVisible && visibleCount === 1 ? "disabled" : ""}>
                <span>
                  <strong>${escapeHtml(column.title)}</strong>
                  <em>${column.cards.length} 张任务</em>
                </span>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    </details>
  `;
  const picker = els.columnVisibility.querySelector(".column-picker");
  picker.addEventListener("toggle", () => {
    state.ui.columnPickerOpen = picker.open;
    persist();
  });
  els.columnVisibility.querySelectorAll(".column-picker-option input").forEach((input) => {
    input.addEventListener("change", () => setColumnVisibility(input.dataset.columnId, input.checked));
  });
  els.columnVisibility.querySelector('[data-action="show-all-columns"]').addEventListener("click", showAllColumns);
  els.columnVisibility.querySelector('[data-action="hide-empty-project-columns"]').addEventListener("click", hideEmptyProjectColumns);
}

function setColumnVisibility(columnId, shouldShow) {
  const project = activeProject();
  const hidden = new Set(state.ui.hiddenColumns[project.id] || []);
  if (shouldShow) {
    hidden.delete(columnId);
  } else if (project.columns.length - hidden.size > 1) {
    hidden.add(columnId);
  }
  state.ui.hiddenColumns[project.id] = [...hidden];
  persist();
  render();
}

function showAllColumns() {
  const project = activeProject();
  state.ui.hiddenColumns[project.id] = [];
  persist();
  render();
}

function hideEmptyProjectColumns() {
  const project = activeProject();
  const emptyColumnIds = project.columns
    .filter((column) => column.cards.length === 0)
    .map((column) => column.id);
  state.ui.hiddenColumns[project.id] = emptyColumnIds.length === project.columns.length ? [] : emptyColumnIds;
  persist();
  render();
}

function toggleColumnVisibility(columnId) {
  const project = activeProject();
  const hidden = new Set(state.ui.hiddenColumns[project.id] || []);
  setColumnVisibility(columnId, hidden.has(columnId));
}

function ensureAtLeastOneVisibleColumn(project, hidden) {
  if (project.columns.length - hidden.size <= 0 && project.columns[0]) {
    hidden.delete(project.columns[0].id);
  }
  return hidden;
}

function cleanHiddenColumns(project) {
  const knownIds = new Set(project.columns.map((column) => column.id));
  const hidden = new Set(state.ui.hiddenColumns[project.id] || []);
  [...hidden].forEach((columnId) => {
    if (!knownIds.has(columnId)) hidden.delete(columnId);
  });
  state.ui.hiddenColumns[project.id] = [...ensureAtLeastOneVisibleColumn(project, hidden)];
}

function setViewMode(viewMode) {
  state.ui.viewMode = viewMode;
  persist();
  render();
}

function setCardMode(cardMode) {
  const nextMode = typeof cardMode === "string" ? cardMode : els.cardModeSelect.value;
  state.ui.cardMode = nextMode;
  els.cardModeSelect.value = nextMode;
  persist();
  render();
}

function toggleClosedVisibility() {
  state.ui.showClosed = els.showClosedInput.checked;
  persist();
  render();
}

function toggleEmptyColumnVisibility() {
  state.ui.hideEmptyColumns = els.hideEmptyColumnsInput.checked;
  persist();
  render();
}

function hiddenColumnIds(projectId = activeProject().id) {
  return new Set(state.ui.hiddenColumns?.[projectId] || []);
}

function visibleColumns(project = activeProject()) {
  const hiddenIds = hiddenColumnIds(project.id);
  return project.columns.filter((column) => !hiddenIds.has(column.id));
}

function visibleCardsInColumnLane(column, lane) {
  return column.cards
    .filter((card) => card.swimlaneId === lane.id)
    .filter((card) => cardMatchesFilters(card, column, lane));
}

function columnsForLane(project, lane) {
  const columns = visibleColumns(project);
  if (!state.ui.hideEmptyColumns) return columns;
  const columnsWithCards = columns.filter((column) => visibleCardsInColumnLane(column, lane).length > 0 || column.cards.length === 0);
  return columnsWithCards.length ? columnsWithCards : columns;
}

function enabledSwimlanes(project = activeProject()) {
  const disabled = new Set(project.settings.disabledSwimlaneIds || []);
  const lanes = project.swimlanes.filter((lane) => !disabled.has(lane.id));
  return lanes.length ? lanes : project.swimlanes.slice(0, 1);
}

function renderBoard() {
  const project = activeProject();
  els.board.innerHTML = "";
  els.board.className = `board view-${state.ui.viewMode} card-mode-${state.ui.cardMode}`;
  closeBoardMenus();
  if (state.ui.viewMode === "list") {
    renderListView(project);
    return;
  }
  if (state.ui.viewMode === "calendar") {
    renderCalendarView(project);
    return;
  }
  if (state.ui.viewMode === "gantt") {
    renderGanttView(project);
    return;
  }
  if (state.ui.viewMode === "overview") {
    renderOverviewView(project);
    return;
  }

  const selectedLaneTitle = els.swimlaneFilter.value;
  const availableSwimlanes = enabledSwimlanes(project);
  const swimlanes = selectedLaneTitle
    ? availableSwimlanes.filter((lane) => lane.title === selectedLaneTitle)
    : availableSwimlanes;

  swimlanes.forEach((lane) => {
    const swimlaneEl = document.createElement("section");
    swimlaneEl.className = "swimlane";
    swimlaneEl.innerHTML = `
      <header class="swimlane-header">
        <div class="swimlane-title">
          <h3>${escapeHtml(lane.title)}</h3>
          <p>${escapeHtml(lane.description || "无说明")}</p>
        </div>
        <button class="secondary-button" type="button" data-action="edit-swimlane">编辑泳道</button>
      </header>
      <div class="swimlane-board"></div>
    `;

    swimlaneEl.querySelector('[data-action="edit-swimlane"]').addEventListener("click", () => openSwimlaneDialog(lane.id));
    const laneBoard = swimlaneEl.querySelector(".swimlane-board");
    columnsForLane(project, lane).forEach((column) => laneBoard.appendChild(createColumnElement(column, lane)));
    els.board.appendChild(swimlaneEl);
  });
}

function filteredCards(project) {
  return allCards(project).filter((card) => {
    const column = project.columns.find((item) => item.id === card.columnId);
    const lane = project.swimlanes.find((item) => item.id === card.swimlaneId);
    return !hiddenColumnIds(project.id).has(card.columnId)
      && !project.settings.disabledSwimlaneIds.includes(card.swimlaneId)
      && cardMatchesFilters(card, column, lane);
  });
}

function renderListView(project) {
  const rows = filteredCards(project);

  const list = document.createElement("section");
  list.className = "list-view";
  list.innerHTML = `
    <div class="list-header">
      <strong>任务</strong>
      <strong>状态</strong>
      <strong>泳道</strong>
      <strong>负责人</strong>
      <strong>优先级</strong>
      <strong>截止</strong>
    </div>
  `;

  if (!rows.length) {
    list.innerHTML += `<div class="empty-state">暂无匹配任务</div>`;
  } else {
    rows.forEach((card) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `list-row ${card.isClosed ? "closed" : ""}`;
      row.innerHTML = `
        <span><strong>${escapeHtml(card.title)}</strong>${card.tags?.length ? `<em>${card.tags.map(escapeHtml).join(" / ")}</em>` : ""}</span>
        <span>${escapeHtml(card.isClosed ? "已关闭" : card.columnTitle)}</span>
        <span>${escapeHtml(project.swimlanes.find((lane) => lane.id === card.swimlaneId)?.title || "默认泳道")}</span>
        <span>${escapeHtml(card.assignee || "-")}</span>
        <span>${escapeHtml(card.priority || "-")}</span>
        <span>${escapeHtml(card.dueDate || "-")}</span>
      `;
      row.addEventListener("click", () => openCardDialog(card.columnId, card.id, card.swimlaneId));
      list.appendChild(row);
    });
  }
  els.board.appendChild(list);
}

function renderCalendarView(project) {
  const cards = filteredCards(project);
  const datedCards = cards
    .map((card) => ({ ...card, calendarDate: card.dueDate || card.schedule?.plannedEnd || card.schedule?.actualEnd || card.createdAt?.slice(0, 10) || "" }))
    .filter((card) => card.calendarDate);
  const baseDate = minDateString(datedCards.map((card) => card.calendarDate)) || todayString();
  const weeks = buildCalendarWeeks(baseDate, datedCards);
  const calendar = document.createElement("section");
  calendar.className = "calendar-view";
  calendar.innerHTML = `
    <div class="view-heading">
      <div>
        <h3>项目日历</h3>
        <p>按任务截止日、计划完成日或创建日展示筛选结果</p>
      </div>
      <span>${datedCards.length} 张有日期任务</span>
    </div>
    <div class="calendar-weekdays">
      ${["一", "二", "三", "四", "五", "六", "日"].map((day) => `<strong>${day}</strong>`).join("")}
    </div>
    <div class="calendar-grid">
      ${weeks.flat().map((day) => {
        const dayCards = datedCards.filter((card) => card.calendarDate === day.date);
        return `
          <article class="calendar-day ${day.isCurrentMonth ? "" : "muted"} ${day.date === todayString() ? "today" : ""}">
            <header>
              <strong>${day.label}</strong>
              ${dayCards.length ? `<span>${dayCards.length}</span>` : ""}
            </header>
            <div>
              ${dayCards.slice(0, 4).map((card) => `
                <button class="calendar-task color-${card.color || "blue"}" type="button" data-column-id="${card.columnId}" data-card-id="${card.id}" data-swimlane-id="${card.swimlaneId}">
                  ${escapeHtml(card.title)}
                </button>
              `).join("")}
              ${dayCards.length > 4 ? `<em>+${dayCards.length - 4} 更多</em>` : ""}
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
  calendar.querySelectorAll(".calendar-task").forEach((button) => {
    button.addEventListener("click", () => openCardDialog(button.dataset.columnId, button.dataset.cardId, button.dataset.swimlaneId));
  });
  els.board.appendChild(calendar);
}

function renderGanttView(project) {
  const cards = filteredCards(project)
    .map((card) => ({
      ...card,
      startDate: card.schedule?.plannedStart || card.createdAt?.slice(0, 10) || "",
      endDate: card.schedule?.plannedEnd || card.dueDate || card.schedule?.actualEnd || card.createdAt?.slice(0, 10) || ""
    }))
    .filter((card) => card.startDate && card.endDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const minDate = minDateString(cards.map((card) => card.startDate)) || todayString();
  const maxDate = maxDateString(cards.map((card) => card.endDate)) || minDate;
  const totalDays = Math.max(scheduleDays(minDate, maxDate), 1);
  const gantt = document.createElement("section");
  gantt.className = "gantt-view";
  gantt.innerHTML = `
    <div class="view-heading">
      <div>
        <h3>项目甘特</h3>
        <p>按计划开始、计划完成和截止日展示任务排期</p>
      </div>
      <span>${minDate} → ${maxDate}</span>
    </div>
    <div class="gantt-scale">
      ${buildGanttTicks(minDate, totalDays).map((tick) => `<span style="left:${tick.left}%">${escapeHtml(tick.label)}</span>`).join("")}
    </div>
    <div class="gantt-list">
      ${cards.length ? cards.map((card) => {
        const offset = Math.max(scheduleDays(minDate, card.startDate) - 1, 0);
        const duration = Math.max(scheduleDays(card.startDate, card.endDate), 1);
        const left = totalDays <= 1 ? 0 : (offset / totalDays) * 100;
        const width = Math.max((duration / totalDays) * 100, 3);
        return `
          <button class="gantt-row" type="button" data-column-id="${card.columnId}" data-card-id="${card.id}" data-swimlane-id="${card.swimlaneId}">
            <span class="gantt-task-title">
              <strong>${escapeHtml(card.title)}</strong>
              <em>${escapeHtml(card.columnTitle)} · ${escapeHtml(card.assignee || "未分配")}</em>
            </span>
            <span class="gantt-track">
              <span class="gantt-bar color-${card.color || "blue"}" style="left:${left}%; width:${Math.min(width, 100 - left)}%">
                ${escapeHtml(card.startDate.slice(5))} - ${escapeHtml(card.endDate.slice(5))}
              </span>
            </span>
          </button>
        `;
      }).join("") : `<div class="empty-state">暂无可排期任务</div>`}
    </div>
  `;
  gantt.querySelectorAll(".gantt-row").forEach((button) => {
    button.addEventListener("click", () => openCardDialog(button.dataset.columnId, button.dataset.cardId, button.dataset.swimlaneId));
  });
  els.board.appendChild(gantt);
}

function renderOverviewView(project) {
  const cards = allCards(project);
  const openCards = cards.filter((card) => !card.isClosed);
  const closedCards = cards.filter((card) => card.isClosed);
  const byColumn = project.columns.map((column) => ({
    title: column.title,
    count: column.cards.filter((card) => !card.isClosed).length,
    closed: column.cards.filter((card) => card.isClosed).length
  }));
  const byAssignee = groupCounts(openCards.map((card) => card.assignee || "未分配"));
  const urgent = openCards.filter((card) => ["高", "紧急"].includes(card.priority)).slice(0, 6);
  const files = project.files || [];
  const settings = project.settings || {};

  const overview = document.createElement("section");
  overview.className = "overview-view";
  overview.innerHTML = `
    <article class="overview-panel">
      <span>打开任务</span>
      <strong>${openCards.length}</strong>
    </article>
    <article class="overview-panel">
      <span>已关闭任务</span>
      <strong>${closedCards.length}</strong>
    </article>
    <article class="overview-panel">
      <span>临近截止</span>
      <strong>${openCards.filter((card) => isDueSoon(card.dueDate)).length}</strong>
    </article>
    <article class="overview-panel">
      <span>高优先级</span>
      <strong>${urgent.length}</strong>
    </article>
    <article class="overview-panel">
      <span>项目文件</span>
      <strong>${files.length}</strong>
    </article>
    <article class="overview-panel">
      <span>成员 / 用户组</span>
      <strong>${(settings.members || []).length} / ${(settings.groups || []).length}</strong>
    </article>
    <article class="overview-panel wide">
      <h3>列分布</h3>
      ${byColumn.map((item) => `
        <div class="overview-line">
          <span>${escapeHtml(item.title)}</span>
          <strong>${item.count} 打开${item.closed ? ` · ${item.closed} 关闭` : ""}</strong>
        </div>
      `).join("")}
    </article>
    <article class="overview-panel wide">
      <h3>负责人分布</h3>
      ${byAssignee.map((item) => `
        <div class="overview-line">
          <span>${escapeHtml(item.label)}</span>
          <strong>${item.count}</strong>
        </div>
      `).join("") || `<div class="empty-state">暂无负责人数据</div>`}
    </article>
    <article class="overview-panel wide">
      <h3>项目文件</h3>
      ${files.length ? files.slice(0, 5).map((file) => `
        <div class="overview-line">
          <span>${escapeHtml(file.name)}</span>
          <strong>${escapeHtml(file.type || "文档")} · ${escapeHtml(file.owner || "未指定")}</strong>
        </div>
      `).join("") : `<div class="empty-state">暂无项目文件</div>`}
    </article>
    <article class="overview-panel wide">
      <h3>访问权限</h3>
      <div class="overview-line">
        <span>访问范围</span>
        <strong>${escapeHtml(accessModeLabel(settings.permissionMode))}</strong>
      </div>
      <div class="overview-line">
        <span>公共订阅</span>
        <strong>${settings.publicAccessEnabled ? "已开启" : "未开启"}</strong>
      </div>
      <div class="overview-line">
        <span>成员权限</span>
        <strong>${permissionRoleSummary(settings.members || [])}</strong>
      </div>
      <div class="overview-line">
        <span>用户组权限</span>
        <strong>${permissionRoleSummary(settings.groups || [])}</strong>
      </div>
    </article>
    <article class="overview-panel full">
      <h3>高优先级任务</h3>
      ${urgent.length ? urgent.map((card) => `
        <button class="overview-task" type="button" data-column-id="${card.columnId}" data-card-id="${card.id}" data-swimlane-id="${card.swimlaneId}">
          <strong>${escapeHtml(card.title)}</strong>
          <span>${escapeHtml(card.columnTitle)} · ${escapeHtml(card.assignee || "未分配")} · ${escapeHtml(card.priority)}</span>
        </button>
      `).join("") : `<div class="empty-state">暂无高优先级任务</div>`}
    </article>
  `;
  overview.querySelectorAll(".overview-task").forEach((button) => {
    button.addEventListener("click", () => openCardDialog(button.dataset.columnId, button.dataset.cardId, button.dataset.swimlaneId));
  });
  els.board.appendChild(overview);
}

function createColumnElement(column, lane) {
  const columnEl = document.createElement("article");
  columnEl.className = "column";
  columnEl.dataset.columnId = column.id;
  columnEl.dataset.swimlaneId = lane.id;

  const cardsInLane = column.cards.filter((card) => card.swimlaneId === lane.id);
  const visibleCards = cardsInLane.filter((card) => cardMatchesFilters(card, column, lane));

  columnEl.innerHTML = `
    <header class="column-header">
      <div class="column-title">
        <strong>${escapeHtml(column.title)}</strong>
        <span>${cardsInLane.length} 任务${column.wipLimit ? ` · WIP ${column.wipLimit}` : ""}</span>
      </div>
      <div class="column-actions">
        <details class="board-menu">
          <summary class="icon-button" aria-label="列菜单">⋯</summary>
          <div class="board-menu-panel">
            <button type="button" data-action="new-card-menu">新增任务</button>
            <button type="button" data-action="edit-column">编辑列</button>
            <button type="button" data-action="hide-column">隐藏此列</button>
          </div>
        </details>
      </div>
    </header>
    <div class="column-body"></div>
    <footer class="column-footer">
      <button class="secondary-button" type="button" data-action="new-card">新增任务</button>
    </footer>
  `;

  const body = columnEl.querySelector(".column-body");
  if (!visibleCards.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "暂无匹配任务";
    body.appendChild(empty);
  } else {
    visibleCards.forEach((card) => body.appendChild(createCardElement(card, column.id, lane.id)));
  }

  columnEl.querySelector(".board-menu summary").addEventListener("click", (event) => event.stopPropagation());
  columnEl.querySelector('[data-action="new-card-menu"]').addEventListener("click", (event) => {
    event.stopPropagation();
    closeBoardMenus();
    openCardDialog(column.id, null, lane.id);
  });
  columnEl.querySelector('[data-action="edit-column"]').addEventListener("click", (event) => {
    event.stopPropagation();
    closeBoardMenus();
    openColumnDialog(column.id);
  });
  columnEl.querySelector('[data-action="hide-column"]').addEventListener("click", (event) => {
    event.stopPropagation();
    closeBoardMenus();
    setColumnVisibility(column.id, false);
  });
  columnEl.querySelector('[data-action="new-card"]').addEventListener("click", () => openCardDialog(column.id, null, lane.id));
  columnEl.addEventListener("dragover", handleColumnDragOver);
  columnEl.addEventListener("dragleave", handleColumnDragLeave);
  columnEl.addEventListener("drop", handleColumnDrop);
  return columnEl;
}

function createCardElement(card, columnId, swimlaneId) {
  const cardEl = document.createElement("article");
  const progress = getSubtaskProgress(card);
  const isCollapsed = state.ui.cardMode === "collapsed";
  const isCompact = state.ui.cardMode === "compact";
  const delayDays = cardDelayDays(card);
  cardEl.className = `card color-${card.color || "blue"} ${card.isClosed ? "closed" : ""}`;
  cardEl.draggable = !card.isClosed;
  cardEl.dataset.cardId = card.id;
  cardEl.dataset.columnId = columnId;
  cardEl.dataset.swimlaneId = swimlaneId;
  cardEl.innerHTML = `
    <div class="card-topline">
      <h4>${escapeHtml(card.title)}${card.isClosed ? `<span class="closed-label">已关闭</span>` : ""}</h4>
      <div class="card-sort">
        <button class="mini-button" type="button" data-action="move-up" aria-label="上移">↑</button>
        <button class="mini-button" type="button" data-action="move-down" aria-label="下移">↓</button>
        <details class="board-menu">
          <summary class="mini-button" aria-label="任务菜单">⋯</summary>
          <div class="board-menu-panel">
            <button type="button" data-action="edit-card">编辑任务</button>
            <button type="button" data-action="duplicate-card">复制任务</button>
            <button type="button" data-action="toggle-card">${card.isClosed ? "重新打开" : "关闭任务"}</button>
          </div>
        </details>
      </div>
    </div>
    ${!isCollapsed && !isCompact && card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
    ${!isCollapsed ? `
      <div class="card-meta">
        ${card.assignee ? `<span class="pill">${escapeHtml(card.assignee)}</span>` : ""}
        ${card.category && !isCompact ? `<span class="pill">${escapeHtml(card.category)}</span>` : ""}
        ${card.priority ? `<span class="pill priority-${priorityClass(card.priority)}">${escapeHtml(card.priority)}</span>` : ""}
        ${card.estimate && !isCompact ? `<span class="pill">${escapeHtml(card.estimate)}h</span>` : ""}
        ${cardActualHours(card) && !isCompact ? `<span class="pill">${formatHours(cardActualHours(card))}h 实际</span>` : ""}
        ${card.recurring?.pattern && !isCompact ? `<span class="pill">循环</span>` : ""}
        ${card.links?.length && !isCompact ? `<span class="pill">${card.links.length} 链接</span>` : ""}
        ${card.attachments?.length && !isCompact ? `<span class="pill">${card.attachments.length} 附件</span>` : ""}
        ${card.dueDate ? `<span class="pill ${isOverdue(card.dueDate) ? "overdue" : ""}">${escapeHtml(card.dueDate)}</span>` : ""}
        ${card.schedule?.plannedEnd && !isCompact ? `<span class="pill ${delayDays > 0 ? "overdue" : ""}">${delayDays > 0 ? `超期 ${delayDays} 天` : `计划 ${escapeHtml(card.schedule.plannedEnd)}`}</span>` : ""}
      </div>
      ${card.tags?.length && !isCompact ? `<div class="tag-row">${card.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      ${card.subtasks?.length ? `<div class="progress-bar" title="子任务 ${progress.done}/${progress.total}"><span style="width: ${progress.percent}%"></span></div>` : ""}
    ` : ""}
  `;

  cardEl.querySelector('[data-action="move-up"]').addEventListener("click", (event) => {
    event.stopPropagation();
    moveCardWithinLane(columnId, card.id, -1);
  });
  cardEl.querySelector('[data-action="move-down"]').addEventListener("click", (event) => {
    event.stopPropagation();
    moveCardWithinLane(columnId, card.id, 1);
  });
  cardEl.querySelector(".board-menu summary").addEventListener("click", (event) => event.stopPropagation());
  cardEl.querySelector('[data-action="edit-card"]').addEventListener("click", (event) => {
    event.stopPropagation();
    closeBoardMenus();
    openCardDialog(columnId, card.id, swimlaneId);
  });
  cardEl.querySelector('[data-action="duplicate-card"]').addEventListener("click", (event) => {
    event.stopPropagation();
    duplicateCardFromBoard(card.id);
  });
  cardEl.querySelector('[data-action="toggle-card"]').addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCardClosedFromBoard(card.id);
  });
  cardEl.addEventListener("click", () => openCardDialog(columnId, card.id, swimlaneId));
  cardEl.addEventListener("dragstart", (event) => {
    draggedCard = { columnId, cardId: card.id, swimlaneId };
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

function cardMatchesFilters(card, column = null, lane = null) {
  if (card.isClosed && !state.ui.showClosed) return false;
  const query = parseSearchQuery(currentSearchQuery());
  const assignee = els.assigneeFilter.value;
  const category = els.categoryFilter.value;
  const laneTitle = lane?.title || "";
  const columnTitle = column?.title || "";
  if (assignee && card.assignee !== assignee) return false;
  if (category && card.category !== category) return false;
  if (query.filters.assignee && card.assignee !== query.filters.assignee) return false;
  if (query.filters.category && card.category !== query.filters.category) return false;
  if (query.filters.priority && card.priority !== query.filters.priority) return false;
  if (query.filters.column && !columnTitle.toLowerCase().includes(query.filters.column.toLowerCase())) return false;
  if (query.filters.lane && !laneTitle.toLowerCase().includes(query.filters.lane.toLowerCase())) return false;
  if (query.filters.tag && !(card.tags || []).some((tag) => tag.toLowerCase().includes(query.filters.tag.toLowerCase()))) return false;
  if (query.filters.status === "closed" && !card.isClosed) return false;
  if (query.filters.status === "open" && card.isClosed) return false;

  const text = [
    card.title,
    card.description,
    card.assignee,
    card.category,
    card.priority,
    columnTitle,
    laneTitle,
    ...(card.tags || []),
    ...(card.links || []).map((link) => `${link.type} ${link.targetTitle}`)
  ].join(" ").toLowerCase();
  return query.terms.every((term) => text.includes(term.toLowerCase()));
}

function currentSearchQuery() {
  const project = activeProject();
  const customFilter = project.settings.customFilters.find((filter) => filter.id === els.customFilterSelect.value);
  return [els.searchInput.value, customFilter?.query].filter(Boolean).join(" ");
}

function parseSearchQuery(raw) {
  const result = { terms: [], filters: {} };
  raw.trim().split(/\s+/).filter(Boolean).forEach((token) => {
    const match = token.match(/^([a-zA-Z]+):(.+)$/);
    if (!match) {
      result.terms.push(token);
      return;
    }
    const keyMap = {
      assignee: "assignee",
      user: "assignee",
      category: "category",
      cat: "category",
      tag: "tag",
      priority: "priority",
      column: "column",
      lane: "lane",
      swimlane: "lane",
      status: "status"
    };
    const key = keyMap[match[1].toLowerCase()];
    if (key) result.filters[key] = match[2];
  });
  return result;
}

function openProjectDialog(projectId = null) {
  editingProjectId = projectId;
  const project = projectId ? state.projects.find((item) => item.id === projectId) : null;
  els.projectDialogTitle.textContent = project ? "编辑项目" : "新建项目";
  els.projectNameInput.value = project?.name || "";
  els.projectDescInput.value = project?.description || "";
  els.projectCreateOptions.style.display = project ? "none" : "grid";
  els.saveProjectBtn.textContent = project ? "保存" : "创建项目";
  if (!project) {
    selectedTemplateId = PROJECT_TEMPLATES[0].id;
    els.projectModeInputs.forEach((input) => {
      input.checked = input.value === "template";
    });
    renderProjectCreateOptions();
  }
  els.projectDialog.showModal();
  els.projectNameInput.focus();
}

function selectedProjectMode() {
  return els.projectModeInputs.find((input) => input.checked)?.value || "template";
}

function renderProjectCreateOptions() {
  const isTemplateMode = selectedProjectMode() === "template";
  els.templateArea.style.display = isTemplateMode ? "grid" : "none";
  if (!isTemplateMode) return;

  renderTemplatePicker();
  renderTemplatePreview();
}

function renderTemplatePicker() {
  els.templatePicker.innerHTML = "";
  PROJECT_TEMPLATES.forEach((template) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `template-option ${template.id === selectedTemplateId ? "active" : ""}`;
    button.setAttribute("aria-pressed", template.id === selectedTemplateId ? "true" : "false");
    button.innerHTML = `
      <strong>${escapeHtml(template.name)}</strong>
      <span>${template.columns.length} 列 · ${template.swimlanes.length} 泳道 · ${template.cards.length} 张示例卡</span>
    `;
    button.addEventListener("click", () => {
      selectedTemplateId = template.id;
      renderTemplatePicker();
      renderTemplatePreview();
    });
    els.templatePicker.appendChild(button);
  });
}

function renderTemplatePreview() {
  const template = PROJECT_TEMPLATES.find((item) => item.id === selectedTemplateId) || PROJECT_TEMPLATES[0];
  const columnPreview = template.columns.map((column) => column.title).join(" → ");
  const lanePreview = template.swimlanes.map((lane) => lane.title).join(" / ");
  const cardPreview = template.cards.slice(0, 4).map((card) => card.title).join(" / ");

  els.templatePreview.innerHTML = `
    <h4>${escapeHtml(template.name)}</h4>
    <p>${escapeHtml(template.description)}</p>
    <div class="preview-grid">
      <div class="preview-box">
        <strong>看板列</strong>
        <span>${escapeHtml(columnPreview)}</span>
      </div>
      <div class="preview-box">
        <strong>泳道</strong>
        <span>${escapeHtml(lanePreview)}</span>
      </div>
      <div class="preview-box">
        <strong>示例任务</strong>
        <span>${escapeHtml(cardPreview)}</span>
      </div>
    </div>
  `;
}

function createBlankProject(name, description) {
  const lane = { id: uid("lane"), title: "默认泳道", description: "默认任务分组" };
  const project = {
    id: uid("project"),
    name,
    description,
    createdAt: new Date().toISOString(),
    swimlanes: [lane],
    columns: [
      { id: uid("column"), key: "todo", title: "待办", wipLimit: 0, cards: [] },
      { id: uid("column"), key: "doing", title: "进行中", wipLimit: 3, cards: [] },
      { id: uid("column"), key: "done", title: "已完成", wipLimit: 0, cards: [] }
    ]
  };
  project.timeline = normalizeProjectTimeline(project);
  return project;
}

function createProjectFromTemplate(name, description, templateId) {
  const template = PROJECT_TEMPLATES.find((item) => item.id === templateId) || PROJECT_TEMPLATES[0];
  const lanes = template.swimlanes.map((lane) => ({
    id: uid("lane"),
    title: lane.title,
    description: lane.description
  }));
  const laneByKey = new Map(template.swimlanes.map((lane, index) => [lane.key, lanes[index]]));
  const columns = template.columns.map((column) => ({
    id: uid("column"),
    key: column.key,
    title: column.title,
    wipLimit: column.wipLimit || 0,
    cards: []
  }));
  const columnByKey = new Map(template.columns.map((column, index) => [column.key, columns[index]]));

  template.cards.forEach((templateCard) => {
    const column = columnByKey.get(templateCard.column) || columns[0];
    const lane = laneByKey.get(templateCard.swimlane) || lanes[0];
    const card = makeCard({
      ...clone(templateCard),
      swimlaneId: lane.id
    });
    card.activity = addActivity(card.activity, `由「${template.name}」模板生成`);
    column.cards.push(card);
  });

  const project = {
    id: uid("project"),
    name,
    description: description || template.description,
    createdAt: new Date().toISOString(),
    swimlanes: lanes,
    columns
  };
  project.timeline = normalizeProjectTimeline(project);
  return project;
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
    const mode = selectedProjectMode();
    const project = mode === "template"
      ? createProjectFromTemplate(name, els.projectDescInput.value.trim(), selectedTemplateId)
      : createBlankProject(name, els.projectDescInput.value.trim());
    state.projects.push(project);
    state.activeProjectId = project.id;
  }

  editingProjectId = null;
  els.projectDialog.close();
  persist();
  render();
}

function openProjectSettingsDialog() {
  const project = activeProject();
  draftProjectSettings = {
    ...clone(project.settings),
    swimlanes: clone(project.swimlanes),
    files: clone(project.files || [])
  };
  els.settingsProjectTypeInput.value = draftProjectSettings.projectType;
  els.settingsAccessModeInput.value = draftProjectSettings.permissionMode;
  els.settingsPublicAccessInput.checked = Boolean(draftProjectSettings.publicAccessEnabled);
  els.settingsPlannedStartInput.value = project.timeline?.plannedStart || "";
  els.settingsPlannedLaunchInput.value = project.timeline?.plannedLaunch || "";
  els.settingsActualStartInput.value = project.timeline?.actualStart || "";
  els.settingsActualLaunchInput.value = project.timeline?.actualLaunch || "";
  renderProjectSettings();
  els.projectSettingsDialog.showModal();
}

function saveProjectSettings(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const project = activeProject();
  const { swimlanes, files, ...settings } = draftProjectSettings;
  project.swimlanes = swimlanes;
  project.files = files;
  project.settings = {
    ...settings,
    projectType: els.settingsProjectTypeInput.value,
    permissionMode: els.settingsAccessModeInput.value,
    publicAccessEnabled: els.settingsPublicAccessInput.checked,
    defaultSwimlaneId: els.settingsDefaultSwimlaneInput.value
  };
  project.timeline = normalizeProjectTimeline({
    ...project,
    timeline: {
      ...(project.timeline || {}),
      plannedStart: els.settingsPlannedStartInput.value,
      plannedLaunch: els.settingsPlannedLaunchInput.value,
      actualStart: els.settingsActualStartInput.value,
      actualLaunch: els.settingsActualLaunchInput.value
    }
  });
  draftProjectSettings = null;
  els.projectSettingsDialog.close();
  persist();
  render();
}

function renderProjectSettings() {
  if (!draftProjectSettings) return;
  els.settingsDefaultSwimlaneInput.innerHTML = draftProjectSettings.swimlanes
    .map((lane) => `<option value="${lane.id}">${escapeHtml(lane.title)}</option>`)
    .join("");
  els.settingsDefaultSwimlaneInput.value = draftProjectSettings.defaultSwimlaneId;
  els.settingsDefaultSwimlaneInput.onchange = () => {
    draftProjectSettings.defaultSwimlaneId = els.settingsDefaultSwimlaneInput.value;
    draftProjectSettings.disabledSwimlaneIds = draftProjectSettings.disabledSwimlaneIds.filter((id) => id !== draftProjectSettings.defaultSwimlaneId);
    renderProjectSettings();
  };
  renderMemberSettings();
  renderProjectFileSettings();
  renderGroupSettings();
  renderSimpleSettingList(els.categoryList, draftProjectSettings.categories, "category");
  renderSimpleSettingList(els.tagList, draftProjectSettings.tags, "tag");
  renderCustomFilterSettings();
  renderSwimlaneSettings();
}

function renderProjectFileSettings() {
  els.projectFileList.innerHTML = draftProjectSettings.files.length
    ? draftProjectSettings.files.map((file) => `
      <div class="settings-item project-file-item" data-id="${file.id}">
        <div>
          <strong>${escapeHtml(file.name)}</strong>
          <span>${escapeHtml(file.type || "文档")} · ${escapeHtml(file.owner || "未指定")} · ${formatTime(file.createdAt)}</span>
        </div>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除文件">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无项目文件</div>`;

  els.projectFileList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      draftProjectSettings.files = draftProjectSettings.files.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderMemberSettings() {
  els.memberList.innerHTML = draftProjectSettings.members.length
    ? draftProjectSettings.members.map((member) => `
      <div class="settings-item" data-id="${member.id}">
        <strong>${escapeHtml(member.name)}</strong>
        <select data-action="role">
          ${["管理员", "成员", "访客"].map((role) => `<option value="${role}" ${member.role === role ? "selected" : ""}>${role}</option>`).join("")}
        </select>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除成员">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无成员</div>`;

  els.memberList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="role"]').addEventListener("change", (event) => {
      const member = draftProjectSettings.members.find((item) => item.id === row.dataset.id);
      member.role = event.target.value;
    });
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      draftProjectSettings.members = draftProjectSettings.members.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderGroupSettings() {
  els.groupList.innerHTML = draftProjectSettings.groups.length
    ? draftProjectSettings.groups.map((group) => `
      <div class="settings-item permission-item" data-id="${group.id}">
        <strong>${escapeHtml(group.name)}</strong>
        <select data-action="role">
          ${["管理员", "成员", "访客"].map((role) => `<option value="${role}" ${group.role === role ? "selected" : ""}>${role}</option>`).join("")}
        </select>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除用户组">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无用户组权限</div>`;

  els.groupList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="role"]').addEventListener("change", (event) => {
      const group = draftProjectSettings.groups.find((item) => item.id === row.dataset.id);
      group.role = event.target.value;
    });
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      draftProjectSettings.groups = draftProjectSettings.groups.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderSimpleSettingList(container, values, type) {
  container.innerHTML = values.length
    ? values.map((value) => `
      <div class="settings-item" data-value="${escapeHtml(value)}">
        <strong>${escapeHtml(value)}</strong>
        <button class="mini-button" type="button" aria-label="删除">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无${type === "category" ? "分类" : "标签"}</div>`;

  container.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      const target = row.dataset.value;
      if (type === "category") {
        draftProjectSettings.categories = draftProjectSettings.categories.filter((item) => item !== target);
      } else {
        draftProjectSettings.tags = draftProjectSettings.tags.filter((item) => item !== target);
      }
      renderProjectSettings();
    });
  });
}

function renderCustomFilterSettings() {
  els.customFilterList.innerHTML = draftProjectSettings.customFilters.length
    ? draftProjectSettings.customFilters.map((filter) => `
      <div class="settings-item filter-item" data-id="${filter.id}">
        <strong>${escapeHtml(filter.name)}</strong>
        <span>${escapeHtml(filter.query)}</span>
        <button class="mini-button" type="button" aria-label="删除筛选">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无自定义筛选</div>`;

  els.customFilterList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftProjectSettings.customFilters = draftProjectSettings.customFilters.filter((item) => item.id !== row.dataset.id);
      renderProjectSettings();
    });
  });
}

function renderSwimlaneSettings() {
  const disabled = new Set(draftProjectSettings.disabledSwimlaneIds);
  els.settingsSwimlaneList.innerHTML = draftProjectSettings.swimlanes.map((lane, index) => `
    <div class="settings-item swimlane-setting" data-id="${lane.id}">
      <div>
        <strong>${escapeHtml(lane.title)}</strong>
        <span>${escapeHtml(lane.description || "无说明")}</span>
      </div>
      <span class="role-pill">${draftProjectSettings.defaultSwimlaneId === lane.id ? "默认" : disabled.has(lane.id) ? "已禁用" : "启用"}</span>
      <button class="mini-button" type="button" data-action="up" aria-label="上移" ${index === 0 ? "disabled" : ""}>↑</button>
      <button class="mini-button" type="button" data-action="down" aria-label="下移" ${index === draftProjectSettings.swimlanes.length - 1 ? "disabled" : ""}>↓</button>
      <button class="secondary-button" type="button" data-action="toggle">${disabled.has(lane.id) ? "启用" : "禁用"}</button>
    </div>
  `).join("");

  els.settingsSwimlaneList.querySelectorAll(".settings-item").forEach((row) => {
    row.querySelector('[data-action="up"]').addEventListener("click", () => moveDraftSwimlane(row.dataset.id, -1));
    row.querySelector('[data-action="down"]').addEventListener("click", () => moveDraftSwimlane(row.dataset.id, 1));
    row.querySelector('[data-action="toggle"]').addEventListener("click", () => toggleDraftSwimlane(row.dataset.id));
  });
}

function addDraftProjectFile() {
  const name = els.projectFileNameInput.value.trim();
  if (!name || draftProjectSettings.files.some((file) => file.name === name)) return;
  draftProjectSettings.files.unshift({
    id: uid("file"),
    name,
    type: els.projectFileMetaInput.value.trim() || "文档",
    owner: els.projectFileOwnerInput.value.trim() || "未指定",
    createdAt: new Date().toISOString()
  });
  els.projectFileNameInput.value = "";
  els.projectFileMetaInput.value = "";
  els.projectFileOwnerInput.value = "";
  renderProjectSettings();
}

function addDraftMember() {
  const name = els.memberNameInput.value.trim();
  if (!name || draftProjectSettings.members.some((member) => member.name === name)) return;
  draftProjectSettings.members.push({ id: uid("member"), name, role: els.memberRoleInput.value });
  els.memberNameInput.value = "";
  renderProjectSettings();
}

function addDraftGroup() {
  const name = els.groupNameInput.value.trim();
  if (!name || draftProjectSettings.groups.some((group) => group.name === name)) return;
  draftProjectSettings.groups.push({ id: uid("group"), name, role: els.groupRoleInput.value });
  els.groupNameInput.value = "";
  renderProjectSettings();
}

function addDraftCategory() {
  const value = els.categoryNameInput.value.trim();
  if (!value || draftProjectSettings.categories.includes(value)) return;
  draftProjectSettings.categories.push(value);
  draftProjectSettings.categories = unique(draftProjectSettings.categories);
  els.categoryNameInput.value = "";
  renderProjectSettings();
}

function addDraftTag() {
  const value = els.tagNameInput.value.trim();
  if (!value || draftProjectSettings.tags.includes(value)) return;
  draftProjectSettings.tags.push(value);
  draftProjectSettings.tags = unique(draftProjectSettings.tags);
  els.tagNameInput.value = "";
  renderProjectSettings();
}

function addDraftCustomFilter() {
  const name = els.filterNameInput.value.trim();
  const query = els.filterQueryInput.value.trim();
  if (!name || !query) return;
  draftProjectSettings.customFilters.push({ id: uid("filter"), name, query });
  els.filterNameInput.value = "";
  els.filterQueryInput.value = "";
  renderProjectSettings();
}

function moveDraftSwimlane(swimlaneId, direction) {
  const index = draftProjectSettings.swimlanes.findIndex((lane) => lane.id === swimlaneId);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= draftProjectSettings.swimlanes.length) return;
  [draftProjectSettings.swimlanes[index], draftProjectSettings.swimlanes[nextIndex]] = [draftProjectSettings.swimlanes[nextIndex], draftProjectSettings.swimlanes[index]];
  renderProjectSettings();
}

function toggleDraftSwimlane(swimlaneId) {
  if (draftProjectSettings.defaultSwimlaneId === swimlaneId) {
    alert("默认泳道不能禁用。");
    return;
  }
  const disabled = new Set(draftProjectSettings.disabledSwimlaneIds);
  if (disabled.has(swimlaneId)) {
    disabled.delete(swimlaneId);
  } else {
    const enabledCount = draftProjectSettings.swimlanes.filter((lane) => !disabled.has(lane.id)).length;
    if (enabledCount <= 1) {
      alert("至少保留一个启用泳道。");
      return;
    }
    disabled.add(swimlaneId);
  }
  draftProjectSettings.disabledSwimlaneIds = [...disabled];
  renderProjectSettings();
}

function openAutomationDialog() {
  renderAutomationList();
  els.automationDialog.showModal();
}

function openActivityDialog() {
  renderProjectActivity();
  els.activityDialog.showModal();
}

function renderProjectActivity() {
  const project = activeProject();
  const activities = buildProjectActivity(project);
  els.activitySummary.textContent = `${activities.length} 条`;
  els.projectActivityList.innerHTML = activities.length
    ? activities.slice(0, 40).map((item) => `
      <button class="settings-item project-activity-item" type="button" data-card-id="${item.cardId || ""}">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.body)}</span>
        </div>
        <em>${formatTime(item.createdAt)}</em>
      </button>
    `).join("")
    : `<div class="empty-state">暂无项目活动</div>`;
  els.projectActivityList.querySelectorAll(".project-activity-item").forEach((row) => {
    row.addEventListener("click", () => {
      const context = findCardContext(row.dataset.cardId);
      if (!context) return;
      els.activityDialog.close();
      openCardDialog(context.column.id, context.card.id, context.card.swimlaneId);
    });
  });
}

function buildProjectActivity(project) {
  const items = [];
  allCards(project).forEach((card) => {
    (card.activity || []).forEach((entry) => {
      items.push({
        cardId: card.id,
        title: card.title,
        body: entry.text,
        createdAt: entry.createdAt
      });
    });
    (card.comments || []).forEach((comment) => {
      items.push({
        cardId: card.id,
        title: card.title,
        body: `${comment.author || "我"} 评论：${comment.text}`,
        createdAt: comment.createdAt
      });
    });
    (card.timeLogs || []).forEach((entry) => {
      items.push({
        cardId: card.id,
        title: card.title,
        body: `记录耗时 ${formatHours(entry.hours)}h：${entry.note}`,
        createdAt: entry.createdAt
      });
    });
    (card.attachments || []).forEach((attachment) => {
      items.push({
        cardId: card.id,
        title: card.title,
        body: `附件：${attachment.name}（${attachment.meta || "附件"}）`,
        createdAt: attachment.createdAt
      });
    });
  });
  (project.notifications || []).forEach((notification) => {
    items.push({
      title: notification.title,
      body: notification.body,
      createdAt: notification.createdAt
    });
  });
  (project.files || []).forEach((file) => {
    items.push({
      title: project.name,
      body: `项目文件：${file.name}（${file.type || "文档"}）`,
      createdAt: file.createdAt
    });
  });
  return items
    .filter((item) => item.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function openShortcutsDialog() {
  els.shortcutsDialog.showModal();
}

function setShortcutPrefix(prefix) {
  shortcutPrefix = prefix;
  if (shortcutPrefixTimer) clearTimeout(shortcutPrefixTimer);
  shortcutPrefixTimer = setTimeout(() => {
    shortcutPrefix = "";
    shortcutPrefixTimer = null;
  }, 1200);
}

function clearShortcutPrefix() {
  shortcutPrefix = "";
  if (shortcutPrefixTimer) {
    clearTimeout(shortcutPrefixTimer);
    shortcutPrefixTimer = null;
  }
}

function handleKeyboardShortcuts(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const target = event.target;
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
  if (event.key === "?" && !isTyping) {
    event.preventDefault();
    clearShortcutPrefix();
    openShortcutsDialog();
    return;
  }
  if (isTyping) return;
  const key = event.key.toLowerCase();

  if (shortcutPrefix === "v") {
    const viewByKey = {
      b: "board",
      c: "calendar",
      l: "list",
      g: "gantt",
      o: "overview"
    };
    clearShortcutPrefix();
    if (viewByKey[key]) {
      event.preventDefault();
      setViewMode(viewByKey[key]);
    }
    return;
  }

  if (key === "v") {
    event.preventDefault();
    setShortcutPrefix("v");
    return;
  }
  if (key === "f") {
    event.preventDefault();
    clearShortcutPrefix();
    els.searchInput.focus();
    return;
  }
  if (key === "r") {
    event.preventDefault();
    clearShortcutPrefix();
    els.searchInput.value = "";
    renderBoard();
    return;
  }
  if (key === "s") {
    event.preventDefault();
    clearShortcutPrefix();
    setCardMode(state.ui.cardMode === "collapsed" ? "expanded" : "collapsed");
    return;
  }
  if (key === "c") {
    event.preventDefault();
    clearShortcutPrefix();
    setCardMode(state.ui.cardMode === "compact" ? "expanded" : "compact");
    return;
  }
  if (key === "n") {
    const project = activeProject();
    const column = visibleColumns(project)[0] || project.columns[0];
    const lane = enabledSwimlanes(project)[0] || project.swimlanes[0];
    if (column && lane) {
      event.preventDefault();
      clearShortcutPrefix();
      openCardDialog(column.id, null, lane.id);
    }
    return;
  }
  clearShortcutPrefix();
}

function saveAutomationDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  els.automationDialog.close();
  persist();
  render();
}

function renderAutomationList() {
  const project = activeProject();
  els.automationList.innerHTML = project.automations.length
    ? project.automations.map((rule) => `
      <div class="settings-item automation-item" data-id="${rule.id}">
        <div>
          <strong>${escapeHtml(rule.trigger)} → ${escapeHtml(rule.action)}</strong>
          <span>${escapeHtml(rule.target || "无目标")}${rule.lastRunAt ? ` · 上次执行 ${formatTime(rule.lastRunAt)}` : ""}</span>
        </div>
        <span class="role-pill">${rule.enabled ? "启用" : "停用"}</span>
        <button class="secondary-button" type="button" data-action="toggle">${rule.enabled ? "停用" : "启用"}</button>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除规则">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无自动化规则</div>`;

  els.automationList.querySelectorAll(".automation-item").forEach((row) => {
    row.querySelector('[data-action="toggle"]').addEventListener("click", () => {
      const rule = project.automations.find((item) => item.id === row.dataset.id);
      rule.enabled = !rule.enabled;
      renderAutomationList();
    });
    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      project.automations = project.automations.filter((item) => item.id !== row.dataset.id);
      renderAutomationList();
    });
  });
}

function addAutomationRule() {
  const project = activeProject();
  project.automations.push({
    id: uid("automation"),
    trigger: els.automationTriggerInput.value,
    action: els.automationActionInput.value,
    target: els.automationTargetInput.value.trim(),
    enabled: true,
    lastRunAt: ""
  });
  els.automationTargetInput.value = "";
  renderAutomationList();
}

function runAutomationSimulation() {
  const project = activeProject();
  const now = new Date().toISOString();
  const enabledRules = project.automations.filter((rule) => rule.enabled);
  enabledRules.forEach((rule) => {
    rule.lastRunAt = now;
  });
  if (enabledRules.length) {
    project.notifications.unshift({
      id: uid("notification"),
      title: "自动化规则已模拟执行",
      body: `执行 ${enabledRules.length} 条规则，生成静态通知记录。`,
      read: false,
      createdAt: now
    });
  }
  persist();
  renderAutomationList();
}

function openNotificationsDialog() {
  renderNotifications();
  els.notificationsDialog.showModal();
}

function renderNotifications() {
  const project = activeProject();
  els.notificationList.innerHTML = project.notifications.length
    ? project.notifications.map((item) => `
      <div class="settings-item notification-item ${item.read ? "read" : ""}">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.body)} · ${formatTime(item.createdAt)}</span>
        </div>
        <span class="role-pill">${item.read ? "已读" : "未读"}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无通知</div>`;
}

function markNotificationsRead() {
  const project = activeProject();
  project.notifications.forEach((item) => {
    item.read = true;
  });
  persist();
  renderNotifications();
}

function openSubscriptionsDialog() {
  renderSubscriptions();
  els.subscriptionsDialog.showModal();
}

function renderSubscriptions() {
  const project = activeProject();
  const settings = project.settings || {};
  const enabled = Boolean(settings.publicAccessEnabled);
  const links = buildSubscriptionLinks(project);
  const scheduledCards = allCards(project).filter((card) => card.dueDate || card.schedule?.plannedEnd || card.schedule?.actualEnd);
  const activityItems = buildProjectActivity(project);
  els.subscriptionSummary.innerHTML = `
    <div class="analytics-card">
      <span>公共访问</span>
      <strong>${enabled ? "已开启" : "未开启"}</strong>
    </div>
    <div class="analytics-card">
      <span>iCal 任务</span>
      <strong>${scheduledCards.length}</strong>
    </div>
    <div class="analytics-card">
      <span>RSS 活动</span>
      <strong>${activityItems.length}</strong>
    </div>
    <div class="analytics-card">
      <span>访问 token</span>
      <strong>${enabled ? "已生成" : "未公开"}</strong>
    </div>
  `;
  els.icalFeedInput.value = enabled ? links.ical : "需要在项目设置中开启公共访问与订阅";
  els.rssFeedInput.value = enabled ? links.rss : "需要在项目设置中开启公共访问与订阅";
  els.copyIcalBtn.disabled = !enabled;
  els.copyRssBtn.disabled = !enabled;
  els.subscriptionStatus.textContent = enabled
    ? "订阅链接为静态模拟地址，用于表达 Kanboard 的公共访问订阅机制。"
    : "公共访问关闭时，iCalendar 和 RSS/Atom 订阅不可用。";
  els.subscriptionPreviewSummary.textContent = `${Math.min(activityItems.length, 5)} 项`;
  els.subscriptionPreviewList.innerHTML = activityItems.length
    ? activityItems.slice(0, 5).map((item) => `
      <div class="settings-item subscription-preview-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.body)} · ${formatTime(item.createdAt)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="empty-state">暂无可订阅活动</div>`;
}

function copySubscriptionLink(type) {
  const input = type === "ical" ? els.icalFeedInput : els.rssFeedInput;
  input.focus();
  input.select();
  els.subscriptionStatus.textContent = `${type === "ical" ? "iCalendar" : "RSS/Atom"} 链接已选中，可直接复制。`;
}

function buildSubscriptionLinks(project) {
  const token = project.settings?.publicToken || "public-token";
  const projectSlug = encodeURIComponent(project.name.replace(/\s+/g, "-").toLowerCase());
  const base = `https://kanboard.local/public/${projectSlug}/${token}`;
  return {
    ical: `${base}/calendar.ics`,
    rss: `${base}/activity.atom`
  };
}

function openImportExportDialog() {
  draftImportProject = null;
  els.importJsonInput.value = "";
  els.importProjectBtn.disabled = true;
  renderImportExportSummary();
  generateExportPreview();
  els.importExportDialog.showModal();
}

function renderImportExportSummary() {
  const project = activeProject();
  const cards = allCards(project);
  const subtasks = cards.flatMap((card) => card.subtasks || []);
  els.importExportSummary.innerHTML = `
    <div class="analytics-card">
      <span>导出项目</span>
      <strong>${escapeHtml(project.name)}</strong>
    </div>
    <div class="analytics-card">
      <span>任务</span>
      <strong>${cards.length}</strong>
    </div>
    <div class="analytics-card">
      <span>子任务</span>
      <strong>${subtasks.length}</strong>
    </div>
    <div class="analytics-card">
      <span>项目文件</span>
      <strong>${(project.files || []).length}</strong>
    </div>
  `;
}

function generateExportPreview() {
  const project = activeProject();
  els.exportPreviewInput.value = buildExportContent(project, els.exportTypeInput.value);
  els.importExportStatus.textContent = "已生成导出预览，可选中内容复制。";
}

function buildExportContent(project, type) {
  if (type === "subtasks-csv") return buildSubtasksCsv(project);
  if (type === "project-json") {
    return JSON.stringify({
      exportVersion: "kanboard-static-v0822",
      exportedAt: new Date().toISOString(),
      project: clone(project)
    }, null, 2);
  }
  return buildTasksCsv(project);
}

function buildTasksCsv(project) {
  const headers = ["id", "title", "column", "swimlane", "assignee", "category", "priority", "dueDate", "status", "estimate", "actualTime", "tags"];
  const rows = allCards(project).map((card) => [
    card.id,
    card.title,
    card.columnTitle,
    project.swimlanes.find((lane) => lane.id === card.swimlaneId)?.title || "",
    card.assignee,
    card.category,
    card.priority,
    card.dueDate || card.schedule?.plannedEnd || "",
    card.isClosed ? "closed" : "open",
    card.estimate,
    card.actualTime,
    (card.tags || []).join("|")
  ]);
  return rowsToCsv([headers, ...rows]);
}

function buildSubtasksCsv(project) {
  const headers = ["cardId", "cardTitle", "subtaskId", "title", "done"];
  const rows = allCards(project).flatMap((card) => (card.subtasks || []).map((subtask) => [
    card.id,
    card.title,
    subtask.id,
    subtask.title,
    subtask.done ? "1" : "0"
  ]));
  return rowsToCsv([headers, ...rows]);
}

function rowsToCsv(rows) {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function copyExportPreview() {
  els.exportPreviewInput.focus();
  els.exportPreviewInput.select();
  els.importExportStatus.textContent = "导出内容已选中，可直接复制。";
}

function previewImportProject() {
  try {
    draftImportProject = parseImportProject(els.importJsonInput.value);
    const cards = draftImportProject.columns.flatMap((column) => column.cards || []);
    els.importExportStatus.textContent = `可导入项目“${draftImportProject.name}”，包含 ${draftImportProject.columns.length} 列、${draftImportProject.swimlanes.length} 泳道、${cards.length} 任务。`;
    els.importProjectBtn.disabled = false;
  } catch (error) {
    draftImportProject = null;
    els.importProjectBtn.disabled = true;
    els.importExportStatus.textContent = `导入失败：${error.message}`;
  }
}

function parseImportProject(rawValue) {
  const raw = rawValue.trim();
  if (!raw) throw new Error("请先粘贴项目 JSON。");
  const parsed = JSON.parse(raw);
  const project = parsed.project || parsed;
  if (!project.name || !Array.isArray(project.columns)) {
    throw new Error("JSON 中没有有效项目名称或列数据。");
  }
  return clone(project);
}

function importProjectFromDialog() {
  if (!draftImportProject) return;
  const importedProject = remapImportedProject(draftImportProject);
  state.projects.push(importedProject);
  state.activeProjectId = importedProject.id;
  draftImportProject = null;
  els.importExportDialog.close();
  normalizeState();
  persist();
  render();
}

function remapImportedProject(project) {
  const now = new Date().toISOString();
  const laneIdMap = new Map();
  const cardIdMap = new Map();
  const lanes = (project.swimlanes?.length ? project.swimlanes : [{ title: "默认泳道", description: "导入默认泳道" }]).map((lane) => {
    const id = uid("lane");
    laneIdMap.set(lane.id, id);
    return { ...lane, id };
  });
  const fallbackLaneId = lanes[0].id;
  const columns = (project.columns || []).map((column) => ({
    ...column,
    id: uid("column"),
    cards: (column.cards || []).map((card) => {
      const id = uid("card");
      cardIdMap.set(card.id, id);
      return {
        ...clone(card),
        id,
        swimlaneId: laneIdMap.get(card.swimlaneId) || fallbackLaneId,
        subtasks: (card.subtasks || []).map((subtask) => ({ ...subtask, id: uid("subtask") })),
        attachments: (card.attachments || []).map((attachment) => ({ ...attachment, id: uid("attachment") })),
        timeLogs: (card.timeLogs || []).map((entry) => ({ ...entry, id: uid("time") })),
        comments: clone(card.comments || []),
        links: clone(card.links || []),
        activity: addActivity(card.activity || [], "由 JSON 导入生成"),
        createdAt: card.createdAt || now,
        updatedAt: now
      };
    })
  }));
  columns.forEach((column) => {
    column.cards.forEach((card) => {
      card.links = (card.links || []).map((link) => ({
        ...link,
        id: link.id || uid("link"),
        targetId: cardIdMap.get(link.targetId) || link.targetId
      }));
    });
  });
  const settings = normalizeProjectSettings({
    ...project,
    swimlanes: lanes,
    columns,
    settings: {
      ...(project.settings || {}),
      publicToken: uid("public")
    }
  });
  settings.defaultSwimlaneId = laneIdMap.get(project.settings?.defaultSwimlaneId) || fallbackLaneId;
  settings.disabledSwimlaneIds = (project.settings?.disabledSwimlaneIds || [])
    .map((id) => laneIdMap.get(id))
    .filter(Boolean);
  return {
    ...clone(project),
    id: uid("project"),
    name: `${project.name} - 导入`,
    createdAt: now,
    swimlanes: lanes,
    columns,
    files: normalizeProjectFiles({
      ...project,
      files: (project.files || []).map((file) => ({ ...file, id: uid("file"), createdAt: file.createdAt || now })),
      columns
    }),
    settings,
    timeline: normalizeProjectTimeline({ ...project, columns, timeline: project.timeline || {} }),
    automations: (project.automations || []).map((rule) => ({ ...rule, id: uid("automation"), lastRunAt: "" })),
    notifications: []
  };
}

function openPluginsDialog() {
  renderPluginsDialog();
  els.pluginsDialog.showModal();
}

function renderPluginsDialog() {
  const plugins = state.plugins;
  const installed = plugins.catalog.filter((plugin) => plugin.status === "installed");
  const available = plugins.catalog.filter((plugin) => plugin.status !== "installed");
  const updates = installed.filter((plugin) => plugin.version !== plugin.latestVersion);
  const canInstall = canUsePluginInstaller();
  els.pluginInstallerInput.checked = plugins.config.installerEnabled;
  els.pluginDirectoryInput.checked = plugins.config.directoryWritable;
  els.pluginZipInput.checked = plugins.config.zipExtensionAvailable;
  els.pluginApiUrlInput.value = plugins.config.apiUrl;
  els.pluginSummary.innerHTML = `
    <div class="analytics-card">
      <span>安装器</span>
      <strong>${canInstall ? "可用" : "关闭"}</strong>
    </div>
    <div class="analytics-card">
      <span>已安装</span>
      <strong>${installed.length}</strong>
    </div>
    <div class="analytics-card">
      <span>可安装</span>
      <strong>${available.length}</strong>
    </div>
    <div class="analytics-card">
      <span>可更新</span>
      <strong>${updates.length}</strong>
    </div>
  `;
  els.installedPluginSummary.textContent = `${installed.length} 个`;
  els.availablePluginSummary.textContent = `${available.length} 个`;
  els.pluginStatus.textContent = pluginInstallerStatusText();
  renderInstalledPlugins(installed);
  renderAvailablePlugins(available, canInstall);
}

function renderInstalledPlugins(plugins) {
  els.installedPluginList.innerHTML = plugins.length
    ? plugins.map((plugin) => {
      const canUpdate = plugin.version !== plugin.latestVersion;
      return `
        <div class="settings-item plugin-item" data-id="${plugin.id}">
          <div>
            <strong>${escapeHtml(plugin.name)}</strong>
            <span>${escapeHtml(plugin.description)} · v${escapeHtml(plugin.version)}${canUpdate ? ` → v${escapeHtml(plugin.latestVersion)}` : ""}</span>
          </div>
          <span class="role-pill">${canUpdate ? "可更新" : "已安装"}</span>
          <button class="secondary-button" type="button" data-action="upgrade" ${canUpdate ? "" : "disabled"}>更新</button>
          <button class="mini-button" type="button" data-action="uninstall" aria-label="卸载插件">×</button>
        </div>
      `;
    }).join("")
    : `<div class="empty-state">暂无已安装插件</div>`;

  els.installedPluginList.querySelectorAll(".plugin-item").forEach((row) => {
    row.querySelector('[data-action="upgrade"]').addEventListener("click", () => upgradePlugin(row.dataset.id));
    row.querySelector('[data-action="uninstall"]').addEventListener("click", () => uninstallPlugin(row.dataset.id));
  });
}

function renderAvailablePlugins(plugins, canInstall) {
  els.availablePluginList.innerHTML = plugins.length
    ? plugins.map((plugin) => `
      <div class="settings-item plugin-item" data-id="${plugin.id}">
        <div>
          <strong>${escapeHtml(plugin.name)}</strong>
          <span>${escapeHtml(plugin.description)} · ${escapeHtml(plugin.author)} · v${escapeHtml(plugin.latestVersion)}</span>
        </div>
        <span class="role-pill">${canInstall ? "可安装" : "需开启"}</span>
        <button class="secondary-button" type="button" data-action="install" ${canInstall ? "" : "disabled"}>安装</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无可安装插件</div>`;

  els.availablePluginList.querySelectorAll(".plugin-item").forEach((row) => {
    row.querySelector('[data-action="install"]').addEventListener("click", () => installPlugin(row.dataset.id));
  });
}

function updatePluginConfigFromDialog() {
  state.plugins.config.installerEnabled = els.pluginInstallerInput.checked;
  state.plugins.config.directoryWritable = els.pluginDirectoryInput.checked;
  state.plugins.config.zipExtensionAvailable = els.pluginZipInput.checked;
  state.plugins.config.apiUrl = els.pluginApiUrlInput.value.trim() || "https://kanboard.org/plugins.json";
  persist();
  renderPluginsDialog();
}

function installPlugin(pluginId) {
  if (!canUsePluginInstaller()) return;
  const plugin = state.plugins.catalog.find((item) => item.id === pluginId);
  plugin.status = "installed";
  plugin.version = plugin.latestVersion;
  persist();
  renderPluginsDialog();
}

function upgradePlugin(pluginId) {
  const plugin = state.plugins.catalog.find((item) => item.id === pluginId);
  if (!plugin) return;
  plugin.version = plugin.latestVersion;
  persist();
  renderPluginsDialog();
}

function uninstallPlugin(pluginId) {
  const plugin = state.plugins.catalog.find((item) => item.id === pluginId);
  if (!plugin) return;
  plugin.status = "available";
  persist();
  renderPluginsDialog();
}

function canUsePluginInstaller() {
  const config = state.plugins.config;
  return Boolean(config.installerEnabled && config.directoryWritable && config.zipExtensionAvailable);
}

function pluginInstallerStatusText() {
  const config = state.plugins.config;
  if (!config.installerEnabled) return "Web UI 插件安装器关闭。Kanboard 1.2.8 起默认关闭此能力。";
  if (!config.directoryWritable) return "插件目录不可写，无法从界面安装或更新插件。";
  if (!config.zipExtensionAvailable) return "PHP Zip 扩展不可用，无法解压插件包。";
  return "安装器可用。仍需由实例所有者验证插件来源与安全性。";
}

function openIdentityDialog() {
  renderIdentityDialog();
  els.identityDialog.showModal();
}

function renderIdentityDialog() {
  const users = state.identity.users;
  const groups = state.identity.groups;
  const activeUsers = users.filter((user) => user.active);
  const remoteUsers = users.filter((user) => user.type === "remote");
  const twoFactorUsers = users.filter((user) => user.twoFactor);
  els.identitySummary.innerHTML = `
    <div class="analytics-card">
      <span>用户</span>
      <strong>${users.length}</strong>
    </div>
    <div class="analytics-card">
      <span>启用</span>
      <strong>${activeUsers.length}</strong>
    </div>
    <div class="analytics-card">
      <span>远程用户</span>
      <strong>${remoteUsers.length}</strong>
    </div>
    <div class="analytics-card">
      <span>2FA</span>
      <strong>${twoFactorUsers.length}</strong>
    </div>
  `;
  els.identityUserSummary.textContent = `${users.length} 个`;
  els.identityGroupSummary.textContent = `${groups.length} 个`;
  renderIdentityUsers();
  renderIdentityGroupSelectors();
  renderIdentityGroups();
}

function renderIdentityUsers() {
  els.identityUserList.innerHTML = state.identity.users.length
    ? state.identity.users.map((user) => `
      <div class="settings-item identity-user-item ${user.active ? "" : "disabled"}" data-id="${user.id}">
        <div>
          <strong>${escapeHtml(identityUserLabel(user))}</strong>
          <span>${escapeHtml(userTypeLabel(user.type))} · ${escapeHtml(user.email || "未填写邮箱")} · ${user.twoFactor ? "2FA 已开启，需 API Key" : "2FA 未开启"}</span>
        </div>
        <select data-action="role">
          ${APP_ROLES.map((role) => `<option value="${role.value}" ${user.role === role.value ? "selected" : ""}>${role.label}</option>`).join("")}
        </select>
        <label class="checkbox-control compact-checkbox">
          <input data-action="twofactor" type="checkbox" ${user.twoFactor ? "checked" : ""}>
          <span>2FA</span>
        </label>
        <button class="secondary-button" type="button" data-action="toggle">${user.active ? "停用" : "启用"}</button>
        <button class="mini-button" type="button" data-action="remove" aria-label="删除用户">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无用户</div>`;

  els.identityUserList.querySelectorAll(".identity-user-item").forEach((row) => {
    row.querySelector('[data-action="role"]').addEventListener("change", (event) => setIdentityUserRole(row.dataset.id, event.target.value));
    row.querySelector('[data-action="twofactor"]').addEventListener("change", (event) => setIdentityTwoFactor(row.dataset.id, event.target.checked));
    row.querySelector('[data-action="toggle"]').addEventListener("click", () => toggleIdentityUser(row.dataset.id));
    row.querySelector('[data-action="remove"]').addEventListener("click", () => removeIdentityUser(row.dataset.id));
  });
}

function renderIdentityGroupSelectors() {
  const groups = state.identity.groups;
  const users = state.identity.users;
  els.identityGroupSelect.innerHTML = groups.map((group) => `<option value="${group.id}">${escapeHtml(group.name)}</option>`).join("");
  els.identityGroupUserSelect.innerHTML = users.map((user) => `<option value="${user.id}">${escapeHtml(identityUserLabel(user))}</option>`).join("");
  els.addIdentityGroupMemberBtn.disabled = !groups.length || !users.length;
}

function renderIdentityGroups() {
  const usersById = new Map(state.identity.users.map((user) => [user.id, user]));
  els.identityGroupList.innerHTML = state.identity.groups.length
    ? state.identity.groups.map((group) => {
      const members = group.memberIds.map((id) => usersById.get(id)).filter(Boolean);
      return `
        <div class="settings-item identity-group-item" data-id="${group.id}">
          <div class="identity-group-heading">
            <div>
              <strong>${escapeHtml(group.name)}</strong>
              <span>${escapeHtml(group.externalId || "无外部 ID")} · ${members.length} 个成员</span>
            </div>
            <button class="mini-button" type="button" data-action="remove-group" aria-label="删除用户组">×</button>
          </div>
          <div class="identity-group-members">
            ${members.length ? members.map((user) => `
              <span class="identity-member-chip">
                ${escapeHtml(identityUserLabel(user))}
                <button type="button" data-action="remove-member" data-user-id="${user.id}" aria-label="移出用户组">×</button>
              </span>
            `).join("") : `<span class="empty-inline">暂无成员</span>`}
          </div>
        </div>
      `;
    }).join("")
    : `<div class="empty-state">暂无用户组</div>`;

  els.identityGroupList.querySelectorAll(".identity-group-item").forEach((row) => {
    row.querySelector('[data-action="remove-group"]').addEventListener("click", () => removeIdentityGroup(row.dataset.id));
    row.querySelectorAll('[data-action="remove-member"]').forEach((button) => {
      button.addEventListener("click", () => removeIdentityGroupMember(row.dataset.id, button.dataset.userId));
    });
  });
}

function addIdentityUser() {
  const username = els.identityUsernameInput.value.trim();
  const type = els.identityUserTypeInput.value;
  const secret = els.identitySecretInput.value.trim();
  if (!username) {
    setIdentityStatus("用户名不能为空。");
    return;
  }
  if (state.identity.users.some((user) => user.username === username)) {
    setIdentityStatus("用户名必须唯一。");
    return;
  }
  if (type === "local" && secret.length < 6) {
    setIdentityStatus("本地用户密码至少需要 6 位。");
    return;
  }
  state.identity.users.push({
    id: uid("user"),
    username,
    name: els.identityDisplayNameInput.value.trim() || username,
    email: els.identityEmailInput.value.trim(),
    role: els.identityUserRoleInput.value,
    type,
    active: true,
    twoFactor: false,
    apiKeyRequired: false,
    externalId: type === "remote" ? secret : "",
    passwordSet: type === "local"
  });
  els.identityUsernameInput.value = "";
  els.identityDisplayNameInput.value = "";
  els.identityEmailInput.value = "";
  els.identitySecretInput.value = "";
  setIdentityStatus(type === "remote" ? "已新增远程用户，静态记录外部身份来源。" : "已新增本地用户，静态页不会保存明文密码。");
  persist();
  render();
  renderIdentityDialog();
}

function addIdentityGroup() {
  const name = els.identityGroupNameInput.value.trim();
  if (!name) {
    setIdentityStatus("用户组名称不能为空。");
    return;
  }
  if (state.identity.groups.some((group) => group.name === name)) {
    setIdentityStatus("用户组名称不能重复。");
    return;
  }
  state.identity.groups.push({
    id: uid("group"),
    name,
    externalId: els.identityGroupExternalInput.value.trim(),
    memberIds: []
  });
  els.identityGroupNameInput.value = "";
  els.identityGroupExternalInput.value = "";
  setIdentityStatus("已新增用户组，可继续分配成员。");
  persist();
  renderIdentityDialog();
}

function addIdentityGroupMember() {
  const group = state.identity.groups.find((item) => item.id === els.identityGroupSelect.value);
  const userId = els.identityGroupUserSelect.value;
  if (!group || !userId) return;
  if (!group.memberIds.includes(userId)) {
    group.memberIds.push(userId);
    setIdentityStatus("已将用户加入用户组。");
  } else {
    setIdentityStatus("该用户已经在这个用户组中。");
  }
  persist();
  renderIdentityDialog();
}

function removeIdentityGroupMember(groupId, userId) {
  const group = state.identity.groups.find((item) => item.id === groupId);
  if (!group) return;
  group.memberIds = group.memberIds.filter((id) => id !== userId);
  setIdentityStatus("已从用户组移除成员。");
  persist();
  renderIdentityDialog();
}

function removeIdentityGroup(groupId) {
  const group = state.identity.groups.find((item) => item.id === groupId);
  if (!group) return;
  state.identity.groups = state.identity.groups.filter((item) => item.id !== groupId);
  state.projects.forEach((project) => {
    project.settings.groups = (project.settings.groups || []).filter((item) => item.name !== group.name);
  });
  setIdentityStatus("已删除用户组，并从项目权限引用中移除。");
  persist();
  render();
  renderIdentityDialog();
}

function setIdentityUserRole(userId, role) {
  const user = state.identity.users.find((item) => item.id === userId);
  if (!user) return;
  if (user.role === "app-admin" && role !== "app-admin" && activeAdminCount() <= 1) {
    setIdentityStatus("至少需要保留一个启用状态的管理员。");
    renderIdentityDialog();
    return;
  }
  user.role = role;
  setIdentityStatus("已更新应用角色。");
  persist();
  renderIdentityDialog();
}

function setIdentityTwoFactor(userId, enabled) {
  const user = state.identity.users.find((item) => item.id === userId);
  if (!user) return;
  user.twoFactor = enabled;
  user.apiKeyRequired = enabled;
  setIdentityStatus(enabled ? "已开启 2FA；Kanboard 1.2.8 起 API 访问需使用 API Key。" : "已关闭 2FA。");
  persist();
  renderIdentityDialog();
}

function toggleIdentityUser(userId) {
  const user = state.identity.users.find((item) => item.id === userId);
  if (!user) return;
  if (user.active && user.role === "app-admin" && activeAdminCount() <= 1) {
    setIdentityStatus("至少需要保留一个启用状态的管理员。");
    return;
  }
  user.active = !user.active;
  setIdentityStatus(user.active ? "用户已启用。" : "用户已停用，仍保留历史任务记录。");
  persist();
  render();
  renderIdentityDialog();
}

function removeIdentityUser(userId) {
  const user = state.identity.users.find((item) => item.id === userId);
  if (!user) return;
  if (user.active && user.role === "app-admin" && activeAdminCount() <= 1) {
    setIdentityStatus("不能删除最后一个启用状态的管理员。");
    return;
  }
  state.identity.users = state.identity.users.filter((item) => item.id !== userId);
  state.identity.groups.forEach((group) => {
    group.memberIds = group.memberIds.filter((id) => id !== userId);
  });
  state.projects.forEach((project) => {
    project.settings.members = (project.settings.members || []).filter((member) => ![user.name, user.username].includes(member.name));
    project.columns.forEach((column) => {
      column.cards.forEach((card) => {
        if ([user.name, user.username].includes(card.assignee)) card.assignee = "";
      });
    });
  });
  setIdentityStatus("已删除用户；分配给该用户的任务已改为未分配。");
  persist();
  render();
  renderIdentityDialog();
}

function activeAdminCount() {
  return state.identity.users.filter((user) => user.active && user.role === "app-admin").length;
}

function setIdentityStatus(message) {
  els.identityStatus.textContent = message;
}

function identityUserLabel(user) {
  return `${user.name || user.username} (${user.username})`;
}

function appRoleLabel(roleValue) {
  return APP_ROLES.find((role) => role.value === roleValue)?.label || roleValue;
}

function userTypeLabel(typeValue) {
  return USER_TYPES.find((type) => type.value === typeValue)?.label || typeValue;
}

function openSystemSettingsDialog() {
  renderSystemSettingsDialog();
  els.systemSettingsDialog.showModal();
}

function renderSystemSettingsDialog() {
  const { api, ldap, reverseProxy, security } = state.system;
  els.apiEndpointInput.value = api.endpoint;
  els.apiUserInput.value = api.applicationUser;
  els.apiTokenInput.value = api.applicationToken;
  els.apiHeaderInput.value = api.authHeader;
  els.apiRequireKeyInput.checked = Boolean(api.requireApiKeyFor2fa);
  els.bruteCaptchaInput.value = security.bruteForceCaptcha;
  els.bruteLockInput.value = security.bruteForceLockdown;
  els.lockDurationInput.value = security.lockdownDuration;
  els.hideLoginInput.checked = Boolean(security.hideLoginForm);
  els.disableLogoutInput.checked = Boolean(security.disableLogout);
  els.markdownEscapeInput.checked = Boolean(security.markdownEscapeHtml);
  els.privateLinksInput.checked = Boolean(security.allowPrivateExternalLinks);
  els.privateWebhooksInput.checked = Boolean(security.allowPrivateWebhooks);
  els.ldapEnabledInput.checked = Boolean(ldap.enabled);
  els.ldapServerInput.value = ldap.server;
  els.ldapBindTypeInput.value = ldap.bindType;
  els.ldapUserBaseInput.value = ldap.userBaseDn;
  els.ldapUserFilterInput.value = ldap.userFilter;
  els.ldapGroupBaseInput.value = ldap.groupBaseDn;
  els.ldapGroupFilterInput.value = ldap.groupFilter;
  els.ldapUserCreationInput.checked = Boolean(ldap.userCreation);
  els.ldapGroupProviderInput.checked = Boolean(ldap.groupProvider);
  els.proxyEnabledInput.checked = Boolean(reverseProxy.enabled);
  els.proxyTrustedInput.value = reverseProxy.trustedNetworks;
  els.proxyUserHeaderInput.value = reverseProxy.userHeader;
  els.proxyEmailHeaderInput.value = reverseProxy.emailHeader;
  els.proxyNameHeaderInput.value = reverseProxy.fullNameHeader;
  els.proxyAdminInput.value = reverseProxy.defaultAdmin;
  els.proxyDomainInput.value = reverseProxy.defaultDomain;
  els.proxyStripHeadersInput.checked = Boolean(reverseProxy.stripIncomingHeaders);
  const risks = systemRiskMessages();
  els.systemSummary.innerHTML = `
    <div class="analytics-card">
      <span>API</span>
      <strong>${api.authHeader ? "Header" : "Basic"}</strong>
    </div>
    <div class="analytics-card">
      <span>LDAP</span>
      <strong>${ldap.enabled ? "开启" : "关闭"}</strong>
    </div>
    <div class="analytics-card">
      <span>反向代理</span>
      <strong>${reverseProxy.enabled ? "开启" : "关闭"}</strong>
    </div>
    <div class="analytics-card">
      <span>安全提示</span>
      <strong>${risks.length}</strong>
    </div>
  `;
  els.systemRiskSummary.textContent = risks.length ? `${risks.length} 个风险提示` : "无高风险提示";
  els.systemConfigPreview.value = buildSystemConfigPreview();
  els.systemStatus.textContent = risks[0] || "系统配置已保存为静态模拟状态。";
}

function updateSystemConfigFromDialog() {
  state.system.api = {
    endpoint: els.apiEndpointInput.value.trim() || "/jsonrpc.php",
    applicationUser: els.apiUserInput.value.trim() || "jsonrpc",
    applicationToken: els.apiTokenInput.value.trim() || "••••••••••••••••••••",
    authHeader: els.apiHeaderInput.value.trim(),
    requireApiKeyFor2fa: els.apiRequireKeyInput.checked
  };
  state.system.ldap = {
    enabled: els.ldapEnabledInput.checked,
    server: els.ldapServerInput.value.trim() || "ldap://ldap.example.com",
    bindType: els.ldapBindTypeInput.value,
    userBaseDn: els.ldapUserBaseInput.value.trim(),
    userFilter: els.ldapUserFilterInput.value.trim() || "uid=%s",
    userCreation: els.ldapUserCreationInput.checked,
    groupProvider: els.ldapGroupProviderInput.checked,
    groupBaseDn: els.ldapGroupBaseInput.value.trim(),
    groupFilter: els.ldapGroupFilterInput.value.trim()
  };
  state.system.reverseProxy = {
    enabled: els.proxyEnabledInput.checked,
    trustedNetworks: els.proxyTrustedInput.value.trim(),
    userHeader: els.proxyUserHeaderInput.value.trim() || "REMOTE_USER",
    emailHeader: els.proxyEmailHeaderInput.value.trim() || "REMOTE_EMAIL",
    fullNameHeader: els.proxyNameHeaderInput.value.trim() || "REMOTE_NAME",
    defaultAdmin: els.proxyAdminInput.value.trim(),
    defaultDomain: els.proxyDomainInput.value.trim(),
    stripIncomingHeaders: els.proxyStripHeadersInput.checked
  };
  state.system.security = {
    hideLoginForm: els.hideLoginInput.checked,
    disableLogout: els.disableLogoutInput.checked,
    markdownEscapeHtml: els.markdownEscapeInput.checked,
    bruteForceCaptcha: clampNumber(els.bruteCaptchaInput.value, 0, 20, 3),
    bruteForceLockdown: clampNumber(els.bruteLockInput.value, 1, 50, 6),
    lockdownDuration: clampNumber(els.lockDurationInput.value, 1, 1440, 15),
    allowPrivateExternalLinks: els.privateLinksInput.checked,
    allowPrivateWebhooks: els.privateWebhooksInput.checked
  };
  state.system = normalizeSystemConfig(state.system);
  persist();
  renderSystemSettingsDialog();
}

function systemRiskMessages() {
  const { api, ldap, reverseProxy, security } = state.system;
  const messages = [];
  if (reverseProxy.enabled && !reverseProxy.trustedNetworks.trim()) {
    messages.push("反向代理认证已开启，但缺少 TRUSTED_PROXY_NETWORKS。");
  }
  if (reverseProxy.enabled && !reverseProxy.stripIncomingHeaders) {
    messages.push("反向代理认证已开启，应清理客户端传入的认证 Header。");
  }
  if (security.hideLoginForm && !ldap.enabled && !reverseProxy.enabled) {
    messages.push("隐藏登录表单前应先启用 LDAP 或反向代理认证。");
  }
  if (security.allowPrivateExternalLinks || security.allowPrivateWebhooks) {
    messages.push("允许私网访问可能带来 SSRF 风险。");
  }
  if (!api.requireApiKeyFor2fa && state.identity.users.some((user) => user.twoFactor)) {
    messages.push("已有 2FA 用户，API 访问仍应要求 API Key。");
  }
  if (ldap.enabled && !ldap.userBaseDn.trim()) {
    messages.push("LDAP 已开启，但 User Base DN 为空。");
  }
  return messages;
}

function buildSystemConfigPreview() {
  const { api, ldap, reverseProxy, security } = state.system;
  return [
    "<?php",
    `define('API_AUTHENTICATION_HEADER', '${escapeConfigValue(api.authHeader)}');`,
    `define('API_AUTHENTICATION_TOKEN', '${escapeConfigValue(api.applicationToken)}');`,
    `define('LDAP_AUTH', ${phpBool(ldap.enabled)});`,
    `define('LDAP_SERVER', '${escapeConfigValue(ldap.server)}');`,
    `define('LDAP_BIND_TYPE', '${escapeConfigValue(ldap.bindType)}');`,
    `define('LDAP_USER_BASE_DN', '${escapeConfigValue(ldap.userBaseDn)}');`,
    `define('LDAP_USER_FILTER', '${escapeConfigValue(ldap.userFilter)}');`,
    `define('LDAP_USER_CREATION', ${phpBool(ldap.userCreation)});`,
    `define('LDAP_GROUP_PROVIDER', ${phpBool(ldap.groupProvider)});`,
    `define('LDAP_GROUP_BASE_DN', '${escapeConfigValue(ldap.groupBaseDn)}');`,
    `define('LDAP_GROUP_FILTER', '${escapeConfigValue(ldap.groupFilter)}');`,
    `define('REVERSE_PROXY_AUTH', ${phpBool(reverseProxy.enabled)});`,
    `define('TRUSTED_PROXY_NETWORKS', '${escapeConfigValue(reverseProxy.trustedNetworks)}');`,
    `define('REVERSE_PROXY_USER_HEADER', '${escapeConfigValue(reverseProxy.userHeader)}');`,
    `define('REVERSE_PROXY_EMAIL_HEADER', '${escapeConfigValue(reverseProxy.emailHeader)}');`,
    `define('REVERSE_PROXY_FULLNAME_HEADER', '${escapeConfigValue(reverseProxy.fullNameHeader)}');`,
    `define('REVERSE_PROXY_DEFAULT_ADMIN', '${escapeConfigValue(reverseProxy.defaultAdmin)}');`,
    `define('REVERSE_PROXY_DEFAULT_DOMAIN', '${escapeConfigValue(reverseProxy.defaultDomain)}');`,
    `define('HIDE_LOGIN_FORM', ${phpBool(security.hideLoginForm)});`,
    `define('DISABLE_LOGOUT', ${phpBool(security.disableLogout)});`,
    `define('MARKDOWN_ESCAPE_HTML', ${phpBool(security.markdownEscapeHtml)});`,
    `define('BRUTEFORCE_CAPTCHA', ${security.bruteForceCaptcha});`,
    `define('BRUTEFORCE_LOCKDOWN', ${security.bruteForceLockdown});`,
    `define('BRUTEFORCE_LOCKDOWN_DURATION', ${security.lockdownDuration});`,
    `define('EXTERNAL_LINK_ALLOW_PRIVATE_NETWORKS', ${phpBool(security.allowPrivateExternalLinks)});`,
    `define('WEBHOOK_ALLOW_PRIVATE_NETWORKS', ${phpBool(security.allowPrivateWebhooks)});`
  ].join("\n");
}

function phpBool(value) {
  return value ? "true" : "false";
}

function escapeConfigValue(value) {
  return String(value ?? "").replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

function openRuntimeDialog() {
  renderRuntimeDialog();
  els.runtimeDialog.showModal();
}

function renderRuntimeDialog() {
  const { database, environment, upgrade } = state.runtime;
  els.runtimeDbDriverInput.value = database.driver;
  els.runtimeSqlitePathInput.value = database.sqlitePath;
  els.runtimeDbHostInput.value = database.host;
  els.runtimeDbPortInput.value = database.port;
  els.runtimeDbNameInput.value = database.name;
  els.runtimeDbUserInput.value = database.username;
  els.runtimeWalInput.checked = Boolean(database.walMode);
  els.runtimeAutoMigrationInput.checked = Boolean(database.autoMigrations);
  els.runtimeSchemaCurrentInput.value = database.currentSchemaVersion;
  els.runtimeSchemaLatestInput.value = database.latestSchemaVersion;
  els.runtimePhpVersionInput.value = environment.phpVersion;
  els.runtimeWebServerInput.value = environment.webServer;
  els.runtimeInstallModeInput.value = environment.installMode;
  els.runtimeStorageProfileInput.value = environment.storageProfile;
  els.runtimeDataWritableInput.checked = Boolean(environment.dataDirectoryWritable);
  els.runtimeFilesDirInput.value = environment.filesDir;
  els.runtimeCacheDriverInput.value = environment.cacheDriver;
  els.runtimeCacheWritableInput.checked = Boolean(environment.cacheDirectoryWritable);
  els.runtimeOpcacheInput.checked = Boolean(environment.opcacheEnabled);
  els.runtimeUrlRewriteInput.checked = Boolean(environment.urlRewrite);
  els.runtimeDebugInput.checked = Boolean(environment.debugMode);
  els.runtimeUpgradeTargetInput.value = upgrade.targetVersion;
  renderRuntimeSummary();
  renderRuntimeRequirementList();
  renderRuntimeUpgradeChecklist();
  renderRuntimeLogs();
  els.runtimeConfigPreview.value = buildRuntimeConfigPreview();
  const risks = runtimeRiskMessages();
  els.runtimeRiskSummary.textContent = risks.length ? `${risks.length} 个风险提示` : "运行环境检查通过";
  els.runtimeStatus.textContent = risks[0] || "运行环境、数据库和升级准备已保存为静态模拟状态。";
}

function renderRuntimeSummary() {
  const { database, environment } = state.runtime;
  const required = runtimeRequiredExtensions(database.driver);
  const passed = required.filter((extension) => state.runtime.php.extensions[extension]).length;
  const schemaReady = database.currentSchemaVersion >= database.latestSchemaVersion;
  els.runtimeSummary.innerHTML = `
    <div class="analytics-card">
      <span>数据库</span>
      <strong>${dbDriverLabel(database.driver)}</strong>
    </div>
    <div class="analytics-card">
      <span>PHP</span>
      <strong>${escapeHtml(environment.phpVersion)}</strong>
    </div>
    <div class="analytics-card">
      <span>扩展</span>
      <strong>${passed}/${required.length}</strong>
    </div>
    <div class="analytics-card">
      <span>Schema</span>
      <strong>${schemaReady ? "已同步" : "待迁移"}</strong>
    </div>
  `;
}

function renderRuntimeRequirementList() {
  const required = new Set(runtimeRequiredExtensions(state.runtime.database.driver));
  const extensions = [...required, ...OPTIONAL_PHP_EXTENSIONS].filter((extension, index, list) => list.indexOf(extension) === index);
  els.runtimeRequirementList.innerHTML = extensions.map((extension) => {
    const checked = Boolean(state.runtime.php.extensions[extension]);
    const isRequired = required.has(extension);
    return `
      <label class="settings-item runtime-requirement-item ${checked ? "pass" : "fail"}">
        <input type="checkbox" data-extension="${escapeHtml(extension)}" ${checked ? "checked" : ""}>
        <div>
          <strong>${escapeHtml(extension)}</strong>
          <span>${isRequired ? "必需扩展" : "可选扩展"}</span>
        </div>
        <span class="role-pill">${checked ? "可用" : "缺失"}</span>
      </label>
    `;
  }).join("");
}

function renderRuntimeUpgradeChecklist() {
  const items = [
    { key: "changeLogReviewed", label: "已阅读 ChangeLog 与破坏性变更" },
    { key: "backupVerified", label: "已完成并验证备份" },
    { key: "workersStopped", label: "已停止 Background Worker" },
    { key: "maintenanceMode", label: "已进入维护模式" },
    { key: "sessionsFlushed", label: "已清理用户会话" },
    { key: "pluginsChecked", label: "已检查插件兼容性" }
  ];
  els.runtimeUpgradeList.innerHTML = items.map((item) => {
    const checked = Boolean(state.runtime.upgrade[item.key]);
    return `
      <label class="settings-item runtime-upgrade-item ${checked ? "pass" : "fail"}">
        <input type="checkbox" data-upgrade-key="${item.key}" ${checked ? "checked" : ""}>
        <div>
          <strong>${item.label}</strong>
          <span>${checked ? "已完成" : "升级前待确认"}</span>
        </div>
      </label>
    `;
  }).join("");
}

function renderRuntimeLogs() {
  els.runtimeLogList.innerHTML = state.runtime.logs.length
    ? state.runtime.logs.map((entry) => `
      <div class="settings-item runtime-log-item">
        <div>
          <strong>${escapeHtml(entry.action)}</strong>
          <span>${escapeHtml(entry.result)} · ${formatTime(entry.createdAt)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="empty-state">暂无环境操作日志</div>`;
}

function updateRuntimeFromDialog() {
  document.querySelectorAll("#runtimeRequirementList [data-extension]").forEach((input) => {
    state.runtime.php.extensions[input.dataset.extension] = input.checked;
  });
  document.querySelectorAll("#runtimeUpgradeList [data-upgrade-key]").forEach((input) => {
    state.runtime.upgrade[input.dataset.upgradeKey] = input.checked;
  });
  state.runtime.database = {
    ...state.runtime.database,
    driver: els.runtimeDbDriverInput.value,
    sqlitePath: els.runtimeSqlitePathInput.value.trim() || "data/db.sqlite",
    host: els.runtimeDbHostInput.value.trim() || "localhost",
    port: els.runtimeDbPortInput.value.trim(),
    name: els.runtimeDbNameInput.value.trim() || "kanboard",
    username: els.runtimeDbUserInput.value.trim() || "kanboard",
    walMode: els.runtimeWalInput.checked,
    autoMigrations: els.runtimeAutoMigrationInput.checked,
    currentSchemaVersion: clampNumber(els.runtimeSchemaCurrentInput.value, 0, 9999, 0),
    latestSchemaVersion: clampNumber(els.runtimeSchemaLatestInput.value, 0, 9999, 0),
    migrationStatus: Number(els.runtimeSchemaCurrentInput.value) >= Number(els.runtimeSchemaLatestInput.value) ? "已同步" : "待升级"
  };
  state.runtime.environment = {
    ...state.runtime.environment,
    phpVersion: els.runtimePhpVersionInput.value.trim() || "8.1.0",
    webServer: els.runtimeWebServerInput.value.trim() || "Apache",
    installMode: els.runtimeInstallModeInput.value,
    storageProfile: els.runtimeStorageProfileInput.value,
    dataDirectoryWritable: els.runtimeDataWritableInput.checked,
    filesDir: els.runtimeFilesDirInput.value.trim() || "data/files",
    cacheDriver: els.runtimeCacheDriverInput.value,
    cacheDirectoryWritable: els.runtimeCacheWritableInput.checked,
    opcacheEnabled: els.runtimeOpcacheInput.checked,
    urlRewrite: els.runtimeUrlRewriteInput.checked,
    debugMode: els.runtimeDebugInput.checked
  };
  state.runtime.upgrade.targetVersion = els.runtimeUpgradeTargetInput.value.trim() || "1.2.46";
  state.runtime = normalizeRuntime(state.runtime);
  persist();
  renderRuntimeDialog();
}

function runDatabaseBackupSimulation() {
  const now = new Date().toISOString();
  state.runtime.database.lastBackupAt = now;
  state.runtime.upgrade.backupVerified = true;
  addRuntimeLog("db:backup", `${dbDriverLabel(state.runtime.database.driver)} 备份已模拟完成`);
  persist();
  renderRuntimeDialog();
}

function runDatabaseMigrationSimulation() {
  const now = new Date().toISOString();
  state.runtime.database.currentSchemaVersion = state.runtime.database.latestSchemaVersion;
  state.runtime.database.migrationStatus = "已同步";
  state.runtime.upgrade.maintenanceMode = true;
  addRuntimeLog("db:migrate", `Schema 已迁移到 ${state.runtime.database.latestSchemaVersion} · ${now.slice(0, 10)}`);
  persist();
  renderRuntimeDialog();
}

function runDatabaseOptimizeSimulation() {
  const now = new Date().toISOString();
  state.runtime.database.lastOptimizeAt = now;
  const result = state.runtime.database.driver === "sqlite"
    ? "SQLite VACUUM 优化已模拟完成"
    : `${dbDriverLabel(state.runtime.database.driver)} 连接与索引检查已模拟完成`;
  addRuntimeLog("db:optimize", result);
  persist();
  renderRuntimeDialog();
}

function addRuntimeLog(action, result) {
  state.runtime.logs.unshift({
    id: uid("runtime-log"),
    action,
    result,
    createdAt: new Date().toISOString()
  });
  state.runtime.logs = state.runtime.logs.slice(0, 12);
}

function runtimeRiskMessages() {
  const { database, environment, php, upgrade } = state.runtime;
  const messages = [];
  if (phpVersionBelow(environment.phpVersion, "8.1.0")) {
    messages.push("PHP 版本低于 Kanboard 当前要求的 8.1。");
  }
  runtimeRequiredExtensions(database.driver).forEach((extension) => {
    if (!php.extensions[extension]) messages.push(`缺少 PHP 扩展：${extension}。`);
  });
  if (database.driver === "sqlite" && ["docker", "nfs", "high-availability"].includes(environment.storageProfile)) {
    messages.push("SQLite 不适合 Docker、NFS 或高可用/高并发部署。");
  }
  if (!environment.dataDirectoryWritable) {
    messages.push("data 目录不可写会影响 SQLite、上传文件、缓存和日志。");
  }
  if (environment.cacheDriver === "file" && !environment.cacheDirectoryWritable) {
    messages.push("文件缓存目录不可写，缓存配置不可用。");
  }
  if (!environment.opcacheEnabled) {
    messages.push("未开启 OpCode 缓存，生产环境性能会下降。");
  }
  if (environment.debugMode) {
    messages.push("DEBUG 已开启，生产环境应关闭调试日志。");
  }
  if (!database.lastBackupAt && database.currentSchemaVersion < database.latestSchemaVersion) {
    messages.push("存在待迁移 Schema，升级前应先完成数据库备份。");
  }
  if (upgrade.targetVersion && !upgrade.changeLogReviewed) {
    messages.push("升级前需要阅读 ChangeLog 并确认破坏性变更。");
  }
  if (upgrade.targetVersion && !upgrade.workersStopped) {
    messages.push("升级前应停止 Background Worker。");
  }
  if (upgrade.targetVersion && !upgrade.maintenanceMode) {
    messages.push("升级迁移期间应开启维护模式。");
  }
  return messages;
}

function runtimeRequiredExtensions(driver) {
  return [...CORE_PHP_EXTENSIONS, DRIVER_EXTENSION_MAP[driver] || DRIVER_EXTENSION_MAP.sqlite];
}

function buildRuntimeConfigPreview() {
  const { database, environment } = state.runtime;
  const portValue = database.port ? Number(database.port) : "null";
  return [
    "<?php",
    `define('DB_RUN_MIGRATIONS', ${phpBool(database.autoMigrations)});`,
    `define('DB_DRIVER', '${escapeConfigValue(database.driver)}');`,
    `define('DB_WAL_MODE', ${phpBool(database.walMode)});`,
    `define('DB_FILENAME', '${escapeConfigValue(database.sqlitePath)}');`,
    `define('DB_USERNAME', '${escapeConfigValue(database.username)}');`,
    "define('DB_PASSWORD', '********');",
    `define('DB_HOSTNAME', '${escapeConfigValue(database.host)}');`,
    `define('DB_NAME', '${escapeConfigValue(database.name)}');`,
    `define('DB_PORT', ${portValue});`,
    `define('FILES_DIR', '${escapeConfigValue(environment.filesDir)}');`,
    `define('CACHE_DRIVER', '${escapeConfigValue(environment.cacheDriver)}');`,
    "define('CACHE_DIR', DATA_DIR.DIRECTORY_SEPARATOR.'cache');",
    `define('ENABLE_URL_REWRITE', ${phpBool(environment.urlRewrite)});`,
    `define('DEBUG', ${phpBool(environment.debugMode)});`,
    "define('LOG_DRIVER', 'file');"
  ].join("\n");
}

function phpVersionBelow(current, minimum) {
  const parse = (value) => String(value).split(".").map((part) => Number.parseInt(part, 10) || 0);
  const currentParts = parse(current);
  const minimumParts = parse(minimum);
  for (let index = 0; index < 3; index += 1) {
    if (currentParts[index] < minimumParts[index]) return true;
    if (currentParts[index] > minimumParts[index]) return false;
  }
  return false;
}

function dbDriverLabel(value) {
  return DB_DRIVER_OPTIONS.find((option) => option.value === value)?.label || value;
}

function openDeploymentDialog() {
  renderDeploymentDialog();
  els.deploymentDialog.showModal();
}

function renderDeploymentDialog() {
  const { install, docker, access } = state.deployment;
  els.deploymentMethodInput.value = install.method;
  els.deploymentVersionInput.value = install.sourceVersion;
  els.deploymentPathInput.value = install.installPath;
  els.deploymentBaseUrlInput.value = install.baseUrl;
  els.deploymentPasswordChangedInput.checked = Boolean(install.defaultPasswordChanged);
  els.deploymentDataProtectedInput.checked = Boolean(install.dataDirectoryProtected);
  els.deploymentHtaccessInput.checked = Boolean(install.htaccessOrWebConfigEnabled);
  els.deploymentDataWritableInput.checked = Boolean(install.dataDirectoryWritable);
  els.deploymentOutsideRootInput.checked = Boolean(install.outsideDocumentRoot);
  els.deploymentRequirementsInput.checked = Boolean(install.requirementsChecked);
  els.dockerEnabledInput.checked = Boolean(docker.enabled);
  els.dockerRegistryInput.value = docker.registry;
  els.dockerTagInput.value = docker.imageTag;
  els.dockerPinnedInput.checked = Boolean(docker.versionPinned);
  els.dockerDataVolumeInput.checked = Boolean(docker.dataVolume);
  els.dockerPluginsVolumeInput.checked = Boolean(docker.pluginsVolume);
  els.dockerSslVolumeInput.checked = Boolean(docker.sslVolume);
  els.dockerEnvConfigInput.checked = Boolean(docker.envConfig);
  els.dockerCustomConfigInput.checked = Boolean(docker.customConfigInData);
  els.dockerHealthcheckInput.checked = Boolean(docker.healthcheckEnabled);
  els.dockerComposeProfileInput.value = docker.composeProfile;
  els.dockerSmtpInput.checked = Boolean(docker.smtpTransportPlanned);
  els.accessWebServerInput.value = access.webServer;
  els.accessRewriteInput.checked = Boolean(access.urlRewrite);
  els.accessSubfolderInput.value = access.subfolder;
  els.accessDataDenyInput.checked = Boolean(access.dataDenyRule);
  els.accessHtaccessDenyInput.checked = Boolean(access.htaccessDenyRule);
  els.accessProxyInput.checked = Boolean(access.behindReverseProxy);
  els.accessDirectBlockedInput.checked = Boolean(access.directAccessBlocked);
  els.accessStripAuthInput.checked = Boolean(access.stripAuthHeaders);
  els.accessStripForwardedInput.checked = Boolean(access.stripForwardedHeaders);
  els.accessTrustedProxyInput.value = access.trustedProxyNetworks;
  els.accessForwardProtoInput.checked = Boolean(access.forwardedProto);
  els.accessRateLimitInput.checked = Boolean(access.rateLimitEnabled);
  els.accessOutboundRestrictedInput.checked = Boolean(access.outboundNetworkRestricted);
  renderDeploymentSummary();
  renderDeploymentRisks();
  renderDeploymentLogs();
  els.deploymentRunbookPreview.value = buildDeploymentRunbookPreview();
  const risks = deploymentRiskMessages();
  els.deploymentStatus.textContent = risks[0] || "部署检查已通过，安装、访问和反向代理配置处于可发布状态。";
}

function renderDeploymentSummary() {
  const { install, docker, access } = state.deployment;
  const risks = deploymentRiskMessages();
  els.deploymentSummary.innerHTML = `
    <div class="analytics-card">
      <span>安装方式</span>
      <strong>${deploymentMethodLabel(install.method)}</strong>
    </div>
    <div class="analytics-card">
      <span>Docker</span>
      <strong>${docker.enabled ? docker.imageTag : "未启用"}</strong>
    </div>
    <div class="analytics-card">
      <span>访问层</span>
      <strong>${access.webServer.toUpperCase()}</strong>
    </div>
    <div class="analytics-card">
      <span>风险</span>
      <strong>${risks.length}</strong>
    </div>
  `;
}

function renderDeploymentRisks() {
  const risks = deploymentRiskMessages();
  els.deploymentRiskList.innerHTML = risks.length
    ? risks.map((message) => `
      <div class="settings-item deployment-risk-item fail">
        <div>
          <strong>待处理</strong>
          <span>${escapeHtml(message)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="settings-item deployment-risk-item pass"><div><strong>检查通过</strong><span>安装、Docker、访问和安全暴露面暂无高风险提示。</span></div></div>`;
}

function renderDeploymentLogs() {
  els.deploymentLogList.innerHTML = state.deployment.logs.length
    ? state.deployment.logs.map((entry) => `
      <div class="settings-item deployment-log-item">
        <div>
          <strong>${escapeHtml(entry.action)}</strong>
          <span>${escapeHtml(entry.result)} · ${formatTime(entry.createdAt)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="empty-state">暂无部署检查日志</div>`;
}

function updateDeploymentFromDialog() {
  state.deployment.install = {
    ...state.deployment.install,
    method: els.deploymentMethodInput.value,
    sourceVersion: els.deploymentVersionInput.value.trim() || "1.2.46",
    installPath: els.deploymentPathInput.value.trim() || "/var/www/kanboard",
    baseUrl: els.deploymentBaseUrlInput.value.trim() || "https://kanboard.example.com",
    defaultPasswordChanged: els.deploymentPasswordChangedInput.checked,
    dataDirectoryProtected: els.deploymentDataProtectedInput.checked,
    htaccessOrWebConfigEnabled: els.deploymentHtaccessInput.checked,
    dataDirectoryWritable: els.deploymentDataWritableInput.checked,
    outsideDocumentRoot: els.deploymentOutsideRootInput.checked,
    requirementsChecked: els.deploymentRequirementsInput.checked
  };
  state.deployment.docker = {
    ...state.deployment.docker,
    enabled: els.dockerEnabledInput.checked || els.deploymentMethodInput.value === "docker",
    registry: els.dockerRegistryInput.value,
    imageTag: els.dockerTagInput.value.trim() || "v1.2.46",
    versionPinned: els.dockerPinnedInput.checked,
    dataVolume: els.dockerDataVolumeInput.checked,
    pluginsVolume: els.dockerPluginsVolumeInput.checked,
    sslVolume: els.dockerSslVolumeInput.checked,
    envConfig: els.dockerEnvConfigInput.checked,
    customConfigInData: els.dockerCustomConfigInput.checked,
    healthcheckEnabled: els.dockerHealthcheckInput.checked,
    composeProfile: els.dockerComposeProfileInput.value,
    smtpTransportPlanned: els.dockerSmtpInput.checked
  };
  state.deployment.access = {
    ...state.deployment.access,
    webServer: els.accessWebServerInput.value,
    urlRewrite: els.accessRewriteInput.checked,
    subfolder: els.accessSubfolderInput.value.trim(),
    dataDenyRule: els.accessDataDenyInput.checked,
    htaccessDenyRule: els.accessHtaccessDenyInput.checked,
    behindReverseProxy: els.accessProxyInput.checked,
    directAccessBlocked: els.accessDirectBlockedInput.checked,
    stripAuthHeaders: els.accessStripAuthInput.checked,
    stripForwardedHeaders: els.accessStripForwardedInput.checked,
    trustedProxyNetworks: els.accessTrustedProxyInput.value.trim(),
    forwardedProto: els.accessForwardProtoInput.checked,
    rateLimitEnabled: els.accessRateLimitInput.checked,
    outboundNetworkRestricted: els.accessOutboundRestrictedInput.checked
  };
  state.deployment = normalizeDeployment(state.deployment);
  persist();
  renderDeploymentDialog();
}

function runDeploymentHealthcheckSimulation() {
  const { docker } = state.deployment;
  const ok = docker.enabled && docker.healthcheckEnabled && docker.dataVolume;
  state.deployment.docker.healthStatus = ok ? "200 OK" : "503 Service Unavailable";
  addDeploymentLog("healthcheck.php", ok ? "Database connection is OK" : "Health check failed: missing Docker healthcheck or data volume");
  persist();
  renderDeploymentDialog();
}

function addDeploymentLog(action, result) {
  state.deployment.logs.unshift({
    id: uid("deployment-log"),
    action,
    result,
    createdAt: new Date().toISOString()
  });
  state.deployment.logs = state.deployment.logs.slice(0, 12);
}

function deploymentRiskMessages() {
  const { install, docker, access } = state.deployment;
  const messages = [];
  if (!install.requirementsChecked) messages.push("安装前尚未确认 Kanboard 运行要求。");
  if (!install.defaultPasswordChanged) messages.push("默认 admin/admin 密码尚未标记为已修改。");
  if (!install.dataDirectoryProtected) messages.push("data 目录尚未确认禁止通过 URL 公开访问。");
  if (!install.htaccessOrWebConfigEnabled && ["apache", "iis"].includes(access.webServer)) {
    messages.push("Apache/IIS 场景需要确认 .htaccess 或 web.config 生效。");
  }
  if (!install.dataDirectoryWritable) messages.push("data 目录不可写会影响 SQLite、上传文件、调试日志和缩略图。");
  if (docker.enabled) {
    if (!docker.versionPinned || ["latest", "nightly"].includes(docker.imageTag)) {
      messages.push("Docker 镜像未固定具体版本，存在意外升级风险。");
    }
    if (!docker.dataVolume) messages.push("Docker 未配置 /var/www/app/data 持久化卷。");
    if (!docker.pluginsVolume) messages.push("Docker 未配置 /var/www/app/plugins 持久化卷。");
    if (!docker.healthcheckEnabled) messages.push("Docker healthcheck 未开启，无法表达存活和就绪检查。");
    if (!docker.smtpTransportPlanned) messages.push("官方 Docker 镜像不适合使用 mail/sendmail，应规划 SMTP 或邮件服务插件。");
  }
  if (access.urlRewrite && access.webServer !== "apache" && !access.dataDenyRule) {
    messages.push("非 Apache URL Rewrite 场景需要显式配置 data 目录拒绝访问规则。");
  }
  if (!access.dataDenyRule) messages.push("Web Server 未确认阻止 /data 目录访问。");
  if (access.behindReverseProxy) {
    if (!access.trustedProxyNetworks.trim()) messages.push("反向代理启用时缺少 TRUSTED_PROXY_NETWORKS。");
    if (!access.directAccessBlocked) messages.push("Kanboard 仍可能被绕过反向代理直接访问。");
    if (!access.stripAuthHeaders) messages.push("反向代理未确认清理客户端传入的认证 Header。");
    if (!access.stripForwardedHeaders) messages.push("反向代理未确认覆盖客户端传入的 X-Forwarded-* Header。");
    if (!access.forwardedProto) messages.push("反向代理未确认转发 X-Forwarded-Proto，可能影响 HTTPS 链接。");
  }
  if (!access.rateLimitEnabled) messages.push("未在 Web Server 或反向代理层规划登录限流。");
  if (!access.outboundNetworkRestricted) messages.push("未限制 Webhook、插件或外链抓取的出站网络访问，存在 SSRF 风险。");
  return messages;
}

function buildDeploymentRunbookPreview() {
  const { install, docker, access } = state.deployment;
  const image = `${docker.registry}:${docker.imageTag}`;
  const subfolder = access.subfolder ? access.subfolder.replace(/\/$/, "") : "";
  const lines = [
    "# Kanboard deployment runbook",
    `install_method=${install.method}`,
    `source_version=${install.sourceVersion}`,
    `install_path=${install.installPath}`,
    `base_url=${install.baseUrl}`,
    "",
    "# Installation checklist",
    `requirements_checked=${install.requirementsChecked}`,
    `default_password_changed=${install.defaultPasswordChanged}`,
    `data_directory_protected=${install.dataDirectoryProtected}`,
    `data_directory_writable=${install.dataDirectoryWritable}`,
    "",
    "# URL rewrite",
    `define('ENABLE_URL_REWRITE', ${phpBool(access.urlRewrite)});`,
    access.webServer === "nginx"
      ? `try_files $uri $uri/ ${subfolder || ""}/index.php$is_args$args;`
      : access.webServer === "apache"
        ? "AllowOverride FileInfo Options=All,MultiViews AuthConfig"
        : access.webServer === "iis"
          ? "web.config rewrite rule: index.php appendQueryString=true"
          : "configure equivalent rewrite rules in the selected web server",
    "deny /data and dotfiles from public access",
    "",
    "# Reverse proxy hardening",
    `TRUSTED_PROXY_NETWORKS=${access.trustedProxyNetworks}`,
    `strip_auth_headers=${access.stripAuthHeaders}`,
    `strip_forwarded_headers=${access.stripForwardedHeaders}`,
    `direct_access_blocked=${access.directAccessBlocked}`,
    "",
    "# Docker",
    `image=${image}`,
    `docker run -d --name kanboard -p 80:80 -t ${image}`,
    `volumes=data:${docker.dataVolume},plugins:${docker.pluginsVolume},ssl:${docker.sslVolume}`,
    `healthcheck=${docker.healthcheckEnabled ? "curl http://localhost/healthcheck.php" : "disabled"}`,
    `compose_profile=${docker.composeProfile}`
  ];
  return lines.join("\n");
}

function deploymentMethodLabel(value) {
  return DEPLOYMENT_METHODS.find((item) => item.value === value)?.label || value;
}

function openOperationsDialog() {
  renderOperationsDialog();
  els.operationsDialog.showModal();
}

function renderOperationsDialog() {
  const { cron, worker, mail, cli } = state.operations;
  els.cronModeInput.value = cron.mode;
  els.cronScheduleInput.value = cron.schedule;
  els.cronWindowsInput.value = cron.windowsTask;
  els.cronUrlInput.value = cron.url;
  els.mailTransportInput.value = mail.transport;
  els.mailFromInput.value = mail.from;
  els.mailHostInput.value = mail.hostname;
  els.mailPortInput.value = mail.port;
  els.mailEncryptionInput.value = mail.encryption;
  els.mailUserInput.value = mail.username;
  els.mailAppUrlInput.value = mail.appUrl;
  els.mailTestRecipientInput.value = mail.testRecipient;
  els.workerEnabledInput.checked = Boolean(worker.enabled);
  els.workerQueueInput.value = worker.queueDriver;
  els.workerSupervisorInput.value = worker.supervisor;
  els.cliCommandInput.innerHTML = CLI_COMMANDS.map((command) => `<option value="${command.value}">${command.label}</option>`).join("");
  els.cliCommandInput.value = CLI_COMMANDS.some((command) => command.value === cli.selectedCommand) ? cli.selectedCommand : "cronjob";
  els.cliPreviewInput.value = cliCommandPreview(els.cliCommandInput.value);
  renderOperationsSummary();
  renderJobQueue();
  renderCliLogs();
}

function renderOperationsSummary() {
  const { cron, worker, mail, jobs } = state.operations;
  const pendingJobs = jobs.filter((job) => ["pending", "running"].includes(job.status)).length;
  els.operationsSummary.innerHTML = `
    <div class="analytics-card">
      <span>Cronjob</span>
      <strong>${cron.status}</strong>
    </div>
    <div class="analytics-card">
      <span>队列</span>
      <strong>${pendingJobs}</strong>
    </div>
    <div class="analytics-card">
      <span>Worker</span>
      <strong>${worker.enabled ? "监控" : "关闭"}</strong>
    </div>
    <div class="analytics-card">
      <span>邮件</span>
      <strong>${mail.transport}</strong>
    </div>
  `;
}

function renderJobQueue() {
  els.jobQueueList.innerHTML = state.operations.jobs.length
    ? state.operations.jobs.map((job) => `
      <div class="settings-item operation-job-item ${job.status}" data-id="${job.id}">
        <div>
          <strong>${escapeHtml(job.name)}</strong>
          <span>${escapeHtml(job.command)}${job.lastRunAt ? ` · ${formatTime(job.lastRunAt)}` : ""}</span>
        </div>
        <span class="role-pill">${operationStatusLabel(job.status)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无后台任务</div>`;
}

function renderCliLogs() {
  els.cliLogList.innerHTML = state.operations.cli.logs.length
    ? state.operations.cli.logs.map((entry) => `
      <div class="settings-item operation-log-item">
        <div>
          <strong>${escapeHtml(entry.command)}</strong>
          <span>${escapeHtml(entry.result)} · ${formatTime(entry.createdAt)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="empty-state">暂无命令日志</div>`;
}

function updateOperationsFromDialog() {
  state.operations.cron = {
    ...state.operations.cron,
    mode: els.cronModeInput.value,
    schedule: els.cronScheduleInput.value.trim() || "0 8 * * *",
    windowsTask: els.cronWindowsInput.value.trim(),
    url: els.cronUrlInput.value.trim()
  };
  state.operations.mail = {
    ...state.operations.mail,
    transport: els.mailTransportInput.value,
    from: els.mailFromInput.value.trim(),
    hostname: els.mailHostInput.value.trim(),
    port: clampNumber(els.mailPortInput.value, 1, 65535, 587),
    encryption: els.mailEncryptionInput.value,
    username: els.mailUserInput.value.trim(),
    appUrl: els.mailAppUrlInput.value.trim(),
    testRecipient: els.mailTestRecipientInput.value.trim()
  };
  state.operations.worker = {
    ...state.operations.worker,
    enabled: els.workerEnabledInput.checked,
    queueDriver: els.workerQueueInput.value,
    supervisor: els.workerSupervisorInput.value,
    status: els.workerEnabledInput.checked ? "监控中" : "未启动"
  };
  state.operations.cli.selectedCommand = els.cliCommandInput.value;
  state.operations = normalizeOperations(state.operations);
  persist();
  renderOperationsDialog();
}

function runCronSimulation() {
  const now = new Date().toISOString();
  let completed = 0;
  state.operations.jobs.forEach((job) => {
    if (["pending", "running"].includes(job.status)) {
      job.status = "done";
      job.lastRunAt = now;
      completed += 1;
    }
  });
  state.operations.cron.lastRunAt = now;
  state.operations.cron.status = "已运行";
  state.operations.worker.processed += completed;
  addOperationLog("cronjob", `已处理 ${completed} 个每日后台任务`);
  els.operationsStatus.textContent = "Cronjob 已模拟运行：统计、逾期通知和自动动作已更新。";
  persist();
  renderOperationsDialog();
}

function runWorkerSimulation() {
  const now = new Date().toISOString();
  state.operations.worker.enabled = true;
  state.operations.worker.status = "监控中";
  const job = state.operations.jobs.find((item) => ["pending", "waiting", "running"].includes(item.status));
  if (job) {
    job.status = "done";
    job.lastRunAt = now;
    state.operations.worker.processed += 1;
    addOperationLog("worker", `队列任务完成：${job.name}`);
    els.operationsStatus.textContent = `Worker 已处理：${job.name}`;
  } else {
    addOperationLog("worker", "队列为空");
    els.operationsStatus.textContent = "Worker 队列暂无待处理任务。";
  }
  persist();
  renderOperationsDialog();
}

function sendTestMailSimulation() {
  const now = new Date().toISOString();
  state.operations.mail.lastTestAt = now;
  addOperationLog("mail:test", `测试邮件已发送到 ${state.operations.mail.testRecipient || "未指定收件人"}`);
  els.operationsStatus.textContent = "测试邮件已模拟发送。";
  persist();
  renderOperationsDialog();
}

function runCliSimulation() {
  const command = state.operations.cli.selectedCommand;
  if (command === "cronjob") {
    runCronSimulation();
    return;
  }
  if (command === "worker") {
    runWorkerSimulation();
    return;
  }
  const result = command === "db:version"
    ? "Current version: 95 / Last version: 96"
    : command === "db:migrate"
      ? "数据库迁移已模拟完成"
      : "命令已模拟执行";
  addOperationLog(command, result);
  els.operationsStatus.textContent = result;
  persist();
  renderOperationsDialog();
}

function addOperationLog(command, result) {
  state.operations.cli.logs.unshift({
    id: uid("log"),
    command,
    result,
    createdAt: new Date().toISOString()
  });
  state.operations.cli.logs = state.operations.cli.logs.slice(0, 12);
}

function cliCommandPreview(commandValue) {
  return CLI_COMMANDS.find((command) => command.value === commandValue)?.preview || "./cli";
}

function operationStatusLabel(status) {
  return {
    pending: "待处理",
    running: "运行中",
    done: "已完成",
    failed: "失败",
    waiting: "等待"
  }[status] || status;
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
    const column = { id: uid("column"), key: uid("phase"), title, wipLimit, cards: [] };
    project.columns.push(column);
    project.timeline = normalizeProjectTimeline(project);
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

function openSwimlaneDialog(swimlaneId = null) {
  editingSwimlaneId = swimlaneId;
  const lane = swimlaneId ? activeProject().swimlanes.find((item) => item.id === swimlaneId) : null;
  els.swimlaneDialogTitle.textContent = lane ? "编辑泳道" : "新增泳道";
  els.swimlaneTitleInput.value = lane?.title || "";
  els.swimlaneDescInput.value = lane?.description || "";
  els.deleteSwimlaneBtn.style.visibility = lane ? "visible" : "hidden";
  els.swimlaneDialog.showModal();
  els.swimlaneTitleInput.focus();
}

function saveSwimlaneFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.swimlaneTitleInput.value.trim();
  if (!title) return;
  const project = activeProject();

  if (editingSwimlaneId) {
    const lane = project.swimlanes.find((item) => item.id === editingSwimlaneId);
    lane.title = title;
    lane.description = els.swimlaneDescInput.value.trim();
  } else {
    project.swimlanes.push({ id: uid("lane"), title, description: els.swimlaneDescInput.value.trim() });
  }

  editingSwimlaneId = null;
  els.swimlaneDialog.close();
  persist();
  render();
}

function deleteEditingSwimlane() {
  if (!editingSwimlaneId) return;
  const project = activeProject();
  if (project.swimlanes.length <= 1) {
    alert("至少保留一个泳道。");
    return;
  }
  const lane = project.swimlanes.find((item) => item.id === editingSwimlaneId);
  if (!confirm(`删除泳道“${lane.title}”？其中任务会移动到第一个泳道。`)) return;
  const fallbackLane = project.swimlanes.find((item) => item.id !== editingSwimlaneId);
  project.columns.forEach((column) => {
    column.cards.forEach((card) => {
      if (card.swimlaneId === editingSwimlaneId) card.swimlaneId = fallbackLane.id;
    });
  });
  project.swimlanes = project.swimlanes.filter((item) => item.id !== editingSwimlaneId);
  editingSwimlaneId = null;
  els.swimlaneDialog.close();
  persist();
  render();
}

function openCardDialog(columnId, cardId = null, swimlaneId = null) {
  const project = activeProject();
  const column = project.columns.find((item) => item.id === columnId);
  const card = cardId ? column.cards.find((item) => item.id === cardId) : null;
  editingCard = { columnId, cardId };
  const laneId = card?.swimlaneId || swimlaneId || project.settings.defaultSwimlaneId || project.swimlanes[0].id;

  els.cardDialogTitle.textContent = card ? "编辑任务" : "新增任务";
  els.cardTitleInput.value = card?.title || "";
  els.cardDescInput.value = card?.description || "";
  els.cardAssigneeInput.value = card?.assignee || "";
  els.cardCategoryInput.value = card?.category || "";
  els.cardPriorityInput.value = card?.priority || "中";
  els.cardDueInput.value = card?.dueDate || "";
  els.cardTagsInput.value = card?.tags?.join(", ") || "";
  els.cardColorInput.value = card?.color || "blue";
  els.cardEstimateInput.value = card?.estimate || "";
  els.cardActualInput.value = card?.actualTime || "";
  els.cardPlannedStartInput.value = card?.schedule?.plannedStart || "";
  els.cardPlannedEndInput.value = card?.schedule?.plannedEnd || "";
  els.cardActualStartInput.value = card?.schedule?.actualStart || "";
  els.cardActualEndInput.value = card?.schedule?.actualEnd || "";
  els.recurringPatternInput.value = card?.recurring?.pattern || "";
  els.recurringNextDateInput.value = card?.recurring?.nextDate || "";
  els.cardSwimlaneInput.innerHTML = enabledSwimlanes(project).map((lane) => `<option value="${lane.id}">${escapeHtml(lane.title)}</option>`).join("");
  els.cardSwimlaneInput.value = laneId;
  if (!els.cardSwimlaneInput.value) els.cardSwimlaneInput.value = enabledSwimlanes(project)[0].id;
  els.deleteCardBtn.style.visibility = card ? "visible" : "hidden";
  els.cardOperations.style.display = card ? "grid" : "none";
  els.cardLinksSection.style.display = card ? "grid" : "none";
  els.cardStatusText.textContent = card?.isClosed ? "已关闭" : "打开";
  els.toggleCardClosedBtn.textContent = card?.isClosed ? "重新打开任务" : "关闭任务";
  els.moveProjectInput.innerHTML = state.projects
    .filter((item) => item.id !== project.id)
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`)
    .join("");
  els.moveCardBtn.disabled = !card || state.projects.length <= 1;
  draftSubtasks = clone(card?.subtasks || []);
  draftComments = clone(card?.comments || []);
  draftActivity = clone(card?.activity || []);
  draftLinks = clone(card?.links || []);
  draftTimeLogs = clone(card?.timeLogs || []);
  draftAttachments = clone(card?.attachments || []);
  renderCardLinkOptions(card?.id);
  renderCardDetails();
  els.cardDialog.showModal();
  els.cardTitleInput.focus();
}

function saveCardFromDialog(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const title = els.cardTitleInput.value.trim();
  if (!title) return;

  const project = activeProject();
  const sourceColumn = project.columns.find((item) => item.id === editingCard.columnId);
  const targetSwimlaneId = els.cardSwimlaneInput.value;
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
    estimate: els.cardEstimateInput.value,
    actualTime: els.cardActualInput.value,
    schedule: {
      plannedStart: els.cardPlannedStartInput.value,
      plannedEnd: els.cardPlannedEndInput.value,
      actualStart: els.cardActualStartInput.value,
      actualEnd: els.cardActualEndInput.value
    },
    timeLogs: draftTimeLogs,
    attachments: draftAttachments,
    recurring: {
      pattern: els.recurringPatternInput.value,
      nextDate: els.recurringNextDateInput.value
    },
    swimlaneId: targetSwimlaneId,
    subtasks: draftSubtasks,
    comments: draftComments,
    links: draftLinks,
    activity: draftActivity,
    updatedAt: new Date().toISOString()
  };

  if (editingCard.cardId) {
    const card = sourceColumn.cards.find((item) => item.id === editingCard.cardId);
    payload.activity = addActivity(draftActivity, "更新了任务信息");
    Object.assign(card, payload);
  } else {
    const card = makeCard(payload);
    card.comments = draftComments;
    card.activity = addActivity(card.activity, "添加到看板");
    sourceColumn.cards.push(card);
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

function toggleEditingCardClosed() {
  const context = findCardContext(editingCard?.cardId);
  if (!context) return;
  context.card.isClosed = !context.card.isClosed;
  context.card.updatedAt = new Date().toISOString();
  context.card.activity = addActivity(context.card.activity || [], context.card.isClosed ? "关闭了任务" : "重新打开了任务");
  draftActivity = clone(context.card.activity);
  els.cardStatusText.textContent = context.card.isClosed ? "已关闭" : "打开";
  els.toggleCardClosedBtn.textContent = context.card.isClosed ? "重新打开任务" : "关闭任务";
  persist();
  render();
  renderCardDetails();
}

function duplicateEditingCard() {
  const context = findCardContext(editingCard?.cardId);
  if (!context) return;
  const copy = cloneCardForCopy(context.card);
  context.column.cards.push(copy);
  persist();
  render();
  alert("已复制任务到当前列。");
}

function duplicateCardFromBoard(cardId) {
  const context = findCardContext(cardId);
  if (!context) return;
  const copy = cloneCardForCopy(context.card);
  context.column.cards.push(copy);
  closeBoardMenus();
  persist();
  render();
}

function toggleCardClosedFromBoard(cardId) {
  const context = findCardContext(cardId);
  if (!context) return;
  context.card.isClosed = !context.card.isClosed;
  context.card.updatedAt = new Date().toISOString();
  context.card.activity = addActivity(context.card.activity || [], context.card.isClosed ? "从看板菜单关闭任务" : "从看板菜单重新打开任务");
  closeBoardMenus();
  persist();
  render();
}

function closeBoardMenus() {
  document.querySelectorAll(".board-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function moveEditingCardToProject() {
  const targetProjectId = els.moveProjectInput.value;
  const context = findCardContext(editingCard?.cardId);
  const targetProject = state.projects.find((project) => project.id === targetProjectId);
  if (!context || !targetProject) return;

  context.column.cards = context.column.cards.filter((card) => card.id !== context.card.id);
  const targetColumn = targetProject.columns[0];
  const targetLane = targetProject.swimlanes.find((lane) => lane.id === targetProject.settings.defaultSwimlaneId) || enabledSwimlanes(targetProject)[0];
  context.card.swimlaneId = targetLane.id;
  context.card.updatedAt = new Date().toISOString();
  context.card.activity = addActivity(context.card.activity || [], `移动到项目“${targetProject.name}”`);
  targetColumn.cards.push(context.card);
  state.activeProjectId = targetProject.id;
  editingCard = null;
  els.cardDialog.close();
  persist();
  render();
}

function addDraftLink() {
  const targetCardId = els.linkTaskInput.value;
  const target = allCards().find((card) => card.id === targetCardId);
  if (!target || draftLinks.some((link) => link.targetCardId === targetCardId && link.type === els.linkTypeInput.value)) return;
  draftLinks.push({
    id: uid("link"),
    type: els.linkTypeInput.value,
    targetCardId,
    targetTitle: target.title
  });
  draftActivity = addActivity(draftActivity, `添加了“${els.linkTypeInput.value}”任务链接`);
  renderCardDetails();
}

function addDraftSubtask() {
  const title = els.subtaskInput.value.trim();
  if (!title) return;
  draftSubtasks.push({ id: uid("subtask"), title, done: false });
  els.subtaskInput.value = "";
  renderCardDetails();
}

function addDraftTimeEntry() {
  const hours = Number(els.timeSpentInput.value);
  if (!hours || hours <= 0) return;
  draftTimeLogs.unshift({
    id: uid("time"),
    hours,
    note: els.timeNoteInput.value.trim() || "记录耗时",
    createdAt: new Date().toISOString()
  });
  draftActivity = addActivity(draftActivity, `记录了 ${formatHours(hours)}h 耗时`);
  els.timeSpentInput.value = "";
  els.timeNoteInput.value = "";
  renderCardDetails();
}

function addDraftAttachment() {
  const name = els.attachmentNameInput.value.trim();
  if (!name) return;
  draftAttachments.unshift({
    id: uid("attachment"),
    name,
    meta: els.attachmentMetaInput.value.trim() || "附件",
    createdAt: new Date().toISOString()
  });
  draftActivity = addActivity(draftActivity, `添加附件“${name}”`);
  els.attachmentNameInput.value = "";
  els.attachmentMetaInput.value = "";
  renderCardDetails();
}

function addDraftComment() {
  const text = els.commentInput.value.trim();
  if (!text) return;
  draftComments.unshift({ id: uid("comment"), author: "我", text, createdAt: new Date().toISOString() });
  draftActivity = addActivity(draftActivity, "添加了评论");
  els.commentInput.value = "";
  renderCardDetails();
}

function renderCardLinkOptions(currentCardId) {
  const options = allCards()
    .filter((card) => card.id !== currentCardId)
    .map((card) => `<option value="${card.id}">${escapeHtml(card.title)} · ${escapeHtml(card.columnTitle)}</option>`)
    .join("");
  els.linkTaskInput.innerHTML = options || `<option value="">暂无可链接任务</option>`;
  els.addLinkBtn.disabled = !options;
}

function renderCardDetails() {
  const progress = getSubtaskProgress({ subtasks: draftSubtasks });
  els.subtaskSummary.textContent = `${progress.done}/${progress.total}`;
  const baseActual = Number(els.cardActualInput.value) || 0;
  const logTotal = draftTimeLogs.reduce((sum, item) => sum + Number(item.hours || 0), 0);
  els.timeSummary.textContent = `${formatHours(baseActual + logTotal)}h 实际`;
  els.attachmentSummary.textContent = `${draftAttachments.length} 个`;
  els.timeLogList.innerHTML = draftTimeLogs.length
    ? draftTimeLogs.map((entry) => `
      <div class="settings-item time-entry" data-id="${entry.id}">
        <strong>${formatHours(entry.hours)}h</strong>
        <span>${escapeHtml(entry.note)} · ${formatTime(entry.createdAt)}</span>
        <button class="mini-button" type="button" aria-label="删除时间记录">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无时间记录</div>`;
  els.timeLogList.querySelectorAll(".time-entry").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftTimeLogs = draftTimeLogs.filter((entry) => entry.id !== row.dataset.id);
      draftActivity = addActivity(draftActivity, "删除了一条时间记录");
      renderCardDetails();
    });
  });

  els.attachmentList.innerHTML = draftAttachments.length
    ? draftAttachments.map((attachment) => `
      <div class="settings-item attachment-item" data-id="${attachment.id}">
        <div>
          <strong>${escapeHtml(attachment.name)}</strong>
          <span>${escapeHtml(attachment.meta)} · ${formatTime(attachment.createdAt)}</span>
        </div>
        <button class="mini-button" type="button" aria-label="删除附件">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无附件</div>`;
  els.attachmentList.querySelectorAll(".attachment-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftAttachments = draftAttachments.filter((attachment) => attachment.id !== row.dataset.id);
      draftActivity = addActivity(draftActivity, "删除了一个附件");
      renderCardDetails();
    });
  });

  els.subtaskList.innerHTML = draftSubtasks.length
    ? draftSubtasks.map((task) => `
      <div class="subtask-row ${task.done ? "done" : ""}" data-id="${task.id}">
        <input type="checkbox" ${task.done ? "checked" : ""} aria-label="完成子任务">
        <span>${escapeHtml(task.title)}</span>
        <button class="mini-button" type="button" aria-label="删除子任务">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无子任务</div>`;

  els.subtaskList.querySelectorAll(".subtask-row").forEach((row) => {
    const id = row.dataset.id;
    row.querySelector("input").addEventListener("change", (event) => {
      const task = draftSubtasks.find((item) => item.id === id);
      task.done = event.target.checked;
      draftActivity = addActivity(draftActivity, task.done ? "完成了一个子任务" : "重新打开一个子任务");
      renderCardDetails();
    });
    row.querySelector("button").addEventListener("click", () => {
      draftSubtasks = draftSubtasks.filter((item) => item.id !== id);
      draftActivity = addActivity(draftActivity, "删除了一个子任务");
      renderCardDetails();
    });
  });

  els.commentList.innerHTML = draftComments.length
    ? draftComments.map((comment) => `
      <div class="comment-item">
        <p>${escapeHtml(comment.text)}</p>
        <span>${escapeHtml(comment.author)} · ${formatTime(comment.createdAt)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无评论</div>`;

  els.linkList.innerHTML = draftLinks.length
    ? draftLinks.map((link) => `
      <div class="link-item" data-id="${link.id}">
        <p><strong>${escapeHtml(link.type)}</strong> ${escapeHtml(link.targetTitle)}</p>
        <button class="mini-button" type="button" aria-label="删除链接">×</button>
      </div>
    `).join("")
    : `<div class="empty-state">暂无任务链接</div>`;

  els.linkList.querySelectorAll(".link-item").forEach((row) => {
    row.querySelector("button").addEventListener("click", () => {
      draftLinks = draftLinks.filter((link) => link.id !== row.dataset.id);
      draftActivity = addActivity(draftActivity, "删除了一个任务链接");
      renderCardDetails();
    });
  });

  els.activityList.innerHTML = draftActivity.length
    ? draftActivity.slice(0, 8).map((item) => `
      <div class="activity-item">
        <p>${escapeHtml(item.text)}</p>
        <span>${formatTime(item.createdAt)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">暂无活动记录</div>`;
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
  const targetSwimlaneId = event.currentTarget.dataset.swimlaneId;
  event.currentTarget.classList.remove("drop-target");
  if (!draggedCard) return;
  if (draggedCard.columnId === targetColumnId && draggedCard.swimlaneId === targetSwimlaneId) return;

  const project = activeProject();
  const fromColumn = project.columns.find((column) => column.id === draggedCard.columnId);
  const toColumn = project.columns.find((column) => column.id === targetColumnId);
  const movingCard = fromColumn.cards.find((card) => card.id === draggedCard.cardId);
  const targetLane = project.swimlanes.find((lane) => lane.id === targetSwimlaneId);
  fromColumn.cards = fromColumn.cards.filter((card) => card.id !== draggedCard.cardId);
  movingCard.swimlaneId = targetSwimlaneId;
  movingCard.updatedAt = new Date().toISOString();
  movingCard.activity = addActivity(movingCard.activity || [], `移动到“${toColumn.title} / ${targetLane.title}”`);
  toColumn.cards.push(movingCard);
  persist();
  render();
}

function moveCardWithinLane(columnId, cardId, direction) {
  const column = activeProject().columns.find((item) => item.id === columnId);
  const card = column.cards.find((item) => item.id === cardId);
  const laneCards = column.cards.filter((item) => item.swimlaneId === card.swimlaneId);
  const laneIndex = laneCards.findIndex((item) => item.id === cardId);
  const swapCard = laneCards[laneIndex + direction];
  if (!swapCard) return;
  const cardIndex = column.cards.findIndex((item) => item.id === card.id);
  const swapIndex = column.cards.findIndex((item) => item.id === swapCard.id);
  [column.cards[cardIndex], column.cards[swapIndex]] = [column.cards[swapIndex], column.cards[cardIndex]];
  card.activity = addActivity(card.activity || [], direction < 0 ? "在列内上移" : "在列内下移");
  persist();
  render();
}

function resetDemoData() {
  if (!confirm("重置会清空当前本地演示数据，继续？")) return;
  state = createDemoState();
  persist();
  render();
}

function getSubtaskProgress(card) {
  const total = card.subtasks?.length || 0;
  const done = card.subtasks?.filter((task) => task.done).length || 0;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function addActivity(activity, text) {
  return [{ id: uid("activity"), text, createdAt: new Date().toISOString() }, ...(activity || [])];
}

function findCardContext(cardId, project = activeProject()) {
  if (!cardId) return null;
  for (const column of project.columns) {
    const card = column.cards.find((item) => item.id === cardId);
    if (card) return { project, column, card };
  }
  return null;
}

function cloneCardForCopy(card) {
  const now = new Date().toISOString();
  return {
    ...clone(card),
    id: uid("card"),
    title: `${card.title} - 副本`,
    isClosed: false,
    subtasks: (card.subtasks || []).map((task) => ({ ...task, id: uid("subtask") })),
    comments: clone(card.comments || []),
    links: clone(card.links || []),
    attachments: clone(card.attachments || []),
    activity: [{ id: uid("activity"), text: "由复制任务生成", createdAt: now }],
    createdAt: now,
    updatedAt: now
  };
}

function accessModeLabel(mode) {
  return {
    private: "私有项目",
    team: "团队可见",
    "public-readonly": "公开只读"
  }[mode] || "团队可见";
}

function permissionRoleSummary(items) {
  if (!items.length) return "暂无";
  const counts = groupCounts(items.map((item) => item.role || "成员"));
  return counts.map((item) => `${item.label} ${item.count}`).join(" · ");
}

function groupCounts(values) {
  const counts = values.reduce((map, value) => {
    map.set(value, (map.get(value) || 0) + 1);
    return map;
  }, new Map());
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "zh-CN"));
}

function groupCountsWithSum(values, labelGetter, valueGetter) {
  const groups = new Map();
  values.forEach((item) => {
    const label = labelGetter(item);
    const current = groups.get(label) || { label, count: 0, total: 0 };
    current.count += 1;
    current.total += Number(valueGetter(item) || 0);
    groups.set(label, current);
  });
  return [...groups.values()].sort((a, b) => b.total - a.total || b.count - a.count || a.label.localeCompare(b.label, "zh-CN"));
}

function cardEstimatedHours(card) {
  return Number(card.estimate) || 0;
}

function cardActualHours(card) {
  return (Number(card.actualTime) || 0) + (card.timeLogs || []).reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
}

function sumCards(cards, getter) {
  return cards.reduce((sum, card) => sum + Number(getter(card) || 0), 0);
}

function formatHours(value) {
  const number = Number(value) || 0;
  return Number.isInteger(number) ? String(number) : number.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
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

function todayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateValue(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day).getTime();
}

function addDaysString(dateString, days) {
  const value = dateValue(dateString);
  if (value === null) return "";
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCalendarWeeks(baseDate) {
  const value = dateValue(baseDate);
  const base = value === null ? new Date() : new Date(value);
  const month = base.getMonth();
  const firstOfMonth = new Date(base.getFullYear(), month, 1);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const startDate = new Date(firstOfMonth);
  startDate.setDate(firstOfMonth.getDate() - mondayOffset);
  return Array.from({ length: 6 }, (_, weekIndex) => (
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      return {
        date: dateString,
        label: String(date.getDate()),
        isCurrentMonth: date.getMonth() === month
      };
    })
  ));
}

function buildGanttTicks(minDate, totalDays) {
  const tickCount = Math.min(5, Math.max(totalDays, 1));
  return Array.from({ length: tickCount }, (_, index) => {
    const offset = tickCount === 1 ? 0 : Math.round((totalDays - 1) * (index / (tickCount - 1)));
    return {
      label: addDaysString(minDate, offset).slice(5),
      left: totalDays <= 1 ? 0 : Math.round((offset / totalDays) * 100)
    };
  });
}

function scheduleDays(startDate, endDate) {
  const start = dateValue(startDate);
  const end = dateValue(endDate);
  if (start === null || end === null || end < start) return 0;
  return Math.floor((end - start) / 86400000) + 1;
}

function dateDelayDays(plannedEnd, actualEnd) {
  const planned = dateValue(plannedEnd);
  const actual = dateValue(actualEnd);
  if (planned === null || actual === null || actual <= planned) return 0;
  return Math.floor((actual - planned) / 86400000);
}

function cardDelayDays(card) {
  const schedule = card.schedule || {};
  if (!schedule.plannedEnd) return 0;
  const compareDate = schedule.actualEnd || todayString();
  return dateDelayDays(schedule.plannedEnd, compareDate);
}

function minDateString(values) {
  return values.filter(Boolean).sort()[0] || "";
}

function maxDateString(values) {
  const sorted = values.filter(Boolean).sort();
  return sorted.length ? sorted[sorted.length - 1] : "";
}

function formatTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
