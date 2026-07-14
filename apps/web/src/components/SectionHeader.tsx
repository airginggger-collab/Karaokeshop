import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Шапка секции: заголовок + опциональная desktop-ссылка справа
 * (`hidden … sm:flex`). Мобильный дубль ссылки — отдельный <MobileActionLink>
 * после списка (разметка сайта: desktop-ссылка в шапке, mobile — под секцией). */
export function SectionHeader({
  title,
  sub,
  action,
  size = "md",
}: {
  title: ReactNode;
  sub?: string;
  action?: { href: string; label: string };
  size?: "md" | "lg";
}) {
  const titleCls =
    size === "lg"
      ? "font-display text-2xl font-bold sm:text-3xl"
      : "font-display text-xl font-semibold";

  return (
    <div className="flex items-end justify-between">
      {sub ? (
        <div>
          <h2 className={titleCls}>{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        </div>
      ) : (
        <h2 className={titleCls}>{title}</h2>
      )}
      {action && (
        <Link
          href={action.href}
          className="hidden items-center gap-1 text-sm font-medium text-primary sm:flex"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Мобильный дубль ссылки-действия секции (`flex sm:hidden`) — ставится
 * после карточек, так как desktop-версия живёт в шапке SectionHeader. */
export function MobileActionLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-3 flex sm:hidden">
      <Link href={href} className="flex items-center gap-1 text-sm font-medium text-primary">
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
