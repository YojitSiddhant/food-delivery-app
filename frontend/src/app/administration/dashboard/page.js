"use client";

import Navbar from "../../../components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Total Orders
            </h2>

            <p className="text-5xl font-bold mt-4">
              24
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Total Foods
            </h2>

            <p className="text-5xl font-bold mt-4">
              12
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Revenue
            </h2>

            <p className="text-5xl font-bold mt-4">
              ₹12K
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}