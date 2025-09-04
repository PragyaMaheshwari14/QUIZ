import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { UserConfig as VitestUserConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Optional: hide HMR overlay popups
    // hmr: { overlay: false },
  },
  // 👇 cast the test property so TS knows it's valid
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    css: true,
  } satisfies VitestUserConfig['test'],
})
