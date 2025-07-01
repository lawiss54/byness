"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

const products = [
  {
    title: "Robe en lin pastel",
    description: "Légère, élégante, parfaite pour l'été.",
    image: "/robe.jpg",
  },
  {
    title: "Ensemble chic beige",
    description: "Style moderne pour toutes les occasions.",
    image: "/robe2.jpg",
  },
  {
    title: "Kimono fleuri",
    description: "Confort et style réunis dans une seule pièce.",
    image: "/robe3.jpg",
  },
];

const ProductSection = () => {
  return (
    <div className="flex flex-col m-7">
      {products.map((product, index) => (
        <motion.div
          key={index}
          className="h-[25rem] w-full flex flex-row m-5 justify-evenly items-center text-left p-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            ease: "easeOut",
          }}
        >
          {index % 2 === 0 ? (
            <>
              {/* Texte à gauche */}
              <div className="flex-[0.6] p-5 bg-brand-camel-500 bg-opacity-50 rounded-l-md backdrop-blur-sm shadow-2xl shadow-brand-camel-900">
                <h2 className="text-2xl font-semibold text-brand.dark">
                  {product.title}
                </h2>
                <p className="mt-4 text-brand.green/70 text-center">{product.description}</p>
              </div>

              {/* Image à droite */}
              <div className="flex-[0.8] h-[25rem] relative group shadow-2xl rounded-lg shadow-2xl shadow-brand-camel-500">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />

              </div>
            </>
          ) : (
            <>
              {/* Image à gauche */}
              <div className="flex-[0.8] h-[25rem] relative group shadow-2xl rounded-lg">
              <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-2xl shadow-brand-camel-500"
                />
              </div>

              {/* Texte à droite */}
              <div className="flex-[0.6] p-5 bg-brand-sage-500 bg-opacity-50 rounded-r-md backdrop-blur-sm shadow-2xl shadow-brand-camel-900">
                <h2 className="text-2xl font-semibold text-brand.dark">
                  {product.title}
                </h2>
                <p className="mt-4 text-brand.green/70">{product.description}</p>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProductSection;