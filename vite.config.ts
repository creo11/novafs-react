import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Production is served from /react-app/ on Cloudflare (not site root).
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/react-app/' : '/',
  plugins: [react()],
}))
