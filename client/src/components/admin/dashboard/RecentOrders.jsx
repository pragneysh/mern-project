import OrdersTable from "./OrdersTable";
import StatusDropdown from "../orders/StatusDropdown";
import { useState } from "react";

export default function RecentOrders() {
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>

        <StatusDropdown
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filter Status"
        />
      </div>

      {/* Table */}
      <div className="p-6">
        <OrdersTable statusFilter={statusFilter} />
      </div>
    </div>
  );
}
