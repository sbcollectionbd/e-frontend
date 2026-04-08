/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSingleProduct } from "@/services/api";
import { CheckCircle, MapPin, Truck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

export default function CheckoutPage() {
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    delivery_area: "dhaka",
  });

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("order");

    if (stored) {
      const parsed = JSON.parse(stored);
      setOrder(parsed);

      getSingleProduct(parsed.productId).then(setProduct);
    }
  }, []);

  // ❌ No product
  if (!order) return <div className="p-10">No product selected ❌</div>;
  if (!product) return <div className="p-10">Loading...</div>;

  const quantity = order.quantity;

  const subtotal = product.discountedPrice * quantity;
  const deliveryCharge = form.delivery_area === "dhaka" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  // ✅ Submit Order
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.customerName.trim()) return alert("Enter name");
    if (!BD_PHONE_REGEX.test(form.phone)) return alert("Invalid phone");
    if (!form.address.trim()) return alert("Enter address");

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: form.customerName,
            phone: form.phone,
            address: form.address,

            items: [
              {
                productId: product._id,
                name: product.name,
                price: product.discountedPrice,
                quantity,
              },
            ],

            totalPrice: total,
            deliveryCharge,
          }),
        },
      );

      const data = await res.json();

      setOrderId(data._id);

      // ✅ clear storage
      localStorage.removeItem("order");
    } catch (err) {
      alert("Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS UI
  if (orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        {/* Card */}
        <div className="bg-white shadow-lg rounded-3xl p-8 max-w-md w-full text-center space-y-5">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">Order Confirmed 🎉</h1>

          {/* Message */}
          <p className="text-gray-500 text-sm">
            Your order has been placed successfully. We will contact you shortly
            for confirmation.
          </p>

          {/* Status */}
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl">
            <p className="text-sm text-orange-600 font-medium">
              Status: Pending Confirmation
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {/* Track Order */}
            <button
              onClick={() => router.push("/track-order")}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold"
            >
              Track Your Order
            </button>

            {/* Back Home */}
            <button
              onClick={() => router.push("/")}
              className="border py-3 rounded-full font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
        {/* LEFT FORM */}
        <div className="lg:col-span-3 space-y-5">
          <div className="border rounded-2xl p-6 space-y-4">
            <h2 className="flex items-center gap-2 font-semibold">
              <MapPin /> Delivery Info
            </h2>

            <input
              placeholder="Name"
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full border p-3 rounded-xl"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              placeholder="Address"
              className="w-full border p-3 rounded-xl"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* Delivery */}
            <div className="flex gap-3">
              {/* Dhaka */}
              <button
                type="button"
                onClick={() => setForm({ ...form, delivery_area: "dhaka" })}
                className={`border p-3 rounded-xl w-full ${
                  form.delivery_area === "dhaka"
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white"
                }`}
              >
                Dhaka - ৳60
              </button>

              {/* Outside */}
              <button
                type="button"
                onClick={() => setForm({ ...form, delivery_area: "outside" })}
                className={`border p-3 rounded-xl w-full ${
                  form.delivery_area === "outside"
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white"
                }`}
              >
                Outside - ৳120
              </button>
            </div>
          </div>

          {/* COD */}
          <div className="flex items-center gap-3 border p-4 rounded-2xl">
            <Truck />
            <div>
              <p className="font-semibold">Cash on Delivery</p>
              <p className="text-sm text-gray-500">Pay after receiving</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 border p-6 rounded-2xl space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          <div className="flex gap-4">
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name || "product"}
              width={80}
              height={80}
              className="object-cover rounded-xl"
            />

            <div>
              <p>{product.name}</p>
              <p>Qty: {quantity}</p>
              <p className="text-orange-500 font-bold">৳{subtotal}</p>
            </div>
          </div>

          <hr />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>৳{deliveryCharge}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-orange-500">৳{total}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-full"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
