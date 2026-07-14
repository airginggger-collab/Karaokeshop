import type { ReactNode } from "react";
import { waHref } from "@/lib/wa";

/** Зелёный WhatsApp-анкор (единый вид: `bg-[#25D366]`, hover `#1ebe5d`).
 * Иконку и лейбл передавай через children. Href собирается из waHref(text). */
export function WaButton({
  text,
  children,
  size = "md",
  full = false,
  className = "",
}: {
  text?: string;
  children: ReactNode;
  size?: "md" | "lg";
  full?: boolean;
  className?: string;
}) {
  const cls = [
    full ? "flex w-full justify-center" : "inline-flex",
    "items-center gap-2 rounded-xl bg-[#25D366] text-sm font-medium text-white transition hover:bg-[#1ebe5d]",
    size === "lg" ? "px-5 py-3.5" : "px-5 py-3",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={waHref(text)} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}
