'use client'
import ProductSection from './NouvelleCollectionSection/ProductSection';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";




export default function NouvelleCollectionSection() {
  

  return (
    <section className="py-16 bg-gradient-to-br from-brand-sage-50 to-brand-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-brand-camel-100 text-brand-camel-800 rounded-full text-sm font-semibold mb-4">
              ✨ Nouvelle Collection Été 2025
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkGreen-900 mb-4">
              Découvrez nos Dernières
              <span className="block text-brand-camel-600">Créations</span>
            </h2>
            <p className="text-lg text-brand-darkGreen-700 max-w-2xl mx-auto">
              Des pièces uniques et tendances, conçues avec passion pour sublimer votre style au quotidien
            </p>
          </motion.div>
        </div>
        <ProductSection />

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/boutique"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-darkGreen-600 to-brand-darkGreen-700 hover:from-brand-darkGreen-700 hover:to-brand-darkGreen-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl group"
          >
            <span className="text-lg">Voir la boutique</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}