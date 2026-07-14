import { defineConfig } from "vitest/config";

export default defineConfig({
  // tsconfig Next'а ставит "jsx": "preserve" — vite/vitest 4 не компилит такой
  // JSX сам (падает import analysis на .tsx). Форсим automatic-режим для тестов.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
