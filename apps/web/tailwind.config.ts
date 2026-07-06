import type { Config } from "tailwindcss";

/* Hex-токены из @kk/tokens нельзя отдавать как простое "var(--…)": Tailwind
   не может вычислить из него прозрачность, и классы вида text-primary/40
   молча выпадают из сборки. color-mix с <alpha-value> даёт модификаторам
   непрозрачности работать поверх hex-переменных; без модификатора
   calc(1 * 100%) — исходный цвет без изменений. */
const token = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: token("--color-primary"),
        "primary-fg": token("--color-primary-fg"),
        cta: token("--color-cta"),
        "cta-fg": token("--color-cta-fg"),
        background: token("--color-bg"),
        foreground: token("--color-fg"),
        page: token("--color-page"),
        muted: token("--color-muted"),
        "muted-foreground": token("--color-muted-fg"),
        border: token("--color-border"),
        accent: token("--color-accent"),
        "accent-fg": token("--color-accent-fg"),
        "primary-soft": token("--color-primary-soft"),
        "accent-soft": token("--color-accent-soft"),
        surface: token("--color-surface"),
        hot: token("--color-hot"),
        "hot-fg": token("--color-hot-fg"),
        scene: token("--color-scene"),
        success: token("--color-success"),
        danger: token("--color-danger"),
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
