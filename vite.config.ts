import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "framer": ["framer-motion"],
          "sanity": ["@sanity/client"],
          // Three.js és minden 3D csomag EGYÜTT marad → nem törik szét!
          "three": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});