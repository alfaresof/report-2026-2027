export function toArabicDigits(value: number, pad = 2): string {
  return String(value)
    .padStart(pad, "0")
    .replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}
