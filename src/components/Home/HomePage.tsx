'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useApi } from '@/lib/apiContext';

const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), { ssr: false });
const NouvelleCollectionSection = dynamic(() => import('@/components/Home/NouvelleCollectionSection'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/Home/FeaturesSection'), { ssr: false });

export default function Home() {
  const { fetchContent, contant, products } = useApi();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchContent(); // لا نحتاج قيمة راجعة
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Chargement...</div>;
  }

  return (
    <>
      <HeroSection slides={contant} />
      <FeaturesSection />
      <NouvelleCollectionSection products={products} />
    </>
  );
}
