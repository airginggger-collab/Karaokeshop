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
        border: "var(--color-border)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
