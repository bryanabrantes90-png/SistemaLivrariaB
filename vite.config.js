import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Pasta que vai para a nuvem
    emptyOutDir: true
  },
  server: {
    port: 5173,
    host: true
  }
})