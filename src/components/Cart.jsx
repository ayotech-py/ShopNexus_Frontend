import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (carts) => {
        setCart([...carts]);
    };

    const updateCart = (newCart) => {
        setCart([...newCart]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
