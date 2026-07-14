"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@kk/ui";
import { useCart, type CartInput } from "@/lib/cart";

export function AddToCart({ item, compact = false }: { item: CartInput; compact?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);

  function handleAdd() {
    add(item);
    setAdded(true);
    if (!compact) window.setTimeout(() => setAdded(false), 1500);
  }

  // Компактный вариант для sticky-бара товара: иконка 44px, вторичный ghost-вид.
  // После добавления — галка со ссылкой на /checkout (корзина достижима с телефона).
  if (compact) {
    return added ? (
      <Link
        href="/checkout"
        aria-label="В корзине, перейти к оформлению"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border transition hover:border-primary"
      >
        <Check className="h-5 w-5 text-success" />
      </Link>
    ) : (
      <button
        type="button"
        onClick={handleAdd}
        aria-label="Добавить в корзину"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border transition hover:border-primary"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    );
  }

  return (
    <Button onClick={handleAdd}>
      {added ? (
        <>
          <Check className="h-4 w-4" /> Добавлено
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" /> В корзину
        </>
      )}
    </Button>
  );
}
