import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import Cookies from "js-cookie";

export default function CartSummary({ cart, cartItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const { clearCart } = useCart();

  const handleOrderPlacement = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    if (!mobile || mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const orderPayload = {
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      mobile,
      cart,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/order/confirm-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify(orderPayload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Order failed");
      }

      const result = await response.json();

      alert(`Order Placed! Order No: ${result.orderNumber}`);

      clearCart(); 
      setIsModalOpen(false);
      setMobile("");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message);
    }
  };

  return (
    <>
      {/* ================= Summary Card ================= */}
      <div className="cart-summary bg-white p-5 sm:p-6 rounded-2xl shadow-md w-full md:w-96">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
          Order Summary
        </h2>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-800">₹{cart.subtotal}</span>
        </div>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span className="text-gray-600">GST</span>
          <span className="font-medium text-gray-800">₹{cart.gst}</span>
        </div>

        <div className="flex justify-between items-center border-t pt-4 mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Total
          </h3>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            ₹{cart.total}
          </h3>
        </div>

        <button
          className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
          onClick={handleOrderPlacement}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* ================= Responsive Modern Modal ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Modal Container */}
          <div
            className="bg-white w-full sm:w-[92%] sm:max-w-md 
                          rounded-t-3xl sm:rounded-3xl 
                          p-5 sm:p-6 
                          shadow-2xl 
                          animate-slideUp
                          max-h-[95vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Confirm Your Order
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="h-px bg-gray-200 mb-4" />

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-orange-50 to-gray-100 rounded-2xl p-4 mb-5 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{cart.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">GST</span>
                <span className="font-medium">₹{cart.gst}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-bold text-base">
                <span className="text-orange-600">Total</span>
                <span className="text-orange-600">₹{cart.total}</span>
              </div>
            </div>

            {/* Mobile Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 
                           focus:outline-none focus:ring-2 focus:ring-orange-500 
                           transition text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-1/2 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmOrder}
                disabled={mobile.length !== 10}
                className={`w-full sm:w-1/2 py-2.5 rounded-xl text-white font-semibold transition
                ${
                  mobile.length === 10
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
