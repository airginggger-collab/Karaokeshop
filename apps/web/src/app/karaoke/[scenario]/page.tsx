import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scenarios } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";
import { Breadcrumb } from "@/components/Breadcrumb";

// dlya-doma живёт на /dlya-doma (301 в public/_redirects) — дубль не генерим.
export function generateStaticParams() {
  return scenarios.filter((s) => s.slug !== "dlya-doma").map((s) => ({ scenario: s.slug }));
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
    alternates: { canonical: `/karaoke/${s.slug}` },
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
  // h1 сценария = "Караоке для кафе" и т.п. — подсвечиваем только последнее
  // слово (заведение-дифференциатор: «кафе», «бара», «ресторана» и т.д.),
  // чтобы подсветка всегда была меньше половины h1.
  const highlight = s.h1.split(" ").pop();
  return (
    <LandingPage
      h1={s.h1}
      description={s.description}
      highlight={highlight}
      breadcrumb={<Breadcrumb withLd currentPath={`/karaoke/${s.slug}`} items={[{ label: s.h1 }]} />}
    />
  );
}
