import React from "react";
import PropTypes from "prop-types"; // Import PropTypes để kiểm tra kiểu dữ liệu
import "./OrderItems.css";

function OrderItems({ items }) {
  // Kiểm tra nếu danh sách trống
  if (!items || items.length === 0) {
    return <p className="no-items">Không có sản phẩm trong đơn hàng.</p>;
  }

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <table className="order-items-table">
      <thead>
        <tr>
          <th className="item-name-header">Tên sản phẩm</th>
          <th className="item-price-header">Giá</th>
          <th className="item-quantity-header">Số lượng</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="item-name">{item.name}</td>
            <td className="item-price">{formatPrice(item.price)}</td>
            <td className="item-quantity">{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Kiểm tra kiểu dữ liệu đầu vào
OrderItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default OrderItems;
