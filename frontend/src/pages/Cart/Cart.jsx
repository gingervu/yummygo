import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách món trong giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/items/all'); // Thay bằng endpoint API phù hợp
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Hàm xử lý cập nhật số lượng món ăn
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/items/update/${itemId}`, { quantity: newQuantity }); // Thay endpoint nếu cần
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.item_id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Hàm xử lý xóa món khỏi giỏ hàng
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/items/delete`, { data: { item_id: itemId } }); // Thay endpoint nếu cần
      setCartItems((prevItems) => prevItems.filter((item) => item.item_id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h1>Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Tên món</th>
              <th>Hình ảnh</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.item_id}>
                <td>{item.name}</td>
                <td>
                  <img src={item.img_url} alt={item.name} className="cart-item-img" />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.item_id, parseInt(e.target.value))}
                  />
                </td>
                <td>{item.price.toLocaleString()} VND</td>
                <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.item_id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
