// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";

interface ProductInOrder {
  title: string;
  quantity: number;
  price: number;
}

interface OrderItem {
  id: number;
  products?: ProductInOrder[]; // make optional
  total: number;
  date: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsed: OrderItem[] = JSON.parse(storedOrders);
        setOrders(parsed);
      } catch (err) {
        console.error("Failed to parse orders from localStorage", err);
      }
    }
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <p className="text-gray-700 text-2xl mb-4">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">My Orders ({orders.length})</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-6"
            >
              <p className="font-semibold mb-2">Order ID: {order.id}</p>
              <p className="text-gray-500 mb-2">Date: {order.date}</p>

              <div className="space-y-2">
                {order.products && order.products.length > 0 ? (
                  order.products.map((p, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{p.title} x {p.quantity}</span>
                      <span>${(p.price * p.quantity).toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No products in this order.</p>
                )}
              </div>

              <p className="font-bold mt-3">Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
