"use client";
import { useEffect } from "react";
import { Loader } from "@/components/shared";
import { useApi } from "@/lib/apiContext";


import dynamic from 'next/dynamic'




const HeroSection = dynamic(
    () => import('@/components/Boutique/HeroSection'),
    { ssr: false }
)
const ProductsSection = dynamic(
    () => import('@/components/Boutique/ProductsSection'),
    { ssr: false }
)


const BoutiquePage = () => {
    const { activeCategory, activeProduct, loading, fatchRessorce } = useApi()



    useEffect(() => {
        if (typeof window === undefined) return;
        fatchRessorce()
    })

    const heroProducts = () => {
        const filterHero = activeProduct()
        return filterHero.filter(products => products?.heroSection === true);
    }



    if (loading) {
        if (typeof window === undefined) return;
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

export default BoutiquePage;
