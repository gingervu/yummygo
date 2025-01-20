
import React from "react";
import Modal from "react-modal";
import OrderItems from "../OrderItems/OrderItems"; // Import component OrderItems

// Thiết lập root element cho modal
Modal.setAppElement('#root');

const OrderItemsModal = ({ isOpen, onRequestClose, items }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Items"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Lịch sử đơn hàng</h2>
            <OrderItems items={items} />
            <button onClick={onRequestClose} className="close-modal-btn">Đóng</button>
        </Modal>
    );
};

export default OrderItemsModal;
