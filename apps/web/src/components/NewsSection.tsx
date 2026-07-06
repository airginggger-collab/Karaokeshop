import Link from "next/link";
import { ExternalLink, Rss } from "lucide-react";
import { fetchNews, NEWS_FALLBACK } from "@/lib/news";

function formatDate(raw: string) {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return raw;
  }
}

export async function NewsSection() {
  let items = await fetchNews(6);
  if (items.length === 0) items = NEWS_FALLBACK;

  const isExternal = (url: string) => url.startsWith("http");

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Новости о карaоке и музыке</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Обновляется автоматически каждый день</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          <Rss className="h-3 w-3 text-primary" /> RSS
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n, i) => {
          const ext = isExternal(n.url);
          const Wrapper = ext ? "a" : Link;
          const wrapperProps = ext
            ? { href: n.url, target: "_blank", rel: "noopener noreferrer" }
            : { href: n.url };
          return (
            <Wrapper
              key={i}
              {...(wrapperProps as any)}
              className="group flex flex-col rounded-xl border border-border bg-background p-4 transition hover:border-primary"
            >
              <p className="flex-1 text-sm font-medium leading-snug group-hover:text-primary">
                {n.title}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{n.source}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {n.pubDate && <span>{formatDate(n.pubDate)}</span>}
                  {ext && <ExternalLink className="h-3 w-3" />}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
