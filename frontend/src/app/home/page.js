"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import FoodCard from "../../components/FoodCard";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import Footer from "../../components/Footer";
import { useAuth } from "../../hooks/useAuth";
import dummyFoods from "../../utils/dummyFoods";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

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
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Popular Dishes
        </h2>

        <SearchBar search={search} setSearch={setSearch} />

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

      <Footer />
    </div>
  );
}

