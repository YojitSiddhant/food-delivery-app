"use client";

import { useState } from "react";

import Navbar from "../../../components/Navbar";

export default function AdminFoodsPage() {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      price: 199,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 349,
    },
  ]);

  const [foodName, setFoodName] =
    useState("");

  const [foodPrice, setFoodPrice] =
    useState("");

  const addFood = () => {
    if (!foodName || !foodPrice) return;

    const newFood = {
      id: Date.now(),
      name: foodName,
      price: foodPrice,
    };

    setFoods([...foods, newFood]);

    setFoodName("");
    setFoodPrice("");
  };

  const deleteFood = (id) => {
    setFoods(
      foods.filter((food) => food.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 sm:text-4xl sm:mb-10">
          Food Management
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Add Food
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) =>
                setFoodName(e.target.value)
              }
              className="p-4 border rounded-xl"
            />

            <input
              type="number"
              placeholder="Price"
              value={foodPrice}
              onChange={(e) =>
                setFoodPrice(e.target.value)
              }
              className="p-4 border rounded-xl"
            />

            <button
              onClick={addFood}
              className="bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
            >
              Add Food
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white p-5 rounded-2xl shadow-md flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  {food.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  ₹{food.price}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteFood(food.id)
                }
                className="w-full bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition sm:w-auto"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
