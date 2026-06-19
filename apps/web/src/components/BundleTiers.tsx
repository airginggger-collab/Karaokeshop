import Link from "next/link";
import { bundles } from "@/lib/site";

export function BundleTiers({ current }: { current?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {bundles.map((b) => {
        const active = current === b.slug;
        return (
          <Link
            key={b.slug}
            href={`/komplekty/${b.slug}`}
            className={`rounded-lg border px-3 py-3 ${active ? "border-2 border-primary" : "border-border hover:bg-surface"}`}
          >
            <p className="text-sm font-medium">{b.slug.replace("do-", "до ")} м²</p>
          </Link>
        );
      })}
    </div>
  );
}
