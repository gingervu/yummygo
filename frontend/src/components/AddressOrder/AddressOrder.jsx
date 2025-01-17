import React, { useState } from 'react';
import axiosInstance from '../../services/axiosConfig';

const AddressOrder = ({ orderId, onAddressUpdated }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('access_token');

  // Tìm kiếm địa chỉ qua API
  const searchAddress = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/address/search', {
        params: { address: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm địa chỉ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Gán địa chỉ cho đơn hàng qua API
  const setAddressForOrder = async (address) => {
    if (!orderId || !address) {
      alert('Vui lòng chọn địa chỉ.');
      return;
    }

    try {
      const response = await axiosInstance.put(
        '/address/order-set',
        {
          address_choice: address,
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Địa chỉ đã được cập nhật thành công!');
      setSelectedAddress(address);
      onAddressUpdated && onAddressUpdated(address); // Gọi callback nếu có
    } catch (error) {
      console.error('Lỗi khi gán địa chỉ cho đơn hàng:', error);
      alert('Không thể gán địa chỉ. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h3>Tìm kiếm và chọn địa chỉ</h3>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập địa chỉ..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={searchAddress} disabled={isLoading}>
          {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </div>

      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => setAddressForOrder(suggestion)}
            style={{
              cursor: 'pointer',
              padding: '5px',
              backgroundColor: selectedAddress === suggestion ? '#e0e0e0' : '',
            }}
          >
            {suggestion.address}
          </li>
        ))}
      </ul>

      {selectedAddress && (
        <div>
          <h4>Địa chỉ đã chọn:</h4>
          <p>{selectedAddress.address}</p>
        </div>
      )}
    </div>
  );
};

export default AddressOrder;
