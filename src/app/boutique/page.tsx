import { getProducts, getCategories } from './services';
import BoutiquePage from './components/BoutiquePage';
import { Suspense } from 'react';
import { Loader } from '@/components/shared';

export const metadata = {
  title: 'Boutique - Découvrez nos collections',
  description: 'Parcourez nos collections de vêtements uniques et trouvez votre style.',
};

export default async function Boutique() {
  // Fetch data on the server side
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <Suspense fallback={<Loader type="fashion" size="lg" text="Chargement..." />}>
      <BoutiquePage products={products} categories={categories} />
    </Suspense>
  );
}
