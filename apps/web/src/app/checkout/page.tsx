import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CheckoutClient } from "@/components/CheckoutClient";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Оформление заказа",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Оформление заказа" }]} />
      <h1 className="font-display text-2xl font-bold">Оформление заказа</h1>
      <CheckoutClient />
    </Container>
  );
}
