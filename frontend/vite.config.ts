import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const CHART_VENDOR_PATTERN =
  /node_modules\/(recharts|d3-|victory-vendor|internmap|decimal\.js)/;
const REACT_VENDOR_PATTERN = /node_modules\/(react|react-dom|scheduler)\//;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (CHART_VENDOR_PATTERN.test(id)) {
            return 'charts';
          }
          if (REACT_VENDOR_PATTERN.test(id)) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
