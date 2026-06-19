"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { count, ready } = useCart();
  return (
    <Link
      href="/checkout"
      aria-label={`Корзина${ready && count > 0 ? `, ${count}` : ""}`}
      className="relative text-muted-foreground hover:text-foreground"
    >
      <ShoppingCart className="h-[18px] w-[18px]" />
      {ready && count > 0 ? (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-fg">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
