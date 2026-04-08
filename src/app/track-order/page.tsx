"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { trackOrdersByPhone } from "@/services/api";


const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

// Fake status steps
const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!BD_PHONE_REGEX.test(phone)) {
      alert("Enter valid phone number");
      return;
    }

    setLoading(true);

    try {
      const data = await trackOrdersByPhone(phone); // ✅ use service
      setOrders(data || []);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP SECTION */}
      <div className="relative bg-linear-to-r from-orange-50 via-white to-gray-100 py-20 text-center overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gray-300 rounded-full blur-3xl opacity-30"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Track Your <span className="text-orange-500">Order</span>
          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Enter your phone number to instantly check your order status
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center w-full max-w-xl bg-white shadow-xl rounded-full overflow-hidden border focus-within:ring-2 focus-within:ring-orange-400 transition">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="flex-1 px-6 py-4 outline-none text-sm md:text-base"
              />

              <div className="h-8 w-px bg-gray-200"></div>

              <button
                onClick={handleTrack}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 font-medium transition"
              >
                <Search size={18} />
                <span className="hidden sm:block">Track</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT */}
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {loading && <p>Loading...</p>}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-400">No orders found</p>
        )}

        {orders.map((order, i) => {
          const currentStep = getStepIndex(order.status);

          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="text-xs text-gray-500 break-all">
                    {order._id}
                  </p>
                </div>

                <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className={`h-2 rounded-full ${
                        index <= currentStep
                          ? "bg-orange-500"
                          : "bg-gray-200"
                      }`}
                    />
                    <p className="text-xs mt-1 text-center text-gray-500">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm pt-2">
                <div>
                  <p className="text-gray-400">Total</p>
                  <p className="text-orange-500 font-semibold">
                    ৳{order.totalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Date</p>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Delivery Address</p>
                <p className="text-sm">{order.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}