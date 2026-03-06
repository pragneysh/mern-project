import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getCategories, menuItems } from "../data/menuData";
import CategoryList from "../components/users/menu/CategoryList";
import MenuGrid from "../components/users/menu/MenuGrid";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  const filteredCategories = useMemo(
    () => categories.filter((cat) => cat.name !== "All"),
    [categories],
  );

  const handleCategoryClick = (selectedCategory) => {
    navigate(`/menu?category=${selectedCategory}`);
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-red-50 to-orange-100 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Delicious Food Delivered To Your Door
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Experience premium quality meals made with love and delivered
              fast.
            </p>
            <Link
              to="/menu"
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              Explore Menu
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Hero Food"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="pt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Browse Categories
          </h2>

          <CategoryList
            categories={filteredCategories}
            setCategory={handleCategoryClick}
          />
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Popular Dishes
          </h2>

          <MenuGrid items={menuItems.slice(0, 8)} />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready To Order Your Favorite Meal?
          </h2>
          <Link
            to="/menu"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
