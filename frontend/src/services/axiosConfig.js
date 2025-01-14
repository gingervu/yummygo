import axios from "axios";

// Cấu hình Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // URL gốc của API
  timeout: 10000, // Thời gian chờ tối đa (ms)
  headers: {
    "Content-Type": "application/json", // Kiểu dữ liệu
    Accept: "application/json",
  },
});

// Interceptor: Thêm token vào mỗi request (nếu cần)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Xử lý lỗi từ response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Xử lý lỗi trả về từ server
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Lỗi không nhận được phản hồi từ server
      console.error("No response received:", error.request);
    } else {
      // Các lỗi khác
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
