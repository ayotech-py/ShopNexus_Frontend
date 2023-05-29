import React from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Header = () => {
    return (
        <div className="header-section">
            <div className="app-name">
                <h1>ShopNexus</h1>
            </div>
            <div className="search">
                <input type="text" placeholder="fashion, electronics, phones, home" />
            </div>
            <button type="button" className="cart">
                <AiOutlineShoppingCart />
                <span>2</span>
            </button>
        </div>
    )
}

export default Header