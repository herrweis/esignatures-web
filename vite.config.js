import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // Add more pages here as needed:
        // about: resolve(__dirname, 'src/about.html'),
        // pricing: resolve(__dirname, 'src/pricing.html'),
      },
    },
  },
})
