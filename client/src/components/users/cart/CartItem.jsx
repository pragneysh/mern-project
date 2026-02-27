import React from "react";
import { useCart } from "../../../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div
      className="
        bg-white rounded-2xl shadow-md overflow-hidden
        sm:flex sm:items-center sm:p-4 sm:gap-4
        mb-4
      "
    >
      {/* Image */}
      <div className="w-full sm:w-24 sm:h-24">
        <img
          src={item.image}
          alt={item.name}
          className="
            w-full h-44 sm:h-24
            object-cover
            sm:rounded-xl
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-0 flex-1">

        {/* Name + Price */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800 text-base">
            {item.name}
          </h4>

          <p className="font-bold text-gray-900">
            ₹{item.price * item.quantity}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-3">

          {/* Quantity */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
            <button
              onClick={() => updateQty(item.id, "decrease")}
              className="px-2 text-lg font-bold"
            >
              −
            </button>

            <span className="px-2 text-lg text-orange-500 font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQty(item.id, "increase")}
              className="px-2 text-lg font-bold"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-sm font-medium"
          >
            Remove
          </button>

        </div>
      </div>
    </div>
  );
}