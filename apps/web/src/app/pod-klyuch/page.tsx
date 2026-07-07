import type { Metadata } from "next";
import Link from "next/link";
import { Ruler, Wrench, SlidersHorizontal, CheckCircle2, ArrowRight, ShieldCheck, Users, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AreaCalculator } from "@/components/AreaCalculator";
import { HighlightLine } from "@/components/HighlightLine";
import { podKlyuchMeta, siteConfig } from "@/lib/site";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: podKlyuchMeta.title,
  description: podKlyuchMeta.description,
  alternates: { canonical: "/pod-klyuch" },
};

const steps = [
  {
    n: "01",
    icon: Ruler,
    title: "Проект звука",
    body: "Выезжаем на объект или считаем по плану. Подбираем оборудование под площадь, акустику помещения и бюджет. Смета — бесплатно.",
  },
  {
    n: "02",
    icon: Wrench,
    title: "Монтаж и настройка",
    body: "Монтируем, прокладываем кабели, настраиваем звук под акустику зала. Для кафе до 80 м² — 1–2 дня, без остановки заведения.",
  },
  {
    n: "03",
    icon: SlidersHorizontal,
    title: "Обучение и сдача",
    body: "Обучаем персонал работе с системой, выдаём видео-инструкцию. Гарантия, поддержка и регулярное обновление репертуара.",
  },
];

const included = [
  "Проект звука под помещение",
  "Монтаж и прокладка кабелей",
  "4+ беспроводных микрофона",
  "Настройка звука под акустику зала",
  "Обучение персонала",
  "Гарантия от 1 года",
  "Сервисное обслуживание",
  "Обновление репертуара по договору",
];

const trust = [
  { icon: Users, value: "200+", label: "завершённых проектов" },
  { icon: Wrench, value: "1–2 дня", label: "монтаж кафе до 80 м²" },
  { icon: ShieldCheck, value: "Гарантия", label: "от 1 года + сервис-центр" },
  { icon: MapPin, value: "Весь КЗ", label: "Алматы и регионы" },
];

const faq = [
  { q: "Сколько стоит монтаж под ключ?", a: "Монтаж включён в стоимость комплекта. Отдельно оплачивается только при нестандартных условиях — потолки 5+ м или выезд в другой город." },
  { q: "Как долго длится установка?", a: "Кафе до 80 м² — 1–2 дня. Клуб или большой зал — 3–5 дней. Работаем так, чтобы не останавливать заведение." },
  { q: "Выезжаете ли в другие города?", a: "Да. Астана, Шымкент и регионы — по запросу. Уточните условия в WhatsApp." },
  { q: "Обучаете ли персонал работе с системой?", a: "Обучение персонала включено в каждый монтаж под ключ. Также высылаем видео-инструкцию." },
  { q: "Можно ли поэтапно оплатить?", a: "Да, работаем с поэтапной оплатой: аванс до монтажа, остаток после сдачи объекта. Уточните в WhatsApp." },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Интересует монтаж под ключ.")}`;

// h1 из podKlyuchMeta.h1 = "Оснащение караоке под ключ" — подсвечиваем ключевую фразу, текст не меняем.
const H1_HIGHLIGHT = "под ключ";
const h1Prefix = podKlyuchMeta.h1.endsWith(H1_HIGHLIGHT)
  ? podKlyuchMeta.h1.slice(0, -H1_HIGHLIGHT.length)
  : podKlyuchMeta.h1 + " ";

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Монтаж под ключ", path: "/pod-klyuch" }])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Монтаж под ключ" }]} />

        {/* Герой */}
        <section className="mt-4 rounded-xl border border-border bg-background p-8 sm:p-10">
          <p className="ticker">Под ключ</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {h1Prefix}<HighlightLine>{H1_HIGHLIGHT}</HighlightLine>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Кафе, ресторан, бар или клуб. Один договор — проект, монтаж, обучение и гарантия.
            С 2012 года, 200+ объектов, Алматы и весь Казахстан.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
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
        </section>

        {/* 3 шага */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Как это работает</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {steps.map(({ n, icon: Icon, title, body }) => (
              <div key={n} className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl font-bold text-primary/20">{n}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Что включено */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Что входит в комплект под ключ</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Числа доверия */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold leading-tight">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Калькулятор площади */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">Быстрый расчёт по площади</h2>
          <div className="mt-4 max-w-2xl">
            <AreaCalculator />
            <p className="mt-3 text-sm text-muted-foreground">
              Нужна детальная смета по компонентам?{" "}
              <Link href="/kalkulyator" className="font-medium text-primary hover:underline">
                Открыть калькулятор →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Частые вопросы</h2>
          <FaqAccordion items={faq} />
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-border bg-background p-6">
          <h2 className="font-medium">Готовы обсудить проект?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Расскажите про объект — подберём решение и пришлём смету.
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
