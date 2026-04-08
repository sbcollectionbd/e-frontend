"use client";

export default function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="px-3 py-1 border rounded"
      >
        -
      </button>

      <span className="text-lg font-semibold">{quantity}</span>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="px-3 py-1 border rounded"
      >
        +
      </button>
    </div>
  );
}