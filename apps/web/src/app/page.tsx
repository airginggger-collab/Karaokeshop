import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { QuizWidget } from "@/components/QuizWidget";
import { HighlightLine } from "@/components/HighlightLine";
import { SectionHeader, MobileActionLink } from "@/components/SectionHeader";
import { SectionHint } from "@/components/SectionHint";
import { CtaSection } from "@/components/CtaSection";
import { ClientLogos } from "@/components/ClientLogos";
import { CountUp } from "@/components/CountUp";
import { bundlePriceFrom, kitParts, priceFmt, products, siteConfig } from "@/lib/site";
import { CALC_SCENARIOS } from "@/lib/calculator";

/* Шрифтовая шкала главной (упрощена по решению владельца 2026-09-10: было
 * восемь кеглей от 12 до 60px, иерархия читалась как шум). Пять ступеней с
 * заметным шагом, новых размеров тут не вводить:
 *   h1                36 / 48 / 60px  text-4xl sm:text-5xl lg:text-6xl
 *   заголовок секции  24 / 30px       font-display text-2xl font-bold sm:text-3xl (и CountUp)
 *   подзаголовок      20px            font-display text-xl font-bold (цена, h3) + лид hero
 *   заголовок карточки 16px           text-base font-semibold (шаги, «почему»)
 *   тело, подписи, капс 14px          text-sm (капс + uppercase tracking-widest)
 * 12px (text-xs) в прозе главной больше нет: подпись и тело это один кегль,
 * разницу несут цвет, вес и капс, а не третий размер. */
const SHOW_UNVERIFIED_SOCIAL_PROOF = false; // включить после реальных отзывов/лого от заказчика

const featuredProducts = products.filter((p) => p.type === "sistema").slice(0, 4);

/** Модель для второй кнопки hero. Brand Board (стр. 13) требует экспозицию
 * Studio Evolution ≈ 60% против AST ≈ 40%, поэтому это флагман Evolution.
 * Берём из каталога, а не хардкодим: пропадёт товар, упадёт сборка, а не
 * молча сломается ссылка. */
const heroProduct =
  products.find((p) => p.slug === "evobox") ??
  products.filter((p) => p.type === "sistema")[0];

/* Единый паттерн заголовка секции (без нумерации 01-04). Пояснение секции
 * идёт не строкой под заголовком, а тултипом у иконки (решение владельца
 * 2026-09-10). */
function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="relative flex items-center gap-1">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{children}</h2>
      {hint && <SectionHint text={hint} />}
    </div>
  );
}

/* Соцдоказательство (отзывы + лого клиентов) скрыто до реальных данных
   от заказчика — тексты ниже не верифицированы. Не удалять: включается
   флагом SHOW_UNVERIFIED_SOCIAL_PROOF после замены на настоящие. */
function SocialProof() {
  if (!SHOW_UNVERIFIED_SOCIAL_PROOF) return null;
  return (
    <>
      <ClientLogos />

      {/* Отзывы */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Клиенты о нас</h2>
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
            <div key={r.name} className="flex flex-col rounded-xl border border-border bg-background p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" className="h-4 w-4 fill-primary text-primary" aria-hidden><path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.13L8 10.56l-3.708 2.02.708-4.13-3-2.923 4.146-.772z"/></svg>
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">«{r.text}»</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.context}</p>
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
    </>
  );
}

export default function HomePage() {
  return (
    <Container className="py-3 sm:py-5">
      {/* Hero — первый экран по Brand Board v2 (стр. 2, 11, 16):
          0–0,5 с видно сцену с микрофоном, 0,5–1,2 с читается категория и бренды,
          1,2–2 с виден маршрут (цена «от» + одна главная кнопка).
          Полный квиз уехал ниже, в hero остаётся выбор сценария одним кликом.
          Фото людей вместо фото техники: решение владельца 2026-09-10. */}
      <section className="animate-fade-up pt-0 lg:pt-2">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              <HighlightLine>Караоке</HighlightLine> для дома
              <br className="hidden sm:block" /> и для бизнеса
            </h1>
            <p className="mt-3 max-w-xl text-xl text-muted-foreground">
              <strong className="font-semibold text-foreground">Studio Evolution и AST.</strong>{" "}
              Подберём систему под помещение, установим и настроим по Казахстану.
            </p>

            {/* Ценовой якорь. Цифра считается из каталога комплектов (ловушка 12).
                Заголовок и подзаголовок раздельно (решение владельца 2026-09-10):
                в одну строку цифра терялась в примечании. */}
            <div className="mt-4">
              <p className="font-display text-xl font-bold">
                Комплект под ключ от {priceFmt(bundlePriceFrom())}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Состав и точную смету считаем под ваше помещение.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/kalkulyator"
                className="inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-cta-fg transition-all hover:gap-3"
              >
                Подобрать систему <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/product/${heroProduct.slug}`}
                className="inline-flex items-center gap-1 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:border-primary"
              >
                Смотреть {heroProduct.model.replace(/^Evolution\s+/i, "")}
              </Link>
            </div>

            {/* Image-band для планшета (768–1023 px): на десктопе фото уезжает
                в правую колонку, а на телефоне его нет вовсе — решение владельца
                2026-09-10: в узком первом экране кадр отжимал заголовок, цену и
                кнопку ниже сгиба. В кадре люди за микрофоном, а не коробка. */}
            <div aria-hidden="true" className="mt-6 hidden overflow-hidden rounded-xl border border-border md:block lg:hidden">
              {/* Широкий кадр, а не 4:3: на 768 px квадратное фото давало 576 px
                  высоты и выпихивало блок сценария за сгиб. */}
              <div className="aspect-[21/9]">
                <img
                  src="/scenariy/poyushchie.webp"
                  alt=""
                  className="h-full w-full object-cover object-[center_25%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Сцена в кадре: эмоция вместо коробки (решение владельца 2026-09-10).
              Фото декоративное, поэтому aria-hidden + пустой alt: смысл несут
              заголовок и цена слева, дубль в скринридере лишний. */}
          <div
            aria-hidden="true"
            className="relative hidden min-h-[320px] overflow-hidden rounded-xl border border-border lg:col-span-5 lg:block"
          >
            <img
              src="/scenariy/poyushchie.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Мини-подбор: один вопрос вместо трёх, дальше калькулятор.
          Вынесен из hero отдельным блоком (решение владельца 2026-09-10):
          в первом экране остаётся один маршрут (кнопка), выбор сценария
          не спорит с ней за внимание. */}
      <section className="mt-6 rounded-xl border border-border bg-background p-5">
        <div className="relative flex items-center gap-1">
          <p className="font-display text-xl font-bold">Где будет стоять система?</p>
          <SectionHint text="Выберите место, калькулятор сразу покажет состав и смету." />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CALC_SCENARIOS.map((s) => (
            <Link
              key={s.id}
              href={`/kalkulyator?scenario=${s.id}`}
              className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Что входит в «под ключ»: объясняем цену через состав (Visual Brief, стр. 13).
          Раньше сразу после hero шли абстрактные счётчики, категорию они не объясняли. */}
      <section className="mt-8">
        {/* Полоски-разделители сняты по решению владельца 2026-09-10, подпись
            переведена с muted-fg на foreground: mелкий 12px капс на градиенте
            читался тускло, хотя формально держал AA. */}
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
          Караоке под ключ это система, а не коробка
        </p>
        {/* Слоты кликабельные: каждый ведёт в свой раздел (решение владельца
            2026-09-10). Раньше это была мёртвая витрина: человек читал состав
            и не мог ткнуть в интересную позицию. */}
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {kitParts.map((x) => (
            <li key={x.label}>
              <Link
                href={x.href}
                className="flex min-h-11 items-center rounded-xl border border-border bg-background px-3 py-2.5 text-sm transition hover:border-primary"
              >
                {x.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Доверие цифрами — CountUp при появлении в вьюпорте */}
      <section className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[
          { value: "14+", label: "лет на рынке" },
          { value: "200+", label: "объектов" },
          { value: "60 000+", label: "песен" },
          { value: "2 года", label: "гарантия" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col">
            <CountUp value={s.value} className="font-display text-2xl font-bold text-primary sm:text-3xl" />
            <span className="mt-1 text-sm text-foreground">{s.label}</span>
          </div>
        ))}
      </section>

      {/* 01 — Как мы работаем (услуга под ключ) */}
      <section className="mt-10">
        <SectionTitle hint="Пять шагов от заявки до живого звука.">
          Как мы <HighlightLine>работаем</HighlightLine>
        </SectionTitle>
        <div className="relative mt-4 grid gap-4 sm:grid-cols-5">
          {[
            { title: "Консультация", body: "Выясним задачу, площадь и бюджет по WhatsApp или в шоуруме." },
            { title: "Проект", body: "Подготовим смету и акустический расчёт под ваше помещение." },
            { title: "Монтаж", body: "Приедем сами, установим и закрепим оборудование." },
            { title: "Настройка", body: "Откалибруем звук, загрузим базу и проверим всё вместе с вами." },
            { title: "Поддержка", body: "Гарантия, сервис-центр и обновление репертуара по договору." },
          ].map((s) => (
            <div key={s.title} className="flex flex-col rounded-xl border border-border bg-background p-5">
              <p className="text-base font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Дом и бизнес — сценарные входы */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { href: "/dlya-doma", image: "/scenariy/dom.webp", title: "Караоке для дома", sub: "Гостиная, баня, гостевой дом. Тёплые вечера с песнями.", cta: "Выбрать домой" },
          { href: "/dlya-biznesa", image: "/scenariy/biznes.webp", title: "Караоке для бизнеса", sub: "Кафе, бар, ресторан, клуб. Проект звука и монтаж под ключ.", cta: "Оснастить заведение" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background">
            <div className="h-40 overflow-hidden sm:h-48">
              <img src={c.image} alt={c.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {c.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* 02 — На чём собираем (доказательство) */}
      <section className="mt-10">
        <SectionHeader
          size="lg"
          title="На чём собираем"
          action={{ href: "/catalog", label: "Весь каталог" }}
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} p={p} size="lg" />
          ))}
        </div>

        <MobileActionLink href="/catalog" label="Весь каталог" />
      </section>

      {/* 03 — Доверие: почему karaokeshop + полоса брендов */}
      <section className="mt-10">
        <SectionTitle>Почему karaokeshop</SectionTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Подбор без ошибки", body: "Выясним задачу, площадь и бюджет. Предложим то, что реально подходит." },
            { title: "Два бренда в одном месте", body: "AST и Studio Evolution. Сравниваем честно и помогаем выбрать." },
            { title: "Под ключ", body: "Проект звука, монтаж, настройка, обучение: один договор." },
            { title: "Заказ через WhatsApp", body: "Напишите, ответим быстро, поможем выбрать и оформим заявку." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-background p-5">
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Полоса брендов */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-background px-6 py-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">
            Работаем с брендами
          </span>
          <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
          <Link
            href="/brand/ast"
            className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 transition hover:border-primary"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-soft text-[10px] font-bold text-primary">
              A
            </span>
            <span className="text-sm font-semibold">AST</span>
            <span className="text-sm text-muted-foreground">Art System</span>
          </Link>
          <Link
            href="/brand/studio-evolution"
            className="group flex items-center gap-2 rounded-xl border border-border px-4 py-2 transition hover:border-primary"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-soft text-[10px] font-bold text-primary">
              SE
            </span>
            <span className="text-sm font-semibold">Studio Evolution</span>
            <span className="text-sm text-muted-foreground">Evobox</span>
          </Link>
          <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-primary" aria-hidden>
              <path d="M8 0l1.6 4.9H15l-4.4 3.2 1.7 5L8 10l-4.3 3.1 1.7-5L1 4.9h5.4z"/>
            </svg>
            14+ лет · Алматы
          </span>
          <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
          <Link
            href="/kontakty"
            className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            <MapPin className="h-3 w-3" />
            Шоурум · Выезд по Алматы за 1 час
          </Link>
        </div>

        <SocialProof />
      </section>

      {/* 04 — Разделы: блоки перехода */}
      <section className="mt-10">
        <SectionTitle>Разделы</SectionTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/brand/studio-evolution", title: "Studio Evolution", sub: "Evobox, Plus, Premium, Club, Pro2: линейка для дома и клубов.", cta: "Смотреть модели" },
            { href: "/brand/ast", title: "AST (Art System)", sub: "HOME, Mini, AST-50/250/350: от дома до клуба на 100 м².", cta: "Смотреть модели" },
            { href: "/gotovye-resheniya", title: "Готовые решения", sub: "Подобранные комплекты под сценарий: состав и цена сразу.", cta: "Выбрать" },
            { href: "/pod-klyuch", title: "Монтаж", sub: "Проект звука под помещение, монтаж, обучение персонала.", cta: "Подробнее" },
            { href: "/servis", title: "Сервис и гарантия", sub: "Настройка, ремонт, обновление репертуара.", cta: "Узнать" },
            { href: "/kontakty", title: "Контакты", sub: `${siteConfig.address} · WhatsApp, телефон, карта.`, cta: "Написать" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group flex flex-col rounded-xl border border-border bg-background p-5 transition hover:border-primary">
              <p className="font-medium group-hover:text-primary">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {item.cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Полная версия квиза. В hero она занимала весь первый экран и по весу
          спорила с заголовком; Brand Board (стр. 10) ставит её одиннадцатой
          секцией, ближе к заявке, когда сомнения уже сняты. */}
      <section className="mt-10">
        <SectionTitle hint="Три вопроса: место, площадь и бюджет. Покажем состав комплекта и ориентир по цене.">
          Подберём <HighlightLine>за минуту</HighlightLine>
        </SectionTitle>
        <div className="mt-4">
          <QuizWidget />
        </div>
      </section>

      {/* Финальный CTA */}
      <CtaSection
        className="mt-10"
        padded
        title={<>Подберём <HighlightLine>за минуту</HighlightLine>, бесплатно</>}
        text="Пройдите квиз выше или напишите нам. Ответим и предложим то, что реально подходит под вашу задачу и бюджет."
        ticker="14 лет на рынке · 200+ объектов · 60 000+ песен · гарантия 2 года"
        waText=""
        secondary={{ href: "/catalog", label: "Каталог" }}
      />
    </Container>
  );
}
