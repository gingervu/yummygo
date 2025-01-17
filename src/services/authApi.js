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

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/items", // Địa chỉ API từ FastAPI
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

// Lấy danh sách tất cả món ăn
export const fetchMenuItems = async () => {
    const response = await axiosInstance.get("/all");
    return response.data;
};

// Xóa món ăn
export const deleteMenuItem = async (itemId) => {
    await axiosInstance.delete(`/delete/${itemId}`);
};

// Cập nhật món ăn
export const updateMenuItem = async (itemId, updatedData) => {
    const response = await axiosInstance.put(`/update/${itemId}`, updatedData);
    return response.data;
};