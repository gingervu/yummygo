import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderList.css";

const OrderList = ({ orders, basePath }) => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleButtonClick = (id) => {
    navigate(`${basePath}/${id}`); // Điều hướng đến trang /
  };
  
  return (
    <table className="order-list">
      <thead>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tổng tiền</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.order_id}>
            <td>{order.order_id}</td>
            <td>{order.food_fee}</td>
            <td>
              <button className="detail-btn" onClick={() => handleButtonClick(order.order_id)}>Chi tiết đơn hàng</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
