import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Wrench, RefreshCw, Phone, ArrowRight, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HighlightLine } from "@/components/HighlightLine";
import { siteConfig } from "@/lib/site";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Сервис и гарантия: настройка и ремонт караоке",
  description: "Подключение, настройка под помещение, гарантия и ремонт караоке-систем AST и Studio Evolution в Алматы.",
  alternates: { canonical: "/servis" },
};

const services: { icon?: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wrench,
    title: "Подключение и настройка",
    body: "Монтаж оборудования, прокладка кабелей, настройка звука под акустику помещения. Обучение персонала работе с системой.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия",
    body: "Официальная гарантия на всё оборудование. При поломке делаем диагностику и ремонт в собственном сервис-центре. Замена на период ремонта по договорённости.",
  },
  {
    icon: RefreshCw,
    title: "Обновление репертуара",
    body: "Регулярное пополнение базы песен: KZ, RU, EN. Подключение новинок и обновлений ПО по договору технической поддержки.",
  },
  {
    icon: Phone,
    title: "Техническая поддержка",
    body: "Консультации по телефону и WhatsApp. Выезд специалиста при необходимости. Работаем в Алматы и области.",
  },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Нужна помощь по сервису и гарантии.")}`;

const faq = [
  { q: "Какая гарантия на оборудование?", a: "От 1 года на всё оборудование AST и Studio Evolution. При поломке делаем диагностику и ремонт в собственном сервис-центре в Алматы." },
  { q: "Что делать, если система перестала работать?", a: "Напишите в WhatsApp, выедем в тот же или на следующий день. Для коммерческих объектов приоритетный выезд." },
  { q: "Как часто обновляется репертуар?", a: "По договору технической поддержки ежемесячно. По запросу в любое время." },
  { q: "Есть ли замена оборудования на время ремонта?", a: "По договорённости предоставляем подменное оборудование для коммерческих объектов." },
  { q: "Работаете за пределами Алматы?", a: "Выезжаем по Алматинской области. Для отдалённых регионов удалённая поддержка и консультация по WhatsApp." },
];

const covered = [
  "Заводской брак и дефекты производства",
  "Отказ электронных компонентов при нормальной эксплуатации",
  "Неисправности ПО и прошивки: обновление бесплатно",
  "Выход из строя блока питания",
];

const notCovered = [
  "Механические повреждения (удары, падения)",
  "Попадание жидкости внутрь устройства",
  "Самостоятельный ремонт или вскрытие",
  "Нарушение условий эксплуатации",
];

export default function Page() {
  return (
    <Container className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Сервис и гарантия", path: "/servis" }])} />
      <Breadcrumb items={[{ label: "Сервис и гарантия" }]} />
      <h1 className="font-display text-2xl font-bold">
        <HighlightLine>Сервис</HighlightLine> и гарантия
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Полное сопровождение: от монтажа до регулярного обновления репертуара. Работаем в Алматы и области.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-border bg-background p-5">
            {Icon && (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
            )}
            <h2 className="mt-3 text-base font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-foreground/70">{body}</p>
          </div>
        ))}
      </div>

      {/* Что покрывает гарантия */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Что покрывает гарантия</h2>
        <p className="mt-1 text-sm text-muted-foreground">Срок гарантии от 1 года на всё оборудование.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> Покрывается гарантией
            </p>
            <ul className="space-y-2">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-danger">
              <XCircle className="h-4 w-4" /> Не покрывается
            </p>
            <ul className="space-y-2">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ аккордеон */}
      <section className="mt-12">
        <JsonLd data={faqJsonLd(faq)} />
        <h2 className="mb-4 font-display text-xl font-semibold">Частые вопросы</h2>
        <FaqAccordion items={faq} />
      </section>

      <div className="mt-10 rounded-xl border border-border bg-background p-6">
        <h2 className="font-medium">Нужна помощь или консультация?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Напишите в WhatsApp, ответим быстро и согласуем удобное время выезда.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <Button>Написать в WhatsApp</Button>
          </a>
          <Link href="/kontakty">
            <Button variant="ghost">
              Контакты <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ответим в течение часа · Без обязательств</p>
      </div>
    </Container>
  );
}
