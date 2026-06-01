import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { createRequire } from 'node:module'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const require = createRequire(import.meta.url)
const tslibPath = require.resolve('tslib/tslib.es6.js')

const config = defineConfig({
  resolve: {
    alias: {
      tslib: tslibPath,
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
