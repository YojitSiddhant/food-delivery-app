const categories = [
  "All",
  "Burger",
  "Pizza",
  "Biryani",
  "Pasta",
];

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`px-5 py-2 rounded-full font-medium transition ${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;