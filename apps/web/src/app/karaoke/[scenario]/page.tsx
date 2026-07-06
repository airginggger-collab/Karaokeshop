import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scenarios } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return scenarios.map((s) => ({ scenario: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenario: string }>;
}): Promise<Metadata> {
  const { scenario } = await params;
  const s = scenarios.find((x) => x.slug === scenario);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.slug === "dlya-doma" ? "/dlya-doma" : `/karaoke/${s.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario } = await params;
  const s = scenarios.find((x) => x.slug === scenario);
  if (!s) notFound();
  // h1 сценария = "Караоке для кафе" и т.п. — подсвечиваем дифференциатор
  // («для кафе»), т.е. хвост после общего слова «Караоке».
  const highlight = s.h1.startsWith("Караоке ") ? s.h1.slice("Караоке ".length) : undefined;
  return (
    <LandingPage
      h1={s.h1}
      description={s.description}
      highlight={highlight}
      breadcrumb={<Breadcrumb items={[{ label: s.h1 }]} />}
    />
  );
}
