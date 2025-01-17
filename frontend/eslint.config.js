// Import cấu hình mặc định của ESLint cho JavaScript
import js from '@eslint/js';

// Import danh sách các biến toàn cục (global variables) từ module 'globals'
// Ví dụ: các biến như `window`, `document` sẽ được nhận diện là biến toàn cục
import globals from 'globals';

// Import plugin dành cho React
// Plugin này cung cấp các quy tắc kiểm tra code React và JSX
import react from 'eslint-plugin-react';

// Import plugin dành cho React Hooks
// Plugin này giúp kiểm tra các vấn đề về cách sử dụng các hook như useState, useEffect
import reactHooks from 'eslint-plugin-react-hooks';

// Import plugin cho tính năng Fast Refresh trong React
// Tính năng này hỗ trợ tự động cập nhật giao diện khi thay đổi code mà không làm mất trạng thái hiện tại
import reactRefresh from 'eslint-plugin-react-refresh';

// Xuất ra cấu hình ESLint
export default [
  // Bỏ qua việc kiểm tra ESLint trong thư mục `dist` (chứa file build)
  { ignores: ['dist'] },
  {
    // Áp dụng cấu hình cho các file có phần mở rộng `.js` và `.jsx`
    files: ['**/*.{js,jsx}'],
    
    // Các tùy chọn liên quan đến ngôn ngữ
    languageOptions: {
      // Sử dụng phiên bản ECMAScript 2020 (hỗ trợ các tính năng hiện đại của JavaScript)
      ecmaVersion: 2020,

      // Định nghĩa các biến toàn cục của trình duyệt
      globals: globals.browser,

      // Cấu hình trình phân tích cú pháp JavaScript (parser)
      parserOptions: {
        ecmaVersion: 'latest', // Hỗ trợ cú pháp JavaScript mới nhất
        ecmaFeatures: { jsx: true }, // Hỗ trợ JSX (cú pháp đặc biệt của React)
        sourceType: 'module', // Hỗ trợ kiểu module (import/export)
      },
    },

    // Các thiết lập dành riêng cho React
    settings: { 
      react: { version: '18.3' }, // Chỉ định phiên bản React (ở đây là phiên bản 18.3)
    },

    // Các plugin được sử dụng để thêm quy tắc kiểm tra
    plugins: {
      react, // Plugin dành cho React
      'react-hooks': reactHooks, // Plugin dành cho React Hooks
      'react-refresh': reactRefresh, // Plugin dành cho Fast Refresh
    },

    // Quy tắc kiểm tra code (rules)
    rules: {
      // Sử dụng các quy tắc mặc định của ESLint cho JavaScript
      ...js.configs.recommended.rules,

      // Sử dụng các quy tắc mặc định của plugin React
      ...react.configs.recommended.rules,

      // Sử dụng các quy tắc dành riêng cho JSX runtime (React 17+)
      ...react.configs['jsx-runtime'].rules,

      // Sử dụng các quy tắc mặc định của plugin React Hooks
      ...reactHooks.configs.recommended.rules,

      // Tắt quy tắc kiểm tra `target="_blank"` trong các thẻ <a> của JSX
      // Vì mặc định, quy tắc này yêu cầu phải thêm `rel="noopener noreferrer"`
      'react/jsx-no-target-blank': 'off',

      // Bật cảnh báo khi bạn xuất (export) những thứ không phải component
      // Ví dụ: cảnh báo nếu export một hàm hoặc biến không phải là React component
      'react-refresh/only-export-components': [
        'warn', // Hiển thị cảnh báo
        { allowConstantExport: true }, // Cho phép xuất các hằng số
      ],
    },
  },
];
