import React from 'react';
import Toggle from '../Toggle/Toggle';
import "./MenuItem.css"

const MenuItem = ({ name, description, price, isToggled, onToggle }) => {
    
    return (
        <div className="menu-item">
            <img src="/assets/item/bun.jpg" alt={name} className="menu-image" /> {/* Thêm ảnh */}
            <div className="menu-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <span>{price} VNĐ</span>
            </div>
            <div className='item-toggle'>
            <Toggle toggled={isToggled} onToggle={onToggle} /> {/* Sử dụng Toggle */}
            </div>
        </div>
    );
};

export default MenuItem;
