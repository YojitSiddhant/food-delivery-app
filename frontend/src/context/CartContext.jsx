"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food) => {
    const userInfoRaw =
      typeof window !== "undefined"
        ? localStorage.getItem("userInfo")
        : null;

    let token = null;
    if (userInfoRaw) {
      try {
        token = JSON.parse(userInfoRaw)?.token;
      } catch {
        token = null;
      }
    }

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
