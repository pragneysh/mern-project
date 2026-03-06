import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrdersGrid from "../orders/OrdersGrid";
import OrderModal from "../orders/OrderModal";

export default function OrdersTable( { statusFilter } ) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const token = Cookies.get("access_token");

    const res = await fetch("http://localhost:3000/order/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setOrders(Array.isArray(data) ? data : data.data || []);
  };

  useEffect(() => {
    fetchOrders();  //eslint-disable-line
  }, []);

  const updateStatus = async (orderId, status) => {
    const token = Cookies.get("access_token");

    await fetch(
      `http://localhost:3000/order/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
    );

    setSelectedOrder((prev) =>
      prev ? { ...prev, status } : null
    );
  };

  return (
    <>
      <OrdersGrid
        orders={orders}
        onOpenOrder={setSelectedOrder}
        statusFilter={statusFilter}
      />

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={updateStatus}
        />
      )}
    </>
  );
}