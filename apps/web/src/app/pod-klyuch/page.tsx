import type { Metadata } from "next";
import { Badge } from "@kk/ui";
import { Container } from "@/components/Container";
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
    <Container className="py-12">
      <Badge tone="primary">B2B · для заведений</Badge>
      <h1 className="mt-3 text-2xl font-medium">{podKlyuchMeta.h1}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{podKlyuchMeta.description}</p>

      <div className="mt-8">
        <ServiceSteps />
      </div>

      <div className="mt-8 max-w-2xl">
        <AreaCalculator />
      </div>
    </Container>
  );
}
