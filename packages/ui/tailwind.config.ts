import type { Config } from "tailwindcss";

/* Как в apps/web/tailwind.config.ts: простое "var(--…)" молча роняет классы
   с модификатором непрозрачности (text-primary/40) из сборки; color-mix
   с <alpha-value> чинит это поверх hex-токенов @kk/tokens. */
const token = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: token("--color-primary"),
        "primary-fg": token("--color-primary-fg"),
        foreground: token("--color-fg"),
        muted: token("--color-muted"),
        "muted-foreground": token("--color-muted-fg"),
        border: token("--color-border"),
        accent: token("--color-accent"),
        "accent-fg": token("--color-accent-fg"),
        "primary-soft": token("--color-primary-soft"),
        "accent-soft": token("--color-accent-soft"),
        success: token("--color-success"),
        danger: token("--color-danger"),
      },
      borderRadius: {
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
