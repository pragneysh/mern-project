import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";

export default function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setClicked(true);

    setTimeout(() => setClicked(false), 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      {/* ===== IMAGE (IMPORTANT - kept as hero) ===== */}
      <div className="relative">
        <img
          src={`${item.image}?w=600`}
          alt={item.name}
          className="w-full h-52 object-cover"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center text-sm shadow">
          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
          {item.rating}
        </div>
      </div>

      {/* ===== CONTENT LIKE ORDER CARD ===== */}
      <div className="p-5">

        {/* Item Name */}
        <h2 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h2>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">

          {/* Price */}
          <p className="text-xl font-bold text-gray-900">
            ₹{item.price}
          </p>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="relative bg-orange-500 hover:bg-orange-600 
            text-white px-5 py-2 rounded-xl flex items-center gap-2
            transition active:scale-95 overflow-hidden"
          >
            <ShoppingCart size={16} />
            Add

            {clicked && (
              <span className="absolute -top-4 right-4 text-green-300 font-bold animate-float">
                +1
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}