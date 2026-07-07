import * as React from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>{children}</div>;
}
