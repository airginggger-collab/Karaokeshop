"use client";

import { useEffect, useState } from "react";

/* ─── Три floating-orb'а. Только transform + opacity → GPU composited layer.
   Никаких requestAnimationFrame, никакого JS в рендер-цикле.
   Управление через CSS-класс .anim-paused на <html>. ─── */

const ORBS = [
  {
    /* правый верх — teal, большой якорный */
    size: 600,
    style: {
      top: "-25%",
      right: "-12%",
      background: "radial-gradient(circle, #2dd4bf 0%, #0d9488 35%, transparent 65%)",
      opacity: 0.75,
      mixBlendMode: "screen" as const,
      animationName: "kk-orb-a",
      animationDuration: "14s",
    },
  },
  {
    /* центр-низ — оранжевый контраст */
    size: 460,
    style: {
      bottom: "-30%",
      left: "18%",
      background: "radial-gradient(circle, #fb923c 0%, #ea580c 30%, transparent 65%)",
      opacity: 0.65,
      mixBlendMode: "screen" as const,
      animationName: "kk-orb-b",
      animationDuration: "19s",
    },
  },
  {
    /* левый верх — teal мягкий */
    size: 320,
    style: {
      top: "-5%",
      left: "-10%",
      background: "radial-gradient(circle, #2dd4bf 0%, transparent 60%)",
      opacity: 0.55,
      mixBlendMode: "screen" as const,
      animationName: "kk-orb-c",
      animationDuration: "24s",
    },
  },
  {
    /* правый низ — фиолетовый глубина */
    size: 300,
    style: {
      bottom: "5%",
      right: "8%",
      background: "radial-gradient(circle, #a78bfa 0%, #7c3aed 30%, transparent 65%)",
      opacity: 0.55,
      mixBlendMode: "screen" as const,
      animationName: "kk-orb-d",
      animationDuration: "17s",
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
        @keyframes kk-orb-d {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          45%      { transform: translate(-35px, -20px) scale(1.15); }
          75%      { transform: translate(15px, 25px) scale(0.9); }
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
