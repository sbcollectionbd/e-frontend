import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { getProductsByCategory } from "@/services/api";
import Link from "next/link";
import { Product } from "@/types/product";

// ✅ Next.js 15: params & searchParams are Promises
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategory?: string }>;
}

// ✅ Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// ✅ Capitalize slug: "men" → "Men", "t-shirts" → "T-Shirts"
function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params, searchParams }: Props) {
  // ✅ Must await both in Next.js 15
  const { slug } = await params;
  const { subcategory: activeSubcategory } = await searchParams;

  const categoryName = formatCategoryName(slug);

  // ✅ Fetch ALL products for this category (needed to build subcategory list)
  let allProducts: Product[] = [];
  let filteredProducts: Product[] = [];

  try {
    allProducts = await getProductsByCategory(slug);

    // ✅ Filter client-side so subcategory buttons always stay visible
    filteredProducts = activeSubcategory
      ? allProducts.filter(
          (p) => p.subcategory?.trim() === activeSubcategory.trim()
        )
      : allProducts;
  } catch (err) {
    console.error(`[CategoryPage] Failed to fetch "${slug}":`, err);
  }

  // ✅ Build unique subcategory list from ALL products (not the filtered set)
  const subcategories = Array.from(
    new Set(
      allProducts
        .map((p) => p.subcategory?.trim())
        .filter((s): s is string => Boolean(s))
    )
  );

  return (
    <div className="min-h-screen flex flex-col px-6">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-b from-secondary/50 to-background border-b">
        <div className="container py-10 md:py-14">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-3">
            {categoryName}&apos;s Collection
          </h1>

          <p className="text-muted-foreground mb-6">
            Explore our latest {categoryName.toLowerCase()} fashion
          </p>

          {/* ✅ Subcategory filter — URL-based, no "use client" needed */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {/* All — clears filter */}
              <Button
                size="sm"
                variant={!activeSubcategory ? "default" : "outline"}
                asChild
              >
                <Link href={`/category/${slug}`}>All</Link>
              </Button>

              {subcategories.map((sub) => (
                <Button
                  key={sub}
                  size="sm"
                  variant={
                    activeSubcategory?.trim() === sub ? "default" : "outline"
                  }
                  asChild
                >
                  <Link
                    href={`/category/${slug}?subcategory=${encodeURIComponent(sub)}`}
                  >
                    {sub}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="container py-8 flex-1">
        {filteredProducts.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
              {activeSubcategory ? ` in "${activeSubcategory}"` : ""}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg font-medium">
              No products found
              {activeSubcategory
                ? ` in "${activeSubcategory}"`
                : " in this category"}
              .
            </p>
            {/* ✅ Let user escape a broken filter */}
            {activeSubcategory && (
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href={`/category/${slug}`}>Clear filter</Link>
              </Button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}