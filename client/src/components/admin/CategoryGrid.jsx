import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryGrid = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div
            className="relative w-32 h-32 rounded-full bg-white shadow-md 
                       flex items-center justify-center overflow-hidden 
                       transition group-hover:scale-105 group-hover:shadow-xl"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition"
            />

            <div
              className="absolute flex gap-2 opacity-0 group-hover:opacity-100 
                         transition group-hover:scale-110 justify-center 
                         bg-white/60 p-2 rounded-full"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(cat);
                }}
                className="bg-white p-1 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
              >
                <FaEdit size={14} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(cat.id);
                }}
                className="bg-white p-1 rounded-full shadow hover:bg-red-500 hover:text-white transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>

          <p className="mt-3 text-lg font-medium text-gray-700 group-hover:text-red-600 transition text-center">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;