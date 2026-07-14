import type { ReactNode } from "react";

/** Кнопка-опция (шаги калькулятора / квиза): рамка + подсветка выбранного
 * (`border-primary bg-primary/5`). Без хуков — безопасна в клиентских компонентах.
 * onClick передаёт вызывающий; состояние selected держит родитель. */
export function OptionButton({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  const cls = [
    "rounded-xl border p-4 text-left transition",
    selected
      ? "border-primary bg-primary/5"
      : "border-border bg-background hover:border-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
