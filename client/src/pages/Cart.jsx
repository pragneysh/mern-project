import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/users/cart/CartItem";
import CartSummary from "../components/users/cart/CartSummary";
import { ShoppingCart } from "lucide-react";


export default function Cart() {
  const { cartItems } = useCart();

  if (!cartItems) return <p>Loading...</p>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const gst = +(subtotal * 0.05).toFixed(2);
  const delivery = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + gst + delivery;

  const cartData = { subtotal, gst, delivery, total };

  return (
    <div className="min-h-screen px-3 py-4 md:p-8 container mx-auto">
      <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-orange-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Your cart is empty.
        </p>
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
            <CartSummary cart={cartData} />
          </div>

        </div>
      )}
    </div>
  );
}