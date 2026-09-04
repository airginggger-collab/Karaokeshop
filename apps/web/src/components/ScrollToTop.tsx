"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // страница может открыться уже прокрученной (возврат «назад»)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // `bottom` завязан на --sticky-bar-h (её публикует ProductStickyBar), поэтому
  // анимировать его нельзя: при `transition-all` Chrome не перезапускает переход
  // на изменение одной лишь кастомной переменной и замораживает bottom на
  // значении до изменения — кнопка «Наверх» оставалась на 24px и лежала поверх
  // sticky-панели товара. Перечисляем анимируемые свойства явно, без bottom.
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className={`fixed bottom-[calc(1.5rem+var(--sticky-bar-h,0px))] left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-md border border-border text-muted-foreground transition-[opacity,transform,color,border-color] duration-200 hover:text-foreground hover:border-primary lg:bottom-8 lg:left-8 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
