"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5004/cart/${user}`)
        .then((res) => setCart(res.data.items || []))
        .catch((err) => console.error("Error fetching cart", err));
    }
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const res = await axios.post("http://localhost:5004/cart/add", {
          userId: user,
          productId: product._id,
          quantity,
        });
        setCart(res.data.items || []);
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
    }
  };

  const deleteItem = async (productId) => {
    if (user) {
      try {
        const res = await axios.post("http://localhost:5004/cart/remove", {
          userId: user,
          productId,
        });
        setCart(res.data.items || []);
      } catch (error) {
        console.error("Error removing item", error);
      }
    } else {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await axios.post("http://localhost:5004/cart/clear", { userId: user });
        setCart([]);
      } catch (error) {
        console.error("Error clearing cart", error);
      }
    } else {
      setCart([]);
    }
  };

  const removeQuantity = async (productId, quantity = 1) => {
    if (!productId) {
      console.log("Product ID is required");
      return;
    }
  
    if (user) {
      try {
        const res = await axios.post("http://localhost:5004/cart/update", {
          userId: user,
          productId,
          quantity: -quantity, // Negative quantity to reduce
        });
        setCart(res.data.items || []);
      } catch (error) {
        console.error("Error reducing quantity", error);
      }
    } else {
      // Local state update (for guests)
      setCart((prevCart) => {
        const index = prevCart.findIndex((item) => item.productId._id === productId);
        if (index === -1) return prevCart;
  
        const item = prevCart[index];
        const newQuantity = item.quantity - quantity;
  
        if (newQuantity <= 0) {
          return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
        }
  
        return [
          ...prevCart.slice(0, index),
          { ...item, quantity: newQuantity },
          ...prevCart.slice(index + 1),
        ];
      });
    }
  };
  
// **Calculate total price**
const totalPrice = cart.reduce((acc, item) => {
  const price = item.productId?.sp ?? item.productId?.mrp ?? 0;
  return acc + price * item.quantity;
}, 0);



  return (
    <CartContext.Provider value={{ cart, addToCart, deleteItem, clearCart, totalPrice, removeQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
