/** «Подсветка строки»: акцентный текст (цвет --color-cta + тонкое подчёркивание),
    без анимации и без заливки-блока. Класс .hl — см. globals.css. SSR-safe. */
export function HighlightLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const cls = ["hl", className].filter(Boolean).join(" ");
  return <span className={cls}>{children}</span>;
}
