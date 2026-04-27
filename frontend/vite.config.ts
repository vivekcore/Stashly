import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const repoName = 'Stashly'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: command === 'build' ? `/${repoName}/` : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
