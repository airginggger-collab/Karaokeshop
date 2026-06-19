"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { songsSample } from "@/lib/site";

const langs = ["Все", "KZ", "RU", "EN", "ES"];

export function SongsClient() {
  const [q, setQ] = React.useState("");
  const [lang, setLang] = React.useState("Все");

  const filtered = songsSample.filter(
    (s) =>
      (lang === "Все" || s.lang === lang) &&
      (!q.trim() || `${s.title} ${s.artist}`.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <div>
      <div className="flex items-center gap-2 rounded-lg border border-border px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Найти песню или исполнителя"
          className="h-11 w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {langs.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`rounded-md border px-3 py-1.5 text-sm transition ${
              l === lang ? "border-primary text-primary" : "border-border text-muted-foreground hover:bg-surface"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {filtered.length ? (
          filtered.map((s) => (
            <div key={`${s.title}-${s.artist}`} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.artist}</p>
              </div>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{s.lang}</span>
            </div>
          ))
        ) : (
          <p className="px-4 py-4 text-sm text-muted-foreground">Ничего не найдено.</p>
        )}
      </div>
    </div>
  );
}
