export type NewsItem = {
  title: string;
  url: string;
  source: string;
  pubDate: string;
};

const RSS_URLS = [
  "https://news.google.com/rss/search?q=карaоке+казахстан&hl=ru&gl=KZ&ceid=KZ:ru",
  "https://news.google.com/rss/search?q=karaoke+музыка+казахстан&hl=ru&gl=KZ&ceid=KZ:ru",
];

function parseRssItem(item: string): NewsItem | null {
  const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] ?? item.match(/<title>(.*?)<\/title>/)?.[1];
  const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1];
  const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
  const source = item.match(/<source[^>]*>(.*?)<\/source>/)?.[1] ?? "Google News";

  if (!title || !link) return null;

  // фильтруем нерелевантные результаты
  const lower = title.toLowerCase();
  const relevant = ["карaок", "karaok", "пение", "микрофон", "музык"].some((kw) =>
    lower.includes(kw)
  );
  if (!relevant) return null;

  return {
    title: title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim(),
    url: link.trim(),
    source: source.trim(),
    pubDate: pubDate?.trim() ?? "",
  };
}

export async function fetchNews(limit = 6): Promise<NewsItem[]> {
  const results: NewsItem[] = [];

  for (const url of RSS_URLS) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 }, // кэш 24 ч
        headers: { "User-Agent": "Mozilla/5.0 (compatible; karaokeshop-bot/1.0)" },
      });
      if (!res.ok) continue;
      const text = await res.text();
      const items = text.split("<item>").slice(1);
      for (const item of items) {
        const parsed = parseRssItem(item);
        if (parsed) results.push(parsed);
      }
    } catch {
      // игнорируем ошибки fetch — статика не ломается
    }
  }

  // дедупликация по URL
  const seen = new Set<string>();
  return results
    .filter((n) => { if (seen.has(n.url)) return false; seen.add(n.url); return true; })
    .slice(0, limit);
}

// Заглушки на случай если RSS недоступен при сборке
export const NEWS_FALLBACK: NewsItem[] = [
  {
    title: "Рынок карaоке-оборудования в СНГ продолжает расти",
    url: "/blog",
    source: "karaokeshop.kz",
    pubDate: "2026-06-01",
  },
  {
    title: "Studio Evolution выпустила обновление базы — 5 000 новых треков",
    url: "/blog/obnovlenie-pesen-v-karaoke-kak-eto-rabotaet",
    source: "karaokeshop.kz",
    pubDate: "2026-05-20",
  },
  {
    title: "AST-350: новые возможности удалённого управления через приложение",
    url: "/blog/ast-250-vs-ast-350",
    source: "karaokeshop.kz",
    pubDate: "2026-05-10",
  },
  {
    title: "Как выбрать систему карaоке для летнего кафе — разбор сезонных нюансов",
    url: "/blog/kak-nastroit-zvuk-v-zale",
    source: "karaokeshop.kz",
    pubDate: "2026-04-28",
  },
  {
    title: "Казахстанский рынок HoReCa: тренд на карaоке-вечера в ресторанах",
    url: "/blog/skolko-stoit-osnastit-restoran-karaoke",
    source: "karaokeshop.kz",
    pubDate: "2026-04-15",
  },
  {
    title: "Топ запросов апреля 2026: «карaоке для дома Алматы» в топ-5",
    url: "/blog",
    source: "karaokeshop.kz",
    pubDate: "2026-04-05",
  },
];
