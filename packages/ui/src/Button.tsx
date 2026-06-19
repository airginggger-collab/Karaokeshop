import * as React from "react";

export type ButtonProps = {
  variant?: "primary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition";

const byVariant: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  ghost: "border border-border text-foreground hover:bg-muted",
};

export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const cls = [base, byVariant[variant], className].filter(Boolean).join(" ");
  return <button data-variant={variant} className={cls} {...rest} />;
}
