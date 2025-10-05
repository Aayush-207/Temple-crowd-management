import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use relative paths so assets load correctly on static hosts/subpaths
export default defineConfig({
  base: './',
  plugins: [react()],
})


