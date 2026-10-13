import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-bundle';
            }
            if (id.includes('framer-motion')) {
              return 'motion-bundle';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-bundle';
            }
            if (id.includes('ogl')) {
              return 'ogl-bundle';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-core';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
