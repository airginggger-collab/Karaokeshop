/** Безопасная вставка JSON-LD: экранируем `<`, чтобы строка вида "</script>"
 * в контенте (FAQ/описания правит владелец) не разрывала тег и не открывала
 * HTML-инъекцию. Единственное разрешённое место для ld+json-скриптов. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
