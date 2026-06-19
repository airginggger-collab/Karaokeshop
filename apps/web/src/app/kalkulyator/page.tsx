import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CalculatorClient } from "@/components/CalculatorClient";
import { kalkulyatorMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: kalkulyatorMeta.title,
  description: kalkulyatorMeta.description,
  alternates: { canonical: "/kalkulyator" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{kalkulyatorMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{kalkulyatorMeta.description}</p>
      <div className="mt-6">
        <CalculatorClient />
      </div>
    </Container>
  );
}
