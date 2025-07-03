اimport React, { memo, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import namer from "color-namer"
import { 
  Check,
  Plus,
  Minus,
  Award
} from 'lucide-react';
import { AddToCartButtons, BuyNowButtons } from '@/components/FashionShoppingButtons';
import type { ProductInfoProps } from './type';

const ProductInfo = memo<ProductInfoProps>(({
  product,
  pricingData,
  selectionData,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
}) => {
  // Memoized color mapping - only recreate if colors change
  const colorMap = useMemo(() => ({
    'Noir': '#000000',
    'Camel': '#da944a',
    'Sage': '#5f6e5f',
    'Bordeaux': '#722f37',
    'Blanc': '#ffffff',
    'Beige': '#f5f5dc'
  }), []);

  const [nameColor, setNameColor] = useState(namer(selectionData?.selectedColor))
  useEffect(() => {
    function changeColor(){
      setNameColor(namer(selectionData?.selectedColor))
    }
    changeColor()
  }, [selectionData?.selectedColor, onColorSelect])
  

  
  return (
    <div className="space-y-8">
      {/* Product Title and Rating Section */}
      <div>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4 leading-tight"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product?.name}
        </motion.h2>

        {/* Product Description */}
        <p className="text-brand-darkGreen-400 font-secondary text-lg leading-relaxed">
          {product?.description}
        </p>
      </div>

      {/* Pricing Section */}
      <motion.div
        className="bg-gradient-to-r from-brand-camel-50 to-brand-sage-50 p-6 rounded-2xl border-2 border-dashed border-brand-camel-200"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl md:text-4xl font-bold text-brand-camel-500">
                {product?.price.toLocaleString()} DA
              </span>
              {product?.originalPrice > 0 && (
                <span className="text-xl text-brand-sage-400 line-through">
                  {product?.originalPrice.toLocaleString()} DA
                </span>
              )}
            </div>
            
            {/* Savings Information */}
            {pricingData?.savings > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-green-600 font-semibold">
                  Économisez {pricingData?.savings.toLocaleString()} DA
                </span>
                <motion.div
                  className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Offre limitée
                </motion.div>
              </div>
            )}
          </div>
          
          {/* Award Icon */}
          <motion.div
            className="text-brand-camel-400/40 hidden sm:block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Award size={60} />
          </motion.div>
        </div>
      </motion.div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brand-darkGreen-500">
          Couleur: <span className="text-brand-camel-500">{nameColor?.html[0]?.name?.charAt(0).toUpperCase() + nameColor?.html[0]?.name?.slice(1)}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {product?.colors.map((color) => (
            <motion.button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`relative w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                selectionData?.selectedColor === color
                  ? 'border-brand-camel-500 shadow-lg scale-110'
                  : 'border-white hover:border-brand-camel-300 shadow-md'
              }`}
              style={{ backgroundColor: colorMap[color] || color }}
              whileHover={{ scale: selectionData?.selectedColor === color ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Sélectionner la couleur ${color}`}
            >
              {selectionData?.selectedColor === color && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-5 h-5 text-white drop-shadow-sm" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brand-darkGreen-500">
          Taille: <span className="text-brand-camel-500">{selectionData?.selectedSize}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {product?.sizes.map((size) => (
            <motion.button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all duration-300 ${
                selectionData?.selectedSize === size
                  ? 'border-brand-camel-500 bg-brand-camel-50 text-brand-camel-600'
                  : 'border-gray-200 hover:border-brand-camel-300 text-brand-darkGreen-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Sélectionner la taille ${size}`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-brand-darkGreen-500">Quantité</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-2xl border-2 border-brand-sage-200 shadow-lg">
            <motion.button
              onClick={() => onQuantityChange(selectionData.quantity - 1)}
              className="p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-l-2xl transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={selectionData?.quantity <= 1}
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            
            <span className="px-6 py-3 font-semibold text-brand-darkGreen-500 bg-white min-w-[60px] text-center">
              {selectionData?.quantity}
            </span>
            
            <motion.button
              onClick={() => onQuantityChange(selectionData?.quantity + 1)}
              className="p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-r-2xl transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={selectionData?.quantity >= product?.stockQuantity}
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Total Price Display */}
          <span className="text-brand-darkGreen-400">
            Total: <span className="font-semibold text-brand-camel-500 text-lg">
              {selectionData?.totalPrice.toLocaleString()} DA
            </span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-4 justify-evenly">
          <div className="flex-1">
            <AddToCartButtons />
          </div>
          
           {/* Buy Now Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BuyNowButtons />
            </motion.div>
         
        </div>
        
       
      </div>
    </div>
  );
});

ProductInfo.displayName = 'ProductInfo';

export default ProductInfo;