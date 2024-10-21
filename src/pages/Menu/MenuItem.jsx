import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item }) => {
    return (
        <div className="menu-item">
            <img src={item.item_image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
                <p className="menu-item-name">{item.item_name}</p>
                <p className="menu-item-price">{item.item_price_full}</p>
            </div>
        </div>
    );
};

export default MenuItem;
