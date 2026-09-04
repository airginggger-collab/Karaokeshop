import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

// UI-кит без Next: базовые правила TS + правила хуков React.
const config = [
  { ignores: ["dist/**", "storybook-static/**", "node_modules/**"] },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
];

export default config;
