import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // Permite que o servidor seja acessado fora do container (pelo Windows)
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,   // Necessário para o Windows detectar quando você altera o código
    },
    hmr: {
      clientPort: 3000,   // Essencial: evita que o navegador tente conectar em portas erradas e fique "branco"
    },
  },
})