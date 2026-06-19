import type { Metadata } from "next";
import { Search, Music, RefreshCw, Globe } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { pesniMeta, songsSample, songsTotal } from "@/lib/site";

export const metadata: Metadata = {
  title: pesniMeta.title,
  description: pesniMeta.description,
  alternates: { canonical: "/pesni" },
};

const langs = ["Все", "KZ", "RU", "EN", "ES"];
const total = new Intl.NumberFormat("ru-RU").format(songsTotal);

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{pesniMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{pesniMeta.description}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-surface p-4">
          <Music className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-semibold">{total}+</p>
          <p className="text-xs text-muted-foreground">песен в базе</p>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <Globe className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-semibold">4 языка</p>
          <p className="text-xs text-muted-foreground">KZ · RU · EN и другие</p>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <RefreshCw className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-semibold">Ежемесячно</p>
          <p className="text-xs text-muted-foreground">обновление репертуара</p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-lg border border-border px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Найти песню или исполнителя"
          className="h-11 w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {langs.map((l, i) => (
          <span
            key={l}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {songsSample.map((s) => (
          <div key={s.title} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.artist}</p>
            </div>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{s.lang}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-primary">Обновление репертуара по договору</p>
          <p className="text-sm text-primary">Регулярно добавляем новинки в вашу систему.</p>
        </div>
        <Button>Подключить обновление</Button>
      </div>
    </Container>
  );
}
