"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBag } from "lucide-react";

export default function OrderButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    localStorage.setItem(
      "order",
      JSON.stringify({
        productId,
        quantity,
      })
    );

    router.push("/checkout"); // ✅ clean URL
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* Order Button */}
      <button
        onClick={handleOrder}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full flex items-center justify-center gap-2 font-semibold text-lg"
      >
        <ShoppingBag size={18} />
        Order Now
      </button>
    </div>
  );
}