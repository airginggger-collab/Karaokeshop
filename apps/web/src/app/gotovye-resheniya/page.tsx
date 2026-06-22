import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { priceFmt, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Готовые решения для домашнего и коммерческого караоке",
  description: "Подобранные комплекты под сценарий: гостиная, баня, кафе, клуб. Цена, состав и всё включено.",
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

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Интересует готовое решение для ")}`;

export default function Page() {
  const home = solutions.filter((s) => s.category === "home");
  const business = solutions.filter((s) => s.category === "business");

  return (
    <Container className="py-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Главная</Link>
        <span>/</span>
        <span>Готовые решения</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Готовые решения</h1>
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
          {home.map((s) => (
            <SolutionCard key={s.id} solution={s} warm />
          ))}
        </div>
      </section>

      {/* Для бизнеса */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Для заведений</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {business.map((s) => (
            <SolutionCard key={s.id} solution={s} warm={false} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-surface p-6">
        <h2 className="font-medium">Не нашли подходящее?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Расскажите про задачу — подберём индивидуально и пришлём смету.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button>Написать в WhatsApp</Button>
          </a>
          <Link href="/kalkulyator">
            <Button variant="ghost">
              Калькулятор <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

function SolutionCard({ solution, warm }: { solution: Solution; warm: boolean }) {
  const { label, scenario, price, system, includes, id } = solution;
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Интересует готовое решение «${label}».`)}`;

  if (warm) {
    return (
      <div
        className="flex flex-col rounded-2xl border p-5"
        style={{ backgroundColor: "var(--warm-bg)", borderColor: "var(--warm-soft)", color: "var(--warm-fg)" }}
      >
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--warm-muted)" }}>{scenario}</p>
        <p className="mt-1 font-display text-lg font-semibold">{label}</p>
        <p className="mt-0.5 text-sm" style={{ color: "var(--warm-muted)" }}>{system}</p>
        <p className="mt-3 text-xl font-bold" style={{ color: "var(--warm-accent)" }}>{priceFmt(price)}</p>
        <ul className="mt-3 space-y-1">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--warm-fg)" }}>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--warm-accent)" }} />
              {item}
            </li>
          ))}
        </ul>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: "var(--warm-accent)" }}>
          Обсудить <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-2xl border p-5"
      style={{ backgroundColor: "var(--night-bg)", borderColor: "var(--night-soft)", color: "var(--night-fg)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--night-muted)" }}>{scenario}</p>
      <p className="mt-1 font-display text-lg font-semibold">{label}</p>
      <p className="mt-0.5 text-sm" style={{ color: "var(--night-muted)" }}>{system}</p>
      <p className="mt-3 text-xl font-bold" style={{ color: "var(--night-accent)" }}>{priceFmt(price)}</p>
      <ul className="mt-3 space-y-1">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--night-fg)" }}>
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--night-accent)" }} />
            {item}
          </li>
        ))}
      </ul>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: "var(--night-accent)" }}>
        Обсудить <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
