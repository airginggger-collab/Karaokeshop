import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Button } from "@kk/ui";
import { Container } from "@/components/Container";
import { kontaktyMeta, siteConfig } from "@/lib/site";

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
    <Container className="py-10">
      <h1 className="text-2xl font-medium">{kontaktyMeta.h1}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{kontaktyMeta.description}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {siteConfig.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-primary">
              {siteConfig.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
              {siteConfig.email}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> {siteConfig.hours}
          </p>
          <div className="pt-2">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
              </Button>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            src={mapSrc}
            title="Карта — karaokeshop, Алматы"
            loading="lazy"
            className="h-[360px] w-full"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Container>
  );
}
