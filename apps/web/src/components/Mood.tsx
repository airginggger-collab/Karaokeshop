import * as React from "react";

// Оборачивает контент страницы в «настроение»: тёплое (дом) или деловое
// ночное (заведение). Переопределяет токены --color-* в своей области,
// поэтому все вложенные компоненты автоматически перекрашиваются.
export function Mood({
  variant,
  className = "",
  children,
}: {
  variant: "warm" | "night";
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mood-${variant} bg-background text-foreground ${className}`}>{children}</div>;
}
