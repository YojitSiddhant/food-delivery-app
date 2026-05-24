"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.id === food.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }

    toast.success("Item added to cart");
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
