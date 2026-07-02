import type { Metadata } from "next";
import Link from "next/link";
import { Home, Music, ShieldCheck, Wrench, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { products, siteConfig } from "@/lib/site";
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Для дома", path: "/dlya-doma" }])) }} />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Домашнее карао­ке" }]} />

        {/* Герой */}
        <section className="mt-4 rounded-3xl bg-gradient-to-br from-white to-[#f7f8fa] p-8 sm:p-10" style={{ color: "#141b26" }}>
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--warm-accent)" }}>
            Для дома
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Домашнее карао­ке<br />с гарантией и монтажом
          </h1>
          <p className="mt-3 max-w-xl text-[#5b6675]">
            Гостиная, баня или гостевой дом. Подберём систему AST или Studio Evolution под вашу комнату и бюджет — привезём, подключим, настроим.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl font-bold">от 749 000 ₸</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              Подобрать в WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[#5b6675]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" style={{ color: "var(--warm-accent)" }} /> Гарантия 1 год</span>
            <span className="flex items-center gap-1.5"><Wrench className="h-4 w-4" style={{ color: "var(--warm-accent)" }} /> Монтаж включён</span>
            <span className="flex items-center gap-1.5"><Music className="h-4 w-4" style={{ color: "var(--warm-accent)" }} /> 60 000+ песен</span>
          </div>
          </div>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img src="/scenariy/dom.jpg" alt="Домашнее караоке" loading="eager" className="h-full w-full object-cover" />
          </div>
          </div>
        </section>

        {/* Сценарии */}
        <section className="mt-12">
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
        <section className="mt-12">
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
          <section className="mt-12">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl font-semibold">Системы для дома</h2>
              <Link href="/catalog" className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex">
                Весь каталог <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {homeSystems.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Частые вопросы</h2>
          <FaqAccordion items={faq} />
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-surface p-6">
          <h2 className="font-medium">Не знаете, что выбрать?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Напишите в WhatsApp — расскажем, что подойдёт для вашей комнаты и бюджета.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white"
            >
              Написать в WhatsApp
            </a>
            <Link href="/kalkulyator" className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary">
              Рассчитать смету <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </Container>
    </>
  );
}
