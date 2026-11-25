"use client";

import { PrintIcon } from "@/components/icons";

type PrintButtonProps = {
  label?: string;
  className?: string;
  icon?: boolean;
};

export function PrintButton({
  label = "طباعة / حفظ PDF",
  className = "btn btn-ink",
  icon = true,
}: PrintButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
    >
      {icon ? <PrintIcon size={17} /> : null}
      <span>{label}</span>
    </button>
  );
}
