import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { oNasMeta, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: oNasMeta.title,
  description: oNasMeta.description,
  alternates: { canonical: "/o-nas" },
};

const stats = [
  { value: "14+", label: "лет на рынке" },
  { value: "200+", label: "оснащённых объектов" },
  { value: "60 000+", label: "песен в базе" },
  { value: "2 года", label: "гарантия на оборудование" },
];

const team = [
  {
    initials: "АН",
    name: "Алексей Н.",
    role: "Руководитель",
    bio: "10+ лет в звуковом оборудовании. Более 200 реализованных проектов по Казахстану.",
  },
  {
    initials: "МС",
    name: "Максим С.",
    role: "Инженер монтажа",
    bio: "Специализация — проект звука под помещение. 5 лет опыта, 80+ объектов.",
  },
  {
    initials: "АТ",
    name: "Анна Т.",
    role: "Менеджер по работе с клиентами",
    bio: "Помогает подобрать систему и сопровождает от заявки до запуска.",
  },
];

const timeline = [
  { year: "2012", event: "Основание компании, первые установки в Алматы" },
  { year: "2015", event: "Официальный дилер Studio Evolution" },
  { year: "2018", event: "Открытие собственного сервис-центра" },
  { year: "2022", event: "100+ оснащённых заведений по Казахстану" },
  { year: "2024", event: "Партнёрство с брендом AST" },
  { year: "2026", event: "200+ объектов, выход в регионы" },
];

const values = [
  "Честное сравнение двух брендов — без давления",
  "Проект звука под конкретное помещение",
  "Монтаж без субподрядчиков — своей командой",
  "Гарантия и сервис после установки",
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу узнать подробнее о вашей компании.")}`;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "О компании", path: "/o-nas" }])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "О компании" }]} />

        {/* Герой */}
        <section className="mt-4 rounded-xl border border-border bg-background p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">О компании</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{oNasMeta.h1}</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Оснащаем заведения и дома под ключ с 2012 года. Официальные дилеры AST и Studio Evolution в Казахстане.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
          >
            Написать в WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        {/* 4 числа */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-background p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* О компании */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-[15px] leading-7">
            <p>
              Мы оснащаем караоке в Казахстане с 2012 года — от домашних систем до полного оснащения баров,
              ресторанов и клубов под ключ. Работаем с двумя ведущими брендами, AST и Studio Evolution,
              поэтому можем честно сравнить варианты и подобрать решение под вашу задачу.
            </p>
            <p>
              Считаем комплект под площадь и бюджет, проектируем звук под помещение, монтируем,
              настраиваем и обучаем персонал. Дальше — гарантия, сервис и регулярное обновление
              репертуара.
            </p>
          </div>
          <ul className="space-y-2">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Команда */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Команда</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-background p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
                  <span className="font-display text-sm font-bold text-primary">{m.initials}</span>
                </div>
                <p className="mt-3 font-medium">{m.name}</p>
                <p className="text-xs text-primary">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* История */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">История</h2>
          <div className="mt-5 space-y-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-fg">
                    {t.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6 pt-1">
                  <p className="text-xs font-medium text-primary">{t.year}</p>
                  <p className="mt-0.5 text-sm">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/kalkulyator"
            className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg"
          >
            Собрать смету
          </Link>
          <Link
            href="/kontakty"
            className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary"
          >
            Контакты <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </>
  );
}
