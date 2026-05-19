"use client";
// app/track-order/page.tsx
// trackOrdersByPhone is called client-side after user submits phone
// So we use cache: "no-store" — revalidate only works in Server Components

import { useState } from "react";
import { MapPin, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const STATUS_CONFIG = {
  Pending:   { icon: Clock,        color: "text-yellow-500", bg: "bg-yellow-50",  label: "Pending" },
  Confirmed: { icon: CheckCircle,  color: "text-green-500",  bg: "bg-green-50",   label: "Confirmed" },
  Shipped:   { icon: Truck,        color: "text-orange-500", bg: "bg-orange-50",  label: "Shipped" },
  Delivered: { icon: Package,      color: "text-blue-500",   bg: "bg-blue-50",    label: "Delivered" },
} as const;

type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  deliveryCharge: number;
  status: keyof typeof STATUS_CONFIG;
  createdAt: string;
};

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid Bangladeshi phone number (e.g. 01712345678)");
      return;
    }

    setError("");
    setLoading(true);
    setSearched(false);

    try {
      // ✅ cache: "no-store" — always fresh, user expects real-time tracking
      const res = await fetch(`${BASE_URL}/orders/track/${phone}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container max-w-2xl py-12 px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <MapPin className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your phone number to see all your orders</p>
        </div>

        {/* Search */}
        <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex gap-3">
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="flex-1 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <Button
              onClick={handleTrack}
              disabled={loading || !phone}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6"
            >
              {loading ? "Searching..." : "Track"}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Results */}
        {searched && (
          orders.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border">
              <Package className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No orders found for this number</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Make sure you entered the correct phone number</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">{orders.length} order{orders.length > 1 ? "s" : ""} found</p>
              {orders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
                const Icon = cfg.icon;
                return (
                  <div key={order._id} className="bg-card border rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString("en-BD", {
                            year: "numeric", month: "short", day: "numeric"
                          })}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="border-t pt-3 space-y-1 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                          <span>৳{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-sm text-muted-foreground">Delivery: ৳{order.deliveryCharge}</span>
                      <span className="font-bold text-orange-500">Total: ৳{order.totalPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}