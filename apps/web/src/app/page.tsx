import Link from "next/link";
import {
  Home,
  Building2,
  CreditCard,
  Calculator,
  Music,
  ArrowRight,
  ShieldCheck,
  CalendarClock,
  Wrench,
  Sparkles,
  UserCheck,
  GitCompare,
  Briefcase,
  BookOpen,
  Phone,
  Info,
} from "lucide-react";
import { Container } from "@/components/Container";
import { products, priceFmt, installmentMonthly } from "@/lib/site";

const cell = "rounded-3xl p-6 transition";
const featured = products.find((p) => p.slug === "evobox") ?? products[0];

export default function HomePage() {
  return (
    <Container className="py-6 sm:py-10">
      <div className="grid animate-fade-up grid-cols-1 gap-3 lg:grid-cols-6 lg:auto-rows-[minmax(150px,auto)]">
        {/* Hero — ночное настроение, эмоция */}
        <section
          className={`${cell} relative overflow-hidden lg:col-span-4 lg:row-span-2`}
          style={{
            backgroundColor: "var(--night-bg)",
            backgroundImage:
              "radial-gradient(110% 110% at 15% 0%, rgba(45,212,191,0.22), transparent 55%), radial-gradient(100% 120% at 100% 100%, rgba(249,115,22,0.16), transparent 55%)",
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "var(--night-soft)", color: "var(--night-accent)" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Эксперты по караоке с 2012 года
          </span>
          <h1
            className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--night-fg)" }}
          >
            Караоке, которое заводит зал
          </h1>
          <p className="mt-4 max-w-md text-base" style={{ color: "var(--night-muted)" }}>
            От тёплого вечера дома до клуба под ключ. AST и Studio Evolution — сравните оба бренда и подберём индивидуально, с монтажом и рассрочкой Kaspi.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/kalkulyator"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium"
              style={{ backgroundColor: "var(--night-accent)", color: "#04241e" }}
            >
              <Calculator className="h-4 w-4" /> Собрать смету
            </Link>
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium"
              style={{ border: "1px solid var(--night-soft)", color: "var(--night-fg)" }}
            >
              Каталог
            </Link>
          </div>
        </section>

        {/* Тёплый вход — для дома */}
        <Link
          href="/karaoke/dlya-doma"
          className={`${cell} group flex flex-col lg:col-span-2`}
          style={{ backgroundColor: "var(--warm-bg)", color: "var(--warm-fg)" }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--warm-soft)", color: "var(--warm-accent)" }}
          >
            <Home className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold">Караоке домой</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--warm-muted)" }}>
            Тёплые вечера с любимыми песнями.
          </p>
          <span
            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium"
            style={{ color: "var(--warm-accent)" }}
          >
            Выбрать систему <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Kaspi */}
        <div className={`${cell} flex flex-col justify-between bg-accent-soft lg:col-span-2`}>
          <CreditCard className="h-6 w-6 text-accent-fg" />
          <div>
            <p className="font-display text-2xl font-bold text-accent-fg">0-0-12</p>
            <p className="text-sm text-accent-fg">Рассрочка Kaspi без переплаты — одобрение за минуту.</p>
          </div>
        </div>

        {/* Деловой вход — для заведений */}
        <Link
          href="/pod-klyuch"
          className={`${cell} group relative flex flex-col overflow-hidden lg:col-span-3`}
          style={{
            backgroundColor: "var(--night-bg)",
            backgroundImage: "radial-gradient(90% 120% at 100% 0%, rgba(45,212,191,0.18), transparent 60%)",
            color: "var(--night-fg)",
          }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--night-soft)", color: "var(--night-accent)" }}
          >
            <Building2 className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold">Оснастить заведение</h2>
          <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--night-muted)" }}>
            Бар, ресторан, клуб — проект звука, монтаж и обучение под ключ.
          </p>
          <span
            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium"
            style={{ color: "var(--night-accent)" }}
          >
            Рассчитать под ключ <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Калькулятор */}
        <Link href="/kalkulyator" className={`${cell} group flex flex-col border border-border bg-background lg:col-span-3`}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Calculator className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold">Калькулятор сметы</h2>
          <p className="mt-1 text-sm text-muted-foreground">Комплект под вашу площадь или бюджет — за минуту.</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
            Открыть <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Песни */}
        <Link href="/pesni" className={`${cell} flex flex-col justify-between border border-border bg-background lg:col-span-2`}>
          <Music className="h-6 w-6 text-primary" />
          <div>
            <p className="font-display text-2xl font-bold">60 000+</p>
            <p className="text-sm text-muted-foreground">песен · KZ · RU · EN и обновление</p>
          </div>
        </Link>

        {/* Популярная система */}
        <Link
          href={`/product/${featured.slug}`}
          className={`${cell} group flex flex-col justify-between border border-border bg-gradient-to-br from-surface to-muted lg:col-span-2`}
        >
          <span className="text-xs text-muted-foreground">Хит · {featured.scenarioLabel}</span>
          <div>
            <p className="font-medium">{featured.model}</p>
            <p className="text-sm font-semibold">{priceFmt(featured.price)}</p>
            <p className="text-xs text-accent-fg">от {priceFmt(installmentMonthly(featured.price))}/мес</p>
          </div>
        </Link>

        {/* Доверие */}
        <div className={`${cell} flex flex-col justify-center gap-3 bg-surface lg:col-span-2`}>
          <p className="flex items-center gap-2 text-sm">
            <CalendarClock className="h-4 w-4 text-primary" /> С 2012 года
          </p>
          <p className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" /> Гарантия + сервис-центр
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-primary" /> Монтаж и настройка
          </p>
        </div>
      </div>

      {/* Nav sections — блоки перехода по разделам */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Разделы сайта</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/pod-klyuch" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Оснащение под ключ</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Бар, ресторан, клуб — проект звука, монтаж и обучение.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Подробнее <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/sravnenie" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <GitCompare className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">AST или Evolution</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Сравните оба бренда и выберите подходящий.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Сравнить <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/keysy" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Briefcase className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Кейсы</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Реализованные проекты — бары, клубы, рестораны.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Смотреть <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/blog" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Блог</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Советы по выбору, обзоры, гайды по оборудованию.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Читать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/servis" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Сервис и гарантия</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Настройка, ремонт и обновление репертуара.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Узнать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/o-nas" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Info className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">О компании</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Эксперты по караоке в Алматы с 2012 года.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">О нас <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/kontakty" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm sm:col-span-2 lg:col-span-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Контакты</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Алматы, ул. Муканова 8 · WhatsApp, телефон, карта.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Написать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Почему karaokeshop</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-background p-5">
            <UserCheck className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Индивидуальный подход</p>
            <p className="mt-1 text-sm text-muted-foreground">Подберём систему и комплект под вашу задачу, площадь и бюджет.</p>
          </div>
          <Link href="/sravnenie" className="group rounded-2xl border border-border bg-background p-5 transition hover:border-primary">
            <GitCompare className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">AST и Evolution в одном месте</p>
            <p className="mt-1 text-sm text-muted-foreground">Сравните оба бренда и купите там же — без переплат и беготни.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Сравнить <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <div className="rounded-2xl border border-border bg-background p-5">
            <Wrench className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Под ключ</p>
            <p className="mt-1 text-sm text-muted-foreground">Проект звука под помещение, монтаж, настройка и обучение.</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <CreditCard className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Рассрочка Kaspi</p>
            <p className="mt-1 text-sm text-muted-foreground">0-0-12 без переплаты, одобрение в приложении за минуту.</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
