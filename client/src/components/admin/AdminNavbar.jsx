import { Menu } from "lucide-react";

export default function AdminNavbar({ setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-white shadow p-4">
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu size={24} />
      </button>

      <h1 className="text-xl font-semibold">
        Restaurant Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Admin</span>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </header>
  );
}