import { siteConfig } from "./site";

/** Единая сборка ссылки на WhatsApp-чат.
 * Без текста — просто открыть диалог; с текстом — предзаполнить сообщение
 * (encodeURIComponent обязателен: кириллица и спецсимволы). */
export function waHref(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
