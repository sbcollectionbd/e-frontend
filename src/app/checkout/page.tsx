"use client";

import { useState } from "react";
import { createOrder } from "@/services/api";

export default function Checkout() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: ""
  });

  const handleSubmit = async () => {
    await createOrder({
      ...form,
      items: [],
      totalPrice: 1000
    });

    alert("Order placed ✅");
  };

  return (
    <div className="p-6 flex flex-col gap-3">
      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, customerName: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Address"
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white p-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}