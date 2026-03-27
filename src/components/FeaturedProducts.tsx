import { getProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function FeaturedProducts() {
  const products: Product[] = await getProducts();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 8).map((p) => (
          <div key={p._id} className="border p-3">
            <img src={p.images?.[0]} />
            <h3>{p.name}</h3>
            <p>৳ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}