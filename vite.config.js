import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Use esbuild for minification (default, faster than terser)
    minify: 'esbuild',
    // Generate source maps for debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  // Optimize dev server
  server: {
    hmr: true,
  },
  // Esbuild options for minification
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.log and debugger in production
  },
});

