"use client";

import * as React from "react";
import Link from "next/link";
import { Truck, Speaker, Trash2, Check, MessageCircle } from "lucide-react";
import { Button } from "@kk/ui";
import { useCart } from "@/lib/cart";
import { priceFmt, siteConfig } from "@/lib/site";

export function CheckoutClient() {
  const { items, total, remove, clear, ready } = useCart();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [done, setDone] = React.useState(false);

  if (!ready) {
    return <p className="mt-8 text-sm text-muted-foreground">Загрузка…</p>;
  }

  if (done) {
    return (
      <div className="mt-8 rounded-2xl bg-background p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-fg">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-3 text-lg font-medium">Заявка отправлена</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Откроется WhatsApp — отправьте сообщение, менеджер свяжется в течение часа.
        </p>
        <Link href="/catalog" className="mt-4 inline-block text-sm text-primary hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mt-8 rounded-2xl bg-background p-8 text-center">
        <h2 className="text-lg font-medium">Корзина пуста</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Добавьте систему из каталога или соберите смету в калькуляторе.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link href="/catalog"><Button>Перейти в каталог</Button></Link>
          <Link href="/kalkulyator"><Button variant="ghost">Открыть калькулятор</Button></Link>
        </div>
      </div>
    );
  }

  function handleSubmit() {
    const lines = items.map((it) => `— ${it.name}${it.meta ? ` (${it.meta})` : ""}: ${priceFmt(it.price * it.qty)}`);
    const text = [
      "Здравствуйте! Хочу оформить заказ.",
      "",
      ...lines,
      "",
      `Итого: ${priceFmt(total)}`,
      name ? `Имя: ${name}` : "",
      phone ? `Телефон: ${phone}` : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n");

    clear();
    setDone(true);
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Контактные данные */}
      <div>
        <h2 className="mb-3 text-sm font-medium">Ваши данные</h2>
        <label htmlFor="co-name" className="mb-1 block text-xs font-medium text-muted-foreground">
          Имя <span className="font-normal">(необязательно)</span>
        </label>
        <input
          id="co-name"
          type="text"
          autoComplete="name"
          placeholder="Напр., Айгерим"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <label htmlFor="co-phone" className="mb-1 block text-xs font-medium text-muted-foreground">
          Телефон <span className="font-normal">(необязательно)</span>
        </label>
        <input
          id="co-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

        <h2 className="mb-3 text-sm font-medium">Доставка</h2>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Truck className="h-4 w-4 shrink-0 text-primary" />
          Доставка по Алматы бесплатно · монтаж по согласованию
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          После отправки заявки менеджер уточнит адрес и время доставки в WhatsApp.
        </p>
      </div>

      {/* Итого */}
      <aside className="h-fit rounded-2xl bg-background p-5">
        <h2 className="mb-3 text-sm font-medium">Ваш заказ</h2>
        {items.map((it) => (
          <div key={it.id} className="mb-3 flex gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface">
              <Speaker className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{it.name}</p>
              <p className="text-xs text-muted-foreground">
                {it.meta ? `${it.meta} · ` : ""}{it.qty} шт
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm">{priceFmt(it.price * it.qty)}</p>
              <button
                type="button"
                onClick={() => remove(it.id)}
                aria-label="Убрать"
                className="mt-1 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="border-t border-border pt-3">
          <div className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Доставка</span><span>0 ₸</span>
          </div>
          <div className="mb-4 flex justify-between font-medium">
            <span>Итого</span><span>{priceFmt(total)}</span>
          </div>
          <Button className="w-full gap-2" onClick={handleSubmit}>
            <MessageCircle className="h-4 w-4" /> Отправить заявку в WhatsApp
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Менеджер свяжется в течение часа и подтвердит заказ
          </p>
        </div>
      </aside>
    </div>
  );
}
