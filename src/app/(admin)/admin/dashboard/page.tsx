/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      router.push("/login");
    } else {
      setAuthorized(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([
        fetch(`${BASE_URL}/orders`),
        fetch(`${BASE_URL}/products`),
      ]);

      const ordersRaw = await orderRes.json();
      const productsData = await productRes.json();

      // ✅ Handle both array response and wrapped { data: [] } response
      const ordersArray = Array.isArray(ordersRaw)
        ? ordersRaw
        : Array.isArray(ordersRaw?.data)
          ? ordersRaw.data
          : [];

      setOrders(ordersArray);
      setProducts(productsData);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setOrders([]); // ✅ Ensure orders stays an array on error
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) return null;

  /* ---------- Calculations ---------- */
  const totalProducts = products?.total ?? products?.data?.length ?? 0;
  const totalOrders = orders.length;

  // ✅ Safe reduce — orders is guaranteed to be an array now
  const revenue = orders.reduce(
    (sum, o) => sum + ((o.totalPrice ?? 0) + (o.deliveryCharge ?? 0)),
    0,
  );

  const pending = orders.filter(
    (o) => o.status?.toLowerCase() === "pending",
  ).length;

  const delivered = orders.filter(
    (o) => o.status?.toLowerCase() === "delivered",
  ).length;

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your admin panel</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card title="Total Products" value={totalProducts} icon={<Package />} />
        <Card title="Total Orders" value={totalOrders} icon={<ShoppingCart />} />
        <Card title="Revenue" value={`৳${revenue}`} icon={<TrendingUp />} />
        <Card title="Pending" value={pending} icon={<Clock />} />
        <Card title="Delivered" value={delivered} icon={<CheckCircle />} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <div className="space-y-4">
            {[...orders]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 10)
              .map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Card Component ---------- */
function Card({ title, value, icon }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="bg-orange-100 text-orange-500 p-3 rounded-xl">{icon}</div>
    </div>
  );
}

/* ---------- Order Item ---------- */
function OrderItem({ order }: any) {
  const status = order.status?.toLowerCase() ?? "";
  const statusColor =
    status === "pending"
      ? "bg-yellow-100 text-yellow-600"
      : status === "confirmed"
        ? "bg-green-100 text-green-600"
        : status === "shipped"
          ? "bg-orange-100 text-orange-600"
          : status === "delivered"
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-600";

  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div>
        <p className="font-semibold">{order.customerName}</p>
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs ${statusColor}`}>
          {order.status}
        </span>
        <p className="font-semibold">
          ৳{(order.totalPrice ?? 0) + (order.deliveryCharge ?? 0)}
        </p>
      </div>
    </div>
  );
}