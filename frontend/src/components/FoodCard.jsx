"use client";

import { useCart } from "../context/CartContext";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {food.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {food.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-orange-500 font-bold text-lg">
            ₹{food.price}
          </span>

          <button
            onClick={() => addToCart(food)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;