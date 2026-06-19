"use client";

import * as React from "react";
import Link from "next/link";
import { CreditCard, Truck, Speaker, Trash2, Check } from "lucide-react";
import { Button } from "@kk/ui";
import { useCart } from "@/lib/cart";
import { priceFmt, installmentMonthly } from "@/lib/site";

export function CheckoutClient() {
  const { lines, total, remove, clear, ready } = useCart();
  const [done, setDone] = React.useState(false);

  if (!ready) {
    return <p className="mt-8 text-sm text-muted-foreground">Загрузка…</p>;
  }

  if (done) {
    return (
      <div className="mt-8 rounded-2xl border border-border p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-fg">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-3 text-lg font-medium">Заявка принята</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Менеджер свяжется с вами для подтверждения и оформления рассрочки Kaspi.
        </p>
        <Link href="/catalog" className="mt-4 inline-block text-sm text-primary hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="mt-8 rounded-2xl border border-border p-8 text-center">
        <h2 className="text-lg font-medium">Корзина пуста</h2>
        <p className="mt-1 text-sm text-muted-foreground">Добавьте систему из каталога.</p>
        <Link href="/catalog" className="mt-4 inline-block">
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  const monthly = priceFmt(installmentMonthly(total));

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <h2 className="mb-3 text-sm font-medium">Способ оплаты</h2>
        <label className="mb-2 flex items-start gap-3 rounded-xl border-2 border-primary p-4">
          <input type="radio" name="pay" defaultChecked className="mt-1" />
          <span>
            <span className="text-sm font-medium">Kaspi рассрочка 0-0-12</span>
            <span className="mt-0.5 block text-sm text-accent-fg">{monthly} × 12 мес · без переплаты</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Одобрение в приложении Kaspi за минуту</span>
          </span>
        </label>
        <label className="mb-2 flex items-center gap-3 rounded-xl border border-border p-4">
          <input type="radio" name="pay" />
          <span className="text-sm">Kaspi Pay — оплатить сразу</span>
        </label>
        <label className="mb-6 flex items-center gap-3 rounded-xl border border-border p-4">
          <input type="radio" name="pay" />
          <span className="text-sm">Картой онлайн / при получении</span>
        </label>

        <h2 className="mb-3 text-sm font-medium">Доставка</h2>
        <input type="text" placeholder="Город, адрес" className="mb-2 h-11 w-full rounded-lg border border-border px-3 text-sm outline-none" />
        <input type="tel" placeholder="Телефон" className="mb-2 h-11 w-full rounded-lg border border-border px-3 text-sm outline-none" />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Truck className="h-4 w-4" /> Доставка по Алматы бесплатно · монтаж по согласованию
        </p>
      </div>

      <aside className="h-fit rounded-2xl bg-surface p-5">
        <h2 className="mb-3 text-sm font-medium">Ваш заказ</h2>
        {lines.map((l) => (
          <div key={l.product.slug} className="mb-3 flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
              <Speaker className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{l.product.model}</p>
              <p className="text-xs text-muted-foreground">
                {l.product.scenarioLabel} · {l.qty} шт
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">{priceFmt(l.product.price * l.qty)}</p>
              <button
                type="button"
                onClick={() => remove(l.product.slug)}
                aria-label="Убрать"
                className="mt-1 text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        <div className="border-t border-border pt-3 text-sm">
          <div className="mb-1 flex justify-between text-muted-foreground">
            <span>Доставка</span>
            <span>0 ₸</span>
          </div>
          <div className="mb-4 flex justify-between font-medium">
            <span>Итого</span>
            <span>{priceFmt(total)}</span>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              setDone(true);
              clear();
            }}
          >
            Подтвердить заказ
          </Button>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5" /> или {monthly}/мес в рассрочку Kaspi
          </p>
        </div>
      </aside>
    </div>
  );
}
