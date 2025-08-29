import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    headers: new Map([
      ['Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"],
      ['X-Frame-Options', 'DENY']
    ])
  }
})
