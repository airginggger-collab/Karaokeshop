"use client";

import { CartProvider } from "@/lib/cart";
import { CompareProvider } from "@/lib/compare";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CompareProvider>{children}</CompareProvider>
    </CartProvider>
  );
}
