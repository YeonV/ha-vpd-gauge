// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/vpd-gauge.js', // <<< Make sure this matches your source filename
      name: 'VpdGaugeCard',
      formats: ['es'],
      fileName: (format) => `vpd-gauge-card.js`, // Output filename remains the same
    },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2017',
    sourcemap: false,
  },
});