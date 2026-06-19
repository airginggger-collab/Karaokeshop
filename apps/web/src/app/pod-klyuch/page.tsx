import type { Metadata } from "next";
import { podKlyuchMeta } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: podKlyuchMeta.title,
  description: podKlyuchMeta.description,
  alternates: { canonical: "/pod-klyuch" },
};

export default function Page() {
  return <LandingPage h1={podKlyuchMeta.h1} description={podKlyuchMeta.description} />;
}
