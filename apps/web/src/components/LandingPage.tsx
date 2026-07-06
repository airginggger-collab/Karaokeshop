import * as React from "react";
import { HighlightLine } from "@/components/HighlightLine";

export function LandingPage({
  h1,
  description,
  breadcrumb,
  highlight,
  children,
}: {
  h1: string;
  description: string;
  breadcrumb?: React.ReactNode;
  /** Подстрока h1, которую залить «подсветкой строки» (HighlightLine).
      Задаётся вызывающей страницей осмысленно (ключевое слово/фраза).
      Если не передана или не найдена в h1 — заголовок рендерится целиком
      без подсветки (безопасный дефолт). Текст h1 не меняется. */
  highlight?: string;
  children?: React.ReactNode;
}) {
  const idx = highlight ? h1.indexOf(highlight) : -1;
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {breadcrumb}
      <h1 className="font-display text-2xl font-bold sm:text-3xl">
        {highlight && idx >= 0 ? (
          <>
            {h1.slice(0, idx)}
            <HighlightLine>{highlight}</HighlightLine>
            {h1.slice(idx + highlight.length)}
          </>
        ) : (
          h1
        )}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {children}
    </main>
  );
}
