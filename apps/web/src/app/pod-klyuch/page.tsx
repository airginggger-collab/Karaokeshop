import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Mood } from "@/components/Mood";
import { ServiceSteps } from "@/components/ServiceSteps";
import { AreaCalculator } from "@/components/AreaCalculator";
import { podKlyuchMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: podKlyuchMeta.title,
  description: podKlyuchMeta.description,
  alternates: { canonical: "/pod-klyuch" },
};

export default function Page() {
  return (
    <Mood variant="night">
    <Container className="py-12">
      <Breadcrumb items={[{ label: "Монтаж под ключ" }]} />
      <Badge tone="primary">B2B · для заведений</Badge>
      <h1 className="mt-3 font-display text-2xl font-bold">{podKlyuchMeta.h1}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{podKlyuchMeta.description}</p>

      <div className="mt-8">
        <ServiceSteps />
      </div>

      <div className="mt-8 max-w-2xl">
        <AreaCalculator />
        <p className="mt-3 text-sm text-muted-foreground">
          Нужна детальная смета по компонентам?{" "}
          <Link href="/kalkulyator" className="font-medium text-primary hover:underline">
            Открыть калькулятор →
          </Link>
        </p>
      </div>
    </Container>
    </Mood>
  );
}
