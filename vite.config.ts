import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
html: {
  inject: {
    inject: {
      'X-Frame-Options': 'DENY'
    }
  }
}
