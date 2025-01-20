import React from 'react';
import Toggle from '../Toggle/Toggle';
import "./MenuItem.css"

const MenuItem = ({ name, description, price, checked, onChange }) => {
    
    return (
        <div className="menu-item">
            <img src="/assets/menu/bun.jpg" alt={name} className="menu-image" /> {/* Thêm ảnh */}
            <div className="menu-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <span>{price} VNĐ</span>
            </div>
            <div className='item-toggle'>
            <Toggle checked={checked} onChange={onChange} /> {/* Sử dụng Toggle */}
            </div>
        </div>
    );
};

export default MenuItem;
