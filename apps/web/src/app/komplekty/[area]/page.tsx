import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { Badge, Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BundleTiers } from "@/components/BundleTiers";
import { HighlightLine } from "@/components/HighlightLine";
import { WaButton } from "@/components/WaButton";
import { bundles, priceFmt } from "@/lib/site";
import { bundleFor, smetaText, venueOf } from "@/lib/calculator";

const serviceIncluded = [
  "Выезд и проект звука под зал",
  "Монтаж",
  "Настройка",
  "Обучение персонала",
  "Гарантия + обновление песен",
];

export function generateStaticParams() {
  return bundles.map((b) => ({ area: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const b = bundles.find((x) => x.slug === area);
  if (!b) return {};
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: `/komplekty/${b.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const b = bundles.find((x) => x.slug === area);
  if (!b) notFound();

  // h1 = "Караоке для зала до 30 м²" и т.п. — подсвечиваем часть с площадью
  // («до 30 м²»). Если хвост не найден — h1 целиком без подсветки.
  const m = b.h1.match(/до .+$/);
  const areaIdx = m ? b.h1.lastIndexOf(m[0]) : -1;
  const calc = bundleFor(b.area, b.scenario);

  return (
    <Container className="py-10">
      <Breadcrumb withLd currentPath={`/komplekty/${b.slug}`} items={[{ label: "Готовые комплекты", href: "/komplekty" }, { label: b.h1 }]} />
      <Badge tone="primary">B2B · под ключ</Badge>
      <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        {areaIdx >= 0 && m ? (
          <>
            {b.h1.slice(0, areaIdx)}
            <HighlightLine>{m[0]}</HighlightLine>
          </>
        ) : (
          b.h1
        )}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{b.description}</p>

      {/* Ориентир и состав считает калькулятор (bundleFor) — своих цифр
          страница не держит, иначе разойдётся с ним и с квизом (ловушка 12). */}
      <div className="mt-6 rounded-xl border border-border bg-background p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Ориентир под ключ · {b.area} м²
          </p>
          <p className="font-display text-3xl font-bold text-primary">{priceFmt(calc.total)}</p>
        </div>
        <ul className="mt-4 divide-y divide-border border-t border-border text-sm">
          {calc.lines.map((l) => (
            <li key={l.name} className="flex items-baseline justify-between gap-4 py-2.5">
              <span>
                {l.name}
                {l.qty > 1 && <span className="ml-1 text-muted-foreground">× {l.qty}</span>}
              </span>
              <span className="shrink-0 text-muted-foreground">{priceFmt(l.subtotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Состав и сумма рассчитаны под {b.area} м². Точную смету подтверждаем по счёту: пришлите размеры зала.
        </p>
        {/* Иерархия по UI-правилу 8: зелёный WhatsApp → акцентный CTA. */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <WaButton text={smetaText(calc, venueOf(b.scenario))}>
            <MessageCircle className="h-4 w-4" /> Отправить смету в WhatsApp
          </WaButton>
          <Link href={`/kalkulyator?scenario=${b.scenario}&area=${b.area}`}>
            <Button variant="ghost">Уточнить смету в калькуляторе</Button>
          </Link>
        </div>
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium">Под ключ включено</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {serviceIncluded.map((s) => (
          <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-accent" /> {s}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 mb-3 text-lg font-medium">Другие площади</h2>
      <BundleTiers current={b.slug} />

      <p className="mt-6 text-sm text-muted-foreground">
        Подбираете не по площади, а под задачу (гостиная, баня, банкетный зал)?{" "}
        <Link href="/gotovye-resheniya" className="font-medium text-primary hover:underline">
          Готовые решения по сценариям
        </Link>
      </p>
    </Container>
  );
}
