"use client";

import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import Image from "next/image";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  size?: string | null; // ✅ optional size
  items: OrderItem[];
  totalPrice: number;
  deliveryCharge: number;
  status: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  images: string[];
};

export default function OrdersPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) =>
        setOrders(Array.isArray(data) ? data : (data?.data ?? []))
      )
      .catch(console.error);

    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data.data) ? data.data : []))
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductImage = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    return product?.images?.[0];
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const formattedStatus =
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();

      const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: formattedStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedOrder: Order = await res.json();

      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );

      if (selectedOrder?._id === updatedOrder._id) {
        setSelectedOrder(updatedOrder);
      }

      alert(`Order status updated to ${formattedStatus} ✅`);
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-1">Orders</h2>
      <p className="text-gray-500 mb-6">{orders.length} total orders</p>

      {/* Orders List */}
      <div className="space-y-4">
        {[...orders]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border p-5 flex justify-between items-center shadow-sm"
            >
              {/* Left */}
              <div>
                <h3 className="font-semibold">{order.customerName}</h3>
                <p className="text-sm text-gray-500">{order.phone}</p>
                <p className="text-sm text-gray-500">{order.address}</p>
                {/* ✅ Show size in list if present */}
                {order.size && (
                  <p className="text-sm text-gray-500">Size: <span className="font-medium text-gray-700">{order.size}</span></p>
                )}
                <p className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()} •{" "}
                  <span
                    className={`font-semibold ${
                      order.deliveryCharge <= 60
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.deliveryCharge <= 60 ? "Dhaka" : "Outside Dhaka"}
                  </span>
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-orange-500">
                  ৳{order.totalPrice}
                </p>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={`border rounded-lg px-3 py-1 text-sm bg-gray-50 ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Confirmed"
                        ? "text-green-600"
                        : order.status === "Shipped"
                          ? "text-orange-600"
                          : order.status === "Delivered"
                            ? "text-blue-600"
                            : "text-gray-600"
                  }`}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-125 max-w-[95%] rounded-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{selectedOrder.customerName}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">{selectedOrder.phone}</p>
              </div>

              <div className="col-span-2 bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold">{selectedOrder.address}</p>
              </div>

              {/* ✅ Size — only shown if present */}
              {selectedOrder.size && (
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-semibold">{selectedOrder.size}</p>
                </div>
              )}

              <div className={`bg-gray-100 p-3 rounded ${selectedOrder.size ? "" : ""}`}>
                <p className="text-sm text-gray-500">Area</p>
                <p
                  className={`font-semibold ${
                    Number(selectedOrder.deliveryCharge) <= 60
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {Number(selectedOrder.deliveryCharge) <= 60
                    ? "Dhaka"
                    : "Outside Dhaka"}
                </p>
              </div>

              {/* Status */}
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={`font-semibold px-2 py-1 rounded-full ${
                    selectedOrder.status === "Pending"
                      ? "text-yellow-600"
                      : selectedOrder.status === "Confirmed"
                        ? "text-green-600"
                        : selectedOrder.status === "Shipped"
                          ? "text-orange-600"
                          : selectedOrder.status === "Delivered"
                            ? "text-blue-600"
                            : "text-gray-600"
                  }`}
                >
                  {selectedOrder.status}
                </p>
              </div>
            </div>

            {/* Items */}
            <h3 className="font-semibold mb-2">Order Items</h3>

            <div className="space-y-3 border-t pt-3">
              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={
                          getProductImage(item.productId) || "/placeholder.jpg"
                        }
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover border"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      {/* ✅ Show size per item */}
                      {selectedOrder.size && (
                        <p className="text-xs text-gray-500">
                          Size: {selectedOrder.size}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <p className="text-sm font-medium">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t mt-4 pt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ৳{selectedOrder.totalPrice - selectedOrder.deliveryCharge}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>৳{selectedOrder.deliveryCharge}</span>
              </div>

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-orange-500">
                  ৳{selectedOrder.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}