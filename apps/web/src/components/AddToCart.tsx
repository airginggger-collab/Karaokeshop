"use client";

import * as React from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@kk/ui";
import { useCart, type CartInput } from "@/lib/cart";

export function AddToCart({ item }: { item: CartInput }) {
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);

  return (
    <Button
      onClick={() => {
        add(item);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
    >
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
