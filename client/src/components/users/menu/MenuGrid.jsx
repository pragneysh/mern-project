import MenuCard from "./MenuCard";

export default function MenuGrid({ items }) {
  if (items.length === 0)
    return (
      <p className="text-center mt-12 text-gray-500">
        No items found.
      </p>
    );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}