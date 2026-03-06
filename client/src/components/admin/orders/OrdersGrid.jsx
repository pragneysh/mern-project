import OrderCard from "./OrderCard";

export default function OrdersGrid({ orders, onOpenOrder, statusFilter }) {
  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  return (
    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredOrders.length === 0 && (
        <p className="text-gray-400 col-span-full text-center">
          No Orders Found
        </p>
      )}

      {filteredOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onOpen={() => onOpenOrder(order)}
        />
      ))}
    </div>
  );
}
