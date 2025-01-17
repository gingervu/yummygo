import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // URL của API backend
  withCredentials: true, // Cho phép gửi cookie
});

// Thêm interceptor để tự động thêm token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để lưu token mới từ response nếu có
axiosInstance.interceptors.response.use(
  (response) => {
    // Kiểm tra nếu response có header chứa token mới
    const newToken = response.headers["authorization"];
    if (newToken) {
      // Lưu token mới vào localStorage (bỏ tiền tố Bearer nếu có)
      const tokenValue = newToken.startsWith("Bearer ") ? newToken.slice(7) : newToken;
      localStorage.setItem("access_token", tokenValue);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
