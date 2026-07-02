import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandProductFilter } from "@/components/BrandProductFilter";
import { brands, products, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: `/brand/${b.slug}` },
  };
}

const brandContent: Record<
  string,
  { tagline: string; priceFrom: string; highlights: string[]; waText: string; accentVar: string; night: boolean }
> = {
  ast: {
    tagline: "Широкая линейка — от домашнего Mini до клубного AST-350. Надёжный выбор для любого сценария.",
    priceFrom: "от 749 000 ₸",
    highlights: [
      "Системы для дома, кафе и клуба в одной линейке",
      "База 60 000+ песен — KZ · RU · EN",
      "Монтаж и гарантия от официального дилера",
    ],
    waText: "Здравствуйте! Интересует система AST, хочу подобрать модель.",
    accentVar: "var(--warm-accent)",
    night: false,
  },
  "studio-evolution": {
    tagline: "Evobox — современный медиаплеер с планшетным управлением и облачным контентом.",
    priceFrom: "от 950 000 ₸",
    highlights: [
      "Планшетный пульт с удобным интерфейсом",
      "Облачный контент и регулярные обновления",
      "Evobox для дома, Evobox Plus и Pro2 для заведений",
    ],
    waText: "Здравствуйте! Интересует система Studio Evolution Evobox, хочу подробности.",
    accentVar: "var(--night-accent)",
    night: true,
  },
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = brands.find((x) => x.slug === slug);
  if (!b) notFound();

  const content = brandContent[slug] ?? {
    tagline: b.description,
    priceFrom: "",
    highlights: [],
    waText: `Здравствуйте! Интересует ${b.name}.`,
    accentVar: "var(--color-primary)",
    night: false,
  };

  const items = products.filter((p) => p.brand === b.name);
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(content.waText)}`;

  const heroStyle: React.CSSProperties = {
    background: content.night ? "var(--night-bg)" : "var(--color-surface)",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Главная", path: "/" },
              { name: "Каталог", path: "/catalog" },
              { name: b.name, path: `/brand/${b.slug}` },
            ])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Каталог", href: "/catalog" }, { label: b.name }]} />

        <section className="mt-4 rounded-3xl p-8 sm:p-10" style={heroStyle}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: content.accentVar }}>
            {b.name}
          </p>
          <h1
            className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
            style={content.night ? { color: "var(--night-fg)" } : undefined}
          >
            {b.h1}
          </h1>
          <p
            className="mt-3 max-w-xl text-sm"
            style={{ color: content.night ? "var(--night-muted)" : "var(--color-muted-foreground)" }}
          >
            {content.tagline}
          </p>
          <ul className="mt-4 space-y-1.5">
            {content.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm"
                style={{ color: content.night ? "var(--night-muted)" : "var(--color-muted-foreground)" }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: content.accentVar }} />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {content.priceFrom && (
              <span
                className="font-display text-2xl font-bold"
                style={content.night ? { color: "var(--night-fg)" } : undefined}
              >
                {content.priceFrom}
              </span>
            )}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              Подобрать в WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 font-display text-xl font-semibold">Модели {b.name}</h2>
          <BrandProductFilter items={items} />
        </section>
      </Container>
    </>
  );
}
