"use client";

import * as React from "react";

export type ParsedValue = { prefix: string; target: number; suffix: string };

/** "60 000+" → {prefix:"", target:60000, suffix:"+"}; "2 года" → {target:2, suffix:" года"};
 *  "от 749 000 ₸" → {prefix:"от ", target:749000, suffix:" ₸"}. Возвращает null, если числа нет. */
export function parseValue(value: string): ParsedValue | null {
  const m = value.match(/^(\D*)(\d[\d\s  ]*\d|\d)(.*)$/);
  if (!m) return null;
  const target = parseInt(m[2].replace(/[\s  ]/g, ""), 10);
  if (!Number.isFinite(target)) return null;
  return { prefix: m[1], target, suffix: m[3] };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = React.useMemo(() => parseValue(value), [value]);
  const ref = React.useRef<HTMLSpanElement>(null);
  // SSR/начальный рендер — финальное значение (без сдвигов, доступно без JS).
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fmt = new Intl.NumberFormat("ru-RU");
    let raf = 0;
    let started = false;

    const animate = () => {
      const dur = 1100;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(parsed.prefix + fmt.format(Math.round(parsed.target * eased)) + parsed.suffix);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          setDisplay(parsed.prefix + "0" + parsed.suffix);
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
