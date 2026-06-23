import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { blogMeta, blogPosts, storyPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: blogMeta.title,
  description: blogMeta.description,
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: blogMeta.h1 }]} />

      <h1 className="mt-4 text-2xl font-medium">{blogMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{blogMeta.description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:shadow-md"
          >
            <h2 className="font-medium">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Читать <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Лента историй */}
      <div className="mt-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Истории установок</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Реальный опыт клиентов — от домашней гостиной до клуба на 200 человек
            </p>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">
            {storyPosts.length} историй
          </span>
        </div>

        <div className="mt-5 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {storyPosts.map((s) => (
            <div
              key={s.id}
              className="mb-4 break-inside-avoid rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              {/* Шапка */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft">
                  <span className="font-display text-xs font-bold text-primary">{s.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{s.author}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.venue} · {s.date}</p>
                </div>
              </div>

              {/* Текст */}
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.text}</p>

              {/* Теги */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Футер */}
              <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3.5 w-3.5 text-primary/70" />
                  {s.likes}
                </span>
                {s.system && (
                  <Link
                    href={`/catalog`}
                    className="ml-auto text-xs font-medium text-primary hover:underline"
                  >
                    {s.system} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
