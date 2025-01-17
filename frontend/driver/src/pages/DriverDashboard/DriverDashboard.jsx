import React from "react";
import OrderStatus from "./components/OrderStatus";
import OrderMap from "./components/OrderMap";

const DriverDashboard = () => {
  const restaurantLocation = [10.762622, 106.660172]; // Tọa độ nhà hàng
  const customerLocation = [10.77689, 106.700806]; // Tọa độ khách hàng
  const orderId = 1; // ID đơn hàng giả định

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <OrderStatus orderId={orderId} />
      <OrderMap
        restaurantLocation={restaurantLocation}
        customerLocation={customerLocation}
      />
    </div>
  );
};

export default DriverDashboard;