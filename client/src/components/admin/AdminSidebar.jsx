import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </button>
      </div>

      <nav className="p-4 space-y-4">
        <Link to="/admin-dashboard" className="block hover:bg-gray-800 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/admin/orders" className="block hover:bg-gray-800 p-2 rounded">
          Orders
        </Link>
        <Link to="/admin/menu-items" className="block hover:bg-gray-800 p-2 rounded">
          Menu Items
        </Link>
        <a href="#" className="block hover:bg-gray-800 p-2 rounded">
          Customers
        </a>
        <a href="#" className="block hover:bg-gray-800 p-2 rounded">
          Reports
        </a>
        <a href="#" className="block hover:bg-gray-800 p-2 rounded">
          Settings
        </a>
      </nav>
    </div>
  );
}