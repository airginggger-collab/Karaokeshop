import * as React from "react";

export type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const byVariant: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-primary-fg shadow-sm hover:opacity-90 active:scale-[.98]",
  ghost: "border border-border bg-background text-foreground hover:bg-muted active:scale-[.98]",
};

export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  const cls = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition",
    sizes[size],
    byVariant[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <button data-variant={variant} className={cls} {...rest} />;
}
