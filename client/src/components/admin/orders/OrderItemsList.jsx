export default function OrderItemsList({ items }) {
  return (
    <div className="space-y-3">
      {items?.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
        >
          <div>
            <p className="font-medium text-gray-800 text-sm">
              {item.item?.name}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Qty: {item.quantity}
            </p>
          </div>

          <span className="text-sm font-semibold text-gray-700">
            ₹{item.price}
          </span>
        </div>
      ))}
    </div>
  );
}