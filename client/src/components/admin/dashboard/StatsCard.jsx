import { ShoppingCart, IndianRupee, Clock, Utensils } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">

      {/* Left */}
      <div>
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </h2>
      </div>

      {/* Icon */}
      {Icon && (
        <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
          <Icon size={22} />
        </div>
      )}

    </div>
  );
}