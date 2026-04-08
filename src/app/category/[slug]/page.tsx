"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { getProductsByCategory } from "@/services/api";
import { Product } from "@/types/product";
 // ✅ use model

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const categoryName =
    slug === "men" ? "Men" : slug === "women" ? "Women" : slug;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getProductsByCategory(slug);

        setProducts(items);
        setFiltered(items);

        const subs = Array.from(
          new Set(items.map((p) => p.subcategory).filter(Boolean))
        ) as string[];

        setSubcategories(subs);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  const handleFilter = (sub: string | null) => {
    setActiveSub(sub);

    if (!sub) {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.subcategory === sub));
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6">
      <div className="bg-linear-to-b from-secondary/50 to-background border-b">
        <div className="container py-10 md:py-14">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-3">
            {categoryName}&apos;s Collection
          </h1>

          <p className="text-muted-foreground mb-6">
            Explore our latest {categoryName.toLowerCase()} fashion
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={!activeSub ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilter(null)}
            >
              All
            </Button>

            {subcategories.map((sub) => (
              <Button
                key={sub}
                variant={activeSub === sub ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilter(sub)}
              >
                {sub}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 flex-1">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}