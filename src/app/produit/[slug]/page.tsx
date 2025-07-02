import ProductDetailsPage from '@/components/Produit/ProductDetailsPage';
import { similerProducts, productFinder } from '@/app/boutique/api';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    slug: string;
  };
}



export default async function ProductPage({ params }: ProductPageProps) {
  const {slug} = await params ;

  const products = productFinder(slug);
  const product = products[0];
 
  if(!product){
    return notFound();
  }

  return (
    <ProductDetailsPage 
      product={product}
      similarProducts={similerProducts(product.category)}
    />
  );
}
