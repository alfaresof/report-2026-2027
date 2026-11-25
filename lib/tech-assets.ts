export type TechService = {
  id: string;
  name: string;
  label: string;
  logo: string;
  cycle: "monthly" | "annual" | "usage";
  monthly?: number;
  annual?: number;
  note?: string;
};

export type TechServiceGroup = {
  id: string;
  title: string;
  note: string;
  services: TechService[];
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logo = (file: string) => `${basePath}/logos/services/${file}`;

export const serviceGroups: TechServiceGroup[] = [
  {
    id: "infrastructure",
    title: "البنية والاستضافة",
    note: "الخدمات التي تُشغّل المنتجات والمواقع.",
    services: [
      {
        id: "supabase",
        name: "Supabase",
        label: "قاعدة البيانات والمصادقة",
        logo: logo("supabase.svg"),
        cycle: "usage",
        monthly: 474.36,
        note: "حسب الاستخدام — آخر فاتورة أكتوبر ٢٠٢٦.",
      },
      {
        id: "cranl",
        name: "CranL",
        label: "استضافة التطبيقات",
        logo: logo("cranl.png"),
        cycle: "monthly",
        monthly: 58.53,
        note: "استضافة تطبيقات المشاريع والمنتجات.",
      },
      {
        id: "hostinger",
        name: "Hostinger",
        label: "استضافة المواقع",
        logo: logo("hostinger.svg"),
        cycle: "monthly",
        monthly: 90.85,
        note: "مواقع الجمعيات والمشاريع.",
      },
      {
        id: "bluehost",
        name: "Bluehost",
        label: "استضافة ووردبريس",
        logo: logo("bluehost.png"),
        cycle: "monthly",
        monthly: 105,
        note: "يشمل استضافة نديم؛ النطاق محسوب ضمن النطاقات.",
      },
      {
        id: "bunny",
        name: "Bunny CDN",
        label: "شبكة توصيل المحتوى",
        logo: logo("bunny.svg"),
        cycle: "monthly",
        monthly: 93.88,
        note: "تسريع تحميل الأصول والوسائط.",
      },
      {
        id: "domains",
        name: "النطاقات",
        label: "نطاقات المشاريع",
        logo: logo("hostinger.svg"),
        cycle: "annual",
        annual: 222.17,
        note: "٣ نطاقات + نطاق nadiim.com.",
      },
    ],
  },
  {
    id: "content",
    title: "المحتوى والاشتراكات",
    note: "أدوات النشر والتواصل والتصميم.",
    services: [
      {
        id: "mailchimp",
        name: "Mailchimp",
        label: "النشرات البريدية · ٣ حسابات",
        logo: logo("mailchimp.svg"),
        cycle: "monthly",
        monthly: 834.95,
        note: "إشعار، المحصل، وثلث.",
      },
      {
        id: "zoom",
        name: "Zoom",
        label: "الاجتماعات · حسابان",
        logo: logo("zoom.svg"),
        cycle: "monthly",
        monthly: 380.15,
        note: "حساب الريادة وحساب نديم.",
      },
      {
        id: "adobe",
        name: "Adobe Creative Cloud",
        label: "التصميم · مقعدان",
        logo: logo("adobe.svg"),
        cycle: "monthly",
        monthly: 172.34,
        note: "مقعدان حاليًا؛ كان ٣ مقاعد حتى سبتمبر ٢٠٢٦.",
      },
      {
        id: "resend",
        name: "Resend",
        label: "البريد المعاملاتي",
        logo: logo("resend.svg"),
        cycle: "monthly",
        monthly: 75.09,
        note: "رسائل التحقق والإشعارات.",
      },
      {
        id: "soundcloud",
        name: "SoundCloud",
        label: "استضافة البودكاست",
        logo: logo("soundcloud.svg"),
        cycle: "monthly",
        monthly: 37.99,
        note: "بودكاست منصت.",
      },
    ],
  },
];

export type CloudProvider = {
  id: "google" | "microsoft";
  name: string;
  label: string;
  logo: string;
  monthly: number;
  details: string[];
};

export const cloudSpacesCurrent: CloudProvider[] = [
  {
    id: "microsoft",
    name: "مساحة Microsoft",
    label: "Microsoft 365",
    logo: logo("microsoft.svg"),
    monthly: 1000,
    details: [
      "٣٦ بريدًا إلكترونيًا.",
      "١ تيرا مشتركة — ممتلئة.",
      "Teams وOutlook وOffice.",
    ],
  },
  {
    id: "google",
    name: "مساحة Google",
    label: "Google Workspace",
    logo: logo("google.svg"),
    monthly: 2000,
    details: [
      "المساحة غير معروفة.",
      "+١ تيرا لكل مستخدم.",
      "Meet وGmail وGoogle Apps.",
      "اشتراك Gemini مشمول.",
    ],
  },
];

export const cloudSpacesCurrentMonthlyTotal = 3000;
export const cloudSpacesCurrentAnnualTotal = 36000;

export const cloudSpacesTargetMonthly = 1000;
export const cloudSpacesTargetAnnual = 12000;
export const cloudSpacesMonthlySaving =
  cloudSpacesCurrentMonthlyTotal - cloudSpacesTargetMonthly;
export const cloudSpacesAnnualSaving =
  cloudSpacesCurrentAnnualTotal - cloudSpacesTargetAnnual;

export type MergeOption = {
  id: "microsoft" | "google";
  name: string;
  title: string;
  monthly: number;
  annual: number;
  logo: string;
  tagline: string;
  pros: string[];
  cons: string[];
  bestFor: string;
};

export const mergeOptions: MergeOption[] = [
  {
    id: "microsoft",
    name: "Microsoft",
    title: "الدمج على Microsoft",
    monthly: cloudSpacesTargetMonthly,
    annual: cloudSpacesTargetAnnual,
    logo: logo("microsoft.svg"),
    tagline: "نبقى على Office والبريد الحالي، ونلغي Google.",
    pros: [
      "بقاء الوضع والبرامج الحالية.",
      "Office مشمول ضمن الاشتراك.",
    ],
    cons: [
      "مساحة محدودة: ١ تيرا، وكل تيرا إضافية ٢٠٠ ر.س.",
      "خدمات أخرى ضعيفة وغير مستخدمة.",
      "قد نضطر لشراء Office فردي لبعض الموظفين.",
      "قد نحتاج لإبقاء Google لبعض الموظفين.",
    ],
    bestFor: "إذا كان Office أساسيًا لمعظم الفريق.",
  },
  {
    id: "google",
    name: "Google",
    title: "الدمج على Google",
    monthly: cloudSpacesTargetMonthly,
    annual: cloudSpacesTargetAnnual,
    logo: logo("google.svg"),
    tagline: "مساحة أكبر وGemini مشمول، مع شراء Office لمن يحتاجه.",
    pros: [
      "١ تيرا لكل موظف — نحو ٣٦ تيرا.",
      "تطبيقات قابلة للاستخدام.",
      "بريد أرخص للحسابات غير المهمة.",
      "Gemini مشمول.",
    ],
    cons: [
      "لا يشمل Office.",
      "شراء Office لمن يحتاجه يرفع التكلفة.",
    ],
    bestFor: "إذا كانت المساحة والتكلفة أولوية، وOffice مقتصر على عدد محدود.",
  },
];

export type CloudComparisonRow = {
  id: string;
  label: string;
  microsoft: string;
  google: string;
  microsoftTone?: "positive" | "negative";
  googleTone?: "positive" | "negative";
};

export const cloudComparison: CloudComparisonRow[] = [
  {
    id: "monthly",
    label: "التكلفة الشهرية",
    microsoft: "١٬٠٠٠ ر.س",
    google: "١٬٠٠٠ ر.س",
  },
  {
    id: "annual",
    label: "التكلفة السنوية",
    microsoft: "١٢٬٠٠٠ ر.س",
    google: "١٢٬٠٠٠ ر.س",
  },
  {
    id: "space",
    label: "المساحة",
    microsoft: "١ تيرا مشتركة، وكل تيرا إضافية ٢٠٠ ر.س",
    google: "١ تيرا لكل موظف (~٣٦ تيرا)",
  },
  {
    id: "office",
    label: "Office",
    microsoft: "مشمول",
    google: "غير مشمول — يُشترى لمن يحتاجه",
    microsoftTone: "positive",
    googleTone: "negative",
  },
  {
    id: "gemini",
    label: "Gemini",
    microsoft: "غير مشمول",
    google: "مشمول",
    microsoftTone: "negative",
    googleTone: "positive",
  },
  {
    id: "mail",
    label: "البريد",
    microsoft: "٣٦ حسابًا",
    google: "٣٦ حسابًا",
  },
  {
    id: "closeness",
    label: "الأقرب للوضع الحالي",
    microsoft: "نعم",
    google: "لا",
  },
  {
    id: "best",
    label: "الأفضلية",
    microsoft: "إذا كان Office أساسيًا",
    google: "إذا كانت المساحة والتكلفة أولوية",
  },
];

export const aiRates = {
  full: 100,
  part: 20,
  usdToSar: 3.75,
};

export type AiProject = {
  id: string;
  name: string;
  tag?: string;
  basis: string;
  defaultFull: number;
  defaultPart: number;
};

export const aiProjects: AiProject[] = [
  {
    id: "maraya",
    name: "مرايا",
    tag: "قائم",
    basis: "مدير منتج + مهندس برمجيات",
    defaultFull: 2,
    defaultPart: 0,
  },
  {
    id: "seerah",
    name: "سيرة",
    tag: "قائم",
    basis: "مدير منتج + مهندس برمجيات",
    defaultFull: 2,
    defaultPart: 0,
  },
  {
    id: "websites",
    name: "المواقع",
    tag: "٤ مواقع",
    basis: "مهندس برمجيات جزئي للمواقع الأربعة",
    defaultFull: 0,
    defaultPart: 1,
  },
  {
    id: "tamkeen-v2",
    name: "النسخة الثانية من التمكين الريادي",
    tag: "النسخة الثانية",
    basis: "٤ مهندسين + مختبر",
    defaultFull: 5,
    defaultPart: 0,
  },
  {
    id: "kadaa",
    name: "مسرعة كداء",
    tag: "مسرعة",
    basis: "منسق مشروع بدوام جزئي",
    defaultFull: 0,
    defaultPart: 1,
  },
  {
    id: "social-accelerator",
    name: "مسرعة الشركات الناشئة الاجتماعية",
    tag: "مع رؤية الريادة",
    basis: "منسق مشروع بدوام جزئي",
    defaultFull: 0,
    defaultPart: 1,
  },
  {
    id: "independent-enablement",
    name: "التمكين الريادي لجمعيات مستقلة",
    tag: "لكل جمعية",
    basis: "مهندس بدوام كامل (بافتراض جمعيتين)",
    defaultFull: 1,
    defaultPart: 0,
  },
];

export const aiTools = [
  { id: "claude", name: "Claude", logo: logo("claude.svg") },
  { id: "chatgpt", name: "ChatGPT", logo: logo("openai.svg") },
  { id: "opencode", name: "OpenCode", logo: logo("opencode.svg") },
];

export const serviceMonthlyTotal = serviceGroups
  .flatMap((group) => group.services)
  .reduce((total, service) => total + (service.monthly ?? 0), 0);

export const serviceAnnualTotal = serviceGroups
  .flatMap((group) => group.services)
  .reduce(
    (total, service) =>
      total + (service.monthly ? service.monthly * 12 : service.annual ?? 0),
    0,
  );

export const techAssetsCurrentAnnual =
  serviceAnnualTotal + cloudSpacesCurrentAnnualTotal;

export const techAssetsTargetAnnual =
  serviceAnnualTotal + cloudSpacesTargetAnnual;

export const aiAnnualDefault = aiProjects.reduce(
  (total, project) =>
    total +
    (project.defaultFull * aiRates.full +
      project.defaultPart * aiRates.part) *
      12,
  0,
);
