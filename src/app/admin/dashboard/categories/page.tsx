import { Suspense } from 'react';
import { fetchCategoriesService } from '../products/services/productsService'; // Note: Service is in a shared location
import CategoriesSection from './components/CategoriesSection';
import { Loader } from '@/components/shared';


export default async function AdminCategoriesPage() {
  const initialCategories = await fetchCategoriesService();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des catégories..." />}>
      <CategoriesSection initialCategories={initialCategories} />
    </Suspense>
  );
}
