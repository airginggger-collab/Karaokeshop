import type { Metadata } from "next";
import Link from "next/link";
import { Home, Music, ShieldCheck, Wrench, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { products, priceFmt, siteConfig } from "@/lib/site";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Купить домашнее караоке в Алматы — AST Mini и Evobox от 749 000 ₸",
  description: "Системы AST Mini и Studio Evolution Evobox для гостиной, бани и гостевого дома. Подберём под комнату и бюджет. Монтаж, настройка и гарантия 1 год.",
  alternates: { canonical: "/dlya-doma" },
};

const homeSystems = products.filter((p) => p.type === "sistema" && p.scenario === "dom");

const scenarios: { icon?: LucideIcon; label: string; body: string }[] = [
  { icon: Home, label: "Гостиная", body: "Система с хорошей акустикой под телевизор. Управление с дивана, база 60 000+ песен." },
  { icon: Music, label: "Баня / сауна", body: "Влагостойкие колонки, беспроводные микрофоны. Хиты под пар." },
  { icon: Home, label: "Гостевой дом", body: "Всесезонный формат — семья, друзья, праздники. Просто включить и петь." },
];

const whatsIncluded = [
  "Медиаплеер / пульт-моноблок",
  "2 беспроводных микрофона",
  "Активная акустика (пара)",
  "Подключение к телевизору",
  "База 60 000+ песен (KZ · RU · EN)",
  "Обучение работе с системой",
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу подобрать домашнее караоке.")}`;

const faq = [
  { q: "Сколько стоит домашнее карао­ке?", a: "Базовый комплект (медиаплеер, 2 микрофона, акустика) — от 749 000 ₸. Точная сумма зависит от модели и площади комнаты. Пришлите размеры — рассчитаем." },
  { q: "Нужен ли монтаж и можно ли установить самому?", a: "Простые системы (Evobox, AST Mini) можно подключить самостоятельно — это как подключить телевизор. Для стационарного монтажа с прокладкой кабелей мы приедем сами." },
  { q: "Сколько песен в базе и как она обновляется?", a: "В базе 60 000+ песен: казахские, русские, английские хиты. Обновление — по запросу или по договору." },
  { q: "Какая гарантия на оборудование?", a: "Гарантия — от 1 года на всё оборудование. Сервис-центр в Алматы, выезд по городу." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Для дома", path: "/dlya-doma" }])) }} />
      <Breadcrumb items={[{ label: "Домашнее карао­ке" }]} />
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Домашнее карао­ке</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Тёплые вечера с семьёй и друзьями. Подберём систему под вашу комнату и бюджет — привезём, подключим, настроим.
      </p>

      {/* Сценарии */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Где будет стоять?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {scenarios.map(({ icon: Icon, label, body }) => (
            <div key={label} className="rounded-2xl border border-border bg-background p-5">
              {Icon && (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <p className="mt-3 font-medium">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Что входит */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Что входит в базовый комплект</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {whatsIncluded.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Системы */}
      {homeSystems.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold">Популярные системы для дома</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homeSystems.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm"
              >
                <p className="text-xs text-muted-foreground">{p.brand}</p>
                <p className="mt-1 font-medium group-hover:text-primary">{p.model}</p>
                <p className="mt-1 text-sm font-semibold">{priceFmt(p.price)}</p>
                {p.areaMax && <p className="mt-0.5 text-xs text-muted-foreground">до {p.areaMax} м²</p>}
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
                  Подробнее <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Доверие */}
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary" /> Гарантия на всё оборудование
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <Wrench className="h-5 w-5 shrink-0 text-primary" /> Подключение и настройка включены
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <Music className="h-5 w-5 shrink-0 text-primary" /> 60 000+ песен сразу в базе
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Частые вопросы</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <div key={item.q} className="rounded-2xl border border-border bg-background p-5">
              <p className="font-medium">{item.q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-surface p-6">
        <h2 className="font-medium">Не знаете, что выбрать?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Напишите в WhatsApp — расскажем, что подойдёт для вашей комнаты и бюджета.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button>Написать в WhatsApp</Button>
          </a>
          <Link href="/kalkulyator">
            <Button variant="ghost">
              Рассчитать смету <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
      </div>
    </Container>
    </>
  );
}
