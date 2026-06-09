'use client';

import { HomepageContent } from '../types';
import { Product } from '../boutique/types'; // Reusing type from boutique
import HeroSection from './HeroSection';
import NouvelleCollectionSection from './NouvelleCollectionSection';
import FeaturesSection from './FeaturesSection';

interface HomePageProps {
  homepageContent: HomepageContent[];
  newCollectionProducts: Product[];
}

export default function HomePage({ homepageContent, newCollectionProducts }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection slides={homepageContent} />
      <FeaturesSection />
      <NouvelleCollectionSection products={newCollectionProducts} />
    </div>
  );
}
