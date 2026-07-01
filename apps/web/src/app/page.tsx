import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { ProductImage } from "@/components/ProductImage";
import { QuizWidget } from "@/components/QuizWidget";
import { ClientLogos } from "@/components/ClientLogos";
import { products, priceFmt } from "@/lib/site";

const cell = "rounded-3xl p-6 transition";
const featuredProducts = products.filter((p) => p.type === "sistema").slice(0, 4);

export default function HomePage() {
  return (
    <Container className="py-6 sm:py-10">
      {/* Hero — квиз-подбор (услуга во главе) */}
      <section className="animate-fade-up">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Официальный дилер AST и Studio Evolution · 14 лет
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
          Караоке без ошибки в выборе
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Бесплатный подбор под вашу площадь и бюджет — за минуту. Дальше смета, монтаж, настройка и гарантия под ключ.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Официальный дилер", "14+ лет", "200+ проектов", "Монтаж под ключ"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <QuizWidget />
        </div>
      </section>

      {/* Дилерская полоса */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-background px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Официальный дилер
        </span>
        <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
        <a
          href="/brand/ast"
          className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 transition hover:border-primary"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-soft text-[10px] font-bold text-primary">
            A
          </span>
          <span className="text-sm font-semibold">AST</span>
          <span className="text-xs text-muted-foreground">Art System</span>
        </a>
        <a
          href="/brand/studio-evolution"
          className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 transition hover:border-primary"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
            style={{ background: "var(--night-soft)", color: "var(--night-accent)" }}
          >
            SE
          </span>
          <span className="text-sm font-semibold">Studio Evolution</span>
          <span className="text-xs text-muted-foreground">Evobox</span>
        </a>
        <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-primary" aria-hidden>
            <path d="M8 0l1.6 4.9H15l-4.4 3.2 1.7 5L8 10l-4.3 3.1 1.7-5L1 4.9h5.4z"/>
          </svg>
          14+ лет · Алматы
        </span>
        <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
        <Link
          href="/kontakty"
          className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
        >
          <MapPin className="h-3 w-3" />
          Шоурум · Выезд по Алматы за 1 час
        </Link>
      </div>

      {/* Trust-блок: 4 цифры */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { value: "14+", label: "лет на рынке", sub: "с 2012 года" },
          { value: "200+", label: "установок", sub: "дома и заведения" },
          { value: "60 000+", label: "песен в базе", sub: "KZ · RU · EN" },
          { value: "2 года", label: "гарантия", sub: "и сервис-центр" },
        ].map((s) => (
          <div key={s.value} className="flex flex-col items-center rounded-2xl border border-border bg-background py-5 text-center">
            <span className="font-display text-3xl font-bold text-primary">{s.value}</span>
            <span className="mt-1 text-sm font-medium">{s.label}</span>
            <span className="text-xs text-muted-foreground">{s.sub}</span>
          </div>
        ))}
      </section>

      {/* Оборудование — editorial 2×2 */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Популярное оборудование</h2>
          <Link href="/catalog" className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex">
            Весь каталог <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featuredProducts.map((p) => {
            const isHome = p.scenario === "dom";
            const photoBg = isHome ? "var(--warm-soft)" : "var(--night-bg)";
            const accentColor = isHome ? "var(--warm-accent)" : "var(--night-accent)";
            const badgeBg = isHome ? "var(--warm-soft)" : "rgba(45,212,191,0.15)";
            return (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-background"
              >
                {/* Фото-зона */}
                <div
                  className="relative h-56 overflow-hidden sm:h-64"
                  style={{ background: photoBg }}
                >
                  <ProductImage src={p.image} model={p.model} className="transition duration-500 group-hover:scale-[1.04]" />
                  {/* Сценарий-бейдж */}
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: badgeBg, color: accentColor }}
                  >
                    {p.scenarioLabel}
                  </span>
                </div>

                {/* Информационная полка */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {p.brand}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight">{p.model}</h3>

                  {/* Характеристики */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.areaMax && (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground">
                        до {p.areaMax} м²
                      </span>
                    )}
                    {p.songsCount && (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground">
                        {p.songsCount.toLocaleString("ru-RU")}+ песен
                      </span>
                    )}
                  </div>

                  {/* Цена + CTA */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-display text-xl font-bold" style={{ color: accentColor }}>
                      {priceFmt(p.price)}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all group-hover:gap-2.5"
                      style={{ background: accentColor, color: isHome ? "#fff" : "#04241e" }}
                    >
                      Подробнее <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex sm:hidden">
          <Link href="/catalog" className="flex items-center gap-1 text-sm font-medium text-primary">
            Весь каталог <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ClientLogos />

      {/* Nav sections — блоки перехода по разделам */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Разделы</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/brand/studio-evolution", title: "Studio Evolution", sub: "Evobox, Plus, Premium, Club, Pro2 — линейка для дома и клубов.", cta: "Смотреть модели" },
            { href: "/brand/ast", title: "AST (Art System)", sub: "HOME, Mini, AST-50/250/350 — от дома до клуба на 100 м².", cta: "Смотреть модели" },
            { href: "/gotovye-resheniya", title: "Готовые решения", sub: "Подобранные комплекты под сценарий — состав и цена сразу.", cta: "Выбрать" },
            { href: "/pod-klyuch", title: "Монтаж", sub: "Проект звука под помещение, монтаж, обучение персонала.", cta: "Подробнее" },
            { href: "/servis", title: "Сервис и гарантия", sub: "Настройка, ремонт, обновление репертуара.", cta: "Узнать" },
            { href: "/kontakty", title: "Контакты", sub: "Алматы, ул. Муканова 8 · WhatsApp, телефон, карта.", cta: "Написать" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
              <p className="font-medium group-hover:text-primary">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {item.cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Как мы работаем</h2>
        <p className="mt-1 text-sm text-muted-foreground">Пять шагов от заявки до живого звука.</p>
        <div className="relative mt-6 grid gap-4 sm:grid-cols-5">
          {[
            { step: "01", title: "Консультация", body: "Выясним задачу, площадь и бюджет — по WhatsApp или в шоуруме." },
            { step: "02", title: "Проект", body: "Подготовим смету и акустический расчёт под ваше помещение." },
            { step: "03", title: "Монтаж", body: "Приедем сами, установим и закрепим оборудование." },
            { step: "04", title: "Настройка", body: "Откалибруем звук, загрузим базу и проверим всё вместе с вами." },
            { step: "05", title: "Поддержка", body: "Гарантия, сервис-центр и обновление репертуара по договору." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col rounded-2xl bg-background p-5">
              <span className="font-display text-3xl font-bold text-primary/40">{s.step}</span>
              <p className="mt-2 font-medium">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Клиенты о нас</h2>
          <a
            href="https://www.google.com/maps/search/karaokeshop+алматы"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex"
          >
            Все отзывы на Google <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Дмитрий К.",
              context: "AST-250 · бар 60 м², Алматы",
              text: "Монтировали за 2 дня, звук настроили идеально под наш зал. Гости сразу оценили — заполняемость выросла.",
              stars: 5,
            },
            {
              name: "Аида Р.",
              context: "Evobox · гостиная частного дома, Астана",
              text: "Поставили в гостиной. База огромная, микрофоны отличные. Дети поют каждый вечер. Спасибо за подбор!",
              stars: 5,
            },
            {
              name: "Серик М.",
              context: "AST-250 · ресторан на 80 мест, Алматы",
              text: "Работает без нареканий уже полтора года. Репертуар обновляют по договору. Сервис отвечает быстро.",
              stars: 5,
            },
          ].map((r) => (
            <div key={r.name} className="flex flex-col rounded-2xl border border-border bg-background p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" className="h-4 w-4 fill-yellow-400" aria-hidden><path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.13L8 10.56l-3.708 2.02.708-4.13-3-2.923 4.146-.772z"/></svg>
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">«{r.text}»</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.context}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex sm:hidden">
          <a
            href="https://www.google.com/maps/search/karaokeshop+алматы"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            Все отзывы на Google <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Почему karaokeshop</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Подбор без ошибки", body: "Выясним задачу, площадь и бюджет — предложим то, что реально подходит." },
            { title: "Два бренда в одном месте", body: "AST и Studio Evolution — сравниваем честно и помогаем выбрать." },
            { title: "Под ключ", body: "Проект звука, монтаж, настройка, обучение — один договор." },
            { title: "Заказ через WhatsApp", body: "Напишите — ответим быстро, поможем выбрать и оформим заявку." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
