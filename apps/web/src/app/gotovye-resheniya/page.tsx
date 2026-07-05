import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HighlightLine } from "@/components/HighlightLine";
import { gotovyeResheniyaMeta, priceFmt, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: gotovyeResheniyaMeta.title,
  description: gotovyeResheniyaMeta.description,
  alternates: { canonical: "/gotovye-resheniya" },
};

type Solution = {
  id: string;
  category: "home" | "business";
  label: string;
  scenario: string;
  price: number;
  system: string;
  includes: string[];
};

const solutions: Solution[] = [
  {
    id: "gostinya",
    category: "home",
    label: "Гостиная",
    scenario: "Дом · до 30 м²",
    price: 749000,
    system: "Evolution Evobox или AST Mini",
    includes: ["Медиаплеер", "2 микрофона", "Активная акустика", "Подключение к ТВ", "60 000+ песен"],
  },
  {
    id: "banya",
    category: "home",
    label: "Баня / сауна",
    scenario: "Дом · влагостойкое исполнение",
    price: 900000,
    system: "AST Mini + влагозащита",
    includes: ["Медиаплеер", "2 беспроводных микрофона", "Акустика в защищённом корпусе", "60 000+ песен"],
  },
  {
    id: "kafe",
    category: "business",
    label: "Кафе / ресторан",
    scenario: "Бизнес · до 80 м²",
    price: 1400000,
    system: "AST-250 или Evobox Plus",
    includes: ["Пульт-моноблок / медиаплеер", "4 микрофона", "Акустика + сабвуфер", "Монтаж и настройка", "Обучение персонала"],
  },
  {
    id: "vip-zal",
    category: "business",
    label: "VIP-зал / банкет",
    scenario: "Бизнес · до 120 м²",
    price: 1800000,
    system: "AST-250 + акустика The Box / HK",
    includes: ["Система с расширенной акустикой", "4–6 микрофонов", "Микшер Dynacord", "Проект звука под зал", "Монтаж, настройка, обучение"],
  },
  {
    id: "klub",
    category: "business",
    label: "Клуб / большой зал",
    scenario: "Бизнес · 100+ м²",
    price: 2500000,
    system: "AST-350 или Evolution Pro2 + RCF",
    includes: ["Флагманская система", "6–8 микрофонов", "Акустика RCF EVOX / Martin Audio", "Свет", "Полный проект и монтаж"],
  },
];

export default function Page() {
  const home = solutions.filter((s) => s.category === "home");
  const business = solutions.filter((s) => s.category === "business");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Готовые решения", path: "/gotovye-resheniya" }])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Готовые решения" }]} />
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Готовые <HighlightLine>решения</HighlightLine>
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Подобранные комплекты под конкретный сценарий. Цена, состав, что входит — всё сразу. Уточним детали под ваш объект.
        </p>

        {/* Для дома */}
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Для дома</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {home.map((s) => <SolutionCard key={s.id} solution={s} />)}
          </div>
        </section>

        {/* Для бизнеса */}
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Для заведений</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.map((s) => <SolutionCard key={s.id} solution={s} />)}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-surface p-6">
          <h2 className="font-medium">Не нашли подходящее?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Расскажите про задачу — подберём индивидуально и пришлём смету.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу подобрать готовое решение.")}`}
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
              Калькулятор <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </Container>
    </>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const { label, scenario, price, system, includes } = solution;
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Интересует готовое решение «${label}».`)}`;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{scenario}</p>
      <p className="mt-1 font-display text-lg font-semibold">{label}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{system}</p>
      <p className="mt-3 text-xl font-bold text-primary">{priceFmt(price)}</p>
      <ul className="mt-3 space-y-1">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
        Обсудить <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
