"use client";

import { useEffect, useRef, useState } from "react";

/** «Подсветка строки» как в караоке: заливка слева направо при появлении.
    SSR/без JS — сразу залито (класс .hl). Уважает prefers-reduced-motion (CSS).
    FOUC-гард: элемент, уже видимый при гидрации (above-the-fold), остаётся
    залитым без анимации — первый IO-колбэк только измеряет видимость. */
export function HighlightLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(false);
  const measured = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!measured.current) {
          measured.current = true;
          if (e.intersectionRatio > 0) {
            io.disconnect();
            return;
          }
          setArmed(true);
          return;
        }
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.4] }
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
