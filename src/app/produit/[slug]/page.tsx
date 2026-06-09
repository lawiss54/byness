import { notFound } from 'next/navigation';
import { getProductBySlug } from './services';
import ProductDetailsPage from './components/ProductDetailsPage';
import { getProducts } from '@/app/boutique/services';
import { Suspense } from 'react';
import { Loader } from '@/components/shared';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Optional: Add metadata generation
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }
  return {
    title: `${product.name} - ByNess Boutique`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Fetch the main product and all products for "similar products" in parallel
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts()
  ]);

  if (!product) {
    notFound();
  }

  // Filter for similar products (e.g., in the same category, excluding the current product)
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 5); // Limit to 5 similar products

  return (
    <Suspense fallback={<Loader type="fashion" size="lg" text="Chargement du produit..." />}>
      <ProductDetailsPage product={product} similarProducts={similarProducts} />
    </Suspense>
  );
}
