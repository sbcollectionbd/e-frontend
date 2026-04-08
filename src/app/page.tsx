import CategorySection from "@/components/Home/CategorySection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Features from "@/components/Home/Features";
import HeroBanner from "@/components/Home/HeroBanner";

export default async function Home() {
  return (
    <div className="min-h-screen px-5">
      <HeroBanner />
      <Features />
      <CategorySection />
      <FeaturedProducts />
    </div>
  );
}
