/* eslint-disable @typescript-eslint/no-explicit-any */


import { Sparkles } from "lucide-react";
import ProductCard from "../ProductCard";
import { getFeaturedProducts } from "@/services/api";

export default async function FeaturedProducts() {
  let featured: any[] = [];

  try {
    featured = await getFeaturedProducts();
  } catch (err) {
    console.error("FeaturedProducts fetch failed:", err);
  }

  return (
    <section className="bg-secondary/30 py-16 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Handpicked styles just for you
            </p>
          </div>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-3xl border border-dashed">
            <Sparkles className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No featured products yet.</p>
            <p className="text-sm text-muted-foreground/60">
              Add products from the admin panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}