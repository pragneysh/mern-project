import { Menu, Bell } from "lucide-react";

export default function AdminNavbar({ setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-[#F4EFEA] border-b border-[#E5DED6] px-6 py-4">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-gray-700 hover:text-black"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          FoodieHub Admin
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-black">
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </button>

        {/* Admin Info */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            Admin
          </span>

          <div className="w-9 h-9 bg-orange-500 text-white flex items-center justify-center rounded-full text-sm font-semibold">
            A
          </div>
        </div>

      </div>
    </header>
  );
}