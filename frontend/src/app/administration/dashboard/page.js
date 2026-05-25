"use client";

import Navbar from "../../../components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 sm:text-4xl sm:mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Total Orders
            </h2>

            <p className="mt-4 text-4xl font-bold sm:text-5xl">
              24
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Total Foods
            </h2>

            <p className="mt-4 text-4xl font-bold sm:text-5xl">
              12
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">
              Revenue
            </h2>

            <p className="mt-4 text-4xl font-bold sm:text-5xl">
              ₹12K
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
