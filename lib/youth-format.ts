import type { YouthPerson } from "@/lib/youth";

const numberFormatter = new Intl.NumberFormat("ar-EG");

export function formatYouthNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatAppCount(value: number): string {
  if (value === 1) {
    return "تطبيق واحد";
  }

  if (value === 2) {
    return "تطبيقان";
  }

  return `${formatYouthNumber(value)} تطبيقات`;
}

export function formatFeatureCount(value: number): string {
  if (value === 1) {
    return "ميزة واحدة";
  }

  if (value === 2) {
    return "ميزتان";
  }

  if (value >= 3 && value <= 10) {
    return `${formatYouthNumber(value)} ميزات`;
  }

  return `${formatYouthNumber(value)} ميزة`;
}

export function youthTotals(person: YouthPerson) {
  const apps = person.solutions.flatMap((solution) => solution.apps);

  return {
    products: person.solutions.length,
    apps: apps.length,
    features: apps.reduce((sum, app) => sum + app.features, 0),
  };
}
