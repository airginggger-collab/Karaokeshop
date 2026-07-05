"use client";

import { useEffect, useRef, useState } from "react";

/** «Подсветка строки» как в караоке: заливка слева направо при появлении.
    SSR/без JS — сразу залито (класс .hl). Уважает prefers-reduced-motion (CSS). */
export function HighlightLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["hl", armed && "hl-armed", on && "hl-on", className].filter(Boolean).join(" ");
  return (
    <span ref={ref} className={cls}>
      {children}
    </span>
  );
}
