export type TechPerson = {
  id: string;
  name: string;
  role: string;
  initials: string;
};

export type TechDepartment = {
  id: "projects" | "products";
  name: string;
  scope: string;
  head: TechPerson;
  engineer: TechPerson;
};

export type TechStructure = {
  director: TechPerson & {
    departmentBadge: string;
  };
  current: {
    label: string;
    year: string;
    title: string;
    summary: string;
    scope: string;
    people: TechPerson[];
  };
  next: {
    label: string;
    year: string;
    title: string;
    summary: string;
    departments: TechDepartment[];
  };
  flexibility: {
    title: string;
    text: string;
  };
  reasons: {
    id: string;
    title: string;
    text: string;
  }[];
  saif: {
    label: string;
    title: string;
    text: string;
  };
};

export const techStructure: TechStructure = {
  director: {
    id: "obida",
    name: "محمد عبيدة فرحات",
    role: "المدير التقني",
    initials: "م ع",
    departmentBadge: "رئيس قسم المشاريع",
  },
  current: {
    label: "الوضع السابق",
    year: "٢٠٢٦",
    title: "فريق واحد، أدوار عامة",
    summary:
      "التقسيمة السابقة كانت عامة وغير مركّزة: الجميع يعمل على المشاريع والمنتجات بحسب الحاجة، دون مالك واضح لكل مسار.",
    scope: "كل المشاريع + كل المنتجات",
    people: [
      {
        id: "saleem",
        name: "سليم البطين",
        role: "مهندس برمجيات",
        initials: "س ب",
      },
      {
        id: "saif",
        name: "سيف السيف",
        role: "مهندس برمجيات",
        initials: "س س",
      },
      {
        id: "ahmed",
        name: "أحمد سيد",
        role: "مهندس برمجيات",
        initials: "أ س",
      },
    ],
  },
  next: {
    label: "الوضع القادم",
    year: "٢٠٢٧",
    title: "قسمان، ومسؤولية واضحة",
    summary:
      "لكل نوع من العمل قسم يملكه: المشاريع لها إيقاعها، والمنتجات لها دورة تطويرها.",
    departments: [
      {
        id: "projects",
        name: "قسم المشاريع",
        scope: "تنفيذ المشاريع مثل كداء والتمكين الريادي وغيرهما.",
        head: {
          id: "obida",
          name: "محمد عبيدة فرحات",
          role: "رئيس قسم المشاريع",
          initials: "م ع",
        },
        engineer: {
          id: "ahmed",
          name: "أحمد سيد",
          role: "مهندس برمجيات",
          initials: "أ س",
        },
      },
      {
        id: "products",
        name: "قسم المنتجات",
        scope:
          "منتجات رومة، والمشاريع الخاصة بالمؤسسات المانحة داخليًا، وبعض الأدوات.",
        head: {
          id: "saleem",
          name: "سليم البطين",
          role: "رئيس قسم المنتجات",
          initials: "س ب",
        },
        engineer: {
          id: "saif",
          name: "سيف السيف",
          role: "مهندس برمجيات",
          initials: "س س",
        },
      },
    ],
  },
  flexibility: {
    title: "مرونة بين القسمين",
    text: "الفصل تنظيمي لا حائط. عند الحاجة ينتقل المهندس بين المشاريع والمنتجات — مؤقتًا أو ضمن تكليف محدد — بحسب الأولوية والحمولة، وبقرار المدير التقني والتنسيق مع رئيسي القسمين.",
  },
  reasons: [
    {
      id: "focus",
      title: "تركيز",
      text: "كل قسم يتفرغ لنوع واحد من العمل، بدل توزيع الجهد على كل شيء.",
    },
    {
      id: "ownership",
      title: "ملكية",
      text: "مرجعية واحدة لكل قسم: قرار أسرع، ومتابعة أوضح، ومساءلة أدق.",
    },
    {
      id: "continuity",
      title: "استمرارية",
      text: "سيف يستمر في قسم المنتجات، بمرجعية سليم، ومسار تخصص أعمق.",
    },
  ],
  saif: {
    label: "قرار الاستمرار",
    title: "استمرار سيف: مهندس في قسم المنتجات",
    text: "استمرار سيف يعني دورًا أوضح، لا صيغة تتكرر: مهندس برمجيات في قسم المنتجات، بمرجعية مباشرة من سليم، ومساحة للنمو في المنتجات والأدوات. ويبقى الانتقال إلى المشاريع ممكنًا عند الحاجة.",
  },
};
