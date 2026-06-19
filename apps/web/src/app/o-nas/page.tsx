import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Music, GitCompare, Wrench } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { oNasMeta } from "@/lib/site";

export const metadata: Metadata = {
  title: oNasMeta.title,
  description: oNasMeta.description,
  alternates: { canonical: "/o-nas" },
};

const stats = [
  { icon: CalendarClock, value: "с 2012", label: "опыт на рынке" },
  { icon: GitCompare, value: "AST + Evolution", label: "оба бренда" },
  { icon: Music, value: "60 000+", label: "песен в базе" },
  { icon: Wrench, value: "под ключ", label: "монтаж и сервис" },
];

export default function Page() {
  return (
    <Container className="py-10">
      <div className="relative overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface p-4">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-2 font-display text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-7">
        <p>
          Мы оснащаем караоке в Казахстане с 2012 года — от домашних систем до полного оснащения баров,
          ресторанов и клубов под ключ. Работаем с двумя ведущими брендами, AST и Studio Evolution, поэтому
          можем честно сравнить варианты и подобрать решение под вашу задачу, а не продать что есть.
        </p>
        <p>
          Наша специализация — индивидуальный подход: считаем комплект под площадь и бюджет, проектируем звук
          под помещение, монтируем, настраиваем и обучаем персонал. Дальше — гарантия, сервис и регулярное
          обновление репертуара.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
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
