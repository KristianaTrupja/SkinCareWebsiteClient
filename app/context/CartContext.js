"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
  
      if (existingItem) {
        // ✅ Return a new array with updated quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
  
      // ✅ Add new product to the cart
      return [...prevCart, { ...product, quantity }];
    });
  };
  
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.sp !== null ? item.sp * item.quantity : item.mrp * item.quantity),
    0
  );
  return (
    <CartContext.Provider value={{ cart, addToCart, totalPrice  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
