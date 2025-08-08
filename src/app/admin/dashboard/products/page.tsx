import { Suspense } from 'react';
import { fetchProductsService, fetchCategoriesService } from './services/productsService';
import ProductsSection from './components/ProductsSection';
import { Loader } from '@/components/shared';

export const metadata = {
  title: 'Gestion des Produits - Dashboard',
  description: 'Gérez vos produits, stocks, et catégories.',
};

// This is the new Server Component entry point for the products management page.
export default async function AdminProductsPage() {
  // Fetch initial data on the server.
  // The services are already defined, so we can just call them.
  const initialProducts = await fetchProductsService();
  const initialCategories = await fetchCategoriesService();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des produits..." />}>
      <ProductsSection
        initialProducts={initialProducts}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
