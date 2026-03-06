import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryGrid = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5">

      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/admin/category-items/${cat.id}`}
          className="flex flex-col items-center group"
        >

          {/* Image */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white 
            border border-gray-200 shadow-sm flex items-center justify-center 
            overflow-hidden transition group-hover:shadow-md group-hover:scale-105"
          >

            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
            />

            {/* Edit/Delete overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center gap-2
              opacity-0 group-hover:opacity-100 transition bg-black/20"
            >

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(cat);
                }}
                className="bg-white p-1.5 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
              >
                <FaEdit size={12} />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(cat);
                }}
                className="bg-white p-1.5 rounded-full shadow hover:bg-red-500 hover:text-white transition"
              >
                <FaTrash size={12} />
              </button>

            </div>
          </div>

          {/* Name */}
          <p className="mt-2 text-sm font-medium text-gray-700 text-center group-hover:text-orange-600">
            {cat.name}
          </p>

        </Link>
      ))}

    </div>
  );
};

export default CategoryGrid;