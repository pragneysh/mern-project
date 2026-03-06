import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/users/cart/CartItem";
import CartSummary from "../components/users/cart/CartSummary";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  if (!cartItems) return <p>Loading...</p>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );

  const gst = +(subtotal * 0.05).toFixed(2);
  const total = subtotal + gst;

  const cartData = { subtotal, gst, total };

  return (
    <div className="min-h-screen px-3 py-4 md:p-8 container mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-orange-500" size={28} />
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center 
                  text-center py-16 px-4"
        >
          {/* Food Illustration */}
          <div className="text-7xl mb-6 animate-float">🍕🍔🥗</div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Your Plate is Empty!
          </h2>

          {/* Description */}
          <p className="text-gray-500 max-w-md text-sm sm:text-base mb-6">
            Looks like you haven’t added any delicious items yet. Explore our
            menu and treat yourself to something tasty!
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/menu")}
            className="px-8 py-3 rounded-full
                 bg-gradient-to-r from-orange-500 to-orange-600
                 text-white font-semibold
                 shadow-lg
                 hover:scale-105 hover:shadow-xl
                 transition-all duration-300"
          >
            Explore Menu 🍽
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Sticky Summary (Mobile Friendly) */}
          <div className="lg:w-96">
            <CartSummary cart={cartData} cartItems={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
}
