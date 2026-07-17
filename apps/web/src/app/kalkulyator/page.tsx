import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CalculatorClient } from "@/components/CalculatorClient";
import { kalkulyatorMeta } from "@/lib/site";
import { supplierBrands } from "@/lib/components";

export const metadata: Metadata = {
  title: kalkulyatorMeta.title,
  description: kalkulyatorMeta.description,
  alternates: { canonical: "/kalkulyator" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb withLd currentPath="/kalkulyator" items={[{ label: "Калькулятор сметы" }]} />
      <h1 className="font-display text-2xl font-bold">{kalkulyatorMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{kalkulyatorMeta.description}</p>
      {/* Suspense обязателен: CalculatorClient читает useSearchParams (префилл из
          квиза), а при output:export сборка без границы падает. Параметры
          приезжают уже на клиенте, поэтому фолбэк виден лишь мгновение. */}
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Загрузка калькулятора…</p>}>
          <CalculatorClient />
        </Suspense>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        В сметах используем проф-оборудование брендов: {supplierBrands.join(" · ")}. Итоговые цены подтверждаем по счёту.
      </p>
    </Container>
  );
}
