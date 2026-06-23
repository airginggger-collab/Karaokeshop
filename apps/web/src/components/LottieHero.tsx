"use client";

import Lottie from "lottie-react";
import animationData from "../../public/lottie-mic.json";

export function LottieHero({ className }: { className?: string }) {
  return (
    <Lottie
      animationData={animationData}
      loop
      className={className}
      aria-hidden
    />
  );
}
