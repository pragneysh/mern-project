export default function CategoryList({
  categories,
  category,
  setCategory,
}) {
  return (
    <div className="overflow-x-auto mb-10 lg:flex lg:justify-center">
      <div
        className="
          grid grid-rows-2
          grid-flow-col
          gap-x-8 gap-y-6
          w-max
          p-5
        "
      >
        {categories.map((cat) => {
          const isActive = category === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Image */}
              <div
                className={`
                  w-24 h-24 rounded-2xl overflow-hidden
                  transition-all duration-300
                  ${
                    isActive
                      ? "ring-4 ring-orange-500 scale-105"
                      : "opacity-80 group-hover:scale-105"
                  }
                `}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <p
                className={`
                  mt-2 text-sm font-medium text-center
                  ${isActive ? "text-orange-600" : "text-gray-700"}
                `}
              >
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}