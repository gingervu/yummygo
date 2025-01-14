import axiosInstance from "./axiosConfig";

const authApi = {
  // Đăng nhập
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Đăng ký
  signUp: async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Kiểm tra xác thực (ví dụ: lấy thông tin người dùng hiện tại)
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default authApi;
