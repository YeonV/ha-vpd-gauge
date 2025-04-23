// vite.config.js
import { defineConfig } from 'vite';
// import { nodeResolve } from '@rollup/plugin-node-resolve'; // Only needed if bare imports fail

export default defineConfig({
  build: {
    // Library mode configuration
    lib: {
      entry: 'src/vpd-gauge.js', // Path to your main card source file
      name: 'VpdGaugeCard', // Global variable name (if needed, less relevant for modules)
      // Output formats: 'es' (ES Module) is essential for Lovelace
      // 'umd' can be useful for broader compatibility if needed, but 'es' is primary
      formats: ['es'],
      fileName: (format) => `vpd-gauge-card.js`, // Output filename
    },
    // Output directory
    outDir: 'dist',
    // Empty output directory before building
    emptyOutDir: true,
    // Minification (terser is default, esbuild is faster if preferred)
    // minify: 'terser',
    // Rollup specific options (can be useful for plugins)
    rollupOptions: {
      // External dependencies that shouldn't be bundled (if any)
      // external: /^lit/, // Example if you wanted to exclude lit, but usually bundle it
      // plugins: [nodeResolve()] // Add if bare module imports cause issues
    },
    // Target environments (ensure compatibility)
    target: 'es2017', // Good target for modern browsers supporting HA
    // Disable sourcemaps for production build unless needed for debugging
    sourcemap: false,
  },
  // Optional: Server configuration for development
  // server: {
  //   port: 3000, // Example port
  // }
});