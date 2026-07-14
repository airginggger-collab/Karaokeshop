import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus, ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HighlightLine } from "@/components/HighlightLine";
import { sravnenieMeta, products, priceFmt, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: sravnenieMeta.title,
  description: sravnenieMeta.description,
  alternates: { canonical: "/sravnenie" },
};

const priceFrom = (brand: string) =>
  Math.min(...products.filter((p) => p.brand === brand).map((p) => p.price));

type CellValue = { type: "yes" } | { type: "no" } | { type: "neutral" } | { type: "text"; value: string } | { type: "highlight"; value: string };

const rows: { label: string; ast: CellValue; se: CellValue }[] = [
  {
    label: "Линейка моделей",
    ast: { type: "text", value: "Mini, AST-50, AST-250, AST-350" },
    se: { type: "text", value: "Evobox, Evobox Plus, Pro2" },
  },
  {
    label: "Для дома",
    ast: { type: "highlight", value: "AST Mini" },
    se: { type: "highlight", value: "Evobox" },
  },
  {
    label: "Для кафе / ресторана",
    ast: { type: "highlight", value: "AST-250" },
    se: { type: "highlight", value: "Evobox Plus" },
  },
  {
    label: "Для клуба / большого зала",
    ast: { type: "highlight", value: "AST-350" },
    se: { type: "highlight", value: "Pro2" },
  },
  {
    label: "Песен в базе",
    ast: { type: "text", value: "60 000+" },
    se: { type: "text", value: "50 000+" },
  },
  {
    label: "Обновление репертуара",
    ast: { type: "yes" },
    se: { type: "yes" },
  },
  {
    label: "Беспроводные микрофоны",
    ast: { type: "yes" },
    se: { type: "yes" },
  },
  {
    label: "Казахские песни (KZ)",
    ast: { type: "yes" },
    se: { type: "yes" },
  },
  {
    label: "Модульное расширение (доп. зоны)",
    ast: { type: "yes" },
    se: { type: "neutral" },
  },
  {
    label: "Облачный контент / стриминг",
    ast: { type: "no" },
    se: { type: "yes" },
  },
  {
    label: "Сенсорный планшет-пульт",
    ast: { type: "no" },
    se: { type: "yes" },
  },
  {
    label: "Монтаж под ключ",
    ast: { type: "yes" },
    se: { type: "yes" },
  },
  {
    label: "Гарантия",
    ast: { type: "text", value: "1 год" },
    se: { type: "text", value: "1 год" },
  },
  {
    label: "Цена от",
    ast: { type: "text", value: priceFmt(priceFrom("AST")) },
    se: { type: "text", value: priceFmt(priceFrom("Studio Evolution")) },
  },
];

const scenarios = [
  {
    title: "Дом, гостиная, баня",
    rec: "AST Mini или Evobox",
    why: "Оба бренда предлагают готовые «всё включено» комплекты. Evobox выигрывает удобством планшетного интерфейса, AST Mini выигрывает ценой и простотой.",
    href: "/dlya-doma",
  },
  {
    title: "Кафе, ресторан, VIP-зал",
    rec: "AST-250 или Evobox Plus",
    why: "AST-250: надёжный выбор для зала до 80 м², хорошо знаком нашим монтажникам. Evobox Plus подойдёт, если важен современный интерфейс и облако.",
    href: "/dlya-biznesa",
  },
  {
    title: "Клуб, банкет-холл, большой зал",
    rec: "AST-350 или Pro2",
    why: "Для больших площадей решает не бренд, а правильный проект звука под помещение. Подберём по объекту.",
    href: "/pod-klyuch",
  },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Помогите выбрать между AST и Studio Evolution.")}`;

function Cell({ val }: { val: CellValue }) {
  if (val.type === "yes") return <Check className="mx-auto h-5 w-5 text-primary" />;
  if (val.type === "no") return <X className="mx-auto h-4 w-4 text-muted-foreground/50" />;
  if (val.type === "neutral") return <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" />;
  if (val.type === "highlight") return <span className="font-medium text-foreground">{val.value}</span>;
  return <span>{val.value}</span>;
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Главная", path: "/" },
              { name: "Сравнение", path: "/sravnenie" },
            ])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Сравнение брендов" }]} />

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          AST <HighlightLine>или</HighlightLine> Studio Evolution
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Оба бренда представлены у нас официально. Ниже честное сравнение без давления на продажу.
        </p>

        {/* Сравнительная таблица */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Критерий
                </th>
                <th className="w-[30%] px-4 py-3 text-center">
                  <span className="font-display text-base font-semibold">AST</span>
                  <span className="ml-1 text-xs text-muted-foreground">Art System</span>
                </th>
                <th className="w-[30%] px-4 py-3 text-center">
                  <span className="font-display text-base font-semibold">Studio Evolution</span>
                  <span className="ml-1 text-xs text-muted-foreground">Evobox</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-surface/40"}`}
                >
                  <td className="px-4 py-3 text-muted-foreground">{row.label}</td>
                  <td className="px-4 py-3 text-center">
                    <Cell val={row.ast} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell val={row.se} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Сильные стороны */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">AST: сильная сторона</p>
            <p className="mt-2 font-display text-lg font-semibold">Широкая линейка и сервис</p>
            <p className="mt-2 text-sm text-muted-foreground">
              От компактного Mini для дома до мощного AST-350 для клубов. Самая большая база KZ/RU/EN, модульное расширение на несколько зон. Хорошо изучен нашими монтажниками.
            </p>
            <Link href="/brand/ast" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Модели AST <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Studio Evolution: сильная сторона</p>
            <p className="mt-2 font-display text-lg font-semibold">Интерфейс и облако</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Evobox: современный планшетный пульт, облачный контент и удобный UX. Хорошо смотрится в заведениях, где важна презентабельность системы.
            </p>
            <Link href="/brand/studio-evolution" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Модели Studio Evolution <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Рекомендации по сценариям */}
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold">Что выбрать под вашу задачу</h2>
          <div className="mt-4 space-y-3">
            {scenarios.map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-background p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{s.title}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-medium">
                      <Star className="h-4 w-4 text-primary" /> {s.rec}
                    </p>
                  </div>
                  <Link href={s.href} className="shrink-0 text-sm font-medium text-primary hover:underline">
                    Подробнее <ArrowRight className="inline h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Итог */}
        <div className="mt-10 rounded-xl border border-border bg-background p-6">
          <h2 className="font-medium">Не уверены? Мы подберём</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Чаще всего выбор между брендами решает не «лучше / хуже», а площадь зала, бюджет и сценарий использования. Напишите, разберём вашу ситуацию.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              Написать в WhatsApp
            </a>
            <Link
              href="/kalkulyator"
              className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary"
            >
              Рассчитать смету <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </Container>
    </>
  );
}
