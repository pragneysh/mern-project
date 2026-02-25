const CategoryGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="w-32 h-32 rounded-full bg-white shadow-md 
                          flex items-center justify-center 
                          overflow-hidden transition 
                          group-hover:scale-105 group-hover:shadow-xl">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-fit transition"
            />
          </div>

          <p className="mt-3 text-lg font-medium text-gray-700 group-hover:text-red-600 transition">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;