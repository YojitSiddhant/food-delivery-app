"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { cartItems } = useCart();
  const { isLoggedIn } = useAuth();

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">
            FoodieHub
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-orange-400 transition"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <Link
              href="/orders"
              className="hover:text-orange-400 transition"
            >
              Orders
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-orange-400 transition"
            >
              Login
            </Link>
          )}

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>
        </div>

        {/* Mobile Cart */}
        <div className="md:hidden">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
