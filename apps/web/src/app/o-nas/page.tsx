import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Music, GitCompare, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { oNasMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: oNasMeta.title,
  description: oNasMeta.description,
  alternates: { canonical: "/o-nas" },
};

const stats = [
  { icon: CalendarClock, value: "с 2012", label: "на рынке Казахстана" },
  { icon: GitCompare, value: "200+", label: "оснащённых объектов" },
  { icon: Music, value: "60 000+", label: "песен в базе" },
  { icon: Wrench, value: "2 бренда", label: "AST + Studio Evolution" },
];

const team = [
  {
    name: "Алексей Н.",
    role: "Руководитель",
    bio: "10+ лет в звуковом оборудовании. Более 200 реализованных проектов по Казахстану.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Максим С.",
    role: "Инженер монтажа",
    bio: "Специализация — проект звука под помещение. 5 лет опыта, 80+ объектов.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Анна Т.",
    role: "Менеджер по работе с клиентами",
    bio: "Помогает подобрать систему и сопровождает от заявки до запуска.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&q=80&auto=format&fit=crop&crop=face",
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

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "О компании" }]} />
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1400&q=70&auto=format&fit=crop"
          alt="Атмосфера живого выступления"
          loading="lazy"
          className="h-56 w-full object-cover sm:h-72"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{oNasMeta.h1}</h1>
          <p className="mt-1 max-w-xl text-sm text-white/80">Эксперты по караоке в Алматы с 2012 года.</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface p-5">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* О компании */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-[15px] leading-7">
          <p>
            Мы оснащаем караоке в Казахстане с 2012 года — от домашних систем до полного оснащения баров,
            ресторанов и клубов под ключ. Работаем с двумя ведущими брендами, AST и Studio Evolution,
            поэтому можем честно сравнить варианты и подобрать решение под вашу задачу, а не продать что есть.
          </p>
          <p>
            Наша специализация — индивидуальный подход: считаем комплект под площадь и бюджет, проектируем
            звук под помещение, монтируем, настраиваем и обучаем персонал. Дальше — гарантия, сервис и
            регулярное обновление репертуара.
          </p>
        </div>
        <div className="space-y-2">
          {values.map((v) => (
            <p key={v} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {v}
            </p>
          ))}
        </div>
      </div>

      {/* Команда */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Команда</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-background p-5">
              <img
                src={m.photo}
                alt={m.name}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover"
              />
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
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
        <Link href="/kalkulyator">
          <Button>Собрать смету</Button>
        </Link>
        <Link href="/kontakty">
          <Button variant="ghost">Контакты</Button>
        </Link>
      </div>
    </Container>
  );
}
