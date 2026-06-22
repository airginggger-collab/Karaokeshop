import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, GitCompare } from "lucide-react";
import { Badge, Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { sravnenieMeta, products, priceFmt } from "@/lib/site";

export const metadata: Metadata = {
  title: sravnenieMeta.title,
  description: sravnenieMeta.description,
  alternates: { canonical: "/sravnenie" },
};

const priceFrom = (brand: string) =>
  Math.min(...products.filter((p) => p.brand === brand).map((p) => p.price));

const brandsCmp = [
  {
    slug: "ast",
    name: "AST (Art System)",
    tagline: "Широкая линейка под любую площадь + сервис под ключ",
    models: "Mini, AST-50, AST-250, AST-350",
    home: "AST Mini",
    venue: "AST-250 / AST-350",
    strong: "Модельный ряд и сервис",
    songs: "60 000+",
    price: priceFrom("AST"),
  },
  {
    slug: "studio-evolution",
    name: "Studio Evolution (Evobox)",
    tagline: "Современный медиаплеер Evobox с удобным интерфейсом",
    models: "Evobox, Evobox Plus, Pro2",
    home: "Evobox",
    venue: "Evobox Plus / Pro2",
    strong: "Интерфейс и контент",
    songs: "50 000+",
    price: priceFrom("Studio Evolution"),
  },
];

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Сравнение брендов" }]} />
      <Badge tone="primary">
        <GitCompare className="h-3.5 w-3.5" /> Оба бренда в одном месте
      </Badge>
      <h1 className="mt-3 font-display text-2xl font-bold">{sravnenieMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{sravnenieMeta.description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {brandsCmp.map((b) => (
          <div key={b.slug} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold">{b.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{b.tagline}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Модели</dt>
                <dd className="text-right">{b.models}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Для дома</dt>
                <dd className="text-right">{b.home}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Для заведения</dt>
                <dd className="text-right">{b.venue}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Песен в базе</dt>
                <dd className="text-right">{b.songs}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Цена от</dt>
                <dd className="text-right font-medium">{priceFmt(b.price)}</dd>
              </div>
            </dl>
            <p className="mt-4 flex items-center gap-1.5 text-sm">
              <Check className="h-4 w-4 text-accent" /> {b.strong}
            </p>
            <Link href={`/brand/${b.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Смотреть модели <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-surface p-6">
        <h2 className="font-medium">Что выбрать</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Check className="h-4 w-4 shrink-0 text-accent" /> Для дома и небольшого кафе — AST Mini или Evobox.
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 shrink-0 text-accent" /> Для бара и клуба — AST-250/350 или Evobox Plus / Pro2.
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 shrink-0 text-accent" /> Чаще решает не бренд, а правильный подбор под площадь и монтаж.
          </li>
        </ul>
        <p className="mt-4 text-sm">Не уверены? Подберём индивидуально — это наша специализация.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/kalkulyator">
            <Button>Собрать смету</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="ghost">Весь каталог</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
