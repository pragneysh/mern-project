import React, { useEffect, useState } from "react";
import { Package, CalendarDays, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import OrdersTable from "../components/admin/dashboard/OrdersTable";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/order/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-600";
      case "Preparing":
        return "bg-yellow-100 text-yellow-700";
      case "Out For Delivery":
        return "bg-blue-100 text-blue-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="text-orange-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="text-7xl mb-6">📦🧾🍔</div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              No Orders Yet!
            </h2>

            <p className="text-gray-500 max-w-md text-sm sm:text-base mb-6">
              You haven't placed any orders yet. Browse the menu and order your
              favorite dishes to get started!
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="px-8 py-3 rounded-full
              bg-gradient-to-r from-orange-500 to-orange-600
              text-white font-semibold
              shadow-lg
              hover:scale-105 hover:shadow-xl
              transition-all duration-300"
            >
              Order Now 🍽
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <OrdersTable statusFilter={""} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
