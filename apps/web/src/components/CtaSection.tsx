import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WaButton } from "./WaButton";

/** Финальный CTA-блок страницы: заголовок + текст + WhatsApp-кнопка,
 * опционально ghost-ссылка, тикер-строка и мелкая подпись.
 * Каркас `bg-background` с hairline-рамкой (без теней-«клея», правило CLAUDE).
 * padded=true — крупная версия (p-8 sm:p-10, display-заголовок) для героя-финала. */
export function CtaSection({
  title,
  text,
  waText,
  waLabel = "Написать в WhatsApp",
  secondary,
  note,
  ticker,
  padded = false,
  className = "",
}: {
  title: ReactNode;
  text: string;
  waText: string;
  waLabel?: string;
  secondary?: { href: string; label: string };
  note?: string;
  ticker?: string;
  padded?: boolean;
  className?: string;
}) {
  const wrapCls = [
    "rounded-xl border border-border bg-background",
    padded ? "p-8 sm:p-10" : "p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapCls}>
      <h2 className={padded ? "font-display text-2xl font-bold sm:text-3xl" : "font-medium"}>
        {title}
      </h2>
      <p className={padded ? "mt-3 text-sm text-muted-foreground sm:text-base" : "mt-1 text-sm text-muted-foreground"}>
        {text}
      </p>
      {ticker && <p className="ticker mt-5">{ticker}</p>}
      <div className={padded ? "mt-5 flex flex-wrap gap-3" : "mt-4 flex flex-wrap gap-2"}>
        <WaButton text={waText} size="lg">
          {waLabel}
        </WaButton>
        {secondary && (
          <Link
            href={secondary.href}
            className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary"
          >
            {secondary.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {note && <p className="mt-3 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
