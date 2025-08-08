import { Suspense } from 'react';
import { getHomepageContent } from './services/content';
import { getProducts } from './boutique/services'; // Reusing the service from boutique
import HomePage from './components/HomePage';
import { Loader } from '@/components/shared';

export default async function Home() {
  // Fetch all necessary data in parallel
  const [homepageContent, allProducts] = await Promise.all([
    getHomepageContent(),
    getProducts()
  ]);

  // The "Nouvelle Collection" seems to be based on products marked as "new"
  const newCollectionProducts = allProducts.filter(p => p.isNew);

  return (
    <Suspense fallback={<Loader type="fashion" size="lg" text="Chargement de la page d'accueil..." />}>
      <HomePage
        homepageContent={homepageContent}
        newCollectionProducts={newCollectionProducts}
      />
    </Suspense>
  );
}
