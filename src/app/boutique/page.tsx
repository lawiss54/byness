"use client";
import HeroSection from "@/components/Boutique/HeroSection";

import ProductsSection from "@/components/Boutique/ProductsSection";




const Boutique = () => {
  
  const categories = [
    { name: "Tous", icon: "✨", count: 124, color: "#000000" },
    { name: "Robes", icon: "👗", count: 45, color: "#000000" },
    { name: "Blouses", icon: "👚", count: 32, color: "#000000" },
    { name: "Pantalons", icon: "👖", count: 28, color: "#000000" },
    { name: "Jupes", icon: "🩱", count: 19, color: "#000000" },
    { name: "Accessoires", icon: "👜", count: 15, color: "#000000" },
  ];

  const heroProducts = [
    {
      id: "1",
      name: "Robe Élégante Automne",
      description:
        "Une robe sophistiquée parfaite pour les occasions spéciales, confectionnée dans des matériaux de qualité supérieure.",
      price: 15900,
      image:
        "/robe.jpg",
      badge: "Nouveau",
      rating: 4.8,
      reviews: 124,
      colors: ["Noir", "Camel", "Sage"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "2",
      name: "Blazer Signature",
      description:
        "Un blazer intemporel qui allie élégance moderne et confort, idéal pour le bureau ou les soirées.",
      price: 22500,
      image:
        "robe2.jpg",
      badge: "Bestseller",
      rating: 4.9,
      reviews: 89,
      colors: ["Camel", "Noir", "Sage"],
      sizes: ["S", "M", "L"],
    },
  ];

  const products = [
    {
      id: "3",
      name: "Blouse Soie Naturelle Premium",
      description: "A premium silk blouse.",
      price: 1590,
      originalPrice: 2990,
      image: "/robe3.jpg",
      category: "Blouses",
      colors: ["#0f3a37", "#c8a376", "#d5e3ce"],
      rating: 4.7,
      reviews: 23,
      isNew: false,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Robe Midi Élégante Couture",
      description: "An elegant midi dress.",
      price: 1890,
      image: "/robe2.jpg",
      category: "Robes",
      colors: ["#0a1f1c", "#cdcabe", "#c8a376"],
      rating: 4.9,
      reviews: 47,
      isNew: true,
      isFavorite: true,
    },
    {
      id: "5",
      name: "Pantalon Tailleur Chic Modern",
      description: "Chic modern tailored pants.",
      price: 1290,
      image: "/robe1.jpg",
      category: "Pantalons",
      colors: ["#0f3a37", "#0a1f1c"],
      rating: 4.6,
      reviews: 15,
      isNew: false,
      isFavorite: false,
    },
    {
      id: "6",
      name: "Jupe Plissée Moderne Luxe",
      description: "Luxurious modern pleated skirt.",
      price: 990,
      originalPrice: 139,
      image: "/robe.jpg",
      category: "Jupes",
      colors: ["#d5e3ce", "#c8a376", "#cdcabe"],
      rating: 4.5,
      reviews: 32,
      isNew: false,
      isFavorite: false,
    },
    {
      id: "7",
      name: "Blouse Transparence Chic Elite",
      description: "Elite chic sheer blouse.",
      price: 1190,
      image: "/robe2.jpg",
      category: "Blouses",
      colors: ["#cdcabe", "#0f3a37"],
      rating: 4.8,
      reviews: 28,
      isNew: true,
      isFavorite: true,
    },
    {
      id: "8",
      name: "Robe Cocktail Luxe Collection",
      description: "Luxury cocktail dress from the collection.",
      price: 2990,
      image: "/robe.jpg",
      category: "Robes",
      colors: ["#0a1f1c", "#c8a376"],
      rating: 4.9,
      reviews: 56,
      isNew: false,
      isFavorite: false,
    },
  ];

  

  return (
    <div className="min-h-full bg-gradient-to-br from-brand-ivory-50 via-white to-brand-sage-50">
      {/* Hero Section - Enhanced */}
      <HeroSection heroProducts={heroProducts} />

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
