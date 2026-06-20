"use client";

import Link from "next/link";
import { X, ShoppingCart, Speaker } from "lucide-react";
import { Button, Badge } from "@kk/ui";
import { useCompare } from "@/lib/compare";
import { useCart } from "@/lib/cart";
import { products, priceFmt, installmentMonthly, typeLabels, type Product } from "@/lib/site";

const rows: { label: string; render: (p: Product) => string }[] = [
  { label: "Цена", render: (p) => priceFmt(p.price) },
  { label: "Рассрочка", render: (p) => `от ${priceFmt(installmentMonthly(p.price))}/мес` },
  { label: "Бренд", render: (p) => p.brand },
  { label: "Тип", render: (p) => typeLabels[p.type] },
  { label: "Сценарий", render: (p) => p.scenarioLabel ?? "—" },
  { label: "Площадь", render: (p) => (p.areaMax ? `до ${p.areaMax} м²` : "—") },
  { label: "Мощность", render: (p) => p.power ?? "—" },
  { label: "Песен", render: (p) => (p.songsCount ? new Intl.NumberFormat("ru-RU").format(p.songsCount) + "+" : "—") },
  { label: "Рейтинг", render: (p) => (p.rating ? `${p.rating} · ${p.reviewsCount} отз.` : "—") },
];

export function CompareClient() {
  const { slugs, remove, clear, ready } = useCompare();
  const { add } = useCart();

  if (!ready) return <p className="mt-6 text-sm text-muted-foreground">Загрузка…</p>;

  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));

  if (!items.length) {
    return (
      <div className="mt-8 rounded-2xl border border-border p-8 text-center">
        <h2 className="text-lg font-medium">Нет товаров для сравнения</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Отметьте товары «к сравнению» в каталоге или на карточке товара.
        </p>
        <Link href="/catalog" className="mt-4 inline-block">
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr>
              <th className="w-28" />
              {items.map((p) => (
                <th key={p.slug} className="p-3 text-left align-top">
                  <div className="flex h-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-surface to-muted">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.model} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <Speaker className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-2">
                    <Link href={`/product/${p.slug}`} className="font-medium hover:text-primary">
                      {p.model}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      aria-label="Убрать"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="py-2 pr-3 align-top text-muted-foreground">{r.label}</td>
                {items.map((p) => (
                  <td key={p.slug} className="border-t border-border px-3 py-2 align-top">
                    {r.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="pt-3" />
              {items.map((p) => (
                <td key={p.slug} className="border-t border-border px-3 pt-3 align-top">
                  <Badge tone="primary">{p.scenarioLabel ?? typeLabels[p.type]}</Badge>
                  <div className="mt-2">
                    <Button
                      size="sm"
                      onClick={() => add({ id: p.slug, name: p.model, price: p.price, meta: p.scenarioLabel ?? typeLabels[p.type] })}
                    >
                      <ShoppingCart className="h-4 w-4" /> В корзину
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <button type="button" onClick={clear} className="mt-5 text-sm text-muted-foreground hover:text-foreground">
        Очистить сравнение
      </button>
    </div>
  );
}
