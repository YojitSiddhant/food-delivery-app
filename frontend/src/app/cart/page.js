"use client";

import Navbar from "../../components/Navbar";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } =
    useCart();

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 sm:text-4xl sm:mb-10">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add delicious food to continue.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl shadow-md flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-44 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Total</span>

                <span className="font-bold">
                  ₹{total}
                </span>
              </div>

              <button className="w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
