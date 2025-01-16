import axios from "axios";

// Cấu hình Axios
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000", // URL gốc của API
//   timeout: 10000, // Thời gian chờ tối đa (ms)
//   headers: {
//     "Content-Type": "application/json", // Kiểu dữ liệu
//     Accept: "application/json",
//   },
// });

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // URL gốc của API
  timeout: 10000, // Thời gian chờ tối đa (ms)
  headers: {
    "Content-Type": "application/json", // Kiểu dữ liệu
    Accept: "application/json",
  },
  withCredentials: true, // Thêm dòng này để gửi cookie đi cùng yêu cầu
});
// axiosInstance.defaults.withCredentials = true;

// // Interceptor: Thêm token vào mỗi request (nếu có)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Lấy token từ cookie
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("access_token="))
//       ?.split("=")[1];  // Lấy giá trị token từ cookie

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Interceptor: Xử lý lỗi từ response
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Log thông tin chi tiết về lỗi
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//       console.error("API Error Status:", error.response.status);
//       console.error("API Error Headers:", error.response.headers);
//     } else if (error.request) {
//       // Lỗi không nhận được phản hồi từ server
//       console.error("No response received:", error.request);
//     } else {
//       // Các lỗi khác
//       console.error("Error setting up request:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;