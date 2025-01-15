import axios from "axios";

// Cấu hình Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // URL gốc của API
  timeout: 10000, // Thời gian chờ tối đa (ms)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Thêm token vào mỗi request (nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi từ response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;