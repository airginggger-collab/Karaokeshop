import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Оформление заказа",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">Оформление заказа</h1>
      <CheckoutClient />
    </Container>
  );
}
