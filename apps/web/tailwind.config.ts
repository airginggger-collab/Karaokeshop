import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-fg": "var(--color-primary-fg)",
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-fg)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-fg": "var(--color-accent-fg)",
        "primary-soft": "var(--color-primary-soft)",
        "accent-soft": "var(--color-accent-soft)",
        surface: "var(--color-surface)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
} satisfies Config;
