import type { Metadata } from "next";
import Link from "next/link";
import { bundles, komplektyIndexMeta } from "@/lib/site";
import { LandingPage } from "@/components/LandingPage";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: komplektyIndexMeta.title,
  description: komplektyIndexMeta.description,
  alternates: { canonical: "/komplekty" },
};

export default function Page() {
  return (
    <LandingPage
      h1={komplektyIndexMeta.h1}
      description={komplektyIndexMeta.description}
      highlight="по площади"
      breadcrumb={<Breadcrumb withLd currentPath="/komplekty" items={[{ label: "Готовые комплекты" }]} />}
    >
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {bundles.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/komplekty/${b.slug}`}
              className="block rounded-lg border border-border px-4 py-3 hover:bg-muted"
            >
              <span className="font-medium">{b.h1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </LandingPage>
  );
}
