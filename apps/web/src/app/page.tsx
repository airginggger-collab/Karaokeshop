import Link from "next/link";
import {
  Home,
  Building2,
  Calculator,
  Music,
  ArrowRight,
  ShieldCheck,
  CalendarClock,
  Wrench,
  Sparkles,
  UserCheck,
  GitCompare,
  Phone,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Container } from "@/components/Container";
import { HeroWave } from "@/components/HeroWave";
import { products, priceFmt, installmentMonthly } from "@/lib/site";

const cell = "rounded-3xl p-6 transition";
const featured = products.find((p) => p.slug === "evobox") ?? products[0];
const featuredProducts = products.filter((p) => p.featured && p.type === "sistema").slice(0, 4);

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
            Караоке без ошибки в выборе
          </h1>
          <p className="mt-4 max-w-md text-base" style={{ color: "var(--night-muted)" }}>
            AST и Studio Evolution в одном месте. Подберём под площадь, бюджет и задачу — дом, кафе или клуб. Монтаж и настройка включены.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dlya-doma"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium"
              style={{ backgroundColor: "var(--night-accent)", color: "#04241e" }}
            >
              <Home className="h-4 w-4" /> Выбрать домой
            </Link>
            <Link
              href="/dlya-biznesa"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium"
              style={{ border: "1px solid var(--night-soft)", color: "var(--night-fg)" }}
            >
              <Building2 className="h-4 w-4" /> Для заведения
            </Link>
          </div>

          <HeroWave />
        </section>

        {/* Тёплый вход — для дома */}
        <Link
          href="/dlya-doma"
          className={`${cell} group flex flex-col lg:col-span-2`}
          style={{ backgroundColor: "var(--warm-bg)", color: "var(--warm-fg)" }}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--warm-soft)", color: "var(--warm-accent)" }}
          >
            <Home className="h-5 w-5" />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold">Для дома</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--warm-muted)" }}>
            Гостиная, баня, гостевой дом. Тёплые вечера с любимыми песнями.
          </p>
          <span
            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium"
            style={{ color: "var(--warm-accent)" }}
          >
            Выбрать систему <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Деловой вход — для заведений */}
        <Link
          href="/dlya-biznesa"
          className={`${cell} group relative flex flex-col overflow-hidden lg:col-span-2`}
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
          <h2 className="mt-3 font-display text-xl font-semibold">Для бизнеса</h2>
          <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--night-muted)" }}>
            Кафе, ресторан, VIP-зал, клуб. Проект звука, монтаж и обучение под ключ.
          </p>
          <span
            className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium"
            style={{ color: "var(--night-accent)" }}
          >
            Оснастить заведение <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Калькулятор */}
        <Link href="/kalkulyator" className={`${cell} group flex flex-col border border-border bg-background lg:col-span-2`}>
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

      {/* Ценовые уровни */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">С чего начать</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ориентиры по бюджету — точная смета считается под ваш проект.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link
            href="/dlya-doma"
            className="group rounded-2xl border border-border bg-background p-6 transition hover:border-primary hover:shadow-sm"
            style={{ borderTopColor: "var(--warm-accent)", borderTopWidth: 3 }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Для дома</p>
            <p className="mt-2 font-display text-2xl font-bold">от 749 000 ₸</p>
            <p className="mt-1 text-sm text-muted-foreground">Гостиная, баня, гостевой дом. AST Mini или Evobox + акустика.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Подобрать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/dlya-biznesa"
            className="group rounded-2xl border border-border bg-background p-6 transition hover:border-primary hover:shadow-sm"
            style={{ borderTopColor: "var(--night-accent)", borderTopWidth: 3 }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Кафе / ресторан</p>
            <p className="mt-2 font-display text-2xl font-bold">от 1 400 000 ₸</p>
            <p className="mt-1 text-sm text-muted-foreground">AST-250 или Evobox Plus. Зал до 80 м², монтаж включён.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Рассчитать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/dlya-biznesa"
            className="group relative overflow-hidden rounded-2xl border border-border p-6 transition hover:border-primary hover:shadow-sm"
            style={{
              background: "var(--night-bg)",
              color: "var(--night-fg)",
              borderTopColor: "var(--night-accent)",
              borderTopWidth: 3,
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--night-muted)" }}>
              Клуб / VIP-зал
            </p>
            <p className="mt-2 font-display text-2xl font-bold">от 2 500 000 ₸</p>
            <p className="mt-1 text-sm" style={{ color: "var(--night-muted)" }}>
              AST-350 или Evolution Pro2. Акустика RCF, свет, проект звука.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: "var(--night-accent)" }}>
              Обсудить проект <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Большие карточки оборудования */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Популярное оборудование</h2>
          <Link href="/catalog" className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex">
            Весь каталог <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {featuredProducts.map((p) => {
            const isHome = p.scenario === "dom";
            return (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl lg:min-h-[440px]"
              >
                {/* Фото */}
                <div className="absolute inset-0">
                  <img
                    src={p.image}
                    alt={p.model}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Градиент снизу */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isHome
                        ? "linear-gradient(to top, var(--warm-bg) 30%, rgba(0,0,0,0) 70%)"
                        : "linear-gradient(to top, #0d1117 35%, rgba(0,0,0,0.1) 70%)",
                    }}
                  />
                  {/* Лёгкий виньет сверху */}
                  <div
                    className="absolute inset-x-0 top-0 h-24"
                    style={{
                      background: isHome
                        ? "linear-gradient(to bottom, rgba(255,245,235,0.6), transparent)"
                        : "linear-gradient(to bottom, rgba(13,17,23,0.5), transparent)",
                    }}
                  />
                </div>

                {/* Бейдж сверху */}
                <div className="relative z-10 p-5">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={
                      isHome
                        ? { backgroundColor: "var(--warm-soft)", color: "var(--warm-accent)" }
                        : { backgroundColor: "rgba(45,212,191,0.15)", color: "var(--night-accent)" }
                    }
                  >
                    {p.scenarioLabel}
                  </span>
                </div>

                {/* Контент снизу */}
                <div className="relative z-10 mt-auto p-5">
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: isHome ? "var(--warm-muted)" : "var(--night-muted)" }}
                  >
                    {p.brand}
                  </p>
                  <h3
                    className="mt-1 font-display text-2xl font-bold"
                    style={{ color: isHome ? "var(--warm-fg)" : "var(--night-fg)" }}
                  >
                    {p.model}
                  </h3>
                  {p.areaMax && (
                    <p className="mt-0.5 text-sm" style={{ color: isHome ? "var(--warm-muted)" : "var(--night-muted)" }}>
                      до {p.areaMax} м² · {p.songsCount?.toLocaleString("ru-RU")}+ песен
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="font-display text-xl font-bold"
                      style={{ color: isHome ? "var(--warm-accent)" : "var(--night-accent)" }}
                    >
                      {priceFmt(p.price)}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition group-hover:gap-2"
                      style={
                        isHome
                          ? { backgroundColor: "var(--warm-accent)", color: "#fff" }
                          : { backgroundColor: "var(--night-accent)", color: "#04241e" }
                      }
                    >
                      Подробнее <ArrowRight className="h-4 w-4" />
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

      {/* Nav sections — блоки перехода по разделам */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Разделы</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/brand/studio-evolution" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Studio Evolution</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Evobox, Plus, Premium, Club, Pro2 — линейка для дома и клубов.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Смотреть модели <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/brand/ast" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <GitCompare className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">AST (Art System)</p>
              <p className="mt-0.5 text-sm text-muted-foreground">HOME, Mini, AST-50/250/350 — от дома до клуба на 100 м².</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Смотреть модели <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/gotovye-resheniya" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Готовые решения</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Подобранные комплекты под сценарий — состав и цена сразу.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Выбрать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/pod-klyuch" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Монтаж</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Проект звука под помещение, монтаж, обучение персонала.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Подробнее <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/servis" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium group-hover:text-primary">Сервис и гарантия</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Настройка, ремонт, обновление репертуара.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">Узнать <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <Link href="/kontakty" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:border-primary hover:shadow-sm">
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
            <div key={s.step} className="flex flex-col rounded-2xl bg-surface p-5">
              <span className="font-display text-3xl font-bold text-primary/20">{s.step}</span>
              <p className="mt-2 font-medium">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Отзывы */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Клиенты о нас</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Дмитрий К.",
              role: "Владелец бара, Алматы",
              photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop&crop=face",
              text: "Монтировали за 2 дня, звук настроили идеально под наш зал. Гости сразу оценили — заполняемость выросла.",
            },
            {
              name: "Аида Р.",
              role: "Частный дом, Астана",
              photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&auto=format&fit=crop&crop=face",
              text: "Поставили в гостиной. База огромная, микрофоны отличные. Дети поют каждый вечер. Спасибо за подбор!",
            },
            {
              name: "Серик М.",
              role: "Ресторан, Алматы",
              photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&auto=format&fit=crop&crop=face",
              text: "Брали AST-250. Работает без нареканий уже полтора года. Репертуар обновляют регулярно. Рекомендую.",
            },
          ].map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">«{r.text}»</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={r.photo} alt={r.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Почему karaokeshop</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-background p-5">
            <UserCheck className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Подбор без ошибки</p>
            <p className="mt-1 text-sm text-muted-foreground">Выясним задачу, площадь и бюджет — предложим то, что реально подходит.</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <GitCompare className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Два бренда в одном месте</p>
            <p className="mt-1 text-sm text-muted-foreground">AST и Studio Evolution — сравниваем честно и помогаем выбрать.</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Под ключ</p>
            <p className="mt-1 text-sm text-muted-foreground">Проект звука, монтаж, настройка, обучение — один договор.</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <Phone className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Заказ через WhatsApp</p>
            <p className="mt-1 text-sm text-muted-foreground">Напишите — ответим быстро, поможем выбрать и оформим заявку.</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
