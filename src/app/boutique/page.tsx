"use client";
import HeroSection from "@/components/Boutique/HeroSection";
import ProductsSection from "@/components/Boutique/ProductsSection";
import { products, categories, heroProducts } from "./api";




const Boutique = () => {
  
  

  return (
    <div className="min-h-full bg-gradient-to-br from-brand-ivory-50 via-white to-brand-sage-50">
      {/* Hero Section - Enhanced */}
      <HeroSection heroProducts={heroProducts(products)} />

      {/* Enhanced Search & Filter Bar 
      <SearchFilterSection />
      */}

      {/* Enhanced Categories Section 
      <CategorieSection
        categories={categories}
        products={products}
        setfilteredProducts={setfilteredProducts}
        setSelectedCategoryCallBack={setSelectedCategoryCallBack}
      />
      */}
       

      {/* Enhanced Products Section */}
      
      <ProductsSection products={products} categories={categories} />
      
    </div>
  );
};

export default Boutique;
