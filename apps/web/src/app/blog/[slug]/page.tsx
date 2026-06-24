import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { blogPosts } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Container className="py-10">
      {post.faq.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faq)) }}
        />
      ) : null}

      <article className="mx-auto max-w-2xl">
        <Breadcrumb items={[{ label: "Блог", href: "/blog" }, { label: post.title }]} />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{post.title}</h1>
        {post.body.map((para, i) => (
          <p key={i} className="mt-4 text-[15px] leading-7">
            {para}
          </p>
        ))}

        {post.faq.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-medium">Частые вопросы</h2>
            <dl className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border">
              {post.faq.map((f) => (
                <div key={f.q} className="px-4 py-3">
                  <dt className="text-sm font-medium">{f.q}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </article>
    </Container>
  );
}
