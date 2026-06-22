import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Music, ShieldCheck, Wrench, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { products, priceFmt, siteConfig } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Оснастить заведение под ключ — бар, ресторан, клуб | Алматы",
  description: "Профессиональное оснащение кафе, бара, ресторана и клуба. Проект звука, монтаж, обучение. Алматы, с 2012.",
  alternates: { canonical: "/dlya-biznesa" },
};

const businessSystems = products.filter(
  (p) => p.type === "sistema" && (p.scenario === "bar" || p.scenario === "klub")
);

const venueTypes = [
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
    <Container className="py-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Главная</Link>
        <span>/</span>
        <span>Для бизнеса</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Оснастить заведение под ключ</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Кафе, ресторан, VIP-зал, клуб. Делаем проект звука, монтируем, настраиваем и обучаем персонал. С 2012 года — Алматы и весь Казахстан.
      </p>

      {/* Типы заведений */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Под какое заведение?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {venueTypes.map(({ icon: Icon, label, area, body, price }) => (
            <div
              key={label}
              className="flex flex-col rounded-2xl border border-border p-5"
              style={{ borderTopColor: "var(--night-accent)", borderTopWidth: 3, background: "var(--night-bg)", color: "var(--night-fg)" }}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "var(--night-soft)", color: "var(--night-accent)" }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-medium">{label}</p>
              <p className="text-xs" style={{ color: "var(--night-muted)" }}>{area}</p>
              <p className="mt-2 text-sm" style={{ color: "var(--night-muted)" }}>{body}</p>
              <p className="mt-auto pt-3 text-sm font-semibold" style={{ color: "var(--night-accent)" }}>{price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Что входит */}
      <section className="mt-10">
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
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold">Популярные системы для заведений</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessSystems.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm"
              >
                <p className="text-xs text-muted-foreground">{p.brand} · {p.scenarioLabel}</p>
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

      {/* Почему мы */}
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <TrendingUp className="h-5 w-5 shrink-0 text-primary" /> С 2012 года — более 200 объектов
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary" /> Гарантия + сервис-центр
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-4 text-sm">
          <Wrench className="h-5 w-5 shrink-0 text-primary" /> Один договор — всё включено
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
      <div className="mt-10 rounded-2xl p-6" style={{ background: "var(--night-bg)", color: "var(--night-fg)" }}>
        <h2 className="font-medium">Расскажите про ваш объект</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--night-muted)" }}>
          Напишите площадь зала и задачу — подберём систему и пришлём ориентировочную смету за день.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button>Написать в WhatsApp</Button>
          </a>
          <Link href="/kalkulyator">
            <Button variant="ghost" style={{ color: "var(--night-fg)", borderColor: "var(--night-soft)" }}>
              Калькулятор сметы <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
    </>
  );
}
