import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { blogMeta, blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: blogMeta.title,
  description: blogMeta.description,
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{blogMeta.h1}</h1>
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
    </Container>
  );
}
