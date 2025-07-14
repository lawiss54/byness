"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Filter } from "lucide-react";
import { containerVariants, itemVariants } from "./CategorieSection/animations/variants";
import { CategoryButton } from "./CategorieSection/CategoryButton";
import { Category, Product } from "@/components/boutique/types/product.types";

interface CategoriesSectionProps {
  categories: Category[];
  products: Product[];
  setfilteredProducts: (products: Product[]) => void;
  setSelectedCategoryCallBack: (category: string) => void;
}

export default function CategorieSection({
  categories,
  products,
  setfilteredProducts,
  setSelectedCategoryCallBack,
}: CategoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isScrollable, setIsScrollable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const prevFilteredProductsRef = useRef<Product[]>([]);
  const prevSelectedCategoryRef = useRef<string>("Tous");

  const enhancedCategories = [
    {
      name: "Tous",
      icon: "🏪",
      count: products?.length,
      color: "brand-camel",
      id: "all-categories",
    },
    ...categories.filter((cat) => cat.name !== "Tous"),
  ];

  useEffect(() => {
    setIsScrollable(enhancedCategories.length > 6);
  }, [enhancedCategories.length]);

  useEffect(() => {
    const newFiltered = selectedCategory === "Tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);

    const prevFiltered = prevFilteredProductsRef.current;
    const prevSelected = prevSelectedCategoryRef.current;

    const isSameLength = newFiltered.length === prevFiltered.length;
    const isSameItems = isSameLength && newFiltered.every((item, index) => item.id === prevFiltered[index]?.id);

    if (!isSameItems || selectedCategory !== prevSelected) {
      setfilteredProducts(newFiltered);
      setSelectedCategoryCallBack(selectedCategory);
      prevFilteredProductsRef.current = newFiltered;
      prevSelectedCategoryRef.current = selectedCategory;
    }
  }, [selectedCategory, products, setfilteredProducts, setSelectedCategoryCallBack]);

  return (
    <section className="py-16 bg-gradient-to-bl from-brand-camel-50 via-white to-brand-sage-50 relative overflow-hidden">
      {/* Décor de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.brand.darkGreen.400)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Titre */}
        <motion.div className="text-center mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>

          <motion.h2 className="text-5xl font-playfair font-bold text-brand-darkGreen-600 mb-4" variants={itemVariants}>
            Explorez nos <span className="text-brand-camel-500">catégories</span>
          </motion.h2>
          <motion.p className="text-brand-darkGreen-500 font-secondary text-xl max-w-2xl mx-auto" variants={itemVariants}>
            Découvrez notre sélection triée par catégorie pour une expérience d&apos;achat simplifiée.
          </motion.p>
        </motion.div>

        {/* Bouton filtre (mobile) */}
        <motion.div className="flex justify-center mb-8 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border shadow-lg transition-all duration-300">
            <Filter className="w-4 h-4 text-brand-camel-600" />
            <span className="font-medium text-brand-darkGreen-600">
              {showFilters ? "Masquer les catégories" : "Afficher les catégories"}
            </span>
          </button>
        </motion.div>

        {/* Liste des catégories */}
        <AnimatePresence>
          <motion.div
            className={`${
              showFilters || (typeof window !== "undefined" && window.innerWidth >= 1024)
                ? "block"
                : "hidden lg:block"
            }`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div
              className={`${
                isScrollable
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                  : "flex flex-wrap justify-center gap-6"
              }`}
            >
              {enhancedCategories.map((category, i) => (
                <CategoryButton
                  key={category?.id || `${category.name}-${i}`}
                  category={category}
                  selected={selectedCategory === category.name}
                  onSelect={setSelectedCategory}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Résumé du filtre sélectionné */}
        <motion.div className="mt-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border shadow-lg">
            <div className="w-2 h-2 bg-brand-camel-500 rounded-full animate-pulse"></div>
            <span className="text-brand-darkGreen-600 font-medium">
              Catégorie &laquo; {selectedCategory} &raquo;
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
