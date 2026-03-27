import { getSingleProduct } from "@/services/api";
import { Product } from "@/types/product";

export default async function ProductDetails({
  params
}: {
  params: { id: string };
}) {
  const product: Product = await getSingleProduct(params.id);

  return (
    <div className="p-6">
      <img
        src={product?.images?.[0] || "/placeholder.jpg"}
        className="w-64"
      />

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>৳ {product.price}</p>
    </div>
  );
}