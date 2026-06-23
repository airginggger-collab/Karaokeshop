import Link from "next/link";
import { ArrowRight, Music } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
        <Music className="h-8 w-8 text-primary" />
      </div>
      <p className="mt-4 font-display text-6xl font-bold text-primary">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Страница не найдена</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg"
        >
          На главную
        </Link>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:border-primary"
        >
          Каталог <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
