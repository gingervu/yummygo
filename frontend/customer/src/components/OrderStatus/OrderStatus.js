import React, { useEffect, useState } from "react";

const OrderStatus = ({ orderId }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/orders/${orderId}`);

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => ws.close();
  }, [orderId]);

  const sendStatusUpdate = () => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/orders/${orderId}`);
    ws.onopen = () => ws.send(status);
  };

  return (
    <div>
      <h3>Order ID: {orderId}</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Enter new status"
      />
      <button onClick={sendStatusUpdate}>Send Status</button>
    </div>
  );
};

export default OrderStatus;
