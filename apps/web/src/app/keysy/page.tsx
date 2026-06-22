import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Quote, ArrowRight } from "lucide-react";
import { Badge } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { keysyMeta, cases, siteConfig } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: keysyMeta.title,
  description: keysyMeta.description,
  alternates: { canonical: "/keysy" },
};

const photos = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=70&auto=format&fit=crop",
];

const metrics: Record<string, { duration: string; result: string }> = {
  "bar-almaty":     { duration: "2 дня монтаж", result: "окупаемость 7 мес." },
  "restoran-astana": { duration: "3 дня монтаж", result: "0 нареканий за год" },
  "otel-shymkent":  { duration: "2 дня монтаж", result: "работает на банкетах" },
};

const faq = [
  { q: "Сколько длится монтаж в заведении?", a: "В среднем 1–3 дня в зависимости от площади и сложности. Кафе до 80 м² — обычно 1–2 дня." },
  { q: "Работаете ли вы в других городах Казахстана?", a: "Да. Выезжаем в Астану, Шымкент и другие города. Уточняйте условия по телефону или в WhatsApp." },
  { q: "Можно посмотреть реализованные объекты лично?", a: "Свяжитесь с нами — организуем показ одного из оснащённых заведений в Алматы." },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу узнать подробнее про ваши кейсы.")}`;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <Container className="py-10">
        <Breadcrumb items={[{ label: keysyMeta.h1 }]} />
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{keysyMeta.h1}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{keysyMeta.description}</p>

        {/* Карточки кейсов */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => {
            const m = metrics[c.slug];
            return (
              <article key={c.slug} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                <div className="relative">
                  <img
                    src={photos[i % photos.length]}
                    alt={`${c.venue}, ${c.city}`}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge tone="primary">{c.system}</Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-lg font-semibold">{c.venue}</p>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {c.city} · {c.area}
                  </p>

                  {m && (
                    <div className="mt-3 flex gap-3">
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
          <h2 className="font-display text-2xl font-semibold">Частые вопросы</h2>
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
          <h2 className="font-medium">Хотите так же?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Расскажите про ваш объект — подберём систему и пришлём смету.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Badge tone="primary" className="h-10 cursor-pointer px-4 text-sm">Написать в WhatsApp</Badge>
            </a>
            <Link href="/kalkulyator" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Калькулятор <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
