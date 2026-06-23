import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Badge, Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { BundleTiers } from "@/components/BundleTiers";
import { bundles } from "@/lib/site";

const serviceIncluded = [
  "Выезд и проект звука под зал",
  "Монтаж",
  "Настройка",
  "Обучение персонала",
  "Гарантия + обновление песен",
];

export function generateStaticParams() {
  return bundles.map((b) => ({ area: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const b = bundles.find((x) => x.slug === area);
  if (!b) return {};
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: `/komplekty/${b.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const b = bundles.find((x) => x.slug === area);
  if (!b) notFound();

  return (
    <Container className="py-10">
      <Badge tone="primary">B2B · под ключ</Badge>
      <h1 className="mt-3 text-2xl font-medium">{b.h1}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{b.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Оставить заявку на расчёт</Button>
        <Button variant="ghost">Смета в WhatsApp</Button>
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium">Под ключ включено</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {serviceIncluded.map((s) => (
          <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-accent" /> {s}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 mb-3 text-lg font-medium">Другие площади</h2>
      <BundleTiers current={b.slug} />
    </Container>
  );
}
