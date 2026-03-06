import MenuCard from "./MenuCard";
import { useNavigate } from "react-router-dom";

export default function MenuGrid({ items, onEdit, onDelete }) {
  const navigate = useNavigate();
  
  if (items.length === 0)
    return (
      <div
        className="flex flex-col items-center justify-center 
                  text-center mt-16 px-4"
      >
        {/* Icon */}
        <div className="text-6xl mb-4 animate-float">🍽️</div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Nothing Cooking Here!
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base max-w-md mb-6">
          We couldn’t find any delicious items in this category. Try exploring
          other menu options.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-2.5 rounded-full
                 bg-gradient-to-r from-orange-500 to-orange-600
                 text-white font-semibold
                 shadow-md
                 hover:scale-105 transition-all duration-300"
        >
          View Full Menu 🍕
        </button>
      </div>
    );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
