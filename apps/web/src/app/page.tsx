import Link from "next/link";
import { Button } from "@kk/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-medium">Караоке под ключ в Казахстане</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        От системы домой до оснащения клуба. AST и Studio Evolution · эксперты с 2012.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/karaoke/dlya-doma">
          <Button>Караоке домой</Button>
        </Link>
        <Link href="/pod-klyuch">
          <Button variant="ghost">Оснастить заведение</Button>
        </Link>
      </div>
    </main>
  );
}
