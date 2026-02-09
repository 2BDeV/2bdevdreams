import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer': ['framer-motion'],
          'icons': ['lucide-react'],
          'sanity': ['@sanity/client'],
        }
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild', // ✅ ESBUILD (gyorsabb mint terser!)
    target: 'esnext',
    // Console.log eltávolítása production-ben
    esbuild: {
      drop: ['console', 'debugger'],
    }
  }
})
