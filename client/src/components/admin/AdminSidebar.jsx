import { X, LayoutDashboard, ShoppingBag, Utensils, Users, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const linkClass =
    "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition";

  const activeClass = "bg-gray-800";

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>

        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">

        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <ShoppingBag size={18} />
          Orders
        </NavLink>

        <NavLink
          to="/admin/menu-items"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Utensils size={18} />
          Menu Items
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Users size={18} />
          Customers
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <BarChart3 size={18} />
          Reports
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>
    </div>
  );
}