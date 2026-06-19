import Link from "next/link";
import { Home, Building2, ArrowRight } from "lucide-react";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-12">
        <h1 className="text-3xl font-medium tracking-tight">Караоке под ключ в Казахстане</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          От системы домой до оснащения клуба. Бренды AST и Studio Evolution · эксперты с 2012 года.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/karaoke/dlya-doma"
            className="group rounded-xl border border-border bg-background p-5 transition hover:border-primary"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Home className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-medium">Караоке домой</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Готовые домашние системы. Фильтр по площади и бюджету, рассрочка Kaspi, доставка.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Выбрать систему <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/pod-klyuch"
            className="group rounded-xl border-2 border-primary bg-background p-5"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Building2 className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-medium">Оснастить заведение</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Проект звука под помещение, монтаж, настройка, обучение. Расчёт по площади.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Рассчитать под ключ <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
