export function toArabicDigits(value: number, pad = 2): string {
  return String(value)
    .padStart(pad, "0")
    .replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

const sarFormatter = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 0,
});

export function formatSar(value: number): string {
  return sarFormatter.format(Math.round(value));
}

export function formatUsd(value: number): string {
  return usdFormatter.format(Math.round(value));
}
