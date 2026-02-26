import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Pizza", "Burger", "Drinks", "Dessert"];

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      rating: 4.5,
      image:
        "https://img.freepik.com/premium-photo/pizza-with-cheese-tomatoes_807701-1693.jpg",
    },
    {
      id: 2,
      name: "Cheese Burger",
      category: "Burger",
      price: 199,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 3,
      name: "Cold Coffee",
      category: "Drinks",
      price: 149,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      id: 4,
      name: "Chocolate Brownie",
      category: "Dessert",
      price: 179,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    return (
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Our Menu</h1>

        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search food..."
            className="border px-4 py-2 rounded-lg w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={`${item.image}?w=400`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>

              <div className="flex items-center text-yellow-500 mt-1">
                <Star size={16} />
                <span className="ml-1 text-sm text-gray-600">
                  {item.rating}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold">₹{item.price}</p>

                <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No items found.
        </p>
      )}
    </div>
  );
}