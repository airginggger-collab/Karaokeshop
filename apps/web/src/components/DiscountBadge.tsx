export function DiscountBadge({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <span className={`rounded-md bg-hot px-2 py-0.5 text-xs font-medium text-hot-fg ${className}`}>
      −{pct}%
    </span>
  );
}
