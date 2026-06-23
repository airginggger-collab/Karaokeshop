import Link from "next/link";
import { Home, Building2, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary-soft to-background">
      <Container className="py-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Эксперты по караоке с 2012 года
        </span>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Караоке под ключ в Казахстане
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          От системы домой до оснащения клуба. Бренды AST и Studio Evolution, монтаж и настройка под ключ.
        </p>

        <div className="animate-fade-up mt-8 grid gap-4 sm:grid-cols-2" style={{ animationDelay: "0.08s" }}>
          <Link
            href="/karaoke/dlya-doma"
            className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:shadow-md"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Home className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-medium">Караоке домой</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Готовые домашние системы. Подбор по площади и бюджету, доставка.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Выбрать систему <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/pod-klyuch"
            className="group rounded-2xl border-2 border-primary bg-background p-6 shadow-sm transition hover:shadow-md"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-fg">
              <Building2 className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-medium">Оснастить заведение</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Проект звука под помещение, монтаж, настройка, обучение. Расчёт по площади зала.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Рассчитать под ключ <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
