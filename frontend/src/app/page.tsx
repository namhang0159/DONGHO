import WatchScrollHero from "@/components/WatchScrollHero";
import BoutiqueIntroSection from "@/components/BoutiqueIntroSection";
import BrandDirectorySection from "@/components/BrandDirectorySection";
import BestSellersSection from "@/components/BestSellersSection";
import RolexConfigurator from "@/components/RolexConfigurator";
import ProductCatalog from "@/components/ProductCatalog";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import ReviewsAndPress from "@/components/ReviewsAndPress";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Flagship 3D Exploded Scrollytelling & Fullscreen Cinema Video */}
      <WatchScrollHero />

      {/* 2. Boutique Introduction & Showroom Cinema Player (intro.mp4) */}
      <BoutiqueIntroSection />

      {/* 3. Prestigious Swiss Brand Showcase (Rolex, AP, Patek, VC, Omega, Cartier) */}
      <BrandDirectorySection />

      {/* 4. Best Selling Masterpieces Across Brands */}
      <BestSellersSection />

      {/* 5. Interactive Rolex Watch Configurator */}
      <RolexConfigurator />

      {/* 6. The Complete Multi-Brand Collection Catalog */}
      <ProductCatalog />

      {/* 7. The Art of Swiss Watchmaking & Calibre Anatomy */}
      <CraftsmanshipSection />

      {/* 8. Press Accreditations & Collector Testimonials */}
      <ReviewsAndPress />
    </div>
  );
}
