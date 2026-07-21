import type { Metadata } from "next";
import { Home, Music, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { WaButton } from "@/components/WaButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqBlock } from "@/components/FaqBlock";
import { CtaSection } from "@/components/CtaSection";
import { HighlightLine } from "@/components/HighlightLine";
import { CountUp } from "@/components/CountUp";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Купить домашнее караоке в Алматы: AST Mini и Evobox от 749 000 ₸",
  description: "Системы AST Mini и Studio Evolution Evobox для гостиной, бани и гостевого дома. Подберём под комнату и бюджет. Монтаж, настройка и гарантия 1 год.",
  alternates: { canonical: "/dlya-doma" },
};

const homeSystems = products.filter((p) => p.type === "sistema" && p.scenario === "dom");

const scenarios: { icon?: LucideIcon; label: string; body: string }[] = [
  { icon: Home, label: "Гостиная", body: "Система с хорошей акустикой под телевизор. Управление с дивана, база 60 000+ песен." },
  { icon: Music, label: "Баня / сауна", body: "Влагостойкие колонки, беспроводные микрофоны. Хиты под пар." },
  { icon: Home, label: "Гостевой дом", body: "Всесезонный формат: семья, друзья, праздники. Просто включить и петь." },
];

const whatsIncluded = [
  "Медиаплеер / пульт-моноблок",
  "2 беспроводных микрофона",
  "Активная акустика (пара)",
  "Подключение к телевизору",
  "База 60 000+ песен (KZ · RU · EN)",
  "Обучение работе с системой",
];

const waText = "Здравствуйте! Хочу подобрать домашнее караоке.";

const faq = [
  { q: "Сколько стоит домашнее карао­ке?", a: "Базовый комплект (медиаплеер, 2 микрофона, акустика) стоит от 749 000 ₸. Точная сумма зависит от модели и площади комнаты. Пришлите размеры, рассчитаем." },
  { q: "Нужен ли монтаж и можно ли установить самому?", a: "Простые системы (Evobox, AST Mini) можно подключить самостоятельно, это как подключить телевизор. Для стационарного монтажа с прокладкой кабелей мы приедем сами." },
  { q: "Сколько песен в базе и как она обновляется?", a: "В базе 60 000+ песен: казахские, русские, английские хиты. Обновляем по запросу или по договору." },
  { q: "Какая гарантия на оборудование?", a: "Гарантия от 1 года на всё оборудование. Сервис-центр в Алматы, выезд по городу." },
];

export default function Page() {
  return (
    <>
      <Container className="py-10">
        <Breadcrumb withLd currentPath="/dlya-doma" items={[{ label: "Домашнее карао­ке" }]} />

        {/* Герой */}
        <section className="mt-4 rounded-xl border border-border bg-background p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
          <p className="ticker">Для дома</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            <HighlightLine>Домашнее карао­ке</HighlightLine><br />с гарантией и монтажом
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Гостиная, баня или гостевой дом. Подберём систему AST или Studio Evolution под вашу комнату и бюджет. Привезём, подключим, настроим.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl font-bold">от 749 000 ₸</span>
            <WaButton text={waText} size="lg">
              Подобрать в WhatsApp <ArrowRight className="h-4 w-4" />
            </WaButton>
          </div>
          <p className="ticker mt-5">Гарантия 1 год · Монтаж включён · <CountUp value="60 000+ песен" /></p>
          </div>
          <div className="hidden aspect-[4/3] overflow-hidden rounded-xl md:block">
            <img
              src="/scenariy/dom.webp"
              alt="Караоке для дома"
              className="h-full w-full rounded-xl object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          </div>
        </section>

        {/* Сценарии */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Где будет стоять?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {scenarios.map(({ icon: Icon, label, body }) => (
              <div key={label} className="rounded-xl border border-border bg-background p-5">
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
            <SectionHeader title="Системы для дома" action={{ href: "/catalog", label: "Весь каталог" }} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {homeSystems.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </section>
        )}

        {/* FAQ */}
        <FaqBlock faq={faq} />

        {/* CTA */}
        <CtaSection
          className="mt-10"
          title="Не знаете, что выбрать?"
          text="Напишите в WhatsApp. Расскажем, что подойдёт для вашей комнаты и бюджета."
          waText={waText}
          secondary={{ href: "/kalkulyator", label: "Рассчитать смету" }}
          note="Ответим в течение часа · Без обязательств"
        />
      </Container>
    </>
  );
}
