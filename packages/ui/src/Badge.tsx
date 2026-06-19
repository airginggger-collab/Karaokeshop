import * as React from "react";

export type BadgeProps = {
  tone?: "default" | "primary" | "accent";
} & React.HTMLAttributes<HTMLSpanElement>;

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent-fg",
};

export function Badge({ tone = "default", className, ...rest }: BadgeProps) {
  const cls = [
    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
    tones[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={cls} {...rest} />;
}
