import axios from "axios";

const API_URL = "http://localhost:8000/drivers"; // Thay đổi URL này theo backend của bạn

// Lấy thông tin tài xế
export const getDriver = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Cập nhật thông tin tài xế
export const updateDriver = async (driverData, token) => {
    try {
        const response = await axios.put(`${API_URL}/update`, driverData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Chuyển trạng thái tài xế
export const changeDriverStatus = async (token) => {
    try {
        const response = await axios.put(`${API_URL}/change-status`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Xóa tài xế
export const deleteDriver = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Lấy thông tin tài xế qua driver_id
export const getDriverInfo = async (driverId) => {
    try {
        const response = await axios.get(`${API_URL}/info/${driverId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Lấy danh sách mã đơn hàng hiện tại của tài xế
export const getDriverOrder = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/order`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Lấy tất cả đơn hàng của tài xế
export const getAllDriverOrders = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/all-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
