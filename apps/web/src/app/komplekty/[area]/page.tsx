import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bundles } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";

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
  return <LandingPage h1={b.h1} description={b.description} />;
}
