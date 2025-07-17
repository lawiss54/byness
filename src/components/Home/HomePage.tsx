'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useApi } from '@/lib/apiContext';
import { Loader } from "@/components/shared";

const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), { ssr: false });
const NouvelleCollectionSection = dynamic(() => import('@/components/Home/NouvelleCollectionSection'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/Home/FeaturesSection'), { ssr: false });

export default function Home() {
  const { fetchContent, contant, products, loading } = useApi();


  useEffect(() => {
    const load = async () => {
      await fetchContent(); 
    };
    load();
  }, []);


  if (loading) {
    return <Loader
      type="fashion"
      size="lg"
      text="Chargement..."
    />
  }

  return (
    <div className="min-h-screen">
      <HeroSection slides={contant} />
      <FeaturesSection />
      <NouvelleCollectionSection products={products} />
    </div>
  );
}
