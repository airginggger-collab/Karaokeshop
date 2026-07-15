import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqBlock } from "@/components/FaqBlock";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingJsonLd } from "@/lib/seo";
import { blogPosts } from "@/lib/site";

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
      <article className="mx-auto max-w-2xl">
        <JsonLd data={blogPostingJsonLd(post)} />
        <Breadcrumb withLd currentPath={`/blog/${post.slug}`} items={[{ label: "Блог", href: "/blog" }, { label: post.title }]} />
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.body.map((para, i) => (
          <p key={i} className="mt-4 text-[15px] leading-7">
            {para}
          </p>
        ))}

        {post.faq.length ? <FaqBlock faq={post.faq} className="mt-10" /> : null}
      </article>
    </Container>
  );
}
