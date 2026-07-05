interface ProductImageProps {
  src?: string;
  model: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ src, model, className = "", priority = false }: ProductImageProps) {
  if (src) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-scene p-6 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={model}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-scene px-4 text-center ${className}`}
    >
      <span className="font-display text-sm font-semibold leading-tight text-primary/40">{model}</span>
    </div>
  );
}
