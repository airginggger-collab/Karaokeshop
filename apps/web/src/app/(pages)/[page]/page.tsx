import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { staticPages } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";

export function generateStaticParams() {
  return staticPages.map((p) => ({ page: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const p = staticPages.find((x) => x.slug === page);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${p.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const p = staticPages.find((x) => x.slug === page);
  if (!p) notFound();
  // Подсвечиваем первое смысловое слово h1 («Сервис и гарантия» → «Сервис»).
  const highlight = p.h1.split(" ")[0];
  return <LandingPage h1={p.h1} description={p.description} highlight={highlight} />;
}
