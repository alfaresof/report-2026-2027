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
      },
      {
        id: "hostinger",
        name: "Hostinger",
        label: "استضافة المواقع",
        logo: logo("hostinger.svg"),
        cycle: "monthly",
        monthly: 90.85,
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
      },
      {
        id: "soundcloud",
        name: "SoundCloud",
        label: "استضافة البودكاست",
        logo: logo("soundcloud.svg"),
        cycle: "monthly",
        monthly: 37.99,
      },
    ],
  },
];

export const cloudSpaces = [
  {
    id: "microsoft",
    name: "مساحة Microsoft 365",
    label: "Microsoft 365",
    detail: "البريد، Teams، ومساحة OneDrive.",
    logo: logo("microsoft.svg"),
    current: 1000,
    target: 1000,
  },
  {
    id: "google",
    name: "مساحة Google Workspace",
    label: "Google Workspace",
    detail: "Gmail، Drive، وMeet.",
    logo: logo("google.svg"),
    current: 2000,
    target: 1000,
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

export const cloudSpacesCurrentTotal = cloudSpaces.reduce(
  (total, space) => total + space.current,
  0,
);

export const cloudSpacesTargetTotal = cloudSpaces.reduce(
  (total, space) => total + space.target,
  0,
);

export const techAssetsTotal = serviceAnnualTotal + cloudSpacesTargetTotal;

export const aiAnnualDefault = aiProjects.reduce(
  (total, project) =>
    total +
    (project.defaultFull * aiRates.full +
      project.defaultPart * aiRates.part) *
      12,
  0,
);
