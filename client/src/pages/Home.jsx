import { Link } from "react-router-dom";
import { getCategories, menuItems } from "../data/menuData";
import CategoryList from "../components/users/menu/CategoryList";
import MenuGrid from "../components/users/menu/MenuGrid";

export default function Home() {
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
              Experience premium quality meals made with love and delivered fast.
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

      {/* ================= CATEGORIES ================= */}
      <section className="pt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Browse Categories
          </h2>

          <CategoryList
            categories={getCategories().filter((cat) => cat.name !== "All")}
          />
        </div>
      </section>

      {/* ================= POPULAR DISHES ================= */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Popular Dishes
          </h2>

          <p className="text-gray-600 text-center mb-12">
            Check out our most popular dishes.
          </p>

          <MenuGrid items={menuItems.slice(0, 8)} />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="Fresh"
                className="w-16 mx-auto mb-5"
              />
              <h4 className="font-semibold text-lg mb-3">Fresh Ingredients</h4>
              <p className="text-gray-600 text-sm">
                Only the best and organic products used daily.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                alt="Delivery"
                className="w-16 mx-auto mb-5"
              />
              <h4 className="font-semibold text-lg mb-3">Fast Delivery</h4>
              <p className="text-gray-600 text-sm">
                Hot and fresh food delivered in under 30 mins.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                alt="Chef"
                className="w-16 mx-auto mb-5"
              />
              <h4 className="font-semibold text-lg mb-3">Expert Chefs</h4>
              <p className="text-gray-600 text-sm">
                Professional chefs with years of experience.
              </p>
            </div>

          </div>
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