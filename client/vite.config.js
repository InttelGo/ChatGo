import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Requests to /api will be proxied to your backend
        target: 'https://meta.internetdedicado.com.co:8443', // Your backend URL
        changeOrigin: true, // Required for CORS
        cookieDomainRewrite: 'localhost' // Optional: rewrite cookie domain
      },
    },
  },
});