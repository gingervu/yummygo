import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OrderMap = ({ restaurantLocation, customerLocation }) => {
  return (
    <MapContainer
      center={restaurantLocation}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={restaurantLocation}>
        <Popup>Restaurant Location</Popup>
      </Marker>
      <Marker position={customerLocation}>
        <Popup>Customer Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default OrderMap;
