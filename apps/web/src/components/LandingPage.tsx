import * as React from "react";

export function LandingPage({
  h1,
  description,
  children,
}: {
  h1: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-medium">{h1}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {children}
    </main>
  );
}
