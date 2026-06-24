"use client";

import dynamic from "next/dynamic";
import animationData from "../../public/lottie-mic.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

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
