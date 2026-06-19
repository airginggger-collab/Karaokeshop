import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CompareClient } from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "Сравнение оборудования",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">Сравнение оборудования</h1>
      <p className="mt-1 text-sm text-muted-foreground">Сравните выбранные караоке-системы по характеристикам.</p>
      <CompareClient />
    </Container>
  );
}
