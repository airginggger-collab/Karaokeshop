import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { kontaktyMeta, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: kontaktyMeta.title,
  description: kontaktyMeta.description,
  alternates: { canonical: "/kontakty" },
};

const mapSrc =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Алматы, улица Муканова 8") +
  "&z=15&output=embed";

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Вопрос по караоке-оборудованию.")}`;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Контакты", path: "/kontakty" }])
          ),
        }}
      />
      <Container className="py-10">
        <Breadcrumb items={[{ label: "Контакты" }]} />
        <h1 className="mt-2 font-display text-2xl font-bold">{kontaktyMeta.h1}</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{kontaktyMeta.description}</p>

        {/* Алматы-баннер */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Подъехать в шоурум</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{siteConfig.address}</p>
              <p className="mt-1.5 text-xs font-medium text-primary">
                Покажем живой звук систем AST и Studio Evolution
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Выезд на объект</p>
              <p className="mt-0.5 text-sm text-muted-foreground">По любому району Алматы в течение 1 часа</p>
              <p className="mt-1.5 text-xs font-medium text-primary">
                Замерим акустику, составим смету бесплатно
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Контактные данные */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-background p-6">
              <h2 className="mb-4 font-semibold">Как с нами связаться</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>{siteConfig.hours}</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-5 w-5" />
              Написать в WhatsApp
            </a>

            {/* Быстрые ссылки */}
            <div className="rounded-xl border border-border bg-background p-5 text-sm">
              <p className="mb-3 font-medium text-muted-foreground">Частые запросы</p>
              <ul className="space-y-2">
                {[
                  { label: "Подобрать систему для дома", href: "/dlya-doma" },
                  { label: "Оснастить заведение под ключ", href: "/dlya-biznesa" },
                  { label: "Рассчитать смету", href: "/kalkulyator" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex items-center gap-1 hover:text-primary">
                      {l.label} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Карта */}
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              src={mapSrc}
              title="Карта karaokeshop, Алматы"
              loading="lazy"
              className="h-full min-h-[360px] w-full"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
