import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Quote, ArrowRight, Building2 } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { keysyMeta, cases, siteConfig } from "@/lib/site";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: keysyMeta.title,
  description: keysyMeta.description,
  alternates: { canonical: "/keysy" },
};

const metrics: Record<string, { duration: string; result: string }> = {
  "bar-almaty":      { duration: "2 дня монтаж", result: "окупаемость 7 мес." },
  "restoran-astana": { duration: "3 дня монтаж", result: "0 нареканий за год" },
  "otel-shymkent":  { duration: "2 дня монтаж", result: "работает на банкетах" },
};

const faq = [
  { q: "Сколько длится монтаж в заведении?", a: "В среднем 1–3 дня в зависимости от площади и сложности. Кафе до 80 м²: обычно 1–2 дня." },
  { q: "Работаете ли вы в других городах Казахстана?", a: "Да. Выезжаем в Астану, Шымкент и другие города. Уточняйте условия по телефону или в WhatsApp." },
  { q: "Можно посмотреть реализованные объекты лично?", a: "Свяжитесь с нами, организуем показ одного из оснащённых заведений в Алматы." },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу узнать подробнее про ваши кейсы.")}`;

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Кейсы", path: "/keysy" }])} />
      <Container className="py-10">
        <Breadcrumb items={[{ label: keysyMeta.h1 }]} />
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{keysyMeta.h1}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{keysyMeta.description}</p>

        {/* Карточки кейсов */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const m = metrics[c.slug];
            return (
              <article key={c.slug} className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
                {/* Фото-заглушка */}
                <div className="relative flex h-48 items-center justify-center bg-scene">
                  <Building2 className="h-12 w-12 text-muted-foreground/30" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-fg">
                      {c.system}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-lg font-semibold">{c.venue}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" /> {c.city} · {c.area}
                  </p>

                  {m && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium">{m.duration}</span>
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">{m.result}</span>
                    </div>
                  )}

                  <p className="mt-3 flex gap-1.5 text-sm text-muted-foreground">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {c.quote}
                  </p>
                  <p className="mt-2 text-xs font-medium">{c.author}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Частые вопросы</h2>
          <FaqAccordion items={faq} />
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-border bg-background p-6">
          <h2 className="font-medium">Хотите так же?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Расскажите про ваш объект, подберём систему и пришлём смету.
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
              Калькулятор <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </Container>
    </>
  );
}
