import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default mergeConfig(
  defineConfig({
    plugins: [tailwindcss(), !process.env.VITEST && reactRouter(), tsconfigPaths()],
    resolve: {
      alias: {
        // PrimeReact utils explicit mapping
        //'primereact/utils': 'primereact/utils/utils.cjs.js',
      }
    },
    ssr: {
      noExternal: ['primereact'],
    },
    optimizeDeps: {
      include: ['primereact', 'quill'] // ← HOZZÁADVA: quill
    }
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './app/test/setup.ts',
      css: true,
    },
  })
)
