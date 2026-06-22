import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Wrench, RefreshCw, Phone, ArrowRight } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Сервис и гарантия — настройка и ремонт караоке",
  description: "Подключение, настройка под помещение, гарантия и ремонт караоке-систем AST и Studio Evolution в Алматы.",
  alternates: { canonical: "/servis" },
};

const services = [
  {
    icon: Wrench,
    title: "Подключение и настройка",
    body: "Монтаж оборудования, прокладка кабелей, настройка звука под акустику помещения. Обучение персонала работе с системой.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия",
    body: "Официальная гарантия на всё оборудование. При поломке — диагностика и ремонт в собственном сервис-центре. Замена на период ремонта по договорённости.",
  },
  {
    icon: RefreshCw,
    title: "Обновление репертуара",
    body: "Регулярное пополнение базы песен — KZ, RU, EN. Подключение новинок и обновлений ПО по договору технической поддержки.",
  },
  {
    icon: Phone,
    title: "Техническая поддержка",
    body: "Консультации по телефону и WhatsApp. Выезд специалиста при необходимости. Работаем в Алматы и области.",
  },
];

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Нужна помощь по сервису и гарантии.")}`;

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Сервис и гарантия" }]} />
      <h1 className="font-display text-2xl font-bold">Сервис и гарантия</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Полное сопровождение — от монтажа до регулярного обновления репертуара. Работаем в Алматы и области.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-medium">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-surface p-6">
        <h2 className="font-medium">Нужна помощь или консультация?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Напишите в WhatsApp — ответим быстро и согласуем удобное время выезда.
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
      </div>
    </Container>
  );
}
