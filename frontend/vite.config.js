// Import hàm `defineConfig` từ Vite
// `defineConfig` giúp hỗ trợ IntelliSense (gợi ý code) khi cấu hình Vite
import { defineConfig } from 'vite';

// Import plugin React từ `@vitejs/plugin-react`
// Plugin này giúp Vite hiểu và xử lý các file React (JSX/TSX)
import react from '@vitejs/plugin-react';

// Xuất cấu hình Vite
// https://vite.dev/config/
export default defineConfig({
  // Khai báo danh sách các plugin được sử dụng
  plugins: [
    react(), // Sử dụng plugin React để hỗ trợ JSX và các tính năng khác của React
  ],
});
