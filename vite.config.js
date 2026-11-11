import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.js"]
  },
  build: {
    rollupOptions: {
      input: 'index.html' // el nombre que le hayas puesto
    }
  }
})