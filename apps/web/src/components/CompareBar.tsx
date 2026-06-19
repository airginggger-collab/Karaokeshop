"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";
import { Button } from "@kk/ui";
import { useCompare } from "@/lib/compare";

export function CompareBar() {
  const { count, clear, ready } = useCompare();
  if (!ready || count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full border border-border bg-background px-3 py-2 shadow-lg">
        <span className="flex items-center gap-1.5 pl-1 text-sm">
          <Scale className="h-4 w-4 text-primary" /> К сравнению: {count}
        </span>
        <Link href="/sravnit">
          <Button size="sm">Сравнить</Button>
        </Link>
        <button type="button" onClick={clear} aria-label="Очистить сравнение" className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
