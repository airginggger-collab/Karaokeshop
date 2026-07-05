import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-fg": "var(--color-primary-fg)",
        cta: "var(--color-cta)",
        "cta-fg": "var(--color-cta-fg)",
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        page: "var(--color-page)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-fg)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-fg": "var(--color-accent-fg)",
        "primary-soft": "var(--color-primary-soft)",
        "accent-soft": "var(--color-accent-soft)",
        surface: "var(--color-surface)",
        hot: "var(--color-hot)",
        scene: "var(--color-scene)",
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
