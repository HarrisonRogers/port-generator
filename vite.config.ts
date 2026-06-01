import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { resolve } from 'node:path'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      tslib: resolve(process.cwd(), 'src/lib/tslibShim.ts'),
    },
  },

  ssr: {
    noExternal: ['react-remove-scroll'],
  },

  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
