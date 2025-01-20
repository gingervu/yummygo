import { defineConfig } from 'vite';
import NodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [NodePolyfills()],
  // Các cấu hình khác
});
