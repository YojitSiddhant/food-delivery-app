"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    let isActive = true;
    Promise.resolve().then(() => {
      if (!isActive) return;
      setIsLoading(true);
      setErrorMessage("");
    });

    API.get("/orders")
      .then((res) => {
        if (!isActive) return;
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (!isActive) return;
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load orders.";
        setErrorMessage(message);
        setOrders([]);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [isLoggedIn, router]);

  const orderedByLatestFirst = useMemo(() => {
    return [...orders].sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
  }, [orders]);

  const getStatusClasses = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "delivered") return "bg-green-500";
    if (normalized === "cancelled" || normalized === "canceled")
      return "bg-red-500";
    if (normalized === "preparing") return "bg-orange-500";
    if (normalized === "pending") return "bg-orange-500";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 sm:text-4xl sm:mb-10">
          My Orders
        </h1>

        {isLoading ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center text-gray-700">
            Loading your orders...
          </div>
        ) : errorMessage ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-900">Could not load orders</h2>
            <p className="text-gray-600 mt-3">{errorMessage}</p>
          </div>
        ) : orderedByLatestFirst.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
            <p className="text-gray-600 mt-3">
              When you place an order, it will show up here.
            </p>
            <Link
              href="/home"
              className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-semibold"
            >
              Browse foods
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orderedByLatestFirst.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Total Amount: ₹{order.totalAmount}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white font-medium ${getStatusClasses(
                    order.status
                  )}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
