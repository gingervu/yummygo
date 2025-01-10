import React from "react";
import "./OrderItems.css";

function OrderItems({ items }) {
  return (
    <table className="order-items-table">
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="item-name">{item.name}</td>
            <td className="item-price">{item.price}</td>
            <td className="item-quantity">{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderItems;
