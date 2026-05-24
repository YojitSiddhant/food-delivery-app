"use client";

import { useState } from "react";

import Navbar from "../../../components/Navbar";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Siddhant",
      total: 549,
      status: "Preparing",
    },
    {
      id: 2,
      customer: "Rahul",
      total: 299,
      status: "Delivered",
    },
  ]);

  const updateStatus = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                order.status === "Preparing"
                  ? "Delivered"
                  : "Preparing",
            }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">
          Order Management
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500 mt-2">
                  Customer: {order.customer}
                </p>

                <p className="text-gray-500">
                  Total: ₹{order.total}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-white font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {order.status}
                </span>

                <button
                  onClick={() =>
                    updateStatus(order.id)
                  }
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}