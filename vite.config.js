// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// =====================================================================
// 🚀 VITE BUILD & COMPILER CONFIGURATION
// =====================================================================
export default defineConfig({
  plugins: [
    // 🎨 React Plugin: Required to transform JSX syntax into browser-safe JS
    // Prevents "Expected a JavaScript-or-Wasm module script" MIME errors
    react(),
  ],
  server: {
    // 🌐 Default local development server settings
    port: 3000,
    open: true,
    fs: {
      strict: true,
    },
  },
  build: {
    // 📦 Output directory for compiled, browser-ready production assets
    outDir: "dist",
    emptyOutDir: true,
  },
});
