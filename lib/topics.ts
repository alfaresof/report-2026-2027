import { youthPeople, type YouthPerson } from "@/lib/youth";
import { techStructure, type TechStructure } from "@/lib/tech-structure";

export type TopicSection = {
  title: string;
  summary: string;
};

export type DecemberDay = {
  day: number;
  month?: string;
  weekend?: boolean;
  outside?: boolean;
};

export type DecemberTone = "red" | "orange" | "green";

export type DecemberWeek = {
  id: string;
  label: string;
  dates: string;
  days: DecemberDay[];
  assessment: string;
  tag: string;
  tone: DecemberTone;
};

export type Topic = {
  slug: string;
  number: string;
  title: string;
  short: string;
  category: string;
  lead: string;
  sections: TopicSection[];
  questions: string[];
  leaveCalendar?: DecemberWeek[];
  youthPeople?: YouthPerson[];
  techStructure?: TechStructure;
  techAssets?: true;
  status?: "ready";
};

export const reportMeta = {
  title: "تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧",
  shortTitle: "تقرير ٢٠٢٦–٢٠٢٧",
  edition: "نسخة أولى",
  date: "نوفمبر ٢٠٢٦",
  status: "مسودة قيد التعبئة",
  topicCount: 6,
};

const firstWeekAssessment =
  "الأسبوع الأول يقع في منتصف التعديلات التقنية؛ لذلك لا نوصي بالإجازة فيه، لأن العمل يكون في ذروة التعديلات والاختبارات.";

const secondWeekAssessment =
  "الأسبوع الثاني يستمر في منتصف التعديلات التقنية؛ لا نوصي بالإجازة فيه أيضًا، لأن التعديلات تكون قائمة والعمل يحتاج متابعة.";

const thirdWeekAssessment =
  "التعديلات قد تكون مستمرة في الأسبوع الثالث؛ الإجازة ممكنة لكنها غير مثالية، ويُفضّل تأجيلها إلى ما بعد اكتمال التعديلات.";

const fourthWeekAssessment =
  "توصيتنا أن تكون الإجازة في الأسبوع الرابع؛ فهو الفترة المفترضة لإقفال المشروع، والاستراحة قبيل الانتقال إلى المشروع التالي.";

const fifthWeekAssessment =
  "توصيتنا أن تكون الإجازة في الأسبوع الخامس؛ فهو أيضًا ضمن فترة إقفال المشروع، ومناسب للاستراحة قبل بداية العام الجديد.";

export const topics: Topic[] = [
  {
    slug: "december-leave",
    number: "٠١",
    title: "ترتيب إجازة ديسمبر",
    short: "تقويم ديسمبر وتقييم الأسابيع.",
    category: "تنظيم",
    lead: "توصيتنا أن تكون إجازة ديسمبر في الأسبوع الرابع أو الخامس، لأنها الفترة المفترضة لإقفال المشروع. الأسابيع الأولى والثانية تتقاطع مع منتصف التعديلات التقنية، والثالث قد تشهد استمرارًا لها.",
    status: "ready",
    sections: [],
    questions: [],
    leaveCalendar: [
      {
        id: "week-1",
        label: "الأسبوع الأول",
        dates: "١–٣ ديسمبر",
        assessment: firstWeekAssessment,
        tag: "منتصف التعديلات التقنية",
        tone: "red",
        days: [
          { day: 29, month: "نوفمبر", outside: true },
          { day: 30, month: "نوفمبر", outside: true },
          { day: 1 },
          { day: 2 },
          { day: 3 },
          { day: 4, weekend: true },
          { day: 5, weekend: true },
        ],
      },
      {
        id: "week-2",
        label: "الأسبوع الثاني",
        dates: "٦–١٠ ديسمبر",
        assessment: secondWeekAssessment,
        tag: "منتصف التعديلات التقنية",
        tone: "red",
        days: [
          { day: 6 },
          { day: 7 },
          { day: 8 },
          { day: 9 },
          { day: 10 },
          { day: 11, weekend: true },
          { day: 12, weekend: true },
        ],
      },
      {
        id: "week-3",
        label: "الأسبوع الثالث",
        dates: "١٣–١٧ ديسمبر",
        assessment: thirdWeekAssessment,
        tag: "التعديلات قد تكون مستمرة",
        tone: "orange",
        days: [
          { day: 13 },
          { day: 14 },
          { day: 15 },
          { day: 16 },
          { day: 17 },
          { day: 18, weekend: true },
          { day: 19, weekend: true },
        ],
      },
      {
        id: "week-4",
        label: "الأسبوع الرابع",
        dates: "٢٠–٢٤ ديسمبر",
        assessment: fourthWeekAssessment,
        tag: "فترة إقفال المشروع — توصيتنا",
        tone: "green",
        days: [
          { day: 20 },
          { day: 21 },
          { day: 22 },
          { day: 23 },
          { day: 24 },
          { day: 25, weekend: true },
          { day: 26, weekend: true },
        ],
      },
      {
        id: "week-5",
        label: "الأسبوع الأخير",
        dates: "٢٧–٣١ ديسمبر",
        assessment: fifthWeekAssessment,
        tag: "فترة إقفال المشروع — توصيتنا",
        tone: "green",
        days: [
          { day: 27 },
          { day: 28 },
          { day: 29 },
          { day: 30 },
          { day: 31 },
          { day: 1, month: "يناير", weekend: true, outside: true },
          { day: 2, month: "يناير", weekend: true, outside: true },
        ],
      },
    ],
  },
  {
    slug: "youth-2026",
    number: "٠٢",
    title: "تصور لما أنجزه الشباب",
    short: "إحصاءات العمل وملخص مهام كل شاب.",
    category: "مراجعة",
    lead: "",
    sections: [],
    questions: [],
    youthPeople,
    status: "ready",
  },
  {
    slug: "plan-2027",
    number: "٠٣",
    title: "خطة ٢٠٢٧",
    short: "الخطة وحاسبة المشاريع: المشاريع والمنتجات والفريق، مع العقود القادمة.",
    category: "خطة",
    lead: "الخطة لا تتوقف على وجود عقد. نحدد العقود القادمة والفرص المتاحة، ونستعد للسيناريوهين: أن يتجدد العمل، أو أن نبحث عن بديل.",
    sections: [
      {
        title: "العقود الحالية",
        summary:
          "ما العقود القائمة، وتواريخ انتهائها، وما يرتبط بها من أعمال والتزامات.",
      },
      {
        title: "الفرص القادمة",
        summary:
          "الجهات أو المشاريع التي نتوقع طرحها، وما نحتاجه للاستعداد لها مبكرًا.",
      },
      {
        title: "خطة الاستدامة",
        summary:
          "ما نقدمه إذا لم يتجدد عقد، وكيف نوزع التركيز والموارد على البدائل.",
      },
    ],
    questions: [
      "ما العقود المنتهية أو القريبة من الانتهاء؟",
      "ما البديل إذا لم يتجدد العقد؟",
      "كيف نستعد للفرصة قبل طرحها؟",
    ],
    status: "ready",
  },
  {
    slug: "tech-structure",
    number: "٠٤",
    title: "هيكلة القسم التقني",
    short: "من فريق عام إلى قسمَي المشاريع والمنتجات.",
    category: "تشغيل",
    lead: "ننتقل بالقسم التقني من فريق واحد بأدوار عامة إلى قسمين واضحين: المشاريع والمنتجات. التقسيم السابق كان عامًا وغير مركّز؛ والجديد يمنح كل نوع من العمل مالكًا وفريقًا ومسارًا، مع مرونة تُبقي الفريق واحدًا عند الحاجة.",
    sections: [],
    questions: [
      "ما الفرق بين عمل قسم المشاريع وقسم المنتجات؟",
      "كيف تُحفظ المرونة بين القسمين دون إرباك الأدوار؟",
      "أين يقع سيف في الهيكلة الجديدة، وما الذي يضمن استمراره؟",
    ],
    techStructure,
    status: "ready",
  },
  {
    slug: "associations",
    number: "٠٥",
    title: "الجمعيات التي نستمر معها تقنيًا",
    short: "ثلاث مجموعات بحسب الاحتياج التقني، مع شعارات الجمعيات.",
    category: "شراكات",
    lead: "",
    sections: [],
    questions: [],
    status: "ready",
  },
  {
    slug: "tech-assets",
    number: "٠٦",
    title: "العهد التقنية والمساحات",
    short: "توقع اشتراكات ٢٠٢٧، وخيارات دمج المساحات، وحاسبة الذكاء الاصطناعي.",
    category: "أصول",
    lead: "تقدير مبني على فواتير ٢٠٢٦: اشتراكات تقنية بنحو ٢٨٬١٠٠ ريال سنويًا، ومساحات حالية بـ٣٬٠٠٠ ريال شهريًا، وهدف دمج يخفضها إلى ١٬٠٠٠ ريال شهريًا. والذكاء الاصطناعي بحسب المشاريع خارج الاثنين.",
    sections: [],
    questions: [
      "ما الاشتراكات التي نستمر بها في ٢٠٢٧؟",
      "هل ندمج المساحات على Microsoft أم Google؟",
      "كم يكلف الذكاء الاصطناعي لكل مشروع؟",
    ],
    techAssets: true,
    status: "ready",
  },
];

// Keep the metadata count in sync with the actual topic list.
reportMeta.topicCount = topics.length;

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicNeighbours(slug: string) {
  const index = topics.findIndex((topic) => topic.slug === slug);
  return {
    previous: index > 0 ? topics[index - 1] : null,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : null,
    index,
  };
}
