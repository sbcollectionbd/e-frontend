

import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";

export default async function Home() {


  return (
    <div>
      <Navbar />
      <HeroBanner />
      <Features />
      <CategorySection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}