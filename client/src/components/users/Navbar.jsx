import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const token = Cookies.get("access_token");
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = 2; // later connect with cart state

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          🍽 FoodieHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-gray-300 transition">
            Menu
          </Link>
          <Link to="/orders" className="hover:text-gray-300 transition">
            Orders
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          {!token ? (
          <Link
            to="/login"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>) : (
            <Link
            to="/logout"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Logout
          </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4 space-y-4">
          <Link
            to="/"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/orders"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Cart ({cartCount})
          </Link>
          {!token ? (
            <Link
              to="/login"
              className="block bg-white text-black text-center py-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <Link
              to="/logout"
              className="block bg-white text-black text-center py-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}