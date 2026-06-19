import type { Metadata } from "next";
import { catalogMeta } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: catalogMeta.title,
  description: catalogMeta.description,
  alternates: { canonical: "/catalog" },
};

export default function Page() {
  return <LandingPage h1={catalogMeta.h1} description={catalogMeta.description} />;
}
