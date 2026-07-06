import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Music, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HighlightLine } from "@/components/HighlightLine";
import { products, siteConfig } from "@/lib/site";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Оснастить бар, ресторан, клуб под ключ — Алматы | karaokeshop",
  description: "Проект звука, монтаж и обучение для кафе, баров, ресторанов и клубов. AST-250/350, Studio Evolution, акустика RCF. 200+ проектов с 2012. Расчёт бесплатно.",
  alternates: { canonical: "/dlya-biznesa" },
};

const businessSystems = products.filter(
  (p) => p.type === "sistema" && (p.scenario === "bar" || p.scenario === "klub")
);

const venueTypes: { icon?: LucideIcon; label: string; area: string; body: string; price: string }[] = [
  {
    icon: Music,
    label: "Кафе / ресторан",
    area: "до 80 м²",
    body: "Фоновое пение для гостей. AST-250 или Evobox Plus — идеальный баланс цены и качества.",
    price: "от 1 400 000 ₸",
  },
  {
    icon: Users,
    label: "VIP-зал / банкет",
    area: "до 120 м²",
    body: "Изолированная зона, высокое качество звука. Ровный звук по всему залу без «пятен».",
    price: "от 1 800 000 ₸",
  },
  {
    icon: Building2,
    label: "Клуб / большой зал",
    area: "100+ м²",
    body: "Профессиональная акустика RCF, свет, AST-350 или Evolution Pro2. Проект под объект.",
    price: "от 2 500 000 ₸",
  },
];

const whatsIncluded = [
  "Проект звука под помещение",
  "Монтаж и прокладка кабелей",
  "Настройка звука под акустику зала",
  "4+ беспроводных микрофона",
  "Обучение персонала",
  "Гарантия и сервисное обслуживание",
  "Обновление репертуара по договору",
  "Выезд в любой город Казахстана",
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу оснастить заведение под ключ. Расскажите подробнее.")}`;

const faq = [
  { q: "Сколько стоит оснастить кафе или ресторан?", a: "Зал до 80 м² — от 1 400 000 ₸. Включает систему, монтаж, настройку и обучение персонала. Для точной сметы пришлите площадь и фото помещения." },
  { q: "Как долго длится монтаж?", a: "В кафе до 80 м² — 1–2 дня. Клуб или большой зал — 3–5 дней. Работаем так, чтобы не останавливать работу заведения." },
  { q: "Выезжаете ли в другие города?", a: "Да. Работаем по всему Казахстану: Астана, Шымкент и другие города. Стоимость выезда — по запросу." },
  { q: "Что будет, если оборудование сломается?", a: "У нас собственный сервис-центр в Алматы. Гарантийное обслуживание + срочный выезд при критических неисправностях." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Для бизнеса", path: "/dlya-biznesa" }])) }} />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Для бизнеса" }]} />

        {/* Герой */}
        <section className="mt-4 rounded-xl border border-border bg-background p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
          <p className="ticker">Для бизнеса</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            <HighlightLine>Оснастить заведение</HighlightLine><br />под ключ — Алматы
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Кафе, ресторан, VIP-зал, клуб. Делаем проект звука, монтируем, настраиваем и обучаем персонал. 200+ проектов с 2012 года.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl font-bold">от 1 400 000 ₸</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              Получить расчёт <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="ticker mt-5">200+ проектов · Гарантия и сервис · Монтаж 1–2 дня</p>
          </div>
          <div className="hidden aspect-[4/3] items-center justify-center rounded-xl bg-scene md:flex">
            <span aria-hidden="true" className="font-display text-2xl font-medium text-primary/40">ДЛЯ БИЗНЕСА</span>
          </div>
          </div>
        </section>

        {/* Типы заведений */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Под какое заведение?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {venueTypes.map(({ icon: Icon, label, area, body, price }) => (
              <div key={label} className="flex flex-col rounded-xl border border-border bg-background p-5">
                {Icon && (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                )}
                <p className="mt-3 font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{area}</p>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                <p className="mt-auto pt-3 text-sm font-semibold text-primary">{price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Что входит */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Что входит в оснащение под ключ</h2>
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
        {businessSystems.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl font-semibold">Системы для заведений</h2>
              <Link href="/catalog" className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex">
                Весь каталог <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {businessSystems.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Частые вопросы</h2>
          <FaqAccordion items={faq} />
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-xl bg-surface p-6">
          <h2 className="font-medium">Расскажите про ваш объект</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Напишите площадь зала и задачу — подберём систему и пришлём ориентировочную смету за день.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white"
            >
              Написать в WhatsApp
            </a>
            <Link
              href="/kalkulyator"
              className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary"
            >
              Калькулятор сметы <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </Container>
    </>
  );
}
