import * as React from "react";
import { HighlightLine } from "@/components/HighlightLine";

/** Подсветка первого слова h1 общим шаблоном «Сцены»: остальной текст (обычно
    "для …", "по площади" и т.п.) выделяется через HighlightLine. Если в h1
    только одно слово — подсвечивается целиком. Текст h1 не меняется, только
    визуальное разбиение. */
function splitH1(h1: string): [string, string] {
  const idx = h1.indexOf(" ");
  if (idx === -1) return ["", h1];
  return [h1.slice(0, idx + 1), h1.slice(idx + 1)];
}

export function LandingPage({
  h1,
  description,
  breadcrumb,
  children,
}: {
  h1: string;
  description: string;
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const [first, rest] = splitH1(h1);
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {breadcrumb}
      <h1 className="font-display text-2xl font-bold sm:text-3xl">
        {first}
        <HighlightLine>{rest}</HighlightLine>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {children}
    </main>
  );
}
