import type { Metadata } from "next";
import { routeMeta } from "@/lib/site";

const meta = routeMeta["/pod-klyuch"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-medium">Оснащение караоке под ключ</h1>
      <p className="mt-2 text-sm text-muted-foreground">{meta.description}</p>
    </main>
  );
}
