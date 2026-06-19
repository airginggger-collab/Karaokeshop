import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-fg": "var(--color-primary-fg)",
        foreground: "var(--color-fg)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-fg)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-fg": "var(--color-accent-fg)",
        "primary-soft": "var(--color-primary-soft)",
        "accent-soft": "var(--color-accent-soft)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
