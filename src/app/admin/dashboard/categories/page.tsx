import { Suspense } from 'react';
import { fetchCategories } from './services/categoriesService';
import CategoriesSection from './components/CategoriesSection';
import { Loader } from '@/components/shared';

export default async function AdminCategoriesPage() {
  const initialCategories = await fetchCategories();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des catégories..." />}>
      <CategoriesSection initialCategories={initialCategories} />
    </Suspense>
  );
}
