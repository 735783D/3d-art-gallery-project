import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/3d-art-gallery-project/",
  build: {
    assetsInlineLimit: 0 // Force all assets to be served as separate files
  },
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.glb'],
})
