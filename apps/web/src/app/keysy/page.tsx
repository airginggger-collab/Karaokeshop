import type { Metadata } from "next";
import { Building2, MapPin, Quote } from "lucide-react";
import { Badge } from "@kk/ui";
import { Container } from "@/components/Container";
import { keysyMeta, cases } from "@/lib/site";

export const metadata: Metadata = {
  title: keysyMeta.title,
  description: keysyMeta.description,
  alternates: { canonical: "/keysy" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{keysyMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{keysyMeta.description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <article key={c.slug} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-surface to-muted">
              <Building2 className="h-9 w-9 text-muted-foreground" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium">{c.venue}</p>
                <Badge tone="primary">{c.system}</Badge>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {c.city} · {c.area}
              </p>
              <p className="mt-3 flex gap-1.5 text-sm text-muted-foreground">
                <Quote className="h-4 w-4 shrink-0 text-primary" />
                {c.quote}
              </p>
              <p className="mt-2 text-xs font-medium">{c.author}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
