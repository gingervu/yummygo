// /src/services/api.js
const API_URL = 'http://localhost:8000/customers'; // Thay thế bằng URL API server của bạn

// api.js
export const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};


// Hàm gọi API để lấy thông tin customer
export const getCustomer = async (token) => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customer data:', error);
    throw error;
  }
};

// Hàm gọi API để cập nhật thông tin customer
export const updateCustomer = async (token, customerData) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error('Failed to update customer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating customer data:', error);
    throw error;
  }
};

// Hàm gọi API để xóa customer
export const deleteCustomer = async (token) => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting customer data:', error);
    throw error;
  }
};

// Hàm gọi API để tạo đơn hàng
export const createOrder = async (token, orderId) => {
  try {
    const response = await fetch(`${API_URL}/send-order/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Hàm tìm kiếm nhà hàng và món ăn
export const searchRestaurantsAndItems = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching for restaurants/items:', error);
    throw error;
  }
};

// Hàm lọc nhà hàng theo category
export const filterRestaurantsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/filter?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to filter by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error filtering by category:', error);
    throw error;
  }
};

// Hàm lấy danh sách nhà hàng có phân trang
export const getPaginatedRestaurants = async (skip = 0, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/restaurants?skip=${skip}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to get restaurants');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching paginated restaurants:', error);
    throw error;
  }
};
