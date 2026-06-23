interface ProductImageProps {
  src?: string;
  model: string;
  className?: string;
}

export function ProductImage({ src, model, className = "" }: ProductImageProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={model} loading="lazy" className={`h-full w-full object-cover ${className}`} />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface to-muted px-4 text-center ${className}`}
    >
      <span className="font-display text-sm font-semibold leading-tight text-foreground/70">{model}</span>
    </div>
  );
}
