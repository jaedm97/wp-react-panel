import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Remove hashes from filenames
        entryFileNames: 'static/js/[name].js',
        chunkFileNames: 'static/js/[name].chunk.js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `static/media/[name].[ext]`
          }
          if (ext === 'css') {
            return 'static/css/[name].css'
          }
          return `static/[name].[ext]`
        },
      },
    },
  },
})

