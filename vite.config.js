import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/Gallery-React/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "docs",              // build output goes to /docs on main
    emptyOutDir: true,           // clean docs/ before each build
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})