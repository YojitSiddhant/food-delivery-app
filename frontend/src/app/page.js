"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import LoginRequired from "../components/LoginRequired";

import dummyFoods from "../utils/dummyFoods";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredFoods = dummyFoods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold">
          Delicious Food Delivered Fast
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Order your favorite meals anytime, anywhere.
        </p>

        <button className="mt-6 bg-orange-500 px-6 py-3 rounded-lg text-lg hover:bg-orange-600 transition">
          Explore Menu
        </button>
      </section>

      {isLoggedIn ? (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Popular Dishes
          </h2>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </section>
      ) : (
        <LoginRequired />
      )}
      <Footer />
    </div>
  );
}
