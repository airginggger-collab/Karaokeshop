import { describe, it, expect } from "vitest";
import { waHref } from "./wa";
import { siteConfig } from "./site";

describe("waHref", () => {
  it("без текста возвращает голую ссылку на чат", () => {
    expect(waHref()).toBe(`https://wa.me/${siteConfig.whatsapp}`);
  });

  it("с текстом добавляет ?text= с процентным кодированием", () => {
    const url = waHref("Hi there");
    expect(url).toBe(`https://wa.me/${siteConfig.whatsapp}?text=Hi%20there`);
  });

  it("кодирует кириллицу и спецсимволы (без сырых пробелов/&)", () => {
    const url = waHref("Здравствуйте! A&B?");
    expect(url.startsWith(`https://wa.me/${siteConfig.whatsapp}?text=`)).toBe(true);
    expect(url).toContain("%20"); // пробел
    expect(url).toContain("%26"); // &
    expect(url).not.toMatch(/[ &]/); // ни одного сырого пробела или &
  });
});
