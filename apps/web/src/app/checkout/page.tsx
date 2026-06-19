import type { Metadata } from "next";
import { CreditCard, Truck, Speaker } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { products, priceFmt, installmentMonthly } from "@/lib/site";

export const metadata: Metadata = {
  title: "Оформление заказа",
  robots: { index: false, follow: false },
};

export default function Page() {
  const item = products.find((p) => p.slug === "ast-250")!;
  const monthly = priceFmt(installmentMonthly(item.price));

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">Оформление заказа</h1>

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
          <div className="mb-3 flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
              <Speaker className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.model}</p>
              <p className="text-xs text-muted-foreground">{item.scenarioLabel} · 1 шт</p>
            </div>
            <p className="text-sm">{priceFmt(item.price)}</p>
          </div>
          <div className="border-t border-border pt-3 text-sm">
            <div className="mb-1 flex justify-between text-muted-foreground">
              <span>Доставка</span>
              <span>0 ₸</span>
            </div>
            <div className="mb-4 flex justify-between font-medium">
              <span>Итого</span>
              <span>{priceFmt(item.price)}</span>
            </div>
            <Button className="w-full">Подтвердить заказ</Button>
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5" /> или {monthly}/мес в рассрочку Kaspi
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
