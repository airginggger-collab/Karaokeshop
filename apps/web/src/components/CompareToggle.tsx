"use client";

import { Scale, Check } from "lucide-react";
import { Button } from "@kk/ui";
import { useCompare } from "@/lib/compare";

export function CompareToggle({ slug, variant = "icon" }: { slug: string; variant?: "icon" | "button" }) {
  const { has, toggle, full } = useCompare();
  const active = has(slug);
  const disabled = !active && full;

  if (variant === "button") {
    return (
      <Button variant="ghost" onClick={() => toggle(slug)} disabled={disabled}>
        {active ? (
          <>
            <Check className="h-4 w-4" /> В сравнении
          </>
        ) : (
          <>
            <Scale className="h-4 w-4" /> К сравнению
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      type="button"
      aria-label={active ? "Убрать из сравнения" : "Добавить к сравнению"}
      aria-pressed={active}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition disabled:opacity-40 ${
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-background text-muted-foreground hover:text-foreground"
      }`}
    >
      {active ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
    </button>
  );
}
