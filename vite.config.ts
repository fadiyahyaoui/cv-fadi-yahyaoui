import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cv-fadi-yahyaoui/',
  server: {
    port: 3001,
    open: true
  }
})