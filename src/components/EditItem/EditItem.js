import React from 'react';
import "./EditItem.css"

const EditItem = ({ name, description, price}) => {
    
    return (
        <div className="edit-item">
            
            <div className="edit-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <span>{price} VNĐ</span>
            </div>
            <div className='edit-button'>
                <button className='edit-btn'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M14 25.9001H25.2M17.5 5.60005L22.4 9.80005M4.90005 18.2001L18.7033 3.91471C20.1895 2.4285 22.5992 2.42849 24.0854 3.91471C25.5716 5.40093 25.5716 7.81056 24.0854 9.29678L9.80005 23.1001L2.80005 25.2001L4.90005 18.2001Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></button>
                <button className='delete-btn'>✖</button>
            </div>
            
        </div>
    );
};

export default EditItem;