import { ShoppingCart, Star } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";
import Cookies from "js-cookie";

export default function MenuCard({ item, onEdit, onDelete }) {
  const { addToCart } = useCart();
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setClicked(true);
    setTimeout(() => setClicked(false), 800);
  };

  // Convert cookie to proper boolean
  const isAdmin = Cookies.get("isAdmin") === "true";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      {/* ================= IMAGE ================= */}
      <div className="relative">
        <img
          src={`${item.image}?w=600`}
          alt={item.name}
          className="w-full h-52 object-cover"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center text-sm shadow">
          <Star
            size={14}
            className="text-yellow-500 mr-1"
            fill="currentColor"
          />
          {item.rating}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

        {item.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="border-t my-4"></div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">₹{item.price}</p>

          {/* ================= ROLE BASED ACTION ================= */}
          {isAdmin ? (
            <div className="flex gap-2">
              {/* ========== EDIT BUTTON ========== */}
              <button
                onClick={() => onEdit?.(item)}
                className="group relative bg-blue-500 hover:bg-blue-600 
                text-white p-2 rounded-lg transition 
                active:scale-95 shadow-sm hover:shadow-md"
              >
                <FaEdit size={15} />

                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 
                  bg-black text-white text-xs px-2 py-1 
                  rounded opacity-0 group-hover:opacity-100 
                  transition whitespace-nowrap"
                >
                  Edit Item
                </span>
              </button>

              {/* ========== DELETE BUTTON ========== */}
              <button
                onClick={() => onDelete?.(item)}
                className="group relative bg-red-500 hover:bg-red-600 
                text-white p-2 rounded-lg transition 
                active:scale-95 shadow-sm hover:shadow-md"
              >
                <FaTrash size={15} />

                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 
                  bg-black text-white text-xs px-2 py-1 
                  rounded opacity-0 group-hover:opacity-100 
                  transition whitespace-nowrap"
                >
                  Delete Item
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="relative bg-orange-500 hover:bg-orange-600 
              text-white px-5 py-2 rounded-xl flex items-center gap-2
              transition active:scale-95"
            >
              <ShoppingCart
                size={16}
                className={clicked ? "animate-bounce" : ""}
              />
              Add
              {clicked && (
                <span className="absolute right-3 bottom-2 text-white font-bold animate-floatUp pointer-events-none">
                  +1
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
