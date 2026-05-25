"use client";

import Navbar from "../../components/Navbar";

export default function OrdersPage() {
  const orders = [
    {
      id: 1,
      total: 549,
      status: "Preparing",
    },
    {
      id: 2,
      total: 299,
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 sm:text-4xl sm:mb-10">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500 mt-2">
                  Total Amount: ₹{order.total}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-white font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
