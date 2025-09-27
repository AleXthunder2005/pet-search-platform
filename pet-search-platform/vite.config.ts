import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@components': path.resolve(__dirname, './src/ui/components'),
      '@layouts': path.resolve(__dirname, './src/ui/layouts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@state': path.resolve(__dirname, './src/state'),
      '@data': path.resolve(__dirname, './src/data'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@icons': path.resolve(__dirname, './assets/icons'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@images': path.resolve(__dirname, './assets/images'),
    },
  },
})