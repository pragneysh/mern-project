import StatusDropdown from "./StatusDropdown";
import OrderItemsList from "./OrderItemsList";
import Cookies from "js-cookie";

export default function OrderModal({ order, onClose, onStatusChange }) {
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-300">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Order {order.orderNumber}
            </h2>
            <p className="text-xs text-gray-500">Order Details</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5">
          <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-3 shadow-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium text-gray-800">
                {order.user?.fullName || order.user?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Mobile</span>
              <span className="font-medium text-gray-800">{order.mobile}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800 text-right">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Status</span>

              {Cookies.get("isAdmin") === "true" ? (
                <StatusDropdown
                  value={order.status}
                  orderId={order.id}
                  onChange={onStatusChange}
                />
              ) : (
                <span
                  className={`px-2 py-0.5 text-[11px] rounded-full font-medium ${getStatusStyle(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Ordered Items
            </h3>

            <OrderItemsList items={order.items} />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-300">
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>

            <p className="text-xl font-bold text-orange-600">₹{order.total}</p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
