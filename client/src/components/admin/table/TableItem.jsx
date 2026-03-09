import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import Cookies from "js-cookie";

export default function TableItem({
  table,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
}) {
  const isAdmin = Cookies.get("isAdmin") === "true";

  const getImage = (type) => {
    switch (type) {
      case "round":
        return "/tables/round-table.png";
      case "square":
        return "/tables/square-table.png";
      case "long":
        return "/tables/long-table.png";
      default:
        return "/tables/square-table.png";
    }
  };

  return (
    <div
      className={`group text-center ${isAdmin ? "cursor-move" : "cursor-pointer"}`}
      onClick={() => {
        if (!isAdmin && onSelect) {
          onSelect(table.name);
        }
      }}
    >
      <div className="relative flex flex-col items-center">
        <img
          src={getImage(table.type)}
          alt={table.name}
          className="w-24 pointer-events-none drop-shadow-md transition-all duration-300 group-hover:scale-105"
        />

        {/* ADMIN HOVER CONTROLS */}
        {isAdmin && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded"></div>

            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(table);
                }}
                className="bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white"
              >
                <FaEdit size={15} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(table.id);
                }}
                className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white"
              >
                <FaTrash size={15} />
              </button>
            </div>
          </>
        )}

        {/* USER SELECT EFFECT */}
        {!isAdmin && isSelected && (
          <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center rounded">
            <FaCheck className="text-white text-2xl" />
          </div>
        )}
      </div>

      <p className="text-xs mt-1 bg-white px-2 py-0.5 rounded shadow">
        {table.name} ({table.capacity})
      </p>
    </div>
  );
}
