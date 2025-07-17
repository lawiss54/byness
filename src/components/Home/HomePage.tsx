'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useApi } from '@/lib/apiContext';

const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), { ssr: false });
const NouvelleCollectionSection = dynamic(() => import('@/components/Home/NouvelleCollectionSection'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/Home/FeaturesSection'), { ssr: false });

export default function Home() {
  const { fetchContent, contant, products } = useApi();


  useEffect(() => {
    const load = async () => {
      await fetchContent(); 
    };
    load();
  }, []);

  

  
  return (
    <div className="min-h-screen">
      <HeroSection slides={contant: any[]} />
      <FeaturesSection />
      <NouvelleCollectionSection products={products } />
    </div>
  );
}
