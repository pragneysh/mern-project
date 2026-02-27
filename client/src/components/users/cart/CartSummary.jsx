import React from "react";

export default function CartSummary({ cart }) {
  return (
    <div className="cart-summary bg-white p-6 rounded-xl shadow-md w-full md:w-96">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-800">₹{cart.subtotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">GST</span>
        <span className="font-medium text-gray-800">₹{cart.gst}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Delivery</span>
        <span className="font-medium text-gray-800">₹{cart.delivery}</span>
      </div>

      <div className="flex justify-between items-center border-t pt-4 mb-4">
        <h3 className="text-lg font-bold text-gray-900">Total</h3>
        <h3 className="text-lg font-bold text-gray-900">₹{cart.total}</h3>
      </div>

      <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}