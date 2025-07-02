
import { memo } from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from './PricingSection';
import { useRouter } from 'next/navigation';
import { Product } from '../ProductDetailsPage/type';


interface ProductContentProps {
  product: Product;
  savings: number;
}


export const ProductContent: React.FC<ProductContentProps> = memo(({ product, savings }) => {

  const router = useRouter();
  const goPageProduct = () => {
      router.push(`/produit/${product?.slug}`)
  }

  return (
    <div onClick={goPageProduct} className="p-6 flex-1 flex flex-col justify-between">
     
        <div>
          <motion.h3
            className="text-xl font-playfair font-semibold text-brand-darkGreen-500 mb-3 line-clamp-2"
            whileHover={{ x: 5, color: "#da944a" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product.name}
          </motion.h3>
          <p className='font-medium text-sm text-brand-darkGreen-600line-clamp-2 leading-tight'>{product.description.slice(0, 100)}{product.description.length > 100 && '...'}</p>
        </div>

        {/* Pricing and Actions */}
        <div className="space-y-4 ">
          <PricingSection product={product} savings={savings} />
        </div>
    </div>
  );
});

ProductContent.displayName = 'ProductContent';