import { ArrowRight, Shirt, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categoryConfig: Record<string, { icon: React.ReactNode; image: string; description: string }> = {
  men: {
    icon: <Shirt className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    description: "Trendy styles for the modern man",
  },
  women: {
    icon: <Sparkles className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80",
    description: "Elegant fashion for every occasion",
  },
};

export default function CategorySection() {
  const categories = [
    {
      id: "1",
      name: "Men",
      slug: "men",
    },
    {
      id: "2",
      name: "Women",
      slug: "women",

    },
  ];

  return (
    <section className="container py-16 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
          Browse
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Shop by Category
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Explore our curated collections for every occasion
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const config = categoryConfig[cat.slug];
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-500 bg-card"
            >
              {/* Background Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={config.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                {/* Icon badge */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white rounded-xl p-2.5 border border-white/30 z-10">
                  {config.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & description */}
                <div className="mb-4">
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                    {cat.name}&apos;s Fashion
                  </h3>
                  <p className="text-muted-foreground text-sm">{config.description}</p>
                </div>


                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    Explore All{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}