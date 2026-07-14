import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { FaqAccordion } from "./FaqAccordion";

/** FAQ-секция: JSON-LD (FAQPage) + видимый аккордеон из одного источника,
 * поэтому разметка и микроразметка не рассинхронизируются. */
export function FaqBlock({
  faq,
  title = "Частые вопросы",
  className = "mt-12",
}: {
  faq: { q: string; a: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <section className={className}>
        <h2 className="mb-4 font-display text-xl font-semibold">{title}</h2>
        <FaqAccordion items={faq} />
      </section>
    </>
  );
}
