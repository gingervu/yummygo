import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import './CustomerInfo.css';

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axiosInstance.get('/customers/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        setCustomerInfo(response.data);
      } catch (error) {
        console.error('Error fetching customer info:', error);
        setError(error.response?.data?.detail || 'Có lỗi xảy ra.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="customer-info">
      <h1>Thông tin người dùng</h1>
      {customerInfo && (
        <div className="customer-details">
          <p><strong>Tên:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Số điện thoại:</strong> {customerInfo.phone_number}</p>
          <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
