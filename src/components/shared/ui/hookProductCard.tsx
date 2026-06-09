import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  description: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={`group relative bg-brand-ivory-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* شارات المنتج */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-brand-sage-500 text-brand-greenBlack-500 px-3 py-1 rounded-full text-xs font-secondary font-semibold animate-pulse">
            جديد
          </span>
        )}
        {product.isOnSale && discountPercentage > 0 && (
          <span className="bg-brand-camel-500 text-white px-3 py-1 rounded-full text-xs font-secondary font-semibold">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* أزرار التفاعل */}
      <div className={`absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-brand-darkGreen-500 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 rounded-full bg-white/80 text-brand-darkGreen-500 backdrop-blur-sm hover:bg-brand-darkGreen-500 hover:text-white transition-all duration-300">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-sage-100 to-brand-ivory-200">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-brand-sage-100 via-brand-ivory-100 to-brand-sage-100 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* أوفرلاي متدرج */}
        <div className={`absolute inset-0 bg-gradient-to-t from-brand-darkGreen-900/20 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* زر إضافة للسلة - يظهر عند الـ hover */}
        <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button className="bg-brand-darkGreen-500 text-white px-6 py-2 rounded-full font-secondary font-medium hover:bg-brand-darkGreen-600 transition-colors duration-300 flex items-center gap-2 shadow-lg">
            <ShoppingCart className="h-4 w-4" />
            إضافة للسلة
          </button>
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5">
        {/* تصنيف المنتج */}
        <div className="text-brand-sage-600 text-sm font-secondary font-medium mb-2">
          {product.category}
        </div>

        {/* اسم المنتج */}
        <h3 className="font-playfair font-semibold text-lg text-brand-greenBlack-700 mb-2 line-clamp-2 group-hover:text-brand-darkGreen-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* وصف المنتج */}
        <p className="text-brand-sage-700 text-sm font-secondary leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* تقييم المنتج */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-brand-camel-500 text-brand-camel-500'
                    : 'text-brand-sage-300'
                }`}
              />
            ))}
          </div>
          <span className="text-brand-darkGreen-600 text-sm font-secondary font-medium">
            {product.rating}
          </span>
          <span className="text-brand-sage-500 text-sm font-secondary">
            ({product.reviews} تقييم)
          </span>
        </div>

        {/* السعر */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-darkGreen-700 font-playfair font-bold text-xl">
              {product.price} ر.س
            </span>
            {product.originalPrice && (
              <span className="text-brand-sage-500 text-sm line-through font-secondary">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>
          
          {/* نبضة الحفظ */}
          {product.isOnSale && (
            <div className="text-brand-camel-600 text-sm font-secondary font-semibold">
              وفر {product.originalPrice! - product.price} ر.س
            </div>
          )}
        </div>
      </div>

      {/* تأثير الحدود المتوهجة */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-brand-sage-300 via-brand-camel-300 to-brand-darkGreen-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
};

export default ProductCard;