"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

export function AnimationToggle() {
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    /* Синхронизируемся с HeroWave через custom event */
    const onState = (e: Event) => {
      setPaused((e as CustomEvent<{ paused: boolean }>).detail.paused);
    };
    window.addEventListener("kk-anim-state", onState);
    /* Читаем localStorage при маунте */
    const stored = localStorage.getItem("kk-anim") === "off";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPaused(stored || mq);
    return () => window.removeEventListener("kk-anim-state", onState);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("kk-anim-toggle"))}
      aria-label={paused ? "Включить анимацию" : "Выключить анимацию"}
      title={paused ? "Включить анимацию" : "Выключить анимацию"}
      className="fixed bottom-[72px] left-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:border-primary hover:text-foreground lg:bottom-20 lg:left-8"
    >
      {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
    </button>
  );
}
