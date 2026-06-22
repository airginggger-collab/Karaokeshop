"use client";

import { useEffect, useState } from "react";

const BARS = 28;

const heights = [
  0.35, 0.55, 0.75, 0.9, 0.65, 0.45, 0.8, 0.6, 0.95, 0.5,
  0.7, 0.85, 0.4, 0.65, 0.9, 0.55, 0.75, 0.45, 0.8, 0.6,
  0.7, 0.5, 0.85, 0.4, 0.65, 0.9, 0.55, 0.75,
];

const delays = [
  0, 0.18, 0.06, 0.3, 0.12, 0.24, 0.08, 0.36, 0.02, 0.2,
  0.14, 0.28, 0.1, 0.22, 0.04, 0.32, 0.16, 0.26, 0.07, 0.19,
  0.11, 0.31, 0.05, 0.23, 0.13, 0.29, 0.09, 0.25,
];

export function HeroWave() {
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const stopped = reduced || paused;

  return (
    <>
      <style>{`
        @keyframes kk-bar {
          0%, 100% { transform: scaleY(0.15); }
          50%       { transform: scaleY(1); }
        }
      `}</style>

      {/* Equalizer bars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] px-6 pb-0"
        style={{ height: "55%", opacity: 0.18 }}
      >
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 0",
              maxWidth: 14,
              height: `${h * 100}%`,
              borderRadius: "3px 3px 0 0",
              backgroundColor: "var(--night-accent)",
              transformOrigin: "bottom",
              animation: stopped
                ? "none"
                : `kk-bar ${1.4 + h * 0.8}s ${delays[i]}s ease-in-out infinite`,
              transform: stopped ? "scaleY(0.2)" : undefined,
            }}
          />
        ))}
      </div>

      {/* Reduce Motion toggle — bottom-left, like microsoft.ai */}
      <button
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium transition"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "var(--night-muted)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        aria-label={paused ? "Включить анимацию" : "Выключить анимацию"}
      >
        <span
          style={{
            display: "inline-block",
            width: 20,
            height: 11,
            borderRadius: 6,
            background: paused ? "rgba(255,255,255,0.15)" : "var(--night-accent)",
            position: "relative",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: paused ? 2 : 11,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.2s",
            }}
          />
        </span>
        {paused ? "Анимация выкл" : "Анимация вкл"}
      </button>
    </>
  );
}
