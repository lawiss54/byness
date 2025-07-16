import ProductDetailsPage from '@/components/Produit/ProductDetailsPage';
import { notFound } from 'next/navigation';
import { fetchProductBySlug } from '@/lib/server/products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  

  const product = await fetchProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetailsPage product={product} />;
}
