import { Pizza, Hamburger } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <Pizza className="text-orange-500" size={28} />
        <Hamburger className="text-orange-500" size={28} />
        <h1 className="text-3xl font-bold text-gray-800">Our Menu</h1>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search food..."
        className="w-full sm:w-64 border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
    </div>
  );
}