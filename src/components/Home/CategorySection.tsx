import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategorySection() {
   const categories = [
    {
      id: "1",
      name: "Men",
      slug: "men",
      subcategories: ["Shirt", "T-Shirt", "Pants"],
    },
    {
      id: "2",
      name: "Women",
      slug: "women",
      subcategories: ["Dress", "Saree", "Top"],
    },

  ];
  return (
     <section className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our curated collections for every occasion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories?.map((cat, ) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-secondary to-accent/30 p-8 md:p-12 border border-border/50 hover:shadow-card-hover hover:border-primary/20 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Collection</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{cat.name}&apos;s Fashion</h3>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  Explore Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
  );
}