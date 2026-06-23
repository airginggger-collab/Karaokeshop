import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { faqJsonLd } from "@/lib/seo";
import { ServiceSteps } from "@/components/ServiceSteps";
import { AreaCalculator } from "@/components/AreaCalculator";
import { podKlyuchMeta, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: podKlyuchMeta.title,
  description: podKlyuchMeta.description,
  alternates: { canonical: "/pod-klyuch" },
};

const faq = [
  { q: "Сколько стоит монтаж под ключ?", a: "Монтаж включён в стоимость комплекта. Отдельно оплачивается только при нестандартных условиях — потолки 5+ м или выезд в другой город." },
  { q: "Как долго длится установка?", a: "Кафе до 80 м² — 1–2 дня. Клуб или большой зал — 3–5 дней. Работаем так, чтобы не останавливать заведение." },
  { q: "Выезжаете ли в другие города?", a: "Да. Астана, Шымкент и регионы — по запросу. Уточните условия в WhatsApp." },
  { q: "Обучаете ли персонал работе с системой?", a: "Обучение персонала включено в каждый монтаж под ключ. Также высылаем видео-инструкцию." },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Интересует монтаж под ключ.")}`;

export default function Page() {
  return (
    <Container className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
      <Breadcrumb items={[{ label: "Монтаж под ключ" }]} />
      <Badge tone="primary">B2B · для заведений</Badge>
      <h1 className="mt-3 font-display text-2xl font-bold">{podKlyuchMeta.h1}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{podKlyuchMeta.description}</p>

      <div className="mt-8">
        <ServiceSteps />
      </div>

      <div className="mt-8 max-w-2xl">
        <AreaCalculator />
        <p className="mt-3 text-sm text-muted-foreground">
          Нужна детальная смета по компонентам?{" "}
          <Link href="/kalkulyator" className="font-medium text-primary hover:underline">
            Открыть калькулятор →
          </Link>
        </p>
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

      <div className="mt-8 rounded-2xl bg-surface p-6">
        <h2 className="font-medium">Готовы обсудить проект?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Расскажите про объект — подберём решение и пришлём смету.</p>
        <div className="mt-4">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
             className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-fg">
            Написать в WhatsApp
          </a>
          <p className="mt-2 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
        </div>
      </div>
    </Container>
  );
}
