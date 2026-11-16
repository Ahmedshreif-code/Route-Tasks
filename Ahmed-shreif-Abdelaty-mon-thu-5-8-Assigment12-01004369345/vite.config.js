import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/Route-Tasks/Ahmed-shreif-Abdelaty-mon-thu-5-8-Assigment12-01004369345/"
})