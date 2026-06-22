import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CompareClient } from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "Сравнение оборудования",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Сравнение" }]} />
      <h1 className="font-display text-2xl font-bold">Сравнение оборудования</h1>
      <p className="mt-1 text-sm text-muted-foreground">Сравните выбранные караоке-системы по характеристикам.</p>
      <CompareClient />
    </Container>
  );
}
