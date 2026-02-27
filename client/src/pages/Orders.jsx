import React from "react";
import { Package, CalendarDays, CreditCard } from "lucide-react";

const orders = [
  {
    id: "ORD12345",
    date: "26 Feb 2026",
    total: 540,
    status: "Delivered",
    payment: "UPI",
    items: [
      { name: "Veg Pizza", qty: 2 },
      { name: "Cold Drink", qty: 1 },
    ],
  },
  {
    id: "ORD12346",
    date: "25 Feb 2026",
    total: 320,
    status: "Preparing",
    payment: "Cash",
    items: [{ name: "Burger", qty: 2 }],
  },
];

export default function Orders() {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Preparing":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100">
      {/* Container */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="text-orange-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
            <Package size={60} className="mb-4 opacity-40" />
            <p className="text-lg">No orders yet 🍕</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Top */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
                  <div>
                    <p className="font-bold text-xl text-gray-800">
                      Order #{order.id}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <CalendarDays size={16} />
                      {order.date}
                    </div>
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold mt-3 md:mt-0 ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-gray-700 text-sm"
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">× {item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CreditCard size={16} />
                      {order.payment}
                    </div>

                    <p className="text-xl font-bold text-orange-600 mt-1">
                      ₹{order.total}
                    </p>
                  </div>

                  <button className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:scale-105 transition transform shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
