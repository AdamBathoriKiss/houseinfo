import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default mergeConfig(
  defineConfig({
    plugins: [tailwindcss(), !process.env.VITEST && reactRouter(), tsconfigPaths()],
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './app/test/setup.ts',
      css: true,
    },
  })
)