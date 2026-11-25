export type PlanProject = {
  id: string;
  name: string;
  tag?: string;
  products: number;
  productsNote?: string;
  engineers: number;
  projectManagers: number;
  testers: number;
  note?: string;
  units?: {
    default: number;
    min: number;
    max: number;
    productsPerUnit: number;
    engineersPerUnit: number;
    label: string;
  };
};

export type PlanProjectComputed = PlanProject & {
  computedProducts: number;
  computedEngineers: number;
  unitsCount?: number;
};

export const planProjects: PlanProject[] = [
  {
    id: "maraya",
    name: "مرايا",
    tag: "قائم",
    products: 1,
    engineers: 1,
    projectManagers: 1,
    testers: 0,
    note: "قائم من قبل — ٢٠٢٧ للتوسع والتطوير.",
  },
  {
    id: "seerah",
    name: "سيرة",
    tag: "قائم",
    products: 1,
    engineers: 1,
    projectManagers: 1,
    testers: 0,
    note: "قائم من قبل — ٢٠٢٧ للتوسع والتطوير.",
  },
  {
    id: "websites",
    name: "المواقع",
    tag: "٤ مواقع",
    products: 4,
    productsNote: "نديم، المحصل، التراث، إرث",
    engineers: 0.5,
    projectManagers: 0,
    testers: 0,
    note: "مهندس برمجيات جزئي واحد يكفي للمواقع الأربعة.",
  },
  {
    id: "tamkeen-v2",
    name: "النسخة الثانية من التمكين الريادي",
    tag: "النسخة الثانية",
    products: 1,
    engineers: 4,
    projectManagers: 0,
    testers: 1,
    note: "أتممناه بـ٣ مهندسين برمجيات، والمطلوب فعليًا ٤ + مختبر.",
  },
  {
    id: "kadaa",
    name: "مسرعة كداء",
    tag: "مسرعة",
    products: 10,
    engineers: 0,
    projectManagers: 0,
    testers: 0,
    note: "١٠ منتجات متوقعة — ضمن برنامج المسرعة.",
  },
  {
    id: "social-accelerator",
    name: "مسرعة الشركات الناشئة الاجتماعية",
    tag: "مع رؤية الريادة",
    products: 10,
    engineers: 0,
    projectManagers: 0,
    testers: 0,
    note: "١٠ منتجات متوقعة — مع شركة رؤية الريادة، ضمن برنامج المسرعة.",
  },
  {
    id: "independent-enablement",
    name: "التمكين الريادي لجمعيات مستقلة",
    tag: "لكل جمعية",
    products: 0,
    engineers: 0,
    projectManagers: 0,
    testers: 0,
    note: "مهندس برمجيات جزئي لكل جمعية؛ كل ٢ تمكين = مهندس بدوام كامل.",
    units: {
      default: 2,
      min: 1,
      max: 12,
      productsPerUnit: 1,
      engineersPerUnit: 0.5,
      label: "جمعية",
    },
  },
];

export const planTeam: {
  director: string;
  productManager: string;
  engineers: string[];
  tester: string | null;
} = {
  director: "محمد عبيدة فرحات",
  productManager: "سليم البطين",
  engineers: ["سيف السيف", "أحمد سيد"],
  tester: null,
};

export const planAllSelected = planProjects.map((project) => project.id);

export const planDefaults = {
  selected: [] as string[],
  units: 2,
};

const numberFormatter = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 1,
});

export function formatPlanNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatProjectCount(value: number): string {
  if (value === 0) {
    return "لا مشاريع";
  }

  if (value === 1) {
    return "مشروع واحد";
  }

  if (value === 2) {
    return "مشروعان";
  }

  if (value >= 3 && value <= 10) {
    return `${formatPlanNumber(value)} مشاريع`;
  }

  return `${formatPlanNumber(value)} مشروعًا`;
}

export function formatProductCount(value: number): string {
  if (value === 0) {
    return "لا منتجات";
  }

  if (value === 1) {
    return "منتج واحد";
  }

  if (value === 2) {
    return "منتجان";
  }

  if (value >= 3 && value <= 10) {
    return `${formatPlanNumber(value)} منتجات`;
  }

  return `${formatPlanNumber(value)} منتجًا`;
}

export function formatEngineerCount(value: number): string {
  if (value === 0.5) {
    return "مهندس جزئي";
  }

  if (value === 1) {
    return "مهندس واحد";
  }

  if (value === 2) {
    return "مهندسان";
  }

  if (!Number.isInteger(value)) {
    return `${formatPlanNumber(value)} مهندس`;
  }

  if (value >= 3 && value <= 10) {
    return `${formatPlanNumber(value)} مهندسين`;
  }

  return `${formatPlanNumber(value)} مهندسًا`;
}

export function formatUnitCount(value: number): string {
  if (value === 1) {
    return "جمعية واحدة";
  }

  if (value === 2) {
    return "جمعيتان";
  }

  if (value >= 3 && value <= 10) {
    return `${formatPlanNumber(value)} جمعيات`;
  }

  return `${formatPlanNumber(value)} جمعية`;
}

export function calculatePlan(selectedIds: string[], units: number) {
  const selected = selectedIds
    .map((id) => planProjects.find((project) => project.id === id))
    .filter((project): project is PlanProject => Boolean(project))
    .map<PlanProjectComputed>((project) => {
      if (project.units) {
        const count = Math.min(
          project.units.max,
          Math.max(project.units.min, units),
        );

        return {
          ...project,
          computedProducts: project.units.productsPerUnit * count,
          computedEngineers: project.units.engineersPerUnit * count,
          unitsCount: count,
        };
      }

      return {
        ...project,
        computedProducts: project.products,
        computedEngineers: project.engineers,
      };
    });

  const products = selected.reduce(
    (sum, project) => sum + project.computedProducts,
    0,
  );
  const engineers = selected.reduce(
    (sum, project) => sum + project.computedEngineers,
    0,
  );
  const projectManagers = selected.reduce(
    (sum, project) => sum + project.projectManagers,
    0,
  );
  const testers = selected.reduce((sum, project) => sum + project.testers, 0);
  const director = selected.length > 0 ? 1 : 0;

  const base = {
    director: 1,
    projectManagers: 1,
    engineers: planTeam.engineers.length,
    testers: planTeam.tester ? 1 : 0,
  };
  const baseTotal =
    base.director + base.projectManagers + base.engineers + base.testers;

  const additional = {
    projectManagers: Math.max(0, projectManagers - base.projectManagers),
    engineers: Math.max(0, engineers - base.engineers),
    testers: Math.max(0, testers - base.testers),
  };

  const total = director + projectManagers + engineers + testers;
  const selectedCount = selected.length;

  return {
    selected,
    products,
    engineers,
    projectManagers,
    testers,
    director,
    selectedCount,
    total,
    base,
    baseTotal,
    additional,
    additionalTotal:
      additional.projectManagers + additional.engineers + additional.testers,
  };
}
