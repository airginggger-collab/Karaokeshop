import Link from "next/link";

export function SectionHeading({
  title,
  href,
  linkLabel = "Смотреть все",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between">
      <h2 className="text-lg font-medium">{title}</h2>
      {href ? (
        <Link href={href} className="text-sm text-primary hover:underline">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
