"use client";

import { useEffect, useState } from "react";

/* ─── Три floating-orb'а. Только transform + opacity → GPU composited layer.
   Никаких requestAnimationFrame, никакого JS в рендер-цикле.
   Управление через CSS-класс .anim-paused на <html>. ─── */

const ORBS = [
  {
    /* правый — тёплый акцент */
    size: 520,
    style: {
      top: "-15%",
      right: "-8%",
      background: "radial-gradient(circle, var(--night-accent) 0%, transparent 70%)",
      opacity: 0.28,
      animationName: "kk-orb-a",
      animationDuration: "14s",
    },
  },
  {
    /* центр-низ — холодный */
    size: 380,
    style: {
      bottom: "-20%",
      left: "25%",
      background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
      opacity: 0.18,
      animationName: "kk-orb-b",
      animationDuration: "19s",
    },
  },
  {
    /* левый верх — небольшой */
    size: 260,
    style: {
      top: "5%",
      left: "-6%",
      background: "radial-gradient(circle, var(--night-accent) 0%, transparent 70%)",
      opacity: 0.14,
      animationName: "kk-orb-c",
      animationDuration: "24s",
    },
  },
];

export function HeroWave() {
  const [paused, setPaused] = useState(false);

  /* Читаем предпочтение пользователя из localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("kk-anim") === "off";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPause = stored || mq;
    setPaused(shouldPause);
    document.documentElement.classList.toggle("anim-paused", shouldPause);
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.classList.toggle("anim-paused", next);
    try { localStorage.setItem("kk-anim", next ? "off" : "on"); } catch {}
  };

  return (
    <>
      <style>{`
        @keyframes kk-orb-a {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(-30px, 20px) scale(1.08); }
          66%      { transform: translate(20px, -25px) scale(0.95); }
        }
        @keyframes kk-orb-b {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          40%      { transform: translate(40px, -30px) scale(1.1); }
          70%      { transform: translate(-20px, 15px) scale(0.93); }
        }
        @keyframes kk-orb-c {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          50%      { transform: translate(25px, 30px) scale(1.12); }
        }
        .anim-paused .kk-orb {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .kk-orb { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="kk-orb absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              ...orb.style,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Кнопка управления анимацией — в AnimationToggle (layout.tsx) */}
      {/* Экспортируем toggle для использования снаружи */}
      <_HeroToggleTrigger paused={paused} onToggle={toggle} />
    </>
  );
}

/* Невидимый маркер — реальная кнопка в AnimationToggle читает состояние через custom event */
function _HeroToggleTrigger({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  useEffect(() => {
    const handler = () => onToggle();
    window.addEventListener("kk-anim-toggle", handler);
    return () => window.removeEventListener("kk-anim-toggle", handler);
  }, [onToggle]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kk-anim-state", { detail: { paused } }));
  }, [paused]);

  return null;
}
