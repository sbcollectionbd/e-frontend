import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-xl shadow">
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        className="w-full h-40 object-cover"
      />

      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p>৳ {product.price}</p>

      <Link href={`/product/${product._id}`}>
        <button className="mt-2 bg-black text-white px-4 py-2 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
}