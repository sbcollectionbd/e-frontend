import { getSingleProduct } from "@/services/api";
import { Product } from "@/types/product";
import { Truck, ShieldCheck } from "lucide-react";
import OrderButton from "@/components/Common/OrderButton";
import ProductImageCarousel from "@/components/Product/ProductImageCarousel";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: Product = await getSingleProduct(id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE: CAROUSEL */}
        <div className="relative bg-black rounded-3xl overflow-hidden h-112.5 md:h-150 w-full">
          {/* Discount Badge - Placed z-20 to stay above carousel */}
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-20 font-bold">
            {product.discountPercentage
              ? `${product.discountPercentage}% OFF`
              : "No Discount"}
          </span>

          {/* Interactive Carousel Component */}
          <ProductImageCarousel images={product.images} name={product.name} />
        </div>

        {/* RIGHT SIDE: PRODUCT INFO */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-4xl font-semibold text-gray-900">{product.name}</h1>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-orange-500">
              ৳{product.discountedPrice}
            </span>
            <span className="text-gray-400 line-through text-lg">
              ৳{product.originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* 🔥 ORDER SYSTEM */}
          <div className="py-4">
             <OrderButton productId={product._id} />
          </div>

          {/* Trust & Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="border border-gray-100 rounded-2xl p-4 flex gap-3 bg-gray-50/50">
              <Truck className="text-orange-500" size={24} />
              <div>
                <p className="font-semibold text-sm">Fast Delivery</p>
                <p className="text-xs text-gray-500">
                  Dhaka ৳60 · Outside ৳120
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-4 flex gap-3 bg-gray-50/50">
              <ShieldCheck className="text-orange-500" size={24} />
              <div>
                <p className="font-semibold text-sm">Cash on Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when you receive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}