"use client";

import { Toaster } from "react-hot-toast";

import { CartProvider } from "../context/CartContext";

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </CartProvider>
  );
}

