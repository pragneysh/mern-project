import { Calendar, Phone } from "lucide-react";
import { ORDER_STATUSES } from "../../../config/orderStatus";

export default function OrderCard({ order, onOpen }) {
  const statusConfig = ORDER_STATUSES.find((s) => s.value === order.status);

  return (
    <div className="bg-[#F8F5F2] rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-sm text-gray-800">
            {order.orderNumber}
          </h2>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <Calendar size={12} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>

        <span
          className={`px-2 py-0.5 text-[11px] rounded-full font-medium ${statusConfig?.color}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-xs text-gray-700 pb-2">
        {order.items?.slice(0, 2).map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="truncate">{item.item?.name}</span>
            <span className="text-gray-500">× {item.quantity}</span>
          </div>
        ))}

        {order.items?.length > 2 && (
          <p className="text-xs text-gray-500">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-400">
        <div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Phone size={12} />
            {order.mobile}
          </div>

          <p className="text-sm font-semibold text-orange-600 mt-1">
            ₹{order.total}
          </p>
        </div>

        <button
          onClick={onOpen}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-md"
        >
          Details
        </button>
      </div>
    </div>
  );
}
