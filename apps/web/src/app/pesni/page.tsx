import type { Metadata } from "next";
import { Music, RefreshCw, Globe } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SongsClient } from "@/components/SongsClient";
import { pesniMeta, songsTotal } from "@/lib/site";

export const metadata: Metadata = {
  title: pesniMeta.title,
  description: pesniMeta.description,
  alternates: { canonical: "/pesni" },
};

const total = new Intl.NumberFormat("ru-RU").format(songsTotal);

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Песни" }]} />
      <h1 className="font-display text-2xl font-bold">{pesniMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{pesniMeta.description}</p>

      <div className="mb-8 mt-6 grid gap-3 sm:grid-cols-3">
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

      <SongsClient />

      <div className="mt-8 flex flex-col items-start gap-3 rounded-xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-primary">Обновление репертуара по договору</p>
          <p className="text-sm text-primary">Регулярно добавляем новинки в вашу систему.</p>
        </div>
        <Button>Подключить обновление</Button>
      </div>
    </Container>
  );
}
