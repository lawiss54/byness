"use client";
import { useEffect } from "react";
import ProductsSection from "@/components/boutique/ProductsSection";
import { Loader } from "@/components/shared";
import HeroSection from "@/components/boutique/HeroSection";
import { useApi } from "@/lib/apiContext";
import { Product } from "@/components/boutique/types/product.types";

const Boutique = () => {
  const { activeCategory, activeProduct, loading, fatchRessorce } = useApi()



  useEffect(() => {
    fatchRessorce()
  }, [])

  const heroProducts = () => {
    const filterHero = activeProduct()
    return filterHero.filter(products => products?.heroSection === true);
  }
 
 

  if (loading) {
    return <Loader
      type="fashion"
      size="lg"
      text="Chargement..."
    />
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-ivory-50 via-white to-brand-sage-50">
      
        {/* Hero Section - Enhanced */}
        <HeroSection heroProducts={heroProducts()} />

        {/* Enhanced Products Section */}

        <ProductsSection products={activeProduct()} categories={activeCategory()} />
     
    </div>
  );
};

export default Boutique;
